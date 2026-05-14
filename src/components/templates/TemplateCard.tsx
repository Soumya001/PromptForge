import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowRight, Flame } from 'lucide-react'
import { techniqueConfig } from '@/lib/templatesData'
import type { Template } from '@/lib/templatesData'

interface TemplateCardProps {
  template: Template
  index: number
  onToggleFavorite: (id: string) => void
  onPreview: (template: Template) => void
}

const categoryColors: Record<string, string> = {
  Coding: '#06B6D4',
  Writing: '#8B5CF6',
  Analysis: '#22C55E',
  Creative: '#F472B6',
  Business: '#F59E0B',
  Education: '#EC4899',
}

const TemplateCard: FC<TemplateCardProps> = ({
  template,
  index,
  onToggleFavorite,
  onPreview,
}) => {
  const catColor = categoryColors[template.category] || '#8B5CF6'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      layout="position"
      onClick={() => onPreview(template)}
      className="group cursor-pointer bg-[#0F0E14] rounded-xl border border-[#252430] overflow-hidden hover:border-[#3A3852] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-250"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header area with category color */}
      <div
        className="h-[120px] relative flex items-end p-4"
        style={{
          background: `linear-gradient(135deg, ${catColor}15 0%, ${catColor}08 50%, transparent 100%)`,
        }}
      >
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 h-6 px-2.5 rounded-md flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.04em]"
          style={{
            backgroundColor: `${catColor}18`,
            color: catColor,
            border: `1px solid ${catColor}30`,
          }}
        >
          {template.category}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(template.id)
          }}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center bg-[#08070B]/50 backdrop-blur-sm border border-[#252430] hover:bg-[#1E1D26] transition-all duration-200"
        >
          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors duration-200 ${
                template.isFavorite
                  ? 'text-[#F59E0B] fill-[#F59E0B]'
                  : 'text-[#6D6A80] group-hover:text-[#9C99AD]'
              }`}
            />
          </motion.div>
        </button>

        {/* Complexity badge at bottom */}
        <div className="flex items-center gap-2">
          {template.techniques.slice(0, 3).map((t) => {
            const tc = techniqueConfig[t]
            return (
              <span
                key={t}
                className="h-5 px-1.5 rounded text-[10px] font-medium leading-5"
                style={{
                  backgroundColor: tc.bg,
                  color: tc.color,
                }}
              >
                {tc.label}
              </span>
            )
          })}
          {template.techniques.length > 3 && (
            <span className="h-5 px-1.5 rounded text-[10px] font-medium leading-5 text-[#6D6A80] bg-[#16151D]">
              +{template.techniques.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-[15px] font-semibold text-[#F0EEF5] leading-snug line-clamp-1 font-display">
            {template.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#9C99AD] leading-relaxed line-clamp-2 mb-3">
          {template.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#252430]">
          <div className="flex items-center gap-1 text-[#6D6A80]">
            <Flame className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">
              {template.usageCount.toLocaleString()}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
            className="flex items-center gap-1 text-[#8B5CF6] text-xs font-medium hover:text-[#A78BFA] transition-colors duration-200 group/btn"
          >
            Use Template
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TemplateCard
