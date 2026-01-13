
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    jobTitle: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: string[];
}

export type TemplateType = 'modern' | 'minimal' | 'ats';
export type FontType = 'Inter' | 'Lora' | 'Roboto Mono';

export interface AppSettings {
  template: TemplateType;
  primaryColor: string;
  fontFamily: FontType;
  sectionOrder: string[];
}
