import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { OrbitControls, useGLTF, Html, useProgress, Preload } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  // GLB loader - adjust to your model
  const gltf = useGLTF(`${process.env.PUBLIC_URL}/resources/3D_Models/robotcar.glb`) as any;
  const ref = useRef<Group | null>(null);
  const { camera } = useThree();

  // transform scroll [0..1] to rotation/position ranges
  const rotRange = useTransform(scrollProgress, [0, 1], [0, Math.PI * 1.4]);
  const yRange = useTransform(scrollProgress, [0, 1], [0.05, -0.06]);
  const zRange = useTransform(scrollProgress, [0, 1], [3.2, 2.4]); // camera zoom-like effect

  // Local get function for MotionValue
  useFrame(() => {
    if (!ref.current) return;
    const rot = (rotRange as any).get(); // number
    const y = (yRange as any).get();
    const z = (zRange as any).get();

    // smooth rotation/pos lerp
    ref.current.rotation.y += (rot - ref.current.rotation.y) * 0.08;
    ref.current.rotation.x += (Math.sin(performance.now() / 2000) * 0.02 - ref.current.rotation.x) * 0.02;
    ref.current.position.y += (y - (ref.current.position.y ?? 0)) * 0.06;

    // subtly move camera for parallax
    camera.position.lerp({ x: 0, y: 0.2 + y * 0.6, z }, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref} dispose={null}>
      <primitive object={gltf.scene} scale={0.95} />
    </group>
  );
}

export default function GypulShowcase(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [mounted, setMounted] = useState(false);

  // fade variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen text-white">
      {/* Sticky navbar */}
      <nav className="sticky top-0 z-40 bg-gradient-to-b from-transparent to-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-semibold text-sm opacity-80">Plastal-Bot</Link>
            <div className="h-6 w-px bg-white/10" />
            <a href="#overview" className="text-sm hover:text-accent transition-colors">Overview</a>
            <a href="#design" className="text-sm hover:text-accent transition-colors">Design</a>
            <a href="#electronics" className="text-sm hover:text-accent transition-colors">Electronics</a>
            <a href="#impact" className="text-sm hover:text-accent transition-colors">Impact</a>
          </div>

          <div className="text-sm opacity-80 hidden sm:flex">Gypul — The Self-Balancing Robot</div>
        </div>
      </nav>

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
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Intro / Overview */}
          <section id="overview" className="min-h-screen flex items-center">
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
              </p>
              <a href="#design" className="inline-block bg-accent px-5 py-3 rounded-lg text-black font-bold">Explore Design</a>
            </motion.div>
          </section>

          {/* Design & Engineering */}
          <section id="design" className="min-h-screen flex items-center">
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
              </p>
              <div className="space-x-3">
                <a className="text-sm border border-white/10 px-3 py-2 rounded hover:border-accent">Fusion 360</a>
                <a className="text-sm border border-white/10 px-3 py-2 rounded hover:border-accent">Bambu A1 Mini</a>
                <a className="text-sm border border-white/10 px-3 py-2 rounded hover:border-accent">ESP32</a>
              </div>
            </motion.div>
          </section>

          {/* Electronics & Control */}
          <section id="electronics" className="min-h-screen flex items-center">
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
              <a className="text-sm border border-white/10 px-3 py-2 rounded hover:border-accent">IMU / Sensor</a>
              <a className="text-sm border border-white/10 px-3 py-2 rounded hover:border-accent">Motor Control</a>
            </motion.div>
          </section>

          {/* Impact & Accessibility */}
          <section id="impact" className="min-h-screen flex items-center">
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
              <a className="text-sm border border-white/10 px-3 py-2 rounded hover:border-accent">Open Source</a>
            </motion.div>
          </section>

          {/* Project Description after showcase */}
          <section className="py-16">
            <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-3">Project Description</h3>
              <p className="text-gray-300">
                Gypul is a low-cost self-balancing robot platform designed to make robotics education accessible in Zambia and across Africa. Built with 3D printed parts, an ESP32 brain, and open-source software, it aims to inspire young innovators through affordable learning tools.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}