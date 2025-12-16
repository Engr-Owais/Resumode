export interface CVData {
  personal: {
    name: string;
    role: string;
    summary: string;
    location?: string;
    email?: string;
    phone?: string;
    links?: {
      github?: string;
      linkedin?: string;
      website?: string;
    };
  };
  skills: {
    frontend?: string[];
    backend?: string[];
    mobile?: string[];
    tools?: string[];
    others?: string[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
}

export enum SectionType {
  HERO = 'HERO',
  EXPERIENCE = 'EXPERIENCE',
  PROJECTS = 'PROJECTS',
  SKILLS = 'SKILLS',
  EDUCATION = 'EDUCATION',
  CONTACT = 'CONTACT'
}

export interface SectionProps {
  data: CVData;
  className?: string;
}