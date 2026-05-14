import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface QualityScoreProps {
  score: number;
  delay?: number;
}

function getScoreColor(score: number): string {
  if (score >= 90) return '#22C55E';
  if (score >= 75) return '#8B5CF6';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
}

function getScoreLabel(score: number): string {
  if (score >= 95) return 'Exceptional';
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Work';
}

export default function QualityScore({ score, delay = 0.5 }: QualityScoreProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);

  const scoreColor = getScoreColor(score);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(score);

      // Animate the number counting up
      const duration = 800;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setDisplayScore(Math.round(eased * score));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#9C99AD]">Quality Score</span>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-mono font-medium" style={{ color: scoreColor }}>
            {displayScore}/100
          </span>
          <span className="text-[11px] text-[#6D6A80]">({getScoreLabel(score)})</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#16151D] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${animatedWidth}%` }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      </div>

      {/* Tooltip hint */}
      <p className="text-[10px] text-[#6D6A80] leading-relaxed">
        Based on technique coverage, structure, and estimated effectiveness
      </p>
    </motion.div>
  );
}
