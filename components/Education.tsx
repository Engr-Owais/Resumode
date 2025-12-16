import React from 'react';
import { CVData } from '../types';
import { GraduationCap } from 'lucide-react';

interface EducationProps {
  data: CVData;
}

const Education: React.FC<EducationProps> = ({ data }) => {
  const { education } = data;

  if (!education || education.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h3 className="text-2xl font-display font-bold text-textMain mb-12 flex items-center gap-4">
        <span className="w-8 h-[2px] bg-accent"></span>
        Education
      </h3>

      <div className="grid grid-cols-1 gap-6">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 rounded-xl bg-surface border border-border"
          >
            <div className="p-3 bg-surfaceHighlight rounded-full text-accent shrink-0 w-fit">
              <GraduationCap size={24} />
            </div>
            
            <div className="flex-grow">
              <h4 className="text-lg font-bold text-textMain">{edu.institution}</h4>
              <p className="text-accent">{edu.degree}</p>
            </div>
            
            <div className="text-textMuted font-mono text-sm shrink-0 bg-surfaceHighlight px-3 py-1 rounded-full">
              {edu.duration}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;