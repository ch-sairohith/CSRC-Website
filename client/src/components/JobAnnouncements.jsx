import { useEffect, useMemo, useRef, useState } from "react";
import positionsCsv from "../data/project-positions.csv?raw";
import { parseCsv } from "../data/loadProjects";

const jobs = parseCsv(positionsCsv);

const PAGE_SIZE = 10;

function statusLinks(job) {
  const labels = job.status ? job.status.split(" | ") : [];
  const urls = job.statusUrl ? job.statusUrl.split(" | ") : [];
  return labels
    .map((label, index) => ({ label, url: urls[index] || "" }))
    .filter((item) => item.label);
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("…");
    result.push(p);
  });
  return result;
}

export default function JobAnnouncements() {
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));

  const currentJobs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return jobs.slice(start, start + PAGE_SIZE);
  }, [page]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [page]);

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <section className="nj-section" aria-labelledby="jobs-heading">
      <h2 className="nj-heading" id="jobs-heading">
        Job Announcements
      </h2>
      <span className="nj-underline" />

      <div className="nj-jobs-box">
        <ul className="nj-jobs-list" ref={listRef}>
          {currentJobs.map((job) => {
            const results = statusLinks(job);
            return (
              <li className="nj-job" key={job.id}>
                <span className="nj-job-icon" aria-hidden="true">💼</span>
                <div className="nj-job-body">
                  <h3 className="nj-job-title">
                    <a href={job.advertisementUrl} target="_blank" rel="noreferrer">
                      {job.title}
                    </a>
                  </h3>
                  <div className="nj-job-meta">
                    <div className="nj-job-info">
                      <p className="nj-job-position">
                        Positions : <strong>{job.position}</strong>
                      </p>
                      <p className="nj-job-date">
                        Last Date : <strong>{job.lastDate}</strong>
                      </p>
                      {results.length > 0 && (
                        <p className="nj-job-status">
                          Status :{" "}
                          {results.map((item, index) => (
                            <span key={`${job.id}-status-${index}`}>
                              {index > 0 && " · "}
                              {item.url.startsWith("http") ? (
                                <a href={item.url} target="_blank" rel="noreferrer">
                                  <strong>{item.label}</strong>
                                </a>
                              ) : (
                                <strong>{item.label}</strong>
                              )}
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                    <a
                      className="nj-apply-btn"
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {job.applyLabel === "Apply Now" ? "✔ Apply Now" : job.applyLabel}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {jobs.length === 0 && (
          <p className="nj-jobs-empty">No open job announcements at the moment.</p>
        )}

        {jobs.length > 0 && (
        <nav className="nj-pagination" aria-label="Job announcements pagination">
          <button
            type="button"
            className="nj-page-btn"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {getPageNumbers(page, totalPages).map((p, i) =>
            p === "…" ? (
              <span className="nj-page-gap" key={`gap-${i}`}>…</span>
            ) : (
              <button
                type="button"
                key={p}
                className={`nj-page-btn ${p === page ? "is-active" : ""}`}
                onClick={() => goTo(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            className="nj-page-btn"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
        )}

        {jobs.length > 0 && (
        <p className="nj-page-info">
          Showing {jobs.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
          {Math.min(page * PAGE_SIZE, jobs.length)} of {jobs.length}
        </p>
        )}
      </div>
    </section>
  );
}
