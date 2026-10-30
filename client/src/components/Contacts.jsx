const contactGroups = [
  {
    title: 'Administration',
    description: 'For general administrative queries and project recruitment.',
    contacts: [
      { label: 'CSRC office and project administration', email: 'src_office@iittp.ac.in' },
      { label: 'Project Recruitment', email: 'csrc_recruitment@iittp.ac.in' },
    ],
  },
  {
    title: 'Project Operations',
    description: 'For project accounts and purchase-related assistance.',
    contacts: [
      { label: 'Project accounts', email: 'srcaccounts_office@iittp.ac.in' },
      { label: 'Project Purchase', email: 'csrc_purchase@iittp.ac.in' },
    ],
  },
  {
    title: 'Escalations and Grievances',
    description: 'For escalations or grievances related to CSRC projects.',
    contacts: [
      { label: 'Project Manager', email: 'pm_csrc@iittp.ac.in' },
      { label: 'Advisor, CSRC Project Administration', email: 'advisor_src_project@iittp.ac.in' },
    ],
  },
  {
    title: 'IP and Innovation',
    description: 'For innovation, incubation, and related enquiries.',
    contacts: [
      { label: 'Project Manager', email: 'pm_innovations@iittp.ac.in' },
      { label: 'Advisor (Innovation and Incubation)', email: 'advisor_src_innovation@iittp.ac.in' },
    ],
  },
]

export default function Contacts() {
  return (
    <section className="contacts-section" id="contact" aria-labelledby="contacts-heading">
      <div className="contacts-inner">
        <div className="contacts-heading">
          <p className="contacts-eyebrow">We’re here to help</p>
          <h2 id="contacts-heading">Contact CSRC</h2>
          <p>Reach the right team for administrative, project, or escalation support.</p>
        </div>
        <div className="contacts-grid">
          {contactGroups.map((group) => (
            <article className="contact-group" key={group.title}>
              <h3>{group.title}</h3>
              <p className="contact-description">{group.description}</p>
              <ul>
                {group.contacts.map((contact) => (
                  <li key={contact.email}>
                    <span>{contact.label}</span>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
