import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaPuzzlePiece, FaTools } from 'react-icons/fa';
import SmartImage from './ui/SmartImage';
import RoboCoreLogo from './RoboCore/RoboCoreLogo';

// The 3D robot and its libraries load only when the section is near the window, and only where they can run.
const RobotScrollModel = lazy(() => import('./RoboCore/RobotScrollModel'));

/**
 * The home page's way into RoboCore (it left the main menu on 27 Nov 2026). Styled as a Plastal-Bot Builders section,
 * like "Representing Zambia on the World Stage" above it: the site's colours, type and buttons. RoboCore's own
 * branding (its logo, navy and yellow, slogan, box art) stays on the RoboCore pages; keep the two separate.
 * The card is still on hover (no lift or shade).
 *
 * The robot is a 3D model posed by the page's scroll (RoboCore/RobotScrollModel.tsx): it turns, grips and lifts as
 * the section travels up the window. The first render shows until the model is ready. Where the model can't or
 * shouldn't run (no WebGL, the visitor saves data or turns motion off, or it fails to load) the renders take turns,
 * cross-fading, as before.
 */

const FEATURES = [
  { Icon: FaTools, title: 'Build it', text: 'Two wheels, a lift, a gripper and sensors' },
  { Icon: FaPuzzlePiece, title: 'Code it', text: 'Blocks first, then Arduino C++' },
  { Icon: FaLaptopCode, title: 'Free app', text: 'Browser, Mac, Windows, Linux' },
];

/** Transparent renders from public/resources/RoboCore, shown in turn. */
const RENDERS = [
  'robot-hero.webp',
  'robot-front.webp',
  'robot-iso-fr.webp',
  'robot-arm-motion.webp',
  'robot-left.webp',
];
const SHOW_MS = 3800;

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** If the 3D model fails (a lost download, a graphics driver), the section goes back to its pictures. */
class ModelBoundary extends React.Component<{ onError: () => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const RoboCorePreview: React.FC = () => {
  const [shown, setShown] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  // 'poster': the first render alone, until we know which way to go. 'model': the 3D robot. 'slides': the renders in turn.
  const [stage, setStage] = useState<'poster' | 'slides' | 'model'>('poster');
  const [live, setLive] = useState(false);
  const onReady = useCallback(() => setLive(true), []);
  const onModelError = useCallback(() => {
    setLive(false);
    setStage('slides');
  }, []);

  // Choose once: the 3D model where it can run and the visitor hasn't asked for less (data or motion); it starts
  // loading when the section comes within a screen or so of the window.
  useEffect(() => {
    const el = panel.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Phones with 2 GB of memory or less (where the browser says so) keep the pictures: the model and its
    // libraries are too much for them.
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const weak = typeof memory === 'number' && memory <= 2;
    if (!el || saveData || still || weak || !hasWebGL()) {
      setStage('slides');
      return undefined;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setStage('model');
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStage('model');
        io.disconnect();
      }
    }, { rootMargin: '700px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Only take turns while the panel is on screen, and never for visitors who turn motion off.
  useEffect(() => {
    const el = panel.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (stage !== 'slides' || !onScreen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = window.setInterval(() => {
      if (!document.hidden) setShown((i) => (i + 1) % RENDERS.length);
    }, SHOW_MS);
    return () => window.clearInterval(t);
  }, [onScreen, stage]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12" aria-labelledby="robocore-preview-title">
      <div className="max-w-7xl mx-auto">
        <div
          className="overflow-clip wb-sheet"
          style={{ background: 'var(--surface-bg)', border: '1px solid var(--card-border-initial)', borderRadius: 12 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
              {/* The RoboCore logo leads the section (Fred's choice), in the page's title colour: never RoboCore's
                  navy and yellow on a Plastal page. It is the "RoboCore" of the heading (named "RoboCore" for screen readers). */}
              <h2 id="robocore-preview-title" className="type-h2 mb-4">
                <span className="block mb-4" style={{ color: 'var(--title-color)' }}>
                  <RoboCoreLogo className="h-16 sm:h-20 w-auto" title="RoboCore:" />
                </span>
                <span className="text-hex">Build a Robot</span>, Then Code It
              </h2>
              <p className="type-body mb-4">
                RoboCore is the robot kit and coding app our team is building for young makers. Learners put the robot
                together, then bring it to life with drag-and-drop blocks or Arduino C++.
              </p>
              <p className="type-body mb-6">It is a working prototype today, and school pilots in Zambia come next.</p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                {FEATURES.map(({ Icon, title, text }) => (
                  <div key={title} className="text-center p-3 rounded-lg surface border border-surface">
                    <Icon aria-hidden="true" className="mx-auto mb-2 text-hex" />
                    <p className="text-sm font-bold">{title}</p>
                    <p className="text-xs opacity-75">{text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/robocore" className="custom-button text-center" style={{ textDecoration: 'none' }}>
                  Explore RoboCore
                </Link>
              </div>
            </div>

            <div ref={panel} className="relative min-h-[15rem] sm:min-h-[20rem] order-1 lg:order-2" aria-hidden="true">
              {/* The pictures lead to the same page; left out of the tab order so the link is only reached once. */}
              <Link to="/robocore" tabIndex={-1} className="absolute inset-0 block">
                {/* The robot's stage. In a section taller than the window (wide screens) it stays in the window while
                    the section scrolls past; on phones it is simply as tall as its panel. */}
                <div className="sticky" style={{ top: '6.5rem', height: 'min(100%, 62vh)' }}>
                  {/* Only the first render is fetched unless the renders are what the visitor will see. */}
                  {(stage === 'slides' ? RENDERS : RENDERS.slice(0, 1)).map((file, i) => (
                    <SmartImage
                      key={file}
                      src={`resources/RoboCore/${file}`}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10"
                      style={{
                        opacity: i === shown && !live ? 1 : 0,
                        transform: i === shown ? 'scale(1)' : 'scale(0.97)',
                        transition: 'opacity 900ms ease, transform 900ms ease',
                      }}
                    />
                  ))}
                  {stage === 'model' && (
                    <ModelBoundary onError={onModelError}>
                      <div className="absolute inset-0" style={{ opacity: live ? 1 : 0, transition: 'opacity 900ms ease' }}>
                        <Suspense fallback={null}>
                          <RobotScrollModel track={panel} onReady={onReady} />
                        </Suspense>
                      </div>
                    </ModelBoundary>
                  )}
                  {stage === 'slides' && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {RENDERS.map((file, i) => (
                        <span
                          key={file}
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: i === shown ? 22 : 6,
                            background: i === shown ? 'var(--accent)' : 'var(--surface-border)',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoboCorePreview;
