
import { create } from 'zustand';
import { ResumeData, AppSettings, Experience, Education, Project } from './types';

interface ResumeState {
  data: ResumeData;
  settings: AppSettings;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setSkills: (skills: string[]) => void;
  setCertifications: (certs: string[]) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: 'Jonathan Doe',
    email: 'j.doe@example.com',
    phone: '+1 (555) 000-1111',
    location: 'San Francisco, CA',
    website: 'jdoe.dev',
    linkedin: 'linkedin.com/in/jdoe',
    jobTitle: 'Senior Software Engineer',
    summary: 'Innovative software engineer with 8+ years of experience in building scalable web applications. Expert in React, TypeScript, and cloud architecture.',
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Engineer',
      location: 'New York, NY',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: 'Lead developer for the flagship SaaS product, increasing user engagement by 40% through UI/UX overhauls.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. Computer Science',
      location: 'Boston, MA',
      startDate: '2012',
      endDate: '2016',
      description: 'Graduated with Honors, specialized in Distributed Systems.'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS'],
  projects: [
    {
      id: '1',
      name: 'OpenSource UI Library',
      description: 'A lightweight React UI kit used by over 5k developers.',
      link: 'github.com/jdoe/ui-kit'
    }
  ],
  certifications: ['AWS Certified Solutions Architect', 'Google Professional Cloud Developer']
};

export const useResumeStore = create<ResumeState>((set) => ({
  data: initialData,
  settings: {
    template: 'modern',
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications']
  },
  updatePersonalInfo: (info) => set((state) => ({
    data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } }
  })),
  addExperience: (exp) => set((state) => ({
    data: { ...state.data, experience: [...state.data.experience, exp] }
  })),
  updateExperience: (id, exp) => set((state) => ({
    data: { ...state.data, experience: state.data.experience.map(e => e.id === id ? { ...e, ...exp } : e) }
  })),
  removeExperience: (id) => set((state) => ({
    data: { ...state.data, experience: state.data.experience.filter(e => e.id !== id) }
  })),
  addEducation: (edu) => set((state) => ({
    data: { ...state.data, education: [...state.data.education, edu] }
  })),
  updateEducation: (id, edu) => set((state) => ({
    data: { ...state.data, education: state.data.education.map(e => e.id === id ? { ...e, ...edu } : e) }
  })),
  removeEducation: (id) => set((state) => ({
    data: { ...state.data, education: state.data.education.filter(e => e.id !== id) }
  })),
  addProject: (proj) => set((state) => ({
    data: { ...state.data, projects: [...state.data.projects, proj] }
  })),
  updateProject: (id, proj) => set((state) => ({
    data: { ...state.data, projects: state.data.projects.map(p => p.id === id ? { ...p, ...proj } : p) }
  })),
  removeProject: (id) => set((state) => ({
    data: { ...state.data, projects: state.data.projects.filter(p => p.id !== id) }
  })),
  setSkills: (skills) => set((state) => ({
    data: { ...state.data, skills }
  })),
  setCertifications: (certs) => set((state) => ({
    data: { ...state.data, certifications: certs }
  })),
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  }))
}));
