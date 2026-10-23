import React from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  LuAlertTriangle,
  LuBatteryCharging,
  LuCpu,
  LuDownload,
  LuFileText,
  LuGrab,
  LuLightbulb,
  LuRadio,
  LuSettings2,
  LuWrench,
} from 'react-icons/lu';
import { SiArduino, SiBluetooth, SiEspressif, SiSparkfun, SiStmicroelectronics } from 'react-icons/si';
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
  icon: IconType;
  span: string;
  tone?: 'navy';
  makers?: [IconType, string][];
  pic?: [string, string, number, number, string?];
  rows: [string, string][];
};

const SPECS: Spec[] = [
  {
    title: 'The brain',
    icon: LuCpu,
    span: 'rc-c4',
    tone: 'navy',
    makers: [
      [SiEspressif, 'Espressif'],
      [SiBluetooth, 'Bluetooth'],
    ],
    pic: ['robocore-controller-macro-esp32', 'Close-up of the ESP32-S3-WROOM-1 module between the two expansion sockets', 1600, 1067, 'center'],
    rows: [
      ['Module', 'ESP32-S3-WROOM-1 (N8R2)'],
      ['Processor', 'Dual-core, up to 240 MHz'],
      ['Memory', '8 MB flash, 2 MB PSRAM'],
      ['Wireless', 'Wi-Fi and Bluetooth LE'],
      ['USB', 'USB-C, straight to the chip'],
    ],
  },
  {
    title: 'Motors and servos',
    icon: LuSettings2,
    span: 'rc-c4',
    pic: ['robocore-controller-crop-motors', 'The MOTOR 2 connector, the Qwiic port and the SERVO 2 header (IO39, 5.5 V, GND), seen from above', 840, 900, 'center 18%'],
    rows: [
      ['Drive', '2 motor ports with encoders (JST SH, 6-pin)'],
      ['Driver', 'DRV8411A, limited to 1.0 A per motor'],
      ['Servos', '4 ports on a 5.5 V supply'],
      ['Fits', 'The same encoder motors as the XRP robot'],
    ],
  },
  {
    title: 'Sensors',
    icon: LuRadio,
    span: 'rc-c4 rc-full-md',
    makers: [
      [SiStmicroelectronics, 'STMicroelectronics'],
      [SiSparkfun, 'SparkFun Qwiic'],
    ],
    pic: ['robocore-controller-crop-sensors', 'The connector edge from above: the ULTRASONIC header (3V3, TRIG, ECHO, GND), the battery plug, USB-C and the LINE header (3V3, GND, L, C, R)', 1200, 400, 'natural'],
    rows: [
      ['Motion', 'LSM6DSOX 6-axis IMU on the board'],
      ['Distance', 'Ultrasonic sensor port, HC-SR04 pin order, 3.3 V'],
      ['Line', '3-channel line sensor port'],
      ['More', 'Qwiic (I²C) port'],
    ],
  },
  {
    title: 'Power',
    icon: LuBatteryCharging,
    span: 'rc-c6',
    pic: ['robocore-controller-edge-low', 'A low view along the connector edge: the yellow XT30 battery plug and the USB-C port', 1600, 1067, 'center 40%'],
    rows: [
      ['Battery', 'Rechargeable 1S Li-ion (3.0–4.2 V), XT30 plug'],
      ['Protection', 'Cuts off a reversed or over-voltage battery'],
      ['Charging', 'Over USB-C at up to 1 A; the robot runs while it charges'],
      ['Supplies', '3.3 V (buck-boost) and 5.5 V (boost) for the servos'],
      ['Switch', 'ON/OFF'],
    ],
  },
  {
    title: 'Light, sound and buttons',
    icon: LuLightbulb,
    span: 'rc-c6',
    pic: ['robocore-controller-crop-buttons', 'The RESET and BOOT buttons, the IMU with its X and Y arrows, and the buzzer, seen from above', 960, 600, 'center'],
    rows: [
      ['Light', 'WS2812B RGB LED and 5 status LEDs'],
      ['Sound', 'Buzzer'],
      ['Buttons', 'RESET, BOOT and USER'],
      ['Expansion', 'Two 14-pin headers: GPIO, I²C, UART and power'],
    ],
  },
];

const VIEWS: [string, string, number, number, string][] = [
  ['robot-front.webp', 'Front', 700, 494, '167 mm wide'],
  ['robot-left.webp', 'Side', 700, 297, '278 mm long'],
];

/** Estimates for 3000 mAh 18650 cells in parallel, from the board's power budget. */
const RUNTIME: [string, string[]][] = [
  ['On the bench, motors off', ['10.9 h', '21.9 h', '32.8 h']],
  ['A class activity', ['2.8 h', '5.7 h', '8.5 h']],
  ['Driving hard', ['1.1 h', '2.3 h', '3.4 h']],
  ['Full charge at 1 A, about', ['3.6 h', '6.6 h', '9.6 h']],
];

const SpecTile: React.FC<{ spec: Spec }> = ({ spec: { title, icon: Icon, span, tone, makers, pic, rows } }) => (
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
    <div className="rc-spec-head">
      <Icon className="rc-tile-icon" aria-hidden="true" />
      {makers && (
        <span className="rc-marks rc-marks--sm">
          {makers.map(([Mark, name]) => (
            <Mark key={name} title={name} />
          ))}
        </span>
      )}
    </div>
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
  ['1', 'RoboCore V2 controller', 'The board on this page, assembled, with the ESP32-S3 and every port.', 'robocore-controller-hero-front.webp', 1600, 1067],
  ['2', 'Motors with encoders', 'XRP-type gear motors (1 : 48) that drive and measure distance.', 'kit-motor.webp', 720, 536],
  ['2', 'Metal-gear servos', 'MG90S: one lifts the arm, one works the gripper.', 'kit-servo.webp', 720, 546],
  ['1', 'Ultrasonic sensor', 'A 3.3 V HC-SR04-type module in the sonar pod at the front.', 'kit-ultrasonic.webp', 720, 664],
  ['1', 'Line sensor', 'A 3-channel TCRT5000-type module underneath.', 'line-sensor.webp', 480, 288, 'line'],
  ['3', '18650 cells and holder', 'About 3000 mAh each, in parallel, charged over USB-C.', 'kit-battery.webp', 720, 489],
  ['2', 'Wheels with TPU tyres', 'Printed wheels with soft, grippy tyres.', 'kit-wheel.webp', 527, 720],
  ['1', 'Set of printed parts', 'Chassis, arm, gripper, sonar pod and clips, printed in PETG.', 'kit-printed.webp', 720, 492],
  ['1', 'Screws, inserts and cables', 'M2 and M3 screws, heat-set inserts, jumper wires and two steel caster balls.', null, 0, 0],
];
/** Bento spans for KIT, in order: the board big, then a row of four, and the box beside the note at the end. */
const KIT_SPANS = ['rc-c6 rc-r2 rc-full-md', 'rc-c3', 'rc-c3', 'rc-c3', 'rc-c3', 'rc-c3', 'rc-c3', 'rc-c3', 'rc-c3'];

/** Files to download: the first two pages of the V2 technical reference, and the Arduino library from robocore-ide. */
const FILES: [IconType, string, string, string, string][] = [
  [LuFileText, 'Pinout and board overview', 'Two A4 pages: every connector, both expansion headers and the GPIO map.', 'RoboCore-V2-pinout.pdf', 'PDF · 2.2 MB'],
  [SiArduino, 'RoboCore Arduino library', 'Motors, encoders, servos, sensors and the driving base, with 16 examples. In Arduino IDE: Sketch › Include Library › Add .ZIP Library.', 'RoboCore-Arduino-library.zip', 'ZIP · 35 KB · version 1.0.0'],
];

/**
 * The arm's three positions in one picture: carrying in front, down at the floor and straight up faded behind it, and
 * an arrow for the way it swings. The arc is centred on the shoulder joint (x 537, y 466 in the picture).
 */
const ArmMotion: React.FC = () => (
  <svg className="rc-arm-motion" viewBox="0 0 990 813" role="img" aria-labelledby="rc-arm-motion-title">
    <title id="rc-arm-motion-title">The arm swings from the floor, through the carrying position, to straight up</title>
    <defs>
      <marker id="rc-arm-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
      </marker>
    </defs>
    <image href={asset('resources/RoboCore/robot-arm-motion.webp')} width="892" height="813" />
    <path
      d="M 860 718 A 410 410 0 0 0 608 62"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      markerStart="url(#rc-arm-head)"
      markerEnd="url(#rc-arm-head)"
    />
    <text x="868" y="782" className="rc-arm-label">Floor</text>
    <text x="930" y="420" className="rc-arm-label">Carry</text>
    <text x="640" y="40" className="rc-arm-label">Up</text>
  </svg>
);

const RoboCoreHardware: React.FC = () => {
  // Opened as /robocore/hardware#kit (from the overview's kit box): go to that section.
  useScrollToHash();
  return (
  <>
    <SEOConfig
      title="RoboCore V2 hardware specifications | RoboCore"
      description="The RoboCore V2 controller board and robot: ESP32-S3, encoder motor ports, four servo ports, IMU, ultrasonic and line sensor ports, USB-C charging and a 3D-printed body."
      image="/resources/social/og-robocore.jpg"
    />

    <SubHero
      id="rc-hw-title"
      eyebrow="RoboCore V2 · prototype"
      title="Hardware specifications"
      lead="What is on the RoboCore V2 controller board, and the robot built around it. V2 is our newest prototype, so details may still change before the pilot kits."
      actions={
        <>
          <span className="rc-chip">ESP32-S3</span>
          <span className="rc-chip">68 × 60 mm, 4 layers</span>
          <span className="rc-chip">Designed in Zambia</span>
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
          <p className="rc-lead">The chip, the motor drivers, the sensors’ ports, the charger and the battery protection, on one board.</p>
        </div>
        <div className="rc-bento">
          {SPECS.map((s) => (
            <SpecTile key={s.title} spec={s} />
          ))}
          <Tile span="rc-c7 rc-r2 rc-full-md" tone="soft">
            <Art
              src="robocore-controller-bottom.webp"
              alt="The back of the board: the RoboCore and Plastal-Bot Builders logos, “Designed in Zambia 2026”, and the name of every pin"
              w={1600}
              h={1440}
              tall
            />
            <h3 className="rc-tile-title">The back tells you the pins</h3>
            <p className="rc-body">Every header pin is named on the board, so you can wire a sensor without a chart.</p>
          </Tile>
          <Tile span="rc-c5" tone="yellow">
            <p className="rc-stat rc-stat--sm">68 × 60 mm</p>
            <p className="rc-tile-text">Four layers, with every part on the top side.</p>
            <Art
              src="robocore-controller-hero-rear.webp"
              alt="The board from the other end: the ESP32-S3 module's antenna and the two motor connectors"
              w={1600}
              h={1067}
            />
          </Tile>
          <Tile span="rc-c5">
            <Art src="board-v1.webp" alt="The RoboCore V1 board design, with an ESP32-C3 module" w={1000} h={743} />
            <h3 className="rc-tile-title">From V1 to V2</h3>
            <p className="rc-body">
              V2 keeps the V1 board’s 68 × 60 mm outline and moves from the ESP32-C3 to the faster ESP32-S3, with more memory
              and XRP-style motor ports.
            </p>
          </Tile>
        </div>
      </div>
    </section>

    {/* ---------- the robot ---------- */}
    <section id="robot" className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-hw-robot">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">The robot</p>
          <h2 id="rc-hw-robot" className="rc-h2">
            167 × 278 × 118 mm
          </h2>
          <p className="rc-lead">Two driven wheels, an arm with a gripper, a distance sensor at the front and a line sensor underneath.</p>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c4 rc-r2" tone="yellow" contours>
            <Art src="robot-top.webp" alt="RoboCore V2 from above: the controller board in the middle, the wheels at the sides and the gripper in front" w={700} h={1165} tall />
            <p className="rc-view">
              <span>From above</span>
              <span className="rc-dim">167 × 278 mm</span>
            </p>
          </Tile>
          <Tile span="rc-c8">
            <div className="rc-views">
              {VIEWS.map(([src, label, w, h, dim]) => (
                <figure key={src}>
                  <Art src={src} alt={`RoboCore V2, ${label.toLowerCase()} view`} w={w} h={h} />
                  <figcaption className="rc-view">
                    <span>{label}</span>
                    <span className="rc-dim">{dim}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Tile>
          <Tile span="rc-c8">
            <ArmMotion />
            <h3 className="rc-tile-title">An arm that reaches</h3>
            <p className="rc-body">Servos lift the arm and open the gripper, so the robot can pick things up and put them down.</p>
          </Tile>
          <Tile span="rc-c4">
            <Art src="chassis.webp" alt="A line drawing of the robot's chassis" w={800} h={609} line />
            <h3 className="rc-tile-title">Made to be printed</h3>
            <p className="rc-body">The chassis, the arm and the sensor mounts are designed for 3D printing.</p>
          </Tile>
          <Tile span="rc-c4">
            <div className="rc-sensors rc-sensors--two">
              <Art src="sonar.webp" alt="A line drawing of the ultrasonic distance sensor" w={480} h={306} line />
              <Art src="line-sensor.webp" alt="A line drawing of the 3-channel line sensor" w={480} h={288} line />
            </div>
            <h3 className="rc-tile-title">Sensors in place</h3>
            <p className="rc-body">The ultrasonic sensor looks ahead and the 3-channel line sensor looks at the floor.</p>
          </Tile>
          <Tile span="rc-c4 rc-full-md">
            <LuGrab className="rc-tile-icon" aria-hidden="true" />
            <h3 className="rc-tile-title">Common parts</h3>
            <p className="rc-body">Hobby servos (MG90S or SG90), encoder motors and widely available sensor modules.</p>
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
          <p className="rc-lead">Everything one robot needs, from the parts list for the V2 prototype.</p>
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
          <Tile span="rc-c6" className="rc-kit">
            <div className="rc-kit-pic">
              <img src={asset('resources/RoboCore/kit-box-open.webp')} alt="" width={900} height={1067} loading="lazy" decoding="async" />
            </div>
            <p className="rc-kit-count" aria-hidden="true">
              1<span>×</span>
            </p>
            <h3 className="rc-tile-title">
              <span className="rc-sr">1 × </span>Box and quick-start guide
            </h3>
            <p className="rc-body">A mailer box, printed inside, with a quick-start guide.</p>
          </Tile>
          <Tile span="rc-c6" tone="yellow" contours>
            <h3 className="rc-tile-title">The planned pilot kit</h3>
            <p className="rc-tile-text">
              This is what we plan to put in each kit for the pilots. V2 is a prototype, so the contents may still change.
            </p>
          </Tile>
        </div>
      </div>
    </section>

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
          {FILES.map(([Icon, title, text, file, meta]) => (
            <Tile key={file} span="rc-c4">
              <Icon className="rc-tile-icon" aria-hidden="true" />
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
  </>
  );
};

export default RoboCoreHardware;
