# RoboCore section (`/robocore`)

RoboCore's own site inside the Plastal-Bot Builders site: `www.plastalbotbuilders.com/robocore`. It stands alone: its
own header and footer, the product's own look (the RoboCore V2 box: navy, RoboCore yellow, cream, contour lines, Barlow),
no Plastal-Bot chat bubble. The Plastal-Bot site links in (its menu and the Projects page), but RoboCore pages don't
link back; Plastal-Bot Builders appears only as the maker. Light mode is the cream paper; dark mode is the RoboCore
IDE's Navy theme.

**Adding a page:** make it in `src/pages/` (like `robocore.tsx`, without a header or footer), add it as a child route
of `/robocore` in `src/App.tsx` (for example `<Route path="kit" element={<RoboCoreKit />} />` for `/robocore/kit`), add
a link to `NAV` in `RoboCoreLayout.tsx`, and add the route to `scripts/seo/site-manifest.js`.

**Layout:** sections are bento grids (`rc-bento`) of `Tile`s (in `robocore.tsx`): `span` sets a tile's size on wide
screens (`rc-c3` … `rc-c12` of 12 columns, `rc-r2` for two rows), `rc-full-md` makes it full width on tablets (two
columns), and phones stack every tile. Tones: paper (default), `yellow`, `navy`, `soft`. The grid packs densely, so
check new tiles at 1440, 800 and 390 px for gaps.

| File | What it is |
|---|---|
| `src/components/RoboCore/RoboCoreLayout.tsx` | The frame: RoboCore header (links, light/dark, Get involved) and footer. |
| `src/pages/robocore.tsx` | The overview (index of `/robocore`). Its copy is the RoboCore print copy (see below). |
| `src/pages/robocore-ide.tsx` | `/robocore/ide`: the IDE's features, Cog, and the other boards it programs (Arduino Uno, ESP32). |
| `src/pages/robocore-hardware.tsx` | `/robocore/hardware`: the V2 controller board's specifications, the robot, battery estimates. |
| `src/pages/robocore-vision.tsx` | `/robocore/vision`: why RoboCore, what the team has done (photos), what it hopes to achieve. |
| `src/pages/robocore-download.tsx` | `/robocore/download`: the IDE for Mac, Windows and Linux; the visitor's system first. |
| `src/components/RoboCore/Tile.tsx` | One bento tile, used by every RoboCore page. |
| `src/components/RoboCore/SubHero.tsx` | The yellow opening card of a subpage (IDE, Hardware, Vision). |
| `src/components/RoboCore/AppIcon.tsx` | The RoboCore IDE's app icon (Geared Ring), wherever the IDE is offered. |
| `src/components/RoboCore/Gallery.tsx` | Pictures and the pitch video with thumbnails (overview, "See it"). |
| `src/components/RoboCore/Supporters.tsx` | The "Supported by" row with the supporters' logos (overview and vision). |
| `src/components/RoboCore/shared.ts` | Contact details, the maker line, and scrolling to a section. |
| `src/components/RoboCore/robocore.css` | All its styles, scoped to `.rc`; the Barlow `@font-face` rules. |
| `src/components/RoboCore/RobotViewer.tsx` | The 3D robot in the hero (three.js, loaded only when needed). |
| `src/components/RoboCore/RoboCoreLogo.tsx` | The RoboCore lockup in `currentColor`. |
| `src/components/RoboCore/contours.svg` | Contour lines of the real Copperbelt terrain (Copernicus GLO-30 DEM; the same as the event branding, made by RoboCore_Event_Branding/topo/copperbelt_contours.py), used as a CSS mask. |
| `src/components/RoboCore/fonts/` | Barlow and Barlow Condensed (woff2), SIL Open Font License (`OFL.txt`). |
| `public/resources/RoboCore/` | Images and the 3D model (let through by `.gitignore`). |
| `public/resources/social/og-robocore.jpg` | Social share card, 1200 × 630. |
| `public/resources/social/og-robocore-ide.jpg` | The IDE and download pages' share card, with the app icon. |
| `scripts/seo/site-manifest.js` (`/robocore`) | Title, description, crawlable content, FAQ and sitemap entry. |

## Downloads

`DOWNLOADS` in `shared.ts` sets each system's file, link, requirements and setup steps. The links point at the GitHub
release of `Plastal-Bot-Builders/robocore-ide` for `IDE_VERSION`
(`https://github.com/Plastal-Bot-Builders/robocore-ide/releases/download/v<IDE_VERSION>/<file>`). The robocore-ide CI
attaches these files when a version tag is pushed (the `windows` and `release-assets` jobs in `build.yml`):

| System | File on the release |
|---|---|
| macOS, Apple silicon | `RoboCore-<version>-mac-apple-silicon.dmg` (with the compilers, works offline) |
| macOS, Intel | `RoboCore-<version>-mac-intel.dmg` |
| Windows | `RoboCore-Setup-<version>.exe` (installer) |
| Linux (Fedora / RPM) | `RoboCore-<version>-linux-x64.rpm` |
| Linux (bundle) | `RoboCore-<version>-linux-x64.tar.gz` |

The names carry the version, so after a new IDE release raise `IDE_VERSION` here to the release's version (its
`pubspec.yaml`), check the links, and deploy. `WEB_IDE` is the IDE the repository publishes to GitHub Pages.

## Copy

The words come from the RoboCore print pieces (`COPY` in `RoboCore_Event_Branding/figma-plugin/src/02_parts.js`), so
the stand, the flyer and the website say the same thing. The rules:

- "Made in Zambia" (updated at the product owner’s request).
- RoboCore V2 is a prototype; pilots with schools and innovation hubs come next. No dates, prices or sales until
  they are real.
- Impact line: "Our team has been part of initiatives that have reached more than 8,000 young people in Zambia."
- Anything not done yet is in the future tense ("we will", "we hope to"); making RoboCore in Zambia, boards included,
  is a goal. The battery times on the hardware page are estimates until they are measured on the prototype.

## Where the assets come from

- **Robot renders** (`robot-hero`, `robot-iso-fr`, `robot-front`, `robot-left`, `robot-top`, `kit-printed`,
  `kit-battery`, `kit-wheel`, `kit-vwheel`, `kit-box-open`, and the frame drawing `chassis`): the V3 robot (Stage 18
  V-wheel version, lift level), made in `~/RoboCoreProjects/RoboCore_V3_Renders` (read-only Fusion export, Blender
  Cycles studio set-up of the event renders, Freestyle line drawings); `tools/publish_assets.py --site <worktree> site`
  writes them here at these sizes. The other line drawings (`controller-board`, `sonar`, `line-sensor`) are from
  `RoboCore_Event_Branding/assets/`.
- **IDE screenshots** (`ide-blocks`, `ide-code`, `ide-boards`, `ide-cog`): the RoboCore IDE in Chrome at 1440 × 900,
  2×, with the "Robot obstacle avoider" example; saved at 1600 px wide (Cog's panel at 560).
- **App icon** (`AppIcon.tsx`): the Geared Ring paths from the robocore-ide repository (`assets/images/app_icon.svg`
  and `app_mark.svg`, made by `tools/gen_app_icons.py`); 32 px and smaller use the small glyph. On yellow it takes the
  app's Dark appearance (navy plate, yellow ink). If the icon changes, copy the new paths in.
- **Controller board** (`robocore-controller-*`): the studio renders of the V2 controller (Blender, from the KiCad
  model), shared by every RoboCore project in `~/RoboCoreProjects/RoboCore/hardware/controller_v2/renders/` (its README
  lists the shots and the part-position files). Use the `web/` copies; don't edit them, ask the PCB chat for new shots.
  The `robocore-controller-crop-*` close-ups are cut from `full/robocore-controller-top.png` (40 px per mm) at the boxes in
  `robocore-controller-top-parts.json`.
- **Board** (`board-v1`): KiCad 3D render on a transparent background.
- **Lift motion** (`robot-arm-motion`): three side views from one camera (lift at -44, 0 and +40 degrees), the level
  carrying pose solid and the floor and up poses at 36 % (`RoboCore_V3_Renders/tools/arm_motion.py`, which also writes
  the head positions). The arrow and labels are drawn in the page (`ArmMotion` in `robocore-hardware.tsx`) on the
  circle the gripper head travels.
- **Kit parts** (`kit-*`): `kit-motor`, `kit-servo` and `kit-ultrasonic` are the V2 single-part renders (same bought
  parts; the motor's CAD red rendered as dark plastic); `kit-printed`, `kit-battery`, `kit-wheel` and `kit-vwheel` are
  V3 renders (see Robot renders; `ONLY`/`ONLY_MAT` in `render_v3.py` keep one part). The line sensor is the existing
  drawing: the kit uses a bought-in module, not the RoboCore line-sensor board in the model.
- **Pitch video** (`pitch-video-poster`): the YouTube thumbnail of the MIT Solve pitch (Fred's channel, `_jnTEealU_8`). The
  gallery loads `youtube-nocookie.com` only on play; `public/_headers` allows that frame (`frame-src`) and lets it autoplay
  and use encrypted media (Permissions-Policy).
- **Downloads** (`downloads/`): `RoboCore-V2-pinout.pdf` is pages 1–2 of `RoboCore_V2/docs/posters/RoboCore_posters_A4.pdf`
  (board overview; connectors, expansion headers and GPIO map). `RoboCore-Arduino-library.zip` is `firmware/RoboCore` from
  the robocore-ide repository (`git archive`, with its 16 examples). Rebuild both when the sources change.
- **IDE features** (`ide-feat-*`): crops of the RoboCore IDE (the app built from the Figma design, file
  `P7i2WBM8G96B2fTPHpp8yi`), captured from the web build at 1440 × 1000, 2×, with the Blink LED project; a few are
  composites of two parts of the same screen (`verify`, `explain`, `cog-blocks`) or of the two themes (`themes`).
- **Makers' marks**: `react-icons/si` (Arduino, Espressif, Adafruit, VS Code, Chrome, Edge, STMicroelectronics,
  SparkFun, Bluetooth), shown in the ink colour, and only where the product named is that maker's own.
- **Logos** (`logo-unipod`, `logo-undp`, `logo-cbu`, `logo-ai-for-good`): the organisations' own logos in their own
  colours, on white plates (`Supporters.tsx`).
- **Photos** (`vision-*`): from the site's own albums (`public/resources/Geneva2026`, `IntroRoboticsWorkshop`,
  `SpikePrime` and others), cropped and saved as WebP. Captions follow the news items in `src/pages/news.tsx`.
- **3D model** (`robocore-v3.glb`, 0.95 MB): `RoboCore_V3_Renders/renders/robocore_v3_full.glb` (24 MB, from
  `tools/export_glb.py`, lift level, KiCad board) through `scripts/robocore/glb_web.py` in Blender. It drops parts that
  touch nothing, merges same-colour materials, decimates the big parts to about 220k triangles in all, joins everything
  into one mesh and compresses it with Draco (the decoder is in `public/draco/`). Phones get the same model.
- **Share card** (`og-robocore.jpg`, 1200 × 630, about 130 KB, the image a shared link shows): "Build a robot. Code it in
  your browser." with the V3 hero render and a real block program (the "Robot obstacle avoider" example's forever stack,
  captured from the IDE) on the box yellow (source: `RoboCore_V3_Renders/cards/share.html`). Drawn in HTML with the real fonts, logo and contour lines and captured with
  headless Chrome. Its alt text is `imageAlt` in the manifest. Keep the headline readable at about 480 px wide (a
  phone feed).
- **Project tile** (`robocore-card.webp`): the hero render on the box yellow with the contour lines, made the same way
  (`RoboCore_V3_Renders/cards/tile.html`).
- **Plastal-Bot logo in navy** (`plastal-bot-builders-navy.svg`): `RoboCore_Event_Branding/assets/plastal_logo.svg`
  with its ink set to the RoboCore navy, for the yellow backgrounds.
