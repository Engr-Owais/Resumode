import React from 'react';
import { CVData } from '../types';
import { Mail, Phone, Github, Linkedin, Globe } from 'lucide-react';

interface ContactProps {
  data: CVData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const { email, phone, links } = data.personal;

  return (
    <section className="max-w-4xl mx-auto px-6 py-24 mt-12 border-t border-white/5">
      <div className="text-center">
        <h3 className="text-3xl font-display font-bold text-textMain mb-6">
          Get in Touch
        </h3>
        <p className="text-textMuted text-lg mb-12 max-w-2xl mx-auto">
          I'm currently open to new opportunities. Whether you have a question about my work or just want to say hi, feel free to reach out!
        </p>

        <div className="flex flex-col items-center gap-6 mb-12">
          {email && (
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-3 text-xl md:text-2xl font-bold text-textMain hover:text-accent transition-colors"
            >
              <div className="p-3 bg-surfaceHighlight rounded-full group-hover:bg-accent/10 transition-colors">
                <Mail className="group-hover:scale-110 transition-transform text-accent" size={24} />
              </div>
              {email}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="group flex items-center gap-3 text-lg text-textMuted hover:text-textMain transition-colors"
            >
              <div className="p-2 bg-surfaceHighlight rounded-full group-hover:bg-surface transition-colors">
                <Phone size={20} />
              </div>
              {phone}
            </a>
          )}
        </div>

        <div className="flex justify-center gap-6">
          {links?.github && (
            <a 
              href={links.github} 
              target="_blank" 
              rel="noreferrer" 
              className="text-textMuted hover:text-white hover:-translate-y-1 transition-all duration-300 p-3 bg-surfaceHighlight rounded-full border border-white/5 hover:border-accent/50"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          )}
          {links?.linkedin && (
            <a 
              href={links.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="text-textMuted hover:text-white hover:-translate-y-1 transition-all duration-300 p-3 bg-surfaceHighlight rounded-full border border-white/5 hover:border-accent/50"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          )}
          {links?.website && (
            <a 
              href={links.website} 
              target="_blank" 
              rel="noreferrer" 
              className="text-textMuted hover:text-white hover:-translate-y-1 transition-all duration-300 p-3 bg-surfaceHighlight rounded-full border border-white/5 hover:border-accent/50"
              aria-label="Website"
            >
              <Globe size={24} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;