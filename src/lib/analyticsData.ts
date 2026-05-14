// Helper to generate last N days of dates
function getDates(days: number): string[] {
  const dates: string[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

const dates30 = getDates(30)
const dates90 = getDates(90)

// Generate realistic trend data with some noise
function generateTrend(
  days: number,
  startValue: number,
  endValue: number,
  noise: number = 2
): number[] {
  const values: number[] = []
  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1)
    const base = startValue + (endValue - startValue) * progress
    const n = (Math.random() - 0.5) * noise * 2
    values.push(Math.round((base + n) * 10) / 10)
  }
  return values
}

// 30-day effectiveness data
const effectivenessValues = generateTrend(30, 72, 94, 2.5)
const techniqueDiversityValues = generateTrend(30, 2.1, 3.6, 0.3)
const feedbackScoreValues = generateTrend(30, 3.8, 4.7, 0.2)

export interface DailyMetrics {
  date: string
  effectiveness: number
  techniqueDiversity: number
  feedbackScore: number
  promptsEnhanced: number
  activeTechniques: number
}

export const dailyMetrics30: DailyMetrics[] = dates30.map((date, i) => ({
  date,
  effectiveness: effectivenessValues[i],
  techniqueDiversity: Math.round(techniqueDiversityValues[i] * 10) / 10,
  feedbackScore: Math.round(feedbackScoreValues[i] * 10) / 10,
  promptsEnhanced: Math.floor(40 + i * 1.5 + Math.random() * 15),
  activeTechniques: Math.floor(4 + i * 0.05),
}))

export const dailyMetrics7: DailyMetrics[] = dailyMetrics30.slice(-7)
export const dailyMetrics90: DailyMetrics[] = dates90.map((date, i) => {
  const progress = i / 89
  return {
    date,
    effectiveness: Math.round((60 + 35 * progress + (Math.random() - 0.5) * 5) * 10) / 10,
    techniqueDiversity: Math.round((1.5 + 2.2 * progress + (Math.random() - 0.5) * 0.5) * 10) / 10,
    feedbackScore: Math.round((3.0 + 1.8 * progress + (Math.random() - 0.5) * 0.4) * 10) / 10,
    promptsEnhanced: Math.floor(20 + i * 0.8 + Math.random() * 10),
    activeTechniques: Math.floor(3 + Math.min(i * 0.02, 3)),
  }
})

export interface KPIData {
  label: string
  value: number
  suffix: string
  trend: number
  trendLabel: string
  icon: string
  iconColor: string
  sparklineColor: string
}

export const kpiData: KPIData[] = [
  {
    label: 'Effectiveness Score',
    value: 94.2,
    suffix: '%',
    trend: 12,
    trendLabel: 'vs last period',
    icon: 'Target',
    iconColor: '#8B5CF6',
    sparklineColor: '#8B5CF6',
  },
  {
    label: 'Prompts Enhanced',
    value: 1247,
    suffix: '',
    trend: 28,
    trendLabel: 'vs last period',
    icon: 'Zap',
    iconColor: '#06B6D4',
    sparklineColor: '#06B6D4',
  },
  {
    label: 'Avg. Improvement',
    value: 3.4,
    suffix: 'x',
    trend: 0.8,
    trendLabel: 'vs last period',
    icon: 'TrendingUp',
    iconColor: '#22C55E',
    sparklineColor: '#22C55E',
  },
  {
    label: 'Feedback Score',
    value: 4.6,
    suffix: '/5',
    trend: 0.3,
    trendLabel: 'vs last period',
    icon: 'Star',
    iconColor: '#F59E0B',
    sparklineColor: '#F59E0B',
  },
]

export interface TechniquePerformance {
  name: string
  current: number
  previous: number
  usagePercent: number
  color: string
}

export const techniquePerformanceData: TechniquePerformance[] = [
  { name: 'Chain-of-Thought', current: 92, previous: 78, usagePercent: 94, color: '#8B5CF6' },
  { name: 'Role Prompting', current: 88, previous: 82, usagePercent: 87, color: '#F472B6' },
  { name: 'Output Formatting', current: 86, previous: 79, usagePercent: 82, color: '#F59E0B' },
  { name: 'Context Injection', current: 90, previous: 75, usagePercent: 76, color: '#22C55E' },
  { name: 'Few-Shot', current: 85, previous: 80, usagePercent: 71, color: '#06B6D4' },
  { name: 'Meta-Prompting', current: 83, previous: 70, usagePercent: 68, color: '#EC4899' },
]

export interface RadarDimension {
  subject: string
  current: number
  previous: number
  fullMark: number
}

export const radarData: RadarDimension[] = [
  { subject: 'Chain-of-Thought', current: 92, previous: 78, fullMark: 100 },
  { subject: 'Few-Shot', current: 85, previous: 80, fullMark: 100 },
  { subject: 'Role Prompting', current: 88, previous: 82, fullMark: 100 },
  { subject: 'Context Injection', current: 90, previous: 75, fullMark: 100 },
  { subject: 'Output Formatting', current: 86, previous: 79, fullMark: 100 },
  { subject: 'Meta-Prompting', current: 83, previous: 70, fullMark: 100 },
]

export interface FeedbackEntry {
  id: string
  originalPrompt: string
  enhancedPrompt: string
  techniquesUsed: string[]
  qualityScore: number
  userRating: number
  date: string
  dateLabel: string
}

const feedbackEntries: FeedbackEntry[] = [
  {
    id: '1',
    originalPrompt: 'write a python function to sort a list',
    enhancedPrompt: 'You are an expert Python developer. Write a type-safe, documented sorting function that handles edge cases including empty lists, duplicates, and mixed types. Include time/space complexity analysis.',
    techniquesUsed: ['Role', 'CoT', 'Format'],
    qualityScore: 96,
    userRating: 5,
    date: dates30[29],
    dateLabel: '2h ago',
  },
  {
    id: '2',
    originalPrompt: 'help me analyze sales data',
    enhancedPrompt: '[ROLE] Senior Data Analyst with 10+ years experience. [TASK] Perform comprehensive sales data analysis including trend identification, seasonal decomposition, and growth forecasting. [FORMAT] Deliver findings as executive summary + detailed appendix.',
    techniquesUsed: ['Role', 'CoT', 'Context'],
    qualityScore: 89,
    userRating: 4,
    date: dates30[28],
    dateLabel: '5h ago',
  },
  {
    id: '3',
    originalPrompt: 'write a blog post about AI',
    enhancedPrompt: 'As a world-class technical writer, create an engaging blog post about AI advancement. Structure: Hook with a surprising statistic, explain concepts through analogies, include expert quotes, add a practical "try this yourself" section, and end with a thought-provoking question.',
    techniquesUsed: ['Role', 'Context', 'Format'],
    qualityScore: 94,
    userRating: 5,
    date: dates30[27],
    dateLabel: '8h ago',
  },
  {
    id: '4',
    originalPrompt: 'write an email to my boss',
    enhancedPrompt: '[CONTEXT: Requesting 2-week deadline extension on Project Alpha due to newly discovered technical debt] Write a professional, solution-oriented email that: acknowledges the original deadline, explains the blocker transparently, proposes the new timeline with milestones, and offers a mitigation plan.',
    techniquesUsed: ['Context', 'Format'],
    qualityScore: 72,
    userRating: 3,
    date: dates30[26],
    dateLabel: '1d ago',
  },
  {
    id: '5',
    originalPrompt: 'design an api for my app',
    enhancedPrompt: '[CONTEXT: E-commerce platform serving 10k+ daily active users] Design a RESTful API following OpenAPI 3.0 spec. Include: authentication (JWT), rate limiting headers, pagination, filtering, error response schemas, and complete request/response examples for all CRUD operations.',
    techniquesUsed: ['Role', 'CoT', 'Context', 'Format'],
    qualityScore: 98,
    userRating: 5,
    date: dates30[25],
    dateLabel: '1d ago',
  },
  {
    id: '6',
    originalPrompt: 'create a story about a robot',
    enhancedPrompt: '[ROLE: Award-winning sci-fi author] Write a 2000-word narrative about a maintenance robot on a generation ship that discovers evidence of a stowaway. Build tension through sensory details. End with an ambiguous moral choice that leaves the reader questioning consciousness and duty.',
    techniquesUsed: ['Role', 'Context', 'CoT'],
    qualityScore: 85,
    userRating: 4,
    date: dates30[24],
    dateLabel: '2d ago',
  },
  {
    id: '7',
    originalPrompt: 'summarize this research paper',
    enhancedPrompt: '[ROLE: Research analyst] Provide a structured academic summary including: Problem Statement, Key Contributions (3-5), Methodology, Key Results with statistical significance, Strengths, Limitations, and implications for Future Research. Include proper citation format.',
    techniquesUsed: ['Role', 'Format'],
    qualityScore: 91,
    userRating: 5,
    date: dates30[23],
    dateLabel: '2d ago',
  },
  {
    id: '8',
    originalPrompt: 'help me debug my react app',
    enhancedPrompt: '[ROLE: React performance specialist] Systematically debug the described React application using this methodology: 1) Identify the symptoms 2) Check for unnecessary re-renders 3) Verify state management patterns 4) Review dependency arrays 5) Profile with React DevTools 6) Provide corrected code with explanations for each fix.',
    techniquesUsed: ['Role', 'CoT'],
    qualityScore: 88,
    userRating: 4,
    date: dates30[22],
    dateLabel: '3d ago',
  },
  {
    id: '9',
    originalPrompt: 'write test cases for login',
    enhancedPrompt: '[ROLE: QA Automation Expert] Generate comprehensive test cases for user authentication covering: Happy Path (valid login), Input Validation (empty fields, special chars, SQL injection), Security (brute force protection, session management), Edge Cases (concurrent logins, timeout), and Cross-browser compatibility. Include Gherkin syntax.',
    techniquesUsed: ['Role', 'Format', 'CoT'],
    qualityScore: 95,
    userRating: 5,
    date: dates30[21],
    dateLabel: '3d ago',
  },
  {
    id: '10',
    originalPrompt: 'plan my startup launch',
    enhancedPrompt: '[CONTEXT: Pre-seed SaaS startup, 4-person team, $500K raised] Create a detailed 90-day launch plan with: Week-by-week milestones, Resource allocation, Go-to-market strategy, Risk register with mitigations, Success metrics (KPIs), and Stakeholder communication cadence. Format as professional project plan.',
    techniquesUsed: ['Context', 'Format', 'CoT'],
    qualityScore: 93,
    userRating: 5,
    date: dates30[20],
    dateLabel: '4d ago',
  },
  {
    id: '11',
    originalPrompt: 'make a swot analysis for netflix',
    enhancedPrompt: 'As a McKinsey strategy consultant, perform a comprehensive SWOT analysis of Netflix. Consider: Strengths (original content, global reach, recommendation engine), Weaknesses (debt load, password sharing losses), Opportunities (gaming, live events, ads tier), Threats (competition, content costs, regulation). Include strategic implications and recommended actions.',
    techniquesUsed: ['Role', 'Context', 'Format'],
    qualityScore: 90,
    userRating: 4,
    date: dates30[19],
    dateLabel: '5d ago',
  },
  {
    id: '12',
    originalPrompt: 'write a sql query for user stats',
    enhancedPrompt: '[ROLE: Database Performance Expert] Write an optimized SQL query for user analytics with: Proper indexing strategy, Efficient JOINs, Window functions for rolling calculations, CTEs for readability, and Execution plan considerations. Include query explanation and performance benchmarks.',
    techniquesUsed: ['Role', 'CoT', 'Format'],
    qualityScore: 97,
    userRating: 5,
    date: dates30[18],
    dateLabel: '5d ago',
  },
  {
    id: '13',
    originalPrompt: 'create a character for my dnd game',
    enhancedPrompt: '[ROLE: Professional character designer] Create a detailed D&D 5e character with: Compelling backstory with plot hooks, Personality traits/flaws/bonds, Optimized stat array with rationale, Equipment with backstory significance, Character art description, and Roleplay tips. Make the character feel alive and ready for any campaign.',
    techniquesUsed: ['Role', 'Format'],
    qualityScore: 87,
    userRating: 4,
    date: dates30[17],
    dateLabel: '6d ago',
  },
  {
    id: '14',
    originalPrompt: 'help me write documentation for my api',
    enhancedPrompt: 'As a Developer Experience specialist, create API documentation following these principles: Start with a 30-second quickstart, Use interactive code examples in 3 languages, Document every parameter with type/enum/default, Include common error responses with fixes, Add a changelog section. Follow OpenAPI 3.0 specification.',
    techniquesUsed: ['Role', 'Format'],
    qualityScore: 92,
    userRating: 5,
    date: dates30[16],
    dateLabel: '1w ago',
  },
  {
    id: '15',
    originalPrompt: 'write a meeting summary from this transcript',
    enhancedPrompt: '[ROLE: Executive Assistant] Analyze the meeting transcript and produce: Key Decisions made (with rationale), Action Items table (Owner/Due/Priority), Discussion topics summary, Blockers identified with mitigation plans, and Next Steps. Use professional business format.',
    techniquesUsed: ['Role', 'Format'],
    qualityScore: 86,
    userRating: 4,
    date: dates30[15],
    dateLabel: '1w ago',
  },
]

export { feedbackEntries }

export interface TimelineEvent {
  id: string
  date: string
  dateLabel: string
  type: 'milestone' | 'improvement' | 'feature'
  title: string
  description: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: dates30[29],
    dateLabel: 'Today',
    type: 'milestone',
    title: '94.2% Effectiveness Reached',
    description: 'System reached new all-time high effectiveness score across all prompt categories.',
  },
  {
    id: '2',
    date: dates30[26],
    dateLabel: '3 days ago',
    type: 'improvement',
    title: 'Context Injection Optimized',
    description: 'Improved context relevance detection accuracy by 18% through enhanced semantic matching.',
  },
  {
    id: '3',
    date: dates30[22],
    dateLabel: '1 week ago',
    type: 'feature',
    title: 'Meta-Prompting Added',
    description: 'Added 6th technique — Meta-Prompting for recursive prompt self-improvement and optimization.',
  },
  {
    id: '4',
    date: dates30[15],
    dateLabel: '2 weeks ago',
    type: 'improvement',
    title: 'Few-Shot Examples Enhanced',
    description: 'Template library integration provides better curated examples for few-shot prompting.',
  },
  {
    id: '5',
    date: dates30[8],
    dateLabel: '3 weeks ago',
    type: 'milestone',
    title: '1,000 Prompts Enhanced',
    description: 'Reached 1,000 total prompts processed through the enhancement pipeline.',
  },
  {
    id: '6',
    date: dates30[1],
    dateLabel: '1 month ago',
    type: 'feature',
    title: 'Feedback Loop Enabled',
    description: 'User feedback system activated for continuous model improvement and technique optimization.',
  },
  {
    id: '7',
    date: dates30[0],
    dateLabel: '6 weeks ago',
    type: 'feature',
    title: 'Analytics Dashboard Launched',
    description: 'Real-time metrics and performance tracking system deployed for monitoring prompt effectiveness.',
  },
]

export interface AIInsight {
  id: string
  type: 'positive' | 'warning' | 'info'
  title: string
  description: string
  color: string
}

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    type: 'positive',
    title: 'Chain-of-Thought is your top performer',
    description: 'CoT technique shows 92% effectiveness — 9% above the average. Consider applying it to more prompts, especially in coding and analysis categories.',
    color: '#22C55E',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Meta-Prompting needs attention',
    description: 'MP scores are 10% below the overall average at 83%. Review template quality and example coverage for this technique.',
    color: '#F59E0B',
  },
  {
    id: '3',
    type: 'positive',
    title: 'Technique diversity is improving',
    description: 'Average techniques per prompt increased from 2.1 to 3.6 over 30 days — a 71% improvement in prompting sophistication.',
    color: '#22C55E',
  },
  {
    id: '4',
    type: 'positive',
    title: 'User satisfaction trending up',
    description: 'Feedback scores improved from 3.8 to 4.7 over the tracking period. Keep up the great work with enhanced prompt quality!',
    color: '#22C55E',
  },
]

// Sparkline data for KPI cards
export const sparklineData: Record<string, number[]> = {
  'Effectiveness Score': generateTrend(20, 80, 95, 2),
  'Prompts Enhanced': generateTrend(20, 20, 65, 8),
  'Avg. Improvement': generateTrend(20, 2.5, 3.5, 0.3),
  'Feedback Score': generateTrend(20, 4.0, 4.7, 0.15),
}

export type DateRange = '7' | '30' | '90' | 'all'

export function getMetricsForRange(range: DateRange): DailyMetrics[] {
  switch (range) {
    case '7':
      return dailyMetrics7
    case '30':
      return dailyMetrics30
    case '90':
      return dailyMetrics90
    default:
      return dailyMetrics30
  }
}
