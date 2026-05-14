import { LayoutTemplate } from 'lucide-react'

export default function Templates() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center mb-6">
        <LayoutTemplate className="w-8 h-8 text-[#06B6D4]" />
      </div>
      <h1 className="text-3xl font-display font-bold text-[#F0EEF5] mb-3">Templates</h1>
      <p className="text-[#9C99AD] max-w-md text-[15px] leading-relaxed">
        Browse our curated library of prompt templates. Find battle-tested patterns for code generation, writing, data analysis, and creative tasks.
      </p>
      <div className="mt-8 px-4 py-2 bg-[#16151D] border border-[#252430] rounded-lg text-[#6D6A80] text-sm font-mono">
        Coming soon — template library
      </div>
    </div>
  )
}
