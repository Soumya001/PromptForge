import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText } from 'lucide-react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/promptEngine';
import type { Template } from '@/lib/promptEngine';
import { cn } from '@/lib/utils';

interface TemplatePickerProps {
  onSelect: (template: Template) => void;
  children: React.ReactNode;
}

export default function TemplatePicker({ onSelect, children }: TemplatePickerProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = useCallback(
    (template: Template) => {
      onSelect(template);
      setOpen(false);
    },
    [onSelect]
  );

  return (
    <div ref={containerRef} className="relative">
      <button onClick={() => setOpen(!open)}>{children}</button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute bottom-full left-0 mb-2 w-[360px] max-h-[480px] bg-[#0F0E14] border border-[#3A3852] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden z-[100]"
          >
            {/* Search */}
            <div className="p-3 border-b border-[#252430]">
              <div className="flex items-center gap-2 h-10 bg-[#16151D] border border-[#252430] rounded-lg px-3">
                <Search className="w-4 h-4 text-[#6D6A80] flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="flex-1 bg-transparent text-[13px] text-[#F0EEF5] placeholder-[#6D6A80] outline-none"
                />
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 p-2 border-b border-[#252430] overflow-x-auto">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all duration-200',
                    activeCategory === cat
                      ? 'bg-[#8B5CF6]/15 text-[#A78BFA]'
                      : 'text-[#6D6A80] hover:text-[#9C99AD] hover:bg-[#1E1D26]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template list */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {filteredTemplates.map((template, index) => (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      onClick={() => handleSelect(template)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1E1D26] transition-colors duration-150 text-left group"
                    >
                      {/* Category dot */}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: template.categoryColor }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] text-[#F0EEF5] font-medium truncate">
                          {template.name}
                        </div>
                        <div className="text-[11px] text-[#6D6A80]">
                          {template.techniques.length} techniques
                        </div>
                      </div>

                      {/* Use button */}
                      <span className="text-[11px] text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity font-medium flex-shrink-0">
                        Use
                      </span>
                    </motion.button>
                  ))}

                  {filteredTemplates.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="w-8 h-8 text-[#3A3852] mb-2" />
                      <p className="text-[12px] text-[#6D6A80]">No templates found</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
