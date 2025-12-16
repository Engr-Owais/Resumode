import React from 'react';
import { CVData } from '../types';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  data: CVData;
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const { experience } = data;

  if (!experience || experience.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h3 className="text-2xl font-display font-bold text-textMain mb-12 flex items-center gap-4">
        <span className="w-8 h-[2px] bg-accent"></span>
        Experience
      </h3>

      <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
        {experience.map((job, index) => (
          <div key={index} className="relative pl-8 md:pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-accent transition-colors duration-300 shadow-[0_0_0_4px_#09090b]"></div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <h4 className="text-xl font-bold text-textMain">{job.role}</h4>
              <span className="text-sm font-mono text-textMuted mt-1 sm:mt-0">{job.duration}</span>
            </div>
            
            <div className="text-accent mb-4 font-medium flex items-center gap-2">
              <Briefcase size={14} />
              {job.company}
            </div>

            <ul className="space-y-3">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="text-textMuted leading-relaxed flex items-start gap-3 text-sm md:text-base">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent/50 shrink-0"></span>
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;