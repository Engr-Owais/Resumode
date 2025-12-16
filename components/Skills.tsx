import React from 'react';
import { CVData } from '../types';

interface SkillsProps {
  data: CVData;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const { skills } = data;
  const categories = Object.keys(skills) as (keyof typeof skills)[];
  
  // Filter empty categories
  const validCategories = categories.filter(cat => skills[cat] && skills[cat]!.length > 0);

  if (validCategories.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h3 className="text-2xl font-display font-bold text-textMain mb-12 flex items-center gap-4">
        <span className="w-8 h-[2px] bg-accent"></span>
        Technical Expertise
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {validCategories.map((category) => (
          <div 
            key={category} 
            className="group p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300"
          >
            <h4 className="text-accent font-display uppercase tracking-widest text-sm font-bold mb-6">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills[category]?.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-surfaceHighlight text-textMain text-sm rounded-md border border-white/5 hover:border-accent/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;