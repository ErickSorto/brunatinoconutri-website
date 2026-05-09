import Image from "next/image";

type Review = {
  name: string;
  meta: string;
  quote: string;
  image: string;
};

type ReviewCarouselProps = {
  reviews: readonly Review[];
  starRatingAria: string;
};

const carouselScript = `
(() => {
  window.__btReviewCarouselTimers = window.__btReviewCarouselTimers || [];
  window.__btReviewCarouselTimers.forEach((timer) => window.clearInterval(timer));
  window.__btReviewCarouselTimers = [];

  const carousels = document.querySelectorAll("[data-review-carousel]");

  carousels.forEach((carousel) => {
    if (carousel.dataset.carouselReady === "true") {
      return;
    }

    const track = carousel.querySelector(".proof-review-grid");
    const dots = Array.from(carousel.querySelectorAll(".proof-carousel-dots button"));

    if (!track || dots.length < 2) {
      return;
    }

    carousel.dataset.carouselReady = "true";

    let frame = 0;

    const cards = () => Array.from(track.querySelectorAll(".proof-review-card"));
    const snapOffset = () => parseFloat(window.getComputedStyle(track).scrollPaddingLeft) || 0;
    const currentIndex = () => Math.max(0, dots.findIndex((dot) => dot.classList.contains("active")));

    const setActive = (index, behavior = "smooth") => {
      const items = cards();
      const next = (index + items.length) % items.length;
      const card = items[next];

      if (!card) {
        return;
      }

      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft - snapOffset(),
        behavior,
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === next;
        dot.classList.toggle("active", isActive);

        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    const syncFromScroll = () => {
      frame = 0;

      const items = cards();
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - snapOffset() - track.scrollLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === closestIndex;
        dot.classList.toggle("active", isActive);

        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    track.addEventListener("scroll", () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(syncFromScroll);
    }, { passive: true });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => setActive(index));
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setInterval(() => setActive(currentIndex() + 1), 4200);
      window.__btReviewCarouselTimers.push(timer);
    }
  });
})();
`;

export default function ReviewCarousel({
  reviews,
  starRatingAria,
}: ReviewCarouselProps) {
  return (
    <div className="proof-review-shell" data-review-carousel>
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
                <UserIcon />
              </span>
              <div>
                <strong>{review.name}</strong>
                <small>{review.meta}</small>
              </div>
            </div>
            <StarRating label={starRatingAria} />
            <p>{review.quote}</p>
          </article>
        ))}
      </div>
      <div className="proof-carousel-dots" aria-label="Feedback carousel">
        {reviews.map((review, index) => (
          <button
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`${review.name}: ${review.meta}`}
            className={index === 0 ? "active" : undefined}
            key={review.name}
            type="button"
          />
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: carouselScript }} />
    </div>
  );
}

function StarRating({ label }: { label: string }) {
  return (
    <div className="stars" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg aria-hidden="true" key={index} viewBox="0 0 24 24">
          <path d="m12 2.6 2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.17l-5.7 3 1.09-6.36-4.62-4.5 6.38-.93L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="mini-icon" viewBox="0 0 24 24">
      <path
        d="M19 20a7 7 0 0 0-14 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="8"
        fill="none"
        r="4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
