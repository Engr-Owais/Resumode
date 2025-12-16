import React from 'react';
import { CVData } from '../types';
import { Download, Mail, Github, Linkedin, Globe } from 'lucide-react';

interface HeroProps {
  data: CVData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { name, role, summary, links, email } = data.personal;

  return (
    <section className="min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto px-6 py-20">
      <div className="space-y-6">
        <h2 className="text-accent font-display font-medium tracking-wide uppercase text-sm md:text-base mb-4">
          Portfolio
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-textMain leading-tight">
          Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">{name}</span>.
        </h1>
        
        <h2 className="text-3xl md:text-5xl text-textMuted font-light">
          {role}
        </h2>

        <p className="max-w-2xl text-lg text-textMuted leading-relaxed border-l-2 border-accent/30 pl-6 mt-8">
          {summary}
        </p>

        <div className="flex flex-wrap gap-4 pt-8">
          {email && (
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-full transition-all duration-300 border border-accent/20 font-medium"
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
          )}
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-surfaceHighlight hover:bg-surfaceHighlight/80 text-textMain rounded-full transition-all duration-300 font-medium"
          >
            <Download size={18} />
            <span>Save PDF</span>
          </button>
        </div>

        <div className="flex gap-6 pt-6 text-textMuted">
          {links?.github && (
            <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <Github size={24} />
            </a>
          )}
          {links?.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <Linkedin size={24} />
            </a>
          )}
          {links?.website && (
            <a href={links.website} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <Globe size={24} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;