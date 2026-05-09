"use client";

import { useEffect } from "react";

export default function MobileDrawerDismiss() {
  useEffect(() => {
    const drawer = document.querySelector<HTMLElement>(".mobile-drawer");
    const toggle = document.querySelector<HTMLInputElement>("#mobile-drawer");

    if (!drawer || !toggle) {
      return;
    }

    const dismissDrawer = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactive = target.closest("a, button, label");

      if (!interactive || !drawer.contains(interactive)) {
        return;
      }

      window.requestAnimationFrame(() => {
        toggle.checked = false;
      });
    };

    drawer.addEventListener("click", dismissDrawer);

    return () => {
      drawer.removeEventListener("click", dismissDrawer);
    };
  }, []);

  return null;
}
