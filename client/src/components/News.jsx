import { useEffect, useState } from "react";
import newsCsv from "../data/news.csv?raw";
import { parseCsv } from "../data/loadProjects.js";

const news = parseCsv(newsCsv)
  .filter((item) => item.title);

function imageSrc(path) {
  if (!path || path.startsWith("http")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const relative = path.replace(/^\/?public\//, "").replace(/^\//, "");
  const encoded = relative
    .split("/")
    .map((part) => encodeURI(part))
    .join("/");
  return `${base}/${encoded}`;
}

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
                  {item.image ? (
                    <img className="nj-card-img" src={imageSrc(item.image)} alt="" loading="lazy" />
                  ) : null}
                  <h3 className="nj-card-title">{item.title}</h3>
                  {item.link?.trim() ? (
                    <a className="nj-view-btn" href={item.link.trim()}>
                      {item.button?.trim() || "View Details"}
                    </a>
                  ) : null}
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
