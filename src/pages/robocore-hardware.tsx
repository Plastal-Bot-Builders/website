import React from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { LuArrowRight, LuBatteryCharging, LuBox, LuCpu, LuGrab, LuLightbulb, LuRadio, LuSettings2 } from 'react-icons/lu';
import { SEOConfig } from '../components/SEO';
import AppIcon from '../components/RoboCore/AppIcon';
import SubHero from '../components/RoboCore/SubHero';
import Tile from '../components/RoboCore/Tile';
import { asset } from '../utils/asset';

/*
 * /robocore/hardware: the RoboCore V2 controller board and robot. Facts from RoboCore_V2 (the KiCad project, its spec
 * and docs/RoboCore_V2_mechanical.md). V2 is a prototype: say so, and keep the runtimes labelled as estimates.
 */

type Spec = { title: string; icon: IconType; span: string; tone?: 'navy'; rows: [string, string][] };

const SPECS: Spec[] = [
  {
    title: 'The brain',
    icon: LuCpu,
    span: 'rc-c4',
    tone: 'navy',
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

const SpecTile: React.FC<{ spec: Spec }> = ({ spec: { title, icon: Icon, span, tone, rows } }) => (
  <Tile span={span} tone={tone}>
    <Icon className="rc-tile-icon" aria-hidden="true" />
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

const Art: React.FC<{ src: string; alt: string; w: number; h: number; tall?: boolean }> = ({ src, alt, w, h, tall }) => (
  <div className={tall ? 'rc-tile-art rc-tile-art--tall' : 'rc-tile-art'}>
    <img src={asset(`resources/RoboCore/${src}`)} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
  </div>
);

const RoboCoreHardware: React.FC = () => (
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
          src={asset('resources/RoboCore/board-v2-top.webp')}
          alt="The RoboCore V2 controller board: the ESP32-S3 module, motor and servo ports, buttons and the battery plug"
          width={1200}
          height={891}
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
              src="board-v2-back.webp"
              alt="The back of the board: the RoboCore and Plastal-Bot Builders logos, “Designed in Zambia 2026”, and the name of every pin"
              w={1000}
              h={870}
              tall
            />
            <h3 className="rc-tile-title">The back tells you the pins</h3>
            <p className="rc-body">Every header pin is named on the board, so you can wire a sensor without a chart.</p>
          </Tile>
          <Tile span="rc-c5" tone="yellow">
            <p className="rc-stat rc-stat--sm">68 × 60 mm</p>
            <p className="rc-tile-text">Four layers, with every part on the top side.</p>
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
            <Art src="arm-poses.webp" alt="The arm in three positions: folded down, reaching forward and raised straight up" w={1400} h={472} />
            <h3 className="rc-tile-title">An arm that reaches</h3>
            <p className="rc-body">Servos lift the arm and open the gripper, so the robot can pick things up and put them down.</p>
          </Tile>
          <Tile span="rc-c4">
            <LuBox className="rc-tile-icon" aria-hidden="true" />
            <h3 className="rc-tile-title">Made to be printed</h3>
            <p className="rc-body">The chassis, the arm and the sensor mounts are designed for 3D printing.</p>
          </Tile>
          <Tile span="rc-c4">
            <LuRadio className="rc-tile-icon" aria-hidden="true" />
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
          <Tile span="rc-c12 rc-full-md" tone="navy" className="rc-tile--row">
            <div className="rc-app-id">
              <AppIcon size={64} className="rc-app-icon" title="" />
              <div>
                <h3 className="rc-tile-title">Program it in the RoboCore IDE</h3>
                <p className="rc-body">Blocks for the motors, servos, sensors, light and sound, or Arduino C++.</p>
              </div>
            </div>
            <Link className="rc-btn rc-header-cta" to="/robocore/ide">
              About the IDE <LuArrowRight aria-hidden="true" />
            </Link>
          </Tile>
        </div>
      </div>
    </section>
  </>
);

export default RoboCoreHardware;
