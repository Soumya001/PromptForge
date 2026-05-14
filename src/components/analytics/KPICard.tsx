import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  Zap,
  TrendingUp,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

const iconMap: Record<string, FC<{ className?: string }>> = {
  Target,
  Zap,
  TrendingUp,
  Star,
}

interface KPICardProps {
  label: string
  value: number
  suffix: string
  trend: number
  trendLabel: string
  icon: string
  iconColor: string
  sparklineData: number[]
  index: number
}

function AnimatedCounter({
  value,
  suffix,
  delay,
}: {
  value: number
  suffix: string
  delay: number
}) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    const duration = 1200
    const startTime = performance.now()
    const startVal = 0

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = startVal + (value - startVal) * eased
      setDisplay(current)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [started, value])

  const formatted =
    value % 1 !== 0
      ? display.toFixed(1)
      : Math.floor(display).toLocaleString()

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  )
}

function MiniSparkline({
  data,
  color,
  delay,
}: {
  data: number[]
  color: string
  delay: number
}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  if (!data.length) return null

  const w = 80
  const h = 36
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const areaD = `${pathD} L ${w},${h} L 0,${h} Z`

  return (
    <svg
      width={w}
      height={h}
      className="flex-shrink-0"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}
    >
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={areaD}
        fill={`url(#spark-${color.replace('#', '')})`}
      />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: visible ? 0 : 300,
          transition: 'stroke-dashoffset 1s ease-out',
        }}
      />
    </svg>
  )
}

const KPICard: FC<KPICardProps> = ({
  label,
  value,
  suffix,
  trend,
  trendLabel,
  icon,
  iconColor,
  sparklineData,
  index,
}) => {
  const Icon = iconMap[icon] || Target
  const isPositive = trend >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="bg-[#0F0E14] border border-[#252430] rounded-xl p-4 hover:border-[#3A3852] transition-colors duration-200"
      style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <div style={{ color: iconColor }}><Icon className="w-[18px] h-[18px]" /></div>
          </div>

          {/* Label */}
          <p className="text-[13px] text-[#6D6A80] mb-1">{label}</p>

          {/* Value */}
          <div
            className="text-[clamp(28px,3vw,36px)] font-semibold text-[#F0EEF5] font-display leading-tight mb-1"
          >
            <AnimatedCounter value={value} suffix={suffix} delay={index * 150 + 200} />
          </div>

          {/* Trend */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.6, duration: 0.3 }}
            className="flex items-center gap-1"
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-[#22C55E]" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-[#EF4444]" />
            )}
            <span
              className={`text-[13px] font-medium ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}
            >
              {isPositive ? '+' : ''}
              {trend}%
            </span>
            <span className="text-[11px] text-[#6D6A80]">{trendLabel}</span>
          </motion.div>
        </div>

        {/* Sparkline */}
        <MiniSparkline
          data={sparklineData}
          color={iconColor}
          delay={index * 100 + 800}
        />
      </div>
    </motion.div>
  )
}

export default KPICard
