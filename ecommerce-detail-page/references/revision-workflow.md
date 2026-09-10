# Reference Fidelity and Targeted Revisions

Use this guide when a product must match supplied photos, one approved cut should define the rest of a series, or the user requests a local correction while preserving the model, background, layout, and mood.

## Source Hierarchy

Resolve conflicts in this order:

1. The user's latest explicit correction.
2. The user-named approved or well-made anchor cut.
3. The clearest supplied product/reference photo.
4. Earlier generated cuts.
5. Generic category knowledge.

Do not let a generated detail override a visible product fact from a higher-priority source.

## Product-Invariant Ledger

Before generation or revision, record only details that affect visual identity:

| Area | Record as locked or editable |
|---|---|
| Product geometry | silhouette, thickness, proportions, folds, component count |
| Material topology | ordered layers from product body to outer edge and the exact junction between them |
| Surface | color, pile, weave, gloss, texture scale, printed/embossed pattern |
| Construction | trim width, piping, seam path, stitch location, hardware, closures |
| Branding | readable labels, logo placement, package structure |
| Human subject | face, age range, hairstyle, wardrobe, skin tone, anatomy |
| Environment | room, furniture, props, lighting direction, palette, camera height/lens feel |
| Copy/layout | exact Korean copy, hierarchy, text-safe area, channel ratio |

Describe a construction detail as a relationship, not a loose location. For example: `body material -> black seam exactly on the material junction -> cream outer trim`. This prevents an editor from putting the seam in the middle of the trim merely because it is near the edge.

## Anchor Cut

- Use the cut named by the user as the anchor. If none is named, choose the clearest close-up that shows the most important product details.
- For a new consistency-sensitive series, create one anchor cut first. Check product structure, person, room, palette, and camera cues before generating the remaining cuts.
- Give every later cut the same invariant ledger and anchor image. State which scene elements may vary.
- A lifestyle cut can change pose or crop while keeping identity, wardrobe, environment, product construction, and color locked.

## Targeted Revision

1. Inspect the target cut and anchor at high detail.
2. Write one sentence for the defect to change and one sentence listing what must remain unchanged.
3. Edit only the smallest practical region. Use the target cut as the base image and the anchor/product photo as the reference.
4. Regenerate only the affected cut. Do not rebuild the whole set for a local defect.
5. Save the result in a new versioned directory. Copy unaffected files byte-for-byte and preserve the previous version for comparison.
6. Check the corrected region at full size and then check the whole image for unintended drift.

When the generator changes the person, room, copy, or product outside the requested area, reject the result even if the target defect improved.

## QA Checklist

- Product silhouette and proportions match the source.
- Layer order, junctions, trim, piping, and seam paths match the invariant ledger.
- Color and texture remain consistent across cuts.
- The same person retains face, hair, wardrobe, skin tone, and natural hands/fingers.
- Background, furniture, props, lighting, and crop remain unchanged when the user requested preservation.
- Korean copy is exact, readable, and not replaced or translated.
- Image dimensions and filename sequence match the approved set.
- Unchanged cuts are byte-identical to the previous version.
- The HTML gallery points to the latest files and the ZIP opens successfully.

## Revision Delivery

Deliver:

- the updated individual cut files;
- an updated-cuts ZIP when only some cuts changed;
- a full final-set ZIP;
- the review HTML with per-cut links and a ZIP-backed `전체 다운로드` link;
- a short change list naming the corrected cuts and the invariants checked.
