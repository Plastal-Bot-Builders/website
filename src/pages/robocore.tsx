import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  LuActivity,
  LuArrowRight,
  LuBot,
  LuCpu,
  LuGauge,
  LuGlobe,
  LuGrab,
  LuHeartHandshake,
  LuLightbulb,
  LuLinkedin,
  LuMessageCircle,
  LuMonitor,
  LuMusic,
  LuPuzzle,
  LuRadio,
  LuRepeat,
  LuRotate3D,
  LuSchool,
  LuUsb,
  LuWand2,
  LuZap,
} from 'react-icons/lu';
import { SEOConfig } from '../components/SEO';
import RoboCoreLogo from '../components/RoboCore/RoboCoreLogo';
import { CONTACT, LINKEDIN, scrollToSection } from '../components/RoboCore/shared';
import { asset } from '../utils/asset';

// three.js only downloads when the hero is ready for it.
const RobotViewer = lazy(() => import('../components/RoboCore/RobotViewer'));

/*
 * Copy: the same lines as the RoboCore print pieces (COPY in RoboCore_Event_Branding/figma-plugin/src/02_parts.js),
 * so the stand, the flyer and the website say the same thing. Rules: "designed in Zambia", never "made in Zambia";
 * V2 is a prototype and pilots come next, so nothing here promises dates, prices or sales.
 */
const PILLARS: [string, IconType, string][] = [
  ['Build', LuBot, 'Put together a real robot: motors, sensors, an arm and a smart controller.'],
  ['Code', LuPuzzle, 'Drag blocks or write Arduino C++ in the RoboCore IDE, right in your browser.'],
  ['Create', LuZap, 'Make it drive, follow lines, dodge obstacles and play music.'],
];

const INSIDE: [IconType, string][] = [
  [LuCpu, 'ESP32-S3 controller with Wi-Fi and Bluetooth'],
  [LuGauge, 'Two drive motors with encoders'],
  [LuBot, 'Robot arm with a gripper on servo motors'],
  [LuRadio, 'Ultrasonic distance sensor'],
  [LuActivity, '3-channel line sensor'],
  [LuRepeat, 'Motion sensor (6-axis IMU)'],
  [LuLightbulb, 'RGB light, buzzer and a USER button'],
  [LuUsb, 'USB-C and a rechargeable battery'],
];

const PARTS: [string, string, number, number][] = [
  ['controller-board', 'ESP32-S3 controller board', 1000, 590],
  ['chassis', 'Chassis', 800, 609],
  ['sonar', 'Ultrasonic distance sensor', 480, 306],
  ['line-sensor', '3-channel line sensor', 480, 288],
];

const APP: [IconType, string][] = [
  [LuPuzzle, 'Blocks made for the robot: “move forward for 10 cm”, “turn right for 90°”, “when an obstacle is closer than 20 cm”.'],
  [LuMonitor, 'Switch to Arduino C++ whenever you are ready: the blocks show you the code they write.'],
  [LuUsb, 'Runs in the browser. Upload over USB-C, or test on the preview board with no robot at all.'],
  [LuMessageCircle, 'Stuck? Ask Cog, the IDE’s learning partner, to explain an error or give you a hint.'],
];

const MAKE: [IconType, string][] = [
  [LuActivity, 'Line follower'],
  [LuRadio, 'Obstacle avoider'],
  [LuLightbulb, 'Traffic light'],
  [LuMusic, 'Music player'],
  [LuGrab, 'Pick-and-place arm'],
  [LuWand2, 'Your own idea'],
];

/** Narrow screens and touch screens get the lighter model, and the robot turns by itself. */
function useCompact(): boolean {
  const query = '(max-width: 767px), (pointer: coarse)';
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return compact;
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** The hero's in-page buttons. */
function jumpTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollToSection(id)) e.preventDefault();
  };
}

/** The hero's robot: the still render first (fast, and what shows without WebGL), then the 3D model over it. */
const HeroRobot: React.FC = () => {
  const compact = useCompact();
  const stage = useRef<HTMLDivElement>(null);
  const [want3d, setWant3d] = useState(false);
  const [live, setLive] = useState(false);
  const [visible, setVisible] = useState(true);

  // Start the 3D after the page has painted, and only where it can run and the visitor isn't saving data.
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || !hasWebGL()) return;
    const t = window.setTimeout(() => setWant3d(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // Stop drawing frames while the hero is off screen.
  useEffect(() => {
    const el = stage.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onReady = useCallback(() => setLive(true), []);

  return (
    <div ref={stage} className={`rc-hero-stage${live ? ' is-live' : ''}`}>
      <div className="rc-hero-render">
        <img
          src={asset('resources/RoboCore/robot-hero.webp')}
          alt="The RoboCore V2 robot: a yellow robot on two wheels with an arm, a gripper and a distance sensor"
          width={1400}
          height={930}
          decoding="async"
        />
      </div>
      {want3d && (
        <div className="rc-hero-canvas">
          <Suspense fallback={null}>
            <RobotViewer onReady={onReady} compact={compact} visible={visible} />
          </Suspense>
        </div>
      )}
      {!compact && (
        <span className="rc-hint" aria-hidden="true">
          <LuRotate3D /> Drag to turn the robot
        </span>
      )}
    </div>
  );
};

/**
 * The RoboCore overview, the index page of /robocore. It renders inside RoboCoreLayout (RoboCore's own header and
 * footer); its sections carry the ids the header links to.
 */
const RoboCorePage: React.FC = () => {
  // Opened as /robocore#inside (from another RoboCore page, a QR code or a link): go to that section.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => scrollToSection(hash.slice(1), false), 60);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <SEOConfig
        title="RoboCore — the robot kit and coding app for young makers | Plastal-Bot Builders"
        description="RoboCore is a robot you build yourself and a coding app to bring it to life: drag-and-drop blocks or Arduino C++, in the browser. Designed in Zambia by Plastal-Bot Builders."
        image="/resources/social/og-robocore.jpg"
      />

      {/* ---------- hero ---------- */}
      <section className="rc-hero" aria-labelledby="rc-title">
        <div className="rc-wrap">
          <div className="rc-hero-card">
            <div className="rc-contours" aria-hidden="true" />
            <div className="rc-hero-text">
              <h1 id="rc-title" style={{ margin: 0 }}>
                <RoboCoreLogo className="rc-hero-logo" title="RoboCore" />
              </h1>
              <p className="rc-display">
                Build.
                <br />
                Code.
                <br />
                Create.
              </p>
              <p className="rc-lead">The robot kit and coding app for young makers.</p>
              <div className="rc-hero-actions">
                <a className="rc-btn rc-btn-primary" href="#get-involved" onClick={jumpTo('get-involved')}>
                  Get involved <LuArrowRight aria-hidden="true" />
                </a>
                <a className="rc-btn rc-btn-outline" href="#inside" onClick={jumpTo('inside')}>
                  What’s inside
                </a>
              </div>
              <div className="rc-hero-actions" style={{ alignItems: 'center', gap: 18 }}>
                <span className="rc-chip">
                  <LuGlobe aria-hidden="true" /> Designed in Zambia
                </span>
                <span className="rc-maker">
                  by
                  <img src={asset('resources/RoboCore/plastal-bot-builders-navy.svg')} alt="Plastal-Bot Builders" width={98} height={34} />
                </span>
              </div>
            </div>
            <HeroRobot />
          </div>
        </div>
      </section>

      {/* ---------- what it is ---------- */}
      <section id="what" className="rc-section" aria-labelledby="rc-what">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">What is RoboCore?</p>
            <h2 id="rc-what" className="rc-h2">
              A robot you build, and an app to bring it to life
            </h2>
            <p className="rc-lead">
              RoboCore is a robot you build yourself and a coding app to bring it to life. Start with drag-and-drop blocks,
              move on to real Arduino C++, and watch your code drive, sense and react.
            </p>
          </div>
          <div className="rc-pillars">
            {PILLARS.map(([title, Icon, text]) => (
              <div key={title} className="rc-card rc-pillar">
                <span className="rc-pillar-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="rc-h3">{title}</h3>
                <p className="rc-body">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- inside the kit ---------- */}
      <section id="inside" className="rc-section" style={{ paddingTop: 0 }} aria-labelledby="rc-inside">
        <div className="rc-wrap">
          <div className="rc-inside">
            <div className="rc-inside-box">
              <img
                src={asset('resources/RoboCore/kit-box-open.webp')}
                alt="The RoboCore V2 box, open"
                width={900}
                height={1067}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <div className="rc-section-head" style={{ marginBottom: 24 }}>
                <p className="rc-eyebrow">What’s inside</p>
                <h2 id="rc-inside" className="rc-h2">
                  Inside RoboCore V2
                </h2>
              </div>
              <ul className="rc-list">
                {INSIDE.map(([Icon, text]) => (
                  <li key={text}>
                    <Icon aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
              <p className="rc-size">The robot measures 167 × 278 × 118 mm (width × length × height).</p>
            </div>
          </div>
          <div className="rc-parts">
            {PARTS.map(([file, caption, w, h]) => (
              <figure key={file} className="rc-part">
                <div className="rc-part-art">
                  <img src={asset(`resources/RoboCore/${file}.webp`)} alt="" width={w} height={h} loading="lazy" decoding="async" />
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- the IDE ---------- */}
      <section id="ide" className="rc-section rc-band" aria-labelledby="rc-ide">
        <div className="rc-wrap rc-ide">
          <div style={{ display: 'grid', gap: 22 }}>
            <p className="rc-eyebrow">The app</p>
            <h2 id="rc-ide" className="rc-h2">
              The RoboCore IDE
            </h2>
            <p className="rc-lead">Blocks or Arduino C++, right in your browser.</p>
            <ul className="rc-ide-points">
              {APP.map(([Icon, text]) => (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rc-shots">
            <figure className="rc-shot">
              <div className="rc-window">
                <div className="rc-window-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <img
                  src={asset('resources/RoboCore/ide-blocks.webp')}
                  alt="The RoboCore IDE in Blocks mode: an obstacle-avoider program made of blocks, the C++ the blocks write beside it, and the preview board"
                  width={1600}
                  height={903}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>Blocks, with the C++ they write beside them.</figcaption>
            </figure>
            <figure className="rc-shot rc-shot-small">
              <div className="rc-window">
                <div className="rc-window-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <img
                  src={asset('resources/RoboCore/ide-code.webp')}
                  alt="The same program in Code mode: Arduino C++ in the code editor"
                  width={1600}
                  height={903}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>The same program in Arduino C++.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- what you can make ---------- */}
      <section className="rc-section" aria-labelledby="rc-make">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">What you can make</p>
            <h2 id="rc-make" className="rc-h2">
              Make it drive, sense and react
            </h2>
          </div>
          <ul className="rc-make">
            {MAKE.map(([Icon, text]) => (
              <li key={text} className="rc-card">
                <Icon aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- where we are ---------- */}
      <section id="now" className="rc-section" style={{ paddingTop: 0 }} aria-labelledby="rc-now">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">Where we are</p>
            <h2 id="rc-now" className="rc-h2">
              From prototype to pilot
            </h2>
            <p className="rc-lead">
              RoboCore V2 is our newest prototype. Pilots with schools and innovation hubs in Zambia come next.
            </p>
          </div>
          <ol className="rc-steps">
            <li className="rc-card rc-step">
              <span className="rc-chip rc-step-tag">First</span>
              <h3 className="rc-h3">RoboCore V1: Gypul</h3>
              <p className="rc-body">Our first prototype: a self-balancing robot, built by hand with 3D-printed parts.</p>
            </li>
            <li className="rc-card rc-step is-now" aria-current="step">
              <span className="rc-chip rc-step-tag">Now</span>
              <h3 className="rc-h3">RoboCore V2</h3>
              <p className="rc-body">A new controller board, a robot with an arm and sensors, and the RoboCore IDE.</p>
            </li>
            <li className="rc-card rc-step">
              <span className="rc-chip rc-step-tag">Next</span>
              <h3 className="rc-h3">Pilots</h3>
              <p className="rc-body">Trying RoboCore with schools and innovation hubs in Zambia.</p>
            </li>
          </ol>
          <div className="rc-impact">
            <p className="rc-lead">
              Our team has been part of initiatives that have reached more than 8,000 young people in Zambia.
            </p>
            <p className="rc-body">Supported by Mukuba UniPod (UNDP) and the Copperbelt University.</p>
          </div>
        </div>
      </section>

      {/* ---------- get involved ---------- */}
      <section id="get-involved" className="rc-section" style={{ paddingTop: 0 }} aria-labelledby="rc-involve">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">Get involved</p>
            <h2 id="rc-involve" className="rc-h2">
              Build RoboCore with us
            </h2>
          </div>
          <div className="rc-involve">
            <div className="rc-card">
              <LuSchool className="rc-involve-icon" aria-hidden="true" />
              <h3 className="rc-h3">Schools and hubs</h3>
              <p className="rc-body">Would you like to try RoboCore with your learners? Tell us about your school or hub.</p>
              <a className="rc-link" href={`mailto:${CONTACT}?subject=RoboCore%20pilot`}>
                {CONTACT}
              </a>
            </div>
            <div className="rc-card">
              <LuHeartHandshake className="rc-involve-icon" aria-hidden="true" />
              <h3 className="rc-h3">Partners and sponsors</h3>
              <p className="rc-body">Help us build and test the first RoboCore kits.</p>
              <a className="rc-link" href={`mailto:${CONTACT}?subject=RoboCore%20partnership`}>
                Talk to us about partnering
              </a>
            </div>
            <div className="rc-card">
              <LuLinkedin className="rc-involve-icon" aria-hidden="true" />
              <h3 className="rc-h3">Follow the build</h3>
              <p className="rc-body">Follow Plastal-Bot Builders for RoboCore news.</p>
              <a className="rc-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoboCorePage;
