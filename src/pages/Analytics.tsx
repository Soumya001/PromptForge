import { BarChart3 } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-xl bg-[#22C55E]/10 flex items-center justify-center mb-6">
        <BarChart3 className="w-8 h-8 text-[#22C55E]" />
      </div>
      <h1 className="text-3xl font-display font-bold text-[#F0EEF5] mb-3">Analytics</h1>
      <p className="text-[#9C99AD] max-w-md text-[15px] leading-relaxed">
        Track prompt effectiveness scores, technique usage analytics, and improvement trends. Watch your prompts get better over time.
      </p>
      <div className="mt-8 px-4 py-2 bg-[#16151D] border border-[#252430] rounded-lg text-[#6D6A80] text-sm font-mono">
        Coming soon — analytics dashboard
      </div>
    </div>
  )
}
