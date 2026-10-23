import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import StudioEnvironment from '../ui/StudioEnvironment';
import { asset } from '../../utils/asset';

/**
 * RoboCore V2 in 3D for the /robocore hero: a slow turntable the visitor can drag around.
 *
 * The model is a web copy of the Fusion model (v36): a stray part removed, same-colour materials merged, big parts
 * decimated, one mesh, Draco-compressed, about 220k triangles and 0.9 MB (see README.md here).
 * A lighter copy lost the arm's gear teeth, so phones get the same one. The Draco decoder is self-hosted in
 * public/draco/. Zoom and pan are off so the mouse wheel keeps scrolling the page; on touch screens the robot only
 * turns by itself, so a swipe over it still scrolls the page.
 */
const DRACO_PATH = asset('draco/');
const MODEL = asset('resources/RoboCore/robocore-v2.glb');

/** The robot's length in scene units once fitted: room for the arm as it turns. */
const LENGTH = 1.4;
/**
 * The robot's front (arm and sonar) faces -Z. Starting from the front left at isometric elevation matches the hero
 * render (robot_iso_fl), so the still image and the 3D model line up when one replaces the other.
 */
const CAMERA: [number, number, number] = [2.05, 2.05, -2.05];

function Robot({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url, DRACO_PATH);

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
    return scene;
  }, [scene]);

  useEffect(() => {
    onReady();
  }, [fitted, onReady]);

  return <primitive object={fitted} />;
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
