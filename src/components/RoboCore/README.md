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
| `src/components/RoboCore/shared.ts` | Contact details, the maker line, and scrolling to a section. |
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
- **Share card** (`og-robocore.jpg`, 1200 × 630, about 130 KB, the image a shared link shows): "Build a robot. Code it in
  your browser." with the hero render and a real block program (the "Robot obstacle avoider" example's forever stack,
  captured from the IDE) on the box yellow. Drawn in HTML with the real fonts, logo and contour lines and captured with
  headless Chrome. Its alt text is `imageAlt` in the manifest. Keep the headline readable at about 480 px wide (a
  phone feed).
- **Project tile** (`robocore-card.webp`): the hero render on the box yellow with the contour lines, made the same way.
- **Plastal-Bot logo in navy** (`plastal-bot-builders-navy.svg`): `RoboCore_Event_Branding/assets/plastal_logo.svg`
  with its ink set to the RoboCore navy, for the yellow backgrounds.
