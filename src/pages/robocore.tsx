import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  LuActivity,
  LuArrowRight,
  LuBot,
  LuDownload,
  LuGlobe,
  LuGrab,
  LuHeartHandshake,
  LuLightbulb,
  LuLinkedin,
  LuMessageCircle,
  LuMonitor,
  LuMove,
  LuMusic,
  LuPuzzle,
  LuRadio,
  LuRotate3D,
  LuSchool,
  LuWand2,
  LuZap,
} from 'react-icons/lu';
import { SiGooglechrome, SiMicrosoftedge } from 'react-icons/si';
import { SEOConfig } from '../components/SEO';
import AppIcon from '../components/RoboCore/AppIcon';
import RoboCoreLogo from '../components/RoboCore/RoboCoreLogo';
import Supporters from '../components/RoboCore/Supporters';
import Tile from '../components/RoboCore/Tile';
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

/** Blocks made for the robot, as they read in the IDE. */
const BLOCK_EXAMPLES = ['move forward for 10 cm', 'turn right for 90°', 'when an obstacle is closer than 20 cm'];

/** From the IDE's "Robot obstacle avoider" example: what the "if obstacle closer than 20 cm" blocks write. */
const SNIPPET = `if (sonar.distanceCm() < 20) {
  robot.stop();
  RoboCore::beep(523, 200);  // C5
  robot.turn(90);
} else {
  robot.start(FORWARD);
}`;

const [BROWSER, PREVIEW, COG]: [IconType, string, string][] = [
  [LuMonitor, 'In the browser', 'Runs in Chrome or Edge on a computer. Upload to the robot over USB-C.'],
  [LuBot, 'Preview board', 'No robot yet? The preview board simulates the motors, servo, sonar, line sensor, tilt and battery.'],
  [LuMessageCircle, 'Ask Cog', 'Stuck? Cog, the IDE’s learning partner, explains an error or gives you a hint.'],
];

const MAKE: [IconType, string][] = [
  [LuActivity, 'Line follower'],
  [LuRadio, 'Obstacle avoider'],
  [LuLightbulb, 'Traffic light'],
  [LuMusic, 'Music player'],
  [LuGrab, 'Pick-and-place arm'],
  [LuWand2, 'Your own idea'],
];

/** A tile about one thing the IDE does: icon, title, a sentence. */
const AppTile: React.FC<{ item: [IconType, string, string]; span?: string }> = ({ item: [Icon, title, text], span = 'rc-c4' }) => (
  <Tile span={span}>
    <Icon className="rc-tile-icon" aria-hidden="true" />
    <h3 className="rc-tile-title">{title}</h3>
    <p className="rc-body">{text}</p>
  </Tile>
);

/** A drawing or render that fills the free space of its tile. */
const TileArt: React.FC<{ src: string; alt?: string; w: number; h: number; line?: boolean }> = ({ src, alt = '', w, h, line }) => (
  <div className="rc-tile-art">
    <img
      src={asset(`resources/RoboCore/${src}`)}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      className={line ? 'rc-art-line' : undefined}
    />
  </div>
);

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
      <section id="what" className="rc-section rc-section--bento" aria-labelledby="rc-what">
        <div className="rc-wrap rc-bento">
          <Tile span="rc-c7 rc-r2 rc-full-md" className="rc-tile--intro">
            <p className="rc-eyebrow">What is RoboCore?</p>
            <h2 id="rc-what" className="rc-h2">
              A robot you build, and an app to bring it to life
            </h2>
            <p className="rc-lead">
              RoboCore is a robot you build yourself and a coding app to bring it to life. Start with drag-and-drop blocks,
              move on to real Arduino C++, and watch your code drive, sense and react.
            </p>
          </Tile>
          <Tile span="rc-c5 rc-r2 rc-full-md" tone="yellow" contours>
            <TileArt src="robot-iso-fr.webp" alt="RoboCore V2 from the front right" w={1000} h={667} />
            <span className="rc-chip rc-tile-foot">167 × 278 × 118 mm</span>
          </Tile>
          {PILLARS.map(([title, Icon, text], i) => (
            // On tablets (two columns) the third one takes the whole row.
            <Tile key={title} span={i === 2 ? 'rc-c4 rc-full-md' : 'rc-c4'}>
              <span className="rc-pillar-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="rc-tile-title">{title}</h3>
              <p className="rc-body">{text}</p>
            </Tile>
          ))}
        </div>
      </section>

      {/* ---------- inside the kit ---------- */}
      <section id="inside" className="rc-section rc-section--bento" aria-labelledby="rc-inside">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">What’s inside</p>
            <h2 id="rc-inside" className="rc-h2">
              Inside RoboCore V2
            </h2>
            <Link className="rc-link" to="/robocore/hardware" style={{ justifySelf: 'start' }}>
              Full specifications
            </Link>
          </div>
          <div className="rc-bento">
            <Tile span="rc-c5 rc-r2 rc-full-md" tone="navy">
              <p className="rc-eyebrow">The brain</p>
              <h3 className="rc-tile-title">ESP32-S3 controller</h3>
              <TileArt src="controller-board.webp" w={1000} h={590} line />
              <ul className="rc-chips">
                <li>Wi-Fi and Bluetooth LE</li>
                <li>8 MB flash · 2 MB PSRAM</li>
                <li>USB-C straight to the chip</li>
              </ul>
            </Tile>
            <Tile span="rc-c7 rc-r2 rc-full-md">
              <p className="rc-eyebrow">Sensors</p>
              <h3 className="rc-tile-title">It sees, follows and feels</h3>
              <div className="rc-sensors">
                <figure>
                  <TileArt src="sonar.webp" w={480} h={306} line />
                  <figcaption>Ultrasonic distance sensor</figcaption>
                </figure>
                <figure>
                  <TileArt src="line-sensor.webp" w={480} h={288} line />
                  <figcaption>3-channel line sensor</figcaption>
                </figure>
                <figure>
                  <div className="rc-tile-art rc-tile-art--icon" aria-hidden="true">
                    <LuMove />
                  </div>
                  <figcaption>Motion sensor (6-axis IMU)</figcaption>
                </figure>
              </div>
            </Tile>
            <Tile span="rc-c3" tone="yellow">
              <p className="rc-stat">2</p>
              <p className="rc-tile-text">drive motors with encoders</p>
            </Tile>
            <Tile span="rc-c3">
              <p className="rc-stat">4</p>
              <p className="rc-tile-text">servo ports, for the arm and its gripper</p>
            </Tile>
            <Tile span="rc-c3">
              <div className="rc-shot rc-shot--render">
                <img src={asset('resources/RoboCore/robocore-controller-crop-buttons.webp')} alt="The RESET and BOOT buttons, the motion sensor and the buzzer on the controller" width={960} height={600} loading="lazy" decoding="async" style={{ objectPosition: 'center' }} />
              </div>
              <h3 className="rc-tile-title">Light and sound</h3>
              <p className="rc-body">RGB light, buzzer and a USER button</p>
            </Tile>
            <Tile span="rc-c3">
              <div className="rc-shot rc-shot--render">
                <img src={asset('resources/RoboCore/robocore-controller-edge-low.webp')} alt="The yellow XT30 battery plug and the USB-C port on the controller" width={1600} height={1067} loading="lazy" decoding="async" style={{ objectPosition: 'center 40%' }} />
              </div>
              <h3 className="rc-tile-title">Power</h3>
              <p className="rc-body">USB-C and a rechargeable battery</p>
            </Tile>
            <Tile span="rc-c5 rc-r2 rc-full-md" tone="soft">
              <TileArt src="kit-box-open.webp" alt="The RoboCore V2 box, open" w={900} h={1067} />
              <h3 className="rc-tile-title">The kit box</h3>
            </Tile>
            <Tile span="rc-c4 rc-r2">
              <TileArt src="chassis.webp" w={800} h={609} line />
              <h3 className="rc-tile-title">Chassis</h3>
              <p className="rc-body">Holds the controller, the motors, the arm and the sensors.</p>
            </Tile>
            <Tile span="rc-c3" tone="navy">
              <p className="rc-stat rc-stat--sm">68 × 60 mm</p>
              <p className="rc-tile-text">4-layer controller board</p>
            </Tile>
            <Tile span="rc-c3">
              <div className="rc-shot rc-shot--render">
                <img src={asset('resources/RoboCore/robocore-controller-crop-qwiic.webp')} alt="The Qwiic port beside an expansion socket and the MOTOR 2 connector" width={900} height={579} loading="lazy" decoding="async" style={{ objectPosition: 'center' }} />
              </div>
              <h3 className="rc-tile-title">Room to grow</h3>
              <p className="rc-body">A Qwiic (I²C) port and expansion headers for more sensors.</p>
            </Tile>
          </div>
        </div>
      </section>

      {/* ---------- the IDE ---------- */}
      <section id="ide" className="rc-section rc-band" aria-labelledby="rc-ide">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <div className="rc-app-id">
              <AppIcon size={64} className="rc-app-icon" title="" />
              <p className="rc-eyebrow">The app</p>
            </div>
            <h2 id="rc-ide" className="rc-h2">
              The RoboCore IDE
            </h2>
            <p className="rc-lead">Blocks or Arduino C++, on your computer or right in your browser.</p>
            <div className="rc-hero-actions" style={{ alignItems: 'center', gap: '12px 24px' }}>
              <Link className="rc-btn rc-header-cta rc-btn-large" to="/robocore/download">
                <LuDownload aria-hidden="true" /> Download the IDE
              </Link>
              <Link className="rc-link" to="/robocore/ide">
                More about the IDE
              </Link>
            </div>
          </div>
          <div className="rc-bento">
            <Tile span="rc-c8 rc-r2 rc-full-md" className="rc-tile--shot">
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
              <p className="rc-tile-caption">Blocks, with the C++ they write beside them, and the preview board.</p>
            </Tile>
            <Tile span="rc-c4" tone="yellow">
              <p className="rc-stat">74</p>
              <p className="rc-tile-text">blocks in 10 categories, made for the robot</p>
              <ul className="rc-chips">
                {BLOCK_EXAMPLES.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Tile>
            {/* Beside the screenshot: the 74 blocks, then the browser. Next: the code example, with the preview board and Cog stacked beside it. */}
            <Tile span="rc-c4">
              <p className="rc-marks" aria-label="Chrome and Edge">
                <SiGooglechrome aria-hidden="true" />
                <SiMicrosoftedge aria-hidden="true" />
              </p>
              <h3 className="rc-tile-title">{BROWSER[1]}</h3>
              <p className="rc-body">{BROWSER[2]}</p>
            </Tile>
            <Tile span="rc-c6 rc-r2 rc-full-md">
              <LuPuzzle className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">Blocks or C++</h3>
              <p className="rc-body">Switch to Arduino C++ whenever you are ready: the blocks show you the code they write.</p>
              <pre className="rc-code" aria-label="C++ written by the blocks">
                <code>{SNIPPET}</code>
              </pre>
            </Tile>
            <AppTile item={PREVIEW} span="rc-c6" />
            <AppTile item={COG} span="rc-c6" />
            <Tile span="rc-c12 rc-full-md" className="rc-tile--row">
              <div>
                <h3 className="rc-tile-title">What you can make</h3>
                <p className="rc-body">17 examples to start from, or your own idea.</p>
              </div>
              <ul className="rc-make">
                {MAKE.map(([Icon, text]) => (
                  <li key={text}>
                    <Icon aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </Tile>
          </div>
        </div>
      </section>

      {/* ---------- where we are ---------- */}
      <section id="now" className="rc-section rc-section--bento" aria-labelledby="rc-now">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">Where we are</p>
            <h2 id="rc-now" className="rc-h2">
              From prototype to pilot
            </h2>
            <p className="rc-lead">
              RoboCore V2 is our newest prototype. Pilots with schools and innovation hubs in Zambia come next.
            </p>
            <Link className="rc-link" to="/robocore/vision" style={{ justifySelf: 'start' }}>
              Our vision
            </Link>
          </div>
          <div className="rc-bento">
            <Tile span="rc-c7 rc-r2 rc-full-md">
              <ol className="rc-steps">
                <li className="rc-step">
                  <span className="rc-chip rc-step-tag">First</span>
                  <div>
                    <h3 className="rc-tile-title">RoboCore V1: Gypul</h3>
                    <p className="rc-body">Our first prototype: a self-balancing robot, built by hand with 3D-printed parts.</p>
                  </div>
                </li>
                <li className="rc-step is-now" aria-current="step">
                  <span className="rc-chip rc-step-tag">Now</span>
                  <div>
                    <h3 className="rc-tile-title">RoboCore V2</h3>
                    <p className="rc-body">A new controller board, a robot with an arm and sensors, and the RoboCore IDE.</p>
                  </div>
                </li>
                <li className="rc-step">
                  <span className="rc-chip rc-step-tag">Next</span>
                  <div>
                    <h3 className="rc-tile-title">Pilots</h3>
                    <p className="rc-body">Trying RoboCore with schools and innovation hubs in Zambia.</p>
                  </div>
                </li>
              </ol>
            </Tile>
            <Tile span="rc-c5" tone="yellow" contours>
              <p className="rc-stat">8,000+</p>
              <p className="rc-tile-text">
                Our team has been part of initiatives that have reached more than 8,000 young people in Zambia.
              </p>
            </Tile>
            <Tile span="rc-c5" tone="navy">
              <div className="rc-award">
                <img src={asset('resources/RoboCore/logo-ai-for-good.webp')} alt="AI for Good" width={203} height={200} loading="lazy" decoding="async" />
                <p className="rc-eyebrow">From the makers</p>
              </div>
              <p className="rc-tile-text">
                Plastal-Bot Builders won the AI for Good National Edition (Zambia) in April 2026 and were finalists at the AI for
                Good Global Summit in Geneva in July 2026.
              </p>
            </Tile>
            <Supporters />
          </div>
        </div>
      </section>

      {/* ---------- get involved ---------- */}
      <section id="get-involved" className="rc-section rc-section--bento" aria-labelledby="rc-involve">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">Get involved</p>
            <h2 id="rc-involve" className="rc-h2">
              Build RoboCore with us
            </h2>
          </div>
          <div className="rc-bento">
            <Tile span="rc-c6 rc-full-md" tone="yellow" contours>
              <LuSchool className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">Schools and innovation hubs</h3>
              <p className="rc-tile-text">Would you like to try RoboCore with your learners? Tell us about your school or hub.</p>
              <a className="rc-btn rc-btn-primary rc-tile-cta" href={`mailto:${CONTACT}?subject=RoboCore%20pilot`}>
                Email us <LuArrowRight aria-hidden="true" />
              </a>
            </Tile>
            <Tile span="rc-c3">
              <LuHeartHandshake className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">Partners and sponsors</h3>
              <p className="rc-body">Help us build and test the first RoboCore kits.</p>
              <a className="rc-link rc-tile-cta" href={`mailto:${CONTACT}?subject=RoboCore%20partnership`}>
                Talk to us about partnering
              </a>
            </Tile>
            <Tile span="rc-c3">
              <LuLinkedin className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">Follow the build</h3>
              <p className="rc-body">Follow Plastal-Bot Builders for RoboCore news.</p>
              <a className="rc-link rc-tile-cta" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Tile>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoboCorePage;
