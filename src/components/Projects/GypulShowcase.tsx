import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { OrbitControls, useGLTF, Html, useProgress, Preload } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

type RobotModelProps = {
  scrollProgress: import('framer-motion').MotionValue<number>;
};

function LoaderSpinner() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <svg className="w-12 h-12 animate-spin text-accent" viewBox="0 0 24 24" fill="none" role="img" aria-label="Loading">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-sm mt-3 text-gray-300">Loading model {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

function RobotModel({ scrollProgress }: RobotModelProps) {
  const ref = useRef<Group | null>(null);
  const { camera } = useThree();

  // transform scroll [0..1] to rotation/position ranges
  const rotRange = useTransform(scrollProgress, [0, 1], [0, Math.PI * 1.4]);
  const yRange = useTransform(scrollProgress, [0, 1], [0.05, -0.06]);
  const zRange = useTransform(scrollProgress, [0, 1], [3.2, 2.4]); // camera zoom-like effect

  // Local get function for MotionValue
  function RobotModel({ scrollProgress }: RobotModelProps) {
    const ref = useRef<Group | null>(null);
    const { camera } = useThree();
    
    // Load the GLB model - hooks must be called unconditionally
    const gltf = useGLTF(`${process.env.PUBLIC_URL}/resources/3D_Models/robotcar.glb`) as any;
  
    // transform scroll [0..1] to rotation/position ranges
    const rotRange = useTransform(scrollProgress, [0, 1], [0, Math.PI * 1.4]);
    const yRange = useTransform(scrollProgress, [0, 1], [0.05, -0.06]);
    const zRange = useTransform(scrollProgress, [0, 1], [3.2, 2.4]);
  
    useFrame(() => {
      if (!ref.current) return;
      const rot = (rotRange as any).get();
      const y = (yRange as any).get();
      const z = (zRange as any).get();
  
      ref.current.rotation.y += (rot - ref.current.rotation.y) * 0.08;
      ref.current.rotation.x += (Math.sin(performance.now() / 2000) * 0.02 - ref.current.rotation.x) * 0.02;
      ref.current.position.y += (y - (ref.current.position.y ?? 0)) * 0.06;
  
      camera.position.lerp({ x: 0, y: 0.2 + y * 0.6, z }, 0.06);
      camera.lookAt(0, 0, 0);
    });
  
    return (
      <group ref={ref} dispose={null}>
        {gltf?.scene ? (
          <primitive object={gltf.scene} scale={0.95} />
        ) : (
          // Fallback mesh if model doesn't load
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0CFFBB" metalness={0.5} roughness={0.5} />
          </mesh>
        )}
      </group>
    );
  }

  // Temporary placeholder until GLB loads - you'll see a cyan box
  return (
    <group ref={ref} dispose={null}>
      {/* Temporary test mesh - replace with model once path is fixed */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0CFFBB" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function GypulShowcase(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // fade variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <section className="scroll-smooth focus:scroll-auto">
      <Header />
      <div ref={containerRef} className="relative min-h-screen text-white pt-20">
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center text-sm text-gray-300 hover:text-accent transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>

        {/* Fullscreen Canvas / background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#071033] to-[#000000] opacity-95" />
          <Canvas camera={{ position: [0, 0.6, 3.2], fov: 35 }}>
            {/* ambient / rim lights */}
            <ambientLight intensity={0.4} />
            <directionalLight intensity={0.6} position={[5, 5, 5]} />
            <directionalLight intensity={0.2} position={[-5, -2, -5]} />
            {/* OrbitControls allow user interaction */}
            <OrbitControls enablePan enableZoom enableRotate makeDefault rotateSpeed={0.6} />
            {/* Show loader while model loads */}
            <React.Suspense fallback={<LoaderSpinner />}>
              <RobotModel scrollProgress={scrollYProgress} />
              <Preload all />
            </React.Suspense>
          </Canvas>
        </div>

        {/* Page content sections */}
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Intro / Overview */}
            <section id="overview" className="min-h-[70vh] flex items-center py-12">
              <motion.div
                className="max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
              >
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                  Meet Gypul
                </h1>
                <p className="text-gray-300 mb-6 text-lg">
                  Meet Gypul: a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                  a self-balancing robot built for education. Interact with the 3D model — rotate or zoom — or scroll to reveal features.
                </p>
                <a href="#design" className="custom-button inline-block">Explore Design</a>
              </motion.div>
            </section>

            {/* Design & Engineering */}
            <section id="design" className="min-h-[70vh] flex items-center py-12">
              <motion.div
                className="max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl font-bold mb-3">Design & Engineering</h2>
                <p className="text-gray-300 mb-4 text-lg">
                  Designed in Fusion 360, 3D printed on a Bambu A1 Mini, and powered by an ESP32 microcontroller. The chassis is optimized for durability and easy assembly.
                  Designed in Fusion 360, 3D printed on a Bambu A1 Mini, and powered by an ESP32 microcontroller. The chassis is optimized for durability and easy assembly.
                  Designed in Fusion 360, 3D printed on a Bambu A1 Mini, and powered by an ESP32 microcontroller. The chassis is optimized for durability and easy assembly.
                  Designed in Fusion 360, 3D printed on a Bambu A1 Mini, and powered by an ESP32 microcontroller. The chassis is optimized for durability and easy assembly.
                  Designed in Fusion 360, 3D printed on a Bambu A1 Mini, and powered by an ESP32 microcontroller. The chassis is optimized for durability and easy assembly.
                </p>
                <div className="space-x-3">
                  <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">Fusion 360</span>
                  <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">Bambu A1 Mini</span>
                  <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">ESP32</span>
                </div>
              </motion.div>
            </section>

            {/* Electronics & Control */}
            <section id="electronics" className="min-h-[70vh] flex items-center py-12">
              <motion.div
                className="max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl font-bold mb-3">Electronics & Control</h2>
                <p className="text-gray-300 mb-4 text-lg">
                  Features IMU-based stabilization, a custom PCB, and dual motor control. Students can experiment with PID tuning and sensor fusion algorithms.
                </p>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded mr-2">IMU / Sensor</span>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">Motor Control</span>
              </motion.div>
            </section>

            {/* Impact & Accessibility */}
            <section id="impact" className="min-h-[70vh] flex items-center py-12">
              <motion.div
                className="max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl font-bold mb-3">Impact & Accessibility</h2>
                <p className="text-gray-300 mb-4 text-lg">
                  Built for students across Africa — affordable, open-source, and inspiring. Gypul aims to lower the barrier to hands-on robotics education.
                </p>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">Open Source</span>
              </motion.div>
            </section>

            {/* Project Description after showcase */}
            <section className="py-12">
              <div className="max-w-3xl mx-auto interactive-card p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Project Description</h3>
                <p className="text-gray-300">
                  Gypul is a low-cost self-balancing robot platform designed to make robotics education accessible in Zambia and across Africa. Built with 3D printed parts, an ESP32 brain, and open-source software, it aims to inspire young innovators through affordable learning tools.
                </p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => navigate('/programs')} className="custom-button">
                    Explore Programs
                  </button>
                  <button onClick={() => navigate('/support')} className="px-4 py-2 rounded border border-white/10 text-sm hover:border-accent">
                    Support This Project
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </section>
  );
}