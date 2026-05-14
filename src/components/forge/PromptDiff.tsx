import { motion } from 'framer-motion';
import { generateDiff } from '@/lib/promptEngine';

interface PromptDiffProps {
  original: string;
  enhanced: string;
}

export default function PromptDiff({ original, enhanced }: PromptDiffProps) {
  const diff = generateDiff(original, enhanced);

  return (
    <div className="space-y-1">
      {diff.map((segment, index) => {
        if (!segment.text.trim()) {
          return <div key={index} className="h-1" />;
        }

        if (segment.type === 'added') {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: Math.min(index * 0.02, 1),
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="pl-3 border-l-2 border-[#22C55E] bg-[#22C55E]/5 rounded-r"
            >
              <pre className="text-[12px] font-mono text-[#4ADE80] leading-relaxed whitespace-pre-wrap break-words py-0.5">
                {segment.text}
              </pre>
            </motion.div>
          );
        }

        if (segment.type === 'removed') {
          return (
            <div
              key={index}
              className="pl-3 border-l-2 border-[#EF4444] bg-[#EF4444]/5 rounded-r"
            >
              <pre className="text-[12px] font-mono text-[#EF4444] leading-relaxed whitespace-pre-wrap break-words line-through opacity-50 py-0.5">
                {segment.text}
              </pre>
            </div>
          );
        }

        return (
          <pre
            key={index}
            className="text-[12px] font-mono text-[#9C99AD] leading-relaxed whitespace-pre-wrap break-words py-0.5"
          >
            {segment.text}
          </pre>
        );
      })}
    </div>
  );
}
