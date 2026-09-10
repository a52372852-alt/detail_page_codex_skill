#!/usr/bin/env python3
"""Add exact white margins above and below generated detail-page images."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError as error:
    raise SystemExit(
        "Pillow is required. Install it with: "
        "python3 -m pip install -r ecommerce-detail-page/requirements.txt"
    ) from error


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
THUMBNAIL_MARKERS = ("thumbnail", "thumb", "썸네일", "대표이미지")


def natural_key(path: Path) -> list[object]:
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def looks_like_thumbnail(path: Path) -> bool:
    stem = path.stem.lower().replace(" ", "")
    return any(marker in stem for marker in THUMBNAIL_MARKERS)


def is_pure_white_band(image: Image.Image, top: int, bottom: int) -> bool:
    rgb = image.convert("RGB")
    width, height = rgb.size
    if height <= top + bottom:
        return False

    bands = []
    if top:
        bands.append(rgb.crop((0, 0, width, top)))
    if bottom:
        bands.append(rgb.crop((0, height - bottom, width, height)))

    for band in bands:
        if any(channel_range != (255, 255) for channel_range in band.getextrema()):
            return False
    return True


def add_white_margins(source: Path, destination: Path, top: int, bottom: int) -> None:
    with Image.open(source) as opened:
        content = ImageOps.exif_transpose(opened).convert("RGBA")

    white = Image.new("RGBA", content.size, (255, 255, 255, 255))
    content = Image.alpha_composite(white, content).convert("RGB")
    canvas = Image.new(
        "RGB",
        (content.width, content.height + top + bottom),
        (255, 255, 255),
    )
    canvas.paste(content, (0, top))
    canvas.save(destination, format="PNG", optimize=True)

    with Image.open(destination) as verified:
        if verified.size != (content.width, content.height + top + bottom):
            raise RuntimeError(f"Unexpected output dimensions: {destination}")
        if not is_pure_white_band(verified, top, bottom):
            raise RuntimeError(f"White-margin verification failed: {destination}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Add exact pure-white top and bottom margins to detail-page images."
    )
    parser.add_argument("input_dir", type=Path, help="Directory containing generated images")
    parser.add_argument(
        "output_dir",
        type=Path,
        nargs="?",
        help="Output directory; defaults to <input-dir>-with-margins",
    )
    parser.add_argument("--top", type=int, default=60, help="Top margin in pixels (default: 60)")
    parser.add_argument("--bottom", type=int, default=60, help="Bottom margin in pixels (default: 60)")
    parser.add_argument("--overwrite", action="store_true", help="Replace existing output PNG files")
    args = parser.parse_args()

    if args.top < 0 or args.bottom < 0:
        parser.error("Margins must be zero or positive integers")

    input_dir = args.input_dir.resolve()
    output_dir = (args.output_dir or input_dir.with_name(f"{input_dir.name}-with-margins")).resolve()
    if not input_dir.is_dir():
        parser.error(f"Input directory does not exist: {input_dir}")

    sources = sorted(
        (
            path
            for path in input_dir.iterdir()
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        ),
        key=natural_key,
    )
    if not sources:
        parser.error(f"No supported images found in: {input_dir}")

    thumbnail_sources = [source.name for source in sources if looks_like_thumbnail(source)]
    if thumbnail_sources:
        parser.error(
            "Thumbnail-like files must stay outside the body-cut margin workflow: "
            + ", ".join(thumbnail_sources)
        )

    output_names = [f"{source.stem}.png" for source in sources]
    if len(output_names) != len(set(output_names)):
        parser.error("Two source images would produce the same PNG filename")

    output_dir.mkdir(parents=True, exist_ok=True)
    for source, output_name in zip(sources, output_names):
        destination = output_dir / output_name
        if destination.exists() and not args.overwrite:
            parser.error(f"Output already exists; use --overwrite to replace it: {destination}")
        add_white_margins(source, destination, args.top, args.bottom)
        print(destination)

    print(f"Verified {len(sources)} image(s): top={args.top}px, bottom={args.bottom}px, color=#FFFFFF")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
