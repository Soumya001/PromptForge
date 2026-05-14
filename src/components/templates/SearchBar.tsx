import type { FC } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search templates...',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="relative"
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D6A80]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full md:w-[280px] h-9 bg-[#16151D] border border-[#252430] rounded-lg pl-9 pr-8 text-sm text-[#F0EEF5] placeholder:text-[#6D6A80] focus:outline-none focus:border-[#8B5CF6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded text-[#6D6A80] hover:text-[#F0EEF5] hover:bg-[#1E1D26] transition-all duration-150"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  )
}

export default SearchBar
