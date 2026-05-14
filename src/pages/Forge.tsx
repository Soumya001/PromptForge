import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trash2, Settings, Sparkles, Activity, Keyboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePromptEngine } from '@/hooks/usePromptEngine';
import type { HistoryEntry } from '@/lib/promptEngine';
import TechniqueToolbar from '@/components/forge/TechniqueToolbar';
import PromptInput from '@/components/forge/PromptInput';
import PromptOutput from '@/components/forge/PromptOutput';
import HistorySidebar from '@/components/forge/HistorySidebar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Forge() {
  const navigate = useNavigate();
  const engine = usePromptEngine();
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!engine.result?.enhancedPrompt) return;
    try {
      await navigator.clipboard.writeText(engine.result.enhancedPrompt);
      engine.setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => engine.setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  }, [engine]);

  const handleFeedback = useCallback(
    (type: 'up' | 'down') => {
      engine.setFeedbackGiven(true);
      if (type === 'up') {
        toast.success('Thanks for the positive feedback!');
      } else {
        toast('Thanks for the feedback. We\'ll use it to improve.', {
          icon: <Sparkles className="w-4 h-4 text-[#8B5CF6]" />,
        });
      }
    },
    [engine]
  );

  const handleHistorySelect = useCallback(
    (entry: HistoryEntry) => {
      engine.restoreFromHistory(entry);
      setHistoryOpen(false);
    },
    [engine]
  );

  const handleTemplateSelect = useCallback(
    (_template: { techniques: string[] }) => {
      void _template;
      toast.info('Template applied! Click Enhance to transform.');
    },
    []
  );

  const statusText =
    engine.status === 'enhancing'
      ? 'Processing...'
      : engine.status === 'complete'
        ? 'Enhanced'
        : engine.status === 'error'
          ? 'Error'
          : 'Ready';

  const statusColor =
    engine.status === 'enhancing'
      ? 'text-[#8B5CF6]'
      : engine.status === 'complete'
        ? 'text-[#22C55E]'
        : engine.status === 'error'
          ? 'text-[#EF4444]'
          : 'text-[#6D6A80]';

  return (
    <div className="flex flex-col h-full -m-6 lg:-m-8" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Section 1: Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="h-14 bg-[#08070B]/80 backdrop-blur-[12px] border-b border-[#252430] flex items-center justify-between px-6 flex-shrink-0"
      >
        {/* Left: Page title */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Flame className="w-5 h-5 text-[#8B5CF6]" />
          </motion.div>
          <div>
            <h1
              className="text-[16px] font-semibold text-[#F0EEF5] leading-tight"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              Forge
            </h1>
            <p className="text-[11px] text-[#6D6A80] leading-tight">Transform your prompts</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={engine.clear}
            title="Clear session"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/settings')}
            title="Settings"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Section 2: Technique Toolbar */}
      <TechniqueToolbar
        selectedTechniques={engine.selectedTechniques}
        toggleTechnique={engine.toggleTechnique}
        autoMode={engine.autoMode}
        setAutoMode={engine.setAutoMode}
        status={engine.status}
        onEnhance={engine.enhance}
        hasOutput={!!engine.result}
        onCopy={handleCopy}
        copied={engine.copied}
      />

      {/* Section 3: Main Workspace (Input + Output Panels) */}
      <div className="flex-1 flex min-h-0">
        {/* Mobile tab switcher */}
        <div className="sm:hidden absolute top-[122px] left-0 right-0 z-20 bg-[#0F0E14] border-b border-[#252430] flex">
          <button
            onClick={() => engine.setActiveTab('input')}
            className={`flex-1 py-2.5 text-[12px] font-medium text-center transition-colors ${
              engine.activeTab === 'input'
                ? 'text-[#F0EEF5] border-b-2 border-[#8B5CF6]'
                : 'text-[#6D6A80]'
            }`}
          >
            Input
          </button>
          <button
            onClick={() => engine.setActiveTab('output')}
            className={`flex-1 py-2.5 text-[12px] font-medium text-center transition-colors ${
              engine.activeTab === 'output'
                ? 'text-[#F0EEF5] border-b-2 border-[#8B5CF6]'
                : 'text-[#6D6A80]'
            }`}
          >
            Output
          </button>
        </div>

        {/* Input Panel */}
        <div
          className={`flex-1 min-w-0 ${engine.activeTab === 'output' ? 'hidden sm:flex' : 'flex'}`}
        >
          <PromptInput
            value={engine.input}
            onChange={engine.setInput}
            onEnhance={engine.enhance}
            status={engine.status}
            onTemplateSelect={handleTemplateSelect}
          />
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden sm:flex w-px bg-[#252430] relative items-center justify-center">
          <div className="w-1.5 h-6 bg-[#3A3852] rounded-full cursor-col-resize" />
        </div>

        {/* Output Panel */}
        <div
          className={`flex-1 min-w-0 ${engine.activeTab === 'input' ? 'hidden sm:flex' : 'flex'}`}
        >
          <PromptOutput
            result={engine.result}
            status={engine.status}
            originalInput={engine.input}
            copied={engine.copied}
            onCopy={handleCopy}
            feedbackGiven={engine.feedbackGiven}
            onFeedback={handleFeedback}
          />
        </div>
      </div>

      {/* Section 4: Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="h-12 bg-[#0F0E14] border-t border-[#252430] flex items-center justify-between px-6 flex-shrink-0"
      >
        {/* Left: Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Activity className={cn('w-3.5 h-3.5', statusColor)} />
            <span className={cn('text-[11px]', statusColor)}>{statusText}</span>
          </div>
          {engine.result && (
            <>
              <span className="text-[#252430]">|</span>
              <span className="text-[11px] font-mono text-[#6D6A80]">
                {engine.result.processingTime > 0 ? `${(engine.result.processingTime / 1000).toFixed(1)}s` : ''}
              </span>
            </>
          )}
        </div>

        {/* Center: Keyboard shortcuts */}
        <div className="hidden md:flex items-center gap-3 text-[#6D6A80]">
          <div className="flex items-center gap-1">
            <Keyboard className="w-3 h-3" />
            <span className="text-[11px]">
              <kbd className="px-1 py-0.5 bg-[#16151D] border border-[#252430] rounded text-[10px]">
                Ctrl
              </kbd>
              +
              <kbd className="px-1 py-0.5 bg-[#16151D] border border-[#252430] rounded text-[10px]">
                Enter
              </kbd>
              <span className="ml-1">to enhance</span>
            </span>
          </div>
        </div>

        {/* Right: Token estimate */}
        <div className="flex items-center gap-3">
          {engine.result && (
            <span className="text-[11px] font-mono text-[#6D6A80]">
              ~{engine.result.tokenEstimate} tokens
            </span>
          )}
          {/* History toggle */}
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="text-[11px] text-[#6D6A80] hover:text-[#9C99AD] transition-colors"
          >
            History
          </button>
        </div>
      </motion.div>

      {/* Section 5: History Sidebar (overlay) */}
      <HistorySidebar
        history={engine.history}
        onSelect={handleHistorySelect}
        onClear={engine.clearHistory}
        isOpen={historyOpen}
        onToggle={() => setHistoryOpen(!historyOpen)}
      />
    </div>
  );
}


