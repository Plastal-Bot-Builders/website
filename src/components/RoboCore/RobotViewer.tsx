import React, { Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import StudioEnvironment from '../ui/StudioEnvironment';
import { asset } from '../../utils/asset';

/**
 * The RoboCore robot in 3D for the /robocore hero: a slow turntable the visitor can drag around.
 *
 * The model is a web copy of the Fusion model (the V3 robot, Stage 18 V-wheel version, lift level): same-colour materials
 * merged, big parts decimated, one mesh, Draco-compressed, about 220k triangles and 0.95 MB (see README.md here).
 * A lighter copy loses the gripper's gear teeth, so phones get the same one. The Draco decoder is self-hosted in
 * public/draco/. Zoom and pan are off so the mouse wheel keeps scrolling the page; on touch screens the robot only
 * turns by itself, so a swipe over it still scrolls the page.
 */
const DRACO_PATH = asset('draco/');
const MODEL = asset('resources/RoboCore/robocore-v3.glb');

/** The robot's length in scene units once fitted: room for the arm as it turns. */
const LENGTH = 1.4;
/**
 * The robot's front (arm and sonar) faces -Z. Starting from the front left at isometric elevation matches the hero
 * render (robot_iso_fl), so the still image and the 3D model line up when one replaces the other.
 */
const CAMERA: [number, number, number] = [2.05, 2.05, -2.05];
const TARGET = new THREE.Vector3(0, 0.3, 0);

function Robot({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url, DRACO_PATH);
  const { camera, size: viewport, invalidate } = useThree();

  const fitted = useMemo(() => {
    scene.scale.setScalar(1);
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = LENGTH / Math.max(size.x, size.z);
    scene.scale.setScalar(s);
    scene.position.set(-center.x * s, -box.min.y * s, -center.z * s);
    // Bound the entire turn around the controls' target, including the raised gripper.
    const half = size.clone().multiplyScalar(s / 2);
    const centreOffset = Math.abs(size.y * s / 2 - TARGET.y);
    const radius = Math.hypot(half.x, half.y + centreOffset, half.z);
    return { scene, radius };
  }, [scene]);

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    // Fit the whole orbit, not just the initial angle. Tall desktop panels have
    // a narrower horizontal field of view than the fixed camera assumed.
    const vertical = THREE.MathUtils.degToRad(camera.fov) / 2;
    const horizontal = Math.atan(Math.tan(vertical) * viewport.width / viewport.height);
    const distance = fitted.radius * 1.12 / Math.sin(Math.min(vertical, horizontal));
    const direction = camera.position.clone().sub(TARGET).normalize();
    camera.position.copy(TARGET).addScaledVector(direction, distance);
    camera.lookAt(TARGET);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, viewport.width, viewport.height, fitted.radius, invalidate]);

  useEffect(() => {
    onReady();
  }, [fitted, onReady]);

  return <primitive object={fitted.scene} />;
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Props = {
  /** Called once the model is on screen, so the page can swap out the still render. */
  onReady: () => void;
  /** Phones and tablets: no drag, so a swipe scrolls the page. */
  compact: boolean;
  /** False while the hero is scrolled out of view: stop drawing frames. */
  visible: boolean;
};

const RobotViewer: React.FC<Props> = ({ onReady, compact, visible }) => {
  const [still] = useState(prefersReducedMotion);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: CAMERA, fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        // OrbitControls turns off touch scrolling on the canvas; on phones the controls are off, so give it back.
        if (compact) gl.domElement.style.touchAction = 'pan-y';
      }}
      aria-label="RoboCore V2 robot, 3D model"
      role="img"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, -2]} intensity={1.4} />
      <StudioEnvironment intensity={1} />
      <Suspense fallback={null}>
        <Robot url={MODEL} onReady={onReady} />
      </Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.32} scale={4} blur={2.6} far={1.4} color="#1B2A41" />
      <OrbitControls
        enabled={!compact}
        enablePan={false}
        enableZoom={false}
        autoRotate={!still}
        autoRotateSpeed={0.8}
        minPolarAngle={0.45}
        maxPolarAngle={1.4}
        target={[0, 0.3, 0]}
      />
    </Canvas>
  );
};

export default RobotViewer;
