import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOConfig } from '../components/SEO';
import SmartImage from '../components/ui/SmartImage';
import AutoLoopVideo from '../components/ui/AutoLoopVideo';
import ThemedImage from '../theme/ThemedImage';
import { StepFlow } from '../components/ui/SectionMedia';
import { FaGithub } from 'react-icons/fa';

/**
 * Research & Development: how Plastal-Bot builds robots, and the current research project, RoboCore AI (a wheel-leg
 * robot on the RoboCore V2 controller that learned to balance in simulation).
 *
 * Every figure here comes from the RoboCoreAI repository's own docs (README, wheel_leg/rl/README.md, docs/results.md).
 * Keep the status honest: the learned controller has only run in simulation so far. When it runs on the real robot,
 * update the status line and the "What's next" list, not before. Media: public/resources/Research/web/ (converted
 * from the repo's wheel_leg/rl/media/; GIFs became MP4 loops with -poster.jpg stills for AutoLoopVideo).
 */

const REPO = 'https://github.com/Plastal-Bot-Builders/RoboCoreAI';
const M = 'resources/Research/web';

const stats = [
  { value: '100', unit: 'decisions a second', note: 'from the robot’s own sensors' },
  { value: '52 kB', unit: 'learned controller', note: 'about 10,000 calculations per decision: small enough for the ESP32-S3' },
  { value: '111 h', unit: 'of practice', note: 'simulated in 58 minutes on a laptop' },
  { value: 'Up to 4×', unit: 'more accurate speed', note: 'than the reference controller, on 20 varied robots' },
];

const clips = [
  { base: `${M}/rcai-push`, label: 'The robot takes a push from the side, rolls with it and recovers', title: 'Shrugs off a push', text: 'A 2 N shove for a tenth of a second.' },
  { base: `${M}/rcai-turn`, label: 'The robot drives in a circle while balancing, leaving a trail', title: 'Drives and turns', text: '0.3 m/s while turning at 2 rad/s.' },
  { base: `${M}/rcai-height`, label: 'The robot raises and lowers its body on its legs while balancing', title: 'Changes its height', text: 'Legs from −38° to +38°, still balancing.' },
];

const Research: React.FC = () => (
  <>
    <SEOConfig
      title="Research & Development | Plastal-Bot Builders"
      description="How Plastal-Bot Builders designs, simulates and tests its robots in Zambia, and RoboCore AI: a robot on the RoboCore V2 controller that taught itself to balance."
      image={`/${M}/rcai-anatomy.jpg`}
    />
    <section className="scroll-smooth focus:scroll-auto">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16 lg:space-y-24">
        {/* Hero */}
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="badge-accent mb-4">Research &amp; Development</p>
            <h1 className="type-h1 mb-4">
              Robots we design, <span className="text-hex">test and teach</span> to move
            </h1>
            <p className="type-body mb-4">
              Our robots start as CAD drawings in Lusaka, become physics simulations, and are tested hundreds of times before a
              part is printed. The work feeds straight back into RoboCore, the robot kit and coding app we are building for
              Zambian classrooms.
            </p>
            <p className="type-body opacity-90">
              Our current research project is <strong>RoboCore AI</strong>: a two-wheeled robot on the RoboCore V2 controller
              that taught itself to balance, drive and turn using machine learning.
            </p>
          </div>
          <AutoLoopVideo
            base={`${M}/rcai-hero`}
            label="The RoboCore AI wheel-leg robot balancing, driving, turning and lowering its body under its learned controller, in simulation"
            className="w-full rounded-xl interactive-card overflow-hidden"
          />
        </header>

        {/* How we build */}
        <section aria-labelledby="how-we-build">
          <h2 id="how-we-build" className="type-h2 mb-3">
            How we <span className="text-hex">build</span>
          </h2>
          <p className="type-body mb-8 max-w-3xl">
            Real hardware is slow and costly to break, so we do as much as we can in simulation first.
          </p>
          <StepFlow
            steps={[
              { title: 'Design', text: 'The robot is drawn in Fusion 360: frame, motors, servos and the controller board.' },
              { title: 'Simulate', text: 'The CAD becomes a physics model in MuJoCo, with the real motors, servos and sensors.' },
              { title: 'Learn', text: 'A small neural network practises in the simulation and learns how to control the robot.' },
              { title: 'Test', text: 'We test it on 20 robots that differ from the drawing, and compare it with a classic controller.' },
              { tag: 'Next', title: 'Build and run', text: 'The learned controller goes onto the RoboCore V2 board in the real robot.' },
            ]}
          />
        </section>

        {/* RoboCore AI */}
        <section aria-labelledby="robocore-ai" className="space-y-10">
          <div className="max-w-3xl">
            <h2 id="robocore-ai" className="type-h2 mb-3">
              <span className="text-hex">RoboCore AI:</span> a robot that taught itself to balance
            </h2>
            <p className="type-body mb-4">
              A two-wheeled robot with jointed legs practised in a simulation of its own CAD, motors and sensors. It earned
              points for following speed, turn and height commands and for staying up, and lost points for falling or straining
              its motors. Everything it learned fits in a 52 kB file.
            </p>
            <p className="inline-block text-sm px-3 py-2 rounded-md border border-accent">
              <strong>Status:</strong> tested in simulation. The learned controller has not run on the physical robot yet;
              hardware testing is next.
            </p>
          </div>

          {/* Stats */}
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <li key={s.unit} className="interactive-card p-5">
                <p className="text-2xl sm:text-3xl font-bold text-accent">{s.value}</p>
                <p className="font-semibold">{s.unit}</p>
                <p className="text-xs sm:text-sm opacity-80 mt-1">{s.note}</p>
              </li>
            ))}
          </ul>

          {/* What it can do */}
          <div>
            <h3 className="type-h3 mb-4">What it can do</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clips.map(c => (
                <figure key={c.base} className="m-0">
                  <AutoLoopVideo base={c.base} label={c.label} className="w-full rounded-lg interactive-card overflow-hidden" />
                  <figcaption className="mt-3">
                    <span className="font-bold block">{c.title}</span>
                    <span className="text-sm opacity-80">{c.text}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Meet the robot */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <SmartImage
              src={`${M}/rcai-anatomy.jpg`}
              alt="The wheel-leg robot with its parts labelled: RoboCore V2 controller, MG90S hip servo, parallelogram links, DG01D-E gearmotor with encoder, 80 mm wheel"
              className="w-full rounded-xl interactive-card lg:col-span-3"
            />
            <div className="lg:col-span-2">
              <h3 className="type-h3 mb-4">Meet the robot</h3>
              <dl className="space-y-3 text-sm sm:text-base">
                <div><dt className="font-bold inline">Brain: </dt><dd className="inline">the RoboCore V2 controller, an ESP32-S3 with a motion sensor on board</dd></div>
                <div><dt className="font-bold inline">Legs: </dt><dd className="inline">one MG90S servo per leg, driving a parallelogram so the body stays level as it rises and falls</dd></div>
                <div><dt className="font-bold inline">Wheels: </dt><dd className="inline">two DG01D-E gearmotors with encoders, on 80 mm wheels</dd></div>
                <div><dt className="font-bold inline">Weight: </dt><dd className="inline">521 g</dd></div>
              </dl>
              <SmartImage
                src={`${M}/rcai-poses.jpg`}
                alt="Three side views of the robot: legs low, standing and tall"
                className="w-full rounded-lg mt-6"
              />
            </div>
          </div>

          {/* How it learned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <AutoLoopVideo
              base={`${M}/rcai-learning`}
              label="Four snapshots of training: the robot falls at once, then lasts a second, then balances but is knocked over, then recovers from a push and drives off"
              className="w-full rounded-xl interactive-card overflow-hidden"
            />
            <div>
              <h3 className="type-h3 mb-3">Watch it learn</h3>
              <p className="type-body mb-4">
                The same test at four points in training: stand, take a push, then drive off. 24 copies of the robot practised at
                once, so 111 hours of practice took under an hour.
              </p>
              <StepFlow
                vertical
                steps={[
                  { tag: '40 minutes of practice', title: 'Falls straight away' },
                  { tag: '4 hours', title: 'Lasts about a second' },
                  { tag: '6 hours', title: 'Balances, but a push knocks it over' },
                  { tag: '111 hours', title: 'Recovers from the push and drives off' },
                ]}
              />
            </div>
          </div>

          {/* Built for the real world */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="interactive-card p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-hex">Practised on many robots, not one</h3>
              <p className="text-sm sm:text-base opacity-90">
                Every attempt used a slightly different robot: heavier or lighter, stronger or weaker motors, slower servos, a
                slippery or grippy floor, a tilted sensor, and random pushes. A controller that works on all of them has a much
                better chance on the real robot, which never matches the drawing exactly.
              </p>
            </div>
            <div className="interactive-card p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-hex">Sees only what the board can see</h3>
              <p className="text-sm sm:text-base opacity-90">
                It only gets readings the RoboCore controller can actually measure (the motion sensor, the wheel encoders and
                its own last commands), with the same noise and delays as the real board.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="type-h3 mb-3">Tested on 20 different robots</h3>
              <p className="type-body mb-4">
                Each test robot has different masses, motors, servos, friction, delays and sensor errors. The learned controller
                stays up while standing, driving, turning, stopping and changing height, and follows the speed command 1.6 to 4
                times more closely than the reference controller.
              </p>
              <p className="type-body opacity-90">
                Hard pushes are still its weak spot: at 2.5 N it stays up on 25% of the robots, against 80% for the reference
                controller. That is one of the things the next round of training targets.
              </p>
            </div>
            <ThemedImage
              src={`${M}/rcai-chart-survival.jpg`}
              alt="Chart: survival on 20 randomised robots per test. The learned controller and the reference controller both reach 100% on standing, driving, turning, stopping and height changes; the learned controller is behind on pushes of 2 N and more."
              className="w-full rounded-lg"
            />
          </div>

          {/* What's next */}
          <div>
            <h3 className="type-h3 mb-6">What&apos;s next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="interactive-card p-6">
                <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Done</p>
                <p className="text-sm sm:text-base">The training setup, a controller for the current robot, testing against a reference controller, and full documentation.</p>
              </div>
              <div className="interactive-card p-6">
                <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Next in simulation</p>
                <p className="text-sm sm:text-base">Better speed correction, more practice with hard pushes and tall driving, and a gentler touch on the leg servos.</p>
              </div>
              <div className="interactive-card p-6">
                <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Next on hardware</p>
                <p className="text-sm sm:text-base">Measure the real motors, servos and sensors; move the controller onto the board&apos;s firmware; then test it step by step, on a stand before the floor.</p>
              </div>
            </div>
          </div>

          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-button inline-flex items-center gap-2"
          >
            <FaGithub aria-hidden="true" /> Explore the code on GitHub
          </a>
          <p className="text-xs sm:text-sm opacity-75 -mt-6">Open source under the MIT licence. You can run the trained robot from your keyboard.</p>
        </section>

        {/* Our builds so far */}
        <section aria-labelledby="builds">
          <h2 id="builds" className="type-h2 mb-8">
            Our builds <span className="text-hex">so far</span>
          </h2>
          <StepFlow
            steps={[
              { tag: 'RoboCore V1', title: 'Gypul', text: 'Our open-source self-balancing robot: an ESP32, a motion sensor and 3D-printed parts.' },
              { tag: '2026', title: 'Competition robots', text: 'Three robot generations in four months for the AI for Good finals in Geneva.' },
              { tag: 'Prototype', title: 'RoboCore V2', text: 'Our own controller board, a robot kit and the RoboCore IDE, made in Zambia.' },
              { tag: 'Now', title: 'RoboCore AI', text: 'A wheel-leg robot on the V2 board, controlled by a learned neural network.' },
            ]}
          />
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/projects/gypul" className="custom-button">Gypul</Link>
            <Link to="/journey-to-geneva" className="custom-button">The road to Geneva</Link>
            <Link to="/robocore" className="custom-button">RoboCore</Link>
          </div>
        </section>

        {/* Work with us */}
        <section aria-labelledby="work-with-us" className="interactive-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <h2 id="work-with-us" className="type-h2 mb-3">
              Work <span className="text-hex">with us</span>
            </h2>
            <p className="type-body mb-6">
              We welcome universities, researchers and engineers who want to help: testing on real hardware, control and
              machine learning, or mentoring the students who build these robots with us.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/support/technical-support" className="custom-button">Offer technical support</Link>
              <Link to="/support/educational-institutions" className="custom-button">Partner as an institution</Link>
            </div>
          </div>
          <SmartImage
            src={`${M}/rcai-controller.jpg`}
            alt="The RoboCore V2 controller board"
            className="w-full rounded-lg lg:col-span-2"
          />
        </section>
      </div>

      <Footer />
    </section>
  </>
);

export default Research;
