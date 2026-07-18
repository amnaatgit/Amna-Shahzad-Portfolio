import { useState, useEffect, useRef } from 'react'

/* ── Custom Hooks ───────────────────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wIdx, setWIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wIdx]
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed

    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplay(word.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setDisplay(word.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setWIdx(i => (i + 1) % words.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, wIdx, words, speed, pause])

  return display
}

/* ── Animation Components ────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div 
      ref={ref} 
      className={`fade-up ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ── Static Data Definition ──────────────────────────────────────────── */
const ROLES = [
  'Full Stack Developer',
  'Data Visualisation Analyst',
  'Enterprise Systems Engineer',
  'Power BI & Tableau Developer',
  'Backend & API Developer'
]

const WEB_PROJECTS = [
  {
    id: 1, tag: 'Complaint Management', title: 'UniVoice',
    desc: 'University complaint management system with AI-powered routing, role-based portals for 5 user types, real-time status tracking, anonymous submissions, and full timeline logging on every case.',
    chips: ['FastAPI', 'React', 'SQLAlchemy', 'JWT', 'Python', 'SQLite'],
    live: 'https://univoice-rho.vercel.app/', github: 'https://github.com/amnaatgit/Univoice',
    emoji: '🎓', gradient: 'linear-gradient(135deg, #1e1b4b, #312e81, #4338ca)',
    image: '/images/univoice.png',
  },
  {
    id: 2, tag: 'Enterprise Search', title: 'DocSearch Pro',
    desc: 'AI-powered document retrieval platform with BM25 ranking, context-aware scoring, Claude-powered synthesised answers, live autocomplete, bookmarking, and analytics dashboard.',
    chips: ['FastAPI', 'Python', 'BM25', 'Claude AI', 'SQLite', 'Jinja2'],
    live: 'https://context-based-file-retrieval-system.vercel.app/', github: 'https://github.com/amnaatgit/Context-Based-File-Retrieval-system',
    emoji: '🔍', gradient: 'linear-gradient(135deg, #0c4a6e, #075985, #0284c7)',
    image: '/images/docsearch.png',
  },
  {
    id: 3, tag: 'Inventory Management', title: 'OrderlyX',
    desc: 'Full-scale role-based inventory management system with product catalog, multi-warehouse stock tracking, purchase and sales orders, supplier profiles, automated alerts, and complete audit logging.',
    chips: ['Node.js', 'React', 'PostgreSQL', 'Prisma', 'JWT', 'Tailwind'],
    live: 'https://orderlyx.vercel.app/login', github: 'https://github.com/amnaatgit/orderlyx',
    emoji: '📦', gradient: 'linear-gradient(135deg, #064e3b, #047857, #059669)',
    image: '/images/orderlyx.png',
  },
  {
    id: 4, tag: 'Online Examination', title: 'ExamForge',
    desc: 'Professional online examination platform with role-based portals for teachers and students, exam builder, timed assessments, automated grading, and detailed result analytics.',
    chips: ['Node.js', 'Express', 'React', 'JWT', 'JSON Storage'],
    live: 'https://examforge-eight.vercel.app/', github: 'https://github.com/amnaatgit/Examforge',
    emoji: '📝', gradient: 'linear-gradient(135deg, #4a1942, #7e22ce, #9333ea)',
    image: '/images/examforge.png',
  },
  {
    id: 5, tag: 'Oracle APEX · SQL', title: 'InventIQ',
    desc: 'Inventory management system built on Oracle APEX with 21-table relational schema, 6 database triggers for stock tracking and audit logging, 5 reporting views, and a custom-styled dark dashboard.',
    chips: ['Oracle APEX', 'PL/SQL', 'Oracle SQL', 'Triggers', 'Views'],
    live: 'https://oracleapex.com/ords/r/inventory_managment/inventiq/login', github: null, emoji: '📊',
    gradient: 'linear-gradient(135deg, #1e1040, #2d1b69, #7c3aed)',
    image: '/images/inventiq.png',
  },
  {
    id: 6, tag: 'Threat Detection', title: 'SentinelAI',
    desc: 'Real-time network threat detection using a trained Isolation Forest ML model, four DSA engines (Suffix Array, Segment Tree, Trie, Max Flow). 99.7% accuracy, 0% false positive rate.',
    chips: ['Node.js', 'WebSockets', 'Isolation Forest', 'Suffix Array', 'Max Flow', 'Canvas'],
    live: null, github: null, emoji: '🛡️',
    gradient: 'linear-gradient(135deg, #1c1917, #292524, #dc2626)', comingSoon: true,
  },
]

const DATAVIZ = [
  {
    id: 1, title: 'BMW Sales Dashboard (2010–2024)', tool: 'Tableau',
    image: '/images/bmw.png',
    link: 'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book7_17759242048490/BMWSALES2010-2024',
    color: '#06b6d4',
  },
  {
    id: 2, title: 'Tesla Deliveries Intelligence Dashboard', tool: 'Interactive Dashboard',
    image: '/images/tesla.png',
    link: 'https://exquisite-rugelach-df4485.netlify.app/',
    color: '#ef4444',
  },
  {
    id: 3, title: 'Spotify Analysis Dashboard', tool: 'Tableau',
    image: '/images/spotify.png',
    link: 'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book5_17737652240640/Dashboard1',
    color: '#22c55e',
  },
  {
    id: 4, title: 'IMDB Top 1000 Movies Analytics', tool: 'Tableau',
    image: '/images/imdb.png',
    link: 'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book4_17732694464350/Dashboard1',
    color: '#f59e0b',
  },
  {
    id: 5, title: 'Adidas Sales Analytics Dashboard', tool: 'Power BI',
    image: '/images/adidas.png',
    link: null, color: '#a3e635',
  },
  {
    id: 6, title: 'HR Analytics Board', tool: 'Power BI',
    image: '/images/hr.png',
    link: null, color: '#818cf8',
  },
]

const SKILLS = [
  { label: 'Frontend', chips: ['React', 'Vite', 'Tailwind CSS', 'AngularJS', 'Flutter', 'HTML/CSS', 'JavaScript'] },
  { label: 'Backend', chips: ['Node.js', 'Express', 'FastAPI', 'Python', 'REST APIs', 'JWT Auth'] },
  { label: 'Databases', chips: ['PostgreSQL', 'MySQL', 'SQLite', 'Prisma ORM', 'SQLAlchemy', 'Oracle SQL'] },
  { label: 'Languages', chips: ['JavaScript', 'Python', 'C++', 'C', 'SQL', 'PL/SQL', 'Dart'] },
  { label: 'Data Tools', chips: ['Power BI', 'Tableau', 'Excel', 'Pandas', 'Oracle APEX'] },
  { label: 'Tools', chips: ['Git', 'GitHub', 'VS Code', 'Postman', 'Railway', 'Vercel'] },
]

/* ── Navigation ──────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-logo">Amna Shahzad</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#dataviz">Data Viz</a>
        <a href="#experience">Education</a>
        <a 
          href="https://www.linkedin.com/in/amna-shahzad-393955356/" 
          className="nav-cta" 
          target="_blank" 
          rel="noreferrer"
        >
          Let's Connect
        </a>
      </div>
    </nav>
  )
}

/* ── Hero Header ─────────────────────────────────────────────────────── */
function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <header className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Open to opportunities
          </div>
          <h1>
            <span className="hero-greeting">Hi, I'm</span>
            <span className="name-grad">Amna Shahzad</span>
          </h1>
          <div className="hero-role" aria-live="polite">
            {role}<span className="cursor" aria-hidden="true" />
          </div>
          <p className="hero-desc">
            Full-stack developer and data analyst from{' '}
            <span className="hero-highlight">FAST NUCES</span> — building production-ready 
            web applications and turning complex datasets into clear, interactive dashboards 
            using Power BI, Tableau, and custom code environments.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              View Projects
            </a>
            <a href="mailto:amna22875@gmail.com" className="btn-secondary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get In Touch
            </a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/amnaatgit" className="social-link" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub Profile">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="social-link" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn Profile">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:amna22875@gmail.com" className="social-link" title="Email" aria-label="Send Email">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        {/* Dynamic Code Terminal Graphic */}
        <div className="hero-card" aria-hidden="true">
          <div className="hero-card-bar">
            <div className="dot dot-r"/><div className="dot dot-y"/><div className="dot dot-g"/>
            <span className="terminal-path">amna@dev ~ </span>
          </div>
          <div className="hero-card-body">
            <div><span className="c-green">const</span> <span className="c-cyan">developer</span> <span className="c-white">= {'{'}</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">name</span><span className="c-white">: </span><span className="c-amber">"Amna Shahzad"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">university</span><span className="c-white">: </span><span className="c-amber">"FAST NUCES"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">focus</span><span className="c-white">: [</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Full Stack Dev"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Data Visualisation"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Power BI / Tableau"</span></div>
            <div style={{paddingLeft:16}}><span className="c-white">],</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">tools</span><span className="c-white">: [</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"React"</span><span className="c-white">, </span><span className="c-amber">"Node.js"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Python"</span><span className="c-white">, </span><span className="c-amber">"FastAPI"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"PostgreSQL"</span><span className="c-white">, </span><span className="c-amber">"SQL"</span></div>
            <div style={{paddingLeft:16}}><span className="c-white">],</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">status</span><span className="c-white">: </span><span className="c-green">"open to work"</span></div>
            <div><span className="c-white">{'}'}</span></div>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ── About Me Section ────────────────────────────────────────────────── */
function About() {
  return (
    <section className="section" id="about">
      <FadeUp>
        <div className="section-label-group">
          <span className="section-eyebrow">Who I am</span>
          <span className="section-eyebrow-divider">—</span>
        </div>
        <h2 className="section-title-large">About me</h2>
      </FadeUp>

      <div className="about-grid">
        <FadeUp delay={100}>
          <div className="about-text">
            <p>I'm a software developer and data analyst from <span className="about-highlight">FAST NUCES, Karachi</span> — working across the full stack to build production-ready applications, and using Power BI and Tableau to turn raw data into dashboards that actually drive decisions.</p>
            <p>On the development side, I build full-stack web applications — from university complaint management systems to inventory platforms — using <span className="about-highlight">React, Node.js, FastAPI, and PostgreSQL</span>. I focus on role-based access, clean architecture, and systems that reflect what a real business actually needs.</p>
            <p>On the data side, I've built dashboards across diverse industries — automotive sales (BMW), entertainment (Spotify, IMDB), HR analytics, retail (Adidas), and EV intelligence (Tesla). Each project goes beyond charts — it tells a story from the data.</p>
            <p>Currently based in <span className="about-highlight">Karachi, Pakistan</span> and open to full-stack, data analytics, and BI developer roles.</p>
          </div>
          <div className="about-stats">
            {[
              ['5+', 'Full-stack projects shipped'],
              ['6+', 'Data dashboards built'],
              ['4+', 'Industries analysed'],
              ['10+', 'Technologies in daily use']
            ].map(([n, l]) => (
              <div className="stat-box" key={l}>
                <div className="stat-box-num">{n}</div>
                <div className="stat-box-lbl">{l}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div className="skills-grid">
            {SKILLS.map(g => (
              <div key={g.label} className="skill-group">
                <div className="skill-group-label">{g.label}</div>
                <div className="skill-chips">
                  {g.chips.map(c => <span className="skill-chip" key={c}>{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── Project Showcase Component ───────────────────────────────────────── */
function ProjCard({ p, i }) {
  return (
    <FadeUp delay={i * 80}>
      <div className="project-card">
        <div className="project-preview">
          {p.image ? (
            <img 
              src={p.image} 
              alt={`Visual preview of project ${p.title}`} 
              loading="lazy"
              className="project-img"
            />
          ) : (
            <>
              <div className="project-preview-bg" style={{ background: p.gradient }}/>
              <div className="project-preview-icon" aria-hidden="true">{p.emoji}</div>
            </>
          )}
          {!p.comingSoon ? (
            <div className="project-links-overlay">
              <a href={p.live} className="overlay-btn overlay-btn-primary" target="_blank" rel="noreferrer">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live Demo
              </a>
              {p.github && (
                <a href={p.github} className="overlay-btn overlay-btn-secondary" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>
          ) : (
            <div className="project-links-overlay project-overlay-disabled">
              <div className="coming-soon-badge">Coming soon</div>
            </div>
          )}
        </div>
        <div className="project-body">
          <div className="project-tag">{p.tag}</div>
          <div className="project-title">{p.title}</div>
          <p className="project-desc">{p.desc}</p>
          <div className="project-chips">
            {p.chips.map(c => <span className="project-chip" key={c}>{c}</span>)}
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ── Data Visualisation Component ────────────────────────────────────── */
function VizCard({ d, i }) {
  const toolColors = {
    'Tableau': '#6366f1',
    'Power BI': '#f59e0b',
    'Interactive Dashboard': '#06b6d4',
  }
  const clr = toolColors[d.tool] || '#6366f1'

  return (
    <FadeUp delay={i * 70}>
      <div className="viz-card">
        <div className="viz-thumb">
          <img src={d.image} alt={`Data visualization dashboard for ${d.title}`} loading="lazy"/>
          <div className="viz-thumb-overlay">
            {d.link ? (
              <a href={d.link} className="overlay-btn overlay-btn-primary" target="_blank" rel="noreferrer">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Dashboard
              </a>
            ) : (
              <div className="viz-preview-badge">Preview below</div>
            )}
          </div>
        </div>
        <div className="viz-body">
          <div className="viz-tool" style={{ color: clr, borderColor: `${clr}40`, background: `${clr}12` }}>
            {d.tool}
          </div>
          <div className="viz-title">{d.title}</div>
          {d.link ? (
            <a href={d.link} className="viz-link" target="_blank" rel="noreferrer">
              Open dashboard →
            </a>
          ) : (
            <span className="viz-link-disabled">Screenshot preview</span>
          )}
        </div>
      </div>
    </FadeUp>
  )
}

/* ── App Content Sections ────────────────────────────────────────────── */
function Projects() {
  return (
    <section className="section-full projects-bg" id="projects">
      <div className="section-inner">
        <FadeUp>
          <div className="section-label">Web Projects</div>
          <h2 className="section-title">Full-stack applications</h2>
          <p className="section-sub">Role-based, production-ready systems built with modern stacks — reflecting what real businesses require.</p>
        </FadeUp>
        <div className="projects-grid">
          {WEB_PROJECTS.map((p, i) => <ProjCard key={p.id} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}

function DataViz() {
  return (
    <section className="section" id="dataviz">
      <FadeUp>
        <div className="section-label">Data Visualisation</div>
        <h2 className="section-title">Dashboards & analytics</h2>
        <p className="section-sub">Interactive dashboards built in Tableau, Power BI, and custom layouts — transforming raw datasets into dynamic corporate insights.</p>
      </FadeUp>
      <div className="viz-grid">
        {DATAVIZ.map((d, i) => <VizCard key={d.id} d={d} i={i}/>)}
      </div>
    </section>
  )
}

function Experience() {
  const items = [
    {
      period: '2021 — 2025',
      role: 'Bachelor of Science — Computer Science',
      company: 'FAST NUCES, Karachi',
      points: [
        'Built full-stack web applications across multiple domains including complaint management, inventory, examination, and document retrieval',
        'Designed and implemented data dashboards in Power BI and Tableau covering automotive, retail, HR, and entertainment industries',
        'Coursework: Data Structures, Algorithms, Database Systems, OOP, Software Engineering, Data Mining',
        'Final year projects demonstrate both software engineering depth and data analytics breadth',
      ],
    },
  ]

  return (
    <section className="section" id="experience">
      <FadeUp>
        <div className="section-label">Education</div>
        <h2 className="section-title">Academic background</h2>
      </FadeUp>
      <div className="exp-timeline">
        {items.map((item, i) => (
          <FadeUp key={i} delay={i * 120}>
            <div className="exp-item">
              <div className="exp-period">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {item.period}
              </div>
              <div className="exp-role">{item.role}</div>
              <div className="exp-company">{item.company}</div>
              <ul className="exp-points">
                {item.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section-full contact-wrapper" id="contact">
      <div className="contact-inner">
        <FadeUp>
          <div className="section-label">Contact</div>
          <h2 className="section-title-center">Let's work together</h2>
          <p className="contact-desc">Open to full-stack, data analytics, and BI developer roles. Whether it's building an enterprise application, creating a data dashboard, or collaborating on something new — reach out.</p>
          <div className="contact-links">
            <a href="mailto:amna22875@gmail.com" className="contact-link contact-link-primary" aria-label="Email Amna">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              amna22875@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="contact-link" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/amnaatgit" className="contact-link" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── Application Architecture Root ───────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <div className="divider" aria-hidden="true" />
        <About />
        <div className="divider" aria-hidden="true" />
        <Projects />
        <div className="divider" aria-hidden="true" />
        <DataViz />
        <div className="divider" aria-hidden="true" />
        <Experience />
        <div className="divider" aria-hidden="true" />
        <Contact />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Amna Shahzad · Built with React + Vite · Deployed on Vercel
      </footer>
    </>
  )
}
