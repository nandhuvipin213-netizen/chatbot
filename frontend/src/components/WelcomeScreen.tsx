import React from 'react';
import { Sparkles, Code2, Compass, Lightbulb, GraduationCap } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const SUGGESTIONS = [
  {
    icon: Code2,
    title: 'Code with TypeScript',
    prompt: 'Write a clean TypeScript Express controller with error handling and validation.',
  },
  {
    icon: Lightbulb,
    title: 'Brainstorm Ideas',
    prompt: 'Suggest 5 innovative SaaS project ideas using AI and modern web technologies.',
  },
  {
    icon: GraduationCap,
    title: 'Explain Concepts',
    prompt: 'Explain the difference between SQL and NoSQL databases like MongoDB simply.',
  },
  {
    icon: Compass,
    title: 'Troubleshoot Code',
    prompt: 'How do I avoid unnecessary re-renders in a React application with hooks?',
  },
];

export const WelcomeScreen: React.FC = () => {
  const { sendMessage } = useChat();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto select-none">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4 animate-pulse">
        <Sparkles className="w-7 h-7 text-white" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
        Hello! How can I help you today?
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        Powered by Google Gemini and built with the MERN stack. Ask questions, generate code, or explore ideas.
      </p>

      {/* Suggested prompts grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        {SUGGESTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => sendMessage(item.prompt)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 shadow-sm hover:shadow-md group text-left"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {item.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.prompt}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

