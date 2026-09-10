# Image Production Workflow

Use this after the user approves a cut plan and chooses image generation.

## Anchor and Parallel Generation

Choose consistency before speed when the same product, person, or room must recur.

1. Fix the approved cut count first.
2. Read [revision-workflow.md](revision-workflow.md) and record the product-invariant ledger when a supplied photo or approved cut defines exact appearance.
3. Use the user-named approved cut as the anchor. If none exists and cross-cut consistency matters, generate one clear anchor cut first and review it before the remaining cuts.
4. Give every later cut job the same anchor image, invariant ledger, approved copy, style, and explicit allowed variations.
5. Parallelize only the cuts that no longer depend on an unresolved anchor. Use the environment's available concurrency when this will not reduce visual consistency.
6. Keep each cut job inside its assigned ownership. A worker for `cut-04` must not rewrite or regenerate `cut-03`.
7. If the approved plan marks a product photo as `재생성 권장`, use that photo as appearance reference while improving lighting, background, crop, and composition.
8. Preserve visible product shape, color, package structure, construction topology, and readable labels. Do not invent unreadable labels, certifications, ingredients, or claims.
9. Do not merge cuts into one tall image unless the user explicitly asks.
10. Collect and review all outputs before final delivery.

If the environment cannot run image jobs in parallel, keep the required output count and continue sequentially. Do not collapse multiple planned cuts into one image.

## Korean Text QA

After all images are generated, review every cut against the approved `이미지 내 삽입 문구`.

Fail and regenerate a cut if:

- Korean text is missing.
- Hangul is broken, garbled, or unreadable.
- Text is translated to English or replaced with nonsense.
- Approved wording changed materially.
- Text is too small for mobile reading.
- Information claims conflict with provided facts or use unverified claims.

Recovery rule:

- For short copy, repeat the exact Korean text, reduce text blocks, use larger type, simplify the layout, and state that the text must not change.
- For long, legal, specification, or user-supplied exact copy, keep the generated visual free of placeholder text and apply a deterministic typography/layout layer.
- Compare the rendered text character-by-character with the approved copy before delivery.

## Targeted Revision

For a local defect such as trim position, seam path, a hand, or a label:

1. Use the existing cut as the base image and the approved anchor/product photo as the reference.
2. Name the one defect to change and list the product, person, background, copy, crop, lighting, and dimensions that must stay fixed.
3. Edit the smallest practical region and regenerate only the affected cut.
4. Save to a new versioned directory. Copy all unaffected cuts byte-for-byte.
5. Check the target region at full resolution and reject any result that introduces drift elsewhere.

## Exact Vertical White Margins

Every delivered cut requires a blank, pure-white (`#FFFFFF`) band of exactly 60 pixels across the full width at the top and bottom.

1. Generate or edit content images in a `raw/` directory without relying on the model to estimate pixel margins.
2. Keep all products, people, copy, logos, shadows, and decoration inside the content area.
3. Produce final PNG files in a separate `images/` directory:

```bash
python3 ecommerce-detail-page/scripts/add-white-margins.py \
  /path/to/raw \
  /path/to/images \
  --top 60 \
  --bottom 60
```

4. The script verifies the final height and every pixel in both white bands. Treat a failed check as a failed cut.
5. Build the HTML gallery and ZIP from `images/`, never from `raw/`.
6. If the marketplace requires a fixed final height, size the content area to `final height - 120 pixels` before adding the bands.

## HTML Review and Download Page

When generated files are available locally, create an HTML page after all cuts are complete.

Requirements:

- Show cuts sequentially from `cut-01` to `cut-N`.
- Display each image full-width in a mobile-detail-page preview column.
- Include a visible per-cut download link.
- Create an actual ZIP archive beside the HTML and link `전체 다운로드` directly to it. Do not depend on a browser allowing multiple scripted downloads.
- Include a simple QA status area for each cut: `통과`, `재생성 필요`, or `확인 필요`.
- Use the margin-verified `images/` directory as the gallery source.

Use the helper script:

```bash
node ecommerce-detail-page/scripts/build-image-gallery.mjs <image-dir> <output-html>
```

Example:

```bash
node ecommerce-detail-page/scripts/build-image-gallery.mjs \
  /Users/firstandre/.codex/generated_images/019e... \
  /Users/firstandre/dev_test_file/detail_page_codex_skill/generated/lipstick/index.html
```

After building, open the ZIP with a standard integrity check such as `unzip -t`. Per-cut links must remain visible as fallback.
