import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bot, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

const schedule = [
  { time: '09:00 AM', task: 'Deep Work: Landing Page', type: 'focus', duration: '2h' },
  { time: '11:00 AM', task: 'Team Standup', type: 'meeting', duration: '30m' },
  { time: '11:45 AM', task: 'Review PRs', type: 'admin', duration: '45m' },
  { time: '01:30 PM', task: 'Client Presentation', type: 'meeting', duration: '1h' },
  { time: '03:00 PM', task: 'API Integration', type: 'focus', duration: '2h' },
];

const typeColors: Record<string, string> = {
  focus: 'bg-primary/20 text-primary border-primary/30',
  meeting: 'bg-accent/20 text-accent border-accent/30',
  admin: 'bg-muted text-muted-foreground border-border',
};

export default function SmartSchedulePanel() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true); // Default true for demo

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-5 relative overflow-hidden flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Smart Schedule</h3>
        </div>
        {!isGenerating && (
          <button
            onClick={handleGenerate}
            className="text-[10px] uppercase font-bold tracking-wider text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            <Bot className="w-3 h-3" /> Optimize
          </button>
        )}
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 bg-background/50 backdrop-blur-sm rounded-lg"
            >
              <Loader2 className="w-6 h-6 text-primary animate-spin mb-3" />
              <p className="text-xs text-muted-foreground font-medium">AI is analyzing your workload...</p>
            </motion.div>
          ) : hasGenerated ? (
            <motion.div
              key="schedule"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-border/50"
            >
              {schedule.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 relative"
                >
                  <div className="w-[22px] h-[22px] rounded-full bg-background border border-border flex items-center justify-center shrink-0 z-10 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary glow-primary" />
                  </div>
                  <div className="flex-1 min-w-0 bg-muted/30 border border-border/50 rounded-lg p-2.5 flex items-center justify-between group hover:bg-muted/50 transition-colors cursor-default">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-medium text-muted-foreground">{item.time}</span>
                        <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${typeColors[item.type]}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{item.task}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{item.duration}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
