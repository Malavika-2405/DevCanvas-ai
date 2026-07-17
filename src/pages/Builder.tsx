import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Eye,
  Sparkles,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Link2,
  Palette,
  Download,
  Wand2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import PhotoUpload from '../components/PhotoUpload';
import { usePortfolio } from '../context/PortfolioContext';
import { uid } from '../lib/storage';
import { samplePortfolio } from '../types/portfolio';
import { downloadHtml } from '../lib/download';

type SectionId =
  | 'profile'
  | 'about'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'social'
  | 'theme';

const sections: { id: SectionId; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'about', label: 'About', icon: Sparkles },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'social', label: 'Social Links', icon: Link2 },
  { id: 'theme', label: 'Theme', icon: Palette },
];

export default function Builder() {
  const { data, setData, reset } = usePortfolio();
  const [active, setActive] = useState<SectionId>('profile');

  const loadSample = () => setData(() => ({ ...samplePortfolio, updatedAt: Date.now() }));

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <span className="chip">Portfolio Builder</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-700 tracking-tight">
              Craft your <span className="gradient-text">portfolio</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Fill in the sections below. Everything saves automatically to your browser.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={loadSample} className="btn-ghost !py-2 !px-3 text-xs">
              <Wand2 size={14} /> Load sample
            </button>
            <button
              onClick={() => {
                if (confirm('Reset all fields? This cannot be undone.')) reset();
              }}
              className="btn-ghost !py-2 !px-3 text-xs text-rose-500 hover:!border-rose-300"
            >
              <Trash2 size={14} /> Reset
            </button>
            <button onClick={() => downloadHtml(data)} className="btn-ghost !py-2 !px-3 text-xs">
              <Download size={14} /> Export
            </button>
            <Link to="/preview" className="btn-primary !py-2 !px-3 text-xs">
              <Eye size={14} /> Live Preview
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-2">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto">
                {sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left whitespace-nowrap
                        ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="builder-pill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-600 to-accent-500"
                          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                        />
                      )}
                      <s.icon size={16} className="relative z-10" />
                      <span className="relative z-10">{s.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Form */}
          <div className="card p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {active === 'profile' && <ProfileSection />}
                {active === 'about' && <AboutSection />}
                {active === 'education' && <EducationSection />}
                {active === 'skills' && <SkillsSection />}
                {active === 'projects' && <ProjectsSection />}
                {active === 'certificates' && <CertificatesSection />}
                {active === 'social' && <SocialSection />}
                {active === 'theme' && <ThemeSection />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Sections ---------- */

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-700 tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  );
}

function ProfileSection() {
  const { data, update } = usePortfolio();
  return (
    <div>
      <SectionHeader title="Profile" desc="The basics — who you are and what you do." />
      <PhotoUpload value={data.photo} onChange={(v) => update('photo', v)} />
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Full name</label>
          <input
            className="input"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Avery Mitchell"
          />
        </div>
        <div>
          <label className="label">Professional title</label>
          <input
            className="input"
            value={data.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Full-Stack Developer"
          />
        </div>
        <div>
          <label className="label">Location</label>
          <input
            className="input"
            value={data.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="Berlin, Germany"
          />
        </div>
        <div>
          <label className="label">Availability</label>
          <input
            className="input"
            value={data.availability}
            onChange={(e) => update('availability', e.target.value)}
            placeholder="Open to opportunities"
          />
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  const { data, update } = usePortfolio();
  return (
    <div>
      <SectionHeader title="About" desc="A short bio that introduces you to recruiters." />
      <textarea
        className="input min-h-[160px] resize-y"
        value={data.about}
        onChange={(e) => update('about', e.target.value)}
        placeholder="I craft accessible, performant web applications..."
      />
      <p className="mt-2 text-xs text-slate-400">
        {data.about.length} characters · aim for 80–250 words.
      </p>
    </div>
  );
}

function EducationSection() {
  const { data, setData } = usePortfolio();
  const add = () =>
    setData((p) => ({
      ...p,
      education: [
        ...p.education,
        {
          id: uid(),
          institution: '',
          degree: '',
          field: '',
          startYear: '',
          endYear: '',
          description: '',
        },
      ],
    }));

  const updateItem = (id: string, patch: Partial<typeof data.education[number]>) =>
    setData((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));

  const remove = (id: string) =>
    setData((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));

  return (
    <div>
      <SectionHeader title="Education" desc="Add your academic background." />
      <div className="space-y-4">
        <AnimatePresence>
          {data.education.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Education entry
                </span>
                <button
                  onClick={() => remove(e.id)}
                  className="text-rose-500 hover:text-rose-400"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Institution</label>
                  <input
                    className="input"
                    value={e.institution}
                    onChange={(ev) => updateItem(e.id, { institution: ev.target.value })}
                    placeholder="Technical University of Munich"
                  />
                </div>
                <div>
                  <label className="label">Degree</label>
                  <input
                    className="input"
                    value={e.degree}
                    onChange={(ev) => updateItem(e.id, { degree: ev.target.value })}
                    placeholder="M.Sc."
                  />
                </div>
                <div>
                  <label className="label">Field</label>
                  <input
                    className="input"
                    value={e.field}
                    onChange={(ev) => updateItem(e.id, { field: ev.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Start</label>
                    <input
                      className="input"
                      value={e.startYear}
                      onChange={(ev) => updateItem(e.id, { startYear: ev.target.value })}
                      placeholder="2021"
                    />
                  </div>
                  <div>
                    <label className="label">End</label>
                    <input
                      className="input"
                      value={e.endYear}
                      onChange={(ev) => updateItem(e.id, { endYear: ev.target.value })}
                      placeholder="2023"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    className="input min-h-[70px] resize-y"
                    value={e.description}
                    onChange={(ev) => updateItem(e.id, { description: ev.target.value })}
                    placeholder="Thesis on real-time collaborative editing..."
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={add} className="btn-ghost mt-4 w-full">
        <Plus size={16} /> Add education
      </button>
    </div>
  );
}

function SkillsSection() {
  const { data, setData } = usePortfolio();
  const add = () =>
    setData((p) => ({
      ...p,
      skills: [...p.skills, { id: uid(), name: '', level: 70, category: '' }],
    }));
  const updateItem = (id: string, patch: Partial<typeof data.skills[number]>) =>
    setData((p) => ({
      ...p,
      skills: p.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  const remove = (id: string) =>
    setData((p) => ({ ...p, skills: p.skills.filter((s) => s.id !== id) }));

  return (
    <div>
      <SectionHeader title="Skills" desc="Add skills with a proficiency level (0–100)." />
      <div className="space-y-3">
        <AnimatePresence>
          {data.skills.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Skill
                </span>
                <button
                  onClick={() => remove(s.id)}
                  className="text-rose-500 hover:text-rose-400"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="label">Name</label>
                  <input
                    className="input"
                    value={s.name}
                    onChange={(e) => updateItem(s.id, { name: e.target.value })}
                    placeholder="TypeScript"
                  />
                </div>
                <div>
                  <label className="label">Category</label>
                  <input
                    className="input"
                    value={s.category}
                    onChange={(e) => updateItem(s.id, { category: e.target.value })}
                    placeholder="Languages"
                  />
                </div>
                <div>
                  <label className="label">Level: {s.level}%</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={s.level}
                    onChange={(e) => updateItem(s.id, { level: Number(e.target.value) })}
                    className="w-full accent-brand-500 mt-3"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={add} className="btn-ghost mt-4 w-full">
        <Plus size={16} /> Add skill
      </button>
    </div>
  );
}

function ProjectsSection() {
  const { data, setData } = usePortfolio();
  const add = () =>
    setData((p) => ({
      ...p,
      projects: [
        ...p.projects,
        {
          id: uid(),
          title: '',
          description: '',
          techStack: '',
          link: '',
          repo: '',
          image: '',
        },
      ],
    }));
  const updateItem = (id: string, patch: Partial<typeof data.projects[number]>) =>
    setData((p) => ({
      ...p,
      projects: p.projects.map((pr) => (pr.id === id ? { ...pr, ...patch } : pr)),
    }));
  const remove = (id: string) =>
    setData((p) => ({ ...p, projects: p.projects.filter((pr) => pr.id !== id) }));

  return (
    <div>
      <SectionHeader title="Projects" desc="Showcase your best work." />
      <div className="space-y-4">
        <AnimatePresence>
          {data.projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Project
                </span>
                <button
                  onClick={() => remove(p.id)}
                  className="text-rose-500 hover:text-rose-400"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Title</label>
                  <input
                    className="input"
                    value={p.title}
                    onChange={(e) => updateItem(p.id, { title: e.target.value })}
                    placeholder="Lumen Analytics"
                  />
                </div>
                <div>
                  <label className="label">Tech stack</label>
                  <input
                    className="input font-mono text-xs"
                    value={p.techStack}
                    onChange={(e) => updateItem(p.id, { techStack: e.target.value })}
                    placeholder="React, D3, ClickHouse"
                  />
                </div>
                <div>
                  <label className="label">Live link</label>
                  <input
                    className="input"
                    value={p.link}
                    onChange={(e) => updateItem(p.id, { link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="label">Repo link</label>
                  <input
                    className="input"
                    value={p.repo}
                    onChange={(e) => updateItem(p.id, { repo: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    className="input min-h-[80px] resize-y"
                    value={p.description}
                    onChange={(e) => updateItem(p.id, { description: e.target.value })}
                    placeholder="Privacy-first product analytics..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <PhotoUpload
                    value={p.image}
                    onChange={(v) => updateItem(p.id, { image: v })}
                    label="Project image (optional)"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={add} className="btn-ghost mt-4 w-full">
        <Plus size={16} /> Add project
      </button>
    </div>
  );
}

function CertificatesSection() {
  const { data, setData } = usePortfolio();
  const add = () =>
    setData((p) => ({
      ...p,
      certificates: [
        ...p.certificates,
        { id: uid(), title: '', issuer: '', date: '', link: '' },
      ],
    }));
  const updateItem = (id: string, patch: Partial<typeof data.certificates[number]>) =>
    setData((p) => ({
      ...p,
      certificates: p.certificates.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  const remove = (id: string) =>
    setData((p) => ({
      ...p,
      certificates: p.certificates.filter((c) => c.id !== id),
    }));

  return (
    <div>
      <SectionHeader title="Certificates" desc="Highlight certifications and achievements." />
      <div className="space-y-3">
        <AnimatePresence>
          {data.certificates.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Certificate
                </span>
                <button
                  onClick={() => remove(c.id)}
                  className="text-rose-500 hover:text-rose-400"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">Title</label>
                  <input
                    className="input"
                    value={c.title}
                    onChange={(e) => updateItem(c.id, { title: e.target.value })}
                    placeholder="AWS Certified Developer"
                  />
                </div>
                <div>
                  <label className="label">Issuer</label>
                  <input
                    className="input"
                    value={c.issuer}
                    onChange={(e) => updateItem(c.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="label">Date</label>
                  <input
                    className="input"
                    value={c.date}
                    onChange={(e) => updateItem(c.id, { date: e.target.value })}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="label">Link (optional)</label>
                  <input
                    className="input"
                    value={c.link}
                    onChange={(e) => updateItem(c.id, { link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={add} className="btn-ghost mt-4 w-full">
        <Plus size={16} /> Add certificate
      </button>
    </div>
  );
}

function SocialSection() {
  const { data, update } = usePortfolio();
  const set = (key: keyof typeof data.social, value: string) =>
    update('social', { ...data.social, [key]: value });

  return (
    <div>
      <SectionHeader title="Social Links" desc="Where can people find you online?" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">GitHub</label>
          <input
            className="input"
            value={data.social.github}
            onChange={(e) => set('github', e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="label">LinkedIn</label>
          <input
            className="input"
            value={data.social.linkedin}
            onChange={(e) => set('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div>
          <label className="label">Twitter / X</label>
          <input
            className="input"
            value={data.social.twitter}
            onChange={(e) => set('twitter', e.target.value)}
            placeholder="https://twitter.com/..."
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            className="input"
            value={data.social.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Website</label>
          <input
            className="input"
            value={data.social.website}
            onChange={(e) => set('website', e.target.value)}
            placeholder="https://yoursite.com"
          />
        </div>
      </div>
    </div>
  );
}

function ThemeSection() {
  const { data, update } = usePortfolio();
  const presets = ['#3385fc', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div>
      <SectionHeader title="Theme" desc="Pick an accent color for your portfolio." />
      <div className="flex flex-wrap gap-3">
        {presets.map((c) => (
          <button
            key={c}
            onClick={() => update('accent', c)}
            className={`h-12 w-12 rounded-2xl border-2 transition-all ${
              data.accent === c
                ? 'border-slate-900 dark:border-white scale-110 shadow-lg'
                : 'border-transparent hover:scale-105'
            }`}
            style={{ background: c }}
            aria-label={`Accent ${c}`}
          />
        ))}
        <label className="relative h-12 w-12 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/10 cursor-pointer">
          <input
            type="color"
            value={data.accent}
            onChange={(e) => update('accent', e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="h-full w-full grid place-items-center text-xs font-semibold text-white" style={{ background: data.accent }}>
            Custom
          </div>
        </label>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Current accent: <span className="font-mono">{data.accent}</span>
      </p>
    </div>
  );
}
