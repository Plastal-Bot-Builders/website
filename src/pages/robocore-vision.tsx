import React from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  LuArrowRight,
  LuBookOpen,
  LuFactory,
  LuRepeat,
  LuSchool,
  LuStars,
  LuUsers,
} from 'react-icons/lu';
import { SEOConfig } from '../components/SEO';
import SubHero from '../components/RoboCore/SubHero';
import Tile from '../components/RoboCore/Tile';
import { CONTACT } from '../components/RoboCore/shared';
import { asset } from '../utils/asset';

/*
 * /robocore/vision: why RoboCore exists, what the team has done, and what it hopes to do. Wording follows the MIT Solve
 * application (theory of change) and the site's own news items. Everything not done yet is in the future tense, and
 * RoboCore is "designed in Zambia": making it here is a goal.
 */

type Photo = { src: string; w: number; h: number; alt: string; caption: string; span: string };

const DONE: Photo[] = [
  {
    src: 'vision-workshop-coding.webp',
    w: 1200,
    h: 900,
    alt: 'A learner builds a circuit on a breadboard next to a laptop',
    caption: 'Introduction to Robotics and Programming Workshop, 2024: electronics, Tinkercad simulation and Arduino',
    span: 'rc-c4',
  },
  {
    src: 'vision-workshop-group.webp',
    w: 1200,
    h: 900,
    alt: 'Young learners stand together in front of a screen at the workshop',
    caption: 'Learners as young as six built and programmed their first robots',
    span: 'rc-c4',
  },
  {
    src: 'vision-bootcamp-2.webp',
    w: 1200,
    h: 800,
    alt: 'Learners gather around a LEGO robot on a table',
    caption: 'Spike Prime Robotics Bootcamp, 2025: six weeks with the CBU Robotics Club',
    span: 'rc-c4 rc-full-md',
  },
];

const MORE: Photo[] = [
  {
    src: 'vision-bootcamp-1.webp',
    w: 1200,
    h: 800,
    alt: 'A mentor points something out to a learner at the bootcamp',
    caption: 'Mentoring at the bootcamp',
    span: 'rc-c4',
  },
  {
    src: 'vision-geneva-prep.webp',
    w: 1080,
    h: 810,
    alt: 'Team members build a LEGO competition robot at a table',
    caption: 'Getting ready for Geneva, June 2026',
    span: 'rc-c4',
  },
  {
    src: 'vision-learners.webp',
    w: 1000,
    h: 750,
    alt: 'A large group of school learners in uniform stand outside under trees',
    caption: 'With learners at a school visit',
    span: 'rc-c4 rc-full-md',
  },
];

const GOALS: [IconType, string, string][] = [
  [
    LuSchool,
    'Pilots in schools and hubs',
    'Try RoboCore with schools and innovation hubs in Zambia, and measure learners’ skills and attitudes before and after, alongside learners who study the same topics without it.',
  ],
  [
    LuFactory,
    'Make it in Zambia',
    'Print the bodies and assemble and package the kits here, and in time make the boards here too.',
  ],
  [LuBookOpen, 'Lessons for teachers', 'Lessons and teacher training that fit the curriculum, so any teacher can run a RoboCore class.'],
  [LuRepeat, 'One kit, many classes', 'A kit the school owns serves class after class, year after year.'],
  [LuStars, 'Makers, not only users', 'Show young Zambians that they can design and build technology, not only use it.'],
];
const GOAL_SPANS = ['rc-c8', 'rc-c4', 'rc-c4', 'rc-c6', 'rc-c6 rc-full-md'];

const PhotoTile: React.FC<{ photo: Photo }> = ({ photo: { src, w, h, alt, caption, span } }) => (
  <Tile span={span} className="rc-tile--photo">
    <figure>
      <img src={asset(`resources/RoboCore/${src}`)} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  </Tile>
);

const RoboCoreVision: React.FC = () => (
  <>
    <SEOConfig
      title="Our vision: young Zambians who build technology | RoboCore"
      description="Why we are building RoboCore, what Plastal-Bot Builders has done so far, and what we hope to achieve: pilots in Zambian schools, kits assembled in Zambia, and 5,000 young people reached."
      image="/resources/social/og-robocore.jpg"
    />

    <SubHero
      id="rc-vision-title"
      eyebrow="Our vision"
      title="Young Zambians who build technology"
      lead="When students build and program real machines, they learn science and engineering more deeply. When the tools are affordable and made for their classrooms, far more schools can offer that."
      actions={
        <a className="rc-btn rc-btn-primary rc-btn-large" href={`mailto:${CONTACT}?subject=RoboCore`}>
          Work with us <LuArrowRight aria-hidden="true" />
        </a>
      }
      art={
        <figure className="rc-sub-photo">
          <img
            src={asset('resources/RoboCore/vision-group-project.webp')}
            alt="School learners in maroon uniforms work together on an electronics project at a desk"
            width={1200}
            height={900}
            decoding="async"
          />
        </figure>
      }
    />

    {/* ---------- why ---------- */}
    <section id="why" className="rc-section rc-section--bento" aria-labelledby="rc-vision-why">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">Why it matters</p>
          <h2 id="rc-vision-why" className="rc-h2">
            Engineering from a textbook
          </h2>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c6 rc-r2 rc-full-md" className="rc-tile--intro">
            <p className="rc-lead">
              Most students in Zambia learn engineering only from textbooks. In our workshops, many learners handle real
              electronics for the first time.
            </p>
            <p className="rc-body">
              Hands-on kits that make these subjects concrete are out of reach for most schools, so many students finish school
              without ever building, wiring or programming anything, even as automation and AI change the jobs they will
              compete for.
            </p>
          </Tile>
          <Tile span="rc-c6" tone="yellow">
            <p className="rc-stat">US$400</p>
            <p className="rc-tile-text">for one LEGO Education SPIKE Prime set, before shipping and import duties.</p>
          </Tile>
          <Tile span="rc-c6" tone="navy">
            <p className="rc-stat">30%</p>
            <p className="rc-tile-text">UNESCO projects that aid to education will fall by 30% between 2023 and 2027.</p>
          </Tile>
        </div>
        <p className="rc-note">Sources: LEGO Education SPIKE Prime, US list price US$399.95; UNESCO.</p>
      </div>
    </section>

    {/* ---------- what we've done ---------- */}
    <section id="done" className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-vision-done">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">So far</p>
          <h2 id="rc-vision-done" className="rc-h2">
            What we’ve done
          </h2>
          <p className="rc-lead">Workshops, bootcamps and competitions taught us what learners need. RoboCore grew out of them.</p>
        </div>
        <div className="rc-bento">
          <PhotoTile
            photo={{
              src: 'vision-geneva-flag.webp',
              w: 1200,
              h: 800,
              alt: 'The Plastal-Bot Builders team in green and black tracksuits holds the Zambian flag',
              caption: 'Finalists at the AI for Good Global Summit, Geneva, July 2026',
              span: 'rc-c8 rc-r2 rc-full-md',
            }}
          />
          <Tile span="rc-c4" tone="yellow" contours>
            <p className="rc-stat">8,000+</p>
            <p className="rc-tile-text">
              Our team has been part of initiatives that have reached more than 8,000 young people in Zambia.
            </p>
          </Tile>
          <Tile span="rc-c4" tone="navy">
            <p className="rc-eyebrow">April 2026</p>
            <p className="rc-tile-text">Winners of the AI for Good National Edition (Zambia), which took the team to Geneva.</p>
          </Tile>
          {DONE.map((p) => (
            <PhotoTile key={p.src} photo={p} />
          ))}
          <PhotoTile
            photo={{
              src: 'vision-gypul.webp',
              w: 1200,
              h: 900,
              alt: 'Gypul, a self-balancing robot with a 3D-printed frame, on a workbench',
              caption: 'Gypul, our first robot (RoboCore V1), built by hand with 3D-printed parts',
              span: 'rc-c6',
            }}
          />
          <Tile span="rc-c6" tone="soft">
            <div className="rc-tile-art">
              <img
                src={asset('resources/RoboCore/board-v2-top.webp')}
                alt="The RoboCore V2 controller board"
                width={1200}
                height={891}
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="rc-tile-title">RoboCore V2</h3>
            <p className="rc-body">A new controller board, a robot with an arm and sensors, and the RoboCore IDE, designed in Zambia.</p>
            <p className="rc-tile-links">
              <Link className="rc-link" to="/robocore/hardware">
                The hardware
              </Link>
              <Link className="rc-link" to="/robocore/ide">
                The IDE
              </Link>
            </p>
          </Tile>
          {MORE.map((p) => (
            <PhotoTile key={p.src} photo={p} />
          ))}
        </div>
      </div>
    </section>

    {/* ---------- what we hope to achieve ---------- */}
    <section id="next" className="rc-section rc-band" aria-labelledby="rc-vision-next">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">What we hope to achieve</p>
          <h2 id="rc-vision-next" className="rc-h2">
            From a prototype to classrooms
          </h2>
          <p className="rc-lead">
            RoboCore V2 is our newest prototype. Once we have tested and improved it, this is where we want to take it.
          </p>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c4 rc-r2" tone="yellow" contours>
            <LuUsers className="rc-tile-icon" aria-hidden="true" />
            <p className="rc-stat">5,000</p>
            <p className="rc-tile-text">young people reached with RoboCore in the next three to five years.</p>
          </Tile>
          {GOALS.map(([Icon, title, text], i) => (
            // Beside the 5,000: one wide and two narrow tiles; then two halves, the last one full width on tablets.
            <Tile key={title} span={GOAL_SPANS[i]}>
              <Icon className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">{title}</h3>
              <p className="rc-body">{text}</p>
            </Tile>
          ))}
        </div>
      </div>
    </section>

    {/* ---------- supporters and contact ---------- */}
    <section className="rc-section rc-section--bento" aria-labelledby="rc-vision-with">
      <div className="rc-wrap">
        <div className="rc-section-head">
          <p className="rc-eyebrow">With us</p>
          <h2 id="rc-vision-with" className="rc-h2">
            Help us get there
          </h2>
        </div>
        <div className="rc-bento">
          <Tile span="rc-c12 rc-full-md" tone="soft" className="rc-tile--row">
            <p className="rc-eyebrow">Supported by</p>
            <ul className="rc-supporters">
              <li>Mukuba UniPod (UNDP)</li>
              <li>Copperbelt University</li>
            </ul>
          </Tile>
          <Tile span="rc-c6 rc-full-md" tone="yellow" contours>
            <LuSchool className="rc-tile-icon" aria-hidden="true" />
            <h3 className="rc-tile-title">Schools and innovation hubs</h3>
            <p className="rc-tile-text">Would you like to try RoboCore with your learners? Tell us about your school or hub.</p>
            <a className="rc-btn rc-btn-primary rc-tile-cta" href={`mailto:${CONTACT}?subject=RoboCore%20pilot`}>
              Email us <LuArrowRight aria-hidden="true" />
            </a>
          </Tile>
          <Tile span="rc-c6 rc-full-md">
            <LuUsers className="rc-tile-icon" aria-hidden="true" />
            <h3 className="rc-tile-title">Partners and sponsors</h3>
            <p className="rc-body">Help us build and test the first RoboCore kits, and bring them to more schools.</p>
            <a className="rc-link rc-tile-cta" href={`mailto:${CONTACT}?subject=RoboCore%20partnership`}>
              Talk to us about partnering
            </a>
          </Tile>
        </div>
      </div>
    </section>
  </>
);

export default RoboCoreVision;
