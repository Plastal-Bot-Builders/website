"""
Generate 1200x630 social share cards (Open Graph / Twitter) for
Plastal-Bot Builders: a full-bleed photo, a navy fade along the bottom
carrying the title, and the white logo in the top-right corner.

    python3 scripts/social/make-og-card.py

Cards are written to public/resources/social/ — the only image folder the
.gitignore lets through for new files — and every file there is assumed to
be exactly 1200x630 by scripts/prerender.js, which emits og:image:width/height
for them. Edit CARDS below to add one, then reference it as `image` on a
route in scripts/seo/site-manifest.js.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/resources/social'

W, H = 1200, 630
NAVY, MINT, WHITE = (20, 17, 61), (12, 255, 187), (255, 255, 255)
SUBTLE = (225, 230, 242)
FONT = '/System/Library/Fonts/Avenir Next.ttc'   # macOS; index 2 = bold

CARDS = {
    'og-default.jpg': {
        'photo': 'resources/Geneva2026/web/geneva-flag.jpg',
        'focus': (0.5, 0.42),   # which part of the photo survives the crop
        'title': 'Plastal-Bot Builders',
        'sub': 'Youth robotics & STEM education  ·  Zambia',
    },
    'og-journey.jpg': {
        'photo': 'resources/Geneva2026/web/geneva-stage-celebration.jpg',
        'focus': (0.5, 0.40),
        'title': 'The Road to Geneva',
        'sub': 'Plastal-Bot Builders  ·  AI for Good finalists',
    },
}


def card(spec):
    src = Image.open(ROOT / 'public' / spec['photo']).convert('RGB')
    s = max(W / src.width, H / src.height)
    src = src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS)
    fx, fy = spec['focus']
    l, t = int((src.width - W) * fx), int((src.height - H) * fy)
    img = src.crop((l, t, l + W, t + H)).convert('RGBA')

    overlay = Image.new('RGBA', (W, H), NAVY + (0,))
    d = ImageDraw.Draw(overlay)
    # Bottom fade: carries the title, near-opaque at the bottom edge.
    y0 = int(H * 0.40)
    for y in range(y0, H):
        d.line([(0, y), (W, y)], fill=NAVY + (int(245 * ((y - y0) / (H - y0)) ** 1.1),))
    img = Image.alpha_composite(img, overlay)

    # Top-right vignette: seats the logo and quiets background clutter.
    corner = Image.new('L', (W, H), 0)
    cd = ImageDraw.Draw(corner)
    for r in range(420, 0, -6):
        cd.ellipse([W - r, -r, W + r, r], fill=int(200 * (1 - r / 420) ** 0.8))
    img = Image.composite(Image.new('RGBA', (W, H), NAVY + (255,)), img, corner)

    logo = Image.open(ROOT / 'public/resources/Logo/logo_trans.png').convert('RGBA')
    logo = logo.crop(logo.split()[3].getbbox())
    logo = logo.resize((round(logo.width * 150 / logo.height), 150), Image.LANCZOS)
    img.paste(logo, (W - logo.width - 52, 40), logo)

    d = ImageDraw.Draw(img)
    d.text((60, H - 186), spec['title'], font=ImageFont.truetype(FONT, 66, index=2), fill=WHITE)
    d.rectangle([60, H - 100, 146, H - 94], fill=MINT)
    d.text((60, H - 80), spec['sub'], font=ImageFont.truetype(FONT, 29, index=0), fill=SUBTLE)
    return img.convert('RGB')


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, spec in CARDS.items():
        out = card(spec)
        assert out.size == (W, H)
        out.save(OUT / name, 'JPEG', quality=88, optimize=True, progressive=True)
        print(f'  wrote {name}  {(OUT / name).stat().st_size // 1024} KB')
