
import React, { useState } from 'react';
import { useResumeStore } from '../../store.ts';
import { 
  User, Briefcase, GraduationCap, Code, 
  Settings, FolderKanban, Award, Plus, Trash2, 
  ChevronDown, ChevronUp, GripVertical, Globe, Linkedin, Github
} from 'lucide-react';

const SectionHeader: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void 
}> = ({ icon: Icon, title, isOpen, onToggle }) => (
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 group"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
      <span className="font-semibold text-slate-700">{title}</span>
    </div>
    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
  </button>
);

const Editor: React.FC = () => {
  const { data, settings, updatePersonalInfo, addExperience, updateExperience, removeExperience, addEducation, updateEducation, removeEducation, addProject, updateProject, removeProject, setSkills, setCertifications, updateSettings } = useResumeStore();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ personal: true });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      setSkills([...data.skills, e.currentTarget.value]);
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-slate-200 no-print">
      {/* Templates & Settings */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Appearance</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-2">Template</label>
            <div className="flex gap-2">
              {(['modern', 'minimal', 'ats'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => updateSettings({ template: t })}
                  className={`flex-1 py-2 text-xs font-medium rounded border transition-all ${settings.template === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-2">Font</label>
            <select 
              value={settings.fontFamily}
              onChange={(e) => updateSettings({ fontFamily: e.target.value as any })}
              className="w-full p-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Inter">Inter (Sans)</option>
              <option value="Lora">Lora (Serif)</option>
              <option value="Roboto Mono">Roboto Mono (Monospace)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Forms */}
      <div className="flex flex-col">
        {/* Personal Details */}
        <div className="border-b border-slate-100">
          <SectionHeader icon={User} title="Personal Details" isOpen={!!openSections.personal} onToggle={() => toggleSection('personal')} />
          {openSections.personal && (
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  value={data.personalInfo.fullName} 
                  onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Job Title</label>
                <input 
                  type="text" 
                  value={data.personalInfo.jobTitle} 
                  onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Email</label>
                <input 
                  type="email" 
                  value={data.personalInfo.email} 
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Phone</label>
                <input 
                  type="text" 
                  value={data.personalInfo.phone} 
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Website</label>
                <input 
                  type="text" 
                  value={data.personalInfo.website} 
                  onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                  placeholder="portfolio.com"
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">LinkedIn</label>
                <input 
                  type="text" 
                  value={data.personalInfo.linkedin} 
                  onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                  placeholder="linkedin.com/in/username"
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">GitHub</label>
                <input 
                  type="text" 
                  value={data.personalInfo.github} 
                  onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                  placeholder="github.com/username"
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Summary</label>
                <textarea 
                  rows={4}
                  value={data.personalInfo.summary} 
                  onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                  className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none resize-none" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="border-b border-slate-100">
          <SectionHeader icon={Briefcase} title="Experience" isOpen={!!openSections.experience} onToggle={() => toggleSection('experience')} />
          {openSections.experience && (
            <div className="p-4 space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50">
                  <button 
                    onClick={() => removeExperience(exp.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      placeholder="Company"
                      value={exp.company} 
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <input 
                      placeholder="Position"
                      value={exp.position} 
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <input 
                      placeholder="Start Date"
                      value={exp.startDate} 
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <input 
                      placeholder="End Date"
                      value={exp.endDate} 
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <textarea 
                      placeholder="Description"
                      rows={3}
                      value={exp.description} 
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      className="col-span-2 w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={() => addExperience({ id: Date.now().toString(), company: '', position: '', location: '', startDate: '', endDate: '', description: '' })}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="border-b border-slate-100">
          <SectionHeader icon={Code} title="Skills" isOpen={!!openSections.skills} onToggle={() => toggleSection('skills')} />
          {openSections.skills && (
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium flex items-center gap-1">
                    {skill}
                    <button onClick={() => setSkills(data.skills.filter((_, idx) => idx !== i))}>
                      <Trash2 className="w-3 h-3 ml-1 opacity-60 hover:opacity-100" />
                    </button>
                  </span>
                ))}
              </div>
              <input 
                placeholder="Type and press Enter to add skills..."
                onKeyDown={handleSkillAdd}
                className="w-full p-2 text-sm border border-slate-200 rounded focus:border-blue-500 outline-none" 
              />
            </div>
          )}
        </div>

        {/* Education */}
        <div className="border-b border-slate-100">
          <SectionHeader icon={GraduationCap} title="Education" isOpen={!!openSections.education} onToggle={() => toggleSection('education')} />
          {openSections.education && (
            <div className="p-4 space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50">
                  <button 
                    onClick={() => removeEducation(edu.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      placeholder="School"
                      value={edu.school} 
                      onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <input 
                      placeholder="Degree"
                      value={edu.degree} 
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <input 
                      placeholder="Start Date"
                      value={edu.startDate} 
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                    <input 
                      placeholder="End Date"
                      value={edu.endDate} 
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none" 
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={() => addEducation({ id: Date.now().toString(), school: '', degree: '', location: '', startDate: '', endDate: '', description: '' })}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
