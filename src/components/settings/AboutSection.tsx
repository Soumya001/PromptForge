import { motion } from 'framer-motion';
import {
  Github,
  BookOpen,
  Bug,
  ScrollText,
  Star,
  GitFork,
  Users,
  ExternalLink,
  Heart,
} from 'lucide-react';

const contributors = [
  { name: 'Alex Chen', github: 'https://github.com' },
  { name: 'Sarah Kim', github: 'https://github.com' },
  { name: 'Jordan Lee', github: 'https://github.com' },
  { name: 'Maya Patel', github: 'https://github.com' },
  { name: 'Ryan Park', github: 'https://github.com' },
  { name: 'Taylor Swift', github: 'https://github.com' },
];

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'shadcn/ui', color: '#F0EEF5' },
  { name: 'Vite', color: '#646CFF' },
];

const links = [
  {
    icon: Github,
    label: 'Star on GitHub',
    href: 'https://github.com/promptforge/promptforge-ai',
  },
  {
    icon: BookOpen,
    label: 'Documentation',
    href: 'https://docs.promptforge.ai',
  },
  {
    icon: Bug,
    label: 'Report Issue',
    href: 'https://github.com/promptforge/promptforge-ai/issues',
  },
  {
    icon: ScrollText,
    label: 'Changelog',
    href: 'https://github.com/promptforge/promptforge-ai/blob/main/CHANGELOG.md',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const avatarColors = [
  'bg-[#8B5CF6]',
  'bg-[#06B6D4]',
  'bg-[#F472B6]',
  'bg-[#22C55E]',
  'bg-[#F59E0B]',
  'bg-[#EF4444]',
];

export default function AboutSection() {
  return (
    <div className="max-w-[480px] mx-auto">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="text-center mb-8"
      >
        {/* Animated Logo Glow */}
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] animate-pulse">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
              <path d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2 8.6 4.5 10 7 7.5 5.6zm12 0L17 7l1.4-2.5L17 2l2.5 1.4L22 2l-1.4 2.5L22 7l-2.5-1.4zM12 6l-2.5-1.4L12 3l2.5 1.6L12 6zm0 15l-2.5-1.4L12 18l2.5 1.6L12 21zm6-3l-2.5-1.4L18 15l2.5 1.6L18 18zM6 18l-2.5-1.4L6 15l2.5 1.6L6 18zM12 8c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>
        </div>

        {/* Wordmark */}
        <h2 className="text-[22px] font-display font-bold tracking-tight mb-1">
          <span className="text-[#F0EEF5]">PromptForge</span>{' '}
          <span className="text-[#8B5CF6]">AI</span>
        </h2>
        <p className="text-[12px] font-mono text-[#6D6A80]">v1.0.0</p>

        {/* Description */}
        <p className="mt-4 text-[15px] text-[#9C99AD] leading-relaxed max-w-[400px] mx-auto">
          PromptForge AI is an open-source prompt engineering platform that transforms
          simple chat messages into expertly crafted prompts using advanced AI techniques.
        </p>
      </motion.div>

      {/* Links Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {links.map(link => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              variants={itemVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 py-4 px-3 bg-[#0F0E14] border border-[#252430] rounded-xl hover:border-[#8B5CF6] hover:translate-y-[-2px] transition-all duration-200 group"
            >
              <Icon className="w-5 h-5 text-[#6D6A80] group-hover:text-[#8B5CF6] transition-colors" />
              <span className="text-[13px] font-display font-medium text-[#F0EEF5]">
                {link.label}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* GitHub Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center justify-center gap-6 mb-8 py-4 border-y border-[#252430]"
      >
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-[14px] font-mono font-semibold text-[#F0EEF5]">1.2k</span>
          <span className="text-[12px] text-[#6D6A80]">Stars</span>
        </div>
        <div className="w-px h-4 bg-[#252430]" />
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-[14px] font-mono font-semibold text-[#F0EEF5]">186</span>
          <span className="text-[12px] text-[#6D6A80]">Forks</span>
        </div>
        <div className="w-px h-4 bg-[#252430]" />
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#06B6D4]" />
          <span className="text-[14px] font-mono font-semibold text-[#F0EEF5]">24</span>
          <span className="text-[12px] text-[#6D6A80]">Contributors</span>
        </div>
      </motion.div>

      {/* Contributors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <h4 className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#8B5CF6] mb-4">
          Contributors
        </h4>
        <div className="flex items-center justify-center">
          <div className="flex -space-x-2">
            {contributors.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                className={`relative w-9 h-9 rounded-full ${avatarColors[i]} flex items-center justify-center border-2 border-[#08070B] hover:scale-110 hover:z-10 transition-transform duration-200`}
                title={c.name}
              >
                <span className="text-[11px] font-semibold text-white">
                  {c.name.charAt(0)}
                </span>
              </motion.a>
            ))}
          </div>
          <span className="ml-3 text-[12px] text-[#6D6A80]">
            +{contributors.length} contributors
          </span>
        </div>
      </motion.div>

      {/* Open Source */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center border-t border-[#252430] pt-6 mb-6"
      >
        <h4 className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#8B5CF6] mb-2">
          Open Source
        </h4>
        <p className="text-[14px] text-[#9C99AD] mb-2">
          Licensed under{' '}
          <a
            href="https://github.com/promptforge/promptforge-ai/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B5CF6] hover:text-[#A78BFA] hover:underline inline-flex items-center gap-1"
          >
            MIT License
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </motion.div>

      {/* Tech Stack Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-6"
      >
        {techStack.map(tech => (
          <span
            key={tech.name}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#16151D] text-[#9C99AD] border border-[#252430]"
            style={{ color: tech.color }}
          >
            {tech.name}
          </span>
        ))}
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t border-[#252430] pt-4"
      >
        <div className="text-center font-mono text-[11px] text-[#6D6A80] space-y-0.5">
          <p>App Version: 1.0.0</p>
          <p>Build: 2025.01.15</p>
          <p>Node: 20.x</p>
          <p>React: 19.x</p>
        </div>
      </motion.div>

      {/* Built with love */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-center mt-4 text-[12px] text-[#6D6A80] flex items-center justify-center gap-1"
      >
        Built with <Heart className="w-3 h-3 text-[#F472B6] fill-[#F472B6]" /> by the PromptForge team
      </motion.p>
    </div>
  );
}
