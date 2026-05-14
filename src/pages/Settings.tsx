import { Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-xl bg-[#F472B6]/10 flex items-center justify-center mb-6">
        <SettingsIcon className="w-8 h-8 text-[#F472B6]" />
      </div>
      <h1 className="text-3xl font-display font-bold text-[#F0EEF5] mb-3">Settings</h1>
      <p className="text-[#9C99AD] max-w-md text-[15px] leading-relaxed">
        Configure your API keys, select your preferred models, customize preferences, and manage your account settings.
      </p>
      <div className="mt-8 px-4 py-2 bg-[#16151D] border border-[#252430] rounded-lg text-[#6D6A80] text-sm font-mono">
        Coming soon — settings panel
      </div>
    </div>
  )
}
