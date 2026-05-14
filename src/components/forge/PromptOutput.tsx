import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Download,
  Check,
  Bookmark,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  CheckCheck,
  Loader2,
} from 'lucide-react';
import type { EnhancementResult } from '@/lib/promptEngine';
import { TECHNIQUE_CONFIGS } from '@/lib/promptEngine';
import type { ForgeStatus } from '@/hooks/usePromptEngine';
import QualityScore from './QualityScore';
import PromptDiff from './PromptDiff';
import { cn } from '@/lib/utils';

interface PromptOutputProps {
  result: EnhancementResult | null;
  status: ForgeStatus;
  originalInput: string;
  copied: boolean;
  onCopy: () => void;
  feedbackGiven: boolean;
  onFeedback: (type: 'up' | 'down') => void;
}

export default function PromptOutput({
  result,
  status,
  originalInput,
  copied,
  onCopy,
  feedbackGiven,
  onFeedback,
}: PromptOutputProps) {
  const [showDiff, setShowDiff] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const isEnhancing = status === 'enhancing';
  const hasResult = result !== null && status === 'complete';

  const handleDownload = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result.enhancedPrompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced-prompt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result]);

  const handleBookmark = useCallback(() => {
    setBookmarked((prev) => !prev);
  }, []);

  // Parse the enhanced prompt to apply syntax highlighting
  const renderEnhancedPrompt = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();

      // Section headers like [ROLE], [TASK], etc.
      if (trimmed.match(/^\[ROLE\]|\[TASK\]|\[REASONING APPROACH\]|\[EXAMPLES\]|\[CONTEXT|OUTPUT FORMAT\]|\[SELF-OPTIMIZATION\]/)) {
        return (
          <div key={i} className="border-l-2 border-[#8B5CF6] pl-3 my-2">
            <span className="text-[#A78BFA] font-bold text-[12px] uppercase tracking-wider">
              {line}
            </span>
          </div>
        );
      }

      // Numbered list items (CoT steps)
      if (trimmed.match(/^\d+\./)) {
        return (
          <div key={i} className="pl-4">
            <span className="text-[#06B6D4] text-[12px]">{line}</span>
          </div>
        );
      }

      // Bullet points
      if (trimmed.match(/^[-•]/)) {
        return (
          <div key={i} className="pl-4">
            <span className="text-[#9C99AD] text-[12px]">
              <span className="text-[#06B6D4]">• </span>
              {line.replace(/^[-•]\s*/, '')}
            </span>
          </div>
        );
      }

      // Comments / notes
      if (trimmed.startsWith('**Note:**') || trimmed.startsWith('---')) {
        return (
          <div key={i} className="mt-3 pt-2 border-t border-[#252430]">
            <span className="text-[#6D6A80] italic text-[11px]">{line}</span>
          </div>
        );
      }

      // Code blocks
      if (trimmed.startsWith('```')) {
        return (
          <div key={i}>
            <span className="text-[#F59E0B] text-[12px]">{line}</span>
          </div>
        );
      }

      // Title line
      if (trimmed.startsWith('# ')) {
        return (
          <div key={i} className="mb-2">
            <span className="text-[#F0EEF5] font-bold text-[14px]">{line.replace('# ', '')}</span>
          </div>
        );
      }

      // Empty line
      if (!trimmed) {
        return <div key={i} className="h-1" />;
      }

      // Default
      return (
        <div key={i}>
          <span className="text-[#9C99AD] text-[12px] leading-relaxed">{line}</span>
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
      className="flex flex-col h-full bg-[#0F0E14] p-6"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <h2
            className="text-[16px] font-medium text-[#F0EEF5]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Enhanced Prompt
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {hasResult && (
            <span className="text-[11px] text-[#6D6A80]">
              {result.appliedTechniques.length} techniques applied
            </span>
          )}
          <button
            onClick={onCopy}
            disabled={!hasResult}
            title="Copy to clipboard"
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
              hasResult
                ? 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
                : 'text-[#3A3852] cursor-not-allowed'
            )}
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#22C55E]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={!hasResult}
            title="Download as .md"
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
              hasResult
                ? 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
                : 'text-[#3A3852] cursor-not-allowed'
            )}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 bg-[#08070B] border border-[#252430] rounded-xl p-4 overflow-y-auto min-h-0">
          {/* Empty state */}
          {!isEnhancing && !hasResult && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-12 h-12 text-[#3A3852] mb-4" />
              </motion.div>
              <p className="text-[14px] text-[#6D6A80] mb-1">
                Your enhanced prompt will appear here
              </p>
              <p className="text-[12px] text-[#3A3852]">
                Type a message and click Enhance
              </p>
            </div>
          )}

          {/* Loading state */}
          {isEnhancing && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 text-[#8B5CF6] animate-spin" />
                <span className="text-[14px] text-[#9C99AD]">Engineering your prompt...</span>
              </div>
              {/* Skeleton lines */}
              <div className="w-full max-w-md space-y-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="h-3 bg-[#16151D] rounded"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {hasResult && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              {showDiff ? (
                <PromptDiff original={originalInput} enhanced={result.enhancedPrompt} />
              ) : (
                <div className="font-mono leading-relaxed">
                  {renderEnhancedPrompt(result.enhancedPrompt)}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Applied techniques bar */}
        {hasResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4"
          >
            <div className="flex flex-wrap gap-1.5 mb-3">
              {result.appliedTechniques.map((technique, index) => {
                const config = TECHNIQUE_CONFIGS[technique];
                return (
                  <motion.span
                    key={technique}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.4 + index * 0.1,
                      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border"
                    style={{
                      backgroundColor: config.bgColor,
                      color: config.textColor,
                      borderColor: config.borderColor,
                    }}
                  >
                    <CheckCheck className="w-3 h-3" />
                    {config.name}
                  </motion.span>
                );
              })}
            </div>

            {/* Quality Score */}
            <QualityScore score={result.qualityScore} delay={0.5} />

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 mt-4 pt-3 border-t border-[#252430]"
            >
              <button
                onClick={onCopy}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] text-[#9C99AD] bg-[#16151D] border border-[#252430] hover:bg-[#1E1D26] hover:text-[#F0EEF5] hover:border-[#3A3852] transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Prompt'}
              </button>

              <button
                onClick={handleBookmark}
                className={cn(
                  'flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] transition-all',
                  bookmarked
                    ? 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30'
                    : 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
                )}
              >
                <Bookmark className={cn('w-3.5 h-3.5', bookmarked && 'fill-current')} />
                Save
              </button>

              <button
                onClick={() => setShowDiff(!showDiff)}
                className={cn(
                  'flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] transition-all',
                  showDiff
                    ? 'text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30'
                    : 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
                )}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {showDiff ? 'Hide Diff' : 'Show Diff'}
              </button>

              <div className="flex-1" />

              {/* Feedback */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onFeedback('up')}
                  disabled={feedbackGiven}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                    feedbackGiven
                      ? 'text-[#22C55E]'
                      : 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
                  )}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onFeedback('down')}
                  disabled={feedbackGiven}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                    feedbackGiven
                      ? 'text-[#EF4444]'
                      : 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
                  )}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
