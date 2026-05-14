import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Key,
  Cpu,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  Check,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useSettings } from '@/hooks/useSettings';
import SettingsSection from '@/components/settings/SettingsSection';
import ApiConfig from '@/components/settings/ApiConfig';
import ModelSelection from '@/components/settings/ModelSelection';
import Appearance from '@/components/settings/Appearance';
import DefaultPreferences from '@/components/settings/DefaultPreferences';
import AboutSection from '@/components/settings/AboutSection';
import DangerZone from '@/components/settings/DangerZone';

type SettingsTab = 'api' | 'model' | 'preferences' | 'about';

const tabs: { id: SettingsTab; label: string; icon: typeof Key }[] = [
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'model', label: 'Model', icon: Cpu },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { id: 'about', label: 'About', icon: Info },
];

const tabContentVariants = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('api');
  const [isSaving, setIsSaving] = useState(false);
  const {
    settings,
    hasChanges,
    updateProvider,
    updateModel,
    updateAppearance,
    updatePreferences,
    resetAll,
    clearAllData,
    markSaved,
  } = useSettings();

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    // Simulate API save
    await new Promise(resolve => setTimeout(resolve, 800));
    markSaved();
    setIsSaving(false);
    toast.success('Settings saved successfully');
  }, [markSaved]);

  const handleReset = useCallback(() => {
    resetAll();
    toast.info('Settings reverted to last saved');
  }, [resetAll]);

  return (
    <div className="min-h-[100dvh] bg-[#08070B]">
      <Toaster position="bottom-right" richColors />

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="h-14 flex items-center px-6 border-b border-[#252430] bg-[#08070B]/80 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-5 h-5 text-[#9C99AD]" />
          <div>
            <h1 className="text-[18px] font-display font-semibold text-[#F0EEF5] leading-tight">
              Settings
            </h1>
            <p className="text-[12px] text-[#6D6A80]">Configure PromptForge</p>
          </div>
        </div>
      </motion.header>

      {/* Settings Tabs */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-0 border-b border-[#252430] bg-[#0F0E14] sticky top-14 z-40 overflow-x-auto"
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-[#F0EEF5]'
                  : 'text-[#6D6A80] hover:text-[#9C99AD]'
              }`}
              type="button"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="settings-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B5CF6]"
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                />
              )}
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Content Area */}
      <main className="relative max-w-[720px] mx-auto px-6 py-8 pb-28">
        <AnimatePresence mode="wait">
          {activeTab === 'api' && (
            <motion.div
              key="api"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <SettingsSection
                title="API Configuration"
                description="Configure LLM API keys for different providers"
                icon={Key}
                delay={0}
              >
                <ApiConfig
                  providers={settings.providers}
                  onUpdateProvider={updateProvider}
                />
              </SettingsSection>
            </motion.div>
          )}

          {activeTab === 'model' && (
            <motion.div
              key="model"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <SettingsSection
                title="Model Selection"
                description="Choose your default model and configure parameters"
                icon={Cpu}
                delay={0}
              >
                <ModelSelection
                  selectedModelId={settings.selectedModelId}
                  temperature={settings.temperature}
                  maxTokens={settings.maxTokens}
                  onUpdateModel={updateModel}
                />
              </SettingsSection>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              key="preferences"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <SettingsSection
                title="Appearance"
                description="Customize the look and feel of the application"
                icon={SlidersHorizontal}
                delay={0}
              >
                <Appearance
                  theme={settings.theme}
                  fontSize={settings.fontSize}
                  codeFont={settings.codeFont}
                  animationLevel={settings.animationLevel}
                  onUpdateAppearance={updateAppearance}
                />
              </SettingsSection>

              <SettingsSection
                title="Default Preferences"
                description="Configure default behavior for prompt enhancement"
                icon={SlidersHorizontal}
                delay={1}
              >
                <DefaultPreferences
                  defaultTechnique={settings.defaultTechnique}
                  autoEnhance={settings.autoEnhance}
                  showQualityScore={settings.showQualityScore}
                  language={settings.language}
                  responseFormat={settings.responseFormat}
                  onUpdatePreferences={updatePreferences}
                />
              </SettingsSection>

              <SettingsSection
                title="Danger Zone"
                description="Destructive actions that cannot be undone"
                icon={AlertTriangle}
                delay={2}
              >
                <DangerZone onResetAll={resetAll} onClearAllData={clearAllData} />
              </SettingsSection>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <AboutSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Save Actions Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 64 }}
            animate={{ y: 0 }}
            exit={{ y: 64 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed bottom-0 left-0 right-0 h-16 bg-[#08070B]/90 backdrop-blur-xl border-t border-[#252430] z-50"
          >
            <div className="max-w-[720px] mx-auto h-full flex items-center justify-end gap-3 px-6">
              <span className="text-[13px] text-[#F59E0B] mr-2">Unsaved changes</span>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-[#16151D] border border-[#252430] rounded-lg text-[13px] text-[#9C99AD] hover:text-[#F0EEF5] hover:border-[#3A3852] transition-all duration-200"
                type="button"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-lg text-[13px] font-semibold text-[#08070B] hover:brightness-110 transition-all duration-200 disabled:opacity-50"
                type="button"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
