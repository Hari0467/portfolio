import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'

/*
  App.jsx - Single-page portfolio layout

  - Sections are defined by `id` attributes: home, about, skills, projects, contact
  - The header highlights the active section automatically while scrolling
  - Toggle `themeLight` to add a light-mode stylesheet (not included yet) — the class `light` will be applied to <html>
  - Add `/resume.pdf` at the public root to enable the Resume download button
*/

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  '.NET MAUI',
  'C#',
  'SQL',
  'Git',
]

const projects = [
  {
    title: 'IoT Smart Sign for Road Safety',
    description:
      'A smart roadside safety system designed to improve traffic awareness and provide real-time assistance to drivers.',
    stack: ['IoT', 'Embedded Systems', 'C'],
  },
  {
    title: 'Brain Tumor Segmentation',
    description:
      'An image-processing solution for identifying and segmenting tumor regions with a focus on healthcare reliability.',
    stack: ['Python', 'Computer Vision', 'Image Processing'],
  },
]

function App() {
  // Theme state: toggle to add future light-mode support if you add rules.
  const [themeLight, setThemeLight] = useState(false)

  // Active nav item (used to highlight current section in the navbar)
  const [active, setActive] = useState('home')

  // Scroll listener: update `active` based on which section is near the top.
  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects', 'contact']
    const onScroll = () => {
      const offset = 140 // px from top to consider a section "active"
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= offset && rect.bottom >= offset) {
          setActive(id)
          return
        }
      }
      // fallback to top
      setActive('home')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Apply a simple theme class on the root element. You can expand CSS later.
  useEffect(() => {
    document.documentElement.classList.toggle('light', themeLight)
  }, [themeLight])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-5%] h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute left-[20%] top-[35%] h-40 w-40 rounded-full border border-cyan-400/20" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="text-lg font-semibold tracking-[0.2em] text-white">
            HARIHARAN
          </a>
          {/* Desktop nav items: highlight the active section */}
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition px-3 py-1 ${active === item.href.replace('#', '') ? 'rounded-full bg-cyan-900/40 text-cyan-300' : 'hover:text-cyan-300'}`}
                aria-current={active === item.href.replace('#', '') ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          {/* Right-side controls (theme toggle + CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setThemeLight((v) => !v)}
              aria-label="Toggle theme"
              className="rounded-full p-2 hover:bg-white/5"
            >
              {themeLight ? '🌤️' : '🌙'}
            </button>
            <a href="#contact" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow">
              Hire Me
            </a>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-10 lg:px-8 lg:py-16">
        <section id="home" className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_25px_80px_rgba(34,211,238,0.12)] backdrop-blur-xl md:grid-cols-[1.05fr_0.95fr] md:p-12 lg:p-16">
          <div className="relative z-10">
            <div className="pulse-glow mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
              Available for opportunities
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Hi, I’m <span className="text-cyan-300">Hariharan</span>.
              <br />
              I craft memorable digital products.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              I’m a software engineer focused on React, Next.js, and cross-platform experiences that feel polished, fast, and reliable.
            </p>
            {/* Primary CTAs: resume download and contact */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download
                className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 font-medium text-slate-950 shadow-lg transition duration-300 hover:-translate-y-1"
              >
                ⬇️ Download Resume
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-200"
              >
                ✉️ Contact Me
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2">2.5+ years experience</span>
              <span className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2">React & Next.js</span>
              <span className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2">.NET MAUI</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="float-soft absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/40 to-violet-500/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-3 shadow-2xl">
              <img src={heroImg} alt="Hariharan C" className="h-full w-full rounded-[1.25rem] object-cover" />
            </div>
            <div className="absolute -left-4 top-6 rounded-2xl border border-cyan-400/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 shadow-lg">
              React Developer
            </div>
            <div className="absolute -bottom-4 right-4 rounded-2xl border border-violet-400/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 shadow-lg">
              UI Engineer
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About Me</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Crafting reliable digital experiences</h2>
            <p className="mt-4 text-slate-300">
              I’m a software engineer based in Chennai, India, building responsive UI systems and data-driven applications with strong attention to accessibility and performance.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3"><span className="mt-1 text-cyan-300">•</span> Strong front-end expertise in React and Next.js</li>
              <li className="flex gap-3"><span className="mt-1 text-cyan-300">•</span> Experience building reusable UI component systems</li>
              <li className="flex gap-3"><span className="mt-1 text-cyan-300">•</span> Cross-platform app development using .NET MAUI</li>
              <li className="flex gap-3"><span className="mt-1 text-cyan-300">•</span> Passionate about clean code, performance, and user delight</li>
            </ul>
          </div>
        </section>

        <section id="skills" className="rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.3)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Skills</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Tools I use to ship quality products</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div key={skill} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Selected work</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-7 shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-8 shadow-[0_20px_60px_rgba(34,211,238,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Let’s build something great</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Open to freelance work, full-time roles, and collaborations across modern web and app products.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="mailto:hariharan0467@gmail.com" className="rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-slate-200">
              hariharan0467@gmail.com
            </a>
            <a href="https://github.com/Hari0467" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-200">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
