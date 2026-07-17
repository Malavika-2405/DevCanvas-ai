import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Eye,
  Download,
  Moon,
  Palette,
  Zap,
  Code2,
  ArrowRight,
  CheckCircle2,
  Wand2,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Award,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';

const features = [
  {
    icon: Wand2,
    title: 'Form-driven builder',
    desc: 'Fill a single form with your details, skills, and projects. No code, no friction.',
  },
  {
    icon: Eye,
    title: 'Live preview',
    desc: 'Watch your portfolio update in real time as you type — no refresh required.',
  },
  {
    icon: Palette,
    title: 'Theme switcher',
    desc: 'Toggle between a polished dark mode and a clean light mode instantly.',
  },
  {
    icon: Download,
    title: 'One-click export',
    desc: 'Download a self-contained, printable HTML file you can host anywhere.',
  },
  {
    icon: Layers,
    title: 'Glassmorphism UI',
    desc: 'Modern frosted-glass cards, gradient accents, and rounded corners throughout.',
  },
  {
    icon: Zap,
    title: 'Saved locally',
    desc: 'Your data lives in your browser. Come back any time and pick up where you left off.',
  },
];

const steps = [
  {
    icon: Sparkles,
    title: 'Add your details',
    desc: 'Name, photo, about, education, skills, projects, certificates, and links.',
  },
  {
    icon: Eye,
    title: 'Preview live',
    desc: 'See your portfolio render in real time with smooth animations.',
  },
  {
    icon: Download,
    title: 'Export & share',
    desc: 'Download a printable HTML file or share your live preview link.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              New · Real-time portfolio generator
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-800 tracking-tight leading-[1.05]">
              Build a portfolio that
              <br />
              <span className="gradient-text">gets you hired.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300">
              DevCanvas AI turns a simple form into a stunning, responsive portfolio website.
              Designed for students and developers who want to ship fast — without sacrificing craft.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/builder" className="btn-primary">
                <Sparkles size={16} /> Create Portfolio
                <ArrowRight size={16} />
              </Link>
              <Link to="/preview" className="btn-ghost">
                <Eye size={16} /> View Live Preview
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" /> No sign-up
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" /> Saved locally
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" /> Exportable HTML
              </span>
            </div>
          </motion.div>

          {/* Hero preview mock */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-brand-500/30 to-accent-500/30 blur-2xl" />
            <div className="relative rounded-[1.5rem] glass-strong p-2 shadow-glow">
              <div className="rounded-[1.1rem] overflow-hidden bg-white/40 dark:bg-slate-950/60">
                {/* mock browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-200/70 dark:border-white/10">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="ml-3 flex-1 rounded-md bg-slate-100 dark:bg-white/[0.04] px-3 py-1 text-xs font-mono text-slate-500">
                    devcanvas.ai/preview
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 p-6">
                  <div className="sm:col-span-1 flex flex-col items-center text-center gap-3">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center text-white text-3xl font-display font-700 shadow-glow">
                      A
                    </div>
                    <div>
                      <div className="font-display font-700 text-lg">Avery Mitchell</div>
                      <div className="text-xs text-slate-500">Full-Stack Developer</div>
                    </div>
                    <div className="flex gap-2 text-slate-500">
                      <Github size={14} />
                      <Linkedin size={14} />
                      <Mail size={14} />
                    </div>
                  </div>
                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        About
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-white/[0.06]" />
                      <div className="mt-1.5 h-2 w-4/5 rounded-full bg-slate-200/70 dark:bg-white/[0.06]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Skills
                      </div>
                      <div className="space-y-2">
                        {[
                          { w: '92%', c: 'from-brand-500 to-accent-500' },
                          { w: '85%', c: 'from-accent-500 to-brand-400' },
                          { w: '78%', c: 'from-brand-400 to-accent-400' },
                        ].map((s, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="h-2 flex-1 rounded-full bg-slate-200/70 dark:bg-white/[0.06] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: s.w }}
                                transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
                                className={`h-full rounded-full bg-gradient-to-r ${s.c}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip">Features</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-700 tracking-tight">
              Everything you need to stand out
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              A complete toolkit for crafting a portfolio that recruiters actually remember.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card p-6 group"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-500 dark:text-brand-300 group-hover:from-brand-500 group-hover:to-accent-500 group-hover:text-white transition-all duration-300">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-700 text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="rounded-3xl glass-strong p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative">
              <div className="text-center max-w-2xl mx-auto">
                <span className="chip">How it works</span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-700 tracking-tight">
                  Three steps to a polished portfolio
                </h2>
              </div>
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white font-display font-700">
                        {i + 1}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-400/40 to-transparent" />
                    </div>
                    <div className="mt-4">
                      <s.icon size={20} className="text-brand-500" />
                      <h3 className="mt-2 font-display font-700 text-lg">{s.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Showcase strip */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Code2, label: 'Skills with progress bars' },
              { icon: Layers, label: 'Project cards with hover' },
              { icon: GraduationCap, label: 'Education timeline' },
              { icon: Award, label: 'Certificate showcase' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card p-5 flex items-center gap-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                  <item.icon size={18} />
                </span>
                <span className="text-sm font-semibold">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500" />
            <div className="absolute inset-0 bg-grid-dark opacity-30" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-5xl font-800 text-white tracking-tight">
                Your portfolio is one form away.
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">
                Spend five minutes. Walk away with a portfolio you'll be proud to share.
              </p>
              <Link
                to="/builder"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Sparkles size={16} /> Start building
                <ArrowRight size={16} />
              </Link>
              <div className="mt-6 flex items-center justify-center gap-2 text-white/70 text-xs">
                <Moon size={14} /> Dark & light themes included
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
