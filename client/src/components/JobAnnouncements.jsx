import { useEffect, useMemo, useRef, useState } from "react";

const jobs = [
  {
    "id": 1,
    "title": "Voluptates repudiandae dolore irure - Advt.568/2026",
    "position": "Delectus proident",
    "lastDate": "01-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 2,
    "title": "Hic eveniet magna illum voluptates maiores saepe iure itaque fugiat molestiae sapiente",
    "position": "Necessitatibus quam quo commodo occaecat",
    "lastDate": "27-Nov-2026",
    "applyUrl": "#"
  },
  {
    "id": 3,
    "title": "Nostrud maiores repellat - Advt.956/2026",
    "position": "Consequatur",
    "lastDate": "26-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 4,
    "title": "Asperiores laborum nostrud lorem culpa aut delectus saepe minim rerum - Advt.175/2026",
    "position": "Anim",
    "lastDate": "21-Nov-2026",
    "applyUrl": "#"
  },
  {
    "id": 5,
    "title": "Repudiandae quibusdam officia",
    "position": "Eum nulla",
    "lastDate": "14-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 6,
    "title": "Voluptas aliqua itaque itaque pariatur labore aute reprehenderit lorem incididunt repellat deserunt nihil rerum nisi sit laborum exercitation laborum tenetur delectus earum aute magna perferendis",
    "position": "Sapiente aute sapiente occaecat sapiente",
    "lastDate": "09-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 7,
    "title": "Dolore elit laborum nisi doloribus dolore voluptates culpa pariatur - Advt.978/2026",
    "position": "Culpa repellat alias",
    "lastDate": "21-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 8,
    "title": "Culpa alias aute maiores - Advt.771/2026",
    "position": "Sit illum aut",
    "lastDate": "05-Nov-2026",
    "applyUrl": "#"
  },
  {
    "id": 9,
    "title": "Dolor pariatur rerum necessitatibus molestiae fugiat culpa minim doloribus reiciendis incididunt laboris hic amet repudiandae fugiat mollit asperiores - Advt.860/2026",
    "position": "Elit ipsum doloribus",
    "lastDate": "08-Nov-2026",
    "applyUrl": "#"
  },
  {
    "id": 10,
    "title": "Repudiandae nostrud quam",
    "position": "Proident delectus consectetur iure vel",
    "lastDate": "18-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 11,
    "title": "Fugiat proident consectetur reiciendis aliquip exercitation occaecat occaecat rerum excepteur laborum minim - Advt.257/2026",
    "position": "Consequatur velit enim dolore officia",
    "lastDate": "16-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 12,
    "title": "Fugiat consequatur cupidatat aliqua - Advt.805/2026",
    "position": "Anim nihil reiciendis",
    "lastDate": "13-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 13,
    "title": "Aliqua culpa nulla voluptas fugiat veniam rerum doloribus nulla reprehenderit",
    "position": "Quam",
    "lastDate": "24-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 14,
    "title": "Tenetur cillum enim deserunt",
    "position": "Proident tempor",
    "lastDate": "19-Nov-2026",
    "applyUrl": "#"
  },
  {
    "id": 15,
    "title": "Nisi hic repudiandae reprehenderit quibusdam mollit mollit anim",
    "position": "Repudiandae",
    "lastDate": "22-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 16,
    "title": "Officia saepe culpa mollit quis nisi eiusmod tenetur laboris cillum itaque recusandae - Advt.721/2026",
    "position": "Nostrud veniam enim delectus elit",
    "lastDate": "26-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 17,
    "title": "Cupidatat laboris minim nulla - Advt.821/2026",
    "position": "Deserunt sit exercitation",
    "lastDate": "17-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 18,
    "title": "Quo commodo ullamco voluptate - Advt.248/2026",
    "position": "Excepteur quis iure",
    "lastDate": "01-Nov-2026",
    "applyUrl": "#"
  },
  {
    "id": 19,
    "title": "Officia cillum tempor temporibus temporibus anim rerum itaque itaque labore pariatur occaecat amet tempor reiciendis consectetur sed itaque asperiores sapiente dolore eum delectus repellat consequatur necessitatibus - Advt.256/2026",
    "position": "Minim sit dolore",
    "lastDate": "13-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 20,
    "title": "Aliqua deserunt nostrud proident quibusdam voluptate officia temporibus velit quam voluptate repudiandae - Advt.981/2026",
    "position": "Culpa nulla quo aut sit",
    "lastDate": "12-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 21,
    "title": "Hic ullamco repellat quam magna dolore molestiae quam",
    "position": "Temporibus repudiandae doloribus",
    "lastDate": "02-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 22,
    "title": "Rerum ullamco hic asperiores recusandae aut rerum voluptate eveniet adipiscing rerum laborum reprehenderit earum iure temporibus incididunt velit amet - Advt.495/2026",
    "position": "Incididunt voluptas perferendis laboris ullamco",
    "lastDate": "08-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 23,
    "title": "Dolor anim eiusmod enim sapiente recusandae velit quibusdam - Advt.486/2026",
    "position": "Cupidatat maiores",
    "lastDate": "22-Dec-2026",
    "applyUrl": "#"
  },
  {
    "id": 24,
    "title": "Repellat reiciendis labore velit quibusdam exercitation alias voluptates necessitatibus - Advt.198/2026",
    "position": "Officia voluptas",
    "lastDate": "26-Oct-2026",
    "applyUrl": "#"
  },
  {
    "id": 25,
    "title": "Occaecat quam irure officia ullamco labore reprehenderit eum enim maiores deserunt earum iure consequat consequatur hic cupidatat rerum earum vel fugiat - Advt.563/2026",
    "position": "Laboris repudiandae",
    "lastDate": "10-Oct-2026",
    "applyUrl": "#"
  }
];

const PAGE_SIZE = 10;

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

  const totalPages = Math.ceil(jobs.length / PAGE_SIZE);

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
          {currentJobs.map((job) => (
            <li className="nj-job" key={job.id}>
              <span className="nj-job-icon" aria-hidden="true">💼</span>
              <div className="nj-job-body">
                <h3 className="nj-job-title">{job.title}</h3>
                <div className="nj-job-meta">
                  <div className="nj-job-info">
                    <p className="nj-job-position">
                      Positions : <strong>{job.position}</strong>
                    </p>
                    <p className="nj-job-date">
                      Last Date : <strong>{job.lastDate}</strong>
                    </p>
                  </div>
                  <a
                    className="nj-apply-btn"
                    href={job.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ✔ Apply Now
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

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

        <p className="nj-page-info">
          Showing {(page - 1) * PAGE_SIZE + 1}–
          {Math.min(page * PAGE_SIZE, jobs.length)} of {jobs.length}
        </p>
      </div>
    </section>
  );
}