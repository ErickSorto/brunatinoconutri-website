"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { copy, pathways, type Audience, type Lang } from "./copy";
import LiveCalendar, { type TimeSelection } from "./LiveCalendar";
import ClientReviews from "./ClientReviews";
import USVideoStories from "./USVideoStories";
import { Icon } from "./Icon";
import { scrollVideoIntoView } from "./scrollVideoIntoView";

export type ConsultationDetails = { name: string; email: string; phone: string; language: Lang; goals: number[] };

function CountryMark({ country }: { country: Audience }) {
  return <span className="bk-country-mark" aria-hidden="true"><Image src={`/generated/booking/${country}-icon.webp`} alt="" width={240} height={240} sizes="110px" /></span>;
}

function TrustNotes({ lang }: { lang: Lang }) {
  return <div className="bk-trust-notes"><span><Icon name="check" /><strong>CRN 20101459</strong></span><span><Icon name="globe" />{lang === "pt" ? "Português & English" : "English & Portuguese"}</span><span><Icon name="heart" />{lang === "pt" ? "Cuidado individual" : "One-to-one care"}</span></div>;
}

function ProofVideo({ lang, english }: { lang: Lang; english: boolean }) {
  const t = copy[lang];
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  return <div className={`bk-proof-media${english ? " bk-proof-english" : ""}`}>
    <video ref={video} controls={playing} playsInline preload="none" poster={english ? "/generated/booking/heather-english-cover.webp" : `/generated/client-proof/still-not-convinced-${lang}-cover.webp`} aria-label={t.proofLabel} onPlay={event => { setPlaying(true); scrollVideoIntoView(event.currentTarget); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError(true)}>
      <source src={english ? "/instagram/bruna-heather-english.mp4" : "/instagram/bruna-client-proof-dxsd.mp4"} type="video/mp4" />
    </video>
    {!playing && !error && <button type="button" className="bk-play" aria-label={t.play} onClick={() => { video.current?.play().catch(() => setError(true)); }}><span aria-hidden="true">▶</span><span>{lang === "pt" ? "Ouça essa história" : "Hear her story"}</span></button>}
    {error && <a className="bk-video-error" href={english ? "https://www.instagram.com/p/Ca-_QXkAy91/" : "https://www.instagram.com/p/DXSDviKiT2A/"} target="_blank" rel="noreferrer">{t.videoError}</a>}
    <span className="bk-video-language">{english ? (lang === "en" ? "Client story · In English" : "Depoimento em inglês") : t.proofLang}</span>
  </div>;
}

export default function BookingExperience({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [step, setStep] = useState(0);
  const [languagePreference, setLanguagePreference] = useState<Lang | null>(null);
  const [selection, setSelection] = useState<TimeSelection | null>(null);
  const [audience, setAudience] = useState<Audience>("brazil-us");
  const [details, setDetails] = useState<ConsultationDetails>({ name: "", email: "", phone: "", language: initialLang, goals: [] });
  const [formError, setFormError] = useState(false);
  const [booked, setBooked] = useState(false);
  const [locked, setLocked] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const initial = useRef(true);
  const t = copy[lang];
  const path = pathways[audience][lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url);
    return () => { document.documentElement.lang = "pt-BR"; };
  }, [lang]);

  useEffect(() => {
    if (initial.current) { initial.current = false; return; }
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  useEffect(() => {
    if (languagePreference) document.cookie = `booking-language=${languagePreference}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [languagePreference]);

  function chooseLanguage(language: Lang) {
    setLang(language);
    setDetails(current => ({ ...current, language }));
    setLanguagePreference(language);
  }

  function chooseAudience(value: Audience) {
    setAudience(value);
    setStep(1);
  }

  const detailsReady = details.name.trim().length > 0 && details.name.length <= 100 && details.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()) && (!details.phone.trim() || (/^[+()\d\s.-]{7,30}$/.test(details.phone.trim()) && details.phone.replace(/\D/g, "").length >= 7));

  function submitDetails(event: FormEvent<HTMLFormElement>, confirm: () => void) {
    event.preventDefault();
    if (!detailsReady) { setFormError(true); return; }
    setFormError(false);
    confirm();
  }

  const helpLink = `https://wa.me/5522999595715?text=${encodeURIComponent(lang === "pt" ? "Olá, Bruna! Gostaria de saber mais sobre a consulta gratuita de 1 hora." : "Hi Bruna! I’d like to learn more about your free one-hour consultation in English.")}`;

  return <div className="bk-page" lang={lang === "pt" ? "pt-BR" : "en"}>
    <a className="bk-skip" href="#booking-content">{t.skip}</a>
    <header className="bk-header">
      <Link className="bk-logo" href={lang === "pt" ? "/" : "/?lang=en"} aria-label="Bruna Tinoco Nutri"><Image src="/bruna-logo.webp" alt="Bruna Tinoco Nutri" width={184} height={72} loading="eager" /></Link>
      <span className="bk-header-note"><Icon name="leaf" />{t.footer}</span>
      <div className="bk-header-actions"><div className="bk-language" aria-label={t.language}>{(["pt", "en"] as const).map(value => <button type="button" key={value} onClick={() => chooseLanguage(value)} aria-pressed={lang === value} aria-label={value === "pt" ? "Português" : "English"}><span className="bk-language-flag" aria-hidden="true">{value === "pt" ? "🇧🇷" : "🇺🇸"}</span><span>{value.toUpperCase()}</span></button>)}</div></div>
    </header>

    <nav className="bk-progress" aria-label={t.progress} data-step={step}>
      <div className="bk-journey-track" aria-hidden="true"><span style={{width: `${step / 3 * 100}%`}} /></div>
      {t.steps.map((label, index) => <button type="button" key={index} disabled={index > step || booked || locked} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)} className={index < step ? "is-complete" : ""}><span>{index < step ? <Icon name="check" /> : <Icon name={(["leaf", "heart", "calendar", "message"] as const)[index]} />}</span><span>{label}</span></button>)}
    </nav>

    <main key={step} id="booking-content" className={`bk-main bk-step-${step}`}>
      {step === 0 && <section className="bk-hero bk-enter">
        <div className="bk-hero-intro">
          <div className="bk-hero-copy">
            <p className="bk-eyebrow"><span />{t.hero.kicker}</p>
            <h1 ref={heading} tabIndex={-1}>{t.hero.title}<em>{t.hero.accent}</em></h1>
            <p className="bk-lead">{t.hero.text}</p>
            <div className="bk-offer-line"><span><Icon name="clock" />{t.minutes}</span><span><Icon name="video" />{t.online}</span><strong>{t.free}</strong></div>
            <div className="bk-person-note"><Image src="/bruna-pdf/bruna-hero-grounded.webp" alt="" width={42} height={48} /><span><strong>Bruna Tinoco</strong><small>{t.hero.signature}</small></span><Icon name="check" /></div>
          </div>
          <div className="bk-hero-art">
            <Image className="bk-food-art" src="/generated/booking/nourishment-editorial.webp" alt="" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 60vw" preload />
            <Image className="bk-portrait" src="/generated/booking/bruna-broccoli-sharp.webp" alt="Bruna Tinoco" width={800} height={1589} sizes="(max-width: 760px) 160px, 310px" preload />
            <div className="bk-art-seal"><Icon name="heart" /><span>{lang === "pt" ? <>Comida real.<br />Vida real.</> : <>Real food.<br />Real life.</>}</span></div>
            <span className="bk-handwritten">{lang === "pt" ? "Mais perto de você." : "A little closer to you."}</span>
          </div>
        </div>
        <fieldset className="bk-audiences"><legend>{t.hero.prompt}</legend><div className="bk-audience-options">
          {t.audiences.map((item, index) => <button type="button" key={item.id} onClick={() => chooseAudience(item.id as Audience)} className="bk-audience" style={{ animationDelay: `${160 + index * 90}ms` }}><CountryMark country={item.id as Audience} /><span><strong>{item.title}</strong><small>{item.detail}</small></span><span className="bk-choice-arrow"><Icon name="arrow" /></span></button>)}
        </div></fieldset>
        <p className="bk-assurance"><Icon name="check" />{t.noPayment}</p><TrustNotes lang={lang} />
      </section>}

      {step === 1 && <div className="bk-enter">
        <section className={`bk-experience bk-path-${audience}`}>
          <div className="bk-experience-copy">
            <p className="bk-eyebrow">{path.label}</p>
            <h1 ref={heading} tabIndex={-1}>{lang === "pt" ? "Uma hora." : "One hour."}<em>{lang === "pt" ? "Só para você." : "All about you."}</em></h1>
            <p className="bk-lead">{audience === "international" ? (lang === "en" ? "Meet Bruna, feel heard, and find your next step. Privately, in English." : "Conheça a Bruna e descubra seu próximo passo. Individualmente, em inglês.") : (lang === "pt" ? "Sua rotina, sua comida, suas dúvidas. Vamos encontrar seu próximo passo." : "Your routine, your food, your questions. Let’s find your next step together.")}</p>
            <div className="bk-experience-action"><button type="button" className="bk-primary" onClick={() => setStep(2)}><Icon name="calendar" /><span>{t.start}</span><Icon name="arrow" /></button><p className="bk-assurance">{t.noPayment}</p></div>
          </div>
          <div className="bk-welcome-art"><div className="bk-welcome-food" aria-hidden="true"><Image src="/generated/booking/healthy-food-burst.webp" alt="" fill sizes="(max-width: 760px) 350px, 650px" preload /></div><span className="bk-sixty-stamp"><strong>60</strong><span>{lang === "pt" ? "minutos · grátis" : "minutes · free"}</span></span><Image src="/generated/booking/bruna-welcome-cutout.webp" alt={lang === "pt" ? "Bruna recebe você para uma conversa" : "Bruna welcomes you to a conversation"} width={800} height={1200} sizes="(max-width: 620px) 220px, 480px" preload /><span className="bk-welcome-sign">{lang === "pt" ? "Te espero aqui!" : "See you here!"}<small>Bruna Tinoco</small></span></div>
          <div className="bk-experience-bottom"><span><Icon name="video" />{lang === "pt" ? "Online, pelo Zoom" : "Online, on Zoom"}</span><span><Icon name="heart" />{lang === "pt" ? "Você + Bruna" : "You + Bruna"}</span><span><Icon name="check" />{lang === "pt" ? "100% gratuita" : "Completely free"}</span></div>
        </section>
        {audience === "brazil-us" ? <USVideoStories lang={lang} onBook={() => setStep(2)} /> : <div className="bk-proof-band"><section className="bk-proof-story"><aside className="bk-proof" aria-label={t.proofLabel}><ProofVideo key={audience} lang={lang} english={audience === "international"} /><a className="bk-source" href={audience === "international" ? "https://www.instagram.com/p/Ca-_QXkAy91/" : "https://www.instagram.com/p/DXSDviKiT2A/"} target="_blank" rel="noreferrer">{t.proofSource}<Icon name="video" /></a></aside><div className="bk-proof-story-copy"><p className="bk-eyebrow">{t.proofKicker}</p><h2>{audience === "international" ? (lang === "en" ? "Real support. In her own words." : "Cuidado de verdade. Nas palavras dela.") : t.proofTitle}</h2><p>{lang === "pt" ? "Um cuidado próximo faz diferença. Ouça de quem já viveu essa experiência." : audience === "international" ? "Meet Heather, from Louisiana. Hear her share what working with Bruna has meant to her." : "Personal support makes a difference. Hear a client share her own experience."}</p><TrustNotes lang={lang} /><button type="button" className="bk-primary" onClick={() => setStep(2)}><Icon name="calendar" /><span>{t.start}</span><Icon name="arrow" /></button></div></section></div>}
        <ClientReviews lang={lang} />
        <section className="bk-included bk-food-support"><Image className="bk-food-support-photo" src="/generated/booking/bruna-real-food.webp" alt={lang === "pt" ? "Bruna com uma maçã, cercada de frutas e vegetais frescos" : "Bruna holding an apple, surrounded by fresh fruit and vegetables"} width={1000} height={1250} sizes="(max-width: 760px) 90vw, 440px" /><div className="bk-food-support-copy"><div className="bk-section-heading"><p className="bk-eyebrow">{t.includedKicker}</p><h2>{t.includedTitle}</h2></div><div className="bk-feature-row">{path.features.map(([title, text], index) => <article key={title}><Icon name={index === 0 ? "plate" : index === 1 ? "phone" : "whatsapp"} /><h3>{title}</h3><p>{text}</p></article>)}</div><p className="bk-included-note">{audience === "international" ? (lang === "en" ? "Private consultations in English. Continued individual support is available separately." : "Consulta individual em inglês. Acompanhamento contínuo contratado separadamente.") : t.includedNote}</p></div></section>
        <section className="bk-faq"><div><p className="bk-eyebrow">{t.tinyStep}</p><h2>{t.faqTitle}</h2><p>{t.hero.bottom}</p><button type="button" className="bk-primary" onClick={() => setStep(2)}><Icon name="calendar" /><span>{t.start}</span><Icon name="arrow" /></button></div><div className="bk-faq-list">{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      </div>}

      {step >= 2 && <section className="bk-booking-workspace bk-enter">
        <aside className="bk-consult-summary">
          <Image className="bk-summary-logo" src="/bruna-logo.webp" alt="Bruna Tinoco Nutri" width={230} height={90} />
          <div className="bk-summary-invitation"><p className="bk-eyebrow">{booked ? (lang === "pt" ? "TEMPO RESERVADO PARA VOCÊ" : "TIME SET ASIDE FOR YOU") : (lang === "pt" ? "FALTA POUCO" : "ALMOST THERE")}</p><h2>{lang === "pt" ? "Uma hora só sua." : "An hour just for you."}</h2><p>{lang === "pt" ? "Gratuita, com a Bruna." : "Free, with Bruna."}</p></div>
          <Image className="bk-summary-scene" src="/generated/booking/bruna-consult-complete.webp" alt="Bruna Tinoco sentada ao lado do laptop" width={800} height={1000} sizes="(max-width: 760px) 180px, 330px" />
          <div className="bk-summary-credential"><Icon name="check" />CRN 20101459<span>·</span>{lang === "pt" ? "Online pelo Zoom" : "Online via Zoom"}</div>
        </aside>
        <div className="bk-booking-panel">
          <LiveCalendar lang={lang} audience={audience} details={details} mode={step === 2 ? "pick" : "details"} initialSelection={selection} detailsReady={detailsReady} onContinue={value => { setSelection(value); setStep(3); }} onBack={() => setStep(2)} onBooked={() => setBooked(true)} onLock={setLocked} renderDetails={confirm => <form id="bk-contact-form" onSubmit={event => submitDetails(event, confirm)} className="bk-details-form"><p className="bk-eyebrow">{t.detailsKicker}</p><h1 ref={heading} tabIndex={-1}>{t.detailsTitle}</h1><p className="bk-lead">{t.detailsText}</p>
            <label htmlFor="bk-name">{t.name}<input id="bk-name" name="name" autoComplete="name" required maxLength={100} placeholder={t.namePlaceholder} value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} /></label>
            <label htmlFor="bk-email">{t.email}<input id="bk-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={t.emailPlaceholder} value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} /></label>
            <label htmlFor="bk-phone">{lang === "pt" ? "Telefone / WhatsApp (opcional)" : "Phone / WhatsApp (optional)"}<input id="bk-phone" aria-describedby="bk-phone-hint" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder={lang === "pt" ? "+55 (22) 99999-9999" : "+1 (555) 123-4567"} value={details.phone} onChange={e => setDetails({ ...details, phone: e.target.value })} /></label><p id="bk-phone-hint" className="bk-phone-hint">{lang === "pt" ? "Inclua o código do país." : "Include your country code."}</p>
            <fieldset className="bk-spoken-toggle"><legend>{t.spoken}</legend><div className="bk-spoken-options">{(["pt", "en"] as const).map(language => <label key={language} className="bk-spoken-option"><input type="radio" name="consultation-language" value={language} checked={details.language === language} onChange={() => setDetails(current => ({ ...current, language }))} /><span className="bk-spoken-flag" aria-hidden="true">{language === "pt" ? "🇧🇷" : "🇺🇸"}</span><span lang={language}>{language === "pt" ? "Português" : "English"}</span><span className="bk-spoken-check" aria-hidden="true"><Icon name="check" /></span></label>)}</div></fieldset>
            <details className="bk-extra-details"><summary>{lang === "pt" ? "Personalize sua conversa (opcional)" : "Personalize your conversation (optional)"}<Icon name="chevronRight" /></summary><fieldset className="bk-goals" aria-describedby="bk-goals-hint">
              <legend>{t.goal} <small>({t.optional})</small></legend>
              <p id="bk-goals-hint">{lang === "pt" ? "Escolha uma ou mais opções." : "Choose one or more options."}</p>
              <div className="bk-goal-grid">{t.goals.map((goal, index) => <label className="bk-goal-choice" key={goal}>
                <input type="checkbox" name="goals" value={index} checked={details.goals.includes(index)} onChange={() => setDetails(previous => ({ ...previous, goals: previous.goals.includes(index) ? previous.goals.filter(item => item !== index) : [...previous.goals, index].sort() }))} />
                <span className="bk-goal-art"><Icon name={(["plate", "basket", "heart", "message"] as const)[index]} /></span>
                <span className="bk-goal-label">{goal}</span><span className="bk-goal-check"><Icon name="check" /></span>
              </label>)}</div>
            </fieldset></details>
            {formError && <p className="bk-error" role="alert">{t.required}</p>}<div className="bk-form-actions"><button className="bk-primary" type="submit"><Icon name="calendar" /><span>{t.detailsCta}</span><Icon name="check" /></button></div><p className="bk-privacy">{t.detailsNote}</p>
          </form>} />
        </div>
      </section>}
    </main>
    {step === 1 && <div className="bk-mobile-cta"><span>{t.minutes} · {t.free}</span><button type="button" className="bk-primary" onClick={() => setStep(2)}><Icon name="calendar" /><span>{t.start}</span><Icon name="arrow" /></button></div>}

    <footer className="bk-footer"><span>© {new Date().getFullYear()} Bruna Tinoco Nutri</span><span><Icon name="leaf" />{t.footer}</span><a href={helpLink} target="_blank" rel="noreferrer"><Icon name="whatsapp" />{t.help}</a></footer>
  </div>;
}
