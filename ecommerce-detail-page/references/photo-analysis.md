# Product Photo Analysis and Placement

Use this whenever the user provides product photos or reference images.

## What to Analyze

For each image, identify:

- Image id or filename.
- Product angle: front, side, top, detail, package, label, texture, usage, component, shipping.
- Visible facts: brand, option, color, volume, composition, labels, warnings, expiration, certification marks. Do not infer facts that are not readable.
- Visual strengths: clean background, sharpness, premium mood, scale reference, good crop, label readability, texture/detail.
- Visual issues: blur, low resolution, bad lighting, clutter, cut-off product, distorted color, text too small, label unreadable, background mismatch.
- Best use: hero, detail, texture, size comparison, option/configuration, usage, trust/proof, delivery/package, FAQ/caution, CTA.
- Crop recommendation: full product, square crop, vertical crop, close-up, background removal, or use as reference only.
- Text placement: top, bottom, left overlay, right overlay, card beside image, or avoid overlay.

## Output Section

When photos are provided, add this section before strategy:

```markdown
## 2. 상품 사진 분석 및 배치 추천

| 이미지 | 파악한 내용 | 강점 | 주의점 | 추천 컷/용도 | 배치 추천 |
|---|---|---|---|---|---|
| 이미지 1 |  |  |  |  |  |
```

## Placement Rules

- Use the cleanest full-product image for the hero cut.
- Use package/label photos for trust, composition, ingredient, caution, and delivery/return guide cuts.
- Use texture/detail photos for material, ingredients, formula, finish, freshness, or craftsmanship cuts.
- Use usage-scene photos for lifestyle, routine, size comparison, and before/after context.
- If a photo has clutter or weak lighting, use it as a reference only or recommend background cleanup before final production.
- Do not place text over important labels, faces, small details, or busy backgrounds.
- If product colors matter, prefer real photo colors over generated colors and warn when lighting may distort color.

## Final Image Prompt Use

In final image-generation prompts, explicitly state how to use the provided photo:

- `Use the provided product photo as the source of truth for product shape, color, package, and label.`
- `Place the product photo in the center hero area.`
- `Use the package photo only for the caution/info section.`
- `Do not invent unseen labels, certifications, ingredients, or claims.`
