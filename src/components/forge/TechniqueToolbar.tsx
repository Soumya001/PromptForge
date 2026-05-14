import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Copy, CheckCheck } from 'lucide-react';
import type { Technique } from '@/lib/promptEngine';
import { TECHNIQUE_CONFIGS, ALL_TECHNIQUES } from '@/lib/promptEngine';
import type { ForgeStatus } from '@/hooks/usePromptEngine';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface TechniqueToolbarProps {
  selectedTechniques: Technique[];
  toggleTechnique: (technique: Technique) => void;
  autoMode: boolean;
  setAutoMode: (value: boolean) => void;
  status: ForgeStatus;
  onEnhance: () => void;
  hasOutput: boolean;
  onCopy: () => void;
  copied: boolean;
}

export default function TechniqueToolbar({
  selectedTechniques,
  toggleTechnique,
  autoMode,
  setAutoMode,
  status,
  onEnhance,
  hasOutput,
  onCopy,
  copied,
}: TechniqueToolbarProps) {
  const isEnhancing = status === 'enhancing';

  const handleAutoToggle = useCallback(
    (checked: boolean) => {
      setAutoMode(checked);
    },
    [setAutoMode]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
      className="h-[52px] bg-[#0F0E14] border-b border-[#252430] px-6 flex items-center justify-between flex-shrink-0"
    >
      {/* Left: Technique chips */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <span className="text-[13px] text-[#6D6A80] flex-shrink-0">Techniques:</span>
        <div className="flex items-center gap-2">
          {ALL_TECHNIQUES.map((technique, index) => {
            const config = TECHNIQUE_CONFIGS[technique];
            const isActive = selectedTechniques.includes(technique);
            void autoMode;

            return (
              <motion.button
                key={technique}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.25,
                  delay: 0.15 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                onClick={() => !autoMode && toggleTechnique(technique)}
                disabled={autoMode}
                title={config.description}
                className={cn(
                  'h-8 px-3.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-all duration-200 border flex-shrink-0',
                  isActive && !autoMode
                    ? 'text-white'
                    : autoMode
                      ? 'opacity-70 cursor-not-allowed'
                      : 'text-[#9C99AD] hover:text-[#F0EEF5]'
                )}
                style={
                  isActive && !autoMode
                    ? {
                        backgroundColor: config.bgColor,
                        borderColor: config.borderColor,
                        color: config.textColor,
                      }
                    : {
                        backgroundColor: '#16151D',
                        borderColor: '#252430',
                      }
                }
              >
                {isActive && !autoMode && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: config.textColor }} />
                  </motion.span>
                )}
                {autoMode && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: config.color }}
                  />
                )}
                <span>{config.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Auto toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="auto-mode"
            checked={autoMode}
            onCheckedChange={handleAutoToggle}
            className="data-[state=checked]:bg-[#8B5CF6]"
          />
          <label
            htmlFor="auto-mode"
            className="text-[12px] text-[#9C99AD] cursor-pointer select-none"
          >
            Auto
          </label>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[#252430]" />

        {/* Copy button */}
        <button
          onClick={onCopy}
          disabled={!hasOutput}
          title="Copy enhanced prompt"
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200',
            hasOutput
              ? 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
              : 'text-[#3A3852] cursor-not-allowed'
          )}
        >
          {copied ? (
            <CheckCheck className="w-4 h-4 text-[#22C55E]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        {/* Enhance button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnhance}
          disabled={isEnhancing}
          className={cn(
            'h-9 px-4 rounded-lg text-[13px] font-semibold text-[#08070B] flex items-center gap-2 transition-all duration-200',
            isEnhancing
              ? 'opacity-70 cursor-wait'
              : 'hover:brightness-110'
          )}
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
          }}
        >
          <motion.span
            animate={isEnhancing ? { rotate: 360 } : { rotate: 0 }}
            transition={isEnhancing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          >
            <Zap className="w-4 h-4" />
          </motion.span>
          <span>{isEnhancing ? 'Enhancing...' : 'Enhance Prompt'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
