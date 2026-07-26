import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// src/components/ModelViewer.tsx
interface ModelViewerProps {
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  modelPath: string;
  onLoad?: () => void; // Added onLoad prop
}

export function ModelViewer({ 
  cameraPosition, 
  cameraRotation, 
  modelPath, 
  onLoad 
}: ModelViewerProps) {
  const gltf = useLoader(GLTFLoader, modelPath)

  useEffect(() => {
    if (gltf && onLoad) {
      onLoad();
    }
  }, [gltf, onLoad]);

  return (
    <div style={{ height: '400px' }}>
      <Canvas camera={{ position: cameraPosition }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <primitive 
          object={gltf.scene} 
          scale={1.5} 
          rotation={cameraRotation}
        />
        <OrbitControls />
      </Canvas>
    </div>
  )
}