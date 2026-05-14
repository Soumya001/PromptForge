import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Brain } from 'lucide-react'
import { aiInsights } from '@/lib/analyticsData'

const typeIconMap: Record<string, { icon: typeof Lightbulb; color: string }> = {
  positive: { icon: Lightbulb, color: '#22C55E' },
  warning: { icon: Lightbulb, color: '#F59E0B' },
  info: { icon: Lightbulb, color: '#06B6D4' },
}

const AIInsights: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <Brain className="w-5 h-5 text-[#8B5CF6]" />
        <div>
          <h3 className="text-[18px] font-semibold text-[#F0EEF5] font-display">
            AI Insights
          </h3>
          <p className="text-[13px] text-[#6D6A80]">
            Generated from your analytics data
          </p>
        </div>
      </div>

      {/* Insights list */}
      <div className="space-y-3">
        {aiInsights.map((insight, index) => {
          const config = typeIconMap[insight.type] || typeIconMap.info
          const Icon = config.icon

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 1 + index * 0.1,
              }}
              className="flex gap-3 bg-[#08070B] border border-[#252430] rounded-lg p-4"
              style={{
                borderLeftWidth: '3px',
                borderLeftColor: insight.color,
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon
                  className="w-4 h-4"
                  style={{ color: insight.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-medium text-[#F0EEF5] mb-1 leading-snug">
                  {insight.title}
                </h4>
                <p className="text-[12px] text-[#9C99AD] leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default AIInsights
