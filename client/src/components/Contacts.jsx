const directory = [
  {
    role: 'Dean (CSRC)',
    name: 'Dr. Shihabudheen M. Maliyekkal',
    email: 'dean_src@iittp.ac.in',
  },
  {
    role: 'Advisor (Projects)',
    name: 'Dr. Koteswara Rao Bommisetti',
    email: 'advisor_src_project@iittp.ac.in',
  },
  {
    role: 'Advisor (Innovations)',
    name: 'Dr. Thiyagarajan R',
    email: 'advisor_src_innovation@iittp.ac.in',
  },
  {
    role: 'Advisor (Industry Outreach)',
    name: 'Dr. Sourav Chakraborty',
    email: 'advisor_src_research@iittp.ac.in',
  },
  {
    role: 'Deputy Registrar',
    name: 'Mr. Rajan Babu Lankapalli',
    email: 'dr_csrc@iittp.ac.in',
    centered: true,
  },
]

const generalEnquiry = 'office_dean_csrc@iittp.ac.in'

export default function Contacts() {
  return (
    <section className="contacts-section" id="contact" aria-labelledby="contacts-heading">
      <div className="contacts-inner">
        <div className="contacts-heading">
          <p className="contacts-eyebrow">We’re here to help</p>
          <h2 id="contacts-heading">Contact CSRC</h2>
          <p>Reach the Dean, advisors, and CSRC office for project, innovation, and outreach support.</p>
        </div>
        <div className="contacts-grid">
          {directory.map((person) => (
            <article className={`contact-group${person.centered ? ' is-centered' : ''}`} key={person.email}>
              <h3>{person.role}</h3>
              <p className="contact-name">{person.name}</p>
              <p className="contact-email">
                <span>Email</span>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </p>
            </article>
          ))}
        </div>
        <dl className="contacts-meta">
          <div>
            <dt>General enquiries</dt>
            <dd>
              <a href={`mailto:${generalEnquiry}`}>{generalEnquiry}</a>
            </dd>
          </div>
          <div>
            <dt>Office hours</dt>
            <dd>9:00 AM – 5:30 PM</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Admin Building, CSRC Office – 2nd Floor, IIT Tirupati</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
