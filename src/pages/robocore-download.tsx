import React, { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaApple, FaLinux, FaWindows } from 'react-icons/fa';
import { LuBot, LuDownload, LuLaptop, LuUsb } from 'react-icons/lu';
import { SiGooglechrome, SiMicrosoftedge } from 'react-icons/si';
import { SEOConfig } from '../components/SEO';
import AppIcon from '../components/RoboCore/AppIcon';
import Tile from '../components/RoboCore/Tile';
import { DOWNLOADS, IDE_VERSION, Platform, WEB_IDE, detectPlatform, scrollToSection } from '../components/RoboCore/shared';
import { asset } from '../utils/asset';

const ICONS: Record<Platform, IconType> = { mac: FaApple, windows: FaWindows, linux: FaLinux };
const ORDER: Platform[] = ['mac', 'windows', 'linux'];

/**
 * /robocore/download: the RoboCore IDE for Mac, Windows and Linux. The visitor's own computer comes first; phones and
 * tablets are asked to come back on a computer. The files and links are DOWNLOADS in shared.ts.
 */
const RoboCoreDownload: React.FC = () => {
  // Read after the first render, so the prerendered page (no browser) and the first paint agree.
  const [mine, setMine] = useState<Platform | null>(null);
  useEffect(() => setMine(detectPlatform()), []);
  const primary = mine ? DOWNLOADS[mine] : null;
  const PrimaryIcon = mine ? ICONS[mine] : LuDownload;

  return (
    <>
      <SEOConfig
        title="Download the RoboCore IDE for Mac, Windows and Linux | RoboCore"
        description="Download the RoboCore IDE: blocks and Arduino C++ for the RoboCore robot, on Mac, Windows and Linux."
        image="/resources/social/og-robocore-ide.jpg"
      />

      {/* ---------- hero ---------- */}
      <section className="rc-hero" aria-labelledby="rc-dl-title">
        <div className="rc-wrap">
          <div className="rc-hero-card rc-dl-hero">
            <div className="rc-contours" aria-hidden="true" />
            <div className="rc-hero-text">
              <div className="rc-app-id">
                <AppIcon size={64} appearance="dark" className="rc-app-icon" title="" />
                <p className="rc-eyebrow rc-dl-eyebrow">RoboCore IDE · version {IDE_VERSION}</p>
              </div>
              <h1 id="rc-dl-title" className="rc-display rc-dl-title">
                Download the RoboCore IDE
              </h1>
              <p className="rc-lead">Blocks and Arduino C++ on your own computer, for Mac, Windows and Linux.</p>
              {primary ? (
                <>
                  <div className="rc-hero-actions">
                    <a className="rc-btn rc-btn-primary rc-btn-large" href={primary.url}>
                      <PrimaryIcon aria-hidden="true" /> {primary.label ?? `Download for ${primary.name}`}
                    </a>
                    {primary.altUrl && (
                      <a className="rc-btn rc-btn-outline rc-btn-large" href={primary.altUrl}>
                        <LuDownload aria-hidden="true" /> {primary.altLabel ?? primary.altFile}
                      </a>
                    )}
                    <a
                      className="rc-btn rc-btn-outline rc-btn-large"
                      href="#platforms"
                      onClick={(e) => {
                        if (scrollToSection('platforms')) e.preventDefault();
                      }}
                    >
                      Other systems
                    </a>
                  </div>
                  <p className="rc-dl-meta">
                    {primary.altFile ? `${primary.file} · ${primary.altFile}` : primary.file} · {primary.needs}
                  </p>
                </>
              ) : (
                <p className="rc-dl-note">
                  <LuLaptop aria-hidden="true" /> The RoboCore IDE runs on computers. Open this page on a Mac, Windows or Linux
                  computer to download it.
                </p>
              )}
            </div>
            <div className="rc-dl-shot">
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
            </div>
          </div>
        </div>
      </section>

      {/* ---------- every system ---------- */}
      <section id="platforms" className="rc-section rc-section--bento" aria-labelledby="rc-platforms">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">Every system</p>
            <h2 id="rc-platforms" className="rc-h2">
              Pick your computer
            </h2>
          </div>
          <div className="rc-bento">
            {ORDER.map((p, i) => {
              const d = DOWNLOADS[p];
              const Icon = ICONS[p];
              const isMine = p === mine;
              return (
                <Tile
                  key={p}
                  span={i === 2 ? 'rc-c4 rc-full-md' : 'rc-c4'}
                  tone={isMine ? 'yellow' : undefined}
                  className="rc-platform"
                >
                  <div className="rc-platform-head">
                    <Icon className="rc-platform-icon" aria-hidden="true" />
                    {isMine && <span className="rc-chip">Your computer</span>}
                  </div>
                  <h3 className="rc-tile-title">{d.name}</h3>
                  <p className="rc-body">{d.needs}</p>
                  <ol className="rc-platform-steps">
                    {d.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <p className="rc-dl-file">{d.altFile ? `${d.file} · ${d.altFile}` : d.file}</p>
                  <a className={`rc-btn ${isMine ? 'rc-btn-primary' : 'rc-btn-outline'} rc-tile-cta rc-platform-cta`} href={d.url}>
                    <LuDownload aria-hidden="true" /> {d.label ?? `Download for ${d.name}`}
                  </a>
                  {d.altUrl && (
                    <a className="rc-btn rc-btn-outline rc-platform-cta" href={d.altUrl}>
                      <LuDownload aria-hidden="true" /> {d.altLabel ?? d.altFile}
                    </a>
                  )}
                </Tile>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- then ---------- */}
      <section className="rc-section rc-section--bento" style={{ paddingTop: 0 }} aria-labelledby="rc-next">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">Then</p>
            <h2 id="rc-next" className="rc-h2">
              Ready to code
            </h2>
          </div>
          <div className="rc-bento">
            <Tile span="rc-c4">
              <LuUsb className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">Connect the robot</h3>
              <p className="rc-body">Plug RoboCore V2 into your computer with a USB-C cable, then press Upload in the IDE.</p>
            </Tile>
            <Tile span="rc-c4">
              <LuBot className="rc-tile-icon" aria-hidden="true" />
              <h3 className="rc-tile-title">No robot yet?</h3>
              <p className="rc-body">
                Try your programs on the preview board: it simulates the motors, servo, sonar, line sensor, tilt and battery.
              </p>
            </Tile>
            <Tile span="rc-c4 rc-full-md" tone="navy">
              <p className="rc-marks" aria-label="Chrome and Edge">
                <SiGooglechrome aria-hidden="true" />
                <SiMicrosoftedge aria-hidden="true" />
              </p>
              <h3 className="rc-tile-title">In the browser</h3>
              <p className="rc-body">On a computer with Chrome or Edge, you can also use the IDE without installing anything.</p>
              <a className="rc-link rc-tile-cta" href={WEB_IDE} target="_blank" rel="noopener noreferrer">
                Open the IDE in your browser
              </a>
            </Tile>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoboCoreDownload;
