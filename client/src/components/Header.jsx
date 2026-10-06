import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'Home', icon: 'home', page: 'home' },
  { label: 'Grant Calls', icon: 'doc' },
  { label: 'Project Types', icon: 'pen' },
  { label: 'Research Facilities', icon: 'building' },
  {
    label: 'Projects',
    icon: 'projects',
    children: [
      { label: 'Consultancy Projects', page: 'consultancy' },
      { label: 'Sponsored Projects', page: 'sponsored' },
    ],
  },
  { label: 'CSRC Activities', icon: 'calendar' },
  { label: 'IP & Incubation', icon: 'bulb' },
]

function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'home') {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
      </svg>
    )
  }
  if (name === 'doc') {
    return (
      <svg {...common}>
        <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
        <path d="M14 3.5V8h4.5M8.5 12.5h7M8.5 16h7" />
      </svg>
    )
  }
  if (name === 'pen') {
    return (
      <svg {...common}>
        <path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-.7-.7a2 2 0 0 0-2.8 0L4 16.5z" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    )
  }
  if (name === 'building') {
    return (
      <svg {...common}>
        <path d="M4 20V6.5L12 3l8 3.5V20" />
        <path d="M9 20v-5h6v5M9 9.5h.01M15 9.5h.01M9 13h.01M15 13h.01" />
      </svg>
    )
  }
  if (name === 'projects') {
    return (
      <svg {...common}>
        <path d="M4 7.5h6l1.5-2H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z" />
        <path d="M3 10.5h18" />
      </svg>
    )
  }
  if (name === 'calendar') {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="1.5" />
        <path d="M8 3.5v4M16 3.5v4M4 10h16" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M9 18h6M10 21h4" />
      <path d="M8 14.5a6 6 0 1 1 8 0c-.8.7-1.2 1.4-1.3 2.5H9.3c-.1-1.1-.5-1.8-1.3-2.5z" />
    </svg>
  )
}

export default function Header({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const projectsOpen = page === 'consultancy' || page === 'sponsored'

  useEffect(() => {
    function onPointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  function choose(next) {
    setMenuOpen(false)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    onNavigate(next)
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <a className="institute-mark" href="#" aria-label="IIT Tirupati">
          <svg viewBox="0 0 36 36" aria-hidden="true">
            <rect x="1" y="1" width="34" height="34" rx="3" fill="#fff" stroke="#7a1f2e" />
            <path d="M18 6 8 12h20z" fill="#7a1f2e" />
            <path d="M11 14h2.2v10H11zM16.9 14h2.2v10h-2.2zM22.8 14H25v10h-2.2z" fill="#7a1f2e" />
            <path d="M9 24h18v2.2H9z" fill="#7a1f2e" />
          </svg>
          <span>
            IIT
            <br />
            TIRUPATI
          </span>
        </a>

        <div className="brand">
          <p className="brand-title">Centre for Sponsored Research &amp; Consultancy</p>
          <p className="brand-sub">Indian Institute of Technology Tirupati</p>
        </div>

        <div className="top-actions">
          <a className="csrc-logo" href="#">
            CSRC
            <br />
            LOGO
          </a>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary">
        {links.map((link) =>
          link.children ? (
            <div
              key={link.label}
              className={`nav-drop${menuOpen ? ' is-open' : ''}`}
              ref={menuRef}
            >
              <button
                type="button"
                className={`nav-trigger${projectsOpen ? ' is-active' : ''}`}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <Icon name={link.icon} />
                {link.label}
                <svg className="nav-chevron" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9.5 12 15l6-5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="nav-drop-panel" role="menu" aria-label="Projects">
                {link.children.map((child) => (
                  <button
                    key={child.page}
                    type="button"
                    role="menuitem"
                    className={page === child.page ? 'is-active' : undefined}
                    onClick={() => choose(child.page)}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={link.label}
              href={link.page === 'home' ? '#home' : '#'}
              className={link.page && page === link.page ? 'is-active' : undefined}
              aria-current={link.page && page === link.page ? 'page' : undefined}
              onClick={
                link.page
                  ? (event) => {
                      event.preventDefault()
                      choose(link.page)
                    }
                  : undefined
              }
            >
              <Icon name={link.icon} />
              {link.label}
            </a>
          ),
        )}
      </nav>
    </header>
  )
}
