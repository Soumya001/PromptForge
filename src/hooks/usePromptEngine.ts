import { useState, useCallback, useRef } from 'react';
import type { Technique, EnhancementResult, HistoryEntry } from '@/lib/promptEngine';
import { enhancePrompt } from '@/lib/promptEngine';
import { useLocalStorage } from './useLocalStorage';

export type ForgeStatus = 'idle' | 'enhancing' | 'complete' | 'error';

export interface UsePromptEngineReturn {
  // Input
  input: string;
  setInput: (value: string) => void;

  // Techniques
  selectedTechniques: Technique[];
  toggleTechnique: (technique: Technique) => void;
  autoMode: boolean;
  setAutoMode: (value: boolean) => void;

  // Enhancement result
  result: EnhancementResult | null;

  // Status
  status: ForgeStatus;

  // Actions
  enhance: () => void;
  clear: () => void;
  restoreFromHistory: (entry: HistoryEntry) => void;

  // History
  history: HistoryEntry[];
  addToHistory: (entry: HistoryEntry) => void;
  clearHistory: () => void;

  // Feedback
  feedbackGiven: boolean;
  setFeedbackGiven: (value: boolean) => void;

  // Copy feedback
  copied: boolean;
  setCopied: (value: boolean) => void;

  // Active tab for mobile
  activeTab: 'input' | 'output';
}

const HISTORY_KEY = 'forge-history';
const MAX_HISTORY = 20;

export function usePromptEngine(): UsePromptEngineReturn {
  const [input, setInput] = useState('');
  const [selectedTechniques, setSelectedTechniques] = useState<Technique[]>([]);
  const [autoMode, setAutoMode] = useState(true);
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const [status, setStatus] = useState<ForgeStatus>('idle');
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, []);

  // Use a ref to track the enhancement timeout so we can clear it
  const enhanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleTechnique = useCallback((technique: Technique) => {
    setSelectedTechniques((prev) =>
      prev.includes(technique)
        ? prev.filter((t) => t !== technique)
        : [...prev, technique]
    );
    // Disable auto mode when user manually selects
    setAutoMode(false);
  }, []);

  const addToHistory = useCallback(
    (entry: HistoryEntry) => {
      setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const enhance = useCallback(() => {
    if (!input.trim()) return;

    // Clear any pending timeout
    if (enhanceTimeoutRef.current) {
      clearTimeout(enhanceTimeoutRef.current);
    }

    setStatus('enhancing');
    setResult(null);
    setFeedbackGiven(false);
    setActiveTab('output');

    // Simulate processing delay (800-1500ms)
    const delay = 800 + Math.random() * 700;

    enhanceTimeoutRef.current = setTimeout(() => {
      try {
        const enhancementResult = enhancePrompt(input, selectedTechniques, autoMode);
        setResult(enhancementResult);
        setStatus('complete');

        // Add to history
        const entry: HistoryEntry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2),
          original: input,
          enhanced: enhancementResult.enhancedPrompt,
          techniques: enhancementResult.appliedTechniques,
          qualityScore: enhancementResult.qualityScore,
          timestamp: Date.now(),
        };
        addToHistory(entry);
      } catch {
        setStatus('error');
      }
    }, delay);
  }, [input, selectedTechniques, autoMode, addToHistory]);

  const restoreFromHistory = useCallback((entry: HistoryEntry) => {
    setInput(entry.original);
    setResult({
      enhancedPrompt: entry.enhanced,
      appliedTechniques: entry.techniques,
      qualityScore: entry.qualityScore,
      tokenEstimate: Math.ceil(entry.enhanced.split(/\s+/).length * 1.3),
      processingTime: 0,
    });
    setStatus('complete');
    setFeedbackGiven(false);
    setActiveTab('output');
  }, []);

  const clear = useCallback(() => {
    setInput('');
    setResult(null);
    setStatus('idle');
    setFeedbackGiven(false);
    setSelectedTechniques([]);
    setAutoMode(true);
    setActiveTab('input');
    if (enhanceTimeoutRef.current) {
      clearTimeout(enhanceTimeoutRef.current);
    }
  }, []);

  return {
    input,
    setInput,
    selectedTechniques,
    toggleTechnique,
    autoMode,
    setAutoMode,
    result,
    status,
    enhance,
    clear,
    restoreFromHistory,
    history,
    addToHistory,
    clearHistory,
    feedbackGiven,
    setFeedbackGiven,
    copied,
    setCopied,
    activeTab,
  };
}
