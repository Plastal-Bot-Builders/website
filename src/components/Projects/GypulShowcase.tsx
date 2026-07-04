import React, { useRef, useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { Html, useProgress, Environment, ContactShadows, useGLTF, useAnimations } from '@react-three/drei';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../Header';
import Footer from '../Footer';
import { asset } from '../../utils/asset';

const isMeshObject = (object: THREE.Object3D): object is THREE.Mesh => {
  return 'isMesh' in object && object.isMesh === true;
};

/** Tracks a max-width media query so the 3D scene can re-frame for phones. */
function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}

/** Reads the theme accent so Three.js materials can match light/dark mode. */
function useAccentColor(): string {
  const [color, setColor] = useState('#0CFFBB');

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      if (value) setColor(value);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return color;
}

/**
 * Scroll progress of the showcase container, measured from its rect so it
 * works no matter which ancestor element actually scrolls.
 */
function getScrollProgress(el: HTMLElement | null): number {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  if (total <= 0) return 0;
  return THREE.MathUtils.clamp(-rect.top / total, 0, 1);
}

function LoaderSpinner() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <svg className="w-12 h-12 animate-spin text-accent" viewBox="0 0 24 24" fill="none" role="img" aria-label="Loading">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-sm mt-3">Loading model {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

const GROUND_Y = -0.6;

// Decoder is self-hosted (public/draco/) — all three GLB exports require
// KHR_draco_mesh_compression
const DRACO_PATH = asset('draco/');
const MODEL_URLS = {
  desktop: 'resources/3D_Models/web/robot_showcase.glb', // LOD0, full detail
  mobile: 'resources/3D_Models/web/robot_showcase_lod1.glb', // ~50% decimated, same rig
};

const TARGET_HEIGHT = 1.15;
/**
 * Where the robot stands. It stays here for the whole page (mobile centers
 * it) — the camera does the storytelling, the robot only turns in place
 * and takes one small step forward during the stabilization beat.
 */
const REST_X = 0.85;
const FOV = 35;
/** Dolly distance at which the fitted robot fills ~60% of the viewport height. */
const HERO_DIST = TARGET_HEIGHT / (0.6 * 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));

/**
 * Scroll thresholds where each story beat takes over. The camera keys land
 * at scroll 0 / .25 / .5 / .75 / 1; the behaviour mode and label switch a
 * little before each arrival, while the camera transition is under way.
 */
const BEAT_AT = [0, 0.14, 0.4, 0.62, 0.86];

function beatFor(p: number): number {
  let i = 0;
  for (let k = 1; k < BEAT_AT.length; k++) {
    if (p >= BEAT_AT[k]) i = k;
  }
  return i;
}

const CLIP_FPS = 30;
/** Frames 910+ are a drivetrain test sequence, not meant for product display. */
const CLIP_END_FRAME = 900;

/**
 * The baked timeline is a sequence of behaviour modes (per the export
 * README): BOOT 1-120 · IDLE 121-300 · SCAN 301-450 · MOVEMENT 451-650 ·
 * SHOWCASE 651-900. Each story beat pins playback inside one mode and
 * ping-pongs so the loop never pops; crossing into another beat
 * fast-forwards (or rewinds) the timeline through the modes in between.
 */
type Segment = { entry: number; loop: [number, number] };
const SEGMENTS: Segment[] = [
  { entry: 0, loop: [4.0, 10.0] }, // hero: boot plays once, then idle
  { entry: 4.0, loop: [4.0, 10.0] }, // wheel design: idle balancing
  { entry: 15.0, loop: [15.0, 21.6] }, // stabilization: movement mode
  { entry: 10.0, loop: [10.0, 15.0] }, // electronics: scan mode
  { entry: 21.6, loop: [21.6, 29.9] }, // finale: showcase turntable
];
const SEEK_SPEED = 6;

/**
 * LED state colors from the export README — the Blender driver rig doesn't
 * survive glTF, so the state system is recreated on the MAT_LED_* materials.
 */
const LED_BEAT_COLORS = [
  new THREE.Color(0.05, 0.85, 1.0), // hero: idle cyan
  new THREE.Color(0.05, 0.85, 1.0), // wheels: idle cyan
  new THREE.Color(0.05, 0.85, 1.0), // stabilization: cyan
  new THREE.Color(1.0, 0.32, 0.02), // electronics: scan orange
  new THREE.Color(0.04, 1.0, 0.22), // finale: success green
];

type RobotModelProps = {
  url: string;
  progress: React.MutableRefObject<number>;
};

function RobotModel({ url, progress }: RobotModelProps) {
  const { scene, animations } = useGLTF(url, DRACO_PATH);
  const group = useRef<Group>(null);
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);
  const playback = useRef({ time: 0, dir: 1 });

  const clips = useMemo(
    () =>
      animations.map((clip) => {
        const sub = THREE.AnimationUtils.subclip(clip, clip.name, 1, CLIP_END_FRAME, CLIP_FPS);
        // The baked travel moves Robot_Root across the floor, which would
        // fight the scroll-linked x choreography below — drop the position
        // track so the robot drives in place and the page moves it instead
        sub.tracks = sub.tracks.filter((track) => track.name !== 'Robot_Root.position');
        return sub;
      }),
    [animations]
  );

  const { actions, mixer } = useAnimations(clips, group);

  // Fit the export at its native size: TARGET_HEIGHT tall, centered on the
  // stage, wheels resting exactly on y = 0
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_HEIGHT / size.y;
    return {
      scale,
      position: [-center.x * scale, -box.min.y * scale, -center.z * scale] as [number, number, number],
    };
  }, [scene]);

  useLayoutEffect(() => {
    // The export double-applies the motor offset to the wheel groups (the
    // Blender scene itself has it — LOD2 bakes the same layout), leaving
    // each wheel floating ~8cm off its axle. Re-seat them by cancelling
    // the parent motor's offset; assignment (not +=) keeps it idempotent
    // across remounts of drei's cached scene
    (['Left', 'Right'] as const).forEach((side) => {
      const wheel = scene.getObjectByName(`${side}_Wheel`);
      const motor = scene.getObjectByName(`${side}_Motor`);
      if (wheel && motor) wheel.position.x = -motor.position.x;
    });

    const found: THREE.MeshStandardMaterial[] = [];
    scene.traverse((o: THREE.Object3D) => {
      if (!isMeshObject(o)) return;
      o.castShadow = true;
      o.receiveShadow = true;
      const materials = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of materials) {
        if (m instanceof THREE.MeshStandardMaterial && m.name.startsWith('MAT_LED') && !found.includes(m)) {
          found.push(m);
        }
      }
    });
    leds.current = found;
  }, [scene]);

  // All tracks play together (root motion, body pitch, wheel spin, pulleys);
  // they stay paused and get scrubbed from useFrame
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.play();
      action.paused = true;
    });
  }, [actions]);

  useFrame((state, dt) => {
    const seg = SEGMENTS[beatFor(progress.current)];
    const [loopStart, loopEnd] = seg.loop;
    const pb = playback.current;

    if (pb.time < seg.entry - 1e-3 || pb.time > loopEnd + 1e-3) {
      // Outside this beat's range: seek through the timeline at speed
      const target = pb.time < seg.entry ? seg.entry : loopEnd;
      const step = SEEK_SPEED * dt;
      pb.time = pb.time < target ? Math.min(pb.time + step, target) : Math.max(pb.time - step, target);
      pb.dir = pb.time >= loopEnd ? -1 : 1;
    } else if (pb.time < loopStart) {
      // Entry run-up (the boot sequence) plays through once at 1x
      pb.time += dt;
    } else {
      pb.time += dt * pb.dir;
      if (pb.time >= loopEnd) {
        pb.time = loopEnd;
        pb.dir = -1;
      } else if (pb.time <= loopStart) {
        pb.time = loopStart;
        pb.dir = 1;
      }
    }

    Object.values(actions).forEach((action) => {
      if (action) action.time = Math.min(pb.time, action.getClip().duration);
    });
    mixer.update(0);

    const ledColor = LED_BEAT_COLORS[beatFor(progress.current)];
    const pulse = 1.4 + Math.sin(state.clock.elapsedTime * 2.4) * 0.45;
    for (const led of leds.current) {
      led.emissive.lerp(ledColor, Math.min(1, dt * 4));
      led.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={group} scale={fit.scale} position={fit.position}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Cinematic shot list — one key per story beat, landed at scroll
 * 0 / .25 / .5 / .75 / 1 by a GSAP ScrollTrigger-scrubbed timeline with
 * power2.inOut easing between keys. The camera dollies, orbits and zooms;
 * the robot only turns in place (±30° max) and takes one small step
 * forward for the stabilization beat, so nothing ever leaves the frame.
 */
const SHOT_KEYS = [
  // 1 — hero: upright 3/4 pose in the right half, ~60% of viewport height.
  // The look target sits left of the robot: that is what pushes it out of
  // the text column and into the right side of the frame
  { camX: 0.3, camY: 0.25, camZ: HERO_DIST, lookX: 0.25, lookY: -0.02, lookZ: 0, yaw: 0.4, posZ: 0 },
  // 2 — slow push-in on the wheel assembly, robot turns 20°
  { camX: 0.4, camY: -0.24, camZ: 1.9, lookX: 0.45, lookY: -0.32, lookZ: 0, yaw: 0.75, posZ: 0 },
  // 3 — stabilization: robot steps forward, camera tracks at mid distance
  { camX: 0.2, camY: 0.12, camZ: 2.75, lookX: 0.4, lookY: -0.1, lookZ: 0.25, yaw: 0.7, posZ: 0.25 },
  // 4 — electronics: orbit to the opposite shoulder, robot turns the other way
  { camX: -0.35, camY: 0.2, camZ: 2.6, lookX: 0.4, lookY: 0.0, lookZ: 0, yaw: -0.1, posZ: 0 },
  // 5 — finale: low, slightly wider hero framing
  { camX: 0.25, camY: -0.1, camZ: HERO_DIST * 1.05, lookX: 0.3, lookY: 0.05, lookZ: 0, yaw: 0.45, posZ: 0 },
];

type Shot = (typeof SHOT_KEYS)[number];

type SceneProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  shot: Shot;
  manualSpin: React.MutableRefObject<number>;
  isMobile: boolean;
  accent: string;
};

function Scene({ containerRef, shot, manualSpin, isMobile, accent }: SceneProps) {
  const robotRef = useRef<Group | null>(null);
  const stageRef = useRef<Group | null>(null);
  const progressRef = useRef(0);
  const { camera } = useThree();

  const lookTarget = useRef(new THREE.Vector3(SHOT_KEYS[0].lookX, SHOT_KEYS[0].lookY, SHOT_KEYS[0].lookZ));

  const src = asset(isMobile ? MODEL_URLS.mobile : MODEL_URLS.desktop);

  useFrame((state, dt) => {
    const robot = robotRef.current;
    if (!robot) return;

    const p = getScrollProgress(containerRef.current);
    progressRef.current = p;
    const t = state.clock.elapsedTime;
    const damp = THREE.MathUtils.damp;

    // The scrubbed timeline supplies the shot; mobile reframes it so the
    // robot sits centered above the text cards
    let cx = shot.camX;
    let cy = shot.camY;
    let cz = shot.camZ;
    let lx = shot.lookX;
    let ly = shot.lookY;
    if (isMobile) {
      cx *= 0.3;
      cz += 0.45;
      lx = 0;
      ly = ly * 0.4 - 0.42;
    }

    // Camera-side life: a slow parallax orbit in the hero and around the
    // electronics beat, constant breathing. The camera carries the feeling
    // of motion — the robot's own balancing is baked into BodyAction
    const orbit = Math.max(0, 1 - p * 5) + 0.5 * Math.exp(-((p - 0.75) ** 2) / 0.01);
    cx += Math.sin(t * 0.22) * 0.1 * orbit;
    cz += (Math.cos(t * 0.22) - 1) * 0.06 * orbit;
    cy += Math.sin(t * 0.55) * 0.02;

    camera.position.x = damp(camera.position.x, cx, 2.8, dt);
    camera.position.y = damp(camera.position.y, cy, 2.8, dt);
    camera.position.z = damp(camera.position.z, cz, 2.8, dt);
    lookTarget.current.x = damp(lookTarget.current.x, lx, 3.2, dt);
    lookTarget.current.y = damp(lookTarget.current.y, ly, 3.2, dt);
    lookTarget.current.z = damp(lookTarget.current.z, shot.lookZ, 3.2, dt);
    camera.lookAt(lookTarget.current);

    // Robot: keyframed turn-in-place (≤ ±30°) + drag spin + a gyroscopic
    // micro-correction so it never reads as a static prop
    const yaw = shot.yaw + manualSpin.current + Math.sin(t * 0.7) * 0.012;
    robot.rotation.y = damp(robot.rotation.y, yaw, 4, dt);
    robot.position.x = damp(robot.position.x, isMobile ? 0 : REST_X, 3.5, dt);
    robot.position.z = damp(robot.position.z, shot.posZ, 3, dt);
    robot.scale.setScalar(damp(robot.scale.x, isMobile ? 0.8 : 1, 3, dt));

    if (stageRef.current) {
      stageRef.current.position.x = robot.position.x;
      stageRef.current.position.z = robot.position.z;
    }
  });

  return (
    <>
      <group ref={robotRef} position={[REST_X, GROUND_Y, 0]} rotation={[0, SHOT_KEYS[0].yaw, 0]} dispose={null}>
        <RobotModel url={src} progress={progressRef} />
      </group>

      {/* Product stage: soft disc, accent rings and contact shadows keep
          the robot physically grounded; it tracks the robot's x position */}
      <group ref={stageRef} position={[REST_X, GROUND_Y, 0]}>
        <mesh rotation-x={-Math.PI / 2} position-y={0.002}>
          <circleGeometry args={[1.7, 64]} />
          <meshBasicMaterial color={accent} transparent opacity={0.035} depthWrite={false} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position-y={0.004}>
          <ringGeometry args={[0.95, 0.965, 96]} />
          <meshBasicMaterial color={accent} transparent opacity={0.28} depthWrite={false} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position-y={0.004}>
          <ringGeometry args={[1.45, 1.457, 96]} />
          <meshBasicMaterial color={accent} transparent opacity={0.12} depthWrite={false} />
        </mesh>
        <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={5} blur={2.2} far={1.4} resolution={512} />
      </group>
    </>
  );
}

const PHASES = [
  { at: BEAT_AT[0], label: 'Scroll to begin exploration' },
  { at: BEAT_AT[1], label: 'Exploring the wheel design' },
  { at: BEAT_AT[2], label: 'Demonstrating self-balancing' },
  { at: BEAT_AT[3], label: 'Viewing the electronics' },
  { at: BEAT_AT[4], label: 'Explore the full assembly' },
];

const techStack = [
  { name: 'Fusion 360', icon: 'resources/icons/Fusion360.svg' },
  { name: 'ESP32', icon: 'resources/icons/esp32.svg' },
  { name: 'Bambu A1 Mini', icon: 'resources/icons/Bambu.png' },
];

const stats = [
  { value: '<$80', label: 'Bill of materials' },
  { value: '200+', label: 'Students reached' },
  { value: '2 hrs', label: 'Battery runtime' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardWidth = 'pointer-events-auto w-full md:max-w-md lg:max-w-lg xl:max-w-xl glass-card rounded-2xl p-6 sm:p-8';

export default function GypulShowcase(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const accent = useAccentColor();

  // Extra rotation from dragging on the canvas (desktop only)
  const manualSpin = useRef(0);
  const dragState = useRef({ dragging: false, lastX: 0 });

  // The current shot, mutated by the scrubbed GSAP timeline and read by the
  // 3D scene every frame (damping there smooths over the scrub)
  const shotRef = useRef<Shot>({ ...SHOT_KEYS[0] });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    gsap.registerPlugin(ScrollTrigger);

    // The app scrolls inside a nested custom-scrollbars viewport, not the
    // window — point ScrollTrigger at whichever ancestor actually scrolls
    let scroller: HTMLElement | undefined;
    for (let el = container.parentElement; el; el = el.parentElement) {
      if (el.scrollHeight > el.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) {
        scroller = el;
        break;
      }
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', duration: 1 },
      scrollTrigger: {
        trigger: container,
        ...(scroller ? { scroller } : {}),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
    SHOT_KEYS.slice(1).forEach((key, i) => tl.to(shotRef.current, { ...key }, i));

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const barProgress = useMotionValue(0);
  const hintOpacity = useTransform(barProgress, [0, 0.06], [1, 0]);
  const [phase, setPhase] = useState(0);

  // Capture-phase listener sees scrolls of any container, and the rect
  // math matches what the 3D scene samples every frame
  useEffect(() => {
    const update = () => {
      const p = getScrollProgress(containerRef.current);
      barProgress.set(p);
      let idx = 0;
      for (let i = 0; i < PHASES.length; i++) {
        if (p >= PHASES[i].at) idx = i;
      }
      setPhase(idx);
    };
    update();
    window.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [barProgress]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = { dragging: true, lastX: e.clientX };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    manualSpin.current += (e.clientX - dragState.current.lastX) * 0.008;
    dragState.current.lastX = e.clientX;
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  return (
    <section className="scroll-smooth focus:scroll-auto">
      <Header />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX: barProgress }}
      />

      <div ref={containerRef} className="relative min-h-screen pt-20">
        {/* Fullscreen Canvas background. Pointer events are off on mobile so
            touch-drag scrolls the page; on desktop dragging spins the robot */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none md:pointer-events-auto md:cursor-grab md:active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [SHOT_KEYS[0].camX, SHOT_KEYS[0].camY, SHOT_KEYS[0].camZ], fov: FOV }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace,
            }}
          >
            <Environment preset="studio" background={false} />

            <ambientLight intensity={0.35} />
            <directionalLight intensity={0.7} position={[4, 6, 4]} castShadow />
            <directionalLight intensity={0.25} position={[-5, 2, -3]} />
            {/* Rim light separates the robot from the background */}
            <directionalLight intensity={1.0} position={[-3, 4, -4]} />

            <React.Suspense fallback={<LoaderSpinner />}>
              <Scene containerRef={containerRef} shot={shotRef.current} manualSpin={manualSpin} isMobile={isMobile} accent={accent} />
            </React.Suspense>
          </Canvas>
        </div>

        {/* Experience-state indicator: label follows the current story beat */}
        <div className="fixed bottom-5 inset-x-0 z-20 flex justify-center pointer-events-none px-4">
          <div className="glass-card rounded-full px-4 py-2 text-xs sm:text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <motion.span
              key={PHASES[phase].label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {PHASES[phase].label}
            </motion.span>
            <span className="hidden md:inline opacity-60">· drag to rotate</span>
          </div>
        </div>

        {/* Page content. The wrapper ignores pointer events so drags over
            empty space reach the canvas; cards re-enable them */}
        <main className="relative z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Back button */}
            <button
              onClick={() => navigate('/projects')}
              className="pointer-events-auto flex items-center text-sm hover:text-accent transition-colors mt-4 mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>

            {/* Hero / Overview */}
            <section id="overview" className="min-h-[calc(100vh-9rem)] flex items-center relative">
              <motion.div
                className={`${cardWidth} mt-[38vh] md:mt-0`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.span
                  variants={itemVariants}
                  className="inline-block text-xs sm:text-sm font-mono tracking-widest uppercase text-hex border border-accent rounded-full px-3 py-1 mb-4"
                >
                  Open Source Robotics
                </motion.span>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
                >
                  Meet <span className="text-hex">Gypul</span>
                </motion.h1>
                <motion.p variants={itemVariants} className="mb-6 text-base sm:text-lg">
                  Gypul is a self-balancing robot platform designed to bring robotics education within reach of students across Africa. Built with affordability and accessibility in mind, this open-source project uses 3D-printed parts, an ESP32 microcontroller, and proven stabilization algorithms. Rotate the 3D model to explore its design, or scroll down to discover the technology behind this innovative learning tool.
                </motion.p>
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="glass-card rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-hex">{stat.value}</div>
                      <div className="text-xs sm:text-sm opacity-70 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <a href="#design" className="custom-button inline-block">Explore Design</a>
                </motion.div>
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                style={{ opacity: hintOpacity }}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs opacity-70"
              >
                <span className="mb-1">Scroll to explore</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </motion.div>
            </section>

            {/* Design & Engineering — wheel assembly close-up */}
            <section id="design" className="min-h-[80vh] flex items-center py-12 sm:py-16">
              <motion.div
                className={cardWidth}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.span variants={itemVariants} className="block text-sm font-mono text-hex mb-2">
                  01 — Hardware
                </motion.span>
                <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold mb-3">
                  Design &amp; Engineering
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-base sm:text-lg">
                  Every component of Gypul has been carefully designed for educational value and ease of assembly. The chassis is modeled in Autodesk Fusion 360, optimized for strength while minimizing material costs. Parts are 3D printed on a Bambu Lab A1 Mini using PLA filament, making reproduction accessible to schools and makerspaces with limited budgets. The mechanical design features a two-wheeled balancing system with a low center of gravity for stable operation. An ESP32 microcontroller serves as the brain, providing WiFi connectivity for remote monitoring and firmware updates. The modular design allows students to experiment with different sensors, motors, and control algorithms without redesigning the entire platform.
                </motion.p>
                <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 border rounded-lg px-3 py-2 sm:px-4 hover:border-accent transition-all duration-300"
                      style={{ borderColor: 'var(--surface-border)' }}
                      title={tech.name}
                    >
                      <img
                        className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
                        alt={tech.name}
                        src={asset(tech.icon)}
                      />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* Electronics & Control — stabilization system & tracking shot */}
            <section id="electronics" className="min-h-[80vh] flex items-center py-12 sm:py-16">
              <motion.div
                className={cardWidth}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.span variants={itemVariants} className="block text-sm font-mono text-hex mb-2">
                  02 — Electronics
                </motion.span>
                <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold mb-3">
                  Electronics &amp; Control
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-base sm:text-lg">
                  The electronics system is built around an MPU6050 inertial measurement unit (IMU) that provides real-time orientation data through sensor fusion of accelerometer and gyroscope readings. This data feeds into a PID (Proportional-Integral-Derivative) control loop that calculates the precise motor adjustments needed to maintain balance. A custom-designed PCB consolidates the motor driver, power management, and sensor connections into a compact package that fits within the robot's chassis. Dual DC motors with encoders provide smooth, controlled motion while allowing students to experiment with speed control and position tracking. The entire system is powered by a rechargeable lithium-ion battery pack, providing up to 2 hours of continuous operation for extended learning sessions.
                </motion.p>
                <motion.div variants={itemVariants} className="flex gap-2 flex-wrap">
                  <span className="inline-block text-sm border px-3 py-2 rounded" style={{ borderColor: 'var(--surface-border)' }}>IMU / Sensor Fusion</span>
                  <span className="inline-block text-sm border px-3 py-2 rounded" style={{ borderColor: 'var(--surface-border)' }}>PID Control</span>
                </motion.div>
              </motion.div>
            </section>

            {/* Impact & Accessibility — pull back & final CTA */}
            <section id="impact" className="min-h-[80vh] flex items-center py-12 sm:py-16">
              <motion.div
                className={cardWidth}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.span variants={itemVariants} className="block text-sm font-mono text-hex mb-2">
                  03 — Mission
                </motion.span>
                <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold mb-3">
                  Impact &amp; Accessibility
                </motion.h2>
                <motion.p variants={itemVariants} className="mb-6 text-base sm:text-lg">
                  Gypul was created with a clear mission: to democratize robotics education in regions where access to advanced learning tools is limited. With a bill of materials under $80 USD and all design files available under an open-source license, schools and community organizations can build their own robots without prohibitive costs. The project includes comprehensive documentation, assembly guides, and curriculum resources that teachers can adapt to their classrooms. By focusing on locally available materials and common fabrication methods, Gypul can be manufactured and maintained without relying on expensive imported components. Students who build and program Gypul gain practical experience in mechanical design, electronics, programming, and control theory—skills that are increasingly vital in today's technology-driven economy. This project has already reached over 200 students across Zambia, inspiring the next generation of African engineers and innovators.
                </motion.p>
                <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
                  <button onClick={() => navigate('/projects')} className="custom-button inline-block">
                    View All Projects
                  </button>
                  <span className="inline-block text-sm border px-3 py-2 rounded" style={{ borderColor: 'var(--surface-border)' }}>Open Source Hardware</span>
                  <span className="inline-block text-sm border px-3 py-2 rounded" style={{ borderColor: 'var(--surface-border)' }}>Educational Impact</span>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </section>
  );
}
