import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Type, Code2, Sparkles, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { CODE_FONTS } from '@/hooks/useSettings';

interface AppearanceProps {
  theme: 'dark' | 'light' | 'system';
  fontSize: number;
  codeFont: string;
  animationLevel: 'full' | 'reduced' | 'none';
  onUpdateAppearance: (updates: {
    theme?: 'dark' | 'light' | 'system';
    fontSize?: number;
    codeFont?: string;
    animationLevel?: 'full' | 'reduced' | 'none';
  }) => void;
}

const themeOptions = [
  { value: 'dark' as const, label: 'Dark', icon: Moon },
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'system' as const, label: 'System', icon: Monitor },
];

const animationOptions = [
  { value: 'full' as const, label: 'Full', description: 'All animations' },
  { value: 'reduced' as const, label: 'Reduced', description: 'Subtle only' },
  { value: 'none' as const, label: 'None', description: 'No animations' },
];

const fontSizeLabels: Record<number, string> = {
  0: 'Small',
  1: 'Medium',
  2: 'Large',
};

export default function Appearance({
  theme,
  fontSize,
  codeFont,
  animationLevel,
  onUpdateAppearance,
}: AppearanceProps) {
  const handleReset = () => {
    onUpdateAppearance({
      theme: 'dark',
      fontSize: 1,
      codeFont: 'JetBrains Mono',
      animationLevel: 'full',
    });
    toast.success('Appearance settings reset to defaults');
  };

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <Moon className="w-3.5 h-3.5" />
          Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => onUpdateAppearance({ theme: option.value })}
                className={`relative flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all duration-200 ${
                  theme === option.value
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]'
                    : 'border-[#252430] bg-[#0F0E14] hover:border-[#3A3852]'
                }`}
                type="button"
              >
                <Icon
                  className={`w-5 h-5 ${
                    theme === option.value ? 'text-[#8B5CF6]' : 'text-[#6D6A80]'
                  }`}
                />
                <span
                  className={`text-[13px] font-medium ${
                    theme === option.value ? 'text-[#F0EEF5]' : 'text-[#9C99AD]'
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Font Size Slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <Type className="w-3.5 h-3.5" />
          Interface Font Size
        </label>
        <div className="bg-[#0F0E14] border border-[#252430] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] text-[#6D6A80]">Small</span>
            <span className="text-[13px] font-medium text-[#8B5CF6]">
              {fontSizeLabels[fontSize] || 'Medium'}
            </span>
            <span className="text-[12px] text-[#6D6A80]">Large</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={fontSize}
            onChange={e => onUpdateAppearance({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-[#16151D] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B5CF6] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(139,92,246,0.4)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
          />
          <div className="flex justify-between mt-2">
            {[0, 1, 2].map(val => (
              <button
                key={val}
                onClick={() => onUpdateAppearance({ fontSize: val })}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  fontSize === val ? 'bg-[#8B5CF6] scale-125' : 'bg-[#252430] hover:bg-[#3A3852]'
                }`}
                type="button"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Code Font Select */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <Code2 className="w-3.5 h-3.5" />
          Code Font
        </label>
        <div className="grid grid-cols-3 gap-2">
          {CODE_FONTS.map(font => (
            <button
              key={font.value}
              onClick={() => onUpdateAppearance({ codeFont: font.value })}
              className={`px-4 py-3 rounded-xl border-2 text-[13px] font-mono transition-all duration-200 ${
                codeFont === font.value
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-[#F0EEF5]'
                  : 'border-[#252430] bg-[#0F0E14] text-[#9C99AD] hover:border-[#3A3852]'
              }`}
              type="button"
            >
              {font.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Animation Level */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Animation Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {animationOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onUpdateAppearance({ animationLevel: option.value })}
              className={`flex flex-col items-center gap-1 py-4 px-3 rounded-xl border-2 transition-all duration-200 ${
                animationLevel === option.value
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]'
                  : 'border-[#252430] bg-[#0F0E14] hover:border-[#3A3852]'
              }`}
              type="button"
            >
              <span
                className={`text-[13px] font-medium ${
                  animationLevel === option.value ? 'text-[#F0EEF5]' : 'text-[#9C99AD]'
                }`}
              >
                {option.label}
              </span>
              <span
                className={`text-[11px] ${
                  animationLevel === option.value ? 'text-[#8B5CF6]' : 'text-[#6D6A80]'
                }`}
              >
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Reset Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#16151D] border border-[#252430] rounded-lg text-[13px] text-[#9C99AD] hover:text-[#F0EEF5] hover:border-[#3A3852] transition-all duration-200"
          type="button"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Appearance
        </button>
      </motion.div>
    </div>
  );
}
