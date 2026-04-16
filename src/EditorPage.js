import React, { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { saveLocalBlog } from './data/blogs.js'
import { useTheme } from './App.jsx'
import { useNavigate } from 'react-router-dom'

// ─── Icons ────────────────────────────────────────────────────────────────────
const B = () => <span className="font-bold">B</span>
const I = () => <span className="italic">I</span>
const U = () => <span className="underline">U</span>
const H1 = () => <span className="font-serif font-bold text-xs">H1</span>
const H2 = () => <span className="font-serif font-bold text-xs">H2</span>
const H3 = () => <span className="font-serif font-bold text-xs">H3</span>
const Quote = () => <span className="text-xs">"</span>
const BulletList = () => <span className="text-xs">• List</span>
const OrderedList = () => <span className="text-xs">1. List</span>
const HRule = () => <span className="text-xs">—</span>
const Undo = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  </svg>
)
const Redo = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
  </svg>
)
const ArrowLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)
const SunIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

// ─── UUID ─────────────────────────────────────────────────────────────────────
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolBtn({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`px-2.5 py-1.5 rounded text-sm transition-all ${
        active
          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
      }`}
    >
      {children}
    </button>
  )
}

// ─── Editor Page ──────────────────────────────────────────────────────────────
export default function EditorPage() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()

  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('Travel')
  const [date, setDate] = useState(() => {
    const now = new Date()
    return now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  })
  const [exported, setExported] = useState(null)
  const [saveStatus, setSaveStatus] = useState(null) // null | 'saved' | 'error'

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Begin writing your story here…' }),
    ],
    editorProps: {
      attributes: {
        class: 'outline-none',
      }
    }
  })

  const setLink = useCallback(() => {
    const prev = editor.getAttributes('link').href
    const url = window.prompt('URL', prev)
    if (url === null) return
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const buildBlog = () => ({
    id: generateUUID(),
    title: title.trim(),
    body: editor ? editor.getHTML() : '',
    bookmark: false,
    date: date.trim(),
    topic: topic.trim(),
  })

  const handleExport = () => {
    const blog = buildBlog()
    if (!blog.title) { alert('Please add a title first.'); return }
    setExported(JSON.stringify(blog, null, 2))
  }

  const handleSaveLocal = () => {
    const blog = buildBlog()
    if (!blog.title) { alert('Please add a title first.'); return }
    const ok = saveLocalBlog(blog)
    setSaveStatus(ok ? 'saved' : 'error')
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleCopy = () => {
    if (exported) {
      navigator.clipboard.writeText(exported).then(() => {
        setSaveStatus('copied')
        setTimeout(() => setSaveStatus(null), 2000)
      })
    }
  }

  const TOPICS = ['Travel', 'Tech', 'Design', 'Food', 'Books', 'Life', 'Other']

  if (!editor) return null

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 -ml-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              <ArrowLeft />
            </button>
            <span className="font-serif text-base font-semibold text-stone-700 dark:text-stone-300">
              Private Atelier
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={handleSaveLocal}
              className="px-4 py-1.5 text-sm rounded-lg border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all font-medium"
            >
              Preview locally
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-1.5 text-sm rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 transition-all font-medium"
            >
              Export JSON
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        {/* Status toast */}
        {saveStatus && (
          <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            saveStatus === 'error' ? 'bg-red-500 text-white' : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
          }`}>
            {saveStatus === 'saved' && '✓ Saved to local storage — visit homepage to preview'}
            {saveStatus === 'copied' && '✓ Copied to clipboard'}
            {saveStatus === 'error' && '✗ Failed to save'}
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="sm:col-span-3">
            <label className="block text-xs font-mono tracking-wider uppercase text-stone-400 mb-1.5">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Your blog title…"
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-3 font-serif text-2xl text-stone-900 dark:text-stone-50 placeholder:text-stone-300 dark:placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-stone-400 mb-1.5">Topic</label>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-2.5 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
            >
              {TOPICS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-stone-400 mb-1.5">Date</label>
            <input
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="14 Apr 2024"
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-2.5 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
            />
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
            <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><B /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><I /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><U /></ToolBtn>
            <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1" />
            <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1"><H1 /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><H2 /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><H3 /></ToolBtn>
            <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1" />
            <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><Quote /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list"><BulletList /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list"><OrderedList /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal rule"><HRule /></ToolBtn>
            <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1" />
            <ToolBtn onClick={setLink} active={editor.isActive('link')} title="Link">
              <span className="text-xs">🔗</span>
            </ToolBtn>
            <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1" />
            <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo"><Undo /></ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo"><Redo /></ToolBtn>
          </div>

          {/* Editor area */}
          <div className="tiptap-editor">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Export output */}
        {exported && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs tracking-widest uppercase text-stone-400">Exported JSON — paste into src/data/blogs.js</h3>
              <button
                onClick={handleCopy}
                className="text-xs px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium hover:opacity-80 transition-opacity"
              >
                Copy
              </button>
            </div>
            <pre className="bg-stone-100 dark:bg-stone-800 rounded-xl p-5 text-xs font-mono text-stone-700 dark:text-stone-300 overflow-x-auto whitespace-pre-wrap break-words leading-relaxed border border-stone-200 dark:border-stone-700">
              {exported}
            </pre>
            <p className="mt-3 text-xs text-stone-400 dark:text-stone-500">
              Copy the above object and add it to the <code className="font-mono bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">STATIC_BLOGS</code> array in <code className="font-mono bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">src/data/blogs.js</code>, then redeploy.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}