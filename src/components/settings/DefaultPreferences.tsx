import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  Wand2,
  BarChart3,
  Languages,
  FileText,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  TECHNIQUE_PROFILES,
  LANGUAGES,
  RESPONSE_FORMATS,
} from '@/hooks/useSettings';

interface DefaultPreferencesProps {
  defaultTechnique: string;
  autoEnhance: boolean;
  showQualityScore: boolean;
  language: string;
  responseFormat: string;
  onUpdatePreferences: (updates: {
    defaultTechnique?: string;
    autoEnhance?: boolean;
    showQualityScore?: boolean;
    language?: string;
    responseFormat?: string;
  }) => void;
}

export default function DefaultPreferences({
  defaultTechnique,
  autoEnhance,
  showQualityScore,
  language,
  responseFormat,
  onUpdatePreferences,
}: DefaultPreferencesProps) {
  return (
    <div className="space-y-8">
      {/* Default Technique Profile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Default Technique Profile
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TECHNIQUE_PROFILES.map(profile => (
            <button
              key={profile.value}
              onClick={() => onUpdatePreferences({ defaultTechnique: profile.value })}
              className={`px-4 py-3 rounded-xl border-2 text-[13px] font-medium transition-all duration-200 ${
                defaultTechnique === profile.value
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-[#F0EEF5]'
                  : 'border-[#252430] bg-[#0F0E14] text-[#9C99AD] hover:border-[#3A3852]'
              }`}
              type="button"
            >
              {profile.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Auto-Enhance Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[#0F0E14] border border-[#252430] rounded-xl p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#F0EEF5]">Auto-enhance</h4>
              <p className="text-[12px] text-[#6D6A80]">
                Automatically enhance prompts after you stop typing for 2 seconds
              </p>
            </div>
          </div>
          <Switch
            checked={autoEnhance}
            onCheckedChange={(checked: boolean) =>
              onUpdatePreferences({ autoEnhance: checked })
            }
          />
        </div>
      </motion.div>

      {/* Show Quality Score Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0F0E14] border border-[#252430] rounded-xl p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[#06B6D4]" />
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#F0EEF5]">
                Show Quality Score
              </h4>
              <p className="text-[12px] text-[#6D6A80]">
                Display quality metrics after enhancement
              </p>
            </div>
          </div>
          <Switch
            checked={showQualityScore}
            onCheckedChange={(checked: boolean) =>
              onUpdatePreferences({ showQualityScore: checked })
            }
          />
        </div>
      </motion.div>

      {/* Language Preference */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <Languages className="w-3.5 h-3.5" />
          Language Preference
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.value}
              onClick={() => onUpdatePreferences({ language: lang.value })}
              className={`px-4 py-2.5 rounded-xl border-2 text-[13px] font-medium transition-all duration-200 text-left ${
                language === lang.value
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-[#F0EEF5]'
                  : 'border-[#252430] bg-[#0F0E14] text-[#9C99AD] hover:border-[#3A3852]'
              }`}
              type="button"
            >
              {lang.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Response Format */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="flex items-center gap-2 text-[13px] text-[#9C99AD] mb-3">
          <FileText className="w-3.5 h-3.5" />
          Response Format Default
        </label>
        <div className="grid grid-cols-3 gap-2">
          {RESPONSE_FORMATS.map(fmt => (
            <button
              key={fmt.value}
              onClick={() => onUpdatePreferences({ responseFormat: fmt.value })}
              className={`px-4 py-2.5 rounded-xl border-2 text-[13px] font-medium transition-all duration-200 ${
                responseFormat === fmt.value
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 text-[#F0EEF5]'
                  : 'border-[#252430] bg-[#0F0E14] text-[#9C99AD] hover:border-[#3A3852]'
              }`}
              type="button"
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
