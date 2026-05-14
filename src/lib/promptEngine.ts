/**
 * Prompt Engineering Engine
 * Mock AI enhancement engine that transforms simple user messages
 * into expertly crafted prompts using selected techniques.
 */

export type Technique =
  | 'chain-of-thought'
  | 'few-shot'
  | 'role-prompting'
  | 'context-injection'
  | 'output-formatting'
  | 'meta-prompting';

export interface TechniqueConfig {
  id: Technique;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  description: string;
}

export const TECHNIQUE_CONFIGS: Record<Technique, TechniqueConfig> = {
  'chain-of-thought': {
    id: 'chain-of-thought',
    name: 'Chain-of-Thought',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.15)',
    textColor: '#A78BFA',
    borderColor: 'rgba(139,92,246,0.3)',
    description: 'Break down reasoning into step-by-step thinking process',
  },
  'few-shot': {
    id: 'few-shot',
    name: 'Few-Shot',
    color: '#06B6D4',
    bgColor: 'rgba(6,182,212,0.15)',
    textColor: '#22D3EE',
    borderColor: 'rgba(6,182,212,0.3)',
    description: 'Provide examples to guide the desired output format',
  },
  'role-prompting': {
    id: 'role-prompting',
    name: 'Role Prompting',
    color: '#F472B6',
    bgColor: 'rgba(244,114,182,0.15)',
    textColor: '#F9A8D4',
    borderColor: 'rgba(244,114,182,0.3)',
    description: 'Assign a specific expert persona to the AI',
  },
  'context-injection': {
    id: 'context-injection',
    name: 'Context Injection',
    color: '#22C55E',
    bgColor: 'rgba(34,197,94,0.15)',
    textColor: '#4ADE80',
    borderColor: 'rgba(34,197,94,0.3)',
    description: 'Add relevant background information and constraints',
  },
  'output-formatting': {
    id: 'output-formatting',
    name: 'Output Formatting',
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.15)',
    textColor: '#FBBF24',
    borderColor: 'rgba(245,158,11,0.3)',
    description: 'Specify the exact structure and format for output',
  },
  'meta-prompting': {
    id: 'meta-prompting',
    name: 'Meta-Prompting',
    color: '#EC4899',
    bgColor: 'rgba(236,72,153,0.15)',
    textColor: '#F472B6',
    borderColor: 'rgba(236,72,153,0.3)',
    description: 'Instruct the AI to optimize and refine its own prompt',
  },
};

export const ALL_TECHNIQUES: Technique[] = [
  'chain-of-thought',
  'few-shot',
  'role-prompting',
  'context-injection',
  'output-formatting',
  'meta-prompting',
];

export interface Template {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  content: string;
  techniques: Technique[];
}

export const TEMPLATES: Template[] = [
  // Coding
  {
    id: 'expert-code-generator',
    name: 'Expert Code Generator',
    category: 'Coding',
    categoryColor: '#8B5CF6',
    content: 'Write a clean, well-documented function that [describe functionality]. Include error handling, type hints, and a brief usage example.',
    techniques: ['role-prompting', 'few-shot', 'output-formatting'],
  },
  {
    id: 'bug-fix-assistant',
    name: 'Bug Fix Assistant',
    category: 'Coding',
    categoryColor: '#8B5CF6',
    content: 'I have a bug in my code. Here is the code:\n[ paste code ]\n\nThe expected behavior is: [describe]\nThe actual behavior is: [describe]\n\nHelp me identify and fix the bug.',
    techniques: ['chain-of-thought', 'context-injection'],
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    category: 'Coding',
    categoryColor: '#8B5CF6',
    content: 'Review the following code for best practices, performance optimizations, security issues, and readability improvements:\n[ paste code ]',
    techniques: ['role-prompting', 'chain-of-thought', 'output-formatting'],
  },
  {
    id: 'api-designer',
    name: 'API Designer',
    category: 'Coding',
    categoryColor: '#8B5CF6',
    content: 'Design a RESTful API endpoint for [describe resource]. Include HTTP methods, request/response schemas, error codes, and authentication requirements.',
    techniques: ['role-prompting', 'few-shot', 'output-formatting'],
  },
  {
    id: 'test-writer',
    name: 'Test Writer',
    category: 'Coding',
    categoryColor: '#8B5CF6',
    content: 'Write comprehensive unit tests for the following function. Include edge cases, error scenarios, and happy path tests:\n[ paste code ]',
    techniques: ['few-shot', 'output-formatting', 'context-injection'],
  },
  // Writing
  {
    id: 'technical-blog-post',
    name: 'Technical Blog Post',
    category: 'Writing',
    categoryColor: '#06B6D4',
    content: 'Write a technical blog post about [topic]. Target audience: [developers/engineers/managers]. Tone: [professional but approachable]. Include code examples and practical takeaways.',
    techniques: ['role-prompting', 'chain-of-thought', 'output-formatting'],
  },
  {
    id: 'email-composer',
    name: 'Email Composer',
    category: 'Writing',
    categoryColor: '#06B6D4',
    content: 'Write a professional email to [recipient] about [subject]. Tone: [formal/friendly/urgent]. Key points to include: [list points].',
    techniques: ['role-prompting', 'context-injection'],
  },
  {
    id: 'documentation-writer',
    name: 'Documentation Writer',
    category: 'Writing',
    categoryColor: '#06B6D4',
    content: 'Write clear technical documentation for [product/feature]. Include installation instructions, usage examples, configuration options, and troubleshooting.',
    techniques: ['role-prompting', 'output-formatting', 'few-shot'],
  },
  {
    id: 'social-media-content',
    name: 'Social Media Content',
    category: 'Writing',
    categoryColor: '#06B6D4',
    content: 'Create engaging social media posts about [topic] for [platform]. Include relevant hashtags, hooks, and a call-to-action.',
    techniques: ['few-shot', 'output-formatting'],
  },
  // Analysis
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Analysis',
    categoryColor: '#22C55E',
    content: 'Analyze the following dataset and provide insights:\n[ describe or paste data ]\n\nFocus on: trends, anomalies, correlations, and actionable recommendations.',
    techniques: ['chain-of-thought', 'context-injection', 'output-formatting'],
  },
  {
    id: 'sql-query-builder',
    name: 'SQL Query Builder',
    category: 'Analysis',
    categoryColor: '#22C55E',
    content: 'Write an optimized SQL query to [describe goal]. Schema:\n[ describe tables and columns ]\n\nRequirements: [list requirements]',
    techniques: ['few-shot', 'output-formatting'],
  },
  {
    id: 'research-summarizer',
    name: 'Research Summarizer',
    category: 'Analysis',
    categoryColor: '#22C55E',
    content: 'Summarize the following research/text into key findings. Provide a brief overview, main conclusions, methodology notes, and implications.\n\n[ paste content ]',
    techniques: ['chain-of-thought', 'output-formatting'],
  },
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis',
    category: 'Analysis',
    categoryColor: '#22C55E',
    content: 'Conduct a SWOT analysis for [subject]. Identify Strengths, Weaknesses, Opportunities, and Threats with specific examples for each.',
    techniques: ['chain-of-thought', 'role-prompting', 'output-formatting'],
  },
  // Creative
  {
    id: 'story-generator',
    name: 'Story Generator',
    category: 'Creative',
    categoryColor: '#F472B6',
    content: 'Write a creative short story with the following elements:\n- Genre: [genre]\n- Theme: [theme]\n- Characters: [character descriptions]\n- Setting: [setting]\n- Length: [word count]',
    techniques: ['role-prompting', 'few-shot', 'context-injection'],
  },
  {
    id: 'character-creator',
    name: 'Character Creator',
    category: 'Creative',
    categoryColor: '#F472B6',
    content: 'Create a detailed character profile including: name, background, personality traits, motivations, strengths, flaws, and relationships. Setting: [describe world/universe].',
    techniques: ['role-prompting', 'output-formatting'],
  },
  {
    id: 'world-builder',
    name: 'World Builder',
    category: 'Creative',
    categoryColor: '#F472B6',
    content: 'Design a detailed fictional world with: geography, history, cultures, political systems, magic/technology rules, and notable locations. Genre: [genre].',
    techniques: ['role-prompting', 'chain-of-thought', 'output-formatting'],
  },
  {
    id: 'poem-composer',
    name: 'Poem Composer',
    category: 'Creative',
    categoryColor: '#F472B6',
    content: 'Write an original poem about [subject] in [form: sonnet/haiku/free verse/etc.]. Tone: [tone]. Include vivid imagery and metaphor.',
    techniques: ['few-shot', 'role-prompting'],
  },
  // Business
  {
    id: 'pitch-deck-creator',
    name: 'Pitch Deck Creator',
    category: 'Business',
    categoryColor: '#F59E0B',
    content: 'Create an outline for a pitch deck for [company/product]. Include: problem, solution, market size, business model, traction, team, and ask.',
    techniques: ['output-formatting', 'few-shot', 'chain-of-thought'],
  },
  {
    id: 'meeting-summarizer',
    name: 'Meeting Summarizer',
    category: 'Business',
    categoryColor: '#F59E0B',
    content: 'Summarize this meeting transcript into: key decisions, action items with owners and deadlines, open questions, and key discussion points.\n\n[ paste transcript ]',
    techniques: ['chain-of-thought', 'output-formatting'],
  },
  {
    id: 'project-planner',
    name: 'Project Planner',
    category: 'Business',
    categoryColor: '#F59E0B',
    content: 'Create a project plan for [project name]. Include: objectives, milestones, timeline, resource requirements, risks, and success metrics.',
    techniques: ['output-formatting', 'chain-of-thought', 'context-injection'],
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Analysis',
    category: 'Business',
    categoryColor: '#F59E0B',
    content: 'Conduct a competitive analysis of [company/product] vs [competitors]. Include: feature comparison, pricing, strengths/weaknesses, market positioning, and recommendations.',
    techniques: ['chain-of-thought', 'role-prompting', 'output-formatting'],
  },
];

export const TEMPLATE_CATEGORIES = ['All', 'Coding', 'Writing', 'Analysis', 'Creative', 'Business'];

export interface EnhancementResult {
  enhancedPrompt: string;
  appliedTechniques: Technique[];
  qualityScore: number;
  tokenEstimate: number;
  processingTime: number;
}

export interface HistoryEntry {
  id: string;
  original: string;
  enhanced: string;
  techniques: Technique[];
  qualityScore: number;
  timestamp: number;
  templateName?: string;
}

// Auto-detect which techniques should be applied based on content
function autoDetectTechniques(input: string): Technique[] {
  const detected: Technique[] = [];
  const lower = input.toLowerCase();

  // Chain-of-thought: reasoning, analysis, complex problems
  if (
    lower.includes('analyze') ||
    lower.includes('explain') ||
    lower.includes('why') ||
    lower.includes('how to') ||
    lower.includes('compare') ||
    lower.includes('review') ||
    lower.includes('debug') ||
    lower.includes('fix')
  ) {
    detected.push('chain-of-thought');
  }

  // Few-shot: examples, formats, styles
  if (
    lower.includes('example') ||
    lower.includes('like') ||
    lower.includes('similar to') ||
    lower.includes('format') ||
    lower.includes('style of') ||
    lower.includes('in the style')
  ) {
    detected.push('few-shot');
  }

  // Role prompting: persona, expert, act as
  if (
    lower.includes('expert') ||
    lower.includes('act as') ||
    lower.includes('professional') ||
    lower.includes('specialist') ||
    lower.includes('you are')
  ) {
    detected.push('role-prompting');
  }

  // Context injection: context, background, given
  if (
    lower.includes('context') ||
    lower.includes('background') ||
    lower.includes('given') ||
    lower.includes('using') ||
    lower.includes('based on') ||
    lower.includes('for a') ||
    lower.includes('targeting')
  ) {
    detected.push('context-injection');
  }

  // Output formatting: table, json, markdown, list
  if (
    lower.includes('table') ||
    lower.includes('json') ||
    lower.includes('markdown') ||
    lower.includes('list') ||
    lower.includes('bullet') ||
    lower.includes('format') ||
    lower.includes('structure')
  ) {
    detected.push('output-formatting');
  }

  // Meta-prompting: optimize, improve, refine
  if (
    lower.includes('optimize') ||
    lower.includes('improve') ||
    lower.includes('refine') ||
    lower.includes('better') ||
    lower.includes('best')
  ) {
    detected.push('meta-prompting');
  }

  // Default: always add at least 2 techniques
  if (detected.length === 0) {
    detected.push('chain-of-thought', 'role-prompting');
  }

  if (detected.length === 1) {
    detected.push('output-formatting');
  }

  return detected;
}

// Build role context for role-prompting technique
function buildRoleContext(input: string): string {
  const lower = input.toLowerCase();
  let role = 'an expert AI assistant';

  if (lower.includes('code') || lower.includes('function') || lower.includes('programming') || lower.includes('debug')) {
    role = 'a senior software engineer with 10+ years of experience';
  } else if (lower.includes('write') || lower.includes('blog') || lower.includes('article') || lower.includes('essay')) {
    role = 'a professional technical writer and content strategist';
  } else if (lower.includes('data') || lower.includes('analysis') || lower.includes('sql') || lower.includes('analytics')) {
    role = 'a senior data analyst and business intelligence expert';
  } else if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) {
    role = 'a senior UX/UI designer with expertise in design systems';
  } else if (lower.includes('business') || lower.includes('strategy') || lower.includes('marketing')) {
    role = 'a strategic business consultant and market analyst';
  } else if (lower.includes('story') || lower.includes('creative') || lower.includes('poem') || lower.includes('character')) {
    role = 'a creative writer and storytelling expert';
  } else if (lower.includes('test') || lower.includes('qa') || lower.includes('quality')) {
    role = 'a QA engineering lead with expertise in test automation';
  } else if (lower.includes('api') || lower.includes('architecture') || lower.includes('system')) {
    role = 'a principal software architect specializing in distributed systems';
  }

  return `[ROLE]\nYou are ${role}. Approach this task with deep domain expertise, best practices, and attention to detail.\n`;
}

// Build chain-of-thought instructions
function buildCoTInstructions(): string {
  return `\n[REASONING APPROACH]\nThink through this step-by-step:\n1. First, understand the core requirements and constraints\n2. Break down the problem into manageable components\n3. Apply relevant domain knowledge and best practices\n4. Consider edge cases and potential issues\n5. Synthesize your analysis into a comprehensive solution\n`;
}

// Build few-shot examples
function buildFewShotExamples(input: string): string {
  const lower = input.toLowerCase();
  let examples = '';

  if (lower.includes('code') || lower.includes('function')) {
    examples = `\n[EXAMPLES]\nHere is an example of the expected quality and style:\n\nInput: "Write a function to reverse a string"\nOutput:\n\`\`\`python\ndef reverse_string(s: str) -> str:\n    """Reverse a string efficiently.\n    \n    Args:\n        s: The input string to reverse\n        \n    Returns:\n        The reversed string\n        \n    Example:\n        >>> reverse_string("hello")\n        "olleh"\n    """\n    return s[::-1]\n\`\`\`\n`;
  } else if (lower.includes('write') || lower.includes('blog')) {
    examples = `\n[EXAMPLES]\nHere is an example of the expected writing style:\n\nTopic: "Introduction to React Hooks"\nOutput: A well-structured article with a compelling hook, clear explanations with code examples, practical use cases, and actionable takeaways for the reader.\n`;
  } else {
    examples = `\n[EXAMPLES]\nHere is an example of the expected approach:\n\nInput: "Explain recursion"\nOutput: A clear explanation that starts with a simple analogy, builds up to the technical definition, provides a concrete code example, discusses base cases, and mentions common pitfalls.\n`;
  }

  return examples;
}

// Build context injection
function buildContextInjection(_input: string): string {
  return `\n[CONTEXT & CONSTRAINTS]\n- The user is looking for a high-quality, production-ready output\n- Consider modern best practices and industry standards\n- Tailor the response to be comprehensive yet concise\n- Assume the user has intermediate to advanced knowledge unless specified otherwise\n- Prioritize clarity, correctness, and practical applicability\n`;
}

// Build output formatting instructions
function buildOutputFormatting(input: string): string {
  const lower = input.toLowerCase();
  let format = `\n[OUTPUT FORMAT]\nPlease structure your response with:\n- Clear section headers for organization\n- Code blocks with syntax highlighting where applicable\n- Bullet points for lists and key takeaways\n- Bold text for important concepts\n- A brief summary at the end\n`;

  if (lower.includes('table') || lower.includes('compare')) {
    format += '- Include comparison tables where appropriate\n';
  }
  if (lower.includes('json')) {
    format += '- Provide output in valid JSON format with proper schema\n';
  }
  if (lower.includes('steps') || lower.includes('guide') || lower.includes('how to')) {
    format += '- Use numbered steps for procedural content\n';
  }

  return format;
}

// Build meta-prompting instructions
function buildMetaPrompting(): string {
  return `\n[SELF-OPTIMIZATION]\nBefore providing your final response:\n1. Review your answer for completeness and accuracy\n2. Ensure all requirements from the original request are addressed\n3. Verify that examples and code are correct and runnable\n4. Optimize for clarity and eliminate any redundancy\n5. Add any relevant warnings, caveats, or best practice notes\n`;
}

// Calculate quality score based on applied techniques
function calculateQualityScore(
  techniques: Technique[],
  originalLength: number,
  enhancedLength: number
): number {
  let score = 50; // Base score

  // Each technique adds points
  score += techniques.length * 8;

  // Bonus for technique diversity
  if (techniques.includes('chain-of-thought')) score += 5;
  if (techniques.includes('role-prompting')) score += 5;
  if (techniques.includes('output-formatting')) score += 5;

  // Length factor: enhanced should be longer (more detailed)
  if (enhancedLength > originalLength * 2) score += 5;

  // Cap at 98 (nobody is perfect)
  return Math.min(98, Math.max(60, score));
}

// Estimate token count (rough approximation)
function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

/**
 * Main enhancement function - transforms a simple user message into
 * an expertly engineered prompt using selected techniques.
 */
export function enhancePrompt(
  input: string,
  selectedTechniques: Technique[],
  autoMode: boolean
): EnhancementResult {
  const startTime = performance.now();

  // Determine techniques to apply
  let techniques = autoMode ? autoDetectTechniques(input) : selectedTechniques;

  // If auto mode and no techniques detected, fall back to all
  if (autoMode && techniques.length === 0) {
    techniques = ['chain-of-thought', 'role-prompting'];
  }

  // Build the enhanced prompt section by section
  const sections: string[] = [];

  // Start with a meta instruction
  sections.push(`# Optimized Prompt\n\nBelow is your enhanced prompt, engineered with ${techniques.length} advanced techniques for maximum effectiveness:\n`);

  // Apply role prompting
  if (techniques.includes('role-prompting')) {
    sections.push(buildRoleContext(input));
  }

  // Apply context injection
  if (techniques.includes('context-injection')) {
    sections.push(buildContextInjection(input));
  }

  // Apply chain-of-thought
  if (techniques.includes('chain-of-thought')) {
    sections.push(buildCoTInstructions());
  }

  // Apply few-shot
  if (techniques.includes('few-shot')) {
    sections.push(buildFewShotExamples(input));
  }

  // Original task (rephrased)
  sections.push(`\n[TASK]\n${input.trim()}\n`);

  // Apply output formatting
  if (techniques.includes('output-formatting')) {
    sections.push(buildOutputFormatting(input));
  }

  // Apply meta-prompting
  if (techniques.includes('meta-prompting')) {
    sections.push(buildMetaPrompting());
  }

  // Add a closing instruction
  sections.push(`\n---\n**Note:** This prompt has been engineered for optimal AI performance. Each section above serves a specific purpose in guiding the AI toward a high-quality, structured response.`);

  const enhancedPrompt = sections.join('\n');
  const processingTime = Math.round(performance.now() - startTime);

  return {
    enhancedPrompt,
    appliedTechniques: techniques,
    qualityScore: calculateQualityScore(techniques, input.length, enhancedPrompt.length),
    tokenEstimate: estimateTokens(enhancedPrompt),
    processingTime,
  };
}

/**
 * Create a diff view showing what was added/changed
 */
export function generateDiff(
  original: string,
  enhanced: string
): { type: 'added' | 'removed' | 'unchanged'; text: string }[] {
  const diff: { type: 'added' | 'removed' | 'unchanged'; text: string }[] = [];

  // Mark original as removed (conceptually, it's being replaced)
  if (original.trim()) {
    diff.push({ type: 'removed', text: original.trim() });
  }

  // Split enhanced into sections
  const sections = enhanced.split('\n');
  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) {
      diff.push({ type: 'unchanged', text: '' });
      continue;
    }

    // Check if this line is part of the original task
    if (original.trim() && trimmed.includes(original.trim().slice(0, 30))) {
      diff.push({ type: 'unchanged', text: section });
    } else if (
      trimmed.startsWith('#') ||
      trimmed.startsWith('[') ||
      trimmed.startsWith('**Note:**') ||
      trimmed.startsWith('---')
    ) {
      diff.push({ type: 'added', text: section });
    } else if (
      trimmed.startsWith('1.') ||
      trimmed.startsWith('2.') ||
      trimmed.startsWith('3.') ||
      trimmed.startsWith('4.') ||
      trimmed.startsWith('5.') ||
      trimmed.startsWith('- ') ||
      trimmed.startsWith('•')
    ) {
      diff.push({ type: 'added', text: section });
    } else {
      diff.push({ type: 'added', text: section });
    }
  }

  return diff;
}
