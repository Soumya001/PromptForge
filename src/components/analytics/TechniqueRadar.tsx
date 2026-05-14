import type { FC } from 'react'
import { motion } from 'framer-motion'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { radarData } from '@/lib/analyticsData'

const TechniqueRadar: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[18px] font-semibold text-[#F0EEF5] font-display">
          Technique Effectiveness
        </h3>
        <p className="text-[13px] text-[#6D6A80] mt-0.5">
          How each technique performs across dimensions
        </p>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid
              stroke="#252430"
              strokeOpacity={0.5}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: '#9C99AD', fontFamily: 'Inter' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#6D6A80', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
            />
            <Radar
              name="This Period"
              dataKey="current"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="#8B5CF6"
              fillOpacity={0.2}
            />
            <Radar
              name="Last Period"
              dataKey="previous"
              stroke="#6D6A80"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="#6D6A80"
              fillOpacity={0.05}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-[12px] text-[#9C99AD]">{value}</span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default TechniqueRadar
