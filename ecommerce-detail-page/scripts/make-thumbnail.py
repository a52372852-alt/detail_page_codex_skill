#!/usr/bin/env python3
"""Create an exact 1000x1000 ecommerce thumbnail without adding margin bands."""

from __future__ import annotations

import argparse
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError as error:
    raise SystemExit(
        "Pillow is required. Install it with: "
        "python3 -m pip install -r ecommerce-detail-page/requirements.txt"
    ) from error


THUMBNAIL_SIZE = 1000


def make_thumbnail(source: Path, destination: Path) -> None:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGBA")

    if image.width != image.height:
        raise SystemExit(
            f"Thumbnail source must be square; got {image.width}x{image.height}. "
            "Regenerate the source at a 1:1 aspect ratio to avoid cropping or distortion."
        )

    white = Image.new("RGBA", image.size, (255, 255, 255, 255))
    image = Image.alpha_composite(white, image).convert("RGB")
    if image.size != (THUMBNAIL_SIZE, THUMBNAIL_SIZE):
        image = image.resize(
            (THUMBNAIL_SIZE, THUMBNAIL_SIZE),
            Image.Resampling.LANCZOS,
        )

    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, format="PNG", optimize=True)

    with Image.open(destination) as verified:
        if verified.size != (THUMBNAIL_SIZE, THUMBNAIL_SIZE):
            raise RuntimeError(f"Thumbnail size verification failed: {destination}")

    print(destination)
    print("Verified thumbnail: 1000x1000px, no added top/bottom margin bands")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Create an exact 1000x1000 thumbnail without adding margin bands."
    )
    parser.add_argument("input_image", type=Path, help="Square thumbnail source image")
    parser.add_argument(
        "output_image",
        type=Path,
        nargs="?",
        help="Output PNG; defaults to <source-stem>-1000x1000.png",
    )
    args = parser.parse_args()

    source = args.input_image.resolve()
    if not source.is_file():
        parser.error(f"Input image does not exist: {source}")

    destination = (
        args.output_image
        or source.with_name(f"{source.stem}-1000x1000.png")
    ).resolve()
    make_thumbnail(source, destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
