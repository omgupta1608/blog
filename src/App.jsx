import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { getAllBlogs, saveLocalBlog } from './data/blogs.js'
// import EditorPage from './EditorPage.js'

// ─── Theme Context ────────────────────────────────────────────────────────────
const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const ArrowLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)
const ChevronLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ showBack }) {
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              <ArrowLeft />
            </button>
          )}
          <p className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50 tracking-tight">
            Kochen Specker
          </p>
        </div>
        <button
          onClick={toggle}
          className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
          aria-label="Toggle theme"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 dark:border-stone-800 py-10">
      <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-400 dark:text-stone-500">
        <span className="font-serif italic">Written with love</span>
        <span>© {new Date().getFullYear()} · All rights reserved</span>
      </div>
    </footer>
  )
}

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ blog, index }) {
  const navigate = useNavigate()
  const delay = `fade-up-delay-${Math.min(index + 1, 5)}`

  // Strip HTML tags for excerpt
  const plainText = blog.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const excerpt = plainText.slice(0, 180) + (plainText.length > 180 ? '…' : '')

  return (
    <article
      onClick={() => navigate(`/${blog.id}`)}
      className={`fade-up ${delay} group cursor-pointer py-8 border-b border-stone-100 dark:border-stone-800/60 hover:bg-stone-50 dark:hover:bg-stone-900/40 -mx-4 px-4 rounded-lg transition-all duration-200`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
          {blog.topic}
        </span>
        <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">{blog.date}</span>
      </div>
      <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50 mb-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
        {blog.title}
      </h2>
      <p className="text-stone-500 dark:text-stone-400 text-[15px] leading-relaxed line-clamp-2">
        {excerpt}
      </p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Read more <ChevronRight />
      </span>
    </article>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10

function HomePage() {
  const [blogs] = useState(() => getAllBlogs())
  
  const [topic, setTopic] = useState('All')
  const [page, setPage] = useState(1)

  const topics = ['All', ...Array.from(new Set(blogs.map(b => b.topic))).sort()]

  const filtered = topic === 'All' ? blogs : blogs.filter(b => b.topic === topic)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleTopic = (t) => { setTopic(t); setPage(1) }

  return (
    <>
      <Navbar showBack={false} />
      <main className="max-w-3xl mx-auto px-6 pt-16 pb-8">
        {/* Header */}
        <div className="fade-up mb-14">
          <p className="font-mono text-xs tracking-widest uppercase text-amber-700 dark:text-amber-500 mb-3">
            Personal blog
          </p>
          <h1 className="font-serif text-4xl font-semibold text-stone-900 dark:text-stone-50 leading-[1.15] mb-5">
            Dispatches from 
            <em> a curious mind</em>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm max-w-xl leading-relaxed">
            Notes on travel, technology, design, and whatever else refuses to leave my head.
          </p>
        </div>

        {/* Topic filter */}
        <div className="fade-up fade-up-delay-1 flex flex-wrap gap-2 mb-10">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => handleTopic(t)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
                topic === t
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Blog list */}
        <div>
          {visible.length === 0 ? (
            <p className="text-stone-400 text-center py-20">No posts found.</p>
          ) : (
            visible.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 disabled:opacity-30 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm font-mono text-stone-500">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 disabled:opacity-30 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

// ─── Blog Detail Page ─────────────────────────────────────────────────────────
function BlogPage() {
  const { id } = useParams()
  const [blogs] = useState(() => getAllBlogs())
  const [progress, setProgress] = useState(0)
  const blog = blogs.find(b => b.id === id)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!blog) return (
    <>
      <Navbar showBack />
      <div className="max-w-3xl mx-auto px-6 pt-32 text-center text-stone-400">Post not found.</div>
    </>
  )

  return (
    <>
      <div className="read-progress" style={{ width: `${progress}%` }} />
      <Navbar showBack />
      <main className="max-w-3xl mx-auto px-6 pt-14 pb-8">
        {/* Meta */}
        <div className="fade-up mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
              {blog.topic}
            </span>
            <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">{blog.date}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 dark:text-stone-50 leading-[1.15] mb-0">
            {blog.title}
          </h1>
        </div>

        {/* Divider */}
        <div className="fade-up fade-up-delay-1 mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Body */}
        <div
          className="fade-up fade-up-delay-2 blog-prose"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />

        {/* End marker */}
        <div className="mt-16 mb-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          <span className="font-serif italic text-sm text-stone-400">fin.</span>
          <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-stone-950 transition-colors duration-300">
        <BrowserRouter basename="/blog">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/:id" element={<BlogPage />} />
            {/* <Route path="/atelier-secret" element={<EditorPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}