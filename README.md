# Detail Page Codex Skill

Codex skill for Korean ecommerce detail-page planning and image production.

## How To Use

Use natural Korean trigger phrases in Codex:

```text
상세페이지 만들고 싶어
상세페이지 제작해
칫솔 상세페이지 만들어줘 추천으로
이 상품 사진으로 상세페이지 만들어줘
```

Recommended first inputs:

- With photos: attach product photos and say `이 사진으로 상세페이지 만들어줘`.
- Without photos: say `[상품명] 상세페이지 만들어줘 추천으로`.
- If you know the style: add `쿠팡 실용형`, `네이버 스토리형`, or `프리미엄 감성형`.
- If you know the cut count: add `6컷`, `12컷`, or `15컷`.

Default workflow:

1. The skill checks whether product photos exist.
2. If photos exist, it analyzes photo quality and recommends image placement.
3. It asks one choice-based question at a time.
4. It creates a cut-by-cut plan first, with copy, image composition, and ASCII layout.
5. After approval, it generates one image per cut using maximum available parallel agents/jobs.
6. It builds an HTML review/download page, ZIP file, and QA report.

Important operating rule: final generated images must include the approved Korean copy inside the image. If Korean text is broken or missing, failed cuts should be regenerated.

## Contents

- `ecommerce-detail-page/`: installable Codex skill.
- `generated/lipstick-coupang-practical/`: sample 6-cut lipstick detail-page output with HTML review/download page.
- `generated/house-plum/`: sample 12-cut house-plum output from provided photos.
- `generated/toothbrush-recommended/`: sample 12-cut toothbrush sales-draft output from recommended assumptions.
- `history.md`: local work history.

## Skill Highlights

- One-question-at-a-time intake with choices.
- Product photo check first.
- Recommended target/customer and detail-page style selection.
- Exact cut-count preservation.
- Planning output with ASCII wireframes.
- Image-generation-model-only final cut production with Korean text inside images.
- Parallel cut generation guidance.
- HTML review/download workflow and Korean text QA.

## Validation

```bash
python3 /Users/firstandre/.codex/.tmp/marketplaces/claude-plugins-official/plugins/skill-creator/skills/skill-creator/scripts/quick_validate.py ecommerce-detail-page
node --check ecommerce-detail-page/scripts/build-image-gallery.mjs
```
