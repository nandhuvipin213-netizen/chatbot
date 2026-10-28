import React from 'react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 py-4 max-w-3xl mx-auto w-full animate-fadeIn">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '3s' }} />
      </div>

      {/* Bubble with bouncing dots */}
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 shadow-sm">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
        <span className="text-xs text-slate-400 font-medium ml-1.5">Gemini is thinking...</span>
      </div>
    </div>
  );
};

