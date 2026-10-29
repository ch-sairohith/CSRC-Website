import { Link } from 'react-router-dom'

const items = [
  {
    title: 'INTELLECTUAL PROPERTY RIGHTS POLICY OF IIT TIRUPATI',
    to: '/ip/ipr-policy',
    action: 'Download PDF',
  },
  {
    title:
      'INNOVATION AND BUSINESS INCUBATION AT INDIAN INSTITUTE OF TECHNOLOGY TIRUPATI GUIDELINES AND POLICY',
    to: '/ip/business-incubation-policy',
    action: 'Download PDF',
  },
  {
    title: 'Patent and Technology Transfer',
    text: 'Portal for patent and technology transfer at IIT Tirupati.',
    to: '/ip/patent-technology-transfer',
    action: 'Open portal',
  },
]

export default function IpIncubation() {
  return (
    <section className="projects-page" aria-labelledby="ip-heading">
      <div className="section-wrap">
        <h1 id="ip-heading" tabIndex={-1}>
          IP and Incubation
        </h1>
        <p className="projects-lead">
          Policies for intellectual property and business incubation, and the patent and technology
          transfer portal.
        </p>
        <ul className="ip-list">
          {items.map((item) => (
            <li key={item.to}>
              <h2>{item.title}</h2>
              {item.text ? <p>{item.text}</p> : null}
              <Link className="ip-link" to={item.to}>
                {item.action}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
