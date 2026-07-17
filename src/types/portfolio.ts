export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string;
  link: string;
  repo: string;
  image: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  website: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  photo: string; // data URL
  about: string;
  location: string;
  availability: string;
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  social: SocialLinks;
  accent: string; // hex color
  updatedAt: number;
}

export const emptyPortfolio: PortfolioData = {
  name: '',
  title: '',
  photo: '',
  about: '',
  location: '',
  availability: 'Open to opportunities',
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    email: '',
    website: '',
  },
  accent: '#3385fc',
  updatedAt: Date.now(),
};

export const samplePortfolio: PortfolioData = {
  name: 'Avery Mitchell',
  title: 'Full-Stack Developer & UI Engineer',
  photo: '',
  about:
    'I craft accessible, performant web applications with a focus on delightful interaction design. Currently building tools that help developers ship faster without compromising on craft.',
  location: 'Berlin, Germany',
  availability: 'Open to freelance & full-time',
  education: [
    {
      id: 'e1',
      institution: 'Technical University of Munich',
      degree: 'M.Sc.',
      field: 'Human-Computer Interaction',
      startYear: '2021',
      endYear: '2023',
      description: 'Thesis on real-time collaborative editing interfaces.',
    },
    {
      id: 'e2',
      institution: 'University of Amsterdam',
      degree: 'B.Sc.',
      field: 'Computer Science',
      startYear: '2017',
      endYear: '2021',
      description: 'Graduated with honors. President of the dev society.',
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript', level: 92, category: 'Languages' },
    { id: 's2', name: 'React', level: 95, category: 'Frontend' },
    { id: 's3', name: 'Node.js', level: 85, category: 'Backend' },
    { id: 's4', name: 'PostgreSQL', level: 78, category: 'Database' },
    { id: 's5', name: 'Figma', level: 80, category: 'Design' },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Lumen Analytics',
      description: 'Privacy-first product analytics with sub-second dashboards and zero cookies.',
      techStack: 'React, D3, ClickHouse, Cloudflare Workers',
      link: 'https://example.com/lumen',
      repo: 'https://github.com/example/lumen',
      image: '',
    },
    {
      id: 'p2',
      title: 'Orbit Tasks',
      description: 'A keyboard-first task manager with offline sync and natural-language scheduling.',
      techStack: 'TypeScript, Vite, IndexedDB, Web Workers',
      link: 'https://example.com/orbit',
      repo: 'https://github.com/example/orbit',
      image: '',
    },
  ],
  certificates: [
    {
      id: 'c1',
      title: 'AWS Certified Developer — Associate',
      issuer: 'Amazon Web Services',
      date: '2024',
      link: '',
    },
    {
      id: 'c2',
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2023',
      link: '',
    },
  ],
  social: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
    twitter: 'https://twitter.com/example',
    email: 'avery@example.com',
    website: 'https://example.com',
  },
  accent: '#3385fc',
  updatedAt: Date.now(),
};
