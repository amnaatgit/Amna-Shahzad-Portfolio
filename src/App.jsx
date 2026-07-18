import { useState, useEffect, useRef } from 'react'

/* ── Typewriter ─────────────────────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wIdx, setWIdx]       = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word  = words[wIdx]
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed
    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) { setDisplay(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }
      else if (!deleting && charIdx === word.length) { setDeleting(true) }
      else if (deleting && charIdx > 0) { setDisplay(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }
      else { setDeleting(false); setWIdx(i => (i + 1) % words.length) }
    }, delay)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wIdx, words, speed, pause])
  return display
}

/* ── Fade-up ─────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

/* ── Lightbox ────────────────────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div onClick={onClose} style={{
      position:'fixed',inset:0,zIndex:1000,
      background:'rgba(0,0,0,0.92)',backdropFilter:'blur(8px)',
      display:'flex',alignItems:'center',justifyContent:'center',
      cursor:'zoom-out',padding:20,
    }}>
      <img src={src} alt={alt} onClick={e=>e.stopPropagation()} style={{
        maxWidth:'92vw',maxHeight:'90vh',borderRadius:12,
        boxShadow:'0 32px 80px rgba(0,0,0,0.8)',objectFit:'contain',cursor:'default',
      }}/>
      <button onClick={onClose} style={{
        position:'fixed',top:20,right:24,background:'rgba(255,255,255,0.1)',
        border:'1px solid rgba(255,255,255,0.2)',color:'#fff',
        width:40,height:40,borderRadius:'50%',fontSize:20,cursor:'pointer',
        display:'flex',alignItems:'center',justifyContent:'center',
      }}>✕</button>
    </div>
  )
}

/* ── Data ───────────────────────────────────────────────────────────── */
const ROLES = [
  'Full Stack Developer',
  'Data Visualisation Analyst',
  'Power BI & Tableau Developer',
  'Backend & API Developer',
  'Database Systems Engineer',
]

const WEB_PROJECTS = [
  {
    id:1, tag:'Complaint Management', title:'UniVoice',
    desc:'University complaint management platform with AI-powered department routing, role-based access for 5 user types (Student, Faculty, Admin, Management, HR), anonymous submissions, unique tracking IDs, and full case timeline logging.',
    chips:['FastAPI','React','SQLAlchemy','JWT Auth','Python','SQLite'],
    live:'https://univoice-rho.vercel.app/', github:'https://github.com/amnaatgit/Univoice',
    emoji:'🎓', gradient:'linear-gradient(135deg,#1e1b4b,#312e81,#4338ca)',
    image:'/images/univoice.png',
  },
  {
    id:2, tag:'AI-Powered Enterprise Search', title:'DocSearch Pro',
    desc:'Context-aware document retrieval system using BM25 ranking, department-aware scoring, Claude AI synthesised answers, live autocomplete, bookmarking, upload-and-index, and a full analytics dashboard.',
    chips:['FastAPI','Python','BM25','Claude AI','SQLite','Jinja2'],
    live:'https://context-based-file-retrieval-system.vercel.app/', github:'https://github.com/amnaatgit/Context-Based-File-Retrieval-system',
    emoji:'🔍', gradient:'linear-gradient(135deg,#0c4a6e,#075985,#0284c7)',
    image:'/images/docsearch.png',
  },
  {
    id:3, tag:'Inventory Management', title:'OrderlyX',
    desc:'Enterprise-grade inventory platform covering products, multi-warehouse stock, purchase & sales orders, supplier profiles, low-stock alerts, discount rules, and a complete audit trail — with 4 role levels.',
    chips:['Node.js','React','PostgreSQL','Prisma ORM','JWT','Tailwind'],
    live:'https://orderlyx.vercel.app/login', github:'https://github.com/amnaatgit/orderlyx',
    emoji:'📦', gradient:'linear-gradient(135deg,#064e3b,#047857,#059669)',
    image:'/images/orderlyx.png',
  },
  {
    id:4, tag:'Online Examination', title:'ExamForge',
    desc:'Online examination system with separate instructor and student portals, timed MCQ/short-answer exams, automated grading, result analytics, and a secure question bank — no database setup required.',
    chips:['Node.js','Express','React','JWT Auth','JSON Storage'],
    live:'https://examforge-eight.vercel.app/', github:'https://github.com/amnaatgit/Examforge',
    emoji:'📝', gradient:'linear-gradient(135deg,#4a1942,#7e22ce,#9333ea)',
    image:'/images/examforge.png',
  },
  {
    id:5, tag:'Oracle APEX · Database Systems', title:'InventIQ',
    desc:'Inventory management system built on Oracle APEX — 21 relational tables, 6 PL/SQL triggers for automatic stock updates and audit logging, 5 business reporting views, and a fully custom-styled dashboard.',
    chips:['Oracle APEX','PL/SQL','Oracle SQL','Triggers','Views','Normalisation'],
    live:'https://oracleapex.com/ords/r/inventory_managment/inventiq/login', github:null, emoji:'📊',
    gradient:'linear-gradient(135deg,#1e1040,#2d1b69,#7c3aed)',
    image:'/images/inventiq.png',
  },
]

const DATAVIZ = [
  {
    id:1, title:'BMW Sales Dashboard (2010–2024)', tool:'Tableau',
    image:'/images/bmw.png',
    link:'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book7_17759242048490/BMWSALES2010-2024',
    color:'#06b6d4',
  },
  {
    id:2, title:'Tesla Deliveries Intelligence Dashboard', tool:'Interactive Dashboard',
    image:'/images/tesla.png',
    link:'https://exquisite-rugelach-df4485.netlify.app/',
    color:'#ef4444',
  },
  {
    id:3, title:'Spotify Analysis Dashboard', tool:'Tableau',
    image:'/images/spotify.png',
    link:'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book5_17737652240640/Dashboard1',
    color:'#22c55e',
  },
  {
    id:4, title:'IMDB Top 1000 Movies Analytics', tool:'Tableau',
    image:'/images/imdb.png',
    link:'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book4_17732694464350/Dashboard1',
    color:'#f59e0b',
  },
  {
    id:5, title:'Adidas Sales Analytics Dashboard', tool:'Power BI',
    image:'/images/adidas.png',
    link:null, color:'#a3e635',
  },
  {
    id:6, title:'HR Analytics Board', tool:'Power BI',
    image:'/images/hr.png',
    link:null, color:'#818cf8',
  },
]

const SKILLS = [
  { label:'Frontend',   chips:['React','Vite','Tailwind CSS','HTML/CSS','JavaScript','AngularJS'] },
  { label:'Backend',    chips:['Node.js','Express','FastAPI','Python','REST APIs','JWT Auth'] },
  { label:'Databases',  chips:['PostgreSQL','MySQL','SQLite','Prisma ORM','SQLAlchemy','Oracle SQL','PL/SQL'] },
  { label:'Languages',  chips:['JavaScript','Python','C++','C','SQL'] },
  { label:'Data & BI',  chips:['Power BI','Tableau','Excel','Oracle APEX'] },
  { label:'Tools',      chips:['Git','GitHub','VS Code','Railway','Vercel','Netlify'] },
]

const TOOL_COLORS = { 'Tableau':'#6366f1', 'Power BI':'#f59e0b', 'Interactive Dashboard':'#06b6d4' }

/* ── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const h = () => setSc(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className="nav" style={sc ? {boxShadow:'0 4px 30px rgba(0,0,0,0.5)'} : {}}>
      <div className="nav-logo">Amna Shahzad</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#dataviz">Data Viz</a>
        <a href="#education">Education</a>
        <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="nav-cta" target="_blank" rel="noreferrer">Let's Connect</a>
      </div>
    </nav>
  )
}

/* ── Hero ────────────────────────────────────────────────────────────── */
function Hero() {
  const role = useTypewriter(ROLES)
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div>
          {/* Availability badge */}
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20,flexWrap:'wrap'}}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot"/>
              Available for internships & opportunities
            </div>
            <span style={{
              fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:20,
              background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.3)',
              color:'#a5b4fc',letterSpacing:'0.06em'
            }}>3rd Year · NED University</span>
          </div>

          <h1>
            <span style={{display:'block',color:'var(--text2)',fontSize:'50%',fontWeight:400,marginBottom:6}}>Hi, I'm</span>
            <span className="name-grad">Amna Shahzad</span>
          </h1>

          <div className="hero-role">{role}<span className="cursor"/></div>

          <p className="hero-desc">
            Computer Science student at <span style={{color:'var(--text)',fontWeight:600}}>NED University of Engineering and Technology</span>, Karachi — building full-stack web applications and interactive data dashboards across Power BI, Tableau, and custom HTML/CSS.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              View Projects
            </a>
            <a href="mailto:amna22875@gmail.com" className="btn-secondary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Get In Touch
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/amnaatgit" className="social-link" target="_blank" rel="noreferrer" title="GitHub">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="social-link" target="_blank" rel="noreferrer" title="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:amna22875@gmail.com" className="social-link" title="Email">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        {/* Terminal card */}
        <div className="hero-card">
          <div className="hero-card-bar">
            <div className="dot dot-r"/><div className="dot dot-y"/><div className="dot dot-g"/>
            <span style={{marginLeft:8,fontSize:12,color:'var(--text3)',fontFamily:'var(--font-m)'}}>amna@dev ~</span>
          </div>
          <div className="hero-card-body">
            <div><span className="c-green">const</span> <span className="c-cyan">amna</span> <span className="c-white">= {'{'}</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">university</span><span className="c-white">: </span><span className="c-amber">"NED University"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">degree</span><span className="c-white">: </span><span className="c-amber">"BS Computer Science"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">year</span><span className="c-white">: </span><span className="c-amber">"3rd Year (2024–2028)"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">focus</span><span className="c-white">: [</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Full Stack Development"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Data Visualisation"</span><span className="c-white">,</span></div>
            <div style={{paddingLeft:32}}><span className="c-amber">"Database Systems"</span></div>
            <div style={{paddingLeft:16}}><span className="c-white">],</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">stack</span><span className="c-white">: [</span><span className="c-amber">"React"</span><span className="c-white">, </span><span className="c-amber">"Node.js"</span><span className="c-white">, </span><span className="c-amber">"Python"</span><span className="c-white">, </span><span className="c-amber">"SQL"</span><span className="c-white">],</span></div>
            <div style={{paddingLeft:16}}><span className="c-purple">status</span><span className="c-white">: </span><span className="c-green">"open to opportunities"</span></div>
            <div><span className="c-white">{'}'}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── About ───────────────────────────────────────────────────────────── */
function About() {
  return (
    <section className="section" id="about">
      <FadeUp>
        <div className="section-label">
          <span style={{ color: '#4A90D9', fontWeight: 500 }}>
            Who I am
          </span>
        </div>
        <h2 className="section-title" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          lineHeight: 1.1,
          marginTop: '8px'
        }}>
          <span style={{ 
            color: 'var(--text-primary)', 
            fontSize: '3.5rem',
            fontWeight: 700
          }}>
            About
          </span>
          <span style={{ 
            color: '#4A90D9', 
            fontSize: '3.5rem',
            fontWeight: 700
          }}>
            me
          </span>
        </h2>
      </FadeUp>
      <div className="about-grid">
        <FadeUp delay={100}>
          <div className="about-text">
            <p>I'm a 3rd year Computer Science student at <span className="about-highlight">NED University of Engineering and Technology, Karachi</span> — one of Pakistan's leading engineering institutions. I work across the full stack to build real-world web applications, and use Power BI and Tableau to turn complex datasets into dashboards that communicate clearly.</p>
            <p>On the development side, I've shipped production-quality applications covering complaint management, inventory systems, examination platforms, and AI-powered document search — using <span className="about-highlight">React, Node.js, FastAPI, PostgreSQL, and Oracle APEX</span>. Every project focuses on role-based architecture, clean structure, and practical business logic.</p>
            <p>On the data side, I build dashboards across diverse industries — automotive (BMW), streaming (Spotify), entertainment (IMDB), HR, retail (Adidas), and EV analytics (Tesla). I treat each dataset as a story that needs to be told clearly.</p>
            <p>Expected to graduate in <span className="about-highlight">2028</span>. Currently based in Karachi and open to internships, part-time roles, and freelance opportunities.</p>
          </div>
          <div className="about-stats" style={{marginTop:28}}>
            {[
              ['5','Full-stack projects live'],
              ['6','Data dashboards built'],
              ['4+','Industries analysed'],
              ['3rd','Year at NED University'],
            ].map(([n,l]) => (
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
              <div key={g.label}>
                <div className="skill-group-label">{g.label}</div>
                <div className="skill-chips">
                  {g.chips.map(c => <span className="skill-chip" key={c}>{c}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Currently learning */}
          <div style={{
            marginTop:24, padding:'14px 16px', borderRadius:10,
            background:'rgba(99,102,241,0.07)', border:'1px solid rgba(99,102,241,0.2)',
          }}>
            <div style={{fontSize:10.5,fontWeight:700,color:'var(--accent)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>
              Currently studying
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {['Data Structures & Algorithms','Database Management Systems','Operating Systems','Object-Oriented Programming','Computer Networks'].map(c => (
                <span key={c} style={{
                  fontSize:11.5,padding:'3px 10px',borderRadius:20,
                  background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.2)',color:'#a5b4fc'
                }}>{c}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── Project card ────────────────────────────────────────────────────── */
function ProjCard({ p, i }) {
  const [lb, setLb] = useState(false)
  return (
    <FadeUp key={p.id} delay={i*70}>
      {lb && <Lightbox src={p.image} alt={p.title} onClose={() => setLb(false)}/>}
      <div className="proj-card">
        <div className="proj-thumb" style={{cursor: p.image ? 'zoom-in' : 'default'}}
          onClick={() => p.image && setLb(true)}>
          {p.image ? (
            <img src={p.image} alt={p.title} loading="lazy"
              style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>
          ) : (
            <>
              <div className="proj-thumb-bg" style={{background:p.gradient,position:'absolute',inset:0}}/>
              <div style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
                <div className="proj-thumb-icon">{p.emoji}</div>
              </div>
            </>
          )}
          <div className="proj-overlay" onClick={e => e.stopPropagation()}>
            {p.image && (
              <button onClick={e=>{e.stopPropagation();setLb(true)}} className="obtn-s">
                🔍 View Screenshot
              </button>
            )}
            {p.live && <a href={p.live} className="obtn-p" target="_blank" rel="noreferrer">Live Demo</a>}
            {p.github && <a href={p.github} className="obtn-s" target="_blank" rel="noreferrer">GitHub</a>}
          </div>
        </div>
        <div className="proj-body">
          <div className="proj-tag">{p.tag}</div>
          <div className="proj-title">{p.title}</div>
          <div className="proj-desc">{p.desc}</div>
          <div className="proj-chips">{p.chips.map(c => <span className="proj-chip" key={c}>{c}</span>)}</div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ── Viz card ────────────────────────────────────────────────────────── */
function VizCard({ d, i }) {
  const clr = TOOL_COLORS[d.tool] || '#6366f1'
  const [lb, setLb] = useState(false)
  return (
    <FadeUp key={d.id} delay={i*65}>
      {lb && <Lightbox src={d.image} alt={d.title} onClose={() => setLb(false)}/>}
      <div className="viz-card">
        <div className="viz-thumb" style={{cursor:'zoom-in'}} onClick={() => setLb(true)}>
          <img src={d.image} alt={d.title} loading="lazy"
            style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>
          <div className="viz-overlay" onClick={e=>e.stopPropagation()}>
            <button onClick={e=>{e.stopPropagation();setLb(true)}} className="obtn-s">🔍 View Full</button>
            {d.link && <a href={d.link} className="obtn-p" target="_blank" rel="noreferrer">Open Dashboard</a>}
          </div>
        </div>
        <div className="viz-body">
          <div className="viz-tool" style={{color:clr,borderColor:`${clr}40`,background:`${clr}12`}}>{d.tool}</div>
          <div className="viz-title">{d.title}</div>
          {d.link ? <a href={d.link} className="viz-link" target="_blank" rel="noreferrer">Open dashboard →</a>
                  : <span className="viz-link" style={{opacity:.4,cursor:'default'}}>Screenshot only</span>}
        </div>
      </div>
    </FadeUp>
  )
}

/* ── Sections ────────────────────────────────────────────────────────── */
function Projects() {
  return (
    <section className="section-full projects-bg" id="projects">
      <div className="section-inner">
        <FadeUp>
          <div className="section-label">Web Projects</div>
          <h2 className="section-title">Full-stack applications</h2>
          <p className="section-sub">Five production-ready systems built with modern stacks — each with real business logic, role-based access, and live deployments. Not just demos.</p>
        </FadeUp>
        <div className="projects-grid">
          {WEB_PROJECTS.map((p,i) => <ProjCard key={p.id} p={p} i={i}/>)}
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
        <p className="section-sub">Interactive dashboards built in Tableau, Power BI, and custom HTML/CSS — turning raw datasets into business insights across 5 industries.</p>
      </FadeUp>
      <div className="viz-grid" style={{marginTop:48}}>
        {DATAVIZ.map((d,i) => <VizCard key={d.id} d={d} i={i}/>)}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="section" id="education">
      <FadeUp>
        <div className="section-label">Education</div>
        <h2 className="section-title">Academic background</h2>
      </FadeUp>
      <div className="exp-timeline">
        <FadeUp delay={100}>
          <div className="exp-item">
            <div className="exp-period">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              2024 — 2028 (Expected)
            </div>
            <div className="exp-role">Bachelor of Science — Computer Science</div>
            <div className="exp-company">NED University of Engineering and Technology, Karachi</div>
            <ul className="exp-points">
              <li>Currently in 3rd year — combining core CS coursework with practical project development</li>
              <li>Built 5 full-stack web applications and 6 data dashboards as independent projects alongside academics</li>
              <li>Relevant coursework: Data Structures & Algorithms, Database Management Systems, OOP, Computer Networks, Operating Systems</li>
              <li>Applied database concepts practically through Oracle APEX (InventIQ) and multiple SQL-based backends</li>
              <li>Data analytics coursework applied through Power BI and Tableau dashboards across automotive, HR, retail, and entertainment datasets</li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section-full" id="contact" style={{background:'var(--bg2)'}}>
      <div className="contact-inner">
        <FadeUp>
          <div className="section-label">Contact</div>
          <h2 className="section-title" style={{textAlign:'center'}}>Let's work together</h2>
          <p className="contact-desc">
            Available for internships, freelance projects, and part-time developer roles. Whether it's a full-stack application, a data dashboard, or a collaboration — I'd love to hear from you.
          </p>
          <div className="contact-links">
            <a href="mailto:amna22875@gmail.com" className="contact-link contact-link-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              amna22875@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="contact-link" target="_blank" rel="noreferrer">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
