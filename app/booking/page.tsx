import type { Metadata } from "next";
import BookingExperience from "./BookingExperience";
import "./booking.css";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const en = (await searchParams).lang === "en";
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
  const lang = (await searchParams).lang === "en" ? "en" : "pt";
  return <BookingExperience initialLang={lang} />;
}
