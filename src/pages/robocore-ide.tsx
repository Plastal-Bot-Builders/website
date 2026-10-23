import React from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { FaApple, FaLinux, FaWindows } from 'react-icons/fa';
import { LuCheck, LuDownload, LuMonitor, LuRadio, LuSettings2, LuWifiOff } from 'react-icons/lu';
import { SiAdafruit, SiArduino, SiEspressif, SiGooglechrome, SiMicrosoftedge, SiVisualstudiocode } from 'react-icons/si';
import { SEOConfig } from '../components/SEO';
import AppIcon from '../components/RoboCore/AppIcon';
import { GearMark } from '../components/RoboCore/RoboCoreLogo';
import SubHero from '../components/RoboCore/SubHero';
import Tile from '../components/RoboCore/Tile';
import { WEB_IDE } from '../components/RoboCore/shared';
import { asset } from '../utils/asset';

/*
 * /robocore/ide: what the RoboCore IDE does, Cog, and the boards it works with. Facts from the robocore-ide repository
 * (README.md, docs/cog.md, lib/data/catalog.dart). The pictures are crops of the IDE itself (the app built from the
 * Figma design), see the README in src/components/RoboCore; brand marks are the makers' own (react-icons/si).
 */

type Mark = React.ComponentType<{ className?: string }>;

/** [name, chip and memory, how it is programmed, the maker's mark] */
const BOARDS: [string, string, string, Mark][] = [
  ['RoboCore V2', 'ESP32-S3 · 8 MB flash · 2 MB PSRAM', 'Every block, the RoboCore library and the preview board', GearMark],
  ['Arduino Uno R3', 'ATmega328P · 32 KB flash', 'Uploads through its own bootloader over USB', SiArduino],
  ['ESP32 DevKit V1', 'ESP32 · 4 MB flash', 'Uploads over USB', SiEspressif],
  ['NodeMCU-32S', 'ESP32 · 4 MB flash', 'Uploads over USB', SiEspressif],
];

/** Libraries that come with the IDE; a maker's mark only where the library is that maker's own. */
const LIBRARIES: [Mark, string, string][] = [
  [GearMark, 'RoboCore', 'the robot’s motors, servos, sensors, light and sound'],
  [SiAdafruit, 'Adafruit NeoPixel', 'RGB LEDs and strips'],
  [LuSettings2, 'ESP32Servo', 'servos on ESP32 boards'],
  [LuRadio, 'NewPing', 'ultrasonic distance sensors'],
  [LuMonitor, 'LiquidCrystal I2C', 'character displays'],
];

/** [title, text, picture (a crop of the IDE), alt, width, height, object-position] */
const MORE: [string, string, string, string, number, number, string?][] = [
  ['Preview board', 'No robot yet? Programs run on a simulated board: motors, servo, sonar, line sensor, tilt, battery, LED and buzzer.', 'ide-feat-preview', 'The preview board: the RGB light lit white, the USER button, and readings for the motors, servo, sonar, line sensor, tilt and battery', 564, 352],
  ['Serial Monitor', 'Read what the board prints and send it text, at the usual baud rates.', 'ide-feat-serial', 'The Serial Monitor with time-stamped lines from the board and a box to send it a message', 758, 474],
  ['Verify and Upload', 'A real Arduino build checks the program; problems show in the code, line by line.', 'ide-feat-verify', 'The Verify, Upload, Stop and Ask Cog buttons, over “Verified: 289,306 bytes (9%), RAM 6%”', 960, 600],
  ['17 examples', 'From blinking an LED to a line follower and an obstacle avoider, each marked with the boards it runs on.', 'ide-feat-examples', 'Example cards: RoboCore V2 board test, Blink an LED, Button-controlled LED, Ultrasonic distance and more, each with its level and boards', 1000, 624],
  ['Projects', 'Saved on the computer, with several files per project; download them as .ino or .zip.', 'ide-feat-projects', 'Project cards: Blink LED, Distance monitor, Button LED and Obstacle avoider, marked Blocks or Code', 1000, 624],
  ['Light and dark', 'The box’s cream and yellow, or navy for evening work.', 'ide-feat-themes', 'The same project in the light Paper look and the dark Navy look, split on a diagonal', 1200, 750, 'center'],
];

/** Where the IDE runs: the desktop app, or the browser. */
const PLATFORMS: [IconType, string][] = [
  [FaApple, 'macOS'],
  [FaWindows, 'Windows'],
  [FaLinux, 'Linux'],
  [SiGooglechrome, 'Chrome'],
  [SiMicrosoftedge, 'Edge'],
];

/** A piece of the IDE, framed. `natural` keeps the picture's own shape instead of the 16:10 frame. */
const Shot: React.FC<{ src: string; alt: string; w: number; h: number; pos?: string; natural?: boolean }> = ({
  src,
  alt,
  w,
  h,
  pos,
  natural,
}) => (
  <div className={natural ? 'rc-shot rc-shot--natural' : 'rc-shot'}>
    <img
      src={asset(`resources/RoboCore/${src}.webp`)}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      style={pos ? { objectPosition: pos } : undefined}
    />
  </div>
);

const RoboCoreIde: React.FC = () => (
  <>
    <SEOConfig
      title="The RoboCore IDE: blocks, Arduino C++ and Cog | RoboCore"
      description="The RoboCore IDE: robot blocks or Arduino C++, Cog the learning partner, a preview board, and support for RoboCore V2, Arduino Uno and ESP32 boards."
      image="/resources/social/og-robocore-ide.jpg"
    />

    <SubHero
      id="rc-ide-title"
      eyebrow="The RoboCore IDE"
      title="Code it your way"
      lead="Start with blocks made for the robot, move on to real Arduino C++, and get help from Cog, a learning partner that helps you find the answer yourself."
      icon={<AppIcon size={64} appearance="dark" className="rc-app-icon" title="" />}
      actions={
        <>
          <Link className="rc-btn rc-btn-primary rc-btn-large" to="/robocore/download">
            <LuDownload aria-hidden="true" /> Download the IDE
          </Link>
          <a className="rc-btn rc-btn-outline rc-btn-large" href={WEB_IDE} target="_blank" rel="noopener noreferrer">
            Open in the browser
          </a>
        </>
      }
      art={
        <div className="rc-window">
          <div className="rc-window-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <img
            src={asset('resources/RoboCore/ide-blocks.webp')}
            alt="The RoboCore IDE: a program made of blocks, the C++ it writes, and the preview board"
            width={1600}
            height={903}
            decoding="async"
          />
        </div>
      }
    />

    {/* ---------- two ways to code ---------- */}
    <section className="rc-section rc-section--bento" aria-labelledby="rc-ide-code">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">Two ways to code</p>
          <h2 id="rc-ide-code" className="rc-h2">
            Blocks, then C++
          </h2>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c5 rc-r2 rc-full-md" tone="yellow">
            <p className="rc-stat">74</p>
            <p className="rc-tile-text">blocks in 10 categories, made for the robot</p>
            <Shot
              src="ide-feat-blocks"
              alt="The block categories (Events, Movement, Motors, Light & Sound, Sensors, Control, Operators, Variables, My Blocks, Pins & Serial) with the Light & Sound blocks open: turn LED, set LED to red, play beep and more"
              w={918}
              h={964}
              natural
            />
          </Tile>
          <Tile span="rc-c7 rc-full-md" className="rc-tile--shot rc-tile--light-shot">
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
            <p className="rc-tile-caption">The program from the blocks above, as Arduino C++.</p>
          </Tile>
          <Tile span="rc-c7 rc-full-md" className="rc-tile--split">
            <div>
              <p className="rc-marks" aria-label="Arduino C++ in the code editor from Visual Studio Code">
                <SiArduino aria-hidden="true" />
                <SiVisualstudiocode aria-hidden="true" />
              </p>
              <h3 className="rc-tile-title">Arduino C++, with help</h3>
              <p className="rc-body">
                The code editor is the one in VS Code: suggestions and explanations for Arduino and RoboCore functions, find,
                and problems marked in the code. The blocks show the C++ they write, so the step from one to the other is small.
              </p>
            </div>
            <Shot
              src="ide-feat-hints"
              alt="Typing digitalWrite( shows its parameters, pin and value, with “Switches an output pin HIGH (on) or LOW (off)” and a link to the Arduino reference"
              w={1120}
              h={700}
              pos="left center"
            />
          </Tile>
        </div>
      </div>
    </section>

    {/* ---------- Cog ---------- */}
    <section className="rc-section rc-band" aria-labelledby="rc-ide-cog">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">Cog, your learning partner</p>
          <h2 id="rc-ide-cog" className="rc-h2">
            Help that keeps you thinking
          </h2>
          <p className="rc-lead">
            Ask Cog about an error, a block or your robot. It explains first and gives hints one at a time, so the answer stays
            yours.
          </p>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c4 rc-r2" className="rc-tile--shot rc-tile--cog">
            <img
              src={asset('resources/RoboCore/ide-cog.webp')}
              alt="Cog's panel in the IDE: what Cog can see, its greeting, Give me a challenge, and a box to ask a question"
              width={560}
              height={1104}
              loading="lazy"
              decoding="async"
            />
          </Tile>
          <Tile span="rc-c8" tone="yellow">
            <h3 className="rc-tile-title">The hint ladder</h3>
            <ol className="rc-ladder">
              <li>An explanation, without the answer</li>
              <li>Give me a hint</li>
              <li>Another hint</li>
              <li>Show the fix: Cog changes the code only when you press Apply</li>
              <li>A quick question to check the idea stuck</li>
            </ol>
            <p className="rc-tile-text">Every idea you master joins your project’s “You’ve learned” list.</p>
          </Tile>
          <Tile span="rc-c4">
            <Shot
              src="ide-feat-explain"
              alt="A misspelt digitalW(1000) underlined in the code, and its line in Problems: “'digitalW' was not declared in this scope”, with an Explain button"
              w={960}
              h={600}
            />
            <h3 className="rc-tile-title">Explain any error</h3>
            <p className="rc-body">Explain sits on every problem, on a failed build, and on the squiggle in the code.</p>
          </Tile>
          <Tile span="rc-c4">
            <Shot
              src="ide-feat-cog-blocks"
              alt="A forever loop of blocks beside Cog: “Hi! I'm Cog. Select a block and I can explain it, or ask me for a challenge.”"
              w={1080}
              h={600}
              pos="left center"
            />
            <h3 className="rc-tile-title">Blocks too</h3>
            <p className="rc-body">Select a block and ask Cog to explain it, then ask for a challenge. Press “I tried it” and Cog looks at what you made.</p>
          </Tile>
          <Tile span="rc-c6">
            <Shot
              src="ide-feat-teacher"
              alt="Settings, Cog: how should Cog help? Hints first (the default), Explain the answer, or Write code for me (Teacher), and Set a teacher PIN"
              w={900}
              h={585}
              pos="left top"
            />
            <h3 className="rc-tile-title">Teachers choose</h3>
            <p className="rc-body">
              Three help styles: Hints first (the default), Explain the answer, and Write code for me, which needs the teacher’s
              PIN.
            </p>
          </Tile>
          <Tile span="rc-c6">
            <ul className="rc-offline" aria-label="Without internet">
              {['Writing code', 'Verify', 'Upload', 'Serial Monitor'].map((t) => (
                <li key={t}>
                  <LuCheck aria-hidden="true" /> {t}
                </li>
              ))}
              <li className="is-off">
                <LuWifiOff aria-hidden="true" /> Cog needs the internet
              </li>
            </ul>
            <h3 className="rc-tile-title">Without internet</h3>
            <p className="rc-body">Cog needs the internet. Writing code, Verify, Upload and the Serial Monitor keep working without it.</p>
          </Tile>
        </div>
      </div>
    </section>

    {/* ---------- other hardware ---------- */}
    <section id="boards" className="rc-section rc-section--bento" aria-labelledby="rc-ide-boards">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">More than RoboCore</p>
          <h2 id="rc-ide-boards" className="rc-h2">
            Works with the boards you have
          </h2>
          <p className="rc-lead">
            Already have an Arduino Uno or an ESP32 board? Pick it in Board Setup and code it the same way.
          </p>
        </div>
        <div className="rc-bento">
          {BOARDS.map(([name, chip, how, Brand], i) => (
            <Tile key={name} span="rc-c3" tone={i === 0 ? 'navy' : i === 1 ? 'yellow' : undefined}>
              <Brand className="rc-brand" />
              <h3 className="rc-tile-title rc-tile-title--case">{name}</h3>
              <p className="rc-dl-file">{chip}</p>
              <p className="rc-body">{how}</p>
            </Tile>
          ))}
          <Tile span="rc-c8 rc-full-md" className="rc-tile--shot rc-tile--light-shot">
            <div className="rc-window">
              <div className="rc-window-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img
                src={asset('resources/RoboCore/ide-boards.webp')}
                alt="Board Setup in the IDE: RoboCore V2, Arduino Uno R3, ESP32 DevKit V1 and NodeMCU-32S, with the Uno's details"
                width={1600}
                height={421}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="rc-tile-caption">Board Setup, with the Arduino Uno chosen.</p>
          </Tile>
          <Tile span="rc-c4 rc-full-md">
            <h3 className="rc-tile-title">Libraries</h3>
            <ul className="rc-libs">
              {LIBRARIES.map(([Icon, name, what]) => (
                <li key={name}>
                  <Icon className="rc-libs-mark" />
                  <span>
                    <strong>{name}</strong> {what}
                  </span>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      </div>
    </section>

    {/* ---------- and more ---------- */}
    <section className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-ide-more">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">And more</p>
          <h2 id="rc-ide-more" className="rc-h2">
            Everything in one place
          </h2>
        </div>
        <div className="rc-bento">
          {MORE.map(([title, text, src, alt, w, h, pos]) => (
            <Tile key={title} span="rc-c4">
              <Shot src={src} alt={alt} w={w} h={h} pos={pos} />
              <h3 className="rc-tile-title">{title}</h3>
              <p className="rc-body">{text}</p>
            </Tile>
          ))}
          <Tile span="rc-c12 rc-full-md" tone="yellow" contours className="rc-tile--row">
            <div className="rc-app-id">
              <AppIcon size={72} appearance="dark" className="rc-app-icon" title="" />
              <div>
                <h3 className="rc-tile-title">Get the RoboCore IDE</h3>
                <ul className="rc-platforms" aria-label="For macOS, Windows and Linux, or in Chrome and Edge">
                  {PLATFORMS.map(([Icon, name]) => (
                    <li key={name}>
                      <Icon aria-hidden="true" /> {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link className="rc-btn rc-btn-primary rc-btn-large" to="/robocore/download">
              <LuDownload aria-hidden="true" /> Download
            </Link>
          </Tile>
        </div>
      </div>
    </section>
  </>
);

export default RoboCoreIde;
