import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, FileText, ChevronRight, Sparkles } from 'lucide-react';
import type { HistoryEntry } from '@/lib/promptEngine';
import { TECHNIQUE_CONFIGS } from '@/lib/promptEngine';

interface HistorySidebarProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.substring(0, max) + '...';
}

export default function HistorySidebar({
  history,
  onSelect,
  onClear,
  isOpen,
  onToggle,
}: HistorySidebarProps) {
  return (
    <>
      {/* Toggle button (visible when collapsed) */}
      <AnimatePresence>
        {!isOpen && history.length > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onToggle}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 w-8 h-24 bg-[#0F0E14] border border-r-0 border-[#252430] rounded-l-xl flex items-center justify-center text-[#6D6A80] hover:text-[#9C99AD] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#8B5CF6] rounded-full flex items-center justify-center text-[10px] text-white font-medium">
              {history.length}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={onToggle}
            />

            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[300px] bg-[#0F0E14] border-l border-[#252430] flex flex-col"
            >
              {/* Header */}
              <div className="h-14 flex items-center justify-between px-4 border-b border-[#252430] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-[14px] font-medium text-[#F0EEF5]">History</span>
                  <span className="text-[11px] text-[#6D6A80] bg-[#16151D] px-1.5 py-0.5 rounded">
                    {history.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {history.length > 0 && (
                    <button
                      onClick={onClear}
                      title="Clear history"
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[#6D6A80] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={onToggle}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[#6D6A80] hover:text-[#F0EEF5] hover:bg-[#1E1D26] transition-all"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-12 h-12 rounded-xl bg-[#16151D] flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-[#3A3852]" />
                    </div>
                    <p className="text-[13px] text-[#6D6A80]">
                      Your prompt history will appear here
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    <AnimatePresence>
                      {history.map((entry, index) => (
                        <motion.button
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.25, delay: index * 0.03 }}
                          onClick={() => onSelect(entry)}
                          className="w-full text-left px-4 py-3 hover:bg-[#1E1D26] transition-colors group"
                        >
                          {/* Original text preview */}
                          <div className="flex items-start gap-2.5">
                            <FileText className="w-4 h-4 text-[#6D6A80] flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] text-[#F0EEF5] truncate leading-relaxed">
                                {truncate(entry.original, 80)}
                              </p>

                              {/* Meta row */}
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] text-[#6D6A80]">
                                  {formatTime(entry.timestamp)}
                                </span>
                                <span className="text-[10px] text-[#6D6A80]">·</span>
                                <span className="text-[10px] font-mono text-[#22C55E]">
                                  {entry.qualityScore}/100
                                </span>
                                <span className="text-[10px] text-[#6D6A80]">·</span>
                                <div className="flex items-center gap-0.5">
                                  {entry.techniques.slice(0, 3).map((t) => (
                                    <span
                                      key={t}
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{
                                        backgroundColor: TECHNIQUE_CONFIGS[t]?.color || '#6D6A80',
                                      }}
                                      title={TECHNIQUE_CONFIGS[t]?.name}
                                    />
                                  ))}
                                  {entry.techniques.length > 3 && (
                                    <span className="text-[9px] text-[#6D6A80]">
                                      +{entry.techniques.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
