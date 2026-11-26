#!/usr/bin/env python3
"""
Make web-sized copies of source photos: <out_dir>/<name>.jpg and <name>.webp (SmartImage serves the .webp first).

    python3 scripts/media/make_web_derivatives.py jobs.json

jobs.json is a list of {"src": "...", "out": "public/resources/X/web/name", "rotate": 0}
  - "rotate" is degrees counter-clockwise applied AFTER reading the raw pixels. EXIF orientation is NOT applied
    automatically: on many of our phone photos the tag lies (see the Geneva notes), so look at each one and set it.
  - Long edge is capped at 1600 px (pass "max": 2000 to change). EXIF and other metadata are dropped.

Raw sources stay out of git; only the web/ copies deploy (.gitignore allows public/resources/*/web/).
"""
import json
import os
import sys

from PIL import Image

ORIENT_TAG = 274


def main(path):
    jobs = json.load(open(path))
    for job in jobs:
        im = Image.open(job['src'])
        orient = (im.getexif() or {}).get(ORIENT_TAG, 1)
        im = im.convert('RGB')
        if job.get('rotate'):
            im = im.rotate(job['rotate'], expand=True)
        cap = job.get('max', 1600)
        im.thumbnail((cap, cap), Image.LANCZOS)
        os.makedirs(os.path.dirname(job['out']), exist_ok=True)
        im.save(job['out'] + '.jpg', quality=82, optimize=True, progressive=True)
        im.save(job['out'] + '.webp', quality=78, method=6)
        kb = os.path.getsize(job['out'] + '.webp') // 1024
        print(f"{job['out']}  {im.size[0]}x{im.size[1]}  webp {kb} KB  (exif orientation was {orient})")


if __name__ == '__main__':
    main(sys.argv[1])
