import { useState, useEffect, useRef } from 'react'

/* ── Typewriter ─────────────────────────────────────────────── */
function useTypewriter(words, speed=80, pause=1800) {
  const [display,setDisplay]=useState('')
  const [wIdx,setWIdx]=useState(0)
  const [charIdx,setCharIdx]=useState(0)
  const [del,setDel]=useState(false)
  useEffect(()=>{
    const w=words[wIdx]
    const delay=del?speed/2:charIdx===w.length?pause:speed
    const t=setTimeout(()=>{
      if(!del&&charIdx<w.length){setDisplay(w.slice(0,charIdx+1));setCharIdx(c=>c+1)}
      else if(!del&&charIdx===w.length){setDel(true)}
      else if(del&&charIdx>0){setDisplay(w.slice(0,charIdx-1));setCharIdx(c=>c-1)}
      else{setDel(false);setWIdx(i=>(i+1)%words.length)}
    },delay)
    return()=>clearTimeout(t)
  },[charIdx,del,wIdx,words,speed,pause])
  return display
}

/* ── Count-up hook ──────────────────────────────────────────── */
function useCountUp(target, duration=1200) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start = Math.min(start + step, target)
          setCount(Math.floor(start))
          if (start >= target) clearInterval(timer)
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return [count, ref]
}

/* ── Fade-up ─────────────────────────────────────────────────── */
function FadeUp({ children, delay=0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} className="fade-up" style={{ transitionDelay:`${delay}ms` }}>{children}</div>
}

/* ── Data ─────────────────────────────────────────────────────── */
const ROLES = ['Full Stack Developer','Data Visualisation Analyst','Power BI & Tableau Developer','Backend & API Developer','Database Systems Engineer']

const PROJECTS = [
  { id:1, tag:'Complaint Management', title:'UniVoice', desc:'University complaint platform with AI-powered routing, 5 role-based portals, anonymous submissions, unique tracking IDs, and full case timeline logging.', chips:['FastAPI','React','SQLAlchemy','JWT','Python','SQLite'], live:'https://univoice-rho.vercel.app/', github:'https://github.com/amnaatgit/Univoice', image:'/images/univoice.png', emoji:'🎓', g:'linear-gradient(135deg,#1e1b4b,#312e81,#4338ca)' },
  { id:2, tag:'AI-Powered Search', title:'DocSearch Pro', desc:'Context-aware document retrieval using BM25 ranking, Claude AI synthesised answers, live autocomplete, bookmarking, and an analytics dashboard.', chips:['FastAPI','Python','BM25','Claude AI','SQLite','Jinja2'], live:'https://context-based-file-retrieval-system.vercel.app/', github:'https://github.com/amnaatgit/Context-Based-File-Retrieval-system', image:'/images/docsearch.png', emoji:'🔍', g:'linear-gradient(135deg,#0c4a6e,#075985,#0284c7)' },
  { id:3, tag:'Inventory Management', title:'OrderlyX', desc:'Enterprise inventory platform covering products, multi-warehouse stock, purchase & sales orders, supplier profiles, low-stock alerts, and complete audit logging.', chips:['Node.js','React','PostgreSQL','Prisma ORM','JWT','Tailwind'], live:'https://orderlyx.vercel.app/login', github:'https://github.com/amnaatgit/orderlyx', image:'/images/orderlyx.png', emoji:'📦', g:'linear-gradient(135deg,#064e3b,#047857,#059669)' },
  { id:4, tag:'Online Examination', title:'ExamForge', desc:'Examination system with instructor and student portals, timed MCQ/short-answer exams, automated grading, result analytics, and a secure question bank.', chips:['Node.js','Express','React','JWT Auth','JSON Storage'], live:'https://examforge-eight.vercel.app/', github:'https://github.com/amnaatgit/Examforge', image:'/images/examforge.png', emoji:'📝', g:'linear-gradient(135deg,#4a1942,#7e22ce,#9333ea)' },
  { id:5, tag:'Oracle APEX · Database', title:'InventIQ', desc:'Inventory system on Oracle APEX — 21 relational tables, 6 PL/SQL triggers for auto stock updates and audit logging, 5 reporting views, custom dark dashboard.', chips:['Oracle APEX','PL/SQL','Oracle SQL','Triggers','Views','Normalisation'], live:'https://oracleapex.com/ords/r/inventory_managment/inventiq/login', github:null, image:'/images/inventiq.png', emoji:'📊', g:'linear-gradient(135deg,#1e1040,#2d1b69,#7c3aed)' },
]

const DATAVIZ = [
  { id:1, title:'BMW Sales (2010–2024)', tool:'Tableau', image:'/images/bmw.png', link:'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book7_17759242048490/BMWSALES2010-2024', color:'#06b6d4' },
  { id:2, title:'Tesla Deliveries Intelligence', tool:'Interactive Dashboard', image:'/images/tesla.png', link:'https://exquisite-rugelach-df4485.netlify.app/', color:'#ef4444' },
  { id:3, title:'Spotify Analysis Dashboard', tool:'Tableau', image:'/images/spotify.png', link:'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book5_17737652240640/Dashboard1', color:'#22c55e' },
  { id:4, title:'IMDB Top 1000 Movies', tool:'Tableau', image:'/images/imdb.png', link:'https://public.tableau.com/app/profile/amna.shahzad2882/viz/Book4_17732694464350/Dashboard1', color:'#f59e0b' },
  { id:5, title:'Adidas Sales Analytics', tool:'Power BI', image:'/images/adidas.png', link:null, color:'#a3e635' },
  { id:6, title:'HR Analytics Board', tool:'Power BI', image:'/images/hr.png', link:null, color:'#818cf8' },
]

const SKILLS = [
  { label:'Frontend',  chips:['React','Vite','Tailwind CSS','HTML/CSS','JavaScript','AngularJS'] },
  { label:'Backend',   chips:['Node.js','Express','FastAPI','Python','REST APIs','JWT Auth'] },
  { label:'Databases', chips:['PostgreSQL','MySQL','SQLite','Prisma ORM','SQLAlchemy','Oracle SQL','PL/SQL'] },
  { label:'Languages', chips:['JavaScript','Python','C++','C','SQL'] },
  { label:'Data & BI', chips:['Power BI','Tableau','Excel','Oracle APEX'] },
  { label:'Tools',     chips:['Git','GitHub','VS Code','Railway','Vercel','Netlify'] },
]

/* ── Scroll progress bar ─────────────────────────────────────── */
function ScrollBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const h = () => {
      const s = document.documentElement.scrollTop
      const t = document.documentElement.scrollHeight - window.innerHeight
      setW((s / t) * 100)
    }
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="scroll-bar" style={{ width:`${w}%` }}/>
}

/* ── Nav ─────────────────────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const h = () => setSc(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className="nav" style={sc?{boxShadow:'0 4px 40px rgba(0,0,0,0.6)'}:{}}>
      <div className="nav-logo">Amna Shahzad</div>
      <div className="nav-links">
        {['#about','#projects','#dataviz','#education'].map((href,i) => (
          <a key={href} href={href}>{['About','Projects','Data Viz','Education'][i]}</a>
        ))}
        <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="nav-cta" target="_blank" rel="noreferrer">Let's Connect</a>
      </div>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  const role = useTypewriter(ROLES)
  return (
    <section className="hero" id="home">
      <div className="hero-bg"/>
      <div className="hero-grid"/>
      <div className="hero-inner">

        {/* Left */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:26}}>
            <div className="badge-avail">
              <span className="pulse"/>
              Available for Internships
            </div>
            <span className="badge-uni">3rd Year · NED University</span>
          </div>

          <div style={{fontSize:14,color:'rgba(255,255,255,0.35)',marginBottom:8,letterSpacing:'.02em'}}>Hi, I'm</div>
          <h1 className="grad-heading" style={{fontSize:'clamp(42px,5.5vw,70px)',marginBottom:14}}>
            Amna Shahzad
          </h1>

          <div className="hero-role">
            {role}<span className="cursor"/>
          </div>

          <p className="hero-desc">
            Computer Science student at <strong>NED University of Engineering and Technology</strong>, Karachi — building full-stack web applications and interactive data dashboards across Power BI, Tableau, and custom HTML/CSS.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-glow">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              View Projects
            </a>
            <a href="mailto:amna22875@gmail.com" className="btn-outline">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Get In Touch
            </a>
          </div>

          <div className="hero-socials">
            {[
              {href:'https://github.com/amnaatgit',svg:<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>},
              {href:'https://www.linkedin.com/in/amna-shahzad-393955356/',svg:<svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
              {href:'mailto:amna22875@gmail.com',svg:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>},
            ].map(s => (
              <a key={s.href} href={s.href} className="soc" target={s.href.startsWith('mailto')?undefined:'_blank'} rel="noreferrer">{s.svg}</a>
            ))}
          </div>
        </div>

        {/* Right — terminal card */}
        <div>
          <div className="term-card">
            <div className="term-bar">
              <div className="dot-r"/><div className="dot-y"/><div className="dot-g"/>
              <span className="term-label">amna@portfolio ~</span>
            </div>
            <div className="term-body">
              <div><span className="cg">const</span> <span className="cc">amna</span> <span className="cw"> = {'{'}</span></div>
              <div style={{paddingLeft:18}}><span className="cp">university</span><span className="cw">: </span><span className="ca">"NED University"</span><span className="cw">,</span></div>
              <div style={{paddingLeft:18}}><span className="cp">degree</span><span className="cw">: </span><span className="ca">"BS Computer Science"</span><span className="cw">,</span></div>
              <div style={{paddingLeft:18}}><span className="cp">year</span><span className="cw">: </span><span className="ca">"3rd Year (2024–2028)"</span><span className="cw">,</span></div>
              <div style={{paddingLeft:18}}><span className="cp">focus</span><span className="cw">: [</span></div>
              <div style={{paddingLeft:36}}><span className="ca">"Full Stack Development"</span><span className="cw">,</span></div>
              <div style={{paddingLeft:36}}><span className="ca">"Data Visualisation"</span><span className="cw">,</span></div>
              <div style={{paddingLeft:36}}><span className="ca">"Database Systems"</span></div>
              <div style={{paddingLeft:18}}><span className="cw">],</span></div>
              <div style={{paddingLeft:18}}><span className="cp">stack</span><span className="cw">: [</span><span className="ca">"React"</span><span className="cw">, </span><span className="ca">"Node.js"</span><span className="cw">, </span><span className="ca">"Python"</span><span className="cw">, </span><span className="ca">"SQL"</span><span className="cw">],</span></div>
              <div style={{paddingLeft:18}}><span className="cp">status</span><span className="cw">: </span><span className="cg">"open to opportunities"</span></div>
              <div><span className="cw">{'}'}</span></div>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[['5','Projects Live'],['6','Dashboards Built'],['5+','Industries'],['3rd','Year @ NED']].map(([n,l]) => (
              <div key={l} className="hstat">
                <div className="hstat-n">{n}</div>
                <div className="hstat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── About ─────────────────────────────────────────────────────── */
function About() {
  return (
    <section className="section" id="about">
      <FadeUp>
        <div className="sec-label">Who I am</div>
        <h2 className="sec-title">About Me</h2>
      </FadeUp>
      <div className="about-grid">
        <FadeUp delay={100}>
          <div className="about-text">
            <p>I'm a 3rd year Computer Science student at <span className="about-hl">NED University of Engineering and Technology, Karachi</span> — one of Pakistan's leading engineering institutions. I build production-quality web applications and turn complex datasets into dashboards that actually communicate insight.</p>
            <p>On the dev side, I've shipped applications covering complaint management, inventory systems, examination platforms, and AI-powered document search — using <span className="about-hl">React, Node.js, FastAPI, PostgreSQL, and Oracle APEX</span>. Every project is built with role-based access, clean architecture, and real business logic.</p>
            <p>On the data side, I build dashboards across BMW, Spotify, IMDB, Adidas, Tesla, and HR datasets — in Power BI, Tableau, and custom HTML/CSS. I treat every dataset as a story that needs to be told clearly.</p>
            <p>Expected to graduate in <span className="about-hl">2028</span>. Currently in Karachi, open to internships, part-time, and freelance opportunities.</p>
          </div>
          <div className="stat-grid">
            {[['5','Full-stack projects live'],['6','Data dashboards built'],['5+','Industries analysed'],['3rd','Year at NED University']].map(([n,l]) => (
              <div className="stat-box" key={l}>
                <div className="stat-n">{n}</div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={180}>
          <div className="skills-grid">
            {SKILLS.map(g => (
              <div key={g.label}>
                <div className="sg-label">{g.label}</div>
                <div className="sg-chips">{g.chips.map(c => <span className="sg-chip" key={c}>{c}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="learning-box">
            <div className="learning-label">Currently studying</div>
            <div className="learning-chips">
              {['Data Structures & Algorithms','Database Management Systems','Operating Systems','OOP','Computer Networks'].map(c => (
                <span key={c} className="learning-chip">{c}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── Projects ──────────────────────────────────────────────────── */
function Projects() {
  return (
    <section className="section-full projects-bg" id="projects">
      <div className="section-inner">
        <FadeUp>
          <div className="sec-label">What I've built</div>
          <h2 className="sec-title">Full-stack Applications</h2>
          <p className="sec-sub">Five production-ready systems — real business logic, role-based access, live deployments. Not just demos.</p>
        </FadeUp>
        <div className="proj-grid">
          {PROJECTS.map((p,i) => (
            <FadeUp key={p.id} delay={i*70}>
              <div className="proj-card">
                <div className="proj-thumb">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>
                  ) : (
                    <>
                      <div className="proj-thumb-bg" style={{background:p.g,position:'absolute',inset:0}}/>
                      <div style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
                        <div className="proj-thumb-icon">{p.emoji}</div>
                      </div>
                    </>
                  )}
                  <div className="proj-overlay">
                    {p.live && <a href={p.live} className="obtn-p" target="_blank" rel="noreferrer">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live Demo
                    </a>}
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
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── DataViz ───────────────────────────────────────────────────── */
function DataViz() {
  const TC = {'Tableau':'#6366f1','Power BI':'#f59e0b','Interactive Dashboard':'#06b6d4'}
  return (
    <section className="section" id="dataviz">
      <FadeUp>
        <div className="sec-label">Data work</div>
        <h2 className="sec-title">Dashboards & Analytics</h2>
        <p className="sec-sub">Power BI, Tableau, and custom HTML/CSS — turning raw datasets into insight across 5 industries.</p>
      </FadeUp>
      <div className="viz-grid" style={{marginTop:48}}>
        {DATAVIZ.map((d,i) => {
          const clr = TC[d.tool]||'#6366f1'
          return (
            <FadeUp key={d.id} delay={i*65}>
              <div className="viz-card">
                <div className="viz-thumb">
                  <img src={d.image} alt={d.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>
                  <div className="viz-overlay">
                    {d.link ? (
                      <a href={d.link} className="obtn-p" target="_blank" rel="noreferrer">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        View Dashboard
                      </a>
                    ) : (
                      <div style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',padding:'7px 16px',borderRadius:8,fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.65)'}}>Screenshot only</div>
                    )}
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
        })}
      </div>
    </section>
  )
}

/* ── Education ─────────────────────────────────────────────────── */
function Education() {
  return (
    <section className="section" id="education">
      <FadeUp>
        <div className="sec-label">Background</div>
        <h2 className="sec-title">Education</h2>
      </FadeUp>
      <div className="exp-timeline">
        <FadeUp delay={100}>
          <div className="exp-item">
            <div className="exp-period">
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              2024 — 2028 (Expected)
            </div>
            <div className="exp-role">Bachelor of Science — Computer Science</div>
            <div className="exp-company">NED University of Engineering and Technology, Karachi</div>
            <ul className="exp-points">
              <li>Currently in 3rd year — combining core CS coursework with real-world project development</li>
              <li>Built 5 full-stack web applications and 6 data dashboards independently alongside academics</li>
              <li>Relevant coursework: Data Structures & Algorithms, Database Management Systems, OOP, Computer Networks, Operating Systems</li>
              <li>Applied database concepts through Oracle APEX (InventIQ) and multiple SQL-based production backends</li>
              <li>Data analytics applied through Power BI and Tableau dashboards across automotive, HR, retail, and entertainment datasets</li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── Contact ───────────────────────────────────────────────────── */
function Contact() {
  return (
    <div style={{background:'#040b18'}} id="contact">
      <div className="contact-wrap">
        <FadeUp>
          <div className="sec-label" style={{justifyContent:'center'}}>Get in touch</div>
          <h2 className="sec-title" style={{textAlign:'center',marginBottom:14}}>Let's Work Together</h2>
          <p className="contact-desc">Available for internships, freelance projects, and part-time roles. Whether it's a full-stack app, a data dashboard, or a collaboration — reach out.</p>
          <div className="contact-links">
            <a href="mailto:amna22875@gmail.com" className="clink clink-p">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              amna22875@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/amna-shahzad-393955356/" className="clink" target="_blank" rel="noreferrer">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/amnaatgit" className="clink" target="_blank" rel="noreferrer">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}

/* ── App ───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <ScrollBar/>
      <Nav/>
      <Hero/>
      <div className="divider"/>
      <About/>
      <div className="divider"/>
      <Projects/>
      <div className="divider"/>
      <DataViz/>
      <div className="divider"/>
      <Education/>
      <div className="divider"/>
      <Contact/>
      <footer className="footer">
        © 2025 Amna Shahzad · BS Computer Science · NED University · Karachi
      </footer>
    </>
  )
}
