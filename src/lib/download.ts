import { PortfolioData } from '../types/portfolio';

function escape(str: string): string {
  return (str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildPortfolioHtml(data: PortfolioData): string {
  const accent = data.accent || '#3385fc';
  const photo = data.photo
    ? `<img src="${data.photo}" alt="${escape(data.name)}" class="avatar" />`
    : `<div class="avatar avatar-placeholder">${escape(
        (data.name || '?').slice(0, 1).toUpperCase(),
      )}</div>`;

  const socials = [
    { label: 'GitHub', url: data.social.github },
    { label: 'LinkedIn', url: data.social.linkedin },
    { label: 'Twitter', url: data.social.twitter },
    { label: 'Email', url: data.social.email ? `mailto:${data.social.email}` : '' },
    { label: 'Website', url: data.social.website },
  ]
    .filter((s) => s.url)
    .map((s) => `<a href="${escape(s.url)}" target="_blank" rel="noopener">${escape(s.label)}</a>`)
    .join('');

  const skills = data.skills
    .map(
      (s) => `
      <div class="skill">
        <div class="skill-head"><span>${escape(s.name)}</span><span>${s.level}%</span></div>
        <div class="bar"><div class="bar-fill" style="width:${s.level}%"></div></div>
        <div class="skill-cat">${escape(s.category || '')}</div>
      </div>`,
    )
    .join('');

  const projects = data.projects
    .map(
      (p) => `
      <article class="project">
        ${p.image ? `<img src="${p.image}" alt="${escape(p.title)}" />` : ''}
        <h3>${escape(p.title)}</h3>
        <p>${escape(p.description)}</p>
        ${p.techStack ? `<div class="tech">${escape(p.techStack)}</div>` : ''}
        <div class="links">
          ${p.link ? `<a href="${escape(p.link)}" target="_blank" rel="noopener">Live</a>` : ''}
          ${p.repo ? `<a href="${escape(p.repo)}" target="_blank" rel="noopener">Code</a>` : ''}
        </div>
      </article>`,
    )
    .join('');

  const education = data.education
    .map(
      (e) => `
      <div class="edu">
        <div class="edu-year">${escape(e.startYear)} — ${escape(e.endYear)}</div>
        <div>
          <h4>${escape(e.degree)}${e.field ? `, ${escape(e.field)}` : ''}</h4>
          <div class="edu-inst">${escape(e.institution)}</div>
          ${e.description ? `<p>${escape(e.description)}</p>` : ''}
        </div>
      </div>`,
    )
    .join('');

  const certs = data.certificates
    .map(
      (c) => `
      <div class="cert">
        <div>
          <h4>${escape(c.title)}</h4>
          <div class="cert-issuer">${escape(c.issuer)}${c.date ? ` · ${escape(c.date)}` : ''}</div>
        </div>
        ${c.link ? `<a href="${escape(c.link)}" target="_blank" rel="noopener">View</a>` : ''}
      </div>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(data.name || 'Portfolio')} — Portfolio</title>
<style>
  :root { --accent: ${accent}; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0b1020;
    color: #e6ecff;
    line-height: 1.6;
  }
  .wrap { max-width: 960px; margin: 0 auto; padding: 56px 24px; }
  header.hero {
    display: flex; gap: 28px; align-items: center; flex-wrap: wrap;
    padding: 36px; border-radius: 24px;
    background: linear-gradient(135deg, rgba(51,133,252,0.18), rgba(6,182,212,0.12));
    border: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 40px;
  }
  .avatar {
    width: 132px; height: 132px; border-radius: 50%;
    object-fit: cover; border: 3px solid var(--accent);
    box-shadow: 0 12px 40px -10px rgba(0,0,0,0.6);
    flex-shrink: 0;
  }
  .avatar-placeholder {
    display: flex; align-items: center; justify-content: center;
    font-size: 56px; font-weight: 700; color: #fff;
    background: linear-gradient(135deg, var(--accent), #06b6d4);
  }
  h1 { margin: 0 0 6px; font-size: 2.4rem; letter-spacing: -0.02em; }
  .title { color: #9fb3d4; font-size: 1.1rem; margin-bottom: 12px; }
  .meta { color: #8aa0c4; font-size: 0.95rem; display: flex; gap: 14px; flex-wrap: wrap; }
  .socials { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; }
  .socials a {
    text-decoration: none; color: #e6ecff; font-size: 0.85rem; font-weight: 600;
    padding: 8px 14px; border-radius: 999px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    transition: background .2s;
  }
  .socials a:hover { background: var(--accent); color: #fff; }
  section { margin: 48px 0; }
  h2 {
    font-size: 1.4rem; margin: 0 0 20px; padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; gap: 10px;
  }
  h2::before { content: ''; width: 6px; height: 22px; background: var(--accent); border-radius: 4px; }
  p.about { color: #c3d0e8; font-size: 1.05rem; }
  .grid { display: grid; gap: 18px; }
  .grid-2 { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .grid-3 { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .skill { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 14px; }
  .skill-head { display: flex; justify-content: space-between; font-weight: 600; font-size: 0.95rem; margin-bottom: 8px; }
  .bar { height: 8px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #06b6d4); border-radius: 999px; }
  .skill-cat { color: #8aa0c4; font-size: 0.8rem; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .project {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 20px; transition: transform .2s;
  }
  .project img { width: 100%; height: 140px; object-fit: cover; border-radius: 10px; margin-bottom: 12px; }
  .project h3 { margin: 0 0 8px; font-size: 1.15rem; }
  .project p { color: #b8c5e0; font-size: 0.95rem; margin: 0 0 12px; }
  .tech { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #06b6d4; margin-bottom: 12px; }
  .links { display: flex; gap: 10px; }
  .links a { text-decoration: none; color: #e6ecff; font-size: 0.82rem; font-weight: 600; padding: 6px 12px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
  .links a:hover { background: var(--accent); color: #fff; }
  .edu { display: flex; gap: 20px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .edu-year { color: var(--accent); font-weight: 600; min-width: 110px; font-size: 0.9rem; }
  .edu h4 { margin: 0 0 4px; font-size: 1rem; }
  .edu-inst { color: #9fb3d4; font-size: 0.9rem; margin-bottom: 6px; }
  .edu p { color: #b8c5e0; font-size: 0.92rem; margin: 0; }
  .cert { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; margin-bottom: 10px; }
  .cert h4 { margin: 0 0 2px; font-size: 0.98rem; }
  .cert-issuer { color: #9fb3d4; font-size: 0.85rem; }
  .cert a { text-decoration: none; color: var(--accent); font-weight: 600; font-size: 0.85rem; }
  footer { text-align: center; color: #6b7fa0; font-size: 0.85rem; margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); }
  @media print {
    body { background: #fff; color: #000; }
    .wrap { padding: 0; }
    header.hero, .skill, .project, .cert { break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      ${photo}
      <div>
        <h1>${escape(data.name || 'Your Name')}</h1>
        <div class="title">${escape(data.title || '')}</div>
        <div class="meta">
          ${data.location ? `<span>${escape(data.location)}</span>` : ''}
          ${data.availability ? `<span>•</span><span>${escape(data.availability)}</span>` : ''}
        </div>
        ${socials ? `<div class="socials">${socials}</div>` : ''}
      </div>
    </header>

    ${
      data.about
        ? `<section><h2>About</h2><p class="about">${escape(data.about)}</p></section>`
        : ''
    }

    ${
      data.skills.length
        ? `<section><h2>Skills</h2><div class="grid grid-2">${skills}</div></section>`
        : ''
    }

    ${
      data.projects.length
        ? `<section><h2>Projects</h2><div class="grid grid-3">${projects}</div></section>`
        : ''
    }

    ${
      data.education.length
        ? `<section><h2>Education</h2>${education}</section>`
        : ''
    }

    ${
      data.certificates.length
        ? `<section><h2>Certificates</h2>${certs}</section>`
        : ''
    }

    <footer>Built with DevCanvas AI · ${new Date().getFullYear()}</footer>
  </div>
</body>
</html>`;
}

export function downloadHtml(data: PortfolioData): void {
  const html = buildPortfolioHtml(data);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
