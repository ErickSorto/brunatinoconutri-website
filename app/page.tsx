/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import ViewportSequenceTrigger from "./ViewportSequenceTrigger";

const whatsappLink = "#contato";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/brunatinoconutri/",
    icon: "/social-icons/instagram-white.svg",
    iconDark: "/social-icons/instagram-green.svg",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/brunatinoconutri",
    icon: "/social-icons/facebook-white.svg",
    iconDark: "/social-icons/facebook-green.svg",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@brunatinoconutri",
    icon: "/social-icons/youtube-white.svg",
    iconDark: "/social-icons/youtube-green.svg",
  },
];

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Planos", href: "#planos" },
  { label: "Avaliacoes", href: "#avaliacoes" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

const plans = [
  {
    name: "Gold",
    duration: "03 meses",
    rhythm: "Trimestral",
    brl: "R$ 2.000",
    usd: "$375",
    note: "Para organizar rotina, escolhas e constancia com direcao clara.",
    features: [
      "Plano alimentar individualizado",
      "Suplementacao orientada",
      "Aplicativo do paciente",
      "Suporte via WhatsApp",
    ],
  },
  {
    name: "Diamond",
    duration: "06 meses",
    rhythm: "Semestral",
    brl: "R$ 3.200",
    usd: "$600",
    note: "Para quem quer mais tempo de ajuste, suporte e acompanhamento.",
    featured: true,
    features: [
      "Tudo do Gold",
      "Rastreamento metabolico",
      "Check-up quinzenal",
      "Ajustes de plano e rotina",
    ],
  },
  {
    name: "Platinum",
    duration: "12 meses",
    rhythm: "Anual",
    brl: "R$ 5.000",
    usd: "$940",
    note: "A jornada mais completa para sustentar mudancas com tranquilidade.",
    features: [
      "Tudo do Diamond",
      "Encontros semanais em grupo",
      "Desafio interno",
      "Guias e playlist anti-estresse",
    ],
  },
];

const timeline = [
  {
    label: "Questionario",
    text: "Rotina, metas e preferencias.",
    icon: "clipboard",
  },
  {
    label: "Plano no app",
    text: "Cardapio e tarefas claros.",
    icon: "apple",
  },
  {
    label: "Check-ins",
    text: "Ajustes por fome, sono e evolucao.",
    icon: "message",
  },
];

const reviews = [
  {
    name: "Paciente online",
    meta: "Rotina ocupada",
    image: "/generated/reviews-chatgpt-latest/001-use-case-photorealistic-natural-asset-type-website-review-ca-web.png",
    quote:
      "O plano ficou simples de seguir e eu finalmente entendi como adaptar a alimentacao ao meu dia.",
  },
  {
    name: "Brasileira nos EUA",
    meta: "Plano Diamond",
    image: "/generated/reviews-chatgpt-latest/002-use-case-photorealistic-natural-asset-type-website-review-ca-web.png",
    quote:
      "As substituicoes com produtos americanos deixaram tudo mais pratico, sem aquela sensacao de dieta impossivel.",
  },
  {
    name: "Paciente BT",
    meta: "Acompanhamento",
    image: "/generated/reviews-chatgpt-latest-brazilian/003-brazilian-review-model-web.png",
    quote:
      "Foi acolhimento e organizacao. Eu sabia o que fazer na semana e quando pedir ajuste.",
  },
];

const serviceItems = [
  {
    title: "Plano individual",
    text: "Alimentacao e suplementacao para sua rotina.",
    icon: "apple",
  },
  {
    title: "Metabolismo monitorado",
    text: "Rastreamento mensal com direcao clara.",
    icon: "trend",
  },
  {
    title: "Check-ins quinzenais",
    text: "Ajustes rapidos para manter progresso.",
    icon: "calendar",
  },
  {
    title: "App + WhatsApp",
    text: "Tudo organizado com suporte proximo.",
    icon: "message",
  },
  {
    title: "Produtos dos EUA",
    text: "Guia simples para compras saudaveis.",
    icon: "clipboard",
  },
  {
    title: "Grupo e desafio BT",
    text: "Comunidade para constancia sem pressao.",
    icon: "heart",
  },
];

const heroBannerItems = [
  { icon: "clipboard", label: "Questionario Otimizado BT" },
  { icon: "calendar", label: "Plano individual em ate 07 dias uteis" },
  { icon: "message", label: "Produtos dos EUA e suporte WhatsApp" },
];

const sevenDayResults = [
  {
    day: "Dia 1",
    title: "Direcao",
    text: "Plano claro, compras simples e primeira rotina sem improviso.",
    art: "/generated/seven-day/day-cards/day-1-start-web.png",
  },
  {
    day: "Dia 4",
    title: "Leveza",
    text: "Fome mais previsivel, energia melhor e menos vontade de desistir.",
    art: "/generated/seven-day/day-cards/day-4-light-web.png",
  },
  {
    day: "Dia 7",
    title: "Clareza",
    text: "Voce ja entende o caminho e sente resultado suficiente para continuar.",
    art: "/generated/seven-day/day-cards/day-7-happy-web.png",
  },
];

const iconPaths = {
  apple:
    "M12 7.2c-1.7-2.1-5.7-1.5-6.9 1.6-1.4 3.5.8 8.9 3.7 11 .9.7 1.7.5 2.7.1.8-.3 1.6-.3 2.4 0 1 .4 1.8.5 2.8-.2 2.7-1.9 4.3-5.9 3.6-9.1-.6-2.6-3.5-4.3-5.6-2.5Zm.2-.4c.1-2.4 1.7-4.2 4-4.8.2 2.4-1.6 4.3-4 4.8Z",
  calendar:
    "M7 3v3m10-3v3M4.5 9.2h15M6.2 5h11.6A2.2 2.2 0 0 1 20 7.2v10.6a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.8V7.2A2.2 2.2 0 0 1 6.2 5Zm2.6 8h.1m3.1 0h.1m3.1 0h.1m-6.5 3h.1m3.1 0h.1",
  check:
    "m5 12.4 4.1 4.1L19 6.8",
  clipboard:
    "M9 4.8A2.2 2.2 0 0 1 11.2 3h1.6A2.2 2.2 0 0 1 15 4.8h1.7A2.3 2.3 0 0 1 19 7.1v10.6a2.3 2.3 0 0 1-2.3 2.3H7.3A2.3 2.3 0 0 1 5 17.7V7.1a2.3 2.3 0 0 1 2.3-2.3H9Zm.2 0h5.6M8.5 10h7m-7 3.4h5.3",
  heart:
    "M12 20s-7-4.4-8.7-9.1C2.2 7.8 4.2 5 7.2 5c1.7 0 3 .9 4.8 2.8C13.8 5.9 15.1 5 16.8 5c3 0 5 2.8 3.9 5.9C19 15.6 12 20 12 20Z",
  leaf:
    "M20 4C12 4.2 6.6 8.8 5.2 16.4c4.7.4 10.5-1.3 14.8-12.4ZM5 20c2.1-5 5.3-8.1 9.6-10",
  message:
    "M5.8 5h12.4A2.8 2.8 0 0 1 21 7.8v6.4a2.8 2.8 0 0 1-2.8 2.8H12l-4.6 3v-3H5.8A2.8 2.8 0 0 1 3 14.2V7.8A2.8 2.8 0 0 1 5.8 5Z",
  spark:
    "M12 3l1.5 5.4L19 10l-5.5 1.6L12 17l-1.5-5.4L5 10l5.5-1.6L12 3Zm6 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z",
  trend:
    "M4 17h16M6 15l4.2-4.2 3.2 3.2L19 8.4M16 8h3v3",
  user:
    "M12 12.4a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4ZM4.8 20c.9-3.6 3.6-5.4 7.2-5.4s6.3 1.8 7.2 5.4",
} as const;

type IconName = keyof typeof iconPaths;

function MiniIcon({ name }: { name: IconName }) {
  return (
    <svg className="mini-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} />
    </svg>
  );
}

const instagramStats = [
  { value: "29.4K", label: "seguidores" },
  { value: "1.4K", label: "posts" },
];

const instagramPosts = [
  {
    title: "Bastidores da consultoria",
    label: "Atendimento online",
    image: "/bruna-pdf/bruna-about-cutout.png",
    variant: "portrait-post",
  },
  {
    title: "Rotina possivel nos EUA",
    label: "Escolhas simples",
    image: "/generated/bruna-gallery-social-accent-web.png",
    variant: "food-post",
  },
  {
    title: "Plano, app e suporte",
    label: "Consultoria BT",
    image: "/bruna-pdf/bruna-hero-cutout.png",
    variant: "support-post",
  },
];

const footerColumns = [
  {
    title: "Consultoria",
    links: [
      { label: "Experiencia BT", href: "#experiencia" },
      { label: "Planos", href: "#planos" },
      { label: "Avaliacoes", href: "#avaliacoes" },
    ],
  },
  {
    title: "Acompanhamento",
    links: [
      { label: "Questionario otimizado", href: "#experiencia" },
      { label: "Plano individual", href: "#planos" },
      { label: "Suporte WhatsApp", href: "#contato" },
    ],
  },
];

function SocialIcons({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={[
        "social-icons",
        compact ? "compact" : "",
        tone === "dark" ? "dark" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Redes sociais"
    >
      {socialLinks.map((social) => (
        <a
          href={social.href}
          key={social.label}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          title={social.label}
        >
          <img src={tone === "dark" ? social.iconDark : social.icon} alt="" width="16" height="16" />
        </a>
      ))}
    </div>
  );
}

function LanguageToggle({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "language-toggle compact" : "language-toggle"} aria-label="Idioma">
      <span className="language-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 1.8c1.05 1.18 1.86 2.45 2.34 3.72H9.66C10.14 7.25 10.95 5.98 12 4.8Zm-4.2.95a12.6 12.6 0 0 0-1.92 2.77H3.8A7.3 7.3 0 0 1 7.8 5.75ZM3.23 10.3h2.04a11.2 11.2 0 0 0 0 3.4H3.23a7.33 7.33 0 0 1 0-3.4Zm.57 5.18h2.08a12.6 12.6 0 0 0 1.92 2.77 7.3 7.3 0 0 1-4-2.77Zm8.2 3.72c-1.05-1.18-1.86-2.45-2.34-3.72h4.68c-.48 1.27-1.29 2.54-2.34 3.72Zm2.93-5.5H9.07a9.3 9.3 0 0 1 0-3.4h5.86a9.3 9.3 0 0 1 0 3.4Zm1.27 4.55a12.6 12.6 0 0 0 1.92-2.77h2.08a7.3 7.3 0 0 1-4 2.77Zm4.57-4.55h-2.04a11.2 11.2 0 0 0 0-3.4h2.04a7.33 7.33 0 0 1 0 3.4Zm-2.65-5.18a12.6 12.6 0 0 0-1.92-2.77 7.3 7.3 0 0 1 4 2.77h-2.08Z" />
        </svg>
      </span>
      <a href="#inicio" aria-current="true">
        PT
      </a>
      <a href="#contato">EN</a>
    </div>
  );
}

function StarRating() {
  return (
    <div className="stars" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2.6 2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.17l-5.7 3 1.09-6.36-4.62-4.5 6.38-.93L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="announcement-bar">
          <div className="announcement-left">
            <a className="announcement-whatsapp" href={whatsappLink} aria-label="Contato pelo WhatsApp">
              <img src="/social-icons/whatsapp-white.svg" alt="" width="16" height="16" />
              <span>WhatsApp</span>
            </a>
          </div>
          <a className="announcement-center" href="#planos">
            Consultoria online com plano, app e check-ins quinzenais
            <span aria-hidden="true">-&gt;</span>
          </a>
          <SocialIcons compact />
        </div>

        <input className="drawer-toggle" id="mobile-drawer" type="checkbox" aria-hidden="true" />
        <div className="main-nav">
          <a href="#inicio" className="brand-mark" aria-label="Bruna Tinoco Nutri">
            <Image
              src="/bruna-logo.png"
              alt="Bruna Tinoco Nutricao Integrativa"
              width={1120}
              height={295}
              preload
            />
          </a>

          <nav className="desktop-links" aria-label="Navegacao principal">
            {navLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageToggle />
            <a className="nav-cta" href="#contato">
              Agendar call
            </a>
            <label className="menu-button" htmlFor="mobile-drawer" aria-label="Abrir menu">
              <span />
              <span />
              <span />
            </label>
          </div>
        </div>

        <label className="drawer-backdrop" htmlFor="mobile-drawer" aria-hidden="true" />
        <aside className="mobile-drawer" aria-label="Menu mobile">
          <div className="drawer-top">
            <Image src="/bruna-logo.png" alt="" width={1120} height={295} />
            <label htmlFor="mobile-drawer" aria-label="Fechar menu">
              <span />
              <span />
            </label>
          </div>
          <nav className="drawer-links">
            {navLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="drawer-card">
            <p>Idioma</p>
            <LanguageToggle compact />
          </div>
          <a className="drawer-cta" href="#contato">
            Agendar consultoria
          </a>
          <div className="drawer-socials">
            <p>Redes sociais</p>
            <SocialIcons />
          </div>
        </aside>
      </header>

      <section className="hero-section" id="inicio">
        <Image
          src="/bruna-pdf/page-02-image-01-3e586cd55a6b.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hero-texture"
          preload
        />
        <div className="hero-wash" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span />
              Consultoria nutricional online
            </div>
            <h1>
              Bruna Tinoco <span>Nutri</span>
            </h1>
            <p>
              Emagrecimento com saude para brasileiras que vivem nos EUA, com plano
              individualizado, aplicativo do paciente e acompanhamento proximo na rotina real.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#planos">
                Ver planos
              </a>
              <a
                className="secondary-link"
                href="https://www.instagram.com/brunatinoconutri/"
                target="_blank"
                rel="noreferrer"
              >
                Falar no Instagram
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-glow" aria-hidden="true" />
            <div className="hero-stat-card nutrition-card" aria-hidden="true">
              <span>Plano alimentar</span>
              <strong>83%</strong>
              <em>Adesao semanal</em>
              <div className="progress-track">
                <i />
              </div>
            </div>
            <div className="hero-portrait">
              <Image
                src="/bruna-pdf/bruna-hero-grounded.png"
                alt="Bruna Tinoco, nutricionista integrativa"
                width={732}
                height={1178}
                sizes="(min-width: 1100px) 44vw, 86vw"
                preload
              />
            </div>
            <div className="hero-stat-card checkin-card" aria-hidden="true">
              <span>Proximo check-in</span>
              <strong>Quinta</strong>
              <em>Ajustes de fome, sono e rotina</em>
            </div>
            <div className="hero-stat-card chart-card" aria-hidden="true">
              <div className="mini-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-banner">
          {heroBannerItems.map((item) => (
            <span key={item.label}>
              <MiniIcon name={item.icon as IconName} />
              {item.label}
            </span>
          ))}
        </div>
      </section>

      <section className="proof-reviews" id="avaliacoes">
        <div className="proof-summary reveal">
          <p className="section-kicker">Prova social</p>
          <h2>Clareza, acolhimento e rotina possivel.</h2>
          <div className="proof-rating">
            <StarRating />
            <span>Feedback de pacientes da consultoria online</span>
          </div>
        </div>
        <div className="proof-review-shell">
          <div className="proof-review-grid">
            {reviews.map((review, index) => (
              <article className="proof-review-card reveal" key={review.name}>
                <div className="proof-review-image">
                  <Image
                    src={review.image}
                    alt=""
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 620px) 82vw, 22vw"
                  />
                </div>
                <div className="proof-review-top">
                  <span>
                    <MiniIcon name="user" />
                  </span>
                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.meta}</small>
                  </div>
                </div>
                <StarRating />
                <p>{review.quote}</p>
              </article>
            ))}
          </div>
          <div className="proof-carousel-dots" aria-hidden="true">
            {reviews.map((review, index) => (
              <span className={index === 0 ? "active" : ""} key={review.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="seven-day-section" id="resultados">
        <ViewportSequenceTrigger selector=".growth-story" />
        <div className="growth-story reveal" aria-label="Linha de progresso em 7 dias">
          <div className="growth-line" aria-hidden="true" />
          <div className="growth-days">
            <div className="growth-connector connector-one" aria-hidden="true" />
            <div className="growth-connector connector-two" aria-hidden="true" />
            {sevenDayResults.map((item) => (
              <article className="growth-day" key={item.day}>
                <div className="growth-day-art" aria-hidden="true">
                  <Image
                    src={item.art}
                    alt=""
                    fill
                    sizes="(max-width: 620px) 96px, 136px"
                  />
                </div>
                <span>
                  <MiniIcon name={item.day === "Dia 1" ? "leaf" : item.day === "Dia 4" ? "heart" : "spark"} />
                  {item.day}
                </span>
                <h2 className="growth-day-title">{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section" id="experiencia">
        <div className="experience-copy reveal">
          <p className="section-kicker">Experiencia BT</p>
          <h2>Plano, app e ajuste em um fluxo claro.</h2>
          <p>
            Menos improviso, mais acompanhamento e decisoes simples para a rotina real.
          </p>
        </div>
        <div className="experience-steps">
          {timeline.map((item, index) => (
            <article className="step-row reveal" key={item.label}>
              <span>
                <MiniIcon name={item.icon as IconName} />
              </span>
              <div>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h2>{item.label}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-section" id="planos">
        <div className="plans-heading reveal">
          <p className="section-kicker">Planos de consultoria</p>
          <h2>Escolha o nivel de acompanhamento que combina com sua rotina.</h2>
          <p>
            Todos os materiais sao entregues em ate 07 dias uteis apos o
            Questionario Otimizado BT, com suporte e organizacao pelo aplicativo.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article className={plan.featured ? "plan-card featured reveal" : "plan-card reveal"} key={plan.name}>
              <div className="plan-top">
                <span>{plan.rhythm}</span>
                {plan.featured ? <strong>Mais escolhido</strong> : null}
              </div>
              <h2 className="plan-name">{plan.name}</h2>
              <p>{plan.note}</p>
              <div className="plan-price">
                <span>{plan.duration}</span>
                <strong>{plan.brl}</strong>
                <em>{plan.usd}</em>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <MiniIcon name="check" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className="plan-action" href="#contato">
                Escolher {plan.name}
                <MiniIcon name="trend" />
              </a>
            </article>
          ))}
        </div>
        <p className="payment-note reveal">
          Pagamento a vista ou parcelado no cartao de credito, em real ou dolar americano.
        </p>
      </section>

      <section className="services-section">
        <div className="services-visual reveal">
          <Image
            src="/bruna-pdf/page-01-image-02-c0c8dee922ce.png"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <div className="services-portrait">
            <Image
              src="/bruna-pdf/bruna-about-cutout.png"
              alt="Bruna Tinoco"
              width={430}
              height={618}
              sizes="(max-width: 900px) 62vw, 26vw"
            />
          </div>
        </div>
        <div className="services-copy reveal">
          <p className="section-kicker">Incluso na consultoria</p>
          <h2>Suporte completo, sem depender de motivacao perfeita.</h2>
          <div className="service-list">
            {serviceItems.map((item) => (
              <article key={item.title} className="service-item">
                <span>
                  <MiniIcon name={item.icon as IconName} />
                </span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-copy reveal">
          <p className="section-kicker">Bruna Tinoco</p>
          <h2>Nutricionista integrativa, funcional e health coach.</h2>
          <p>
            Especialista em ajudar brasileiras que vivem nos EUA e desejam emagrecer
            com saude, aumentando autoestima sem abrir mao de flexibilidade e equilibrio.
          </p>
          <strong>CRN 20101459</strong>
        </div>
        <div className="about-art">
          <Image
            src="/generated/about/nutrition-food-headshot-provided-web.png"
            alt="Retrato editorial de nutricao integrativa com alimentos naturais"
            fill
            loading="eager"
            quality={90}
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="instagram-gallery" id="galeria">
        <div className="gallery-copy reveal">
          <p className="section-kicker">Instagram da Bruna</p>
          <h2>Conteudo leve, direto e real.</h2>
          <p>
            Posts selecionados sobre consultoria, alimentacao e vida real para
            brasileiras nos EUA.
          </p>
          <div className="instagram-stat-grid" aria-label="Numeros publicos do Instagram">
            {instagramStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <a
            className="gallery-link"
            href="https://www.instagram.com/brunatinoconutri/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/social-icons/instagram-white.svg" alt="" width="16" height="16" />
            Ver Instagram
          </a>
        </div>

        <div className="gallery-board reveal" aria-label="Posts em destaque do Instagram">
          {instagramPosts.map((post) => (
            <a
              className="gallery-tile post-card"
              href="https://www.instagram.com/brunatinoconutri/"
              key={post.title}
              target="_blank"
              rel="noreferrer"
            >
              <span className={`post-media ${post.variant}`}>
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 76vw, 24vw"
                />
              </span>
              <span className="post-meta">
                <small>{post.label}</small>
                <strong>{post.title}</strong>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="final-section" id="contato">
        <Image
          src="/bruna-pdf/page-10-image-01-3e586cd55a6b.jpg"
          alt=""
          fill
          sizes="100vw"
          className="final-bg"
        />
        <div className="final-overlay" />
        <Image
          src="/generated/bruna-footer-botanical-web.png"
          alt=""
          fill
          sizes="100vw"
          className="final-botanical"
        />
        <div className="final-content reveal">
          <p className="section-kicker">@brunatinoconutri</p>
          <h2>Comece sua consultoria com um plano que acompanha voce.</h2>
          <a
            className="primary-link"
            href="https://www.instagram.com/brunatinoconutri/"
            target="_blank"
            rel="noreferrer"
          >
            Adquirir consultoria
          </a>
          <SocialIcons />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#inicio" aria-label="Bruna Tinoco Nutri">
              <Image
                src="/bruna-logo.png"
                alt="Bruna Tinoco Nutricao Integrativa"
                width={1120}
                height={295}
              />
            </a>
            <p>
              Consultoria nutricional online para brasileiras nos EUA, com plano
              alimentar individualizado, aplicativo do paciente e suporte proximo.
            </p>
            <strong>CRN 20101459</strong>
          </div>

          <div className="footer-columns">
            {footerColumns.map((column) => (
              <nav aria-label={column.title} key={column.title}>
                <h2>{column.title}</h2>
                {column.links.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </nav>
            ))}
          </div>

          <div className="footer-contact">
            <p className="footer-label">Contato</p>
            <h2>Fale com Bruna e escolha seu melhor plano.</h2>
            <div className="footer-contact-actions">
              <a className="footer-cta whatsapp" href={whatsappLink}>
                <img src="/social-icons/whatsapp-white.svg" alt="" width="17" height="17" />
                WhatsApp
              </a>
              <a
                className="footer-cta secondary"
                href="https://www.instagram.com/brunatinoconutri/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/social-icons/instagram-green.svg" alt="" width="16" height="16" />
                Instagram
              </a>
            </div>
            <SocialIcons tone="dark" />
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Bruna Tinoco Nutricao Integrativa. Todos os direitos reservados.</p>
          <div>
            <a href="#inicio">Inicio</a>
            <a href="#contato">Contato</a>
            <a href="#planos">Planos</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
