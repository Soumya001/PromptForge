import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Sparkles,
  Layers,
  Globe,
} from 'lucide-react';
import { AVAILABLE_MODELS } from '@/hooks/useSettings';
import type { ModelConfig } from '@/hooks/useSettings';

interface ModelSelectionProps {
  selectedModelId: string;
  temperature: number;
  maxTokens: number;
  onUpdateModel: (updates: {
    selectedModelId?: string;
    temperature?: number;
    maxTokens?: number;
  }) => void;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const providerColors: Record<string, string> = {
  OpenAI: '#8B5CF6',
  Anthropic: '#F472B6',
  Google: '#06B6D4',
  Custom: '#22C55E',
};

const providerIcons: Record<string, ReactNode> = {
  OpenAI: <Zap className="w-3.5 h-3.5" />,
  Anthropic: <Sparkles className="w-3.5 h-3.5" />,
  Google: <Globe className="w-3.5 h-3.5" />,
  Custom: <Layers className="w-3.5 h-3.5" />,
};

function ModelCard({
  model,
  isSelected,
  onSelect,
  index,
}: {
  model: ModelConfig;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const color = providerColors[model.provider] || '#8B5CF6';

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:translate-y-[-2px] ${
        isSelected
          ? 'border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.15)]'
          : 'border-[#252430] hover:border-[#3A3852]'
      }`}
      style={{ background: '#0F0E14' }}
    >
      {/* Radio indicator */}
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
            isSelected ? 'border-[#8B5CF6]' : 'border-[#3A3852]'
          }`}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
              className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"
            />
          )}
        </div>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
          style={{
            background: `${color}15`,
            color: color,
          }}
        >
          {providerIcons[model.provider]}
          {model.provider}
        </div>
      </div>

      {/* Model Name */}
      <h4 className="text-[14px] font-display font-semibold text-[#F0EEF5] mb-1">
        {model.name}
      </h4>

      {/* Capability Tags */}
      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
        {model.capabilities.map(cap => (
          <span
            key={cap}
            className="px-2 py-0.5 rounded-md text-[11px] bg-[#16151D] text-[#9C99AD] border border-[#252430]"
          >
            {cap}
          </span>
        ))}
      </div>

      {/* Speed Indicator */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-[#6D6A80]">Speed</span>
          <span className="text-[11px] font-mono text-[#9C99AD]">{model.speed}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#16151D] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${model.speed}%` }}
            transition={{ duration: 0.8, delay: index * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{
              background:
                model.speed > 90
                  ? '#22C55E'
                  : model.speed > 80
                    ? '#06B6D4'
                    : '#F59E0B',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ModelSelection({
  selectedModelId,
  temperature,
  maxTokens,
  onUpdateModel,
}: ModelSelectionProps) {
  return (
    <div>
      {/* Model Grid */}
      <div className="mb-6">
        <h3 className="text-[14px] font-display font-semibold text-[#F0EEF5] mb-1">
          Default Model
        </h3>
        <p className="text-[13px] text-[#6D6A80] mb-4">
          Choose the model used for prompt enhancement
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AVAILABLE_MODELS.map((model, index) => (
            <ModelCard
              key={model.id}
              model={model}
              isSelected={selectedModelId === model.id}
              onSelect={() => onUpdateModel({ selectedModelId: model.id })}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Model Parameters */}
      <div className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6 space-y-6">
        {/* Temperature Slider */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-[14px] font-display font-semibold text-[#F0EEF5]">
              Temperature
            </label>
            <span className="text-[13px] font-mono text-[#8B5CF6]">{temperature.toFixed(1)}</span>
          </div>
          <p className="text-[12px] text-[#6D6A80] mb-3">
            Higher = more creative, Lower = more deterministic
          </p>
          <div className="relative pt-1">
            <input
              type="range"
              min={0}
              max={20}
              step={1}
              value={Math.round(temperature * 10)}
              onChange={e =>
                onUpdateModel({ temperature: parseInt(e.target.value) / 10 })
              }
              className="w-full h-2 bg-[#16151D] rounded-full appearance-none cursor-pointer accent-[#8B5CF6] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B5CF6] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(139,92,246,0.4)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:active:scale-110"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #06B6D4 ${(temperature / 2) * 100}%, #16151D ${(temperature / 2) * 100}%, #16151D 100%)`,
              }}
            />
            <div className="flex justify-between mt-1 text-[11px] text-[#6D6A80]">
              <span>Precise (0.0)</span>
              <span>Balanced (1.0)</span>
              <span>Creative (2.0)</span>
            </div>
          </div>
        </motion.div>

        {/* Max Tokens Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-[14px] font-display font-semibold text-[#F0EEF5]">
              Max Tokens
            </label>
          </div>
          <p className="text-[12px] text-[#6D6A80] mb-3">
            Maximum tokens for enhanced prompt output
          </p>
          <input
            type="number"
            value={maxTokens}
            onChange={e =>
              onUpdateModel({
                maxTokens: Math.min(8192, Math.max(256, parseInt(e.target.value) || 0)),
              })
            }
            min={256}
            max={8192}
            className="w-[140px] h-10 bg-[#16151D] border border-[#252430] rounded-lg px-3 text-[13px] font-mono text-[#F0EEF5] outline-none transition-all duration-200 focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/15"
          />
          <div className="flex gap-2 mt-3">
            {[1024, 2048, 4096, 8192].map(val => (
              <button
                key={val}
                onClick={() => onUpdateModel({ maxTokens: val })}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-mono border transition-all duration-200 ${
                  maxTokens === val
                    ? 'border-[#8B5CF6] text-[#8B5CF6] bg-[#8B5CF6]/10'
                    : 'border-[#252430] text-[#6D6A80] hover:border-[#3A3852] hover:text-[#9C99AD]'
                }`}
                type="button"
              >
                {val.toLocaleString()}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
