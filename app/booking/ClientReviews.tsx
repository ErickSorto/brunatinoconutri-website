"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Quote, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import type { Lang } from "./copy";

// Transcribed excerpts from Bruna's supplied screenshots. See docs/booking-reviews.md.
const reviews = [
  { source: "IMG_8040.PNG", topic: ["Comida que você ama", "Food you love"], pt: "Sou muito contente de ter encontrado você Bru, agora eu como de forma mais saudável, mais disposta e não deixo de comer o que amo", en: "I’m so happy I found you, Bru. Now I eat more healthily, have more energy, and still eat what I love." },
  { source: "IMG_8053.PNG", topic: ["Energia para se cuidar", "Energy for yourself"], pt: "Essa dieta me deu muita energia, consigo cuidar de mim, o que nem isso eu conseguia antes.", en: "This eating plan has given me so much energy. I can take care of myself, which I couldn’t even do before." },
  { source: "IMG_8039.PNG", topic: ["Apoio que faz diferença", "Support that matters"], pt: "Muuitoo obrigada, mas nada disso seria possível sem o seu apoio e seu trabalho.. estou mto feliz com tudo que estou conseguindo mudar ..", en: "Thank you so much. None of this would be possible without your support and your work. I’m so happy with everything I’m managing to change." },
  { source: "IMG_8054.PNG", topic: ["Para a vida real", "Made for real life"], pt: "Achei o máximo seu material! Até chocolatinho !!!!! Amei! É isso aí estilo de vida pra sempre!", en: "I thought your material was amazing! Even a little chocolate! I loved it! That’s it—a lifestyle for good!" },
  { source: "IMG_8067.PNG", topic: ["Mais disposição", "Feeling better"], pt: "Depois de nossa dieta e tudo. Eu me sinto tão bem. Leve/dormindo melhor. Mais energia.", en: "After our eating plan and everything, I feel so good. Lighter, sleeping better. More energy." },
];

function ReviewCard({ review, lang, onOpen }: { review: typeof reviews[number]; lang: Lang; onOpen: () => void }) {
  const english = lang === "en";
  return <article className="bk-client-review">
    <div className="bk-client-review-top"><span><MessageCircle size={16} aria-hidden="true" />{english ? "Client message" : "Mensagem de paciente"}</span><Quote aria-hidden="true" size={22} strokeWidth={1.5} /></div>
    <h3>{review.topic[english ? 1 : 0]}</h3>
    <blockquote lang={english ? "en" : "pt-BR"}>“{english ? review.en : review.pt}”</blockquote>
    <button className="bk-review-proof" type="button" onClick={onOpen} aria-label={`${english ? "View original message" : "Ver mensagem original"}: ${review.topic[english ? 1 : 0]}`}>
      <span className="bk-review-screenshot"><Image src={`/reviews/${review.source}`} alt="" fill sizes="(max-width: 760px) 80vw, 340px" /></span>
      <span className="bk-review-proof-label"><span>{english ? "View original message" : "Ver mensagem original"}</span><Expand size={16} aria-hidden="true" /></span>
    </button>
    <div className="bk-review-brand"><Image src="/bruna-logo.webp" alt="Bruna Tinoco Nutri" width={138} height={54} /><small className="bk-review-footnote">{english ? "Translated from Portuguese · Excerpt" : "Relato original · Trecho da mensagem"}</small></div>
  </article>;
}

export default function ClientReviews({ lang }: { lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const goToSlide = (index: number) => {
    const container = track.current;
    const next = Math.max(0, Math.min(reviews.length - 1, index));
    const card = container?.children[next] as HTMLElement | undefined;
    if (container && card) container.scrollTo({ left: card.offsetLeft - (container.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const english = lang === "en";
  const move = (direction: number) => setActive(value => (value + direction + reviews.length) % reviews.length);
  const open = (index: number) => { setActive(index); dialog.current?.showModal(); };
  return <section className="bk-client-reviews" aria-labelledby="client-reviews-heading">
    <div className="bk-review-heading"><Image className="bk-reviews-logo" src="/bruna-logo.webp" alt="Bruna Tinoco Nutri" width={230} height={90} /><p className="bk-eyebrow">{english ? "Messages that mean everything" : "Mensagens que dizem tudo"}</p><h2 id="client-reviews-heading">{english ? "Real care. " : "Cuidado de verdade. "}<em>{english ? "In their words." : "Nas palavras delas."}</em></h2><p>{english ? "Read their stories. See the original messages." : "Leia os relatos. Veja as mensagens originais."}</p></div>
    <div ref={track} className={`bk-client-review-grid${expanded ? " is-expanded" : ""}`} id="booking-client-reviews" onScroll={() => {
      const container = track.current;
      if (!container) return;
      const cards = Array.from(container.children) as HTMLElement[];
      const first = cards[0]?.offsetLeft ?? 0;
      const closest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - first - container.scrollLeft) < Math.abs(cards[best].offsetLeft - first - container.scrollLeft) ? index : best, 0);
      setSlide(closest);
    }}>{reviews.map((review, index) => <ReviewCard key={review.source} review={review} lang={lang} onOpen={() => open(index)} />)}</div>
    <div className="bk-review-carousel-nav" aria-label={english ? "Review carousel" : "Carrossel de relatos"}>
      <button type="button" disabled={slide === 0} onClick={() => goToSlide(slide - 1)} aria-label={english ? "Previous review" : "Relato anterior"}><ChevronLeft size={20} /></button>
      <div className="bk-review-dots">{reviews.map((review, index) => <button key={review.source} type="button" aria-label={`${english ? "Review" : "Relato"} ${index + 1}`} aria-current={slide === index ? "true" : undefined} onClick={() => goToSlide(index)}><span /></button>)}</div>
      <button type="button" disabled={slide === reviews.length - 1} onClick={() => goToSlide(slide + 1)} aria-label={english ? "Next review" : "Próximo relato"}><ChevronRight size={20} /></button>
    </div>
    <div className="bk-review-bottom"><p>{english ? "Shared by Bruna. Names kept private. Individual experiences vary." : "Enviados pela Bruna. Nomes preservados. Cada experiência é individual."}</p><button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="booking-client-reviews">{expanded ? (english ? "Show fewer" : "Ver menos") : (english ? "More client stories" : "Mais histórias") }<ChevronDown aria-hidden="true" size={18} style={{ transform: expanded ? "rotate(180deg)" : undefined }} /></button></div>
    <dialog ref={dialog} className="bk-review-dialog" aria-labelledby="review-gallery-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); }}>
      <div className="bk-review-gallery">
        <header><div><p className="bk-eyebrow">{english ? "Original feedback" : "Relato original"}</p><h3 id="review-gallery-title">{reviews[active].topic[english ? 1 : 0]}</h3></div><button type="button" onClick={() => dialog.current?.close()} aria-label={english ? "Close gallery" : "Fechar galeria"}><X size={22} /></button></header>
        <div className="bk-review-gallery-image" onTouchStart={event => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={event => { if (touchStart.current !== null) { const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1); } touchStart.current = null; }}><Image src={`/reviews/${reviews[active].source}`} alt={reviews[active].pt} fill sizes="(max-width: 760px) 90vw, 700px" /></div>
        <footer><button type="button" onClick={() => move(-1)} aria-label={english ? "Previous message" : "Mensagem anterior"}><ChevronLeft /></button><span aria-live="polite">{active + 1} / {reviews.length} · {english ? "Original in Portuguese" : "Mensagem em português"}</span><button type="button" onClick={() => move(1)} aria-label={english ? "Next message" : "Próxima mensagem"}><ChevronRight /></button></footer>
      </div>
    </dialog>
  </section>;
}
