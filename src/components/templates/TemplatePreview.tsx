import type { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowRight,
  Bookmark,
  Share2,
  Flag,
  Copy,
  Check,
} from 'lucide-react'
import { useState, useCallback } from 'react'
import { techniqueConfig, complexityConfig } from '@/lib/templatesData'
import type { Template } from '@/lib/templatesData'

interface TemplatePreviewProps {
  template: Template | null
  onClose: () => void
  onToggleFavorite: (id: string) => void
}

const categoryColors: Record<string, string> = {
  Coding: '#06B6D4',
  Writing: '#8B5CF6',
  Analysis: '#22C55E',
  Creative: '#F472B6',
  Business: '#F59E0B',
  Education: '#EC4899',
}

const TemplatePreview: FC<TemplatePreviewProps> = ({
  template,
  onClose,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    if (template) {
      navigator.clipboard.writeText(template.content).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [template])

  return (
    <AnimatePresence>
      {template && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08070B]/80 backdrop-blur-[4px] z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#0F0E14] border-l border-[#252430] z-[201] overflow-y-auto"
            style={{
              boxShadow: '-16px 0 48px rgba(0,0,0,0.3)',
            }}
          >
            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="flex-1"
                >
                  {/* Category badge */}
                  <div
                    className="inline-flex items-center h-6 px-2.5 rounded-md text-[11px] font-medium uppercase tracking-[0.04em] mb-3"
                    style={{
                      backgroundColor: `${categoryColors[template.category]}18`,
                      color: categoryColors[template.category],
                      border: `1px solid ${categoryColors[template.category]}30`,
                    }}
                  >
                    {template.category}
                  </div>

                  <h2 className="text-xl font-semibold text-[#F0EEF5] font-display leading-tight mb-2">
                    {template.title}
                  </h2>

                  <p className="text-[13px] text-[#6D6A80]">
                    Created by @promptforge · {template.usageCount.toLocaleString()} uses
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200 ml-4 flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-[14px] text-[#9C99AD] leading-relaxed mb-6"
              >
                {template.description}
              </motion.p>

              {/* Complexity */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mb-6"
              >
                <span className="text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium block mb-2">
                  Complexity
                </span>
                <span
                  className="inline-flex h-6 px-2.5 rounded-md text-[11px] font-medium items-center"
                  style={{
                    backgroundColor: complexityConfig[template.complexity].bg,
                    color: complexityConfig[template.complexity].color,
                  }}
                >
                  {complexityConfig[template.complexity].label}
                </span>
              </motion.div>

              {/* Techniques */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mb-6"
              >
                <span className="text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium block mb-2">
                  Techniques Applied
                </span>
                <div className="flex flex-wrap gap-2">
                  {template.techniques.map((t) => {
                    const tc = techniqueConfig[t]
                    return (
                      <span
                        key={t}
                        className="h-7 px-3 rounded-md text-xs font-medium flex items-center border"
                        style={{
                          backgroundColor: tc.bg,
                          color: tc.color,
                          borderColor: tc.border,
                        }}
                      >
                        {tc.label}
                      </span>
                    )
                  })}
                </div>
              </motion.div>

              {/* Tags */}
              {template.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.3 }}
                  className="mb-6"
                >
                  <span className="text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium block mb-2">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="h-6 px-2 rounded text-[11px] text-[#9C99AD] bg-[#16151D] border border-[#252430] flex items-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Prompt Preview */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-[0.06em] text-[#6D6A80] font-medium">
                    Prompt Preview
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11px] font-medium text-[#9C99AD] bg-[#16151D] border border-[#252430] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="text-[#22C55E]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#08070B] border border-[#252430] rounded-xl p-4 max-h-[400px] overflow-y-auto">
                  <pre className="text-[12px] font-mono text-[#9C99AD] leading-relaxed whitespace-pre-wrap">
                    {template.content}
                  </pre>
                </div>
              </motion.div>

              {/* Use Template Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-4"
              >
                <a
                  href="#/forge"
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-lg font-semibold text-sm text-[#08070B] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background:
                      'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #F472B6 100%)',
                  }}
                >
                  Use This Template
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Footer Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-2 pt-4 border-t border-[#252430]"
              >
                <button
                  onClick={() => onToggleFavorite(template.id)}
                  className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg text-[13px] text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200"
                >
                  <Bookmark
                    className={`w-4 h-4 ${template.isFavorite ? 'fill-[#F59E0B] text-[#F59E0B]' : ''}`}
                  />
                  {template.isFavorite ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg text-[13px] text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg text-[13px] text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TemplatePreview
