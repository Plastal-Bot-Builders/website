import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, invalidate, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import StudioEnvironment from '../ui/StudioEnvironment';
import { asset } from '../../utils/asset';

/**
 * The RoboCore robot in 3D for the home page's RoboCore section, posed by the page's scroll position.
 *
 * As the section travels up the window the robot plays through a set of keyframes (KEYS below): it turns on the
 * spot, closes its jaws, raises its lift, and the camera climbs from near the floor to look down on the board.
 * Scroll back and it plays in reverse. On a desk the pointer nudges the view a little as well.
 *
 * The model is the one the board-test page uses (RoboCore_Board_Twin/web/models/robot.glb, the V3 robot with its
 * moving parts as separate objects, each with its origin on its pivot: wheel_L/R, lift_arm, lift_link, lift_head,
 * jaw_L/R). Draco-compressed, about 150k triangles and 0.78 MB; the decoder is self-hosted in public/draco/.
 * Nothing is drawn while the page is still: a frame is only requested when the scroll or the pointer moves, and
 * until the pose has caught up.
 */
const DRACO_PATH = asset('draco/');
const MODEL = asset('resources/RoboCore/robocore-v3-parts.glb');

/** The robot's length in scene units once fitted. */
const LENGTH = 1.4;
const rad = THREE.MathUtils.degToRad;
/** The lift's range from level, as designed: jaws on the floor, and the top. */
const LIFT_DOWN = rad(-44);
const LIFT_UP = rad(40);
/** Used when the model doesn't say (`close_deg` on `lift_head`). */
const JAW_CLOSED = rad(20);
/** Turning on the spot: each wheel rolls (half the track) / (wheel radius) times the robot's turn, 59.9 mm / 28 mm. */
const WHEEL_PER_TURN = 59.9 / 28;
const ACROSS = new THREE.Vector3(1, 0, 0);

/**
 * The keyframes: [how far the section has travelled, value]. 0 = its top edge reaches the bottom of the window,
 * 0.5 = it sits in the middle, 1 = its bottom edge leaves at the top. The robot is in full view from about 0.26 to
 * 0.68 on every screen size (the section pins it in the window on wide screens), so the story happens there:
 * jaws close, the lift rises, the robot turns from front-left round to its side and back.
 */
type Key = [number, number];
const KEYS: Record<'view' | 'elev' | 'dist' | 'lift' | 'grip', Key[]> = {
  // Where the camera stands, in degrees round the robot from straight ahead of it.
  view: [[0, -75], [0.24, -55], [0.46, 20], [0.7, 120], [1, 190]],
  // How high the camera looks from, in degrees above the floor.
  elev: [[0, 8], [0.24, 12], [0.46, 20], [0.7, 34], [1, 46]],
  // Camera distance, as a multiple of the distance that fits the robot side-on (its longest view): closer when
  // the robot is seen more end-on, where it is narrow.
  dist: [[0, 1], [0.24, 0.92], [0.46, 0.76], [0.7, 1], [1, 0.9]],
  // The lift, in degrees from level: on the floor, up to carry, a little down again on the way out.
  lift: [[0, -44], [0.3, -44], [0.46, 4], [0.62, 40], [0.8, 40], [1, 20]],
  // The jaws: 0 open, 1 closed.
  grip: [[0, 0], [0.22, 0], [0.32, 1], [0.86, 1], [1, 0.3]],
};

/** The value of a keyframed track at p. `ease` slows into and out of each key (a pose); without it the track is linear. */
function at(keys: Key[], p: number, ease = false): number {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, v0] = keys[i - 1];
      const [p1, v1] = keys[i];
      const t = (p - p0) / (p1 - p0);
      return v0 + (v1 - v0) * (ease ? t * t * (3 - 2 * t) : t);
    }
  }
  return keys[keys.length - 1][1];
}

type Wanted = { p: number; x: number; y: number };

type Rig = {
  scene: THREE.Object3D;
  /** The point the camera looks at, and how far the robot reaches from it in any pose. */
  target: THREE.Vector3;
  radius: number;
  pose: (lift: number, grip: number, turn: number) => void;
};

function buildRig(scene: THREE.Object3D): Rig {
  const part = (name: string) => scene.getObjectByName(name) || null;
  const arm = part('lift_arm');
  const link = part('lift_link');
  const head = part('lift_head');
  const jawL = part('jaw_L');
  const jawR = part('jaw_R');
  const wheelL = part('wheel_L');
  const wheelR = part('wheel_R');
  // The lift is a parallel four-bar: the arms and the links turn about their pivots on the frame, and the head keeps
  // level, carried round the links' pivot. Its level position is kept on the scene, which useGLTF shares and caches.
  if (head && !scene.userData.headAtLevel) scene.userData.headAtLevel = head.position.clone();
  const reach = head && link ? (scene.userData.headAtLevel as THREE.Vector3).clone().sub(link.position) : null;
  const closeDeg = head ? Number(head.userData.close_deg) : NaN;
  const closed = closeDeg > 0 ? rad(closeDeg) : JAW_CLOSED;

  const pose = (lift: number, grip: number, turn: number) => {
    if (arm) arm.rotation.x = lift;
    if (link) link.rotation.x = lift;
    if (head && link && reach) head.position.copy(reach).applyAxisAngle(ACROSS, lift).add(link.position);
    if (jawL) jawL.rotation.y = -grip * closed; // the left jaw's finger swings to the right
    if (jawR) jawR.rotation.y = grip * closed;
    // Turning left on the spot: the right wheel rolls forward (the top of a wheel moves to the front, -z), the left back.
    if (wheelL) wheelL.rotation.x = turn * WHEEL_PER_TURN;
    if (wheelR) wheelR.rotation.x = -turn * WHEEL_PER_TURN;
  };

  // Fit: the robot's length to LENGTH, its middle over the origin, its wheels on the floor.
  scene.scale.setScalar(1);
  scene.position.set(0, 0, 0);
  const boxAt = (lift: number) => {
    pose(lift, 0, 0);
    scene.updateMatrixWorld(true);
    return new THREE.Box3().setFromObject(scene);
  };
  const reachBox = boxAt(LIFT_DOWN).union(boxAt(LIFT_UP));
  const level = boxAt(0);
  const size = level.getSize(new THREE.Vector3());
  const centre = level.getCenter(new THREE.Vector3());
  const s = LENGTH / Math.max(size.x, size.z);
  scene.scale.setScalar(s);
  scene.position.set(-centre.x * s, -level.min.y * s, -centre.z * s);

  const top = (reachBox.max.y - level.min.y) * s;
  const target = new THREE.Vector3(0, top * 0.45, 0);
  const halfX = Math.max(centre.x - reachBox.min.x, reachBox.max.x - centre.x) * s;
  const halfZ = Math.max(centre.z - reachBox.min.z, reachBox.max.z - centre.z) * s;
  const radius = Math.hypot(Math.hypot(halfX, halfZ), Math.max(target.y, top - target.y));
  return { scene, target, radius, pose };
}

function Robot({ wanted, onReady }: { wanted: React.MutableRefObject<Wanted>; onReady: () => void }) {
  const { scene } = useGLTF(MODEL, DRACO_PATH);
  const { camera, size: viewport, invalidate: draw } = useThree();
  const turntable = useRef<THREE.Group>(null);
  const rig = useMemo(() => buildRig(scene), [scene]);
  const fit = useRef(6);
  const shown = useRef<Wanted | null>(null);

  // The camera distance that fits the robot's whole turn in this panel, tall or wide.
  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const vertical = rad(camera.fov) / 2;
    const horizontal = Math.atan(Math.tan(vertical) * viewport.width / viewport.height);
    fit.current = rig.radius * 0.86 / Math.sin(Math.min(vertical, horizontal));
    draw();
  }, [camera, viewport.width, viewport.height, rig.radius, draw]);

  useEffect(() => {
    onReady();
  }, [rig, onReady]);

  useFrame((_, delta) => {
    const want = wanted.current;
    // The first frame starts on the pose; after that the pose follows the scroll with a short ease. A long pause
    // between frames (nothing is drawn while the page is still) must not count as time passed.
    const now = shown.current || (shown.current = { ...want });
    const k = 1 - Math.exp(-Math.min(delta, 1 / 30) * 7);
    now.p += (want.p - now.p) * k;
    now.x += (want.x - now.x) * k;
    now.y += (want.y - now.y) * k;

    const p = now.p;
    const turn = rad(at(KEYS.view, p)) + now.x * rad(9);
    if (turntable.current) turntable.current.rotation.y = Math.PI + turn; // the robot's front is -z; the camera stands at +z
    rig.pose(rad(at(KEYS.lift, p, true)), at(KEYS.grip, p, true), turn);

    const elev = rad(at(KEYS.elev, p)) - now.y * rad(4);
    const distance = fit.current * at(KEYS.dist, p);
    camera.position.set(0, rig.target.y + distance * Math.sin(elev), distance * Math.cos(elev));
    camera.lookAt(rig.target);

    if (Math.abs(want.p - now.p) > 0.0004 || Math.abs(want.x - now.x) > 0.002 || Math.abs(want.y - now.y) > 0.002) draw();
  });

  return (
    <group ref={turntable}>
      <primitive object={rig.scene} />
    </group>
  );
}

type Props = {
  /** The element whose travel up the window drives the keyframes (the robot's panel). */
  track: React.RefObject<HTMLElement>;
  /** Called once the model is on screen, so the section can fade its still picture out. */
  onReady: () => void;
};

const RobotScrollModel: React.FC<Props> = ({ track, onReady }) => {
  const wanted = useRef<Wanted>({ p: 0.5, x: 0, y: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const read = () => {
      const box = el.getBoundingClientRect();
      const h = window.innerHeight || 1;
      wanted.current.p = Math.min(1, Math.max(0, (h - box.top) / (h + box.height)));
      if (box.bottom > -120 && box.top < h + 120) invalidate(); // only draw while the panel is near the window
    };
    // The page scrolls inside a container, and scroll events don't bubble: catch them on the way down instead.
    document.addEventListener('scroll', read, { capture: true, passive: true });
    window.addEventListener('resize', read);
    read();

    // On a desk the pointer nudges the view: a few degrees round and up or down.
    const fine = window.matchMedia('(pointer: fine)').matches;
    const moved = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      const box = el.getBoundingClientRect();
      wanted.current.x = ((event.clientX - box.left) / box.width) * 2 - 1;
      wanted.current.y = ((event.clientY - box.top) / box.height) * 2 - 1;
      invalidate();
    };
    const left = () => {
      wanted.current.x = 0;
      wanted.current.y = 0;
      invalidate();
    };
    if (fine) {
      el.addEventListener('pointermove', moved, { passive: true });
      el.addEventListener('pointerleave', left);
    }
    return () => {
      document.removeEventListener('scroll', read, { capture: true });
      window.removeEventListener('resize', read);
      el.removeEventListener('pointermove', moved);
      el.removeEventListener('pointerleave', left);
    };
  }, [track]);

  return (
    <Canvas
      // Phones have dense screens and small graphics chips: one and a half device pixels per point is plenty there.
      dpr={[1, window.matchMedia('(max-width: 767px)').matches ? 1.5 : 2]}
      frameloop="demand"
      camera={{ position: [0, 1.4, 6], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      // The canvas is a picture, not a control: clicks reach the link under it and a swipe scrolls the page.
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 4]} intensity={1.4} />
      <StudioEnvironment intensity={1} />
      <Suspense fallback={null}>
        <Robot wanted={wanted} onReady={onReady} />
      </Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={4} blur={2.6} far={1.4} resolution={256} color="#0b1020" />
    </Canvas>
  );
};

export default RobotScrollModel;
