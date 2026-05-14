import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Download } from 'lucide-react'
import KPICard from '@/components/analytics/KPICard'
import EffectivenessChart from '@/components/analytics/EffectivenessChart'
import TechniqueRadar from '@/components/analytics/TechniqueRadar'
import TechniquePerformanceChart from '@/components/analytics/TechniquePerformance'
import FeedbackTable from '@/components/analytics/FeedbackTable'
import ImprovementTimeline from '@/components/analytics/ImprovementTimeline'
import AIInsights from '@/components/analytics/AIInsights'
import {
  kpiData,
  sparklineData,
  getMetricsForRange,
  type DateRange,
  type FeedbackEntry,
} from '@/lib/analyticsData'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30')
  const [sortField, setSortField] = useState<keyof FeedbackEntry>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const metrics = useMemo(() => getMetricsForRange(dateRange), [dateRange])

  const handleSort = (field: keyof FeedbackEntry) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  return (
    <div className="min-h-0 pb-8">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
            <BarChart3 className="w-[18px] h-[18px] text-[#22C55E]" />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-[#F0EEF5] font-display leading-tight">
              Analytics
            </h1>
            <p className="text-[12px] text-[#6D6A80]">
              Track prompt effectiveness and system improvement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="h-9 pl-3 pr-8 rounded-lg bg-[#16151D] border border-[#3A3852] text-[13px] text-[#F0EEF5] focus:outline-none focus:border-[#8B5CF6] cursor-pointer appearance-none transition-colors duration-200 hover:bg-[#1E1D26]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <svg
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D6A80] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Export Button */}
          <button className="h-9 px-4 rounded-lg text-[13px] font-medium text-[#F0EEF5] bg-[#16151D] border border-[#3A3852] hover:bg-[#1E1D26] hover:border-[#8B5CF6] transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            suffix={kpi.suffix}
            trend={kpi.trend}
            trendLabel={kpi.trendLabel}
            icon={kpi.icon}
            iconColor={kpi.iconColor}
            sparklineData={sparklineData[kpi.label] || []}
            index={index}
          />
        ))}
      </div>

      {/* Effectiveness Chart - Full Width */}
      <div className="mb-6">
        <EffectivenessChart data={metrics} />
      </div>

      {/* Technique Radar + Performance - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <TechniqueRadar />
        <TechniquePerformanceChart />
      </div>

      {/* Feedback Table */}
      <div className="mb-6">
        <FeedbackTable
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      {/* Improvement Timeline */}
      <div className="mb-6">
        <ImprovementTimeline />
      </div>

      {/* AI Insights */}
      <div>
        <AIInsights />
      </div>
    </div>
  )
}
