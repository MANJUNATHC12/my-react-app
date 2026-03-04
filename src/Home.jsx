
      import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0c0c0c;
          --surface: rgba(18, 18, 18, 0.85);
          --border: rgba(255,255,255,0.08);
          --text: #f0ece4;
          --muted: rgba(240, 236, 228, 0.4);
          --accent: #c8a96e;
          --accent-dim: rgba(200, 169, 110, 0.15);
          --font-display: 'Cormorant Garamond', serif;
          --font-mono: 'DM Mono', monospace;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-mono);
          min-height: 200vh;
        }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 2.5rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          transition: background 0.4s ease, border-bottom 0.4s ease, backdrop-filter 0.4s ease;
          border-bottom: 1px solid transparent;
        }

        nav.scrolled {
          background: var(--surface);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border-bottom: 1px solid var(--border);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          user-select: none;
        }

        .nav-logo .logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
          margin-bottom: 2px;
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .nav-links {
          display: flex;
          gap: 0.25rem;
          list-style: none;
          align-items: center;
        }

        .nav-links li a {
          position: relative;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: 0.4rem 0.85rem;
          border-radius: 4px;
          transition: color 0.25s ease, background 0.25s ease;
          cursor: pointer;
        }

        .nav-links li a:hover,
        .nav-links li a.active {
          color: var(--text);
          background: var(--accent-dim);
        }

        .nav-links li a.active {
          color: var(--accent);
        }

        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.25s ease;
        }

        .nav-links li a.active::after {
          width: calc(100% - 1.7rem);
        }

        .nav-cta {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          border: none;
          padding: 0.55rem 1.3rem;
          border-radius: 3px;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          font-weight: 400;
        }

        .nav-cta:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text);
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(12,12,12,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 2.5rem 2rem;
          transform: translateY(-110%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 99;
        }

        .mobile-menu.open {
          transform: translateY(0);
        }

        .mobile-menu ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .mobile-menu ul li a {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s ease, padding-left 0.2s ease;
          cursor: pointer;
        }

        .mobile-menu ul li:last-child a { border-bottom: none; }

        .mobile-menu ul li a:hover,
        .mobile-menu ul li a.active {
          color: var(--accent);
          padding-left: 0.5rem;
        }

        .mobile-menu-cta {
          margin-top: 1.5rem;
          width: 100%;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          border: none;
          padding: 0.75rem;
          border-radius: 3px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }

        /* Demo page content */
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 2rem;
        }

        .hero h1 {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: 0.02em;
          color: var(--text);
          margin-bottom: 1.5rem;
        }

        .hero h1 em {
          font-style: italic;
          color: var(--accent);
        }

        .hero p {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          text-transform: uppercase;
        }
      `}</style>

      <nav className={scrolled ? "scrolled" : ""}>
        <a  href="h" className="nav-logo">
          <span className="logo-dot" />
          Studio
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={activeLink === label ? "active" : ""}
                onClick={(e) => { e.preventDefault(); setActiveLink(label); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="nav-cta">Get in touch</button>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={activeLink === label ? "active" : ""}
                onClick={(e) => { e.preventDefault(); setActiveLink(label); setMenuOpen(false); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className="mobile-menu-cta">Get in touch</button>
      </div>

      {/* Demo page background */}
      <div className="hero">
        <h1>Scroll to see<br /><em>navbar</em> in action</h1>
        <p>Resize window to test mobile menu</p>
      </div>
    </>
  );
}
