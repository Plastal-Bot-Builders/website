import React from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { LuAlertTriangle, LuDownload, LuFileText, LuWrench } from 'react-icons/lu';
import { SiArduino } from 'react-icons/si';
import { SEOConfig } from '../components/SEO';
import AppIcon from '../components/RoboCore/AppIcon';
import SubHero from '../components/RoboCore/SubHero';
import Tile from '../components/RoboCore/Tile';
import { useScrollToHash } from '../components/RoboCore/shared';
import { asset } from '../utils/asset';

/*
 * /robocore/hardware: the RoboCore V2 controller board and robot. Facts from RoboCore_V2 (the KiCad project, its spec
 * and docs/RoboCore_V2_mechanical.md). V2 is a prototype: say so, and keep the runtimes labelled as estimates.
 */

/** `makers`: the marks of the companies whose parts or standards the tile names (react-icons/si). */
/** `pic`: a close-up from the controller renders [file, alt, width, height, object-position or 'natural'
 *  (keep the picture's own shape, for the wide connector-edge strip)]. */
type Spec = {
  title: string;
  span: string;
  tone?: 'navy';
  pic?: [string, string, number, number, string?];
  rows: [string, string][];
};

const SPECS: Spec[] = [
  { title: 'Bring your ideas to life', span: 'rc-c4', tone: 'navy',
    pic: ['robocore-controller-macro-esp32', 'The controller at the heart of RoboCore', 1600, 1067],
    rows: [['Create', 'Write a program and see the robot respond.'], ['Connect', 'Upload your projects over USB-C.']] },
  { title: 'Move, lift and grip', span: 'rc-c4',
    pic: ['robocore-controller-crop-motors', 'Motor and servo connections on RoboCore', 840, 900],
    rows: [['Drive', 'Control the wheels and use encoder feedback to measure movement.'], ['Build', 'Connect servos for a lift, gripper or your own moving mechanism.']] },
  { title: 'Respond to the world', span: 'rc-c4',
    pic: ['robocore-controller-crop-sensors', 'Connections for distance and line sensors', 1200, 400, 'natural'],
    rows: [['Explore', 'Use distance and line sensors to navigate a course.'], ['React', 'Read tilt and motion with the sensor built into the board.']] },
  { title: 'Recharge and keep exploring', span: 'rc-c6',
    pic: ['robocore-controller-edge-low', 'USB-C and battery connections', 1600, 1067],
    rows: [['Recharge', 'Charge the rechargeable battery through USB-C.'], ['Reuse', 'Try a new activity with the same robot and controller.']] },
  { title: 'Start with a light or a sound', span: 'rc-c6 rc-full-md',
    pic: ['robocore-controller-crop-buttons', 'Buttons and buzzer on the controller', 960, 600],
    rows: [['First steps', 'Change the LED colour, play a melody or respond to a button press.'], ['Next steps', 'Combine those actions with movement and sensor readings.']] },
];

const VIEWS: [string, string, number, number, string][] = [
  ['robot-front.webp', 'Front', 700, 503, '154 mm wide'],
  ['robot-left.webp', 'Side', 700, 271, '286 mm long'],
];

/** Estimates for 3000 mAh 18650 cells in parallel, from the board's power budget. */
const RUNTIME: [string, string[]][] = [
  ['On the bench, motors off', ['10.9 h', '21.9 h', '32.8 h']],
  ['A class activity', ['2.8 h', '5.7 h', '8.5 h']],
  ['Driving hard', ['1.1 h', '2.3 h', '3.4 h']],
  ['Full charge at 1 A, about', ['3.6 h', '6.6 h', '9.6 h']],
];

const SpecTile: React.FC<{ spec: Spec }> = ({ spec: { title, span, tone, pic, rows } }) => (
  <Tile span={span} tone={tone}>
    {pic && (
      <div className={pic[4] === 'natural' ? 'rc-shot rc-shot--render rc-shot--natural' : 'rc-shot rc-shot--render'}>
        <img
          src={asset(`resources/RoboCore/${pic[0]}.webp`)}
          alt={pic[1]}
          width={pic[2]}
          height={pic[3]}
          loading="lazy"
          decoding="async"
          style={pic[4] && pic[4] !== 'natural' ? { objectPosition: pic[4] } : undefined}
        />
      </div>
    )}
    <h3 className="rc-tile-title">{title}</h3>
    <dl className="rc-spec">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  </Tile>
);

/** A render or drawing that fills the tile's free space; `line` drawings are inverted in dark mode. */
const Art: React.FC<{ src: string; alt: string; w: number; h: number; tall?: boolean; line?: boolean }> = ({ src, alt, w, h, tall, line }) => (
  <div className={tall ? 'rc-tile-art rc-tile-art--tall' : 'rc-tile-art'}>
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

/**
 * The planned kit for the pilots, one robot's worth, from RoboCore_V2/docs/RoboCore_V2_component_list.xlsx.
 * [count, name, note, picture, width, height, picture kind]. The part renders come from the robot model (Fusion v36)
 * with the controller renders' studio set-up; the line sensor is a drawing because the kit uses a bought-in module.
 */
const KIT: [string, string, string, string | null, number, number, ('render' | 'line')?][] = [
  ['1', 'RoboCore V2 controller', 'The assembled controller that brings your robot to life.', 'robocore-controller-hero-front.webp', 1600, 1067],
  ['2', 'Motors with encoders', 'Drive the robot and measure how far the wheels turn.', 'kit-motor.webp', 720, 536],
  ['2', 'Metal-gear servos', 'One moves the lift; the other opens and closes the gripper.', 'kit-servo.webp', 720, 546],
  ['1', 'Ultrasonic sensor', 'Helps the robot sense objects ahead.', 'kit-ultrasonic.webp', 720, 664],
  ['1', 'Line sensor', 'Reads the track beneath the robot for line-following activities.', 'line-sensor.webp', 480, 288, 'line'],
  ['3', '18650 cells', 'Rechargeable batteries held in a cradle and charged through USB-C.', 'kit-battery.webp', 720, 516],
  ['2', 'Wheels with TPU tyres', 'Soft, grippy tyres help the robot move.', 'kit-wheel.webp', 590, 720],
  ['4', 'V-wheels', 'Support the robot at the corners of its frame.', 'kit-vwheel.webp', 671, 720],
  ['1', 'Set of printed parts', 'Frame, lift, gripper, battery cradle, carry handle and rear deck, printed in PETG.', 'kit-printed.webp', 720, 424],
  ['1', 'Screws, bearings and cables', 'The fittings and connections needed to assemble the robot.', null, 0, 0],
];
/** Three balanced rows of parts, then fittings beside the box. */
const KIT_SPANS = ['rc-c4', 'rc-c4', 'rc-c4', 'rc-c4', 'rc-c4', 'rc-c4', 'rc-c4', 'rc-c4', 'rc-c4', 'rc-c6'];

/** Files to download: the first two pages of the V2 technical reference, and the Arduino library from robocore-ide. */
const FILES: [IconType, string, string, string, string][] = [
  [LuFileText, 'Pinout and board overview', 'Two A4 pages: every connector, both expansion headers and the GPIO map.', 'RoboCore-V2-pinout.pdf', 'PDF · 2.2 MB'],
  [SiArduino, 'RoboCore Arduino library', 'Motors, encoders, servos, sensors and the driving base, with 16 examples. In Arduino IDE: Sketch › Include Library › Add .ZIP Library.', 'RoboCore-Arduino-library.zip', 'ZIP · 35 KB · version 1.0.0'],
];

/**
 * The lift's three positions in one picture: carrying (level) in front, down at the floor and up faded behind it, and
 * an arrow for the way the gripper travels. The lift is a parallel four-bar, so the gripper head moves on a circle
 * (centre x 543, y 263 in the picture, through the three head positions) without tilting; the arrow runs outside it.
 */
const ArmMotion: React.FC = () => (
  <svg className="rc-arm-motion" viewBox="0 0 1000 560" role="img" aria-labelledby="rc-arm-motion-title">
    <title id="rc-arm-motion-title">The lift swings the gripper from the floor, through the carrying position, up</title>
    <defs>
      <marker id="rc-arm-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
      </marker>
    </defs>
    <image href={asset('resources/RoboCore/robot-arm-motion.webp')} width="892" height="487" />
    <path
      d="M 804 511 A 359 359 0 0 0 803 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      markerStart="url(#rc-arm-head)"
      markerEnd="url(#rc-arm-head)"
    />
    <text x="822" y="548" className="rc-arm-label">Floor</text>
    <text x="914" y="266" className="rc-arm-label">Carry</text>
    <text x="824" y="30" className="rc-arm-label">Up</text>
  </svg>
);

const RoboCoreHardware: React.FC = () => {
  // Opened as /robocore/hardware#kit (from the overview's kit box): go to that section.
  useScrollToHash();
  return (
  <>
    <SEOConfig
      title="Explore the RoboCore robot and kit | RoboCore"
      description="Explore what you can build with RoboCore: a programmable robot with a lift, gripper and sensors, plus a coding app for hands-on learning."
      image="/resources/social/og-robocore.jpg"
    />

    <SubHero
      id="rc-hw-title"
      eyebrow="RoboCore · prototype"
      title="Meet your next robotics project"
      lead="Build a robot, teach it to move and give it new challenges. Explore the controller, sensors and moving parts that turn your code into action. Pilot kits are in development."
      actions={
        <>
          <Link className="rc-btn rc-btn-primary" to="/robocore/hardware#kit">Explore the kit</Link>


        </>
      }
      art={
        <img
          className="rc-sub-render"
          src={asset('resources/RoboCore/robocore-controller-hero-front.webp')}
          alt="The RoboCore V2 controller board from the connector edge: the ESP32-S3 module, the yellow XT30 battery plug, USB-C, and the sensor and servo headers"
          width={1600}
          height={1067}
          decoding="async"
        />
      }
    />

    {/* ---------- the controller ---------- */}
    <section id="board" className="rc-section rc-section--bento" aria-labelledby="rc-hw-board">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">The controller</p>
          <h2 id="rc-hw-board" className="rc-h2">
            One board runs the robot
          </h2>
          <p className="rc-lead">Start with a button, a light or a melody. Then bring movement and sensors into your projects.</p>
        </div>
        <div className="rc-bento">
          {SPECS.map((s) => (
            <SpecTile key={s.title} spec={s} />
          ))}

        </div>
      </div>
    </section>

    {/* ---------- the robot ---------- */}
    <section id="robot" className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-hw-robot">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">The robot</p>
          <h2 id="rc-hw-robot" className="rc-h2">
            Drive. Explore. Pick things up.
          </h2>
          <p className="rc-lead">Two driven wheels, four V-wheels, a lift with a gripper, a distance sensor at the front and a line sensor underneath.</p>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c4 rc-r2" tone="soft" contours>
            <Art src="robot-top.webp" alt="RoboCore from above: the controller board in the middle, the wheels at the sides and the gripper in front" w={700} h={1303} tall />
            <p className="rc-view">
              <span>From above</span>
            </p>
          </Tile>
          <Tile span="rc-c8">
            <div className="rc-views">
              {VIEWS.map(([src, label, w, h]) => (
                <figure key={src}>
                  <Art src={src} alt={`RoboCore, ${label.toLowerCase()} view`} w={w} h={h} />
                  <figcaption className="rc-view">
                    <span>{label}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Tile>
          <Tile span="rc-c8">
            <ArmMotion />
            <h3 className="rc-tile-title">A lift that reaches</h3>
            <p className="rc-body">One servo swings the parallel lift, another opens the gripper, so the robot can pick things up and put them down.</p>
          </Tile>
          <Tile span="rc-c6">
            <Art src="chassis.webp" alt="A line drawing of the robot's frame" w={800} h={536} line />
            <h3 className="rc-tile-title">Made to be printed</h3>
            <p className="rc-body">The frame, the lift and the gripper are designed for 3D printing, flat on the bed with no supports.</p>
          </Tile>
          <Tile span="rc-c6">
            <div className="rc-sensors rc-sensors--two">
              <Art src="sonar.webp" alt="A line drawing of the ultrasonic distance sensor" w={480} h={306} line />
              <Art src="line-sensor.webp" alt="A line drawing of the 3-channel line sensor" w={480} h={288} line />
            </div>
            <h3 className="rc-tile-title">Sensors in place</h3>
            <p className="rc-body">The ultrasonic sensor looks ahead and the 3-channel line sensor looks at the floor.</p>
          </Tile>
          <Tile span="rc-c12 rc-full-md" className="rc-hardware-note">
            <h3 className="rc-tile-title">Common parts</h3>
            <p className="rc-body">Hobby servos (MG90S), encoder motors, V-slot wheels and widely available sensor modules.</p>
          </Tile>
        </div>
      </div>
    </section>

    {/* ---------- what's in the kit ---------- */}
    <section id="kit" className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-hw-kit">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">The kit</p>
          <h2 id="rc-hw-kit" className="rc-h2">
            What’s in the box
          </h2>
          <p className="rc-lead">The planned pilot kit brings together the parts for hands-on robotics activities.</p>
        </div>
        <div className="rc-bento">
          {KIT.map(([count, name, note, src, w, h, kind], i) => (
            <Tile key={name} span={KIT_SPANS[i]} className="rc-kit">
              <div className="rc-kit-pic">
                {src ? (
                  <img
                    src={asset(`resources/RoboCore/${src}`)}
                    alt=""
                    width={w}
                    height={h}
                    loading="lazy"
                    decoding="async"
                    className={kind === 'line' ? 'rc-art-line' : undefined}
                  />
                ) : (
                  <LuWrench aria-hidden="true" />
                )}
              </div>
              <p className="rc-kit-count" aria-hidden="true">
                {count}
                <span>×</span>
              </p>
              <h3 className="rc-tile-title">
                <span className="rc-sr">{count} × </span>
                {name}
              </h3>
              <p className="rc-body">{note}</p>
            </Tile>
          ))}
          <Tile span="rc-c6 rc-full-md" className="rc-kit">
            <div className="rc-kit-pic">
              <img src={asset('resources/RoboCore/kit-box-open.webp')} alt="" width={900} height={1057} loading="lazy" decoding="async" />
            </div>
            <p className="rc-kit-count" aria-hidden="true">
              1<span>×</span>
            </p>
            <h3 className="rc-tile-title">
              <span className="rc-sr">1 × </span>Box and quick-start guide
            </h3>
            <p className="rc-body">A mailer box, printed inside, with a quick-start guide.</p>
          </Tile>
          <Tile span="rc-c12 rc-full-md" tone="yellow" contours className="rc-hardware-note">
            <h3 className="rc-tile-title">The planned pilot kit</h3>
            <p className="rc-tile-text">
              This is what we plan to put in each kit for the pilots. V2 is a prototype, so the contents may still change.
            </p>
          </Tile>
        </div>
      </div>
    </section>

    <details className="rc-wrap rc-technical-details">
      <summary>Technical details and downloads</summary>
    {/* ---------- battery ---------- */}
    <section id="battery" className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-hw-battery">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">Battery</p>
          <h2 id="rc-hw-battery" className="rc-h2">
            How long it runs
          </h2>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c8 rc-full-md">
            <div className="rc-table-wrap">
              <table className="rc-table">
                <caption className="rc-table-caption">Hours, with 3000 mAh 18650 cells</caption>
                <thead>
                  <tr>
                    <th scope="col">Use</th>
                    <th scope="col">1 cell</th>
                    <th scope="col">2 cells</th>
                    <th scope="col">3 cells</th>
                  </tr>
                </thead>
                <tbody>
                  {RUNTIME.map(([use, hours]) => (
                    <tr key={use}>
                      <th scope="row">{use}</th>
                      {hours.map((h, i) => (
                        <td key={i}>{h}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tile>
          <Tile span="rc-c4 rc-full-md" tone="yellow">
            <h3 className="rc-tile-title">These are estimates</h3>
            <p className="rc-body">
              Worked out from the parts’ datasheets, with the cells in parallel. We will measure the real times on the
              prototype and update them here.
            </p>
          </Tile>
        </div>
      </div>
    </section>

    {/* ---------- documentation and downloads ---------- */}
    <section id="downloads" className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-hw-files">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">Documentation</p>
          <h2 id="rc-hw-files" className="rc-h2">
            Downloads
          </h2>
        </div>
        <div className="rc-bento">
          {FILES.map(([, title, text, file, meta]) => (
            <Tile key={file} span="rc-c4">
              <h3 className="rc-tile-title">{title}</h3>
              <p className="rc-body">{text}</p>
              <p className="rc-dl-file">{meta}</p>
              <a className="rc-btn rc-btn-outline rc-tile-cta" href={asset(`resources/RoboCore/downloads/${file}`)} download={file}>
                <LuDownload aria-hidden="true" /> Download
              </a>
            </Tile>
          ))}
          <Tile span="rc-c4 rc-full-md" tone="navy">
            <AppIcon size={48} className="rc-app-icon" title="" />
            <h3 className="rc-tile-title">Or use the RoboCore IDE</h3>
            <p className="rc-body">The library and the examples are built in, with blocks for every part of the robot.</p>
            <Link className="rc-link rc-tile-cta" to="/robocore/ide">
              About the IDE
            </Link>
          </Tile>
          <Tile span="rc-c12 rc-full-md" className="rc-tile--split rc-wiring">
            <div>
              <LuAlertTriangle className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">Plug the sensors in the right way round</h3>
              <p className="rc-body">The sensor headers are not keyed, so a cable fits either way. Check pin 1 (3V3) before you switch on.</p>
              <ul className="rc-wiring-list">
                <li>
                  <strong>Ultrasonic:</strong> 3V3, TRIG, ECHO, GND, the same order as an HC-SR04, so a straight cable fits. Use a
                  3.3 V module such as the HC-SR04P. Plugged in backwards, the sensor is likely to be ruined within seconds.
                </li>
                <li>
                  <strong>Line sensor:</strong> 3V3, GND, L, C, R. Check your module’s pin order first: modules with a comparator
                  chip can be damaged if their supply is reversed.
                </li>
                <li>
                  <strong>Servos:</strong> signal, 5.5 V, GND, with 5.5 V in the middle, so a servo plug turned round does no
                  harm. Don’t let the plug slide one pin off the end.
                </li>
              </ul>
            </div>
            <div className="rc-shot rc-shot--render rc-shot--natural">
              <img
                src={asset('resources/RoboCore/robocore-controller-crop-sensors.webp')}
                alt="The connector edge from above: the ULTRASONIC header labelled 3V3, TRIG, ECHO, GND and the LINE header labelled 3V3, GND, L, C, R"
                width={1200}
                height={400}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Tile>
        </div>
      </div>
    </section>
    </details>
  </>
  );
};

export default RoboCoreHardware;
