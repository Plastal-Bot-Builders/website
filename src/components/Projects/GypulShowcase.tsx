import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

export default function GypulShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const bodyRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> | null>(null);
  const wheelsRef = useRef<THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>[]>([]);
  const headRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null>(null);

  // Define sections with camera positions and highlighted parts
  const sections = useMemo(() => [
    {
      id: 'overview',
      title: 'Meet Gypul',
      description: 'A self-balancing robot built for education. This platform combines affordable 3D printed parts with powerful electronics to create an accessible learning tool for students across Africa.',
      cameraTarget: { x: 0, y: 0.5, z: 3.5 },
      robotRotation: { y: 0 },
      highlight: null
    },
    {
      id: 'body',
      title: '3D Printed Chassis',
      description: 'The main body houses all electronics and is designed in Fusion 360. Optimized for easy assembly and durability, it can be printed on budget printers like the Bambu A1 Mini using PLA or PETG filament.',
      cameraTarget: { x: 0.5, y: 0.5, z: 2.8 },
      robotRotation: { y: Math.PI * 0.25 },
      highlight: 'body'
    },
    {
      id: 'wheels',
      title: 'Dual Motor System',
      description: 'Two independently controlled DC motors provide precise movement and balance. The wheel design ensures optimal traction and allows for the dynamic balancing required for self-stabilization.',
      cameraTarget: { x: -0.3, y: 0.2, z: 2.5 },
      robotRotation: { y: Math.PI * 0.5 },
      highlight: 'wheels'
    },
    {
      id: 'sensor',
      title: 'IMU Sensor & ESP32',
      description: 'The top module contains an MPU6050 IMU sensor for real-time orientation tracking and an ESP32 microcontroller. Together they process sensor data and execute PID control algorithms to maintain balance.',
      cameraTarget: { x: 0, y: 0.8, z: 2.5 },
      robotRotation: { y: Math.PI * 0.75 },
      highlight: 'head'
    },
    {
      id: 'impact',
      title: 'Impact & Accessibility',
      description: 'Built with affordability in mind, Gypul uses open-source software and readily available components. The entire build costs under $50, making robotics education accessible to schools and makers across Africa.',
      cameraTarget: { x: 0, y: 0.5, z: 3.5 },
      robotRotation: { y: Math.PI * 1.2 },
      highlight: null
    }
  ], []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x020617);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      (window.innerWidth * 0.5) / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 3.5);
    cameraRef.current = camera;

    // Renderer
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true,
      alpha: false 
    });
    
    // Set initial size
    const canvasWidth = canvas.parentElement?.clientWidth || window.innerWidth * 0.5;
    const canvasHeight = canvas.parentElement?.clientHeight || window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, -2, -5);
    scene.add(directionalLight2);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 0.4);
    rimLight.position.set(0, 2, -3);
    scene.add(rimLight);

    // Create robot
    const robotGroup = new THREE.Group();
    robotRef.current = robotGroup;

    // Robot body
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    bodyRef.current = body;
    robotGroup.add(body);

    // PCB details on body
    const pcbGeometry = new THREE.BoxGeometry(0.35, 0.02, 0.3);
    const pcbMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x10b981,
      metalness: 0.3,
      roughness: 0.7
    });
    const pcb = new THREE.Mesh(pcbGeometry, pcbMaterial);
    pcb.position.set(0, 0.66, 0);
    robotGroup.add(pcb);

    // Robot wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.5,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    
    const wheelLeft = new THREE.Mesh(wheelGeometry, wheelMaterial.clone());
    wheelLeft.rotation.z = Math.PI / 2;
    wheelLeft.position.set(-0.3, 0.2, 0);
    robotGroup.add(wheelLeft);
    wheelsRef.current.push(wheelLeft);

    const wheelRight = new THREE.Mesh(wheelGeometry, wheelMaterial.clone());
    wheelRight.rotation.z = Math.PI / 2;
    wheelRight.position.set(0.3, 0.2, 0);
    robotGroup.add(wheelRight);
    wheelsRef.current.push(wheelRight);

    // Wheel treads
    const treadGeometry = new THREE.TorusGeometry(0.2, 0.02, 8, 32);
    const treadMaterial = new THREE.MeshStandardMaterial({ color: 0x64748b });
    const treadLeft = new THREE.Mesh(treadGeometry, treadMaterial);
    treadLeft.rotation.y = Math.PI / 2;
    treadLeft.position.set(-0.3, 0.2, 0);
    robotGroup.add(treadLeft);

    const treadRight = new THREE.Mesh(treadGeometry, treadMaterial);
    treadRight.rotation.y = Math.PI / 2;
    treadRight.position.set(0.3, 0.2, 0);
    robotGroup.add(treadRight);

    // Head/sensor module
    const headGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.8;
    headRef.current = head;
    robotGroup.add(head);

    // Sensor "eyes"
    const eyeGeometry = new THREE.CircleGeometry(0.04, 32);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeLeft.position.set(-0.05, 0.82, 0.14);
    robotGroup.add(eyeLeft);

    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeRight.position.set(0.05, 0.82, 0.14);
    robotGroup.add(eyeRight);

    // Support structure
    const supportGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 16);
    const supportMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.1
    });
    const supportLeft = new THREE.Mesh(supportGeometry, supportMaterial);
    supportLeft.position.set(-0.15, 0.725, 0);
    robotGroup.add(supportLeft);

    const supportRight = new THREE.Mesh(supportGeometry, supportMaterial);
    supportRight.position.set(0.15, 0.725, 0);
    robotGroup.add(supportRight);

    scene.add(robotGroup);

    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (e.clientX > window.innerWidth * 0.5) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - previousMousePosition.x;
      
      robotGroup.rotation.y += deltaX * 0.01;
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.clientX > window.innerWidth * 0.5) return;
      camera.position.z += e.deltaY * 0.001;
      camera.position.z = Math.max(2, Math.min(5, camera.position.z));
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('wheel', onWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const section = sections[currentSection];

      // Smooth camera transition
      camera.position.lerp(
        new THREE.Vector3(
          section.cameraTarget.x,
          section.cameraTarget.y,
          section.cameraTarget.z
        ),
        0.05
      );
      camera.lookAt(0, 0.5, 0);

      // Smooth rotation transition
      if (!isDragging) {
        const targetRotY = section.robotRotation.y;
        robotGroup.rotation.y += (targetRotY - robotGroup.rotation.y) * 0.05;
      }

      // Highlight active parts
      const highlightIntensity = 0.3 + Math.sin(Date.now() / 500) * 0.1;
      
      if (section.highlight === 'body' && bodyRef.current) {
        bodyRef.current.material.emissive.setHex(0x3b82f6);
        bodyRef.current.material.emissiveIntensity = highlightIntensity;
      } else if (bodyRef.current) {
        bodyRef.current.material.emissiveIntensity = 0;
      }

      if (section.highlight === 'wheels') {
        wheelsRef.current.forEach(wheel => {
          wheel.material.emissive.setHex(0x1e293b);
          wheel.material.emissiveIntensity = highlightIntensity;
          wheel.rotation.x += 0.02;
        });
      } else {
        wheelsRef.current.forEach(wheel => {
          wheel.material.emissiveIntensity = 0;
        });
      }

      if (section.highlight === 'head' && headRef.current) {
        headRef.current.material.emissiveIntensity = 0.5 + Math.sin(Date.now() / 300) * 0.2;
      } else if (headRef.current && section.highlight !== 'head') {
        headRef.current.material.emissiveIntensity = 0.3;
      }

      // Subtle idle animation
      robotGroup.position.y = Math.sin(Date.now() / 1500) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const canvasWidth = canvas.parentElement?.clientWidth || window.innerWidth * 0.5;
      const canvasHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      camera.aspect = canvasWidth / canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasWidth, canvasHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [currentSection, sections]);

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white">
      {/* Sticky navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-lg text-cyan-400">Plastal-Bot</span>
            <div className="h-6 w-px bg-white/20" />
            <span className="text-sm opacity-80">Gypul Project</span>
          </div>
          <div className="text-sm opacity-60">Self-Balancing Robot Platform</div>
        </div>
      </nav>

      {/* Split layout container */}
      <div className="flex" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Left side - 3D Model */}
        <div className="w-1/2 relative bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ display: 'block' }}
          />
          <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
            <p className="text-xs text-cyan-400">💡 Drag to rotate • Scroll to zoom</p>
          </div>
        </div>

        {/* Right side - Content sections */}
        <div className="w-1/2 overflow-y-auto bg-gradient-to-b from-slate-900/50 to-black/50">
          <div className="max-w-2xl mx-auto px-8 py-12">
            
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="min-h-screen flex flex-col justify-center py-20"
              >
                <div 
                  className={`transition-all duration-700 ${
                    currentSection === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-40 translate-y-4'
                  }`}
                >
                  {/* Section number */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-400 mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                  </div>

                  <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {section.description}
                  </p>

                  {/* Navigation buttons */}
                  <div className="flex gap-4 mt-8">
                    {index > 0 && (
                      <button
                        onClick={() => setCurrentSection(index - 1)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-500/50 rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <span>←</span> Previous
                      </button>
                    )}
                    {index < sections.length - 1 && (
                      <button
                        onClick={() => setCurrentSection(index + 1)}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        Next <span>→</span>
                      </button>
                    )}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-12 flex gap-2">
                    {sections.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSection(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentSection 
                            ? 'w-12 bg-cyan-500' 
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to section ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Final section CTA */}
                {index === sections.length - 1 && (
                  <div className="mt-16 p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4">Ready to Build Your Own?</h3>
                    <p className="text-gray-300 mb-6">
                      Access the complete build guide, 3D files, and source code on our GitHub repository. Join our community of makers and educators building affordable robotics solutions.
                    </p>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors">
                        View Documentation
                      </button>
                      <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-500/50 rounded-lg transition-all">
                        GitHub Repository
                      </button>
                    </div>
                  </div>
                )}
              </section>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}