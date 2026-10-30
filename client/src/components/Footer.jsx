import { Link } from 'react-router-dom'

const social = [
  { label: 'Facebook', path: 'M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z' },
  { label: 'X', path: 'M7 7l4.2 5.5L7.2 17H8.6l3.2-3.6L14.6 17H17l-4.4-5.8L16.6 7h-1.4l-2.9 3.3L9.4 7z' },
  { label: 'LinkedIn', path: 'M8 9.5H5.5V18H8zM6.7 6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zM18.5 18h-2.4v-4.4c0-1.2-.5-2-1.6-2s-1.7.7-1.7 2V18H10.4V9.5h2.3v1.1c.4-.7 1.3-1.3 2.6-1.3 1.9 0 3.2 1.2 3.2 3.8z' },
  { label: 'Instagram', path: 'M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8zM16.7 7.6a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8zM7.2 6.2h9.6A2.6 2.6 0 0 1 19.4 8.8v6.4a2.6 2.6 0 0 1-2.6 2.6H7.2a2.6 2.6 0 0 1-2.6-2.6V8.8a2.6 2.6 0 0 1 2.6-2.6z' },
  { label: 'YouTube', path: 'M19.2 8.2a2 2 0 0 0-1.4-1.4C16.4 6.5 12 6.5 12 6.5s-4.4 0-5.8.3a2 2 0 0 0-1.4 1.4A21 21 0 0 0 4.5 12a21 21 0 0 0 .3 3.8 2 2 0 0 0 1.4 1.4c1.4.3 5.8.3 5.8.3s4.4 0 5.8-.3a2 2 0 0 0 1.4-1.4 21 21 0 0 0 .3-3.8 21 21 0 0 0-.3-3.8zM10.8 14.5v-5l4.2 2.5z' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <h2>Quick Links</h2>
          <a href="#">IIT Tirupati</a>
          <a href="#">CSRC Internal Site</a>
        </div>
        <div>
          <h2>Contact Us</h2>
          <p>
            Centre for Sponsored Research &amp; Consultancy,
            <br />
            IIT Tirupati, Andhra Pradesh – 517619
          </p>
          <Link to="/contacts">View CSRC contact directory</Link>
        </div>
        <div>
          <h2>Social Media</h2>
          <div className="social-row">
            {social.map((item) => (
              <a key={item.label} href="#" aria-label={item.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={item.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <p>
          Copyright @ CSRC 2026. All Rights Reserved | <a href="#">Privacy Policy</a>
        </p>
        <button
          type="button"
          className="to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 14l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
