"""
Generate 1200x630 social share cards (Open Graph / Twitter) in the
Plastal-Bot Builders style: navy panel with the white logo and headline on
the left, a photo on the right.

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

W, H, PANEL = 1200, 630, 560
NAVY, MINT = (20, 17, 61), (12, 255, 187)
SUBTLE = (190, 199, 222)
FONT = '/System/Library/Fonts/Avenir Next.ttc'   # macOS; index 2 = bold

CARDS = {
    'og-default.jpg': {
        'photo': 'resources/Geneva2026/web/geneva-hero.jpg',
        'focus': (0.55, 0.30),
        'headline': ['Robotics & STEM', 'education in Zambia'],
        'sub': ['Youth-led, Lusaka-based.', 'AI for Good finalists, Geneva.'],
    },
    'og-journey.jpg': {
        'photo': 'resources/Geneva2026/web/geneva-stage-celebration.jpg',
        'focus': (0.50, 0.28),
        'headline': ['The Road to', 'Geneva'],
        'sub': ['From a hand-made practice field', 'in Lusaka to the AI for Good finals.'],
    },
}


def card(spec):
    img = Image.new('RGB', (W, H), NAVY)

    # Photo fills the right side; `focus` picks which part of it survives the crop.
    src = Image.open(ROOT / 'public' / spec['photo']).convert('RGB')
    pw = W - PANEL
    scale = max(pw / src.width, H / src.height)
    src = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
    fx, fy = spec['focus']
    left, top = int((src.width - pw) * fx), int((src.height - H) * fy)
    img.paste(src.crop((left, top, left + pw, top + H)), (PANEL, 0))

    # Feather the seam so the panel blends into the photo.
    fade = Image.new('RGBA', (W, H), NAVY + (0,))
    fd = ImageDraw.Draw(fade)
    for i in range(130):
        fd.line([(PANEL + i, 0), (PANEL + i, H)], fill=NAVY + (int(255 * (1 - i / 130) ** 1.3),))
    img = Image.alpha_composite(img.convert('RGBA'), fade).convert('RGB')

    d = ImageDraw.Draw(img)
    d.rectangle([PANEL - 4, 0, PANEL - 1, H], fill=MINT)

    logo = Image.open(ROOT / 'public/resources/Logo/logo_trans.png').convert('RGBA')
    logo = logo.crop(logo.split()[3].getbbox())
    logo = logo.resize((round(logo.width * 168 / logo.height), 168), Image.LANCZOS)
    img.paste(logo, (70, 62), logo)

    h1, sub, url = (ImageFont.truetype(FONT, s, index=i) for s, i in ((54, 2), (29, 0), (25, 2)))
    y = 288
    for line in spec['headline']:
        d.text((70, y), line, font=h1, fill=(255, 255, 255)); y += 64
    y += 14
    d.rectangle([70, y, 156, y + 6], fill=MINT)
    y += 36
    for line in spec['sub']:
        d.text((70, y), line, font=sub, fill=SUBTLE); y += 40
    d.text((70, H - 66), 'plastalbotbuilders.com', font=url, fill=MINT)
    return img


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, spec in CARDS.items():
        out = card(spec)
        assert out.size == (W, H)
        out.save(OUT / name, 'JPEG', quality=88, optimize=True, progressive=True)
        print(f'  wrote {name}  {(OUT / name).stat().st_size // 1024} KB')
