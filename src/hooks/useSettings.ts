import { useState, useEffect, useCallback } from 'react';

export interface ApiProvider {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
  connected: boolean;
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  providerId: string;
  capabilities: string[];
  speed: number;
}

export interface SettingsState {
  // API Configuration
  providers: ApiProvider[];
  // Model Selection
  selectedModelId: string;
  temperature: number;
  maxTokens: number;
  // Appearance
  theme: 'dark' | 'light' | 'system';
  fontSize: number;
  codeFont: string;
  animationLevel: 'full' | 'reduced' | 'none';
  // Default Preferences
  defaultTechnique: string;
  autoEnhance: boolean;
  showQualityScore: boolean;
  language: string;
  responseFormat: string;
}

const DEFAULT_PROVIDERS: ApiProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    connected: false,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    apiKey: '',
    baseUrl: 'https://api.anthropic.com/v1',
    connected: false,
  },
  {
    id: 'google',
    name: 'Google',
    apiKey: '',
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    connected: false,
  },
  {
    id: 'custom',
    name: 'Custom',
    apiKey: '',
    baseUrl: 'http://localhost:11434/v1',
    connected: false,
  },
];

const DEFAULT_SETTINGS: SettingsState = {
  providers: DEFAULT_PROVIDERS,
  selectedModelId: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 4096,
  theme: 'dark',
  fontSize: 1,
  codeFont: 'JetBrains Mono',
  animationLevel: 'full',
  defaultTechnique: 'balanced',
  autoEnhance: false,
  showQualityScore: true,
  language: 'english',
  responseFormat: 'markdown',
};

const STORAGE_KEY = 'promptforge-settings';

function loadSettings(): SettingsState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<SettingsState>;
      return { ...DEFAULT_SETTINGS, ...parsed, providers: parsed.providers || DEFAULT_PROVIDERS };
    }
  } catch {
    // ignore parse errors
  }
  return { ...DEFAULT_SETTINGS, providers: DEFAULT_PROVIDERS.map(p => ({ ...p })) };
}

function saveSettings(settings: SettingsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>(loadSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    saveSettings(settings);
    setHasChanges(true);
  // We only want to track changes after initial load, but not run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.providers,
    settings.selectedModelId,
    settings.temperature,
    settings.maxTokens,
    settings.theme,
    settings.fontSize,
    settings.codeFont,
    settings.animationLevel,
    settings.defaultTechnique,
    settings.autoEnhance,
    settings.showQualityScore,
    settings.language,
    settings.responseFormat,
  ]);

  const updateProvider = useCallback((id: string, updates: Partial<ApiProvider>) => {
    setSettings(prev => ({
      ...prev,
      providers: prev.providers.map(p => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, []);

  const updateModel = useCallback((updates: Partial<Pick<SettingsState, 'selectedModelId' | 'temperature' | 'maxTokens'>>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updateAppearance = useCallback((updates: Partial<Pick<SettingsState, 'theme' | 'fontSize' | 'codeFont' | 'animationLevel'>>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updatePreferences = useCallback((updates: Partial<Pick<SettingsState, 'defaultTechnique' | 'autoEnhance' | 'showQualityScore' | 'language' | 'responseFormat'>>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const resetAll = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS, providers: DEFAULT_PROVIDERS.map(p => ({ ...p })) });
    setHasChanges(false);
  }, []);

  const clearAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSettings({ ...DEFAULT_SETTINGS, providers: DEFAULT_PROVIDERS.map(p => ({ ...p })) });
    setHasChanges(false);
  }, []);

  const markSaved = useCallback(() => {
    setHasChanges(false);
  }, []);

  return {
    settings,
    hasChanges,
    updateProvider,
    updateModel,
    updateAppearance,
    updatePreferences,
    resetAll,
    clearAllData,
    markSaved,
  };
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerId: 'openai',
    capabilities: ['128K Context', 'Fast', 'Code Expert'],
    speed: 95,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    providerId: 'openai',
    capabilities: ['128K Context', 'Fastest', 'Balanced'],
    speed: 100,
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    providerId: 'anthropic',
    capabilities: ['200K Context', 'Creative', 'Analysis'],
    speed: 85,
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    providerId: 'anthropic',
    capabilities: ['200K Context', 'Fastest', 'Efficient'],
    speed: 98,
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    providerId: 'google',
    capabilities: ['1M Context', 'Multimodal'],
    speed: 80,
  },
  {
    id: 'custom-model',
    name: 'Custom Model',
    provider: 'Custom',
    providerId: 'custom',
    capabilities: ['Private', 'Customizable', 'Local'],
    speed: 70,
  },
];

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
];

export const RESPONSE_FORMATS = [
  { value: 'markdown', label: 'Markdown' },
  { value: 'json', label: 'JSON' },
  { value: 'plain', label: 'Plain Text' },
];

export const CODE_FONTS = [
  { value: 'JetBrains Mono', label: 'JetBrains Mono' },
  { value: 'Fira Code', label: 'Fira Code' },
  { value: 'Source Code Pro', label: 'Source Code Pro' },
];

export const TECHNIQUE_PROFILES = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'speed', label: 'Speed' },
  { value: 'quality', label: 'Quality' },
  { value: 'custom', label: 'Custom' },
];
