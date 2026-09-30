import NewsEvents from "./News";
import JobAnnouncements from "./JobAnnouncements";

export default function NewsAndJobs() {
  return (
    <section className="nj-page">
      <div className="nj-wrapper">
        <div className="nj-col nj-col-jobs">
          <JobAnnouncements />
        </div>

        <div className="nj-col nj-col-news">
          <NewsEvents />
        </div>
      </div>
    </section>
  );
}
