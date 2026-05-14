import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles,
  Layers,
  TrendingUp,
  GitBranch,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  Target,
  Zap,
  Star,
  GitFork,
  ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Easing ─── */
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
const easeSpring: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

/* ─── Animated counter hook ─── */
function useAnimatedCounter(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return value
}

/* ═══════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════ */
function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#08070B]">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-particles.png"
          alt=""
          className="w-full h-full object-cover opacity-40"
          style={{ transform: `scale(${1 + scrollY * 0.0005}) translateY(${-scrollY * 0.02}px)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08070B]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-[800px] mx-auto pt-24 pb-12">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
          className="font-display font-bold text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-[-0.03em] text-[#F0EEF5]"
        >
          Turn Simple Chat Into{' '}
          <span className="gradient-hero-text animate-gradient-shift bg-[length:200%_200%]">
            AI-Engineered
          </span>{' '}
          Prompts
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.6 }}
          className="mt-4 text-[17px] leading-[1.65] text-[#9C99AD] max-w-[640px] mx-auto font-body"
        >
          PromptForge transforms your casual messages into expertly crafted prompts using advanced
          engineering techniques — Chain-of-Thought, Few-Shot, Role Prompting, and more. Open source.
          Self-improving. Built for developers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: easeSpring, delay: 0.9 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <Link
            to="/forge"
            className="gradient-hero text-[#08070B] px-7 py-3.5 rounded-lg font-semibold text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Launch PromptForge
          </Link>
          <a
            href="https://github.com/promptforge-ai/promptforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 bg-[#16151D] border border-[#3A3852] rounded-lg text-[#F0EEF5] font-semibold text-base hover:bg-[#1E1D26] hover:border-[#8B5CF6] transition-all duration-200"
          >
            <Star className="w-4 h-4" />
            Star on GitHub
          </a>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 1.2 }}
          className="mt-12 relative mx-auto max-w-[900px]"
        >
          <div
            className="relative rounded-xl border border-[#252430] overflow-hidden shadow-glow-lg"
            style={{ perspective: '1200px' }}
          >
            <div style={{ transform: 'rotateX(8deg) rotateY(-2deg)' }} className="animate-float">
              <img
                src="/hero-dashboard-mock.png"
                alt="PromptForge Dashboard"
                className="w-full h-auto"
              />
            </div>
            {/* Glow border overlay */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.2))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 200 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-[#6D6A80] animate-scroll-bounce" />
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════
   TECH MARQUEE SECTION
   ═══════════════════════════════════ */
const techItems = [
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'OpenAI API',
  'Claude API',
  'Framer Motion',
  'Recharts',
  'Vite',
  'Node.js',
]

function TechMarquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.5 }}
      className="bg-[#0F0E14] border-y border-[#252430] overflow-hidden h-20 flex items-center"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...techItems, ...techItems].map((tech, i) => (
          <span key={i} className="flex items-center mx-8">
            <span className="text-[13px] font-mono text-[#6D6A80]">{tech}</span>
            <span className="ml-8 text-[#3A3852]">·</span>
          </span>
        ))}
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════ */
const features = [
  {
    icon: Sparkles,
    iconColor: '#8B5CF6',
    title: 'Smart Prompt Transformation',
    description:
      'Type naturally. PromptForge analyzes your message and automatically applies the best combination of engineering techniques — Chain-of-Thought, Few-Shot, Role Prompting, Context Injection, Output Formatting, and Meta-Prompting.',
    image: '/feature-prompt-transform.png',
  },
  {
    icon: Layers,
    iconColor: '#06B6D4',
    title: 'Six Engineering Techniques',
    description:
      'Choose from Chain-of-Thought reasoning, Few-Shot examples, Role Prompting, Context Injection, Output Formatting, and Meta-Prompting. Let AI auto-select the optimal combination or manually curate your approach.',
    image: '/feature-techniques.png',
  },
  {
    icon: TrendingUp,
    iconColor: '#22C55E',
    title: 'Self-Improvement Engine',
    description:
      'PromptForge learns from every interaction. Track prompt effectiveness scores, technique usage analytics, and improvement trends over time. The system continuously refines its transformation strategies based on feedback.',
    image: '/feature-analytics.png',
  },
  {
    icon: GitBranch,
    iconColor: '#F472B6',
    title: 'Open Source & Extensible',
    description:
      'Built for the community. Add custom techniques, contribute templates, integrate your own LLM providers. MIT licensed. The entire codebase is designed to be forked, extended, and improved by developers like you.',
    image: '/feature-open-source.png',
    showNpm: true,
  },
]

function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="features" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#08070B]">
      <div className="max-w-[1280px] mx-auto" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#8B5CF6] font-body"
          >
            FEATURES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="mt-3 font-display font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-[#F0EEF5]"
          >
            Everything You Need to
            <br />
            Engineer Perfect Prompts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 text-[17px] leading-[1.65] text-[#9C99AD] max-w-[560px] mx-auto font-body"
          >
            Six advanced techniques, a template library, and a self-improving engine — all in one
            open-source tool.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 + i * 0.12 }}
                className="glow-card p-6 group hover:-translate-y-1 transition-all duration-250"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${feature.iconColor}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feature.iconColor }} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-[#F0EEF5]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-[1.6] text-[#9C99AD] mb-4 font-body">
                  {feature.description}
                </p>
                {'showNpm' in feature && feature.showNpm && (
                  <div className="mb-4 px-3 py-2 bg-[#16151D] rounded-lg border border-[#252430] font-mono text-[11px] text-[#6D6A80]">
                    npm install promptforge-ai
                  </div>
                )}
                <div className="overflow-hidden rounded-lg border border-[#252430]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════
   HOW IT WORKS SECTION
   ═══════════════════════════════════ */
const steps = [
  {
    number: '01',
    color: '#8B5CF6',
    title: 'Write Your Message',
    description:
      'Just type what you want — like you\'re texting a friend. No special syntax, no complex formatting. "Help me write a Python script to scrape a website."',
    placeholder: 'Write a blog post about AI...',
  },
  {
    number: '02',
    color: '#06B6D4',
    title: 'AI Engineers Your Prompt',
    description:
      'PromptForge analyzes your intent and applies the optimal combination of techniques. It structures reasoning chains, injects relevant context, formats output requirements, and wraps everything in a professional prompt.',
    badges: ['CoT', 'FS', 'RP'],
  },
  {
    number: '03',
    color: '#22C55E',
    title: 'Copy & Use Instantly',
    description:
      'Your enhanced prompt is ready to paste into ChatGPT, Claude, or any LLM. Copy it, save it to your library, or provide feedback to help the system learn and improve future transformations.',
  },
]

function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="how-it-works"
      className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-[#08070B] relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%)' }}
      />
      <div className="max-w-[1280px] mx-auto relative" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#06B6D4] font-body"
          >
            HOW IT WORKS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="mt-3 font-display font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-[#F0EEF5]"
          >
            From Message to Masterpiece
            <br />
            in Three Steps
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines - desktop */}
          <div className="hidden md:block absolute top-16 left-[33%] right-[33%] h-0.5">
            <div className="w-full h-full border-t-2 border-dashed" style={{ borderColor: '#8B5CF640' }} />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 + i * 0.2 }}
              className="relative"
            >
              <span
                className="font-display font-semibold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] opacity-50"
                style={{ color: step.color }}
              >
                {step.number}
              </span>
              <h3 className="mt-3 font-display font-semibold text-2xl text-[#F0EEF5]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#9C99AD] font-body">
                {step.description}
              </p>

              {/* Step visual */}
              {step.placeholder && (
                <div className="mt-4 p-4 bg-[#16151D] border border-[#3A3852] rounded-lg">
                  <span className="text-[#6D6A80] text-sm">{step.placeholder}</span>
                  <div
                    className="mt-2 h-1 rounded-full w-2/3"
                    style={{ background: `linear-gradient(90deg, ${step.color}40, transparent)` }}
                  />
                </div>
              )}

              {step.badges && (
                <div className="mt-4 flex gap-2">
                  {step.badges.map((badge, j) => (
                    <motion.span
                      key={badge}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, ease: easeSpring, delay: 0.6 + j * 0.15 }}
                      className="px-3 py-1 rounded-md text-xs font-mono font-medium border"
                      style={{
                        backgroundColor: `${step.color}15`,
                        color: step.color,
                        borderColor: `${step.color}30`,
                      }}
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              )}

              {!step.placeholder && !step.badges && (
                <div className="mt-4 p-4 bg-[#08070B] border border-[#252430] rounded-lg font-mono text-[11px] text-[#9C99AD] leading-relaxed">
                  <span className="text-[#8B5CF6]">[ROLE]</span> Expert Python Developer
                  <br />
                  <span className="text-[#06B6D4]">[TASK]</span> Create a scraping script
                  <br />
                  <span className="text-[#22C55E]">[FORMAT]</span> Production-ready code
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════
   DEMO SECTION
   ═══════════════════════════════════ */
const demoOutput = `[ROLE] You are an expert Python developer 
specializing in web scraping and data extraction.

[TASK] Create a Python script that scrapes 
website data following best practices.

[REQUIREMENTS]
- Use requests + BeautifulSoup4
- Include proper error handling
- Add rate limiting (1 req/sec)
- Respect robots.txt
- Output structured JSON

[OUTPUT FORMAT]
Provide complete, production-ready code with 
comments and a usage example.`

const techniqueTags = [
  { label: 'Role Prompting', color: '#8B5CF6' },
  { label: 'Context Injection', color: '#06B6D4' },
  { label: 'Output Formatting', color: '#22C55E' },
]

function DemoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(demoOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="demo" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-[#08070B]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="max-w-[1000px] mx-auto bg-[#0F0E14] rounded-2xl border border-[#252430] overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)' }}
      >
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display font-semibold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-[#F0EEF5]">
              Try It Now
            </h2>
            <p className="mt-2 text-[15px] text-[#9C99AD] font-body">
              Type a simple message and see the magic happen.
            </p>
          </div>

          {/* Demo Interface */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            {/* Left Panel */}
            <div>
              <label className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#6D6A80] font-body mb-2 block">
                Your Message
              </label>
              <div className="bg-[#16151D] border border-[#3A3852] rounded-lg p-4 min-h-[200px]">
                <p className="text-[15px] text-[#F0EEF5] font-body leading-relaxed">
                  help me write a python script to scrape a website
                </p>
              </div>
              <p className="mt-2 text-[13px] text-[#06B6D4] font-body">Type your own &rarr;</p>
            </div>

            {/* Center Arrow */}
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#2A2933] flex items-center justify-center animate-pulse-glow">
                <ArrowRight className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>

            {/* Right Panel */}
            <div className="relative">
              <label className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#6D6A80] font-body mb-2 block">
                Enhanced Prompt
              </label>
              <div className="bg-[#08070B] border border-[#252430] rounded-lg p-4 min-h-[200px] relative">
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-[#1E1D26] text-[#6D6A80] hover:text-[#F0EEF5] transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-[11px] font-mono leading-relaxed text-[#9C99AD] whitespace-pre-wrap">
                  {demoOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* Technique Tags */}
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-[13px] text-[#6D6A80] mr-2">Auto-selected:</span>
            {techniqueTags.map((tag, i) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, ease: easeSpring, delay: 0.5 + i * 0.2 }}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium border"
                style={{
                  backgroundColor: `${tag.color}15`,
                  color: tag.color,
                  borderColor: `${tag.color}30`,
                }}
              >
                {tag.label}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════
   TEMPLATES PREVIEW SECTION
   ═══════════════════════════════════ */
const templateCards = [
  {
    image: '/template-coding.png',
    category: 'Development',
    title: 'Expert Code Generator',
    description: 'Generate production-ready code with proper structure, comments, and error handling.',
    techniques: ['Role', 'CoT', 'Format'],
    uses: '1.2k uses',
  },
  {
    image: '/template-writing.png',
    category: 'Writing',
    title: 'Technical Blog Post',
    description: 'Create well-structured technical articles with proper headings, examples, and SEO optimization.',
    techniques: ['Context', 'Format', 'CoT'],
    uses: '856 uses',
  },
  {
    image: '/template-analysis.png',
    category: 'Analysis',
    title: 'Data Analyst Prompt',
    description: 'Analyze datasets, generate insights, and produce visualizations with statistical rigor.',
    techniques: ['Few-Shot', 'CoT', 'Format'],
    uses: '2.1k uses',
  },
  {
    image: '/template-creative.png',
    category: 'Creative',
    title: 'Creative Story Generator',
    description: 'Generate compelling narratives with character development, plot structure, and vivid descriptions.',
    techniques: ['Role', 'Context', 'Format'],
    uses: '643 uses',
  },
]

function TemplatesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="templates-preview" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#08070B]">
      <div className="max-w-[1280px] mx-auto" ref={ref}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#F472B6] font-body"
            >
              TEMPLATE LIBRARY
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
              className="mt-3 font-display font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-[#F0EEF5]"
            >
              Battle-Tested Templates
              <br />
              for Every Use Case
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 text-[17px] leading-[1.65] text-[#9C99AD] max-w-[600px] font-body"
            >
              Start with proven templates crafted by prompt engineers. Copy, customize, and save
              your favorites.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/templates"
              className="text-[#8B5CF6] hover:text-[#A78BFA] text-[15px] font-body inline-flex items-center gap-1 group mt-4 sm:mt-0"
            >
              Browse All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templateCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 + i * 0.1 }}
              className="group bg-[#0F0E14] border border-[#252430] rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-glow transition-all duration-250"
            >
              {/* Thumbnail */}
              <div className="h-40 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[11px] font-medium border mb-2"
                  style={{
                    backgroundColor: 'rgba(6,182,212,0.12)',
                    color: '#22D3EE',
                    borderColor: 'rgba(6,182,212,0.25)',
                  }}
                >
                  {card.category}
                </span>
                <h3 className="font-display font-medium text-base text-[#F0EEF5] mb-1">
                  {card.title}
                </h3>
                <p className="text-[13px] text-[#9C99AD] leading-[1.55] mb-3 font-body line-clamp-2">
                  {card.description}
                </p>

                {/* Techniques */}
                <div className="flex gap-1 mb-3">
                  {card.techniques.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#16151D] text-[#6D6A80] border border-[#252430]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#6D6A80]">{card.uses}</span>
                  <button className="p-1.5 rounded-md hover:bg-[#1E1D26] text-[#6D6A80] hover:text-[#F0EEF5] transition-all">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════
   ANALYTICS PREVIEW SECTION
   ═══════════════════════════════════ */
const metrics = [
  { label: 'Effectiveness Score', value: 94.2, suffix: '%', trend: '12%', icon: Target, color: '#8B5CF6' },
  { label: 'Prompts Enhanced', value: 1247, suffix: '', trend: '28%', icon: Zap, color: '#06B6D4' },
  { label: 'Avg. Improvement', value: 3.4, suffix: 'x', trend: '0.8x', icon: TrendingUp, color: '#22C55E' },
]

function MetricCard({ metric, index, inView }: { metric: typeof metrics[0]; index: number; inView: boolean }) {
  const animatedValue = useAnimatedCounter(metric.value, 1200, inView)
  const Icon = metric.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 * index }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${metric.color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: metric.color }} />
        </div>
        <span className="text-[13px] text-[#9C99AD] font-body">{metric.label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display font-semibold text-[clamp(28px,3vw,40px)] leading-[1.15] text-[#F0EEF5]">
          {metric.suffix === '%'
            ? animatedValue.toFixed(1)
            : metric.suffix === 'x'
            ? animatedValue.toFixed(1)
            : Math.round(animatedValue)}
          {metric.suffix}
        </span>
        <span className="text-[13px] text-[#22C55E] font-body flex items-center">
          <ArrowUpRight className="w-3 h-3" /> {metric.trend}
        </span>
      </div>
    </motion.div>
  )
}

function AnalyticsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  // SVG chart data
  const chartData = [
    { month: 'Jan', effectiveness: 45, diversity: 30 },
    { month: 'Feb', effectiveness: 55, diversity: 38 },
    { month: 'Mar', effectiveness: 62, diversity: 48 },
    { month: 'Apr', effectiveness: 72, diversity: 55 },
    { month: 'May', effectiveness: 85, diversity: 62 },
    { month: 'Jun', effectiveness: 94, diversity: 75 },
  ]

  const maxY = 100
  const chartHeight = 200
  const chartWidth = 600
  const padding = { left: 40, bottom: 30 }

  const toX = (i: number) => padding.left + (i / (chartData.length - 1)) * (chartWidth - padding.left - 20)
  const toY = (v: number) => chartHeight - padding.bottom - (v / maxY) * (chartHeight - padding.bottom - 20)

  const effPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.effectiveness)}`).join(' ')
  const divPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.diversity)}`).join(' ')

  return (
    <section
      id="analytics-preview"
      className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0F0E14]"
      style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)' }}
    >
      <div className="max-w-[1280px] mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#22C55E] font-body"
          >
            ANALYTICS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="mt-3 font-display font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-[#F0EEF5]"
          >
            Watch Your Prompts
            <br />
            Get Better Over Time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-[17px] leading-[1.65] text-[#9C99AD] max-w-[560px] mx-auto font-body"
          >
            Track effectiveness scores, technique performance, and improvement trends. The more you
            use PromptForge, the smarter it gets.
          </motion.p>
        </div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} inView={inView} />
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#08070B] border border-[#252430] rounded-xl p-6"
        >
          <h4 className="font-display font-medium text-base text-[#F0EEF5] mb-4">
            Prompt Effectiveness Over Time
          </h4>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto"
              style={{ minWidth: '400px' }}
            >
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((tick) => (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={toY(tick)}
                    x2={chartWidth - 20}
                    y2={toY(tick)}
                    stroke="#252430"
                    strokeWidth={1}
                  />
                  <text x={padding.left - 8} y={toY(tick) + 4} fill="#6D6A80" fontSize={10} textAnchor="end">
                    {tick}%
                  </text>
                </g>
              ))}

              {/* X axis labels */}
              {chartData.map((d, i) => (
                <text key={d.month} x={toX(i)} y={chartHeight - 5} fill="#6D6A80" fontSize={10} textAnchor="middle">
                  {d.month}
                </text>
              ))}

              {/* Effectiveness line (purple) */}
              <motion.path
                d={effPath}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, ease: easeOutExpo, delay: 0.8 }}
              />

              {/* Diversity line (cyan) */}
              <motion.path
                d={divPath}
                fill="none"
                stroke="#06B6D4"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, ease: easeOutExpo, delay: 1.0 }}
              />

              {/* Data points */}
              {chartData.map((d, i) => (
                <g key={`points-${i}`}>
                  <circle cx={toX(i)} cy={toY(d.effectiveness)} r={4} fill="#8B5CF6" />
                  <circle cx={toX(i)} cy={toY(d.diversity)} r={4} fill="#06B6D4" />
                </g>
              ))}

              {/* Legend */}
              <g transform={`translate(${chartWidth - 180}, 15)`}>
                <circle cx={0} cy={0} r={4} fill="#8B5CF6" />
                <text x={10} y={4} fill="#9C99AD" fontSize={11}>
                  Effectiveness
                </text>
                <circle cx={90} cy={0} r={4} fill="#06B6D4" />
                <text x={100} y={4} fill="#9C99AD" fontSize={11}>
                  Technique Diversity
                </text>
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════
   OPEN SOURCE CTA SECTION
   ═══════════════════════════════════ */
const stats = [
  { value: 2400, label: 'GitHub Stars' },
  { value: 380, label: 'Forks' },
  { value: 47, label: 'Contributors' },
]

function OpenSourceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift bg-[length:200%_200%]"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #F472B6 100%)',
        }}
      />

      <div className="max-w-[700px] mx-auto text-center relative z-10" ref={ref}>
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="font-display font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-[#08070B]"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
        >
          Built for Developers,
          <br />
          by Developers
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-4 text-[17px] leading-[1.65] text-[#08070B]/85 max-w-[560px] mx-auto font-body"
        >
          PromptForge AI is open source under the MIT license. Star the repo, fork it, add your own
          techniques, and help us build the future of prompt engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: easeSpring, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href="https://github.com/promptforge-ai/promptforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-[#08070B] font-semibold text-sm hover:bg-white/30 transition-all duration-200"
          >
            <Star className="w-4 h-4" />
            Star on GitHub
          </a>
          <a
            href="https://github.com/promptforge-ai/promptforge/fork"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-[#08070B] font-semibold text-sm hover:bg-white/30 transition-all duration-200"
          >
            <GitFork className="w-4 h-4" />
            Fork & Contribute
          </a>
        </motion.div>

        {/* Stats */}
        <div className="mt-10 flex items-center justify-center gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedStat({
  stat,
  index,
  inView,
}: {
  stat: { value: number; label: string }
  index: number
  inView: boolean
}) {
  const animatedValue = useAnimatedCounter(stat.value, 1500, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
      className={`text-center ${index > 0 ? 'border-l border-[#08070B]/20 pl-8 md:pl-12' : ''}`}
    >
      <div className="font-display font-semibold text-[clamp(28px,3vw,40px)] leading-[1.15] text-[#08070B]">
        {stat.value >= 1000 ? `${(animatedValue / 1000).toFixed(1)}k` : Math.round(animatedValue)}
      </div>
      <div className="text-[13px] text-[#08070B]/60 font-body">{stat.label}</div>
    </motion.div>
  )
}

/* ═══════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════ */
export default function Home() {
  return (
    <div className="bg-[#08070B]">
      <Navbar />
      <HeroSection />
      <TechMarquee />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <TemplatesSection />
      <AnalyticsSection />
      <OpenSourceSection />
      <Footer />
    </div>
  )
}
