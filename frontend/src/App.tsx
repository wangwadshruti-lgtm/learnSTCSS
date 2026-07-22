import { useEffect, useRef, useState } from 'react'
import './App.css'

type Course = { title: string; tutor: string; image: string; progress: number; lessons: number; color: string }

const courses: Course[] = [
  { title: 'Introduction to Design Systems', tutor: 'Olivia Chen', image: '⌘', progress: 72, lessons: 24, color: 'lavender' },
  { title: 'Data Analytics with Python', tutor: 'Marcus Johnson', image: '◈', progress: 45, lessons: 18, color: 'blue' },
  { title: 'Product Strategy Fundamentals', tutor: 'Sofia Rodriguez', image: '↗', progress: 20, lessons: 16, color: 'peach' },
]

const nav = [
  ['▦', 'Overview'], ['▣', 'My Learning'], ['◈', 'Explore Courses'], ['◷', 'Calendar'], ['◎', 'Messages'],
]

function App() {
  const [active, setActive] = useState('Overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedCourse(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const visibleCourses = courses.filter(course => course.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="app-shell">
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'} aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="LearnSphere home"><span className="brand-mark">L</span><span>LearnSphere</span></a>
        <div className="workspace"><span>WORKSPACE</span><button>Acme Learning <b>⌄</b></button></div>
        <nav>{nav.map(([icon, label]) => <button key={label} className={active === label ? 'nav-link active' : 'nav-link'} onClick={() => { setActive(label); setMenuOpen(false) }}><i>{icon}</i>{label}</button>)}</nav>
        <p className="nav-label">MANAGE</p>
        <button className="nav-link"><i>▤</i>My Certificates</button>
        <button className="nav-link"><i>⚙</i>Settings</button>
        <div className="upgrade"><span className="sparkle">✦</span><b>Unlock your potential</b><p>Get unlimited access to all courses.</p><button>Upgrade plan</button></div>
        <div className="profile-mini"><div className="avatar purple">AM</div><div><b>Alex Morgan</b><small>Product Designer</small></div><span>⋮</span></div>
      </aside>

      <section className="content" id="top">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
          <div className="search"><span>⌕</span><input aria-label="Search courses" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses, skills, or topics..."/><kbd>⌘ K</kbd></div>
          <div className="header-actions"><button className="icon-button" onClick={() => setShowNotifications(!showNotifications)} aria-label="Notifications">♧<em>3</em></button><button className="help">?</button><div className="avatar purple">AM</div></div>
          {showNotifications && <section className="notifications" aria-label="Notifications"><div><b>Notifications</b><button onClick={() => setShowNotifications(false)}>×</button></div><article><span className="dot"></span><p><b>New lesson available</b><small>Design systems · 10 minutes ago</small></p></article><article><span className="dot"></span><p><b>Marcus replied to your question</b><small>Data Analytics · Yesterday</small></p></article><article><p><b>Keep your streak alive!</b><small>Complete a lesson today</small></p></article><a href="#notifications">View all notifications</a></section>}
        </header>

        <div className="page">
          <div className="welcome-row"><div><p className="eyebrow">TUESDAY, OCTOBER 24</p><h1>Good morning, Alex <span>👋</span></h1><p className="subtle">Here’s what’s happening with your learning today.</p></div><button className="continue-button">Continue learning <span>→</span></button></div>

          <section className="stats-grid">
            <article className="stat-card"><div className="stat-icon violet">▱</div><div><p>COURSES IN PROGRESS</p><strong>4</strong><small><b className="green">↑ 12%</b> from last month</small></div></article>
            <article className="stat-card"><div className="stat-icon orange">◷</div><div><p>LEARNING HOURS</p><strong>28.5 <small>hrs</small></strong><small><b className="green">↑ 8%</b> from last month</small></div></article>
            <article className="stat-card"><div className="stat-icon pink">✦</div><div><p>COMPLETED COURSES</p><strong>12</strong><small><b className="green">↑ 3</b> this month</small></div></article>
            <article className="stat-card streak"><div><p>DAY STREAK</p><strong>7 <small>days</small></strong><small>Keep it going! 🔥</small></div><div className="flame">♨</div></article>
          </section>

          <section className="section-heading"><div><h2>Continue learning</h2><p>Pick up right where you left off.</p></div><a href="#courses">View all <span>→</span></a></section>
          <section className="course-grid" id="courses">{visibleCourses.map(course => <article className="course-card" key={course.title}><div className={`course-image ${course.color}`}><span>{course.image}</span><button aria-label={`More options for ${course.title}`}>•••</button></div><div className="course-body"><p className="course-type">COURSE</p><h3>{course.title}</h3><p className="tutor">{course.tutor}</p><div className="progress-meta"><span>{course.progress}% complete</span><span>{course.lessons} lessons</span></div><div className="progress"><i style={{ width: `${course.progress}%` }}></i></div><button onClick={() => setSelectedCourse(course)} className="resume">Resume course <span>→</span></button></div></article>)}</section>
          {visibleCourses.length === 0 && <div className="empty">No courses match “{query}”.</div>}

          <section className="lower-grid"><article className="activity-panel"><div className="section-heading compact"><div><h2>Learning activity</h2><p>Your progress this week</p></div><button>Week ⌄</button></div><div className="chart"><div className="chart-labels"><span>8h</span><span>6h</span><span>4h</span><span>2h</span><span>0h</span></div><div className="bars">{[42,64,47,88,57,76,36].map((height, index) => <div key={index}><i style={{height: `${height}%`}}></i><span>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][index]}</span></div>)}</div></div><div className="activity-total"><span><i></i>Learning time</span><b>5h 42m <small>this week</small></b></div></article><article className="upcoming"><div className="section-heading compact"><div><h2>Up next</h2><p>Your upcoming sessions</p></div><a href="#calendar">View calendar</a></div><div className="event"><div className="date"><b>25</b><small>OCT</small></div><div><b>Design Critique Workshop</b><p>Today, 2:00 PM · 45 min</p></div><button>Join</button></div><div className="event"><div className="date"><b>27</b><small>OCT</small></div><div><b>Python Q&A Session</b><p>Friday, 11:00 AM · 1 hour</p></div><button className="outline">Details</button></div></article></section>
        </div>
      </section>
      {menuOpen && <button className="backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      {selectedCourse && <div className="modal-layer" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedCourse(null) }}><div className="course-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="course-title"><button className="close" autoFocus onClick={() => setSelectedCourse(null)} aria-label="Close course details">×</button><div className={`modal-art ${selectedCourse.color}`}>{selectedCourse.image}</div><p className="course-type">COURSE · {selectedCourse.lessons} LESSONS</p><h2 id="course-title">{selectedCourse.title}</h2><p className="tutor">Led by {selectedCourse.tutor}</p><div className="modal-progress"><span>Your progress</span><b>{selectedCourse.progress}%</b><div className="progress"><i style={{width: `${selectedCourse.progress}%`}} /></div></div><p className="modal-copy">Continue building your skills with engaging lessons, practical exercises, and expert guidance.</p><button className="resume modal-resume">Resume course <span>→</span></button></div></div>}
    </main>
  )
}

export default App
