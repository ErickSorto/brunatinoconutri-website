/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Image from "next/image";
import BookingScheduler from "./BookingScheduler";
import EmailOfferPopup from "./EmailOfferPopup";
import ReviewCarousel from "./ReviewCarousel";
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

type Lang = "pt" | "en";

const translations = {
  pt: {
    htmlLang: "pt-BR",
    metadata: {
      title: "Bruna Tinoco Nutri | Consultoria Nutricional",
      description:
        "Consultoria nutricional online para brasileiras que vivem nos EUA e desejam emagrecer com saude.",
    },
    logoAlt: "Bruna Tinoco Nutricao Integrativa",
    socialAria: "Redes sociais",
    languageAria: "Idioma",
    primaryNavAria: "Navegacao principal",
    mobileMenuAria: "Menu mobile",
    openMenuAria: "Abrir menu",
    closeMenuAria: "Fechar menu",
    whatsappAria: "Contato pelo WhatsApp",
    announcement: "15% off para quem agenda a consulta gratuita de 1 hora",
    navCta: "Consulta gratuita",
    drawerLanguage: "Idioma",
    drawerCta: "Agendar consulta gratuita",
    drawerSocials: "Redes sociais",
    starRatingAria: "5 de 5 estrelas",
    navLinks: [
      { label: "Inicio", href: "#inicio" },
      { label: "Experiencia", href: "#experiencia" },
      { label: "Planos", href: "#planos" },
      { label: "Avaliacoes", href: "#avaliacoes" },
      { label: "Galeria", href: "#galeria" },
      { label: "Contato", href: "#contato" },
    ],
    hero: {
      kicker: "Consultoria nutricional online",
      title: "Bruna Tinoco",
      accent: "Nutri",
      text:
        "Se voce vive nos EUA, compra em mercados americanos e quer emagrecer sem dieta engessada, a Experiencia BT traduz sua rotina em plano, app e ajustes proximos.",
      primary: "Agendar consulta gratuita",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      portraitAlt: "Bruna Tinoco, nutricionista integrativa",
      stats: {
        plan: "Plano alimentar",
        percent: "83%",
        adherence: "Adesao semanal",
        checkin: "Proximo check-in",
        weekday: "Quinta",
        routine: "Ajustes de fome, sono e rotina",
      },
    },
    heroBannerItems: [
      { icon: "clipboard", label: "Questionario em portugues" },
      { icon: "calendar", label: "Plano em ate 07 dias uteis" },
      { icon: "message", label: "Compras reais nos EUA" },
    ],
    proof: {
      kicker: "Prova social",
      title: "Clareza para seguir.",
      ratingText: "Feedback de pacientes da consultoria online",
    },
    videoProof: {
      kicker: "Prova em video",
      title: "Mercado dos EUA sem travar.",
      text:
        "Voce nao precisa adivinhar produtos, rotulos e substituicoes. A consultoria traduz sua rotina americana em escolhas simples.",
      stats: ["Produtos certos", "Compras simples", "Plano em portugues"],
      primary: "Agendar consulta gratuita",
      secondary: "Ver reel",
      videoAria: "Reel de Bruna Tinoco sobre compras e rotina nos EUA",
      poster: "/instagram/bruna-video-thumbnail-pt-ai.webp",
    },
    reviews: [
      {
        name: "Paciente online",
        meta: "Rotina ocupada",
        image: "/generated/reviews-chatgpt-latest/001-use-case-photorealistic-natural-asset-type-website-review-ca-web.webp",
        quote:
          "O plano ficou simples de seguir e eu finalmente entendi como adaptar a alimentacao ao meu dia.",
      },
      {
        name: "Brasileira nos EUA",
        meta: "Plano Diamond",
        image: "/generated/reviews-chatgpt-latest/002-use-case-photorealistic-natural-asset-type-website-review-ca-web.webp",
        quote:
          "As substituicoes com produtos americanos deixaram tudo mais pratico, sem aquela sensacao de dieta impossivel.",
      },
      {
        name: "Paciente BT",
        meta: "Acompanhamento",
        image: "/generated/reviews-chatgpt-latest-brazilian/003-brazilian-review-model-web.webp",
        quote:
          "Foi acolhimento e organizacao. Eu sabia o que fazer na semana e quando pedir ajuste.",
      },
    ],
    sevenDayAria: "Linha de progresso em 7 dias",
    sevenDayResults: [
      {
        day: "Dia 1",
        title: "Direcao",
        text: "Plano claro, compras simples e primeira rotina sem improviso.",
        art: "/generated/seven-day/day-cards/day-1-start-web.webp",
        icon: "leaf",
      },
      {
        day: "Dia 4",
        title: "Leveza",
        text: "Fome mais previsivel, energia melhor e menos vontade de desistir.",
        art: "/generated/seven-day/day-cards/day-4-light-web.webp",
        icon: "heart",
      },
      {
        day: "Dia 7",
        title: "Clareza",
        text: "Voce ja entende o caminho e sente resultado suficiente para continuar.",
        art: "/generated/seven-day/day-cards/day-7-happy-web.webp",
        icon: "spark",
      },
    ],
    experience: {
      kicker: "Experiencia BT",
      title: "Direcao sem enrolacao.",
      text: "Voce nao precisa encaixar uma chamada longa para ser bem atendida. O Questionario BT mapeia sua rotina, seus mercados e suas preferencias antes do plano.",
    },
    timeline: [
      {
        label: "Voce responde",
        text: "Saude, rotina, compras e metas.",
        icon: "clipboard",
      },
      {
        label: "Voce recebe",
        text: "Plano no app em ate 7 dias uteis.",
        icon: "apple",
      },
      {
        label: "Voce ajusta",
        text: "Fome, sono e progresso sem achismo.",
        icon: "message",
      },
    ],
    plans: {
      kicker: "Planos",
      title: "Escolha seu plano.",
      text: "",
      featured: "Mais escolhido",
      choose: "Escolher",
      payment:
        "A call ajuda voce a escolher antes de pagar. A vista ou parcelado, em real ou dolar.",
      items: [
        {
          name: "Gold",
          duration: "03 meses",
          rhythm: "Trimestral",
          brl: "R$ 2.000",
          usd: "$375",
          note: "Para organizar rotina, escolhas e constancia com direcao clara.",
          featured: false,
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
          featured: false,
          features: [
            "Tudo do Diamond",
            "Encontros semanais em grupo",
            "Desafio interno",
            "Guias e playlist anti-estresse",
          ],
        },
      ],
    },
    services: {
      portraitAlt: "Bruna Tinoco",
      kicker: "Incluso na consultoria",
      title: "Tudo incluso.",
      items: [
        {
          title: "Plano individual",
          text: "Comida que cabe na sua rotina.",
          icon: "apple",
        },
        {
          title: "Metabolismo monitorado",
          text: "Dados para ajustar, nao adivinhar.",
          icon: "trend",
        },
        {
          title: "Check-ins quinzenais",
          text: "Ajustes antes de voce travar.",
          icon: "calendar",
        },
        {
          title: "App + WhatsApp",
          text: "Passo a passo em portugues.",
          icon: "message",
        },
        {
          title: "Produtos dos EUA",
          text: "Marcas e substituicoes faceis.",
          icon: "clipboard",
        },
        {
          title: "Grupo e desafio BT",
          text: "Constancia sem fazer sozinha.",
          icon: "heart",
        },
      ],
    },
    about: {
      kicker: "Bruna Tinoco",
      title: "Nutri integrativa nos EUA.",
      text:
        "Para brasileiras que querem entender o corpo, comer com flexibilidade e parar de adaptar dieta brasileira a uma vida que acontece nos EUA.",
      alt: "Retrato editorial de nutricao integrativa com alimentos naturais",
    },
    instagramStats: [
      { value: "29.3K", label: "seguidores" },
      { value: "1.4K", label: "posts" },
    ],
    instagramPosts: [
      {
        title: "Como funciona",
        label: "Acompanhamento",
        image: "/instagram/bruna-DN8yC6piSg6.webp",
        variant: "feature-post",
      },
      {
        title: "Brasileiras nos EUA",
        label: "Consultoria online",
        image: "/instagram/bruna-DBub_vIOCJj.webp",
        variant: "portrait-post",
      },
      {
        title: "Resultado real",
        label: "Evolucao",
        image: "/instagram/bruna-DXSDviKiT2A.webp",
        variant: "story-post",
      },
      {
        title: "Produtos da nutri",
        label: "Mercado americano",
        image: "/instagram/bruna-DWPUGATCf48.webp",
        variant: "story-post",
      },
      {
        title: "Metodo sem depender de animo",
        label: "Constancia",
        image: "/instagram/bruna-DUYWdDeGDY6.webp",
        variant: "portrait-post",
      },
      {
        title: "Saude intestinal",
        label: "Causa, nao sintoma",
        image: "/instagram/bruna-DUT6B6ElBMC.webp",
        variant: "story-post",
      },
    ],
    gallery: {
      kicker: "Instagram da Bruna",
      title: "Vida real.",
      text:
        "Posts sobre metodo, mercado americano e rotina possivel para voce se ver no processo.",
      statAria: "Numeros publicos do Instagram",
      boardAria: "Posts em destaque do Instagram",
      button: "Ver Instagram",
    },
    schedule: {
      kicker: "Consulta gratuita",
      title: "Agende 1 hora gratuita",
      text:
        "Escolha um horario para entender seu plano e proximos passos.",
      perks: [
        "Uma hora para mapear sua rotina e seus objetivos.",
        "Tire duvidas sobre tempo, custo e flexibilidade.",
        "Ganhe 15% off se iniciar depois da consulta.",
      ],
      panelKicker: "Consulta gratuita",
      panelTitle: "Escolha seu horario",
      panelText: "Selecione dia e hora. A confirmacao pode seguir por WhatsApp ou Instagram.",
      calendarAria: "Calendario de maio de 2026",
      month: "Maio 2026",
      prevMonth: "Mes anterior",
      nextMonth: "Proximo mes",
      weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      selectedPrefix: "Selecionado",
      selectedDate: "Sexta, 22 de maio",
      dateLabel: "Data",
      timeLabel: "Horario",
      serviceLabel: "Formato",
      service: "Consulta gratuita BT",
      duration: "1 hora",
      submit: "Agendar 1h gratis",
      secondary: "Prefiro falar no Instagram",
      times: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
      timezone: "Segunda a sexta, 8h as 18h EST",
      chooseDate: "Escolher data",
      chooseTime: "Escolher horario",
      closePicker: "Fechar seletor",
      dateSheetTitle: "Escolha a data",
      timeSheetTitle: "Escolha o horario",
    },
    offerModal: {
      kicker: "Oferta da consulta gratuita",
      title: "Desbloqueie 15% off.",
      text:
        "Receba o lembrete da consulta e o desconto preview para iniciar sua consultoria com mais clareza.",
      placeholder: "seuemail@email.com",
      button: "Quero 15% off",
      success: "Pronto. Desconto reservado para a preview.",
      close: "Fechar oferta",
      imageAlt: "Mulher preparando uma refeicao saudavel durante acompanhamento online",
    },
    final: {
      kicker: "@brunatinoconutri",
      title: "Seu primeiro passo e a consulta.",
      cta: "Agendar consulta gratuita",
    },
    footer: {
      brandText:
        "Consultoria nutricional online para brasileiras nos EUA, com plano individual, app do paciente e suporte em portugues.",
      contactLabel: "Contato",
      contactTitle: "Escolha seu plano.",
      copyright:
        "© 2026 Bruna Tinoco Nutricao Integrativa. Todos os direitos reservados.",
      bottomLinks: [
        { label: "Inicio", href: "#inicio" },
        { label: "Contato", href: "#contato" },
        { label: "Planos", href: "#planos" },
      ],
      columns: [
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
      ],
    },
  },
  en: {
    htmlLang: "en",
    metadata: {
      title: "Bruna Tinoco Nutrition | Online Nutrition Coaching",
      description:
        "Online nutrition coaching for Brazilian women living in the U.S. who want healthy weight loss with a personalized plan.",
    },
    logoAlt: "Bruna Tinoco Integrative Nutrition",
    socialAria: "Social media",
    languageAria: "Language",
    primaryNavAria: "Primary navigation",
    mobileMenuAria: "Mobile menu",
    openMenuAria: "Open menu",
    closeMenuAria: "Close menu",
    whatsappAria: "Contact on WhatsApp",
    announcement: "15% off when you book your free 1-hour consultation",
    navCta: "Free consult",
    drawerLanguage: "Language",
    drawerCta: "Book free consultation",
    drawerSocials: "Social media",
    starRatingAria: "5 out of 5 stars",
    navLinks: [
      { label: "Home", href: "#inicio" },
      { label: "Experience", href: "#experiencia" },
      { label: "Plans", href: "#planos" },
      { label: "Reviews", href: "#avaliacoes" },
      { label: "Gallery", href: "#galeria" },
      { label: "Contact", href: "#contato" },
    ],
    hero: {
      kicker: "Online nutrition coaching",
      title: "Bruna Tinoco",
      accent: "Nutri",
      text:
        "If you live in the U.S., shop in American stores, and want weight loss without a rigid diet, the BT Experience turns your real routine into a plan, app, and close adjustments.",
      primary: "Book a free consultation",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      portraitAlt: "Bruna Tinoco, integrative nutritionist",
      stats: {
        plan: "Meal plan",
        percent: "83%",
        adherence: "Weekly adherence",
        checkin: "Next check-in",
        weekday: "Thursday",
        routine: "Hunger, sleep, and routine adjustments",
      },
    },
    heroBannerItems: [
      { icon: "clipboard", label: "Questionnaire in Portuguese" },
      { icon: "calendar", label: "Plan within 7 business days" },
      { icon: "message", label: "Real U.S. grocery options" },
    ],
    proof: {
      kicker: "Social proof",
      title: "Clarity you can follow.",
      ratingText: "Feedback from online coaching clients",
    },
    videoProof: {
      kicker: "Video proof",
      title: "U.S. groceries made clear.",
      text:
        "You do not have to guess products, labels, or substitutions. The coaching turns your U.S. routine into simple choices.",
      stats: ["Right products", "Simple shopping", "Portuguese guidance"],
      primary: "Book a free consultation",
      secondary: "View Reel",
      videoAria: "Bruna Tinoco Reel about grocery shopping and routine in the U.S.",
      poster: "/instagram/bruna-video-thumbnail-en-ai.webp",
    },
    reviews: [
      {
        name: "Online client",
        meta: "Busy routine",
        image: "/generated/reviews-chatgpt-latest/001-use-case-photorealistic-natural-asset-type-website-review-ca-web.webp",
        quote:
          "The plan became simple to follow, and I finally understood how to adapt my nutrition to my day.",
      },
      {
        name: "Brazilian in the U.S.",
        meta: "Diamond plan",
        image: "/generated/reviews-chatgpt-latest/002-use-case-photorealistic-natural-asset-type-website-review-ca-web.webp",
        quote:
          "The swaps using American products made everything practical, without that impossible-diet feeling.",
      },
      {
        name: "BT client",
        meta: "Ongoing support",
        image: "/generated/reviews-chatgpt-latest-brazilian/003-brazilian-review-model-web.webp",
        quote:
          "It felt supportive and organized. I knew what to do each week and when to ask for an adjustment.",
      },
    ],
    sevenDayAria: "7-day progress timeline",
    sevenDayResults: [
      {
        day: "Day 1",
        title: "Direction",
        text: "A clear plan, simple shopping, and the first routine without guesswork.",
        art: "/generated/seven-day/day-cards/day-1-start-web.webp",
        icon: "leaf",
      },
      {
        day: "Day 4",
        title: "Lightness",
        text: "More predictable hunger, better energy, and less urge to give up.",
        art: "/generated/seven-day/day-cards/day-4-light-web.webp",
        icon: "heart",
      },
      {
        day: "Day 7",
        title: "Clarity",
        text: "You understand the path and feel enough progress to keep going.",
        art: "/generated/seven-day/day-cards/day-7-happy-web.webp",
        icon: "spark",
      },
    ],
    experience: {
      kicker: "BT Experience",
      title: "Direction without the drag.",
      text:
        "You do not need a long call to feel understood. The BT Questionnaire maps your routine, grocery reality, and preferences before the plan.",
    },
    timeline: [
      {
        label: "You answer",
        text: "Health, routine, groceries, and goals.",
        icon: "clipboard",
      },
      {
        label: "You receive",
        text: "Your app plan within 7 business days.",
        icon: "apple",
      },
      {
        label: "You adjust",
        text: "Hunger, sleep, and progress without guessing.",
        icon: "message",
      },
    ],
    plans: {
      kicker: "Plans",
      title: "Choose your plan.",
      text: "",
      featured: "Most chosen",
      choose: "Choose",
      payment: "The call helps you choose before paying. Pay in full or installments, in reais or dollars.",
      items: [
        {
          name: "Gold",
          duration: "03 months",
          rhythm: "Quarterly",
          brl: "R$ 2.000",
          usd: "$375",
          note: "For organizing your routine, choices, and consistency with clear direction.",
          featured: false,
          features: [
            "Personalized meal plan",
            "Supplement guidance",
            "Patient app",
            "WhatsApp support",
          ],
        },
        {
          name: "Diamond",
          duration: "06 months",
          rhythm: "Semiannual",
          brl: "R$ 3.200",
          usd: "$600",
          note: "For those who want more time for adjustments, support, and follow-up.",
          featured: true,
          features: [
            "Everything in Gold",
            "Metabolic tracking",
            "Biweekly check-up",
            "Plan and routine adjustments",
          ],
        },
        {
          name: "Platinum",
          duration: "12 months",
          rhythm: "Annual",
          brl: "R$ 5.000",
          usd: "$940",
          note: "The most complete journey for sustaining changes with confidence.",
          featured: false,
          features: [
            "Everything in Diamond",
            "Weekly group meetings",
            "Internal challenge",
            "Guides and anti-stress playlist",
          ],
        },
      ],
    },
    services: {
      portraitAlt: "Bruna Tinoco",
      kicker: "Included in coaching",
      title: "Everything included.",
      items: [
        {
          title: "Personal plan",
          text: "Food that fits your routine.",
          icon: "apple",
        },
        {
          title: "Monitored metabolism",
          text: "Data to adjust, not guess.",
          icon: "trend",
        },
        {
          title: "Biweekly check-ins",
          text: "Adjust before you get stuck.",
          icon: "calendar",
        },
        {
          title: "App + WhatsApp",
          text: "Step-by-step support in Portuguese.",
          icon: "message",
        },
        {
          title: "U.S. products",
          text: "Easy brands and substitutions.",
          icon: "clipboard",
        },
        {
          title: "BT group and challenge",
          text: "Consistency without doing it alone.",
          icon: "heart",
        },
      ],
    },
    about: {
      kicker: "Bruna Tinoco",
      title: "Integrative nutrition in the U.S.",
      text:
        "For Brazilian women who want to understand their body, eat with flexibility, and stop forcing a Brazilian diet into a life that happens in the U.S.",
      alt: "Editorial portrait for integrative nutrition with natural foods",
    },
    instagramStats: [
      { value: "29.3K", label: "followers" },
      { value: "1.4K", label: "posts" },
    ],
    instagramPosts: [
      {
        title: "How it works",
        label: "Coaching",
        image: "/instagram/bruna-DN8yC6piSg6.webp",
        variant: "feature-post",
      },
      {
        title: "Brazilian women in the U.S.",
        label: "Online coaching",
        image: "/instagram/bruna-DBub_vIOCJj.webp",
        variant: "portrait-post",
      },
      {
        title: "Real progress",
        label: "Results",
        image: "/instagram/bruna-DXSDviKiT2A.webp",
        variant: "story-post",
      },
      {
        title: "Nutri-approved products",
        label: "U.S. groceries",
        image: "/instagram/bruna-DWPUGATCf48.webp",
        variant: "story-post",
      },
      {
        title: "A method beyond motivation",
        label: "Consistency",
        image: "/instagram/bruna-DUYWdDeGDY6.webp",
        variant: "portrait-post",
      },
      {
        title: "Gut health",
        label: "Cause, not symptoms",
        image: "/instagram/bruna-DUT6B6ElBMC.webp",
        variant: "story-post",
      },
    ],
    gallery: {
      kicker: "Bruna's Instagram",
      title: "Real life.",
      text:
        "Posts about the method, American grocery reality, and a routine you can actually see yourself following.",
      statAria: "Public Instagram numbers",
      boardAria: "Featured Instagram posts",
      button: "View Instagram",
    },
    schedule: {
      kicker: "Free consultation",
      title: "Book 1 free hour",
      text:
        "Choose a time to understand your plan and next steps.",
      perks: [
        "One hour to map your routine and goals.",
        "Ask about time, cost, and flexibility.",
        "Unlock 15% off if you start after the consultation.",
      ],
      panelKicker: "Free consultation",
      panelTitle: "Choose your time",
      panelText: "Select a day and hour. Confirmation can continue through WhatsApp or Instagram.",
      calendarAria: "May 2026 calendar",
      month: "May 2026",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      selectedPrefix: "Selected",
      selectedDate: "Friday, May 22",
      dateLabel: "Date",
      timeLabel: "Time",
      serviceLabel: "Format",
      service: "Free BT consultation",
      duration: "1 hour",
      submit: "Book free hour",
      secondary: "I prefer Instagram",
      times: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
      timezone: "Monday to Friday, 8 AM to 6 PM EST",
      chooseDate: "Choose date",
      chooseTime: "Choose time",
      closePicker: "Close picker",
      dateSheetTitle: "Choose the date",
      timeSheetTitle: "Choose the time",
    },
    offerModal: {
      kicker: "Free consultation offer",
      title: "Unlock 15% off.",
      text:
        "Get the consultation reminder and preview discount so you can start with more clarity.",
      placeholder: "you@email.com",
      button: "Get 15% off",
      success: "Done. Your preview discount is reserved.",
      close: "Close offer",
      imageAlt: "Woman preparing a healthy meal during online nutrition coaching",
    },
    final: {
      kicker: "@brunatinoconutri",
      title: "Your first step is the consultation.",
      cta: "Book free consultation",
    },
    footer: {
      brandText:
        "Online nutrition coaching for Brazilian women in the U.S., with a personal plan, patient app, and Portuguese support.",
      contactLabel: "Contact",
      contactTitle: "Choose your plan.",
      copyright: "© 2026 Bruna Tinoco Integrative Nutrition. All rights reserved.",
      bottomLinks: [
        { label: "Home", href: "#inicio" },
        { label: "Contact", href: "#contato" },
        { label: "Plans", href: "#planos" },
      ],
      columns: [
        {
          title: "Consultation",
          links: [
            { label: "BT Experience", href: "#experiencia" },
            { label: "Plans", href: "#planos" },
            { label: "Reviews", href: "#avaliacoes" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Optimized questionnaire", href: "#experiencia" },
            { label: "Personal plan", href: "#planos" },
            { label: "WhatsApp support", href: "#contato" },
          ],
        },
      ],
    },
  },
} as const;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function resolveLang(searchParams?: { [key: string]: string | string[] | undefined }): Lang {
  const rawLang = searchParams?.lang;
  const value = Array.isArray(rawLang) ? rawLang[0] : rawLang;
  return value === "en" ? "en" : "pt";
}

const iconPaths = {
  apple:
    "M12 7.2c-1.7-2.1-5.7-1.5-6.9 1.6-1.4 3.5.8 8.9 3.7 11 .9.7 1.7.5 2.7.1.8-.3 1.6-.3 2.4 0 1 .4 1.8.5 2.8-.2 2.7-1.9 4.3-5.9 3.6-9.1-.6-2.6-3.5-4.3-5.6-2.5Zm.2-.4c.1-2.4 1.7-4.2 4-4.8.2 2.4-1.6 4.3-4 4.8Z",
  calendar:
    "M7 3v3m10-3v3M4.5 9.2h15M6.2 5h11.6A2.2 2.2 0 0 1 20 7.2v10.6a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.8V7.2A2.2 2.2 0 0 1 6.2 5Zm2.6 8h.1m3.1 0h.1m3.1 0h.1m-6.5 3h.1m3.1 0h.1",
  check:
    "m5 12.4 4.1 4.1L19 6.8",
  clock:
    "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4.2V12l3 1.8",
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

const calendarRows = [
  [
    { label: "26", state: "muted" },
    { label: "27", state: "muted" },
    { label: "28", state: "muted" },
    { label: "29", state: "muted" },
    { label: "30", state: "muted" },
    { label: "1", state: "muted" },
    { label: "2", state: "muted" },
  ],
  [
    { label: "3", state: "muted" },
    { label: "4", state: "muted" },
    { label: "5", state: "muted" },
    { label: "6", state: "muted" },
    { label: "7", state: "muted" },
    { label: "8", state: "muted" },
    { label: "9", state: "muted" },
  ],
  [
    { label: "10", state: "muted" },
    { label: "11" },
    { label: "12" },
    { label: "13" },
    { label: "14" },
    { label: "15" },
    { label: "16", state: "muted" },
  ],
  [
    { label: "17", state: "muted" },
    { label: "18" },
    { label: "19" },
    { label: "20" },
    { label: "21" },
    { label: "22", state: "selected" },
    { label: "23", state: "muted" },
  ],
  [
    { label: "24", state: "muted" },
    { label: "25" },
    { label: "26" },
    { label: "27" },
    { label: "28" },
    { label: "29" },
    { label: "30", state: "muted" },
  ],
  [
    { label: "31", state: "muted" },
    { label: "1", state: "muted" },
    { label: "2", state: "muted" },
    { label: "3", state: "muted" },
    { label: "4", state: "muted" },
    { label: "5", state: "muted" },
    { label: "6", state: "muted" },
  ],
] as const;

function MiniIcon({ name }: { name: IconName }) {
  return (
    <svg className="mini-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} />
    </svg>
  );
}

function SocialIcons({
  compact = false,
  tone = "light",
  ariaLabel,
}: {
  compact?: boolean;
  tone?: "light" | "dark";
  ariaLabel: string;
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
      aria-label={ariaLabel}
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

function LanguageToggle({ compact = false, lang }: { compact?: boolean; lang: Lang }) {
  return (
    <div
      className={compact ? "language-toggle compact" : "language-toggle"}
      aria-label={translations[lang].languageAria}
    >
      <span className="language-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 1.8c1.05 1.18 1.86 2.45 2.34 3.72H9.66C10.14 7.25 10.95 5.98 12 4.8Zm-4.2.95a12.6 12.6 0 0 0-1.92 2.77H3.8A7.3 7.3 0 0 1 7.8 5.75ZM3.23 10.3h2.04a11.2 11.2 0 0 0 0 3.4H3.23a7.33 7.33 0 0 1 0-3.4Zm.57 5.18h2.08a12.6 12.6 0 0 0 1.92 2.77 7.3 7.3 0 0 1-4-2.77Zm8.2 3.72c-1.05-1.18-1.86-2.45-2.34-3.72h4.68c-.48 1.27-1.29 2.54-2.34 3.72Zm2.93-5.5H9.07a9.3 9.3 0 0 1 0-3.4h5.86a9.3 9.3 0 0 1 0 3.4Zm1.27 4.55a12.6 12.6 0 0 0 1.92-2.77h2.08a7.3 7.3 0 0 1-4 2.77Zm4.57-4.55h-2.04a11.2 11.2 0 0 0 0-3.4h2.04a7.33 7.33 0 0 1 0 3.4Zm-2.65-5.18a12.6 12.6 0 0 0-1.92-2.77 7.3 7.3 0 0 1 4 2.77h-2.08Z" />
        </svg>
      </span>
      <a href="?lang=pt#inicio" aria-current={lang === "pt" ? "true" : undefined}>
        PT
      </a>
      <a href="?lang=en#inicio" aria-current={lang === "en" ? "true" : undefined}>
        EN
      </a>
    </div>
  );
}

function StarRating({ label }: { label: string }) {
  return (
    <div className="stars" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2.6 2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.17l-5.7 3 1.09-6.36-4.62-4.5 6.38-.93L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const lang = resolveLang(searchParams ? await searchParams : undefined);
  return translations[lang].metadata;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const lang = resolveLang(searchParams ? await searchParams : undefined);
  const t = translations[lang];

  return (
    <main className="site-shell">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(t.htmlLang)};`,
        }}
      />
      <header className="site-header">
        <div className="announcement-bar">
          <div className="announcement-left">
            <a className="announcement-whatsapp" href={whatsappLink} aria-label={t.whatsappAria}>
              <img src="/social-icons/whatsapp-white.svg" alt="" width="16" height="16" />
              <span>WhatsApp</span>
            </a>
          </div>
          <a className="announcement-center" href="#agendar">
            {t.announcement}
            <span aria-hidden="true">-&gt;</span>
          </a>
          <SocialIcons compact ariaLabel={t.socialAria} />
        </div>

        <input className="drawer-toggle" id="mobile-drawer" type="checkbox" aria-hidden="true" />
        <div className="main-nav">
          <a href="#inicio" className="brand-mark" aria-label="Bruna Tinoco Nutri">
            <Image
              src="/bruna-logo.webp"
              alt={t.logoAlt}
              width={1120}
              height={295}
              preload
            />
          </a>

          <nav className="desktop-links" aria-label={t.primaryNavAria}>
            {t.navLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageToggle lang={lang} />
            <a className="nav-cta" href="#agendar">
              {t.navCta}
            </a>
            <label className="menu-button" htmlFor="mobile-drawer" aria-label={t.openMenuAria}>
              <span />
              <span />
              <span />
            </label>
          </div>
        </div>

        <label className="drawer-backdrop" htmlFor="mobile-drawer" aria-hidden="true" />
        <aside className="mobile-drawer" aria-label={t.mobileMenuAria}>
          <div className="drawer-top">
            <Image src="/bruna-logo.webp" alt="" width={1120} height={295} />
            <label htmlFor="mobile-drawer" aria-label={t.closeMenuAria}>
              <span />
              <span />
            </label>
          </div>
          <nav className="drawer-links">
            {t.navLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="drawer-card">
            <p>{t.drawerLanguage}</p>
            <LanguageToggle compact lang={lang} />
          </div>
          <a className="drawer-cta" href="#agendar">
            {t.drawerCta}
          </a>
          <div className="drawer-socials">
            <p>{t.drawerSocials}</p>
            <SocialIcons ariaLabel={t.socialAria} />
          </div>
        </aside>
      </header>

      <section className="hero-section" id="inicio">
        <Image
          src="/bruna-pdf/page-02-image-01-3e586cd55a6b.webp"
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
              {t.hero.kicker}
            </div>
            <h1>
              {t.hero.title} <span>{t.hero.accent}</span>
            </h1>
            <p>{t.hero.text}</p>
            <div className="hero-actions">
              <a className="primary-link" href="#agendar">
                {t.hero.primary}
              </a>
              <a className="secondary-link hero-whatsapp-link" href={whatsappLink}>
                <img src="/social-icons/whatsapp-white.svg" alt="" width="16" height="16" />
                <span>{t.hero.whatsapp}</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-glow" aria-hidden="true" />
            <div className="hero-stat-card nutrition-card" aria-hidden="true">
              <span>{t.hero.stats.plan}</span>
              <strong>{t.hero.stats.percent}</strong>
              <em>{t.hero.stats.adherence}</em>
              <div className="progress-track">
                <i />
              </div>
            </div>
            <div className="hero-portrait">
              <Image
                src="/bruna-pdf/bruna-hero-grounded.webp"
                alt={t.hero.portraitAlt}
                width={732}
                height={1178}
                sizes="(min-width: 1100px) 44vw, 86vw"
                preload
              />
            </div>
            <div className="hero-stat-card checkin-card" aria-hidden="true">
              <span>{t.hero.stats.checkin}</span>
              <strong>{t.hero.stats.weekday}</strong>
              <em>{t.hero.stats.routine}</em>
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
          {t.heroBannerItems.map((item) => (
            <span key={item.label}>
              <MiniIcon name={item.icon as IconName} />
              {item.label}
            </span>
          ))}
        </div>
      </section>

      <section className="proof-reviews" id="avaliacoes">
        <div className="proof-summary reveal">
          <p className="section-kicker">{t.proof.kicker}</p>
          <h2>{t.proof.title}</h2>
          <div className="proof-rating">
            <StarRating label={t.starRatingAria} />
            <span>{t.proof.ratingText}</span>
          </div>
        </div>
        <ReviewCarousel reviews={t.reviews} starRatingAria={t.starRatingAria} />
      </section>

      <section className="video-proof-section" id="video-prova">
        <div className="video-proof-copy reveal">
          <p className="section-kicker">{t.videoProof.kicker}</p>
          <h2>{t.videoProof.title}</h2>
          <p>{t.videoProof.text}</p>
          <div className="video-proof-stats">
            {t.videoProof.stats.map((stat) => (
              <span key={stat}>
                <MiniIcon name="trend" />
                {stat}
              </span>
            ))}
          </div>
          <div className="video-proof-actions">
            <a className="primary-link" href="#agendar">
              {t.videoProof.primary}
            </a>
            <a
              className="text-link"
              href="https://www.instagram.com/p/DXE4thVEcAF/"
              target="_blank"
              rel="noreferrer"
            >
              {t.videoProof.secondary}
            </a>
          </div>
        </div>
        <div className="video-proof-frame reveal">
          <video
            aria-label={t.videoProof.videoAria}
            controls
            playsInline
            poster={t.videoProof.poster}
            preload="metadata"
          >
            <source src="/instagram/bruna-proof-us-market-hq.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="seven-day-section" id="resultados">
        <ViewportSequenceTrigger selector=".growth-story" />
        <div className="growth-story reveal" aria-label={t.sevenDayAria}>
          <div className="growth-line" aria-hidden="true" />
          <div className="growth-days">
            <div className="growth-connector connector-one" aria-hidden="true" />
            <div className="growth-connector connector-two" aria-hidden="true" />
            {t.sevenDayResults.map((item) => (
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
                  <MiniIcon name={item.icon as IconName} />
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
          <p className="section-kicker">{t.experience.kicker}</p>
          <h2>{t.experience.title}</h2>
          <p>{t.experience.text}</p>
        </div>
        <div className="experience-steps">
          {t.timeline.map((item, index) => (
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
          <p className="section-kicker">{t.plans.kicker}</p>
          <h2>{t.plans.title}</h2>
          {t.plans.text ? <p>{t.plans.text}</p> : null}
        </div>

        <div className="plans-grid">
          {t.plans.items.map((plan) => (
            <article className={plan.featured ? "plan-card featured reveal" : "plan-card reveal"} key={plan.name}>
              <div className="plan-top">
                <span>{plan.rhythm}</span>
                {plan.featured ? <strong>{t.plans.featured}</strong> : null}
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
              <a className="plan-action" href="#agendar">
                {t.plans.choose} {plan.name}
                <MiniIcon name="trend" />
              </a>
            </article>
          ))}
        </div>
        <p className="payment-note reveal">{t.plans.payment}</p>
      </section>

      <section className="services-section">
        <div className="services-visual reveal">
          <Image
            src="/bruna-pdf/page-01-image-02-c0c8dee922ce.webp"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <div className="services-portrait">
            <Image
              src="/bruna-pdf/bruna-about-cutout.webp"
              alt={t.services.portraitAlt}
              width={430}
              height={618}
              sizes="(max-width: 900px) 62vw, 26vw"
            />
          </div>
        </div>
        <div className="services-copy reveal">
          <p className="section-kicker">{t.services.kicker}</p>
          <h2>{t.services.title}</h2>
          <div className="service-list">
            {t.services.items.map((item) => (
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
          <p className="section-kicker">{t.about.kicker}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.text}</p>
          <strong>CRN 20101459</strong>
        </div>
        <div className="about-art">
          <Image
            src="/generated/about/nutrition-food-headshot-provided-web.webp"
            alt={t.about.alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="instagram-gallery" id="galeria">
        <div className="gallery-copy reveal">
          <p className="section-kicker">{t.gallery.kicker}</p>
          <h2>{t.gallery.title}</h2>
          <p>{t.gallery.text}</p>
          <div className="instagram-stat-grid" aria-label={t.gallery.statAria}>
            {t.instagramStats.map((stat) => (
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
            {t.gallery.button}
          </a>
        </div>

        <div className="gallery-board reveal" aria-label={t.gallery.boardAria}>
          {t.instagramPosts.map((post) => (
            <a
              className={`gallery-tile post-card ${post.variant}`}
              href="https://www.instagram.com/brunatinoconutri/"
              key={post.title}
              target="_blank"
              rel="noreferrer"
            >
              <span className="post-media">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 620px) 68vw, (max-width: 980px) 31vw, 17vw"
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

      <section className="booking-section" id="agendar">
        <div className="booking-copy reveal">
          <p className="section-kicker">{t.schedule.kicker}</p>
          <h2>{t.schedule.title}</h2>
          <p>{t.schedule.text}</p>
          <div className="booking-perks">
            {t.schedule.perks.map((perk) => (
              <span key={perk}>
                <MiniIcon name="check" />
                {perk}
              </span>
            ))}
          </div>
        </div>

        <BookingScheduler calendarRows={calendarRows} schedule={t.schedule} />
      </section>

      <section className="final-section" id="contato">
        <Image
          src="/bruna-pdf/page-10-image-01-3e586cd55a6b.webp"
          alt=""
          fill
          sizes="100vw"
          className="final-bg"
        />
        <div className="final-overlay" />
        <Image
          src="/generated/bruna-footer-botanical-web.webp"
          alt=""
          fill
          sizes="100vw"
          className="final-botanical"
        />
        <div className="final-content reveal">
          <p className="section-kicker">{t.final.kicker}</p>
          <h2>{t.final.title}</h2>
          <a
            className="primary-link"
            href="#agendar"
          >
            {t.final.cta}
          </a>
          <SocialIcons ariaLabel={t.socialAria} />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#inicio" aria-label="Bruna Tinoco Nutri">
              <Image
                src="/bruna-logo.webp"
                alt={t.logoAlt}
                width={1120}
                height={295}
              />
            </a>
            <p>{t.footer.brandText}</p>
            <strong>CRN 20101459</strong>
          </div>

          <div className="footer-columns">
            {t.footer.columns.map((column) => (
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
            <p className="footer-label">{t.footer.contactLabel}</p>
            <h2>{t.footer.contactTitle}</h2>
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
            <SocialIcons tone="dark" ariaLabel={t.socialAria} />
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
          <div>
            {t.footer.bottomLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <EmailOfferPopup copy={t.offerModal} />
    </main>
  );
}
