import type { FC } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { techniquePerformanceData } from '@/lib/analyticsData'

const CustomTooltip: FC<{
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      name: string
      usagePercent: number
      color: string
    }
  }>
}> = ({ active, payload }) => {
  if (!active || !payload?.length) return null

  const entry = payload[0]
  const data = entry.payload

  return (
    <div className="bg-[#2A2933] border border-[#3A3852] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[12px] font-medium text-[#F0EEF5] mb-1">{data.name}</p>
      <p className="text-[11px] text-[#9C99AD]">
        Score:{' '}
        <span className="text-[#F0EEF5] font-mono">{entry.value}%</span>
      </p>
      <p className="text-[11px] text-[#9C99AD]">
        Usage:{' '}
        <span className="text-[#F0EEF5] font-mono">{data.usagePercent}%</span>
      </p>
    </div>
  )
}

const TechniquePerformanceChart: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[18px] font-semibold text-[#F0EEF5] font-display">
          Technique Usage
        </h3>
        <p className="text-[13px] text-[#6D6A80] mt-0.5">
          Frequency of each technique
        </p>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={techniquePerformanceData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#252430"
              strokeOpacity={0.3}
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#6D6A80', fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              axisLine={{ stroke: '#252430' }}
              tickFormatter={(value: number) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: '#9C99AD', fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={{ stroke: '#252430' }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="usagePercent" radius={[0, 4, 4, 0]} barSize={16}>
              {techniquePerformanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default TechniquePerformanceChart
