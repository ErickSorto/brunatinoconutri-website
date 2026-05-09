"use client";

import { useEffect } from "react";

export default function ViewportSequenceTrigger({
  selector,
  className = "is-playing",
}: {
  selector: string;
  className?: string;
}) {
  useEffect(() => {
    const target = document.querySelector(selector);

    if (!target) {
      return;
    }

    let hasStarted = false;
    const start = () => {
      if (hasStarted) {
        return;
      }

      hasStarted = true;
      target.classList.add(className);
    };

    const checkVisibility = () => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.top < viewportHeight * 0.64 && rect.bottom > viewportHeight * 0.28;

      if (visible) {
        start();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0.12) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "-24% 0px -28% 0px", threshold: 0.16 },
    );

    observer.observe(target);
    const visibilityInterval = window.setInterval(checkVisibility, 220);
    const visibilityTimeout = window.setTimeout(() => window.clearInterval(visibilityInterval), 9000);
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      observer.disconnect();
      window.clearInterval(visibilityInterval);
      window.clearTimeout(visibilityTimeout);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [className, selector]);

  return null;
}
