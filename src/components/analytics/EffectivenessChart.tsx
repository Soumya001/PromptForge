import type { FC } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DailyMetrics } from '@/lib/analyticsData'

interface EffectivenessChartProps {
  data: DailyMetrics[]
}

const CustomTooltip: FC<{
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: string
}> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-[#2A2933] border border-[#3A3852] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[11px] font-mono text-[#6D6A80] mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-[12px]">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[#9C99AD]">{entry.name}:</span>
          <span className="text-[#F0EEF5] font-mono font-medium">
            {entry.value}
            {entry.name === 'Effectiveness' ? '%' : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

const EffectivenessChart: FC<EffectivenessChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-[#F0EEF5] font-display">
            Prompt Effectiveness Over Time
          </h3>
          <p className="text-[13px] text-[#6D6A80] mt-0.5">
            Average effectiveness score per day
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            <span className="text-[12px] text-[#9C99AD]">Effectiveness</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#06B6D4]" />
            <span className="text-[12px] text-[#9C99AD]">Tech. Diversity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="text-[12px] text-[#9C99AD]">Feedback</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="effectivenessGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#252430"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#6D6A80', fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              axisLine={{ stroke: '#252430' }}
              tickFormatter={(value: string) => {
                const d = new Date(value)
                return `${d.getMonth() + 1}/${d.getDate()}`
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#6D6A80', fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              axisLine={{ stroke: '#252430' }}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="effectiveness"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#effectivenessGradient)"
              name="Effectiveness"
              dot={false}
              activeDot={{ r: 4, stroke: '#8B5CF6', strokeWidth: 2, fill: '#0F0E14' }}
            />
            <Area
              type="monotone"
              dataKey="techniqueDiversity"
              stroke="#06B6D4"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
              name="Tech. Diversity"
              dot={false}
              activeDot={{ r: 4, stroke: '#06B6D4', strokeWidth: 2, fill: '#0F0E14' }}
            />
            <Area
              type="monotone"
              dataKey="feedbackScore"
              stroke="#F59E0B"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              fill="none"
              name="Feedback"
              dot={false}
              activeDot={{ r: 3, stroke: '#F59E0B', strokeWidth: 2, fill: '#0F0E14' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default EffectivenessChart
