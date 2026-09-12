"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight, CalendarDays, ArrowRight } from "lucide-react";
import { Icon } from "./Icon";
import { scrollVideoIntoView } from "./scrollVideoIntoView";
import type { Lang } from "./copy";

const stories = [
  { id: "da6", src: "/instagram/bruna-da6.mp4", image: "/generated/booking/thays-portrait.webp", href: "https://www.instagram.com/p/Da6T8I3SDlx/", name: "Thays", location: { pt: "Havaí", en: "Hawaii" }, pt: "Uma nova fase. Com apoio.", en: "A new chapter. With support." },
  { id: "market", src: "/instagram/bruna-proof-us-market-hq.mp4", image: "/generated/booking/market-portrait.webp", href: "https://www.instagram.com/p/DXE4thVEcAF/", name: "Brasil → EUA", pt: "Sua comida. Sua nova rotina.", en: "Your food. Your new routine." },
  { id: "dub", src: "/instagram/bruna-dub.mp4", image: "/instagram/bruna-dub-frame.webp", href: "https://www.instagram.com/p/DUbfnvED-rO/", name: "Nina · Flórida", pt: "De perto, mesmo de longe.", en: "Personal care, from afar." },
];

export default function USVideoStories({ lang, onBook }: { lang: Lang; onBook: () => void }) {
  const english = lang === "en";
  const track = useRef<HTMLDivElement>(null);
  const players = useRef<(HTMLVideoElement | null)[]>([]);
  const playbackScroll = useRef<{ index: number; left: number } | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [failed, setFailed] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const alignPlayback = (index: number) => {
    const container = track.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    const card = container.children[index] as HTMLElement;
    const left = Math.min(container.scrollWidth - container.clientWidth, card.offsetLeft - (container.children[0] as HTMLElement).offsetLeft);
    if (Math.abs(container.scrollLeft - left) < 2) return;
    playbackScroll.current = { index, left };
    setSlide(index);
    container.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const go = (index: number) => {
    playbackScroll.current = null;
    const container = track.current;
    if (!container) return;
    const next = Math.max(0, Math.min(stories.length - 1, index));
    const card = container.children[next] as HTMLElement;
    container.scrollTo({ left: card.offsetLeft - (container.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section className="bk-us-stories" aria-labelledby="us-stories-title">
    <div className="bk-us-stories-heading"><p className="bk-eyebrow">{english ? "Brazilian roots. A life in the US." : "Raízes brasileiras. Vida nos EUA."}</p><h2 id="us-stories-title">{english ? "You can feel " : "Você pode se sentir "}<em>{english ? "at home." : "em casa."}</em></h2><p>{english ? "Three stories. Real voices. Discover care that understands your routine." : "Três histórias. Vozes reais. Conheça um cuidado que entende sua rotina."}</p></div>
    <div className="bk-us-video-track" ref={track} onPointerDown={() => { playbackScroll.current = null; }} onWheel={() => { playbackScroll.current = null; }} onScroll={() => {
      const container = track.current;
      if (!container) return;
      // Keep the indicator on the requested card during its playback animation.
      const destination = playbackScroll.current;
      if (destination) {
        setSlide(destination.index);
        if (Math.abs(container.scrollLeft - destination.left) < 2) playbackScroll.current = null;
        return;
      }
      const children = Array.from(container.children) as HTMLElement[];
      const first = children[0].offsetLeft;
      const next = children.reduce((best, child, index) => Math.abs(child.offsetLeft - first - container.scrollLeft) < Math.abs(children[best].offsetLeft - first - container.scrollLeft) ? index : best, 0);
      setSlide(next);
    }}>
      {stories.map((story, index) => <article className="bk-us-video-card" key={story.id}>
        <div className={`bk-us-video-stage${playing === index ? " is-playing" : ""}`}>
          <video ref={node => { players.current[index] = node; }} src={story.src} preload="none" playsInline controls={playing === index} aria-label={english ? story.en : story.pt} onPlay={event => { alignPlayback(index); scrollVideoIntoView(event.currentTarget); players.current.forEach((player, other) => { if (other !== index) player?.pause(); }); setPlaying(index); }} onEnded={() => setPlaying(null)} onError={() => setFailed(index)} />
          {playing !== index && <button type="button" className="bk-us-video-cover" onClick={() => { setFailed(null); players.current[index]?.play().catch(() => setFailed(index)); }} aria-label={`${english ? "Watch" : "Assistir"}: ${english ? story.en : story.pt}`}>
            <Image className="bk-us-cover-art" src="/generated/booking/video-story-art.webp" alt="" fill sizes="(max-width:760px) 85vw, 380px" />
            <span className="bk-us-cover-top"><Image src="/bruna-logo.webp" alt="" width={150} height={59} /><span>{english ? "Real story" : "História real"}</span></span>
            <span className={`bk-us-cover-photo bk-us-cover-${story.id}`}><Image src={story.image} alt="" fill sizes="(max-width:760px) 80vw, 340px" /></span>
            <span className="bk-us-cover-play"><Play size={23} fill="currentColor" aria-hidden="true" /></span>
            <span className="bk-us-cover-title">{english ? story.en : story.pt}</span>
            <span className="bk-us-cover-watch">{english ? "Tap to watch" : "Toque para assistir"}</span>
          </button>}
        </div>
        <div className="bk-us-video-caption"><span>{story.name}{story.location ? ` · ${story.location[lang]}` : ""}</span><a href={story.href} target="_blank" rel="noreferrer" aria-label={`${english ? "Original video" : "Vídeo original"} · ${story.name}`}><Icon name="instagram" /> Instagram</a></div>
        {failed === index && <a className="bk-us-video-error" href={story.href} target="_blank" rel="noreferrer">{english ? "Watch this story on Instagram" : "Assista a esta história no Instagram"}</a>}
      </article>)}
    </div>
    <div className="bk-us-video-nav"><button type="button" disabled={slide === 0} onClick={() => go(slide - 1)} aria-label={english ? "Previous video" : "Vídeo anterior"}><ChevronLeft /></button><span aria-live="polite">{slide + 1} / {stories.length}</span><button type="button" disabled={slide === stories.length - 1} onClick={() => go(slide + 1)} aria-label={english ? "Next video" : "Próximo vídeo"}><ChevronRight /></button></div>
    <div className="bk-us-video-cta"><p>{english ? "Your story can start with a conversation." : "Sua história pode começar com uma conversa."}</p><button type="button" className="bk-primary" onClick={onBook}><CalendarDays /><span>{english ? "I’d like my free hour" : "Quero minha hora gratuita"}</span><ArrowRight /></button><small>{english ? "60 minutes with Bruna · No commitment. Videos in Portuguese." : "60 minutos com a Bruna · Sem compromisso."}</small></div>
  </section>;
}
