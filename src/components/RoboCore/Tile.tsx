import React from 'react';

/**
 * One cell of a bento grid. `span` sets its size on wide screens, for example 'rc-c7 rc-r2' (7 of 12 columns,
 * 2 rows); 'rc-full-md' makes it full width on tablets. Narrow screens stack every tile.
 */
const Tile: React.FC<{
  span?: string;
  tone?: 'yellow' | 'navy' | 'soft';
  contours?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ span = '', tone, contours, className = '', children }) => (
  <div className={['rc-tile', tone ? `rc-tile--${tone}` : '', span, className].filter(Boolean).join(' ')}>
    {contours && <div className="rc-contours" aria-hidden="true" />}
    {children}
  </div>
);

export default Tile;
