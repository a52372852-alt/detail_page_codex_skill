# Image Production Workflow

Use this after the user approves a cut plan and chooses image generation.

## Parallel Generation

Generate images through simultaneous parallel agents by default. The purpose is to reduce waiting time by starting all cut-production work before waiting for any single cut to finish.

1. Fix the approved cut count first.
2. Create one independent image-generation agent/job per cut: `cut-01`, `cut-02`, ..., `cut-N`.
3. Start all cut agents/jobs at the same time when the environment supports parallel agents or parallel tool calls.
4. Do not wait for `cut-01` before launching `cut-02`; launch every planned cut first, then collect results.
5. Each cut job must use only its approved cut copy, layout, style template, and product photo reference.
6. If the approved plan marks a product photo as `재생성 권장`, the cut job must use that photo as a reference only and generate a cleaner ecommerce-ready product visual with improved lighting, background, crop, and composition.
7. Reference-based regeneration must preserve visible product shape, color, package structure, and readable labels, but must not invent unreadable labels, certifications, ingredients, or claims.
8. Do not merge cuts into one tall image unless the user explicitly asks.
9. Collect all outputs before final delivery.

If the environment cannot truly run image jobs in parallel, keep the job design parallel and explain only if needed; do not change the required output count.

## Korean Text QA

After all images are generated, review every cut against the approved `이미지 내 삽입 문구`.

Fail and regenerate a cut if:

- Korean text is missing.
- Hangul is broken, garbled, or unreadable.
- Text is translated to English or replaced with nonsense.
- Approved wording changed materially.
- Text is too small for mobile reading.
- Information claims conflict with provided facts or use unverified claims.

Regeneration prompt rule:

- Repeat the exact Korean text.
- Reduce the number of text blocks if needed.
- Use larger type.
- Simplify the layout.
- Explicitly state that Korean text must not be changed, translated, or omitted.

## HTML Review and Download Page

When generated files are available locally, create an HTML page after all cuts are complete.

Requirements:

- Show cuts sequentially from `cut-01` to `cut-N`.
- Display each image full-width in a mobile-detail-page preview column.
- Include a visible per-cut download link.
- Include a `전체 다운로드` button that triggers all image downloads.
- Include a simple QA status area for each cut: `통과`, `재생성 필요`, or `확인 필요`.

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

Browser note: some browsers may ask permission before downloading multiple files. Per-cut links must remain visible as fallback.
