"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { copy, type Audience, type Lang } from "./copy";
import type { ConsultationDetails } from "./BookingExperience";
import { Icon } from "./Icon";

type Confirmation = { status: "confirmed"; startsAt: string; endsAt: string; joinUrl: string; reference: string };
type LoadState = { status: "loading" | "ready" | "error"; slots: string[]; error: string; demo?: boolean };
const zones = ["America/New_York", "America/Chicago", "America/Denver", "America/Phoenix", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu", "America/Sao_Paulo", "America/Manaus", "America/Rio_Branco", "Europe/Lisbon", "Europe/London"];
const dateKey = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  return ["year", "month", "day"].map(type => parts.find(part => part.type === type)?.value).join("-");
};
const ui = {
  pt: { zone: "Seu fuso horário", previous: "Mês anterior", next: "Próximo mês", chooseDay: "Escolha uma data para ver os horários.", chooseTime: "Horários disponíveis", noSlots: "Nenhum horário livre neste mês. Veja o próximo mês ou fale com a Bruna.", retry: "Tentar novamente", loadError: "Não foi possível consultar a agenda agora.", unavailableDay: "sem horários disponíveis", selected: "Sua consulta", confirm: "Confirmar minha hora gratuita", confirming: "Reservando e criando seu link Zoom…", emailNote: "Ao confirmar, seu nome e e-mail serão usados para enviar o convite da consulta pelo Google Calendar. O link Zoom estará no convite.", bookedTitle: "Seu novo começo está marcado.", bookedText: "Sua consulta foi reservada. O Google Calendar enviará o convite para", join: "Abrir minha sala Zoom", download: "Adicionar ao meu calendário (.ics)", reschedule: "Preciso remarcar ou cancelar", reference: "Referência", conflict: "Esse horário acabou de ficar indisponível. Escolha outro horário.", pending: "Precisamos conferir sua reserva. Não faça uma nova solicitação: fale com a Bruna usando o botão abaixo para confirmar o horário.", submitError: "Não foi possível concluir a reserva. Tente novamente; se a conexão caiu, conferiremos a mesma solicitação antes de criar outra.", weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] },
  en: { zone: "Your time zone", previous: "Previous month", next: "Next month", chooseDay: "Choose a date to see available times.", chooseTime: "Available times", noSlots: "No open times this month. Try next month or contact Bruna.", retry: "Try again", loadError: "We couldn’t check the calendar right now.", unavailableDay: "no available times", selected: "Your consultation", confirm: "Confirm my free hour", confirming: "Reserving your time and creating your Zoom link…", emailNote: "By confirming, your name and email will be used to send your consultation invitation through Google Calendar. Your Zoom link will be included.", bookedTitle: "Your fresh beginning is booked.", bookedText: "Your consultation is reserved. Google Calendar will send the invitation to", join: "Open my Zoom room", download: "Add to my calendar (.ics)", reschedule: "Reschedule or cancel", reference: "Reference", conflict: "That time has just become unavailable. Please choose another time.", pending: "We need to check your reservation. Please don’t make another request: contact Bruna below to confirm your time.", submitError: "We couldn’t complete your booking. Try again; if the connection dropped, we’ll check the same request before creating another.", weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
} as const;

export default function LiveCalendar({ lang, audience, details, onBack, onBooked, onLock }: { lang: Lang; audience: Audience; details: ConsultationDetails; onBack: () => void; onBooked: () => void; onLock: (locked: boolean) => void }) {
  const t = copy[lang], c = ui[lang];
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const [timeZone, setTimeZone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York");
  const [month, setMonth] = useState(() => dateKey(new Date(), timeZone).slice(0, 7));
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [data, setData] = useState<LoadState>({ status: "loading", slots: [], error: "" });
  const [reload, setReload] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [demoConfirmed, setDemoConfirmed] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [uncertain, setUncertain] = useState(false);
  const [uncertainId, setUncertainId] = useState("");
  const [openedAt] = useState(() => Date.now());
  const request = useRef<{ id: string; payload: string } | null>(null);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
  

  if (confirmation) return;
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 20_000);
    let active = true;
    fetch(`/api/booking/availability?${new URLSearchParams({ month, timeZone })}`, { signal: abort.signal, cache: "no-store" })
      .then(async response => { const body = await response.json(); if (!response.ok) throw new Error(body.error || "provider_unavailable"); return body; })
      .then(body => { if (active) setData({ status: "ready", slots: body.slots, error: "", demo: body.demo === true }); })
      .catch(error => { if (active) setData({ status: "error", slots: [], error: error instanceof Error ? error.message : "provider_unavailable" }); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); abort.abort(); };
  }, [month, timeZone, reload, confirmation]);

  useEffect(() => { if (confirmation || demoConfirmed) confirmationHeading.current?.focus(); }, [confirmation, demoConfirmed]);
  useEffect(() => { onLock(submitting || uncertain); }, [submitting, uncertain, onLock]);

  const availableByDay = useMemo(() => {
    const result: Record<string, string[]> = {};
    data.slots.forEach(value => { const key = dateKey(new Date(value), timeZone); (result[key] ||= []).push(value); });
    return result;
  }, [data.slots, timeZone]);
  const [year, monthNumber] = month.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const currentMonth = dateKey(new Date(openedAt), timeZone).slice(0, 7);
  const lastMonth = dateKey(new Date(openedAt + 90 * 86400000), timeZone).slice(0, 7);
  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, monthNumber - 1, 1)));
  const formatFull = (value: string) => new Intl.DateTimeFormat(locale, { dateStyle: "full", timeStyle: "short", timeZone }).format(new Date(value));
  const formatTime = (value: string) => new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone }).format(new Date(value));
  const helpIntro = confirmation ? (lang === "pt" ? `Olá, Bruna! Preciso remarcar ou cancelar minha consulta. Referência: ${confirmation.reference}. Data: ${confirmation.startsAt}.` : `Hi Bruna! I need to reschedule or cancel my consultation. Reference: ${confirmation.reference}. Date: ${confirmation.startsAt}.`) : (lang === "pt" ? "Olá, Bruna! Quero combinar minha consulta gratuita de 1 hora." : "Hi Bruna! I’d like to arrange my free one-hour consultation.");
  const helpMessage = [helpIntro, `${details.name} · ${details.email}`, `Phone / WhatsApp: ${details.phone}`, ...(details.goals.length ? [`${lang === "pt" ? "Interesses" : "Interests"}: ${details.goals.map(goal => t.goals[goal]).join("; ")}`] : []), details.language === "pt" ? "Idioma: português" : "Language: English", ...(uncertainId ? [`Booking request to check: ${uncertainId}`, slot] : [])].join("\n");
  const helpLink = `https://wa.me/5522999595715?text=${encodeURIComponent(helpMessage)}`;

  function changeMonth(direction: number) {
    const next = new Date(Date.UTC(year, monthNumber - 1 + direction, 1));
    setMonth(`${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`);
    setDay(""); setSlot(""); setSubmitError(""); setData({ status: "loading", slots: [], error: "" });
  }

  async function reserve() {
    if (!slot || submitting || uncertain) return;
    if (data.demo) { setDemoConfirmed(true); return; }
    const body = { ...details, name: details.name.trim(), email: details.email.trim(), audience, startsAt: slot, timeZone };
    const payload = JSON.stringify(body);
    if (request.current?.payload !== payload) request.current = { id: crypto.randomUUID(), payload };
    setSubmitting(true); setSubmitError("");
    try {
      const response = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, requestId: request.current.id }), signal: AbortSignal.timeout(65_000) });
      const result = await response.json();
      if (!response.ok) {
        if (result.error === "slot_taken") { setSlot(""); setReload(value => value + 1); throw new Error(c.conflict); }
        if (result.error === "needs_attention") { setUncertainId(request.current.id); setUncertain(true); throw new Error(c.pending); }
        throw new Error(c.submitError);
      }
      if (result.status !== "confirmed" || !result.joinUrl) throw new Error(c.submitError);
      setConfirmation(result); onBooked();
    } catch (error) { setSubmitError(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : c.submitError); }
    finally { setSubmitting(false); }
  }

  if (demoConfirmed || confirmation) {
    const startsAt = confirmation?.startsAt || slot;
    const pt = lang === "pt";
    const preview = !confirmation;
    return <section className="bk-success">
      
      <div className="bk-success-hero"><div className="bk-success-greeting"><p className="bk-eyebrow">{preview ? (pt ? "PRÉVIA DA CONFIRMAÇÃO" : "CONFIRMATION PREVIEW") : (pt ? "CONSULTA CONFIRMADA" : "CONSULTATION CONFIRMED")}</p><h2 ref={confirmationHeading} tabIndex={-1}>{pt ? "Te espero" : "See you"}<em>{pt ? "em breve." : "soon."}</em></h2><span className="bk-success-signature">Bruna Tinoco</span></div><Image className="bk-success-portrait" src="/generated/booking/bruna-professional-cutout.webp" alt="Bruna Tinoco" width={643} height={1429} sizes="(max-width:760px) 190px, 280px" /></div>
      <div className="bk-success-appointment"><span className="bk-success-date"><strong>{new Intl.DateTimeFormat(locale, { day: "numeric", timeZone }).format(new Date(startsAt))}</strong>{new Intl.DateTimeFormat(locale, { month: "short", timeZone }).format(new Date(startsAt))}</span><div><strong>{new Intl.DateTimeFormat(locale, { weekday: "long", timeZone }).format(new Date(startsAt))} · {formatTime(startsAt)}</strong><p>Bruna Tinoco · {t.minutes}</p><span><Icon name="video" />Zoom <span>·</span> {timeZone.replaceAll("_", " ")}</span></div></div>
      <div className="bk-success-inbox"><Icon name="mail" /><p>{preview ? (pt ? "Demonstração — nenhum convite enviado." : "Demo — no invitation sent.") : (pt ? "E-mail e convite do calendário enviados." : "Email and calendar invitation sent.")}<span>{details.email}</span></p></div>
      {!preview && <p className="bk-success-note">{pt ? "Seu link Zoom está no convite. Até breve!" : "Your Zoom link is in the invitation. See you soon!"}</p>}
      <div className="bk-success-contact"><h3>{pt ? "Ficou com alguma dúvida?" : "Any other questions?"}</h3><p>{pt ? "Fale com a Bruna por aqui." : "Reach out to Bruna here."}</p><div className="bk-success-socials"><a href={`https://wa.me/5522999595715?text=${encodeURIComponent(pt ? "Olá, Bruna! Tenho uma dúvida sobre a consulta." : "Hi Bruna! I have a question about the consultation.")}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" />WhatsApp</a><a href="https://www.instagram.com/brunatinoconutri/" target="_blank" rel="noreferrer"><Icon name="instagram" />Instagram</a></div></div>
    </section>;
  }

  return <div className="bk-live-calendar">
    <p className="bk-calendar-intro">{data.demo ? (lang === "pt" ? "Modo demonstração: escolha uma data e um horário para testar. Nenhuma reserva real será feita." : "Demo mode: choose a date and time to try the flow. No real booking will be made.") : data.error === "not_configured" ? t.noPayment : (lang === "pt" ? "Horários da Bruna em tempo real. Escolha o seu e receba o convite com o link Zoom." : "Bruna’s availability, in real time. Choose your time and receive an invitation with your Zoom link.")}</p>
    {data.status === "error" && data.error === "not_configured" ? <div className="bk-calendar-unavailable"><div className="bk-calendar-preview" aria-label={lang === "pt" ? "Calendário — agendamento online indisponível no momento" : "Calendar — online scheduling currently unavailable"}><div className="bk-month"><Icon name="calendar" /><strong>{monthLabel}</strong></div><div className="bk-calendar-grid">{c.weekdays.map(label => <span key={label} className="bk-weekday">{label}</span>)}{Array.from({length: firstWeekday}, (_, index) => <span key={`empty-${index}`} />)}{Array.from({length: daysInMonth}, (_, index) => <button key={index} type="button" className="bk-day" disabled aria-label={`${index + 1} ${monthLabel} — ${lang === "pt" ? "agendamento indisponível" : "scheduling unavailable"}`}>{index + 1}</button>)}</div><div className="bk-time-empty bk-time-offline"><Icon name="clock" /><strong>{c.chooseTime}</strong><p>{lang === "pt" ? "Os horários aparecerão aqui quando a agenda estiver disponível." : "Times will appear here when online scheduling is available."}</p><span>{t.minutes} · Zoom</span></div><p className="bk-calendar-preview-note">{lang === "pt" ? "Agendamento online indisponível no momento." : "Online scheduling is currently unavailable."}</p></div><h2>{t.unavailableTitle}</h2><p>{t.unavailableText}</p><dl className="bk-request-summary"><div><dt>{lang === "pt" ? "Nome" : "Name"}</dt><dd>{details.name}</dd></div><div><dt>E-mail</dt><dd>{details.email}</dd></div><div><dt>{lang === "pt" ? "Idioma" : "Language"}</dt><dd>{details.language === "pt" ? t.portuguese : t.english}</dd></div>{details.goals.length > 0 && <div><dt>{lang === "pt" ? "Interesses" : "Interests"}</dt><dd>{details.goals.map(goal => t.goals[goal]).join(" · ")}</dd></div>}</dl><p className="bk-privacy">{t.shareNote}</p><a className="bk-primary" href={helpLink} target="_blank" rel="noreferrer"><Icon name="whatsapp" /><span>{t.contact}</span></a><p className="bk-privacy">{t.contactNote}</p><button type="button" className="bk-back" onClick={onBack}>← {t.edit}</button></div> : <>
      <label className="bk-timezone" htmlFor="bk-timezone"><Icon name="globe" />{c.zone}<select id="bk-timezone" disabled={submitting || uncertain} value={timeZone} onChange={event => { setTimeZone(event.target.value); setDay(""); setSlot(""); setData({ status: "loading", slots: [], error: "" }); }}>{[...new Set([timeZone, ...zones])].map(zone => <option key={zone} value={zone}>{zone.replaceAll("_", " ").replaceAll("/", " / ")}</option>)}</select></label>
      <div className="bk-picker-layout"><div className="bk-calendar-shell" aria-busy={data.status === "loading"}><div className="bk-month"><button type="button" onClick={() => changeMonth(-1)} disabled={month <= currentMonth || submitting || uncertain} aria-label={c.previous}><Icon name="chevronLeft" /></button><strong aria-live="polite">{monthLabel}</strong><button type="button" onClick={() => changeMonth(1)} disabled={month >= lastMonth || submitting || uncertain} aria-label={c.next}><Icon name="chevronRight" /></button></div>
        {data.status === "loading" ? <div className="bk-calendar-status" role="status"><span className="bk-spinner" />{t.loading}</div> : data.status === "error" ? <div className="bk-calendar-status" role="alert"><div><p>{c.loadError}</p><button type="button" className="bk-back" onClick={() => { setData({ status: "loading", slots: [], error: "" }); setReload(value => value + 1); }}>{c.retry}</button><a className="bk-source" href={helpLink} target="_blank" rel="noreferrer">{t.help} ↗</a></div></div> : <><div className="bk-calendar-grid" role="group" aria-label={monthLabel}>{c.weekdays.map(value => <span className="bk-weekday" key={value}>{value}</span>)}{Array.from({ length: firstWeekday }, (_, index) => <span key={`blank-${index}`} />)}{Array.from({ length: daysInMonth }, (_, index) => { const key = `${month}-${String(index + 1).padStart(2, "0")}`; const available = Boolean(availableByDay[key]?.length); const label = new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" }).format(new Date(Date.UTC(year, monthNumber - 1, index + 1))); return <button type="button" className="bk-day" key={key} disabled={!available || submitting || uncertain} aria-label={`${label}${available ? "" : `, ${c.unavailableDay}`}`} aria-pressed={day === key} onClick={() => { setDay(key); setSlot(""); setSubmitError(""); }}>{index + 1}</button>; })}</div>{!data.slots.length && <p className="bk-calendar-intro" role="status">{c.noSlots}</p>}</>}
      </div>
      {data.status === "ready" && (day && availableByDay[day]?.length ? <fieldset className="bk-times" disabled={submitting || uncertain}><legend><Icon name="clock" />{c.chooseTime}</legend><p className="bk-chosen-day">{new Intl.DateTimeFormat(locale, { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${day}T12:00:00Z`))}</p><div className="bk-time-grid">{availableByDay[day].map(value => <button type="button" key={value} aria-pressed={value === slot} onClick={() => { setSlot(value); setSubmitError(""); }}><Icon name={value === slot ? "check" : "clock"} />{formatTime(value)}</button>)}</div></fieldset> : <div className="bk-time-empty"><Icon name="clock" /><strong>{c.chooseTime}</strong><p>{c.chooseDay}</p><span>{t.minutes} · Zoom</span></div>)}</div>
      {slot && <div className="bk-selected-summary"><span>{c.selected}</span><strong>{formatFull(slot)}</strong>{t.minutes} · Zoom · {t.free}<br />{timeZone}</div>}
      {submitError && <p className="bk-error" role="alert">{submitError}</p>}
      {uncertain ? <a className="bk-primary" href={helpLink} target="_blank" rel="noreferrer">{t.help}<Icon name="arrow" /></a> : <button type="button" className="bk-primary bk-calendar-submit" disabled={!slot || submitting || data.status !== "ready"} onClick={reserve}><Icon name="calendar" /><span>{submitting ? c.confirming : data.demo ? (lang === "pt" ? "Testar meu agendamento" : "Preview my booking") : c.confirm}</span><Icon name="check" /></button>}
      <p className="bk-privacy">{data.demo ? (lang === "pt" ? "Demonstração local · sem e-mail ou reunião Zoom." : "Local preview · no email or Zoom meeting.") : c.emailNote}</p><button type="button" className="bk-back" onClick={onBack} disabled={submitting || uncertain}>← {t.back}</button>
    </>}
  </div>;
}
