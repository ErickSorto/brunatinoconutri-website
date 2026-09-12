/** Bring playback into the usable viewport above the mobile booking bar. */
export function scrollVideoIntoView(video: HTMLVideoElement) {
  const bounds = video.getBoundingClientRect();
  const viewport = window.visualViewport;
  const top = (viewport?.offsetTop ?? 0) + 20;
  const viewportBottom = (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight);
  const sticky = document.querySelector<HTMLElement>(".bk-mobile-cta");
  const stickyBounds = sticky?.getBoundingClientRect();
  const bottom = Math.min(viewportBottom, stickyBounds && stickyBounds.height > 0 ? stickyBounds.top : viewportBottom) - 20;
  if (bounds.top >= top && bounds.bottom <= bottom) return;
  const targetTop = top + Math.max(0, (bottom - top - bounds.height) / 2);
  window.scrollTo({
    top: Math.max(0, window.scrollY + bounds.top - targetTop),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
}
