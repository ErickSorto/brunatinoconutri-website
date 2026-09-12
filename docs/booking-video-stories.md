# Brazilian-in-US booking video carousel

Only audience `brazil-us` uses USVideoStories; other audiences retain the original proof video. Three videos supplied/requested by the user:

- https://www.instagram.com/p/Da6T8I3SDlx/ — Thays, 57.7 seconds. Local `public/instagram/bruna-da6.mp4`.
- https://www.instagram.com/p/DXE4thVEcAF/ — homepage pink workout / kitchen video, reused `public/instagram/bruna-proof-us-market-hq.mp4`.
- https://www.instagram.com/p/DUbfnvED-rO/ — Nina, Florida, 40.5 seconds. Local `public/instagram/bruna-dub.mp4`.

New videos retrieved from the rendered Instagram media resources, combining video and audio tracks, encoding H.264/AAC for browser compatibility. Source links remain available. No auto-playing carousel. Play is user initiated; starting another video pauses the first. Mobile uses scroll snap and previous/next controls. The free-hour button advances to the consultation form. The site homepage itself was not changed.

Thumbnails combine actual frames, HTML text/logo/play controls, and one shared generated background: `public/generated/booking/video-story-art.webp`. Frames are not regenerated client portraits. Generated via built-in image_gen, source `exec-91a3c11b-8f73-4ca1-bd5d-d70139c3ca27.png`.

Prompt: Create a premium editorial background artwork for a Brazilian nutritionist's video testimonial thumbnail series. Portrait 2:3 composition. Warm eggshell #fff8ed paper, soft sage-green organic shapes with a sophisticated forest-green botanical border, tiny restrained gold accents, beautifully photographed fresh lime, avocado, leafy greens and a delicate tropical palm shadow at the very outer edges. Large completely clean light cream center reserved for overlaying a real client's photo and typography later. Elegant wellness magazine, polished Brazilian warmth, tactile subtle paper, beautiful natural daylight. No people, no faces, no text, no logo, no play buttons, no flags. Art should feel optimistic and refined, not busy; keep food confined to corners.

## English consultation: Heather

- Source: https://www.instagram.com/p/Ca-_QXkAy91/
- Heather, Louisiana, USA (identified in the original caption).
- Original English video with its existing Portuguese subtitles: `/instagram/bruna-heather-english.mp4`, 720×1280, H.264/AAC, 166 seconds. No changes to the testimonial content.
- Cover: `/generated/booking/heather-english-cover.webp`, generated with the built-in image generation tool from a frame of Heather. Used only for the international consultation pathway; source link and English video label included.
- Prompt: Create a premium editorial vertical 2:3 testimonial cover for Bruna Tinoco’s English consultation website. Preserve Heather’s identity, age and natural appearance from the reference; improve clarity, remove the old frame/subtitles/watermark. Ivory background, forest typography, arched sage portrait panel, subtle botanical shadows and gold details. Text: CLIENT STORIES / Meet Heather. / Louisiana, USA. Quiet dark lower area for the website play control. No invented quotes, ratings, health results or claims.
- Validation: TypeScript and ESLint passed; browser playback advanced with 720×1280 video and audio stream present; mobile cover reviewed. Full video is contained without cropping while playing.

### Heather cover expression refinement
Built-in image generation edit, replacing `public/generated/booking/heather-english-cover.webp`.
Prompt: Change only the facial pose to a more upright head, direct eye contact, relaxed eyebrows and gentle closed-mouth smile. Preserve Heather’s identity, age, skin texture, blonde bob, black shirt, typography and all existing cover design elements. No excessive smoothing or exaggerated grin.

### Thays thumbnail refinement
- Built-in Image Gen portrait saved as `public/generated/booking/thays-portrait.webp`, based on a frame at 12 seconds of the original video.
- Prompt: Preserve Thays’s identity, age, dark hair, gold earrings and red top. Natural upright upper-torso portrait, relaxed direct eye contact and gentle closed-mouth smile, realistic skin, warm ivory blurred background. Remove subtitles and distractions; no text.
- All carousel cover titles now use warm gold (#efd598) on an opaque forest panel (#243b2b), contrast 8.44:1. Small watch labels remain ivory. Original videos are unchanged.

### Lighter captions and complete head framing
Replaced the solid green footer with a soft ivory gradient, forest lettering and a fine gold divider. Reduced the photo corner radius and aligned Thays’s portrait to the top to preserve her hair.
Pink-workout cover portrait: `public/generated/booking/market-portrait.webp`, generated using built-in Image Gen. Prompt: tasteful head-and-shoulders portrait of the same adult woman, preserving facial identity, skin tone, tied-back hair and earrings; simple pink athletic T-shirt, friendly expression, natural light, warm ivory background, generous headroom, no text or graphics. Original video is unchanged.
