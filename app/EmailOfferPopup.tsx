"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type EmailOfferCopy = {
  kicker: string;
  title: string;
  text: string;
  placeholder: string;
  button: string;
  success: string;
  close: string;
  imageAlt: string;
};

const DISMISSED_KEY = "bruna-email-offer-dismissed-v1";

export default function EmailOfferPopup({ copy }: { copy: EmailOfferCopy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const forceOpen = new URLSearchParams(window.location.search).get("offer") === "1";

    if (!forceOpen && window.sessionStorage.getItem(DISMISSED_KEY) === "true") {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), forceOpen ? 700 : 30000);

    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="offer-modal" role="dialog" aria-modal="true" aria-labelledby="offer-title">
      <button className="offer-backdrop" type="button" aria-label={copy.close} onClick={close} />
      <div className="offer-dialog">
        <button className="offer-close" type="button" aria-label={copy.close} onClick={close}>
          <span />
          <span />
        </button>
        <div className="offer-image">
          <Image
            src="/generated/conversion/email-offer-wellness-web.webp"
            alt={copy.imageAlt}
            fill
            sizes="(max-width: 620px) 92vw, 340px"
          />
        </div>
        <form className="offer-content" onSubmit={submit}>
          <p className="section-kicker">{copy.kicker}</p>
          <h2 id="offer-title">{copy.title}</h2>
          <p>{isSubmitted ? copy.success : copy.text}</p>
          {!isSubmitted ? (
            <div className="offer-form-row">
              <input type="email" name="email" placeholder={copy.placeholder} required />
              <button type="submit">{copy.button}</button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
