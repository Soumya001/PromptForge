import type { FC } from 'react'
import { motion } from 'framer-motion'
import { timelineEvents } from '@/lib/analyticsData'

const typeConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  milestone: { label: 'Milestone', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
  improvement: { label: 'Improvement', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  feature: { label: 'Feature', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
}

const ImprovementTimeline: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[18px] font-semibold text-[#F0EEF5] font-display">
          Improvement Timeline
        </h3>
        <p className="text-[13px] text-[#6D6A80] mt-0.5">
          Key milestones in PromptForge's learning journey
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-h-[420px] overflow-y-auto pr-2">
        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-[2px]"
          style={{
            background:
              'linear-gradient(to bottom, #8B5CF6, #06B6D4)',
          }}
        />

        <div className="space-y-4">
          {timelineEvents.map((event, index) => {
            const config = typeConfig[event.type] || typeConfig.feature
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="relative flex items-start gap-4 pl-1"
              >
                {/* Node dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: 1 + index * 0.15,
                  }}
                  className="w-[9px] h-[9px] rounded-full flex-shrink-0 mt-2 relative z-10"
                  style={{ backgroundColor: config.color }}
                />

                {/* Card */}
                <div className="flex-1 bg-[#08070B] border border-[#252430] rounded-lg p-3.5 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-mono text-[#6D6A80]">
                      {event.dateLabel}
                    </span>
                    <span
                      className="h-5 px-2 rounded text-[10px] font-medium uppercase tracking-[0.04em] flex items-center"
                      style={{
                        backgroundColor: config.bg,
                        color: config.color,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-medium text-[#F0EEF5] mb-1 leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-[12px] text-[#9C99AD] leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default ImprovementTimeline
