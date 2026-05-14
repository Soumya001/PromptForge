import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Templates', href: '#templates-preview' },
  { label: 'Analytics', href: '#analytics-preview' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08070B]/80 backdrop-blur-[16px] border-b border-[#252430]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-icon.svg" alt="PromptForge" className="w-8 h-8" />
          <img src="/logo-wordmark.svg" alt="PromptForge AI" className="h-5 hidden sm:block" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-[#9C99AD] hover:text-[#F0EEF5] transition-colors duration-200 text-[15px] font-body"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/promptforge-ai/promptforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[#9C99AD] hover:text-[#F0EEF5] hover:bg-[#1E1D26] rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <button
            onClick={() => navigate('/forge')}
            className="gradient-hero text-[#08070B] px-5 py-2 rounded-lg font-semibold text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Launch App
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#9C99AD] hover:text-[#F0EEF5]"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[#08070B]/95 backdrop-blur-[16px] border-b border-[#252430] px-4 py-4"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-[#9C99AD] hover:text-[#F0EEF5] py-2 text-sm"
              >
                {link.label}
              </button>
            ))}
            <hr className="border-[#252430] my-2" />
            <a
              href="https://github.com/promptforge-ai/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#9C99AD] hover:text-[#F0EEF5] py-2 text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <button
              onClick={() => { setMobileOpen(false); navigate('/forge') }}
              className="gradient-hero text-[#08070B] px-5 py-2 rounded-lg font-semibold text-sm text-center"
            >
              Launch App
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
