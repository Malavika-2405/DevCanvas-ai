import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Sparkles size={16} className="text-brand-500" />
          <span>DevCanvas AI · Crafted for builders, by builders.</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <Link to="/builder" className="hover:text-brand-500 transition-colors">Builder</Link>
          <Link to="/preview" className="hover:text-brand-500 transition-colors">Preview</Link>
          <a href="#" className="hover:text-brand-500 transition-colors"><Github size={16} /></a>
          <a href="#" className="hover:text-brand-500 transition-colors"><Twitter size={16} /></a>
          <a href="#" className="hover:text-brand-500 transition-colors"><Linkedin size={16} /></a>
        </div>
      </div>
    </footer>
  );
}
