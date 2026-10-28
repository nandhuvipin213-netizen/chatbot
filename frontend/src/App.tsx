import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';

const AppContent: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-chatBg-light dark:bg-chatBg-dark text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <Navbar />
        <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
          <ChatWindow />
          <ChatInput />
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
