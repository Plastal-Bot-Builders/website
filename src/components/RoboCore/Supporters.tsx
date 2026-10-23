import React from 'react';
import { asset } from '../../utils/asset';
import Tile from './Tile';

/** [name, logos: file, alt, width, height] — the supporters' own logos, in their own colours, on white plates. */
const SUPPORTERS: [string, [string, string, number, number][]][] = [
  [
    'Mukuba UniPod (UNDP)',
    [
      ['logo-unipod', 'Mukuba UniPod', 388, 120],
      ['logo-undp', 'UNDP', 99, 200],
    ],
  ],
  ['Copperbelt University', [['logo-cbu', 'Copperbelt University crest', 163, 200]]],
];

/** The "Supported by" row, shared by the overview and the vision page. */
const Supporters: React.FC = () => (
  <Tile span="rc-c12 rc-full-md" tone="soft" className="rc-tile--row">
    <p className="rc-eyebrow">Supported by</p>
    <ul className="rc-supporters">
      {SUPPORTERS.map(([name, logos]) => (
        <li key={name}>
          <span className="rc-logo-plate">
            {logos.map(([file, alt, w, h]) => (
              <img key={file} src={asset(`resources/RoboCore/${file}.webp`)} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
            ))}
          </span>
          {name}
        </li>
      ))}
    </ul>
  </Tile>
);

export default Supporters;
