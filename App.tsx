
import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Editor from './components/Layout/Editor';
import Preview from './components/Layout/Preview';
import { Download, Share2, Palette, FileText, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simple window.print() is the most reliable way for high-fidelity resume PDFs
    // Modern browsers support background graphics and high DPI scaling
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 500);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">R</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            ResumeBuilder <span className="text-blue-600">Pro</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold animate-pulse">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Auto-saving
          </div>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all transform active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Preparing...' : 'Export PDF'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="w-[420px] h-full flex flex-col shrink-0">
          <Editor />
        </aside>

        {/* Live Preview Pane */}
        <section className="flex-1 h-full overflow-hidden bg-slate-200 relative">
          <Preview />
          
          {/* Zoom Controls (Float) */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-2 no-print">
            <div className="bg-white/90 backdrop-blur shadow-lg border border-slate-200 p-1 rounded-full flex flex-col items-center">
               <div className="px-3 py-2 text-xs font-bold text-slate-500">Live Preview</div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          #resume-content {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            transform: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
