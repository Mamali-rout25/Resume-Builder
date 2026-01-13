
import React from 'react';
import { useResumeStore } from '../../store';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const Preview: React.FC = () => {
  const { data, settings } = useResumeStore();

  const fontStyle = {
    fontFamily: settings.fontFamily === 'Roboto Mono' ? "'Roboto Mono', monospace" : (settings.fontFamily === 'Lora' ? "'Lora', serif" : "'Inter', sans-serif")
  };

  const ModernTemplate = () => (
    <div className="flex min-h-full">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 leading-tight">{data.personalInfo.fullName}</h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">{data.personalInfo.jobTitle}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs opacity-90">
            <Mail className="w-3 h-3 text-blue-400" />
            <span>{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-3 text-xs opacity-90">
            <Phone className="w-3 h-3 text-blue-400" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-xs opacity-90">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span>{data.personalInfo.location}</span>
          </div>
          {data.personalInfo.website && (
            <div className="flex items-center gap-3 text-xs opacity-90">
              <Globe className="w-3 h-3 text-blue-400" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="px-2 py-1 bg-slate-700 text-[10px] rounded border border-slate-600">{s}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((c, i) => (
              <p key={i} className="text-[10px] opacity-90">• {c}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white text-slate-800">
        <section className="mb-10">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Professional Summary</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-800">{exp.position}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-xs font-semibold text-blue-500 mb-2">{exp.company}</p>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-800">{edu.school}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{edu.startDate} — {edu.endDate}</span>
                </div>
                <p className="text-xs text-slate-600">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const MinimalTemplate = () => (
    <div className="p-12 bg-white text-slate-900">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center items-center gap-4 text-xs text-slate-500">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <section className="mb-12 max-w-2xl mx-auto">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">About</h2>
        <p className="text-sm text-center leading-relaxed text-slate-600 italic">"{data.personalInfo.summary}"</p>
      </section>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-12">
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{exp.position} at {exp.company}</h3>
                    <span className="text-[10px] text-slate-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{edu.school}</h3>
                    <span className="text-[10px] text-slate-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-600">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded">{s}</span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b pb-2">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <h4 className="text-sm font-medium">{p.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const ATSTemplate = () => (
    <div className="p-10 bg-white text-black leading-normal">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase">{data.personalInfo.fullName}</h1>
        <div className="text-sm">
          {data.personalInfo.location} | {data.personalInfo.phone} | {data.personalInfo.email}
        </div>
        <div className="text-sm text-blue-800">
          {data.personalInfo.website} | {data.personalInfo.linkedin}
        </div>
      </div>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Summary</h2>
        <p className="text-sm">{data.personalInfo.summary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <div className="flex justify-between italic text-sm">
                <span>{exp.position}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <ul className="list-disc ml-5 text-sm mt-1">
                {exp.description.split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between font-bold text-sm">
              <span>{edu.school}</span>
              <span>{edu.location}</span>
            </div>
            <div className="flex justify-between italic text-sm">
              <span>{edu.degree}</span>
              <span>{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Skills & Certifications</h2>
        <div className="text-sm">
          <span className="font-bold">Skills:</span> {data.skills.join(', ')}
        </div>
        <div className="text-sm mt-1">
          <span className="font-bold">Certifications:</span> {data.certifications.join(', ')}
        </div>
      </section>
    </div>
  );

  const getTemplate = () => {
    switch (settings.template) {
      case 'modern': return <ModernTemplate />;
      case 'minimal': return <MinimalTemplate />;
      case 'ats': return <ATSTemplate />;
      default: return <ModernTemplate />;
    }
  };

  return (
    <div className="flex-1 bg-slate-200 p-8 overflow-y-auto flex justify-center scrollbar-hide">
      <div 
        id="resume-content"
        className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top transition-transform duration-300 ease-in-out"
        style={fontStyle}
      >
        {getTemplate()}
      </div>
    </div>
  );
};

export default Preview;
