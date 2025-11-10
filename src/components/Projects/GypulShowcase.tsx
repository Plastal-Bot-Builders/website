import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import { useGLTF, Html, useProgress, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import Header from '../Header';
import Footer from '../Footer';
import { asset } from '../../utils/asset';

const isMeshObject = (object: THREE.Object3D): object is THREE.Mesh => {
  return 'isMesh' in object && object.isMesh === true;
};

type RobotModelProps = {
  scrollProgress: MotionValue<number>;
  scrollDirection: number;
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
        <p className="text-sm mt-3">Loading model {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

const OBJModel: React.FC<{ url: string }> = ({ url }) => {
  const obj= useLoader(OBJLoader, url);
  return <primitive object={obj.clone()} />;
};

function RobotModel({ scrollProgress, scrollDirection }: RobotModelProps) {
  const outerRef = useRef<Group | null>(null);
  const innerRef = useRef<Group | null>(null);
  const { camera } = useThree();
  
  const src = asset('resources/3D_Models/Gypul.obj');
  
  // Track target rotation based on scroll
  const targetRotation = useRef(0);
  const lastScrollProgress = useRef(0);
  
  const pivotW = useRef(new THREE.Vector3());

  // Enhanced scroll-based transforms
  const yRange = useTransform(scrollProgress, [0, 1], [-0.2, -0.9]);
  const zRange = useTransform(scrollProgress, [0, 1], [3.2, 2.0]);
  const scaleRange = useTransform(scrollProgress, [0, 1], [0.5, 0.7]);

  // Auto-frame and setup model on load
  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const g = innerRef.current;
    
    const checkLoaded = setInterval(() => {
      if (g.children.length === 0) return;
      
      clearInterval(checkLoaded);
      g.updateWorldMatrix(true, true);

      // Calculate bounding sphere for auto-framing
      const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
      const s = 1 / (sphere.radius * 2);
      g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
      g.scale.setScalar(s);

      g.rotation.set(
      THREE.MathUtils.degToRad(0),   // X rotation (pitch)
      THREE.MathUtils.degToRad(-90), // Y rotation (yaw) - rotate 90° left
      THREE.MathUtils.degToRad(0)    // Z rotation (roll)
      );

      // Enable shadows
      g.traverse((o: THREE.Object3D) => {
        if (isMeshObject(o)) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });

      g.getWorldPosition(pivotW.current);
      
      // Auto-frame camera
      if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
        const persp = camera as THREE.PerspectiveCamera;
        const fitR = sphere.radius * s;
        const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
        persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);
        persp.near = d / 10;
        persp.far = d * 10;
        persp.updateProjectionMatrix();
      }
    }, 100);

    return () => clearInterval(checkLoaded);
  }, [camera]);

  useFrame((_, dt) => {
    if (!outerRef.current) return;

    const currentScrollProgress = scrollProgress.get();
    const y = yRange.get();
    const z = zRange.get();
    const scale = scaleRange.get();

    // Calculate scroll delta to determine rotation direction
    const scrollDelta = currentScrollProgress - lastScrollProgress.current;
    
    // Update target rotation based on scroll direction
    // Multiply by a factor to control rotation speed (adjust as needed)
    targetRotation.current += scrollDelta * Math.PI * 3;
    
    // Update last scroll position
    lastScrollProgress.current = currentScrollProgress;

    // Smooth rotation towards target with damping
    const rotationDiff = targetRotation.current - outerRef.current.rotation.y;
    outerRef.current.rotation.y += rotationDiff * 0.1;
    
    // Gentle bobbing motion
    outerRef.current.rotation.x += (Math.sin(performance.now() / 1000) * 0.08 - outerRef.current.rotation.x) * 0.05;
    
    // Subtle Z-axis tilt
    outerRef.current.rotation.z = Math.sin(performance.now() / 1500) * 0.05;
    
    // Vertical position
    outerRef.current.position.y += (y - outerRef.current.position.y) * 0.12;
    
    // Scale
    outerRef.current.scale.set(scale, scale, scale);

    // Camera movement with offset
    camera.position.lerp(new THREE.Vector3(-0.5, 0.2 + y * 0.6, z), 0.12);
    camera.lookAt(-0.5, 0, 0);
  });

  return (
    <group 
      ref={outerRef} 
      dispose={null}
      rotation={[0, Math.PI / 3, 0]}
    >
      <group ref={innerRef}>
        <OBJModel url={src} />
      </group>
    </group>
  );
}

export default function GypulShowcase(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [scrollDirection, setScrollDirection] = useState(0);
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 1 : -1;
      setScrollDirection(direction);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <section className="scroll-smooth focus:scroll-auto">
      <Header />
      <div ref={containerRef} className="relative min-h-screen pt-20">
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center text-sm hover:text-accent transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>
        
        {/* Fullscreen Canvas background */}
        <div className="fixed inset-0 -z-10">
          <Canvas 
            shadows
            camera={{ position: [0, 0.6, 3.2], fov: 35 }}
            gl={{ 
              preserveDrawingBuffer: true,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace
            }}
          >
            <Environment preset="studio" background={false} />
            
            <ambientLight intensity={0.4} />
            <directionalLight intensity={0.6} position={[5, 5, 5]} castShadow />
            <directionalLight intensity={0.2} position={[-5, -2, -5]} />
            
            <ContactShadows position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />
            
            <React.Suspense fallback={<LoaderSpinner />}>
              <RobotModel scrollProgress={scrollYProgress} scrollDirection={scrollDirection} />
            </React.Suspense>
            
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              enableRotate={true}
              makeDefault 
              rotateSpeed={0.6}
              minDistance={2}
              maxDistance={10}
            />
          </Canvas>
        </div>

        {/* Page content sections */}
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            {/* Intro / Overview */}
            <section id="overview" className="min-h-[40vh] flex items-center">
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
            <section id="design" className="min-h-[60vh] flex items-center">
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
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Fusion 360 */}
                  <div className="group flex items-center gap-2 border rounded-lg px-4 py-2 hover:border-accent transition-all duration-300" title="Autodesk Fusion 360">
                    <img 
                      className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
                      alt="Fusion 360"
                      src={asset('resources/icons/Fusion360.svg')}  // lowercase 'icons'
                    />
                    <span className="text-sm font-medium"> Fusion 360</span>
                  </div>
                  {/* ESP 32 */}
                  <div className="group flex items-center gap-2 border rounded-lg px-4 py-2 hover:border-accent transition-all duration-300" title="Autodesk Fusion 360">
                    <img 
                      className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
                      alt="Fusion 360"
                      src={asset('resources/icons/esp32.svg')}  // lowercase 'icons'
                    />
                    <span className="text-sm font-medium"> ESP 32 </span>
                  </div>
                  {/* ESP 32 */}
                  <div className="group flex items-center gap-2 border rounded-lg px-4 py-2 hover:border-accent transition-all duration-300" title="Autodesk Fusion 360">
                    <img 
                      className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
                      alt="Fusion 360"
                      src={asset('resources/icons/Bambu.png')}  // lowercase 'icons'
                    />
                    <span className="text-sm font-medium"> Bambu A1 Mini </span>
                  </div>
                </div>
              </motion.div>
            </section>
            
            {/* Electronics & Control */}
            <section id="electronics" className="min-h-[60vh] flex items-center py-12">
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
            <section id="impact" className="min-h-[60vh] flex items-center py-12">
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