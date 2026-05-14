import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutTemplate, Plus, SearchX } from 'lucide-react'
import SearchBar from '@/components/templates/SearchBar'
import FilterChips from '@/components/templates/FilterChips'
import CategorySidebar from '@/components/templates/CategorySidebar'
import TemplateCard from '@/components/templates/TemplateCard'
import TemplatePreview from '@/components/templates/TemplatePreview'
import { templates } from '@/lib/templatesData'
import type { Category, Technique, Complexity, Template } from '@/lib/templatesData'

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [selectedTechniques, setSelectedTechniques] = useState<Technique[]>([])
  const [selectedComplexity, setSelectedComplexity] = useState<Complexity | 'all'>('all')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const favs = new Set<string>()
    templates.forEach((t) => {
      if (t.isFavorite) favs.add(t.id)
    })
    return favs
  })

  const toggleTechnique = useCallback((t: Technique) => {
    setSelectedTechniques((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const filteredTemplates = useMemo(() => {
    let result = templates

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((t) => t.category === activeCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    // Technique filter
    if (selectedTechniques.length > 0) {
      result = result.filter((t) =>
        selectedTechniques.some((tech) => t.techniques.includes(tech))
      )
    }

    // Complexity filter
    if (selectedComplexity !== 'all') {
      result = result.filter((t) => t.complexity === selectedComplexity)
    }

    return result.map((t) => ({
      ...t,
      isFavorite: favorites.has(t.id),
    }))
  }, [activeCategory, searchQuery, selectedTechniques, selectedComplexity, favorites])

  const hasActiveFilters =
    searchQuery || selectedTechniques.length > 0 || selectedComplexity !== 'all'

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedTechniques([])
    setSelectedComplexity('all')
    setActiveCategory('All')
  }

  return (
    <div className="min-h-0">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[rgba(6,182,212,0.1)] flex items-center justify-center">
            <LayoutTemplate className="w-[18px] h-[18px] text-[#06B6D4]" />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-[#F0EEF5] font-display leading-tight">
              Template Library
            </h1>
            <p className="text-[12px] text-[#6D6A80]">
              {templates.length} battle-tested prompts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button
            className="h-9 px-4 rounded-lg text-sm font-semibold text-[#08070B] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 flex-shrink-0"
            style={{
              background:
                'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #F472B6 100%)',
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </button>
        </div>
      </motion.div>

      {/* Category Filter Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6"
      >
        <CategorySidebar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </motion.div>

      {/* Filter Chips */}
      <div className="mb-6">
        <FilterChips
          selectedTechniques={selectedTechniques}
          onToggleTechnique={toggleTechnique}
          selectedComplexity={selectedComplexity}
          onSetComplexity={setSelectedComplexity}
        />
      </div>

      {/* Active filter indicator */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <p className="text-[13px] text-[#9C99AD]">
            Showing{' '}
            <span className="text-[#F0EEF5] font-medium">
              {filteredTemplates.length}
            </span>{' '}
            result{filteredTemplates.length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={clearAllFilters}
            className="text-[12px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors duration-200"
          >
            Clear all filters
          </button>
        </motion.div>
      )}

      {/* Template Grid */}
      <AnimatePresence mode="wait">
        {filteredTemplates.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${searchQuery}-${selectedTechniques.join(',')}-${selectedComplexity}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  onToggleFavorite={toggleFavorite}
                  onPreview={setPreviewTemplate}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#16151D] border border-[#252430] flex items-center justify-center mb-5">
              <SearchX className="w-8 h-8 text-[#3A3852]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#9C99AD] font-display mb-2">
              No templates found
            </h3>
            <p className="text-[13px] text-[#6D6A80] mb-6 max-w-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="h-9 px-5 rounded-lg text-sm font-medium text-[#F0EEF5] bg-[#16151D] border border-[#3A3852] hover:bg-[#1E1D26] hover:border-[#8B5CF6] transition-all duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Drawer */}
      <TemplatePreview
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}
