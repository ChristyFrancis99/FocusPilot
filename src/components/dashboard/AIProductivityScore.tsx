import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles } from 'lucide-react';

interface AIProductivityScoreProps {
  finalScore: number;
}

export default function AIProductivityScore({ finalScore }: AIProductivityScoreProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setScore(current);
      if (current >= finalScore) {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [finalScore]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-5 relative overflow-hidden group cursor-default shadow-lg shadow-primary/10 border-primary/30"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
      
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Productivity Score</span>
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
        </div>
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-primary transition-all duration-300 group-hover:scale-110">
          <Activity className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <div className="flex items-end gap-3 relative z-10 mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-foreground tracking-tighter">{score}</span>
          <span className="text-lg font-bold text-muted-foreground">/100</span>
        </div>
        
        <div className="flex-1 ml-2 mb-2 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${finalScore}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 relative z-10">
        <span className="text-success font-medium">+6% vs last week</span> based on intelligent analysis.
      </p>
    </motion.div>
  );
}
