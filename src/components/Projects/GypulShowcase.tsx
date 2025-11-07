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
  
  // Use a working free sample GLB model
  const gltf = useGLTF('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb') as any;

  // Enhanced scroll ranges for more dramatic animation
  const rotRange = useTransform(scrollProgress, [0, 1], [0, Math.PI * 4]); // More rotation
  const yRange = useTransform(scrollProgress, [0, 1], [-0.2, -0.9]); // Moved down (was 0.2, -0.3)
  const zRange = useTransform(scrollProgress, [0, 1], [3.2, 2.0]); // Zoom in effect
  const scaleRange = useTransform(scrollProgress, [0, 1], [0.5, 0.7]); // Grows as you scroll

  useFrame(() => {
    if (!ref.current) return;
    const rot = (rotRange as any).get();
    const y = (yRange as any).get();
    const z = (zRange as any).get();
    const scale = (scaleRange as any).get();

    // Smooth rotation on Y-axis (left-right spin) - INCREASED SPEED
    ref.current.rotation.y += (rot - ref.current.rotation.y) * 0.15;
    
    // Gentle bobbing motion on X-axis - INCREASED SPEED
    ref.current.rotation.x += (Math.sin(performance.now() / 1000) * 0.08 - ref.current.rotation.x) * 0.05;
    
    // Slight Z-axis tilt for dynamic feel - INCREASED SPEED
    ref.current.rotation.z = Math.sin(performance.now() / 1500) * 0.05;
    
    // Vertical position changes - INCREASED SPEED
    ref.current.position.y += (y - (ref.current.position.y ?? 0)) * 0.12;
    
    // Scale changes
    ref.current.scale.set(scale, scale, scale);

    // Camera movement with offset to the left - INCREASED SPEED
    camera.position.lerp({ x: -0.5, y: 0.2 + y * 0.6, z }, 0.12);
    camera.lookAt(-0.5, 0, 0);
  });

  return (
    <group ref={ref} dispose={null}>
      {gltf?.scene ? (
        <primitive object={gltf.scene} />
      ) : (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#0CFFBB" metalness={0.5} roughness={0.5} />
        </mesh>
      )}
    </group>
  );
}

export default function GypulShowcase(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

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
          <Canvas camera={{ position: [0, 0.6, 3.2], fov: 35 }}>
            <ambientLight intensity={0.4} />
            <directionalLight intensity={0.6} position={[5, 5, 5]} />
            <directionalLight intensity={0.2} position={[-5, -2, -5]} />
            <OrbitControls enablePan enableZoom enableRotate makeDefault rotateSpeed={0.6} />
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
            <section id="overview" className="min-h-[70vh] flex items-center">
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
                <p className="mb-6 text-lg">
                  Gypul is a self-balancing robot platform designed to bring robotics education within reach of students across Africa. Built with affordability and accessibility in mind, this open-source project uses 3D-printed parts, an ESP32 microcontroller, and proven stabilization algorithms. Whether you're a student learning PID control, a teacher introducing STEM concepts, or a maker exploring embedded systems, Gypul provides hands-on experience with real-world engineering challenges. Rotate the 3D model to explore its design, or scroll down to discover the technology behind this innovative learning tool.
                </p>
                <a href="#design" className="custom-button inline-block">Explore Design</a>
              </motion.div>
            </section>
            
            {/* Design & Engineering */}
            <section id="design" className="min-h-[70vh] flex items-center">
              <motion.div
                className="max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl font-bold mb-3">Design & Engineering</h2>
                <p className="mb-4 text-lg">
                  Every component of Gypul has been carefully designed for educational value and ease of assembly. The chassis is modeled in Autodesk Fusion 360, optimized for strength while minimizing material costs. Parts are 3D printed on a Bambu Lab A1 Mini using PLA filament, making reproduction accessible to schools and makerspaces with limited budgets. The mechanical design features a two-wheeled balancing system with a low center of gravity for stable operation. An ESP32 microcontroller serves as the brain, providing WiFi connectivity for remote monitoring and firmware updates. The modular design allows students to experiment with different sensors, motors, and control algorithms without redesigning the entire platform.
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
                <p className="mb-4 text-lg">
                  The electronics system is built around an MPU6050 inertial measurement unit (IMU) that provides real-time orientation data through sensor fusion of accelerometer and gyroscope readings. This data feeds into a PID (Proportional-Integral-Derivative) control loop that calculates the precise motor adjustments needed to maintain balance. A custom-designed PCB consolidates the motor driver, power management, and sensor connections into a compact package that fits within the robot's chassis. Dual DC motors with encoders provide smooth, controlled motion while allowing students to experiment with speed control and position tracking. The entire system is powered by a rechargeable lithium-ion battery pack, providing up to 2 hours of continuous operation for extended learning sessions.
                </p>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded mr-2">IMU / Sensor Fusion</span>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">PID Control</span>
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
                <p className="mb-4 text-lg">
                  Gypul was created with a clear mission: to democratize robotics education in regions where access to advanced learning tools is limited. With a bill of materials under $80 USD and all design files available under an open-source license, schools and community organizations can build their own robots without prohibitive costs. The project includes comprehensive documentation, assembly guides, and curriculum resources that teachers can adapt to their classrooms. By focusing on locally available materials and common fabrication methods, Gypul can be manufactured and maintained without relying on expensive imported components. Students who build and program Gypul gain practical experience in mechanical design, electronics, programming, and control theory—skills that are increasingly vital in today's technology-driven economy. This project has already reached over 200 students across Zambia, inspiring the next generation of African engineers and innovators.
                </p>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded mr-2">Open Source Hardware</span>
                <span className="inline-block text-sm border border-white/10 px-3 py-2 rounded">Educational Impact</span>
              </motion.div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </section>
  );
}