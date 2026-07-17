import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  MapPin,
  Calendar,
  ExternalLink,
  Code2,
  Award,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { PortfolioData } from '../../types/portfolio';

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function PortfolioView({ data }: { data: PortfolioData }) {
  const accent = data.accent || '#3385fc';

  const socials = [
    { url: data.social.github, Icon: Github, label: 'GitHub' },
    { url: data.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { url: data.social.twitter, Icon: Twitter, label: 'Twitter' },
    { url: data.social.email ? `mailto:${data.social.email}` : '', Icon: Mail, label: 'Email' },
    { url: data.social.website, Icon: Globe, label: 'Website' },
  ].filter((s) => s.url);

  return (
    <div className="font-sans">
      {/* Hero */}
      <motion.section
        variants={fade}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10"
      >
        <div
          className="absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{ background: accent }}
        />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <div
              className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden border-2 grid place-items-center text-white text-4xl font-display font-700 shadow-glow"
              style={{ borderColor: accent, background: `linear-gradient(135deg, ${accent}, #06b6d4)` }}
            >
              {data.photo ? (
                <img src={data.photo} alt={data.name} className="h-full w-full object-cover" />
              ) : (
                <span>{(data.name || '?').slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <div
              className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-white/10"
              style={{ color: accent }}
            >
              <Sparkles size={16} />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display text-3xl sm:text-4xl font-700 tracking-tight">
              {data.name || 'Your Name'}
            </h1>
            <p className="mt-1 text-base sm:text-lg text-slate-500 dark:text-slate-400">
              {data.title || 'Your professional title'}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {data.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {data.location}
                </span>
              )}
              {data.availability && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} /> {data.availability}
                </span>
              )}
            </div>
            {socials.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-2">
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-brand-400 hover:text-brand-500 transition-colors"
                  >
                    <Icon size={14} /> {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* About */}
      {data.about && (
        <motion.section
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6"
        >
          <SectionTitle icon={<Sparkles size={16} />} accent={accent}>
            About
          </SectionTitle>
          <p className="card p-5 sm:p-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            {data.about}
          </p>
        </motion.section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <motion.section
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10"
        >
          <SectionTitle icon={<Code2 size={16} />} accent={accent}>
            Skills
          </SectionTitle>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.skills.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="card p-4"
              >
                <div className="flex items-center justify-between text-sm font-semibold mb-2">
                  <span>{s.name}</span>
                  <span className="text-xs text-slate-500">{s.level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 + 0.05 * i }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, #06b6d4)` }}
                  />
                </div>
                {s.category && (
                  <div className="mt-2 text-[10px] uppercase tracking-wider text-slate-400">
                    {s.category}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <motion.section
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10"
        >
          <SectionTitle icon={<Code2 size={16} />} accent={accent}>
            Projects
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.projects.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/[0.06] dark:to-white/[0.02]">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(135deg, ${accent}22, #06b6d422)`,
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${accent}33, transparent)`,
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-700 text-base">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                    {p.description}
                  </p>
                  {p.techStack && (
                    <p className="mt-3 font-mono text-[11px] text-accent-500 dark:text-accent-400">
                      {p.techStack}
                    </p>
                  )}
                  <div className="mt-3 flex gap-2">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-400"
                      >
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        <Github size={12} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <motion.section
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10"
        >
          <SectionTitle icon={<GraduationCap size={16} />} accent={accent}>
            Education
          </SectionTitle>
          <div className="card divide-y divide-slate-200/70 dark:divide-white/[0.06]">
            {data.education.map((e) => (
              <div key={e.id} className="flex gap-4 p-5">
                <div
                  className="text-xs font-mono font-semibold shrink-0 w-24"
                  style={{ color: accent }}
                >
                  {e.startYear} — {e.endYear || 'Present'}
                </div>
                <div>
                  <h4 className="font-semibold">
                    {e.degree}
                    {e.field && <span className="text-slate-500"> · {e.field}</span>}
                  </h4>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{e.institution}</div>
                  {e.description && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{e.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Certificates */}
      {data.certificates.length > 0 && (
        <motion.section
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10"
        >
          <SectionTitle icon={<Award size={16} />} accent={accent}>
            Certificates
          </SectionTitle>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.certificates.map((c) => (
              <div
                key={c.id}
                className="card p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-semibold text-sm">{c.title}</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {c.issuer}
                    {c.date && ` · ${c.date}`}
                  </div>
                </div>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-500 hover:text-brand-400 inline-flex items-center gap-1"
                  >
                    View <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

function SectionTitle({
  children,
  icon,
  accent,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="grid h-7 w-7 place-items-center rounded-lg text-white"
        style={{ background: accent }}
      >
        {icon}
      </span>
      <h2 className="font-display text-xl font-700 tracking-tight">{children}</h2>
      <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-white/10" />
    </div>
  );
}
