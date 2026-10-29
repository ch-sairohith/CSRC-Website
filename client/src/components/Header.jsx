import { useEffect, useRef, useState } from 'react'
import Announcements from './Announcements.jsx'

const links = [
  { label: 'Home', icon: 'home', page: 'home' },
  {
    label: 'Projects',
    icon: 'projects',
    children: [
      { label: 'Sponsored Projects', page: 'sponsored' },
      { label: 'Consultancy Projects', page: 'consultancy' },
    ],
  },
  { label: 'Research Facilities', icon: 'building' },
  { label: 'Grant Calls', icon: 'doc', page: 'grants' },
  { label: 'Outcomes of CSRC', icon: 'chart' },
  { label: 'CSRC Activities', icon: 'calendar' },
  { label: 'IP and Incubation', icon: 'bulb' },
  { label: 'Contacts', icon: 'mail', href: '#contact' },
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
  if (name === 'chart') {
    return (
      <svg {...common}>
        <path d="M4 19.5h16" />
        <path d="M7 16.5v-4M12 16.5V8M17 16.5v-7" />
      </svg>
    )
  }
  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
        <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
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
  const [navOpen, setNavOpen] = useState(false)
  const [narrow, setNarrow] = useState(false)
  const menuRef = useRef(null)
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const closeRef = useRef(null)
  const projectsOpen = page === 'consultancy' || page === 'sponsored'

  useEffect(() => {
    function onPointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1240px)')
    function sync() {
      setNarrow(query.matches)
      if (!query.matches) setNavOpen(false)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!navOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setNavOpen(false)
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !navRef.current) return
      const focusable = [...navRef.current.querySelectorAll('a, button')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [navOpen])

  function closeNav() {
    setNavOpen(false)
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  function choose(next) {
    setMenuOpen(false)
    setNavOpen(false)
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

      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={navOpen}
        aria-controls="primary-nav"
        onClick={() => setNavOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        Menu
      </button>

      {navOpen ? (
        <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={closeNav} />
      ) : null}

      <nav
        id="primary-nav"
        ref={navRef}
        className={`main-nav${navOpen ? ' is-open' : ''}`}
        aria-label="Primary"
        inert={narrow && !navOpen ? true : undefined}
      >
        <div className="nav-drawer-head">
          <p>Menu</p>
          <button ref={closeRef} type="button" className="nav-close" aria-label="Close menu" onClick={closeNav}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
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
              href={link.page === 'home' ? '#home' : (link.href ?? '#')}
              className={link.page && page === link.page ? 'is-active' : undefined}
              aria-current={link.page && page === link.page ? 'page' : undefined}
              onClick={
                link.page
                  ? (event) => {
                      event.preventDefault()
                      choose(link.page)
                    }
                  : (event) => {
                      setNavOpen(false)
                      setMenuOpen(false)
                      if (!link.href) return
                      event.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
              }
            >
              <Icon name={link.icon} />
              {link.label}
            </a>
          ),
        )}
      </nav>
      <Announcements />
    </header>
  )
}
