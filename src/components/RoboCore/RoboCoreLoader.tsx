import React from 'react';
import { GEAR_BODY, GEAR_RING, LETTERS, RULES, ZAMBIA } from './RoboCoreLogo';
import './RoboCoreLoader.css';

/*
 * RoboCore's loading screen, in place of the Plastal-Bot site's grid: the RoboCore lockup putting itself together.
 * The gear (the wordmark's second "o") turns in the middle, "Rob" and "Core" slide out of it, then "Zambia" and its
 * rules appear; the gear keeps turning until the page is there. CSS animations only (RoboCoreLoader.css). It covers
 * the whole window, header and footer too: on the way into RoboCore (App.tsx) and between RoboCore pages
 * (RoboCoreLayout). It is up exactly as long as the page's code takes to arrive.
 */

// "Rob" and "Core" are one path in the logo; split its subpaths at the gear (centre x 1344).
const startX = (sub: string) => parseFloat(sub.slice(1));
const SUBPATHS = LETTERS.split(/(?=M)/);
const ROB = SUBPATHS.filter((s) => startX(s) < 1344).join('');
const CORE = SUBPATHS.filter((s) => startX(s) > 1344).join('');
const ZAMBIA_X = 1457; // the middle of "Zambia"

const RoboCoreLoader: React.FC = () => (
  <div className="rc-loader" role="status" aria-live="polite">
    <svg viewBox="0 0 2897 943" className="rc-loader-logo" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* each word shows only beside the gear, so it slides out from behind it */}
        <clipPath id="rc-loader-left">
          <rect x="0" y="0" width="1116" height="943" />
        </clipPath>
        <clipPath id="rc-loader-right">
          <rect x="1574" y="0" width="1323" height="943" />
        </clipPath>
      </defs>
      <g clipPath="url(#rc-loader-left)">
        <path className="rc-loader-rob" d={ROB} />
      </g>
      <g clipPath="url(#rc-loader-right)">
        <path className="rc-loader-core" d={CORE} />
      </g>
      <g className="rc-loader-gear">
        <g className="rc-loader-spin">
          <path d={GEAR_BODY} fillRule="evenodd" />
          <path d={GEAR_RING} fillRule="evenodd" />
        </g>
      </g>
      <path className="rc-loader-zambia" d={ZAMBIA} />
      {/* each rule drawn from its end beside "Zambia" outwards */}
      {RULES.map(([a, y, b, , w]) => {
        const [inner, outer] = Math.abs(a - ZAMBIA_X) < Math.abs(b - ZAMBIA_X) ? [a, b] : [b, a];
        return <line key={a} className="rc-loader-rule" x1={inner} y1={y} x2={outer} y2={y} strokeWidth={w} pathLength={1} />;
      })}
    </svg>
    <span className="sr-only">Loading RoboCore…</span>
  </div>
);

export default RoboCoreLoader;
