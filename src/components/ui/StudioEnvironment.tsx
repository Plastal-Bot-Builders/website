import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

/**
 * Studio-style image-based lighting generated in-scene.
 *
 * Replaces drei's `<Environment preset="studio" />`, which fetches an HDR map
 * at runtime from a third-party GitHub proxy:
 *   https://raw.githack.com/pmndrs/drei-assets/<commit>/hdri/studio_small_03_1k.hdr
 *
 * That was an uncontrolled production dependency — it leaks visitor IPs to a
 * third party, breaks the 3D viewer if the proxy is unavailable (it currently
 * answers 403 to direct requests), and forces the site's Content-Security-Policy
 * to allow an external host. Lightformers are rendered into a cube target
 * locally, so the reflections stay without any network request.
 */
const StudioEnvironment: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => (
  <Environment resolution={256} background={false}>
    {/* Large soft key light above the subject */}
    <Lightformer
      intensity={3 * intensity}
      position={[0, 5, -2]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[10, 10, 1]}
      form="rect"
    />
    {/* Fill from camera-left */}
    <Lightformer
      intensity={1.2 * intensity}
      position={[-5, 1, 1]}
      rotation={[0, Math.PI / 2, 0]}
      scale={[6, 6, 1]}
      form="rect"
    />
    {/* Rim/kicker from behind-right to separate the model from the background */}
    <Lightformer
      intensity={2 * intensity}
      position={[5, 2, -3]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={[6, 6, 1]}
      form="rect"
    />
    {/* Gentle bounce from below so undersides aren't pure black */}
    <Lightformer
      intensity={0.6 * intensity}
      position={[0, -4, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[10, 10, 1]}
      form="rect"
    />
  </Environment>
);

export default StudioEnvironment;
