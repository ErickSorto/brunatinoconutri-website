"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import type { Lang } from "./copy";

export default function BookingFeedback({ lang, success, preview }: { lang: Lang; success: boolean; preview: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { panel.current?.focus(); }, []);
  const pt = lang === "pt";
  return createPortal(<div className="bk-booking-feedback" data-success={success}>
    <div className="bk-feedback-panel" ref={panel} tabIndex={-1} onKeyDown={event => { if (event.key === "Tab") event.preventDefault(); }} role="status" aria-live="polite" aria-atomic="true">
      <Image src="/bruna-logo.webp" alt="Bruna Tinoco Nutri" width={230} height={90} />
      <div className="bk-feedback-emblem" aria-hidden="true"><span className="bk-feedback-ring" /><span className="bk-feedback-symbol"><Icon name={success ? "check" : "calendar"} /></span></div>
      <p className="bk-eyebrow">{success ? (preview ? (pt ? "PRÉVIA PRONTA" : "PREVIEW READY") : (pt ? "CONSULTA CONFIRMADA" : "YOU’RE BOOKED")) : (pt ? "RESERVANDO SEU HORÁRIO" : "RESERVING YOUR TIME")}</p>
      <h2>{success ? (pt ? "Obrigada pela confiança." : "Thank you for your trust.") : (pt ? "Um instante, só seu." : "A moment, just for you.")}</h2>
      <p>{success ? (pt ? "A Bruna te espera. Até breve!" : "Bruna looks forward to meeting you.") : (pt ? "Estamos preparando sua consulta." : "We’re arranging your consultation.")}</p>
      <span className="bk-feedback-progress" aria-hidden="true" />
    </div>
  </div>, document.querySelector(".bk-page") || document.body);
}
