import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import FloatingAIAssistant from '../ai/FloatingAIAssistant';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background dot-pattern relative overflow-hidden noise-overlay">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-2000" />
      
      <Sidebar />
      <main className="ml-[240px] min-h-screen transition-all duration-300 relative z-10">
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
      <FloatingAIAssistant />
    </div>
  );
}
