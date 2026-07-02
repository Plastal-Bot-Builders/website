import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { Html, useProgress, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
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

const OBJModel: React.FC<{ url: string }> = ({ url }) => {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj.clone()} />;
};

const GROUND_Y = -0.6;

/**
 * Gypul.obj is a Fusion 360 Z-up export with measured bounds
 * min(-10, -8.7, -7.8) / max(9, 3, 15.2) — its height runs along Z.
 * Rotating -90° about X stands it upright (Z becomes Y-up); the baked
 * offsets center it and put the wheel bottoms exactly on y = 0.
 * If the model ever renders upside down after a re-export, flip the X
 * rotation to +90° and swap the 7.8 for 15.2 in the Y offset.
 */
const OBJ_SCALE = 1.15 / 22.9;
const OBJ_OFFSET: [number, number, number] = [0.5 * OBJ_SCALE, 7.8 * OBJ_SCALE, -2.85 * OBJ_SCALE];

/**
 * Scroll-linked camera choreography. Each key frames one story beat:
 * hero wide shot → wheel close-up → tracking shot as the robot crosses →
 * electronics close-up → pull back to the centered full assembly.
 */
const CAM_KEYS = [
  { t: 0.0, cam: [0.0, 0.45, 3.6], look: [0.3, 0.15, 0], x: 1.0 },
  { t: 0.22, cam: [1.5, -0.28, 2.2], look: [0.6, -0.38, 0], x: 1.0 },
  { t: 0.48, cam: [1.8, 0.2, 2.9], look: [0.35, 0.0, 0], x: 0.7 },
  { t: 0.72, cam: [0.75, 0.05, 2.0], look: [0.55, 0.08, 0], x: 0.85 },
  { t: 1.0, cam: [0.0, 0.65, 4.5], look: [0.05, 0.05, 0], x: 0.5 },
] as const;

const _camNext = new THREE.Vector3();
const _lookNext = new THREE.Vector3();

/** Samples the keyframe track at progress p; returns the robot's x target. */
function sampleCamera(p: number, cam: THREE.Vector3, look: THREE.Vector3): number {
  let i = 0;
  while (i < CAM_KEYS.length - 2 && p > CAM_KEYS[i + 1].t) i++;
  const a = CAM_KEYS[i];
  const b = CAM_KEYS[i + 1];
  const k = THREE.MathUtils.smootherstep((p - a.t) / (b.t - a.t), 0, 1);
  cam.fromArray(a.cam).lerp(_camNext.fromArray(b.cam), k);
  look.fromArray(a.look).lerp(_lookNext.fromArray(b.look), k);
  return THREE.MathUtils.lerp(a.x, b.x, k);
}

type SceneProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  manualSpin: React.MutableRefObject<number>;
  isMobile: boolean;
  accent: string;
};

function Scene({ containerRef, manualSpin, isMobile, accent }: SceneProps) {
  const robotRef = useRef<Group | null>(null);
  const stageRef = useRef<Group | null>(null);
  const innerRef = useRef<Group | null>(null);
  const { camera } = useThree();

  const camTarget = useRef(new THREE.Vector3(0, 0.45, 3.6));
  const lookSample = useRef(new THREE.Vector3(0.3, 0.15, 0));
  const lookTarget = useRef(new THREE.Vector3(0.3, 0.15, 0));

  const src = asset('resources/3D_Models/Gypul.obj');

  useLayoutEffect(() => {
    innerRef.current?.traverse((o: THREE.Object3D) => {
      if (isMeshObject(o)) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, []);

  useFrame((state, dt) => {
    const robot = robotRef.current;
    if (!robot) return;

    const p = getScrollProgress(containerRef.current);
    const t = state.clock.elapsedTime;
    const damp = THREE.MathUtils.damp;

    const modelX = sampleCamera(p, camTarget.current, lookSample.current);
    if (isMobile) {
      // Center the robot and aim below it so it frames into the upper
      // part of the screen, above the text cards
      camTarget.current.x *= 0.4;
      camTarget.current.z += 0.35;
      lookSample.current.x = 0;
      lookSample.current.y = lookSample.current.y * 0.4 - 0.42;
    }

    // Idle life: the balancing act intensifies around the electronics
    // beat (p ≈ 0.7), the camera slowly orbits in the hero and always
    // keeps a slight breathing motion
    const balanceBoost = 1 + 2.4 * Math.exp(-((p - 0.7) ** 2) / 0.006);
    const heroOrbit = Math.max(0, 1 - p * 6);
    camTarget.current.x += Math.sin(t * 0.22) * 0.28 * heroOrbit;
    camTarget.current.y += Math.sin(t * 0.55) * 0.03;

    // Robot: one full turn across the page + drag spin, self-balancing
    // sway pivoting on the wheels, micro corrections along x
    const yaw = 0.45 + p * Math.PI * 2 + manualSpin.current;
    robot.rotation.y = damp(robot.rotation.y, yaw, 5, dt);
    robot.rotation.x = Math.sin(t * 1.9) * 0.018 * balanceBoost;
    robot.rotation.z = Math.sin(t * 1.35) * 0.024 * balanceBoost;

    const jitter = Math.sin(t * 2.7) * 0.008 * balanceBoost;
    const targetX = (isMobile ? 0 : modelX) + jitter;
    robot.position.x = damp(robot.position.x, targetX, 3.5, dt);
    robot.scale.setScalar(damp(robot.scale.x, isMobile ? 0.8 : 1, 3, dt));

    if (stageRef.current) stageRef.current.position.x = robot.position.x;

    camera.position.x = damp(camera.position.x, camTarget.current.x, 3, dt);
    camera.position.y = damp(camera.position.y, camTarget.current.y, 3, dt);
    camera.position.z = damp(camera.position.z, camTarget.current.z, 3, dt);
    lookTarget.current.x = damp(lookTarget.current.x, lookSample.current.x, 3.5, dt);
    lookTarget.current.y = damp(lookTarget.current.y, lookSample.current.y, 3.5, dt);
    lookTarget.current.z = damp(lookTarget.current.z, lookSample.current.z, 3.5, dt);
    camera.lookAt(lookTarget.current);
  });

  return (
    <>
      <group ref={robotRef} position={[1.0, GROUND_Y, 0]} rotation={[0, 0.45, 0]} dispose={null}>
        <group position={OBJ_OFFSET} rotation={[-Math.PI / 2, 0, 0]} scale={OBJ_SCALE}>
          <group ref={innerRef}>
            <OBJModel url={src} />
          </group>
        </group>
      </group>

      {/* Product stage: soft disc, accent rings and contact shadows keep
          the robot physically grounded; it tracks the robot's x position */}
      <group ref={stageRef} position={[1.0, GROUND_Y, 0]}>
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
  { at: 0, label: 'Scroll to begin exploration' },
  { at: 0.08, label: 'Exploring the design' },
  { at: 0.35, label: 'Analyzing the stabilization system' },
  { at: 0.6, label: 'Viewing the electronics' },
  { at: 0.82, label: 'Explore the full assembly' },
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
            camera={{ position: [0, 0.45, 3.6], fov: 35 }}
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
              <Scene containerRef={containerRef} manualSpin={manualSpin} isMobile={isMobile} accent={accent} />
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
