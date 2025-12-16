import React from 'react';
import { CVData } from '../types';
import { ExternalLink, Code2 } from 'lucide-react';

interface ProjectsProps {
  data: CVData;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const { projects } = data;

  if (!projects || projects.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 bg-surface/30 rounded-3xl my-20">
      <h3 className="text-2xl font-display font-bold text-textMain mb-12 flex items-center gap-4">
        <span className="w-8 h-[2px] bg-accent"></span>
        Selected Work
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="flex flex-col h-full p-8 rounded-2xl bg-surfaceHighlight/30 border border-white/5 hover:border-accent/30 hover:bg-surfaceHighlight/50 transition-all duration-300 group"
          >
            <div className="mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-background rounded-xl text-accent mb-6 border border-white/5">
                <Code2 size={24} />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-xl font-bold text-textMain group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-textMuted hover:text-white transition-colors p-1"
                    title="View Project"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-textMuted text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="text-xs font-mono text-accent/80 bg-accent/5 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;