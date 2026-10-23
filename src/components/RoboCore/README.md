# RoboCore section (`/robocore`)

RoboCore's page inside the Plastal-Bot Builders site: `www.plastalbotbuilders.com/robocore`. It uses the product's own
look (the RoboCore V2 box: navy, RoboCore yellow, cream, contour lines, Barlow) inside the site's header and footer.
Light mode is the cream paper; dark mode is the RoboCore IDE's Navy theme. More pages can go under `/robocore/…`.

| File | What it is |
|---|---|
| `src/pages/robocore.tsx` | The page. Its copy is the RoboCore print copy (see below). |
| `src/components/RoboCore/robocore.css` | All its styles, scoped to `.rc`; the Barlow `@font-face` rules. |
| `src/components/RoboCore/RobotViewer.tsx` | The 3D robot in the hero (three.js, loaded only when needed). |
| `src/components/RoboCore/RoboCoreLogo.tsx` | The RoboCore lockup in `currentColor`. |
| `src/components/RoboCore/contours.svg` | The box's contour lines, used as a CSS mask. |
| `src/components/RoboCore/fonts/` | Barlow and Barlow Condensed (woff2), SIL Open Font License (`OFL.txt`). |
| `public/resources/RoboCore/` | Images and the 3D model (let through by `.gitignore`). |
| `public/resources/social/og-robocore.jpg` | Social share card, 1200 × 630. |
| `scripts/seo/site-manifest.js` (`/robocore`) | Title, description, crawlable content, FAQ and sitemap entry. |

## Copy

The words come from the RoboCore print pieces (`COPY` in `RoboCore_Event_Branding/figma-plugin/src/02_parts.js`), so
the stand, the flyer and the website say the same thing. The rules:

- "Designed in Zambia", never "made in Zambia".
- RoboCore V2 is a prototype; pilots with schools and innovation hubs come next. No dates, prices or sales until
  they are real.
- Impact line: "Our team has been part of initiatives that have reached more than 8,000 young people in Zambia."

## Where the assets come from

- **Renders** (`robot-hero`, `kit-box-open`, and the line drawings `controller-board`, `chassis`, `sonar`,
  `line-sensor`): `RoboCore_Event_Branding/assets/`, from the Fusion model v36 (see that folder's README), resized and
  saved as WebP (quality 82).
- **IDE screenshots** (`ide-blocks`, `ide-code`): the RoboCore IDE in Chrome at 1440 × 900, 2×, with the
  "Robot obstacle avoider" example; saved at 1600 px wide.
- **3D model** (`robocore-v2.glb`, 0.9 MB): `RoboCore_Event_Branding/3d/robot_v36.glb` (17 MB) through
  `scripts/robocore/glb_web.py` in Blender. It drops parts that touch nothing (the Fusion model has a capacitor floating
  51 mm above the board), merges same-colour materials, decimates the big parts to about 220k triangles in all, joins
  everything into one mesh and compresses it with Draco (the decoder is in `public/draco/`). A 110k-triangle copy lost
  the gear teeth on the arm, so phones get the same model.
- **Project tile** (`robocore-card.webp`) and **share card** (`og-robocore.jpg`): the hero render on the box yellow with
  the contour lines, drawn in HTML and captured with headless Chrome so they use the real fonts and logo.
- **Plastal-Bot logo in navy** (`plastal-bot-builders-navy.svg`): `RoboCore_Event_Branding/assets/plastal_logo.svg`
  with its ink set to the RoboCore navy, for the yellow backgrounds.
