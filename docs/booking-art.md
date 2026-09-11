# Booking artwork

Mode: built-in image generation (photorealistic-natural).

Asset: `public/generated/booking/nourishment-editorial.webp` (1536 × 1024, 189 KB). Optimized as WebP from the generated original. Bruna's existing real portrait is layered separately in the page; it was not AI-generated or edited.

Final prompt:

> Premium editorial food photograph for a nutritionist website hero, wide 3:2. Warm eggshell ivory tabletop, soft sunshine, fresh everyday food, sophisticated tactile ceramic and oatmeal linen. Arrange food in two clusters framing an EMPTY pale center for a real practitioner portrait to be overlaid later. Right: handmade ivory bowl with a beautiful balanced Brazilian meal of rice, black beans, grilled chicken, roasted squash, tomato and greens. Left and lower corners: avocado half, papaya, lime, small tomatoes, herbs, a folded linen napkin. Rich botanical greens and muted coral with golden fruit, clean cream background. Gently elevated 45-degree photographic view, refined high-end food magazine quality, appetizing real food with subtle natural shadows. Upper quarter and vertical central third are mostly empty cream space. No people, no hands, no text, no UI, no logos, no landscapes, no landmarks, no flags, no scales. Healthy eating as nourishment and pleasure, not deprivation. Generous quiet composition, softly dissolving ivory edges.

## September 10 refinement

- Country choice art: generated as three isolated flag/landmark groupings (Brazil + Statue of Liberty; Brazil + Christ the Redeemer; U.S. flag). The delivered WebP icons have actual alpha transparency, cropped from the generated RGBA sheet.
- Portraits: the image generator's attempted removals produced baked checkerboards and were rejected. After the user's explicit request for actual transparent crops, the final assets were extracted **directly from the supplied original photographs** using macOS Vision foreground masks, then optimized to RGBA WebP. No generated portrait is used.
- `bruna-welcome-cutout.webp`: original 17.19.23 photo, hand raised.
- `bruna-food-cutout.webp` / `bruna-food-hero.webp`: original 17.19.22 (2), broccoli pose; hero uses an upper-body crop.
- `bruna-consult-cutout.webp`: original 17.19.21, seated beside laptop.
- `bruna-professional-cutout.webp`: original 17.19.21 (4), green blazer.
- All four cutouts were checked for alpha channel extrema of 0–255. Hair and clothing edges were visually checked on a contrasting sage background.
- The proposed “1,000+” client total has not been confirmed, so the page currently uses the existing CRN credential, language availability, and real testimonial instead.

Country art prompt:

> Create one horizontal sprite sheet with THREE separate high-quality editorial miniature objects equally spaced in three equal square columns on a truly TRANSPARENT background. Left column: Brazilian fabric flag draped elegantly alongside a detailed patinated sage-green Statue of Liberty miniature. Center column: Brazilian fabric flag with detailed pale limestone Christ the Redeemer statue, arms fully spread, on a little botanical green pedestal. Right column: ONLY a correct United States American fabric flag waving gracefully on a short brass pole, navy canton with white stars and thirteen red/white stripes, no other landmark. Each grouping isolated, fully visible, ample transparent padding between the three groups, no overlap between columns. Premium realistic sculptural illustration, fine material detail, elegant soft daylight, restrained natural colors, tasteful luxury editorial collage style, not cartoon, no UI, no text, no badges or enclosing circles. These will be cropped into three individual website choice icons that overflow cream containers. Use case: stylized-concept.

### Complete laptop composition

At the user's request, `bruna-consult-complete.webp` replaces the cropped laptop scene in the page. It is an AI-extended composition based on the supplied seated portrait, with the full chair, table, laptop, and shoes. Its background was then removed with a real foreground alpha mask. The other displayed cutouts still come directly from the original photos.

Prompt: Edit and extend the original photograph into a complete standalone portrait. Preserve the woman, expression, hair, clothing, and seated pose. Zoom out to include the entire person, both feet, wooden chair, round black table and every leg, laptop and mug. Leave margins on every side; use a plain ivory studio background. Keep all objects grouped into one coherent compact silhouette, with no floating furniture or truncated legs.

## Experience food burst
- Asset: `public/generated/booking/healthy-food-burst.webp` (1100px, WebP).
- Generated with built-in image generation: photorealistic floating avocado, papaya, berries, citrus, greens and almonds on warm eggshell, empty center for an independently layered portrait.
- Original source: `exec-798016ad-7a3f-4cec-9766-0402a0b068e0.png` in the thread's generated-images directory.
- Bruna remains the original transparent welcome portrait, not regenerated. CSS softly feathers the food image edges and provides a reduced-motion-aware entrance.

## Sharper first-step portrait
User requested regeneration of the out-of-focus broccoli-forward photograph. `bruna-broccoli-sharp.webp` uses an AI-regenerated face/portrait referenced to the two supplied broccoli photos, with actual foreground alpha applied and verified on sage. Source: `exec-531dcff7-4a5d-4507-bb9b-b1f4eb952e90.png`. The original and prior cutout remain available; the hero now uses the sharpened version.
