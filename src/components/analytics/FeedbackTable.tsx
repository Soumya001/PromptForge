import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { feedbackEntries } from '@/lib/analyticsData'
import type { FeedbackEntry } from '@/lib/analyticsData'

interface FeedbackTableProps {
  sortField: keyof FeedbackEntry
  sortDirection: 'asc' | 'desc'
  onSort: (field: keyof FeedbackEntry) => void
}

const techniqueColors: Record<string, string> = {
  Role: '#F472B6',
  CoT: '#8B5CF6',
  Context: '#22C55E',
  Format: '#F59E0B',
  'Few-Shot': '#06B6D4',
  Meta: '#EC4899',
}

const FeedbackTable: FC<FeedbackTableProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  const sorted = [...feedbackEntries].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
    }
    return sortDirection === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })

  const SortIcon: FC<{ field: keyof FeedbackEntry }> = ({ field }) => {
    if (sortField !== field)
      return <span className="text-[#3A3852] ml-1 inline">↕</span>
    return (
      <span className="text-[#8B5CF6] ml-1 inline">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#22C55E]'
    if (score >= 70) return 'text-[#F59E0B]'
    return 'text-[#EF4444]'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[18px] font-semibold text-[#F0EEF5] font-display">
            Recent Feedback
          </h3>
          <p className="text-[13px] text-[#6D6A80] mt-0.5">
            Latest user ratings and comments
          </p>
        </div>
        <span className="text-[13px] text-[#8B5CF6] cursor-pointer hover:text-[#A78BFA] transition-colors">
          View All →
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-[#252430]">
              {(
                [
                  ['Rating', 'userRating'],
                  ['Original Prompt', 'originalPrompt'],
                  ['Techniques', 'techniquesUsed'],
                  ['Score', 'qualityScore'],
                  ['Date', 'dateLabel'],
                ] as [string, keyof FeedbackEntry][]
              ).map(([label, field]) => (
                <th
                  key={field}
                  onClick={() => onSort(field)}
                  className="text-left text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium py-3 px-2 cursor-pointer select-none hover:text-[#9C99AD] transition-colors"
                >
                  <span className="inline-flex items-center">
                    {label}
                    <SortIcon field={field} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry, index) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.8 + index * 0.05,
                }}
                className="border-b border-[#252430]/50 hover:bg-[#1E1D26]/50 transition-colors duration-150"
              >
                {/* Rating */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < entry.userRating
                            ? 'text-[#F59E0B] fill-[#F59E0B]'
                            : 'text-[#3A3852]'
                        }`}
                      />
                    ))}
                  </div>
                </td>

                {/* Prompt */}
                <td className="py-3 px-2 max-w-[300px]">
                  <p className="text-[12px] font-mono text-[#F0EEF5] truncate">
                    {entry.originalPrompt}
                  </p>
                </td>

                {/* Techniques */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1">
                    {entry.techniquesUsed.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: techniqueColors[t] || '#8B5CF6',
                        }}
                        title={t}
                      />
                    ))}
                    {entry.techniquesUsed.length > 4 && (
                      <span className="text-[10px] text-[#6D6A80] ml-0.5">
                        +{entry.techniquesUsed.length - 4}
                      </span>
                    )}
                  </div>
                </td>

                {/* Score */}
                <td className="py-3 px-2">
                  <span
                    className={`text-[12px] font-mono font-medium ${getScoreColor(entry.qualityScore)}`}
                  >
                    {entry.qualityScore}/100
                  </span>
                </td>

                {/* Date */}
                <td className="py-3 px-2">
                  <span className="text-[12px] font-mono text-[#6D6A80]">
                    {entry.dateLabel}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default FeedbackTable
