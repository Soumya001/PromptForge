import { useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, LayoutTemplate, Send } from 'lucide-react';
import TemplatePicker from './TemplatePicker';
import type { Template } from '@/lib/promptEngine';
import type { ForgeStatus } from '@/hooks/usePromptEngine';
import { cn } from '@/lib/utils';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnhance: () => void;
  status: ForgeStatus;
  onTemplateSelect: (template: Template) => void;
}

const MAX_CHARS = 2000;

export default function PromptInput({
  value,
  onChange,
  onEnhance,
  status,
  onTemplateSelect,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEnhancing = status === 'enhancing';

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`;
  }, [value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (value.trim() && !isEnhancing) {
          onEnhance();
        }
      }
    },
    [value, isEnhancing, onEnhance]
  );

  const handleTemplateSelect = useCallback(
    (template: Template) => {
      onChange(template.content);
      onTemplateSelect(template);
      // Focus the textarea after template selection
      setTimeout(() => textareaRef.current?.focus(), 100);
    },
    [onChange, onTemplateSelect]
  );

  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
      className="flex flex-col h-full bg-[#08070B] p-6"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#9C99AD]" />
            <h2 className="text-[16px] font-medium text-[#F0EEF5]" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              Your Message
            </h2>
          </div>
          <p className="text-[12px] text-[#6D6A80] mt-0.5 ml-6">
            Type naturally — no special syntax needed
          </p>
        </div>
        <motion.span
          animate={isNearLimit ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={cn(
            'text-[11px] font-mono transition-colors',
            isNearLimit ? 'text-[#F59E0B]' : 'text-[#6D6A80]'
          )}
        >
          {charCount} / {MAX_CHARS}
        </motion.span>
      </div>

      {/* Textarea */}
      <div className="flex-1 flex flex-col min-h-0">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          placeholder={`Describe what you need help with...\n\nExample: Help me write a Python function to sort a list of dictionaries by a key`}
          className={cn(
            'flex-1 w-full min-h-[200px] bg-[#16151D] border rounded-xl p-4 text-[14px] text-[#F0EEF5] placeholder-[#6D6A80] resize-none outline-none transition-all duration-200 leading-relaxed',
            'focus:border-[#8B5CF6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]',
            'border-[#252430]'
          )}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        />

        {/* Panel Footer */}
        <div className="flex items-center justify-between mt-3">
          {/* Template picker */}
          <TemplatePicker onSelect={handleTemplateSelect}>
            <button className="flex items-center gap-2 h-9 px-3 rounded-lg text-[12px] text-[#9C99AD] hover:text-[#F0EEF5] hover:bg-[#1E1D26] transition-all duration-200">
              <LayoutTemplate className="w-4 h-4" />
              <span>Use Template</span>
            </button>
          </TemplatePicker>

          {/* Enhance button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnhance}
            disabled={!value.trim() || isEnhancing}
            className={cn(
              'h-10 px-5 rounded-lg text-[13px] font-semibold text-[#08070B] flex items-center gap-2 transition-all duration-200',
              !value.trim() || isEnhancing
                ? 'opacity-50 cursor-not-allowed bg-[#3A3852]'
                : 'hover:brightness-110'
            )}
            style={
              value.trim() && !isEnhancing
                ? { background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)' }
                : undefined
            }
          >
            <Send className="w-4 h-4" />
            <span>{isEnhancing ? 'Enhancing...' : 'Enhance'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
