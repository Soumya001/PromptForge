import { Link } from 'react-router-dom'
import { Github, Twitter, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const productLinks = [
  { label: 'Forge', to: '/forge' },
  { label: 'Templates', to: '/templates' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Settings', to: '/settings' },
  { label: 'Changelog', to: '#' },
]

const resourceLinks = [
  { label: 'Documentation', to: '#' },
  { label: 'API Reference', to: '#' },
  { label: 'GitHub', to: 'https://github.com/promptforge-ai/promptforge' },
  { label: 'Issues', to: '#' },
  { label: 'Discussions', to: '#' },
]

const communityLinks = [
  { label: 'Contribute', to: '#' },
  { label: 'Code of Conduct', to: '#' },
  { label: 'License', to: '#' },
  { label: 'Contributors', to: '#' },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#08070B] border-t border-[#252430]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Logo + Tagline */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-wordmark.svg" alt="PromptForge AI" className="h-6" />
            </Link>
            <p className="text-[#6D6A80] text-[13px] mt-2 font-body">AI-Engineered Prompts</p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
            <div>
              <h4 className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#6D6A80] mb-4 font-body">
                Product
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[#9C99AD] hover:text-[#F0EEF5] text-[13px] transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F0EEF5] group-hover:w-full transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#6D6A80] mb-4 font-body">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith('http') ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9C99AD] hover:text-[#F0EEF5] text-[13px] transition-colors duration-200 relative group"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F0EEF5] group-hover:w-full transition-all duration-200" />
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-[#9C99AD] hover:text-[#F0EEF5] text-[13px] transition-colors duration-200 relative group"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F0EEF5] group-hover:w-full transition-all duration-200" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#6D6A80] mb-4 font-body">
                Community
              </h4>
              <ul className="space-y-3">
                {communityLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[#9C99AD] hover:text-[#F0EEF5] text-[13px] transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F0EEF5] group-hover:w-full transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-[#252430]">
          <p className="text-[#6D6A80] text-[13px]">
            &copy; 2025 PromptForge AI. Open source under MIT License.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a
              href="https://github.com/promptforge-ai/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6D6A80] hover:text-[#F0EEF5] transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6D6A80] hover:text-[#F0EEF5] transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6D6A80] hover:text-[#F0EEF5] transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
