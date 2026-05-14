import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  RotateCcw,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

interface DangerZoneProps {
  onResetAll: () => void;
  onClearAllData: () => void;
}

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  icon: Icon,
  confirmClassName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  icon: typeof AlertTriangle;
  confirmClassName: string;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6 w-full max-w-[400px] mx-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#EF4444]" />
          </div>
          <h3 className="text-[16px] font-display font-semibold text-[#F0EEF5]">
            {title}
          </h3>
        </div>
        <p className="text-[14px] text-[#9C99AD] mb-6 leading-relaxed">{description}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-[#16151D] border border-[#252430] rounded-lg text-[13px] text-[#9C99AD] hover:text-[#F0EEF5] hover:border-[#3A3852] transition-all duration-200"
            type="button"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-all duration-200 ${confirmClassName}`}
            type="button"
          >
            <Check className="w-3.5 h-3.5" />
            {confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DangerZone({ onResetAll, onClearAllData }: DangerZoneProps) {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleReset = () => {
    onResetAll();
    toast.success('All settings reset to defaults');
  };

  const handleClear = () => {
    onClearAllData();
    toast.success('All local data cleared');
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-[#0F0E14] border border-[#EF4444]/20 rounded-xl p-5 space-y-4">
          {/* Reset All Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-[#F0EEF5]">
                  Reset All Settings
                </h4>
                <p className="text-[12px] text-[#6D6A80]">
                  Restore all settings to their default values
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowResetDialog(true)}
              className="px-4 py-2 bg-[#16151D] border border-[#F59E0B]/30 rounded-lg text-[13px] text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-all duration-200 shrink-0"
              type="button"
            >
              Reset
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#252430]" />

          {/* Clear All Data */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-[#EF4444]" />
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-[#F0EEF5]">
                  Clear All Local Data
                </h4>
                <p className="text-[12px] text-[#6D6A80]">
                  Delete all locally stored data including API keys
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowClearDialog(true)}
              className="px-4 py-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg text-[13px] text-[#EF4444] hover:bg-[#EF4444]/20 transition-all duration-200 shrink-0"
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={handleReset}
        title="Reset All Settings?"
        description="This will restore all settings to their default values. Any custom API keys, model selections, and preferences will be lost. This action cannot be undone."
        confirmText="Reset Settings"
        icon={AlertTriangle}
        confirmClassName="bg-[#F59E0B] hover:bg-[#F59E0B]/90"
      />

      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClear}
        title="Clear All Data?"
        description="This will permanently delete all locally stored data including all API keys, settings, and cached data. This action cannot be undone."
        confirmText="Clear Everything"
        icon={AlertTriangle}
        confirmClassName="bg-[#EF4444] hover:bg-[#EF4444]/90"
      />
    </div>
  );
}
