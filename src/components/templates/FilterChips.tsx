import type { FC } from 'react'
import { motion } from 'framer-motion'
import { techniqueConfig, complexityConfig } from '@/lib/templatesData'
import type { Technique, Complexity } from '@/lib/templatesData'

interface FilterChipsProps {
  selectedTechniques: Technique[]
  onToggleTechnique: (t: Technique) => void
  selectedComplexity: Complexity | 'all'
  onSetComplexity: (c: Complexity | 'all') => void
}

const techniques = Object.keys(techniqueConfig) as Technique[]
const complexities = Object.keys(complexityConfig) as Complexity[]

const FilterChips: FC<FilterChipsProps> = ({
  selectedTechniques,
  onToggleTechnique,
  selectedComplexity,
  onSetComplexity,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap items-center gap-2"
    >
      {/* Technique filter label */}
      <span className="text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium mr-1">
        Techniques
      </span>

      {techniques.map((t) => {
        const config = techniqueConfig[t]
        const isActive = selectedTechniques.includes(t)
        return (
          <button
            key={t}
            onClick={() => onToggleTechnique(t)}
            className="relative h-7 px-3 rounded-md text-xs font-medium border transition-all duration-200"
            style={
              isActive
                ? {
                    backgroundColor: config.bg,
                    color: config.color,
                    borderColor: config.border,
                  }
                : {
                    backgroundColor: 'transparent',
                    color: '#6D6A80',
                    borderColor: '#252430',
                  }
            }
          >
            {config.label}
          </button>
        )
      })}

      {/* Divider */}
      <div className="w-px h-5 bg-[#252430] mx-1" />

      {/* Complexity filter label */}
      <span className="text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium mr-1">
        Level
      </span>

      <button
        onClick={() => onSetComplexity('all')}
        className="h-7 px-3 rounded-md text-xs font-medium border transition-all duration-200"
        style={
          selectedComplexity === 'all'
            ? {
                backgroundColor: '#2A2933',
                color: '#F0EEF5',
                borderColor: '#3A3852',
              }
            : {
                backgroundColor: 'transparent',
                color: '#6D6A80',
                borderColor: '#252430',
              }
        }
      >
        All
      </button>

      {complexities.map((c) => {
        const config = complexityConfig[c]
        const isActive = selectedComplexity === c
        return (
          <button
            key={c}
            onClick={() => onSetComplexity(c)}
            className="h-7 px-3 rounded-md text-xs font-medium border transition-all duration-200 capitalize"
            style={
              isActive
                ? {
                    backgroundColor: config.bg,
                    color: config.color,
                    borderColor: `${config.color}33`,
                  }
                : {
                    backgroundColor: 'transparent',
                    color: '#6D6A80',
                    borderColor: '#252430',
                  }
            }
          >
            {config.label}
          </button>
        )
      })}
    </motion.div>
  )
}

export default FilterChips
