# Bruna Tinoco Nutri Agent Reference

This file is for future AI agents and developers editing this exact repository:
`/Users/ericksorto/NextJSProjects/brunatinoconutri-website`.

Use the current codebase as the source of truth. Do not replace established layout, copy, assets, or component behavior unless the user explicitly asks.

## 1. Project Identity

- Client/business name: Bruna Tinoco Nutri.
- Category: online nutrition consulting for Brazilian women living in the United States.
- Primary offer: free 1-hour consultation, then paid consulting plans.
- Credential shown on site: `CRN 20101459`.
- WhatsApp phone in code: `5522999595715` in [app/page.tsx](../app/page.tsx).
- WhatsApp links must use `getWhatsappLink(lang)` so the message changes between Portuguese and English.
- Social links in [app/page.tsx](../app/page.tsx):
  - Instagram: `https://www.instagram.com/brunatinoconutri/`
  - Facebook: `https://www.facebook.com/brunatinoconutri`
  - YouTube: `https://www.youtube.com/@brunatinoco248/videos`
- Main public production URL used during QA: `https://brunatinoconutri-website.vercel.app`.
- Vercel deployment protection must be off for any URL shared in Messages or WhatsApp. Protected Vercel URLs return `401` and will not render previews.

## 2. Brand System

Use the color variables defined in [app/globals.css](../app/globals.css), not ad hoc colors:

```css
--cream: #fff8ed;
--linen: #f6efe3;
--paper: #fffdf7;
--sage-50: #eef4e5;
--sage-100: #d8e4c2;
--sage-300: #9fb982;
--sage-500: #73925d;
--sage-700: #3f5a35;
--forest: #25382c;
--olive: #5f7042;
--clay: #bc7858;
--coral: #e66f59;
--gold: #f1bf5b;
--mint: #56b39c;
--ink: #24342a;
```

Typography pattern:
- Serif display headings use `Georgia, "Times New Roman", serif`.
- UI/body text uses the Geist font configured in [app/layout.tsx](../app/layout.tsx).
- Do not add another typeface unless replacing it everywhere.

Logo and icon assets:
- Logo: [public/bruna-logo.webp](../public/bruna-logo.webp).
- Social icons:
  - [public/social-icons/instagram-white.svg](../public/social-icons/instagram-white.svg)
  - [public/social-icons/instagram-green.svg](../public/social-icons/instagram-green.svg)
  - [public/social-icons/facebook-white.svg](../public/social-icons/facebook-white.svg)
  - [public/social-icons/facebook-green.svg](../public/social-icons/facebook-green.svg)
  - [public/social-icons/youtube-white.svg](../public/social-icons/youtube-white.svg)
  - [public/social-icons/youtube-green.svg](../public/social-icons/youtube-green.svg)
  - [public/social-icons/whatsapp-white.svg](../public/social-icons/whatsapp-white.svg)
- Inline site icons come from `iconPaths` in [app/page.tsx](../app/page.tsx) and [app/BookingScheduler.tsx](../app/BookingScheduler.tsx). Add to those maps before using a new `MiniIcon` name.

## 3. Codebase Map

Framework and package versions:
- Next.js `16.2.5`
- React `19.2.4`
- TypeScript `^5`
- Tailwind CSS `^4`

Project instruction:
- [AGENTS.md](../AGENTS.md) says this is not older Next.js. Before changing Next.js-specific APIs or file conventions, read the relevant guide under `node_modules/next/dist/docs/`.

Main files:
- [app/page.tsx](../app/page.tsx): translations, metadata generation, section markup, nav, footer, social links, WhatsApp message, schedule copy.
- [app/globals.css](../app/globals.css): all layout, responsive behavior, color variables, animation, section styling.
- [app/layout.tsx](../app/layout.tsx): global metadata base and font setup.
- [app/BookingScheduler.tsx](../app/BookingScheduler.tsx): date/time chooser, weekday/past-date blocking, mobile bottom sheets.
- [app/ReviewCarousel.tsx](../app/ReviewCarousel.tsx): review carousel, dot state, auto-advance.
- [app/VideoProofStack.tsx](../app/VideoProofStack.tsx): stacked video reels with next/previous controls and desktop play overlay.
- [app/ClientProofVideo.tsx](../app/ClientProofVideo.tsx): final testimonial video with desktop play overlay.
- [app/EmailOfferPopup.tsx](../app/EmailOfferPopup.tsx): 30-second email offer modal and scroll lock.
- [app/MobileDrawerDismiss.tsx](../app/MobileDrawerDismiss.tsx): closes mobile drawer when links/buttons inside the drawer are clicked.
- [app/ViewportSequenceTrigger.tsx](../app/ViewportSequenceTrigger.tsx): triggers the seven-day timeline animation.

Asset folders:
- Bruna/PDF images: [public/bruna-pdf](../public/bruna-pdf)
- Instagram images/videos: [public/instagram](../public/instagram)
- Generated site imagery: [public/generated](../public/generated)
- Share preview images: [app/opengraph-image.png](../app/opengraph-image.png), [app/twitter-image.png](../app/twitter-image.png)

Do not move assets without updating every `Image src`, `video src`, `poster`, metadata image, and CSS `url()` reference.

## 4. Page Structure And Selectors

Current sections in order:

1. Header: `.site-header`
2. Hero: `section.hero-section#inicio`
3. Reviews proof: `section.proof-reviews#avaliacoes`
4. Video proof carousel: `section.video-proof-section#video-prova`
5. Seven-day timeline: `section.seven-day-section#resultados`
6. Experience/process: `section.experience-section#experiencia`
7. Plans: `section.plans-section#planos`
8. Included services: `section.services-section`
9. About: `section.about-section`
10. Instagram gallery: `section.instagram-gallery#galeria`
11. Booking: `section.booking-section#agendar`
12. Final client proof video: `section.client-proof-section`
13. Final CTA: `section.final-section#contato`
14. Footer: `.site-footer`

Navigation is built from `translations[lang].navLinks` in [app/page.tsx](../app/page.tsx). If a section is removed or renamed, update both `pt` and `en` `navLinks` and drawer labels.

## 5. Layout And Spacing Rules

Shared page gutter is mandatory:

```css
--container-max: 1400px;
--container-pad: clamp(24px, 2.25vw, 32px);
--page-gutter: max(
  var(--container-pad),
  calc((100vw - var(--container-max)) / 2 + var(--container-pad))
);
```

Concrete rule:
- Major sections, header bars, hero content, footer, and CTA rows must align to `padding-inline: var(--page-gutter)` unless the section intentionally runs full bleed.
- Do not add one-off left/right padding such as `padding-left: 40px` to a section that already uses `var(--page-gutter)`.
- Full-bleed backgrounds are allowed; content edges must still align to the header content edge.

Header dimensions:
- `--top-announcement-height: 40px`
- `--navbar-height-mobile: 72px`
- `--navbar-height-desktop: 88px`
- `--header-height: calc(var(--top-announcement-height) + var(--navbar-height))`
- `.site-header` is fixed. Confirm first-viewport CTAs are not hidden under it.

Desktop section padding:
- Shared group `.experience-section, .plans-section, .services-section, .about-section, .video-proof-section, .seven-day-section, .instagram-gallery, .booking-section` uses:
  - `padding: clamp(76px, 10vw, 136px) clamp(18px, 5vw, 72px)`
  - `padding-inline: var(--page-gutter)`
- `.client-proof-section` uses `padding: clamp(58px, 7vw, 96px) var(--page-gutter)`.

Mobile section padding:
- At `@media (max-width: 620px)`, `--page-gutter` becomes `16px`.
- Mobile sections listed in the CSS use `padding-inline: 16px`.
- If adding a new mobile section, make its left edge `16px` and right edge `16px` at `390px` viewport unless it is a full-bleed media block.

Cards:
- Use cards for repeated plans, reviews, gallery tiles, booking UI, and video frames.
- Do not put a card inside another decorative card. For example, `.booking-panel` can contain `.calendar-card` and `.time-card` because they are controls; do not add another unrelated wrapper with its own border/shadow around them.

Text fitting:
- Buttons must not rely on `white-space: nowrap` unless the text is proven to fit at `320px`, `390px`, and English mode.
- For long mobile labels, reduce text length in `translations`, not only font size.
- Any heading over `clamp(2rem, 10vw, ...)` must be checked at `390px` and `420px`.

## 6. Hero Rules

Hero selectors:
- `.hero-section`
- `.hero-content`
- `.hero-copy`
- `.hero-visual`
- `.hero-portrait`
- `.hero-stat-card`
- `.hero-banner`

Hero assets:
- Background texture: [public/bruna-pdf/page-02-image-01-3e586cd55a6b.webp](../public/bruna-pdf/page-02-image-01-3e586cd55a6b.webp)
- Main portrait: [public/bruna-pdf/bruna-hero-grounded.webp](../public/bruna-pdf/bruna-hero-grounded.webp)

Required behavior:
- The person image must be in `.hero-visual`, not inside `.hero-copy`.
- `.hero-portrait` must be visually anchored to the bottom of `.hero-content`; the bottom of the cutout must not float above the hero bottom.
- `.hero-stat-card` must not push hero text. It is a visual overlay.
- Desktop CTA buttons in `.hero-actions` must be visible on initial load at `1440x900`.
- Mobile hides `.hero-copy p` and hides `.hero-stat-card`; do not reintroduce these on mobile unless screenshots prove CTAs and face remain clear.

Mobile hero checks at `390x844`:
- `.hero-copy` width stays near `min(54vw, 250px)`.
- `.hero-actions` width stays near `min(50vw, 198px)`.
- `.hero-portrait` sits to the right with `right: clamp(-42px, -8vw, -24px)` and `bottom: 0`.
- The subject face must not sit under the headline or buttons.
- The WhatsApp/CTA button must remain tappable and not be covered by the image.

Known hero failure:
- Earlier revisions put the portrait in layout flow or gave it bottom padding, which increased hero height and made the person float. Fix geometry with absolute positioning and `bottom: 0`, not by adding more section height.

## 7. Mobile Rules

Mobile is a first-class target. Do not finish a change without testing `390x844`; for drawer and booking sheets also test short height `390x560`.

Top bar:
- `.announcement-whatsapp` becomes a `30px` square icon button at `max-width: 620px`.
- `.social-icons.compact` is hidden at mobile.
- `.language-toggle:not(.compact)` is hidden at mobile; the mobile language toggle belongs in `.drawer-card`.
- `.menu-button` must remain `44px x 44px`.
- Do not let `.nav-actions` overflow the viewport at `390px`.

Touch targets:
- `.menu-button`: `44px x 44px`
- `.drawer-top label`: `42px x 42px`
- `.booking-sheet-head button`: `40px x 40px`
- `.booking-mobile-choices button`: `min-height: 58px`
- `.booking-submit`: `min-height: 45px`

Horizontal overflow check:

```js
document.documentElement.scrollWidth === window.innerWidth
```

Run it at `390px` after editing hero, gallery, reviews, video cards, or booking.

## 8. Drawer Rules

Drawer selectors:
- Checkbox: `#mobile-drawer.drawer-toggle`
- Backdrop: `.drawer-backdrop`
- Panel: `.mobile-drawer`
- Top row: `.drawer-top`
- Links: `.drawer-links a`
- Language card: `.drawer-card`
- CTA: `.drawer-cta`
- Socials: `.drawer-socials`

Desktop:
- `.drawer-backdrop` and `.mobile-drawer` are hidden until the `max-width: 1120px` media block.

Mobile/tablet behavior:
- `.mobile-drawer` slides in from the right with `transform: translateX(104%)` to `translateX(0)`.
- Width is `min(88vw, 360px)`.
- Height is `100dvh`; `overflow-y: auto`; `overscroll-behavior: contain`.
- Backdrop is fixed `inset: 0`, `z-index: 59`; drawer is `z-index: 60`.
- Drawer must scroll on short screens, especially `390x560`.
- The close button is the label in `.drawer-top`; keep it square and aligned to the logo center.
- Links and CTA close the drawer through [app/MobileDrawerDismiss.tsx](../app/MobileDrawerDismiss.tsx). If changing drawer markup, ensure the click target still matches `a, button, label` inside `.mobile-drawer`.

Language toggle:
- The drawer language toggle uses `<LanguageToggle compact lang={lang} />` inside `.drawer-card`.
- It must not trigger WhatsApp, nav CTA, or drawer CTA. Keep it as ordinary language links.

## 9. Translation Rules

Language support is in [app/page.tsx](../app/page.tsx):
- `type Lang = "pt" | "en"`
- `translations.pt`
- `translations.en`
- `resolveLang(searchParams)`
- `generateMetadata({ searchParams })`

Every visible copy change must be made in both `translations.pt` and `translations.en`, including:
- `metadata`
- `navLinks`
- header/drawer labels
- hero copy
- review copy
- video proof copy and video labels
- seven-day copy
- experience/process copy
- plan copy
- services copy
- about copy
- gallery copy and labels
- booking form copy
- client proof copy
- offer modal copy
- final CTA and footer
- ARIA labels

Do not ship half-translated UI. Test:
- `/?lang=pt#inicio`
- `/?lang=en#inicio`
- language toggle in desktop header
- language toggle inside mobile drawer

Metadata must use language-specific `title`, `description`, `locale`, `canonical`, and `languages`.

## 10. Review Carousel Rules

Component: [app/ReviewCarousel.tsx](../app/ReviewCarousel.tsx)

Selectors:
- Shell: `.proof-review-shell[data-review-carousel]`
- Track: `.proof-review-grid`
- Card: `.proof-review-card`
- Dots: `.proof-carousel-dots button`
- Stars: `.stars`

Behavior:
- The carousel auto-advances every `4200ms` unless `prefers-reduced-motion: reduce`.
- Dot buttons update `aria-current`.
- On mobile and tablet, `.proof-review-grid` is a horizontal scroll track.
- At `max-width: 620px`, `--review-card-width: min(82vw, 322px)`.

Checks:
- Five stars must remain on one row.
- Dot count must equal review count.
- Scrolling must snap to whole cards.
- No review card should be clipped on the left at `scrollLeft = 0`.
- Generated review images live in:
  - [public/generated/reviews-chatgpt-latest](../public/generated/reviews-chatgpt-latest)
  - [public/generated/reviews-chatgpt-latest-brazilian](../public/generated/reviews-chatgpt-latest-brazilian)

## 11. Video Proof Rules

Stacked reel component: [app/VideoProofStack.tsx](../app/VideoProofStack.tsx)

Selectors:
- Section: `.video-proof-section#video-prova`
- Stack: `.video-proof-stack`
- List: `.video-stack-list`
- Card: `.video-stack-card[data-position="0"]`, `[data-position="1"]`, `[data-position="2"]`
- Video: `.video-stack-card video`
- Label: `.video-card-label`
- Desktop play button: `.video-card-play`
- Controls: `.video-stack-controls button`

Video sources and posters are in `translations[lang].videoProof.videos`.

Current video assets:
- `/instagram/bruna-proof-us-market-hq.mp4`
- `/instagram/bruna-proof-change-thays.mp4`
- `/instagram/bruna-proof-products.mp4`

Current poster assets:
- `/instagram/bruna-video-thumbnail-pt-ai.webp`
- `/instagram/bruna-video-thumbnail-en-ai.webp`
- `/generated/video-covers/change-real-pt-poster-9x16.webp`
- `/generated/video-covers/change-real-en-poster-9x16.webp`
- `/instagram/bruna-DWPUGATCf48.webp`

Behavior:
- Auto-advances every `10000ms` when not playing.
- When user clicks next/previous, current playing video pauses and active index changes.
- Desktop play overlay appears only at `@media (min-width: 981px)`.
- Play overlay must fade out when `.video-stack-card.is-playing` is set.
- Fullscreen video must use `object-fit: contain`.

Checks:
- Mobile keeps `.video-proof-section` as one column at `max-width: 620px`.
- On mobile, `.video-route-graphic` sits near the heading and must not cover the active video or CTA.
- The active poster text must be visible; do not use a 2:3 poster inside the 9:16 video card if it crops key text.

Final proof video:
- Component: [app/ClientProofVideo.tsx](../app/ClientProofVideo.tsx)
- Section: `.client-proof-section`
- Video wrapper: `.client-proof-video`
- Play button: `.client-proof-play`
- Video source: `/instagram/bruna-client-proof-dxsd.mp4`
- Posters:
  - Portuguese: `/generated/client-proof/still-not-convinced-pt-cover.webp`
  - English: `/generated/client-proof/still-not-convinced-en-cover.webp`

## 12. Seven-Day Timeline Rules

Selectors:
- Section: `.seven-day-section#resultados`
- Story: `.growth-story`
- Days wrapper: `.growth-days`
- Day card: `.growth-day`
- Art: `.growth-day-art`
- Connectors: `.growth-connector.connector-one`, `.growth-connector.connector-two`

Current art assets:
- `/generated/seven-day/day-cards/day-1-start-web.webp`
- `/generated/seven-day/day-cards/day-4-light-web.webp`
- `/generated/seven-day/day-cards/day-7-happy-web.webp`

Behavior:
- [app/ViewportSequenceTrigger.tsx](../app/ViewportSequenceTrigger.tsx) triggers animation when `.growth-story` enters view.
- Desktop is horizontal.
- Mobile is vertical with the line centered on `--mobile-line-x: 88px`.

Checks:
- On mobile, the vertical connector line must align with each day image center.
- The line animation should reach Day 4 before Day 4 scales, then reach Day 7 before Day 7 scales.
- Images are allowed to pop out of the card; card dimensions must not change on hover or animation.

## 13. Gallery And Image Rules

Section: `.instagram-gallery#galeria`

Selectors:
- Copy: `.gallery-copy`
- Stats: `.instagram-stat-grid`
- Instagram button: `.gallery-link`
- Board: `.gallery-board`
- Tile: `.gallery-tile.post-card`
- Media: `.post-media`
- Label overlay: `.post-meta`

Current data source:
- `translations[lang].instagramPosts` in [app/page.tsx](../app/page.tsx).

Current gallery image assets:
- `/instagram/bruna-DN8yC6piSg6.webp`
- `/instagram/bruna-DBub_vIOCJj.webp`
- `/instagram/bruna-DXSDviKiT2A.webp`
- `/instagram/bruna-DUYWdDeGDY6.webp`
- `/instagram/bruna-DWPUGATCf48.webp`
- `/instagram/bruna-DUT6B6ElBMC.webp`

Layout:
- Desktop: `.gallery-board` is a 3-column grid, `width: min(100%, 780px)`.
- Mobile at `max-width: 620px`: `.gallery-board` is a 2-column grid, `width: 100%`, `gap: 12px`, `overflow: visible`, `padding: 0`.
- Each tile uses `aspect-ratio: 2 / 3`.

Mobile gallery check:
- At `390px`, `.gallery-board` must stay within x `16` to x `374`.
- No `.gallery-tile` `getBoundingClientRect().right` may exceed `window.innerWidth`.
- Do not restore the old mobile horizontal scroller unless the user explicitly asks. It caused the right-side card to look clipped.

Image rules:
- Use WebP for active site imagery unless the target is social preview metadata.
- Keep active share preview images as static `1200x630` PNG/JPG. Animated GIFs in `app/opengraph-image.gif` and `app/twitter-image.gif` are not reliable for Messages previews.
- Remove unused heavy PNG/JPG duplicates after WebP conversion only after `rg` confirms no references.
- Use `next/image` for normal page images; plain `<img>` is currently used only for simple social SVG icons.

## 14. Booking Rules

Component: [app/BookingScheduler.tsx](../app/BookingScheduler.tsx)

Selectors:
- Section: `.booking-section#agendar`
- Panel: `.booking-panel`
- Desktop picker: `.booking-picker-card`
- Mobile flow: `.booking-mobile-flow`
- Mobile sheet: `.booking-sheet`
- Calendar: `.calendar-card`, `.calendar-grid`, `.calendar-day`
- Time slots: `.booking-slots button`
- Submit: `.booking-submit`

Data:
- Schedule copy and time slots are in `translations[lang].schedule`.
- Current times are `08:00` through `17:00`, matching availability Monday-Friday, 8 AM to 6 PM.
- Past dates and weekends are disabled in `BookingScheduler`.

Desktop layout:
- `.booking-section` is a two-column grid.
- At `max-width: 980px`, still keep booking side-by-side using `grid-template-columns: minmax(210px, 0.44fr) minmax(440px, 1fr)`.
- Do not stack desktop/tablet booking before `max-width: 620px` unless screenshots show no overflow.

Mobile layout:
- At `max-width: 620px`, hide `.booking-copy`, `.booking-panel-head`, `.service-card`, and `.booking-picker-card`.
- Use `.booking-mobile-flow` with sheet pickers.
- `.booking-sheet` must lock background scroll through the `booking-sheet-open` classes on `html` and `body`.
- Sheet panel max height: `calc(100dvh - 24px)`.

Checks:
- User cannot choose a past date.
- User cannot choose Saturday/Sunday.
- If today is selected, times earlier than the current local time are disabled.
- The primary mobile label must stay on one line: `Agende 1 hora gratuita` / `Book free hour`.
- Confirm button remains centered horizontally on mobile.

## 15. Offer Modal Rules

Component: [app/EmailOfferPopup.tsx](../app/EmailOfferPopup.tsx)

Selectors:
- Modal root: `.offer-modal`
- Backdrop: `.offer-backdrop`
- Dialog: `.offer-dialog`
- Close: `.offer-close`
- Image: `.offer-image`
- Form: `.offer-content`

Behavior:
- Opens after `30000ms`.
- Opens immediately with query string `?offer=1`.
- Stores dismissal in `sessionStorage` key `bruna-email-offer-dismissed-v1`.
- Adds `body.offer-scroll-lock` and compensates scrollbar width while open.

Checks:
- Mobile dialog is centered and does not allow background scroll.
- At `max-width: 620px`, `.offer-image` is hidden and `.offer-dialog` is `max-width: calc(100vw - 32px)`.
- Close button must be visible at `390x560`.

## 16. Share Preview And Metadata Rules

Metadata files:
- [app/layout.tsx](../app/layout.tsx) sets `metadataBase` from `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, or `http://localhost:3000`.
- [app/page.tsx](../app/page.tsx) `generateMetadata` sets language-specific canonical URLs, OG tags, Twitter tags, and image paths.
- [app/opengraph-image.png](../app/opengraph-image.png): `1200x630`, current static OG image.
- [app/twitter-image.png](../app/twitter-image.png): `1200x630`, current static Twitter image.
- Alt text files:
  - [app/opengraph-image.alt.txt](../app/opengraph-image.alt.txt)
  - [app/twitter-image.alt.txt](../app/twitter-image.alt.txt)

Required metadata fields:
- `canonical`
- `languages`
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:image:width` = `1200`
- `og:image:height` = `630`
- `twitter:card` = `summary_large_image`
- `twitter:image`

Preview testing:

```bash
URL="https://brunatinoconutri-website.vercel.app"
curl -I -s "$URL" | head -20
curl -L -s "$URL" | rg -o '<meta[^>]+(og:|twitter:)[^>]+'
curl -I -s "$URL/opengraph-image.png" | head -20
```

Expected:
- Page returns `200`, not `401` or `404`.
- OG image returns `200` with an image content type.
- Vercel deployment protection is disabled for the URL being shared.

Messages and WhatsApp cache previews aggressively. If a preview was missing once, retest with:

```text
https://brunatinoconutri-website.vercel.app/?v=6
```

Do not depend on animated GIF previews. Most message apps use a static frame or ignore animation.

## 17. Link And CTA Rules

Primary booking CTA should link to `#agendar`.

WhatsApp:
- Use `whatsappLink` from `getWhatsappLink(lang)`.
- Portuguese message: `Ola, tenho interesse na consultoria nutricional da Bruna Tinoco.`
- English message: `Hi, I am interested in Bruna Tinoco's nutrition coaching.`
- Do not hardcode another WhatsApp URL in JSX.

Instagram:
- General profile links use `https://www.instagram.com/brunatinoconutri/`.
- Video proof reel 01 uses `https://www.instagram.com/p/DXE4thVEcAF/`.
- Video proof reel 02 uses `https://www.instagram.com/p/DW7XXMUEq7C/`.
- Final proof uses `https://www.instagram.com/p/DXSDviKiT2A/`.

External links must include `target="_blank"` and `rel="noreferrer"`.

## 18. Code Editing Rules

- Keep changes scoped. Do not refactor unrelated sections while fixing a crop, spacing, or copy bug.
- Translation changes go in `translations.pt` and `translations.en`.
- Component behavior changes go in the component file, not by injecting script tags.
- CSS changes go in [app/globals.css](../app/globals.css) near the existing selector or relevant media query.
- New section markup belongs in [app/page.tsx](../app/page.tsx), but repeated interactive behavior should be extracted into a client component.
- Do not remove `/* eslint-disable @next/next/no-img-element */` unless all plain `<img>` icons are converted.
- Preserve `next.config.ts` `devIndicators: false` and `turbopack.root = process.cwd()` unless there is a Next.js-specific reason.
- Do not introduce unrelated libraries without checking bundle impact and existing patterns.

## 19. Verification Checklist

Run these before final handoff when possible:

```bash
npm run lint
npx tsc --noEmit
npm run build
git status --short
```

Visual QA:
- Desktop screenshot: `1440x900`.
- Small desktop/tablet screenshot: `1024x768`.
- Mobile screenshot: `390x844`.
- Short mobile drawer test: `390x560`.

Minimum browser checks:
- `/#inicio`: hero CTAs visible; portrait bottom touches hero bottom; no floating gap.
- `/#avaliacoes`: review carousel scrolls; dots update; stars stay horizontal.
- `/#video-prova`: active video card visible; next/previous work; play button hidden on mobile.
- `/#resultados`: timeline line and cards animate in sequence; mobile line aligns to images.
- `/#galeria`: gallery images load; at `390px` no tile extends past right edge.
- `/#agendar`: booking chooses future weekdays only; mobile sheets lock background scroll.
- `/#contato`: final CTA and footer links visible.
- `/?lang=en#inicio`: English copy is not half-translated.

No horizontal overflow check:

```js
({
  innerWidth,
  htmlScrollWidth: document.documentElement.scrollWidth,
  bodyScrollWidth: document.body.scrollWidth,
})
```

Pass condition: both scroll widths equal `innerWidth`.

Metadata check:
- Use the `curl` commands in the Share Preview section against the deployed URL.
- Confirm image status is `200`.

Broken asset check:

```bash
rg -n 'src="|poster=|href="' app
find public app -maxdepth 3 -type f | sort
```

Use browser network panel or Playwright if an image/video is suspect.

## 20. Known Pitfalls From This Repo

- Hero portrait floated when its transparent/shadow area or layout flow created a bottom gap. Fix the actual `.hero-portrait` geometry and asset crop; do not add random hero padding.
- Hero text got squeezed when the portrait or stat cards participated in normal layout flow. Keep visual portrait/stat elements isolated from `.hero-copy`.
- Mobile hero got cluttered when subtitle and stat cards remained visible. Current mobile intentionally hides `.hero-copy p` and `.hero-stat-card`.
- Desktop/small desktop hero cards can cover face or CTA if moved without screenshots. Check `1440x900`, `1024x768`, and `390x844`.
- Gallery was once a mobile horizontal scroller and looked cut off on the right. Current mobile gallery must remain a two-column grid unless explicitly changed.
- 2:3 video thumbnails inside 9:16 video cards cropped important right-side text. Use 9:16 poster assets for video cards.
- Vercel protected deployment URLs returned `401`, so Messages showed no preview. Use the public production alias and disable Deployment Protection for any shared URL.
- Messages/iMessage may cache missing previews. Test with a cache-busting query string.
- Booking originally stacked too early on smaller desktop widths. Keep desktop/tablet booking side-by-side until `max-width: 620px`.
- Drawer must close after link taps. If markup changes, verify [app/MobileDrawerDismiss.tsx](../app/MobileDrawerDismiss.tsx) still finds the interactive element inside `.mobile-drawer`.
- Offer modal and booking sheets must lock background scroll. Verify `body.offer-scroll-lock` and `booking-sheet-open` behavior after modal changes.
- Language toggle should feel instant. Avoid adding slow client-side routing or heavy state around simple language links.
- Social proof numbers are display copy in translations. If follower counts change, update both languages and verify the section still fits.

## 21. Quick Playwright Screenshot Recipe

Use this pattern when browser plugin screenshots are unavailable:

```js
const { chromium } = require("/Users/ericksorto/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/?lang=pt#galeria", { waitUntil: "load" });
await page.locator("#galeria").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.locator("#galeria").screenshot({ path: "/tmp/bruna-gallery-mobile.png" });
await browser.close();
```

For local development, the current project uses:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/?lang=pt#inicio
http://localhost:3000/?lang=en#inicio
```
