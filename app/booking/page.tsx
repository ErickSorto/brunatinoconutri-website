import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import BookingExperience from "./BookingExperience";
import "./booking.css";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };

async function resolveLanguage(searchParams: Props["searchParams"]): Promise<"pt" | "en"> {
  const [params, cookieStore, requestHeaders] = await Promise.all([searchParams, cookies(), headers()]);
  if (params.lang === "pt" || params.lang === "en") return params.lang;
  const saved = cookieStore.get("booking-language")?.value;
  if (saved === "pt" || saved === "en") return saved;
  const languages = (requestHeaders.get("accept-language") || "").split(",")
    .map(value => { const [tag, weight] = value.trim().split(";"); return { tag: tag.toLowerCase().split("-")[0], weight: weight?.startsWith("q=") ? Number(weight.slice(2)) : 1 }; })
    .filter(value => value.weight > 0 && (value.tag === "pt" || value.tag === "en"))
    .sort((a, b) => b.weight - a.weight);
  return languages[0]?.tag === "pt" ? "pt" : "en";
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const en = await resolveLanguage(searchParams) === "en";
  const title = en
    ? "Your free 1-hour consultation | Bruna Tinoco Nutri"
    : "Sua consulta gratuita de 1 hora | Bruna Tinoco Nutri";
  const description = en
    ? "Make space for a healthier routine. Meet Bruna, explore nutrition support that fits your life, and take your first step with a free online consultation."
    : "Uma hora para você, sua rotina e um novo começo. Conheça a Bruna e agende sua consulta online gratuita, no Brasil ou nos Estados Unidos.";
  const url = en ? "/booking?lang=en" : "/booking";
  return {
    title, description,
    alternates: { canonical: url, languages: { "pt-BR": "/booking", "en-US": "/booking?lang=en" } },
    openGraph: { title, description, url, type: "website", siteName: "Bruna Tinoco Nutri", locale: en ? "en_US" : "pt_BR", images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.png"] },
  };
}

export default async function BookingPage({ searchParams }: Props) {
  const lang = await resolveLanguage(searchParams);
  return <BookingExperience initialLang={lang} />;
}
