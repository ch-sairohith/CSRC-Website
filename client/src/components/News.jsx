import { useEffect, useState } from "react";

const news = [
  {
    "id": 1,
    "title": "Vel commodo maiores laboris reprehenderit",
    "image": "https://placehold.co/600x370?text=News+1",
    "link": "#"
  },
  {
    "id": 2,
    "title": "Minim incididunt cillum eum itaque earum incididunt perferendis saepe commodo molestiae",
    "image": "https://placehold.co/600x370?text=News+2",
    "link": "#"
  },
  {
    "id": 3,
    "title": "Autem eum aute nostrud temporibus laboris sapiente mollit tempor itaque incididunt quibusdam culpa quam consectetur nulla tenetur lorem illum consequat quis earum tempor",
    "image": "https://placehold.co/600x370?text=News+3",
    "link": "#"
  },
  {
    "id": 4,
    "title": "Recusandae commodo alias temporibus adipiscing laborum enim aute exercitation",
    "image": "https://placehold.co/600x370?text=News+4",
    "link": "#"
  },
  {
    "id": 5,
    "title": "Maiores laboris voluptates laboris amet magna dolor ullamco quibusdam molestiae tempor illum doloribus incididunt veniam proident perferendis",
    "image": "https://placehold.co/600x370?text=News+5",
    "link": "#"
  },
  {
    "id": 6,
    "title": "Vel deserunt minim",
    "image": "https://placehold.co/600x370?text=News+6",
    "link": "#"
  }
];

function useVisibleCount() {
  const get = () => (window.innerWidth < 1280 ? 1 : 2);
  const [count, setCount] = useState(get);

  useEffect(() => {
    const onResize = () => setCount(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

export default function NewsEvents() {
  const visible = useVisibleCount();
  const [start, setStart] = useState(0);

  const maxStart = Math.max(news.length - visible, 0);
  const safeStart = Math.min(start, maxStart);

  const prev = () => setStart((s) => (s <= 0 ? maxStart : s - 1));
  const next = () => setStart((s) => (s >= maxStart ? 0 : s + 1));

  return (
    <section className="nj-section" aria-labelledby="news-heading">
      <h2 className="nj-heading" id="news-heading">
        News &amp; Events
      </h2>
      <span className="nj-underline" />

      <div className="nj-carousel">
        <button
          type="button"
          className="nj-arrow nj-arrow-left"
          onClick={prev}
          aria-label="Previous news"
        >
          ‹
        </button>

        <div className="nj-track-wrap">
          <div
            className="nj-track"
            style={{ transform: `translateX(-${(safeStart * 100) / visible}%)` }}
          >
            {news.map((item) => (
              <article
                className="nj-card"
                key={item.id}
                style={{ flex: `0 0 ${100 / visible}%` }}
              >
                <div className="nj-card-inner">
                  <img className="nj-card-img" src={item.image} alt="" loading="lazy" />
                  <h3 className="nj-card-title">{item.title}</h3>
                  <a className="nj-view-btn" href={item.link}>
                    View Details
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="nj-arrow nj-arrow-right"
          onClick={next}
          aria-label="Next news"
        >
          ›
        </button>
      </div>
    </section>
  );
}