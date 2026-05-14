import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  X,
  RefreshCw,
  ChevronDown,
  Key,
  Globe,
  Building2,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import type { ApiProvider } from '@/hooks/useSettings';

interface ApiConfigProps {
  providers: ApiProvider[];
  onUpdateProvider: (id: string, updates: Partial<ApiProvider>) => void;
}

const providerLogos: Record<string, ReactNode> = {
  openai: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  anthropic: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17.304 3.541h-3.672l6.696 16.918h3.672zm-10.608 0L0 20.459h3.744l1.368-3.6h6.624l1.368 3.6h3.744L6.696 3.541zm-.264 10.656 1.92-5.04 1.92 5.04z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  custom: <Globe className="w-5 h-5" />,
};

const tabIcons: Record<string, ReactNode> = {
  openai: providerLogos.openai,
  anthropic: providerLogos.anthropic,
  google: providerLogos.google,
  custom: providerLogos.custom,
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function ProviderCard({
  provider,
  index,
  onUpdate,
}: {
  provider: ApiProvider;
  index: number;
  onUpdate: (id: string, updates: Partial<ApiProvider>) => void;
}) {
  const [showKey, setShowKey] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = useCallback(async () => {
    if (!provider.apiKey.trim()) {
      toast.error(`Please enter an API key for ${provider.name}`);
      return;
    }
    setIsTesting(true);
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1200));
    const success = provider.apiKey.length > 10;
    if (success) {
      onUpdate(provider.id, { connected: true });
      toast.success(`${provider.name} connection successful`);
    } else {
      onUpdate(provider.id, { connected: false });
      toast.error(`${provider.name} connection failed`);
    }
    setIsTesting(false);
  }, [provider.apiKey, provider.name, provider.id, onUpdate]);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6 mb-4 transition-all duration-200 hover:border-[#3A3852]"
    >
      {/* Provider Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="text-[#9C99AD]">{tabIcons[provider.id]}</div>
          <h3 className="text-[15px] font-display font-semibold text-[#F0EEF5]">
            {provider.name}
          </h3>
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
            provider.connected
              ? 'bg-[#22C55E]/10 text-[#22C55E]'
              : 'bg-[#252430] text-[#6D6A80]'
          }`}
        >
          {provider.connected ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Connected
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6D6A80]" />
              Not Configured
            </>
          )}
        </div>
      </div>

      {/* API Key Input */}
      <div className="mb-4">
        <label className="block text-[13px] text-[#9C99AD] mb-2">API Key</label>
        <div className="relative flex">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6A80]">
            <Key className="w-4 h-4" />
          </div>
          <input
            type={showKey ? 'text' : 'password'}
            value={provider.apiKey}
            onChange={e => onUpdate(provider.id, { apiKey: e.target.value })}
            placeholder={
              provider.id === 'openai'
                ? 'sk-...'
                : provider.id === 'anthropic'
                  ? 'sk-ant-...'
                  : provider.id === 'google'
                    ? 'AIza...'
                    : 'Enter API key...'
            }
            className="flex-1 h-10 bg-[#16151D] border border-[#252430] rounded-lg pl-9 pr-10 text-[13px] font-mono text-[#F0EEF5] placeholder:text-[#6D6A80] outline-none transition-all duration-200 focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/15"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6D6A80] hover:text-[#9C99AD] transition-colors"
            type="button"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-[#6D6A80]">
          Your key is stored locally and never sent to our servers.
        </p>
      </div>

      {/* Test Connection Button */}
      <button
        onClick={handleTest}
        disabled={isTesting}
        className="flex items-center gap-2 px-4 py-2 bg-[#16151D] border border-[#3A3852] rounded-lg text-[13px] text-[#F0EEF5] hover:border-[#8B5CF6] hover:bg-[#1E1D26] transition-all duration-200 disabled:opacity-50"
        type="button"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
        {isTesting ? 'Testing...' : 'Test Connection'}
      </button>

      {/* Advanced Toggle */}
      <div className="mt-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-[13px] text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
          type="button"
        >
          Advanced Options
          <motion.div
            animate={{ rotate: showAdvanced ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                <div>
                  <label className="block text-[13px] text-[#9C99AD] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      Base URL
                    </span>
                  </label>
                  <input
                    type="text"
                    value={provider.baseUrl}
                    onChange={e => onUpdate(provider.id, { baseUrl: e.target.value })}
                    className="w-full h-10 bg-[#16151D] border border-[#252430] rounded-lg px-3 text-[13px] font-mono text-[#F0EEF5] placeholder:text-[#6D6A80] outline-none transition-all duration-200 focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/15"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-[#9C99AD] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      Organization ID (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="org-..."
                    className="w-full h-10 bg-[#16151D] border border-[#252430] rounded-lg px-3 text-[13px] font-mono text-[#F0EEF5] placeholder:text-[#6D6A80] outline-none transition-all duration-200 focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/15"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ApiConfig({ providers, onUpdateProvider }: ApiConfigProps) {
  const [activeTab, setActiveTab] = useState<string>(providers[0]?.id || 'openai');
  const [testingAll, setTestingAll] = useState(false);

  const activeProvider = providers.find(p => p.id === activeTab) || providers[0];

  const handleTestAll = useCallback(async () => {
    setTestingAll(true);
    toast.info('Testing all connections...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    providers.forEach(p => {
      if (p.apiKey.trim().length > 10) {
        onUpdateProvider(p.id, { connected: true });
      }
    });
    toast.success('Connection test complete');
    setTestingAll(false);
  }, [providers, onUpdateProvider]);

  return (
    <div>
      {/* Provider Tabs */}
      <div className="flex gap-1 mb-6 bg-[#16151D] rounded-lg p-1 border border-[#252430]">
        {providers.map(provider => (
          <button
            key={provider.id}
            onClick={() => setActiveTab(provider.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-md text-[13px] font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === provider.id
                ? 'text-[#F0EEF5]'
                : 'text-[#6D6A80] hover:text-[#9C99AD]'
            }`}
            type="button"
          >
            {activeTab === provider.id && (
              <motion.div
                layoutId="api-provider-tab"
                className="absolute inset-0 bg-[#2A2933] rounded-md"
                transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {providerLogos[provider.id]}
              <span className="hidden sm:inline">{provider.name}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Active Provider Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProvider.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ProviderCard
            provider={activeProvider}
            index={0}
            onUpdate={onUpdateProvider}
          />
        </motion.div>
      </AnimatePresence>

      {/* Test All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <button
          onClick={handleTestAll}
          disabled={testingAll}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#16151D] border border-[#3A3852] rounded-lg text-[14px] text-[#F0EEF5] hover:border-[#8B5CF6] hover:bg-[#1E1D26] transition-all duration-200 disabled:opacity-50"
          type="button"
        >
          <Zap className={`w-4 h-4 text-[#8B5CF6] ${testingAll ? 'animate-spin' : ''}`} />
          {testingAll ? 'Testing All...' : 'Test All Connections'}
        </button>

        {/* Connection Status Summary */}
        <div className="mt-4 flex flex-wrap gap-3">
          {providers.map(p => (
            <div
              key={p.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] border ${
                p.connected
                  ? 'border-[#22C55E]/30 text-[#22C55E] bg-[#22C55E]/5'
                  : 'border-[#252430] text-[#6D6A80] bg-[#16151D]'
              }`}
            >
              {p.connected ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
              {p.name}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
