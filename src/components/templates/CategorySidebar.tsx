import type { FC } from 'react'
import { motion } from 'framer-motion'
import {
  Grid3x3,
  Code2,
  PenTool,
  BarChart3,
  Palette,
  Briefcase,
  GraduationCap,
} from 'lucide-react'
import { categories } from '@/lib/templatesData'
import type { Category } from '@/lib/templatesData'
import { templates } from '@/lib/templatesData'

const iconMap: Record<string, FC<{ className?: string }>> = {
  Grid3x3,
  Code2,
  PenTool,
  BarChart3,
  Palette,
  Briefcase,
  GraduationCap,
}

interface CategorySidebarProps {
  activeCategory: Category | 'All'
  onSelectCategory: (c: Category | 'All') => void
}

const CategorySidebar: FC<CategorySidebarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getCount = (cat: Category | 'All') => {
    if (cat === 'All') return templates.length
    return templates.filter((t) => t.category === cat).length
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="w-full md:w-[200px] flex-shrink-0 space-y-1"
    >
      {categories.map((cat, index) => {
        const Icon = iconMap[cat.icon]
        const isActive = activeCategory === cat.id
        const count = getCount(cat.id)

        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.04,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full flex items-center gap-2.5 h-9 px-3 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-[#2A2933] text-[#F0EEF5]'
                : 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5]'
            }`}
          >
            <div style={{ color: isActive ? cat.color : undefined }}>
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            </div>
            <span className="text-sm font-medium flex-1 text-left truncate">
              {cat.label}
            </span>
            <span
              className={`text-[11px] font-mono ${
                isActive ? 'text-[#6D6A80]' : 'text-[#3A3852]'
              }`}
            >
              {count}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

export default CategorySidebar
