import React from 'react';

/**
 * The yellow opening card of a RoboCore subpage (IDE, Hardware, Vision): words on the left, a picture on the right
 * (below on phones). The page's h1 is `title`; `icon` sits beside the eyebrow, as an app's icon sits beside its name.
 */
const SubHero: React.FC<{
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  art: React.ReactNode;
}> = ({ id, eyebrow, title, lead, icon, actions, art }) => (
  <section className="rc-hero" aria-labelledby={id}>
    <div className="rc-wrap">
      <div className="rc-hero-card rc-sub-hero">
        <div className="rc-contours" aria-hidden="true" />
        <div className="rc-hero-text">
          {icon ? (
            <div className="rc-app-id">
              {icon}
              <p className="rc-eyebrow rc-sub-eyebrow">{eyebrow}</p>
            </div>
          ) : (
            <p className="rc-eyebrow rc-sub-eyebrow">{eyebrow}</p>
          )}
          <h1 id={id} className="rc-display rc-sub-title">
            {title}
          </h1>
          <p className="rc-lead">{lead}</p>
          {actions && <div className="rc-hero-actions">{actions}</div>}
        </div>
        <div className="rc-sub-art">{art}</div>
      </div>
    </div>
  </section>
);

export default SubHero;
