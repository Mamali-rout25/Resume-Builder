
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden">
      <AnimatePresence>
        {/* Background Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8 pointer-events-none"
        >
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-white/20 rounded-sm" />
          ))}
        </motion.div>

        {/* Text Sequence */}
        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-4"
          >
            <h2 className="text-slate-400 font-mono text-sm tracking-[0.3em] uppercase">Architecture of Success</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-white text-6xl md:text-7xl font-bold tracking-tight mb-2">
              ResumeBuilder <span className="text-blue-500">Pro</span>
            </h1>
            <div className="w-16 h-1 bg-blue-500 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="mt-12 flex space-x-2 justify-center"
          >
            {/* Page assembly visual */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 100, opacity: 0, rotate: i * 5 - 10 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 + (i * 0.2), ease: "easeOut" }}
                className="w-12 h-16 bg-white rounded shadow-2xl border border-slate-200"
              />
            ))}
          </motion.div>
        </div>

        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onComplete}
          className="absolute bottom-8 right-8 px-4 py-2 text-slate-500 hover:text-white text-sm font-medium transition-colors border border-slate-800 hover:border-slate-600 rounded-md"
        >
          Skip Intro
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default IntroAnimation;
