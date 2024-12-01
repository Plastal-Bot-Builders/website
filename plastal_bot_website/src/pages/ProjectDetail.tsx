import React, { useEffect, useRef, useState, startTransition } from 'react';
import { ModelViewer } from '../components/ModelViewer';

interface ModelView {
  position: [number, number, number];
  rotation: [number, number, number];
  description: string;
  title: string;
}

interface NavigationDotsProps {
  total: number;
  active: number;
  onClick: (index: number) => void;
}

interface ModelSectionProps {
  view: ModelView;
  index: number;
  isActive: boolean;
  isLoading: boolean;
  onLoad: () => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ total, active, onClick }) => (
  <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
    <ul className="space-y-4">
      {Array.from({ length: total }, (_, idx) => (
        <li key={idx}>
          <button
            onClick={() => onClick(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              active === idx ? 'bg-hex scale-125' : 'bg-gray-400'
            }`}
            aria-label={`View ${idx + 1}`}
          />
        </li>
      ))}
    </ul>
  </nav>
);

const ModelSection: React.FC<ModelSectionProps> = ({ view, index, isActive, isLoading, onLoad }) => (
  <section 
    className="h-screen sticky top-0 flex items-center justify-between"
    style={{
      opacity: isActive ? 1 : 0.3,
      transition: 'opacity 0.5s ease-in-out'
    }}
  >
    <div className="w-1/2 p-8">
      <div className="h-[600px] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hex"/>
          </div>
        )}
        <ModelViewer
          cameraPosition={view.position}
          cameraRotation={view.rotation}
          modelPath="/resources/3D_Models/robotcar.glb"
          onLoad={onLoad}
        />
      </div>
    </div>
    <div className="w-1/2 p-8">
      <div className="space-y-4">
        <span className="text-hex text-sm font-medium">Phase {index + 1}</span>
        <h2 className="text-3xl font-bold">{view.title}</h2>
        <p className="text-lg text-gray-600">{view.description}</p>
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-hex transition-all duration-500"
            style={{width: `${(index + 1) * 25}%`}}
          />
        </div>
      </div>
    </div>
  </section>
);

const ProjectDetail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const modelViews: ModelView[] = [
    { 
      position: [0, 0, 5] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      description: "Front View - Initial design concept showing the main interface",
      title: "Front Perspective"
    },
    { 
      position: [5, 0, 0] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      description: "Side View - Notice the sleek profile and compact design",
      title: "Side Analysis"
    },
    { 
      position: [0, 5, 0] as [number, number, number],
      rotation: [Math.PI / 2, 0, 0] as [number, number, number],
      description: "Top View - Component layout and spacing optimization",
      title: "Top Overview"
    },
    { 
      position: [0, -5, 0] as [number, number, number],
      rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
      description: "Bottom View - Access panel and mounting points",
      title: "Base Details"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = containerRef.current.children;
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop - windowHeight / 2) {
          setActiveIndex(i);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
    const section = containerRef.current?.children[index] as HTMLElement;
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative">
      <NavigationDots 
        total={modelViews.length} 
        active={activeIndex} 
        onClick={handleDotClick}
      />
      {modelViews.map((view, index) => (
        <ModelSection
          key={index}
          view={view}
          index={index}
          isActive={activeIndex === index}
          isLoading={isLoading}
          onLoad={() => setIsLoading(false)}
        />
      ))}
    </div>
  );
};

export default ProjectDetail;