# Detail Page Codex Skill

Codex skill for Korean ecommerce detail-page planning and image production.

## Contents

- `ecommerce-detail-page/`: installable Codex skill.
- `generated/lipstick-coupang-practical/`: sample 6-cut lipstick detail-page output with HTML review/download page.
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
