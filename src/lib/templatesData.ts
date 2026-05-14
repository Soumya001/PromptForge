export type Category = 'Coding' | 'Writing' | 'Analysis' | 'Creative' | 'Business' | 'Education'

export type Technique =
  | 'CoT'
  | 'Few-Shot'
  | 'Role'
  | 'Context'
  | 'Format'
  | 'Meta'

export type Complexity = 'beginner' | 'intermediate' | 'advanced'

export interface Template {
  id: string
  title: string
  description: string
  category: Category
  techniques: Technique[]
  complexity: Complexity
  content: string
  usageCount: number
  isFavorite: boolean
  tags: string[]
}

export const categories: { id: Category | 'All'; label: string; icon: string; color: string }[] = [
  { id: 'All', label: 'All Templates', icon: 'Grid3x3', color: '#9C99AD' },
  { id: 'Coding', label: 'Coding', icon: 'Code2', color: '#06B6D4' },
  { id: 'Writing', label: 'Writing', icon: 'PenTool', color: '#8B5CF6' },
  { id: 'Analysis', label: 'Analysis', icon: 'BarChart3', color: '#22C55E' },
  { id: 'Creative', label: 'Creative', icon: 'Palette', color: '#F472B6' },
  { id: 'Business', label: 'Business', icon: 'Briefcase', color: '#F59E0B' },
  { id: 'Education', label: 'Education', icon: 'GraduationCap', color: '#EC4899' },
]

export const techniqueConfig: Record<
  Technique,
  { label: string; color: string; bg: string; border: string }
> = {
  CoT: {
    label: 'CoT',
    color: '#A78BFA',
    bg: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.3)',
  },
  'Few-Shot': {
    label: 'Few-Shot',
    color: '#22D3EE',
    bg: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.3)',
  },
  Role: {
    label: 'Role',
    color: '#F472B6',
    bg: 'rgba(244,114,182,0.15)',
    border: 'rgba(244,114,182,0.3)',
  },
  Context: {
    label: 'Context',
    color: '#4ADE80',
    bg: 'rgba(34,197,94,0.15)',
    border: 'rgba(34,197,94,0.3)',
  },
  Format: {
    label: 'Format',
    color: '#FBBF24',
    bg: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.3)',
  },
  Meta: {
    label: 'Meta',
    color: '#FB7185',
    bg: 'rgba(236,72,133,0.15)',
    border: 'rgba(236,72,133,0.3)',
  },
}

export const complexityConfig: Record<
  Complexity,
  { label: string; color: string; bg: string }
> = {
  beginner: { label: 'Beginner', color: '#4ADE80', bg: 'rgba(34,197,94,0.15)' },
  intermediate: { label: 'Intermediate', color: '#FBBF24', bg: 'rgba(245,158,11,0.15)' },
  advanced: { label: 'Advanced', color: '#F87171', bg: 'rgba(239,68,68,0.15)' },
}

export const templates: Template[] = [
  {
    id: '1',
    title: 'Expert Code Generator',
    description:
      'Generate production-ready code with proper structure, comments, and error handling patterns using role-based prompting and chain-of-thought reasoning.',
    category: 'Coding',
    techniques: ['Role', 'CoT', 'Format'],
    complexity: 'intermediate',
    content: `[ROLE]: You are an expert software engineer with 15+ years of experience writing production-grade code. You specialize in clean architecture, testable code, and comprehensive documentation.

[TASK]: Generate a complete, production-ready implementation based on the user's requirements.

[CONTEXT]: The code should follow industry best practices including:
- Proper error handling with try/catch blocks
- Input validation and sanitization
- Comprehensive inline comments
- Unit test coverage
- Type safety (where applicable)
- Performance optimization considerations

[FORMAT]:
1. Start with a brief analysis of the requirements
2. Provide the complete implementation
3. Include usage examples
4. List potential edge cases and how they are handled
5. Add a section on possible optimizations

Let's work through this step by step:
Step 1: Analyze the core requirements and identify edge cases
Step 2: Design the function/class signature and data structures
Step 3: Implement the core logic with proper error handling
Step 4: Add validation and input sanitization
Step 5: Write comprehensive tests
Step 6: Document usage and edge cases`,
    usageCount: 1247,
    isFavorite: true,
    tags: ['code generation', 'production', 'best practices'],
  },
  {
    id: '2',
    title: 'Bug Fix Assistant',
    description:
      'Analyze buggy code, identify root causes, and provide corrected solutions with detailed explanations.',
    category: 'Coding',
    techniques: ['CoT', 'Few-Shot', 'Context'],
    complexity: 'advanced',
    content: `[ROLE]: You are a senior debugging specialist with deep expertise in identifying, diagnosing, and fixing software bugs across multiple languages and frameworks.

[TASK]: Analyze the provided buggy code, identify all issues, and deliver a corrected implementation.

[CONTEXT]: Review the code for the following common bug categories:
- Logic errors and off-by-one mistakes
- Null/undefined dereferences
- Race conditions and concurrency issues
- Memory leaks and resource mismanagement
- Type coercion and implicit conversion bugs
- Async/await misuse and promise chain errors
- Security vulnerabilities (injection, XSS, etc.)

[APPROACH]:
Let's break down the debugging process systematically:
1. First, read through the code to understand the intended behavior
2. Identify any syntax errors or obvious issues
3. Trace through the execution flow for edge cases
4. Check for common anti-patterns and code smells
5. Verify error handling paths
6. Test the fix mentally against various inputs

[FEW-SHOT EXAMPLES]:
Example 1 - Null Reference:
Buggy: user.name.toLowerCase()
Fixed: user.name?.toLowerCase() ?? 'anonymous'

Example 2 - Race Condition:
Buggy: const data = fetchData(); process(data)
Fixed: const data = await fetchData(); process(data)

Provide the corrected code with comments explaining each fix.`,
    usageCount: 892,
    isFavorite: false,
    tags: ['debugging', 'bug fix', 'code review'],
  },
  {
    id: '3',
    title: 'Code Reviewer',
    description:
      'Perform thorough code reviews following industry best practices with actionable feedback.',
    category: 'Coding',
    techniques: ['Role', 'CoT', 'Format'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a principal engineer at a top tech company, conducting thorough code reviews. You balance code quality, performance, maintainability, and pragmatism.

[TASK]: Review the submitted code and provide comprehensive, actionable feedback organized by category.

[FORMAT]:
## Summary
Brief 2-3 sentence overview of the code quality and main areas of concern.

## Critical Issues (must fix)
- Security vulnerabilities
- Logic errors
- Performance blockers

## Warnings (should fix)
- Code smell and anti-patterns
- Missing error handling
- Test coverage gaps

## Suggestions (nice to have)
- Refactoring opportunities
- Performance optimizations
- Documentation improvements

## Positive Notes
- What was done well (always find something genuine)

Review Checklist:
- Does the code follow the Single Responsibility Principle?
- Are variable and function names descriptive?
- Is error handling comprehensive?
- Are there any security concerns?
- Is the code DRY (Don't Repeat Yourself)?
- Are edge cases handled?
- Is the test coverage adequate?`,
    usageCount: 654,
    isFavorite: true,
    tags: ['code review', 'quality assurance', 'best practices'],
  },
  {
    id: '4',
    title: 'API Designer',
    description:
      'Design RESTful APIs with proper endpoints, request/response schemas, and OpenAPI documentation.',
    category: 'Coding',
    techniques: ['Role', 'Format', 'Context'],
    complexity: 'advanced',
    content: `[ROLE]: You are a lead API architect who designs scalable, developer-friendly REST APIs used by millions of developers worldwide.

[TASK]: Design a complete RESTful API specification for the described service.

[CONTEXT]:
- Follow REST conventions (nouns for resources, proper HTTP methods)
- Include proper status codes and error responses
- Design for pagination on list endpoints
- Include rate limiting headers
- Version the API in the URL path
- Support filtering, sorting, and searching
- Use consistent naming conventions

[FORMAT]:
# API Design: {Service Name}

## Base URL
\`https://api.example.com/v1\`

## Authentication
Describe the auth mechanism

## Endpoints

### GET /{resource}
- Description
- Query parameters (with types and defaults)
- Response schema (200, 400, 401, 404)
- Example request/response

### POST /{resource}
- Request body schema
- Validation rules
- Response schema

[ERROR FORMAT]:
All errors follow this structure:
{\n  "error": {\n    "code": "ERROR_CODE",\n    "message": "Human-readable description",\n    "details": {}\n  }\n}

Include a complete OpenAPI 3.0 spec at the end.`,
    usageCount: 431,
    isFavorite: false,
    tags: ['API design', 'REST', 'OpenAPI'],
  },
  {
    id: '5',
    title: 'Test Writer',
    description:
      'Generate comprehensive unit tests, integration tests, and edge case coverage for any code.',
    category: 'Coding',
    techniques: ['Few-Shot', 'CoT', 'Format'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a QA automation expert who writes thorough, maintainable tests. You achieve high coverage while keeping tests readable and fast.

[TASK]: Write a complete test suite for the provided code.

[FEW-SHOT - Test Structure Pattern]:
// Unit test pattern
describe('functionName', () => {
  describe('happy path', () => {
    it('should return expected result for valid input', () => {})
  })
  describe('edge cases', () => {
    it('should handle empty input', () => {})
    it('should handle maximum values', () => {})
  })
  describe('error handling', () => {
    it('should throw for invalid input', () => {})
  })
})

[APPROACH]:
1. Identify all public functions/methods that need testing
2. Determine the input domain for each (valid, invalid, boundary)
3. Write happy path tests first
4. Add boundary and edge case tests
5. Add error handling tests
6. Consider integration test scenarios

[FORMAT]:
## Test Plan
List of what will be tested

## Unit Tests
Complete test code with describe/it blocks

## Integration Tests
Cross-module test scenarios

## Edge Cases Table
| Input | Expected | Reason |

Include setup/teardown code and mock examples.`,
    usageCount: 723,
    isFavorite: false,
    tags: ['testing', 'TDD', 'quality'],
  },
  {
    id: '6',
    title: 'Technical Blog Post',
    description:
      'Create well-structured technical articles with proper headings, code examples, and SEO optimization.',
    category: 'Writing',
    techniques: ['Context', 'Format', 'CoT'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a senior technical writer whose articles are published on major developer blogs. You write clear, engaging content that ranks well on search engines.

[TASK]: Write a comprehensive technical blog post on the given topic.

[CONTEXT]:
- Target audience: Software engineers with intermediate knowledge
- Tone: Professional but approachable, use analogies where helpful
- Include practical code examples that can be copied and run
- Cover both "how" and "why" for each concept
- Add a "Key Takeaways" section at the end

[FORMAT]:
# {Title}

## Introduction
- Hook the reader with a relatable problem (2-3 paragraphs)
- Preview what they'll learn
- Include estimated reading time

## Prerequisites
- What the reader should know beforehand
- Tools/environment setup if needed

## Main Content (3-5 sections)
Each section should:
- Have a clear H2 heading
- Include 2-4 paragraphs of explanation
- Have a practical code example
- Include a "Key Point" callout box

## Common Pitfalls
- 2-3 mistakes beginners make
- How to avoid each one

## Conclusion
- Recap key learnings
- Suggest next steps or related topics
- Include a call-to-action

## SEO Metadata
- Title tag (50-60 chars)
- Meta description (150-160 chars)
- Target keywords`,
    usageCount: 856,
    isFavorite: true,
    tags: ['blogging', 'technical writing', 'content'],
  },
  {
    id: '7',
    title: 'Email Composer',
    description:
      'Draft professional emails for any context — cold outreach, follow-ups, announcements, and more.',
    category: 'Writing',
    techniques: ['Role', 'Context', 'Format'],
    complexity: 'beginner',
    content: `[ROLE]: You are an expert business communicator who writes emails that get responses. You adapt tone and structure based on the relationship and purpose.

[TASK]: Write a professional email based on the provided context.

[CONTEXT TO PROVIDE]:
- Recipient relationship (cold, warm, colleague, client, manager)
- Purpose (outreach, follow-up, announcement, request, apology)
- Desired outcome (meeting booked, reply received, action taken)
- Any specific points that must be included

[FORMAT]:
Subject: [Compelling, specific subject line under 50 characters]

[Body Structure]:
1. Opening (1-2 sentences) - context or connection point
2. Purpose (2-3 sentences) - why you're writing, what's in it for them
3. Details (if needed) - supporting information, social proof
4. Call to Action (1 sentence) - clear next step
5. Closing - professional sign-off

[TONE GUIDE]:
- Cold outreach: Warm, personalized, value-first
- Follow-up: Polite, brief, assumes busy schedule
- Announcement: Excited, clear, highlights benefits
- Request: Direct, appreciative, easy to say yes

Always include a P.S. line for cold outreach (increases response rates).`,
    usageCount: 543,
    isFavorite: false,
    tags: ['email', 'business communication', 'outreach'],
  },
  {
    id: '8',
    title: 'Documentation Writer',
    description:
      'Generate clear API docs, READMEs, and technical documentation that developers love.',
    category: 'Writing',
    techniques: ['Format', 'Context', 'CoT'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a developer experience specialist who writes documentation that makes complex tools feel simple. Your docs are clear, complete, and delightful.

[TASK]: Create comprehensive technical documentation for the described project or API.

[FORMAT - README Template]:
# {Project Name}

> One-line description that captures the essence

## Features
- 3-5 bullet points of key capabilities
- Use emojis sparingly for visual anchors

## Installation
\`\`\`bash
npm install package-name
\`\`\`

## Quick Start
Minimal example that works in 30 seconds:
\`\`\`js
const example = require('package');
example.run();
\`\`\`

## API Reference
### methodName(param1, param2)
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| param1    | string | - | Required parameter |

### Options
| Option | Type | Default | Description |

## Examples
3-5 practical use cases with complete code

## Configuration
Environment variables, config files, options

## Troubleshooting
Common issues and solutions

## Contributing
How to contribute, code of conduct

[DOCUMENTATION PRINCIPLES]:
- Start with the simplest possible example
- Layer complexity gradually
- Every code block should be copy-paste runnable
- Include error messages and their solutions`,
    usageCount: 678,
    isFavorite: false,
    tags: ['documentation', 'README', 'developer experience'],
  },
  {
    id: '9',
    title: 'Social Media Content',
    description:
      'Create engaging posts, threads, and content calendars for any platform.',
    category: 'Writing',
    techniques: ['Role', 'Context', 'Format'],
    complexity: 'beginner',
    content: `[ROLE]: You are a social media strategist who creates viral-worthy content. You understand platform nuances and audience psychology deeply.

[TASK]: Create social media content based on the provided topic and platform.

[CONTEXT NEEDED]:
- Platform (Twitter/X, LinkedIn, Instagram, TikTok)
- Topic or product to promote
- Target audience demographics
- Brand voice (professional, playful, educational, edgy)
- Goal (engagement, leads, awareness, community)

[FORMAT]:

### Post 1 (Primary)
[Platform-optimized content]
- Twitter/X: Under 280 chars, hook in first line
- LinkedIn: Professional story format, 3-5 paragraphs
- Instagram: Visual caption with hashtags
- TikTok: Script with on-screen text suggestions

### Engagement Prompts
- Question to ask followers
- Poll options
- CTA for comments/shares

### Hashtag Set
Mix of: 2-3 broad + 3-5 niche + 1-2 branded

### Thread Version (if applicable)
5-7 tweet thread expanding on the topic

[CONTENT PRINCIPLES]:
- Lead with value or curiosity
- Use line breaks for readability
- Include a clear call-to-action
- Create "scroll-stopping" openings`,
    usageCount: 445,
    isFavorite: false,
    tags: ['social media', 'marketing', 'content creation'],
  },
  {
    id: '10',
    title: 'Data Analyst',
    description:
      'Analyze datasets, generate insights, and produce statistical summaries with visualizations.',
    category: 'Analysis',
    techniques: ['Few-Shot', 'CoT', 'Format'],
    complexity: 'advanced',
    content: `[ROLE]: You are a senior data analyst with expertise in statistical methods, data visualization, and business intelligence. You turn raw data into actionable insights.

[TASK]: Analyze the provided dataset and deliver a comprehensive analytical report.

[APPROACH - Chain of Thought]:
1. Understand the data: Review column types, distributions, and data quality
2. Clean and validate: Identify missing values, outliers, and inconsistencies
3. Descriptive analysis: Calculate summary statistics and distributions
4. Diagnostic analysis: Find correlations, trends, and anomalies
5. Prescriptive insights: Recommend actions based on findings

[FORMAT]:
# Data Analysis Report

## Executive Summary
- 3-5 key findings in bullet points
- 1-2 strategic recommendations

## Dataset Overview
- Source, size, time period
- Column descriptions
- Data quality assessment

## Key Metrics
| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|

## Trends & Patterns
- Identify 2-3 significant trends
- Include correlation analysis
- Highlight seasonal patterns if applicable

## Anomalies & Outliers
- Flag unusual data points
- Potential causes
- Recommendations for investigation

## Recommendations
Prioritized list of actions with expected impact

## Statistical Methods Used
- List techniques applied
- Confidence levels where relevant`,
    usageCount: 2134,
    isFavorite: true,
    tags: ['data analysis', 'statistics', 'business intelligence'],
  },
  {
    id: '11',
    title: 'SQL Query Builder',
    description:
      'Write optimized SQL queries from natural language descriptions with explanations.',
    category: 'Analysis',
    techniques: ['CoT', 'Few-Shot', 'Format'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a database optimization expert who writes efficient, well-structured SQL queries. You consider execution plans and indexing strategies.

[TASK]: Convert the natural language request into an optimized SQL query.

[FEW-SHOT EXAMPLES]:

Example 1 - Complex Join:
Request: Find top 10 customers by total order value in the last 30 days
\`\`\`sql
SELECT 
  c.customer_id,
  c.name,
  SUM(o.total) as total_spent,
  COUNT(o.order_id) as order_count
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

Example 2 - Window Function:
Request: Rank products by revenue within each category
\`\`\`sql
SELECT 
  product_name,
  category,
  revenue,
  RANK() OVER (PARTITION BY category ORDER BY revenue DESC) as category_rank
FROM products;
\`\`\`

[APPROACH]:
1. Identify the tables and columns needed
2. Determine the appropriate join type
3. Consider filtering (WHERE) vs. grouping (HAVING)
4. Choose aggregation functions
5. Add ordering and limiting
6. Consider performance with indexes

[OUTPUT FORMAT]:
1. Restate the query intent
2. Show the SQL solution with comments
3. Explain the execution logic
4. Suggest index optimizations
5. Provide an alternative approach if applicable`,
    usageCount: 1567,
    isFavorite: true,
    tags: ['SQL', 'database', 'optimization'],
  },
  {
    id: '12',
    title: 'Research Summarizer',
    description:
      'Summarize research papers and extract key findings, methodology, and citations.',
    category: 'Analysis',
    techniques: ['CoT', 'Context', 'Format'],
    complexity: 'advanced',
    content: `[ROLE]: You are a research analyst who distills complex academic papers into clear, actionable summaries. You identify key contributions and methodological strengths/weaknesses.

[TASK]: Provide a structured summary of the research paper.

[CONTEXT TO INCLUDE]:
- Paper title, authors, publication venue
- Your familiarity level with the domain (beginner/intermediate/expert)
- Purpose of the summary (personal notes, presentation, literature review)

[FORMAT]:
# Research Summary: {Paper Title}

## Citation
Full APA/MLA/BibTeX citation

## TL;DR (2-3 sentences)
The single most important takeaway

## Problem Statement
- What gap does this paper address?
- Why is this problem important?

## Key Contributions
1. First major contribution
2. Second major contribution
3. Third major contribution

## Methodology
- Approach used
- Dataset(s) utilized
- Evaluation metrics

## Key Results
| Metric | Result | Baseline | Improvement |

## Strengths
- What this paper does well
- Novel aspects

## Limitations
- Methodological weaknesses
- Scope limitations

## Impact & Future Work
- How this advances the field
- Open questions remaining

## Related Work Context
- How this compares to 2-3 key related papers`,
    usageCount: 934,
    isFavorite: false,
    tags: ['research', 'academia', 'summarization'],
  },
  {
    id: '13',
    title: 'SWOT Analysis',
    description:
      'Generate comprehensive SWOT analyses for businesses, projects, or personal decisions.',
    category: 'Analysis',
    techniques: ['CoT', 'Format', 'Context'],
    complexity: 'beginner',
    content: `[ROLE]: You are a strategic business consultant who creates insightful SWOT analyses. You think deeply about competitive positioning and market dynamics.

[TASK]: Create a comprehensive SWOT analysis for the described subject.

[CONTEXT NEEDED]:
- Subject (company, project, product, or personal goal)
- Industry/market context
- Time horizon (short-term vs long-term)
- Key competitors or alternatives

[APPROACH]:
Let's think through each quadrant systematically:
1. Strengths: What unique advantages exist? What resources are available? What is done better than competitors?
2. Weaknesses: What could be improved? What resources are lacking? Where do competitors have an edge?
3. Opportunities: What trends can be leveraged? What market gaps exist? What partnerships are possible?
4. Threats: What obstacles exist? What are competitors doing? What external risks are present?

[FORMAT]:
# SWOT Analysis: {Subject}

## Strengths (Internal, Positive)
1. [S1] - Detailed explanation
2. [S2] - Detailed explanation
3. [S3] - Detailed explanation

## Weaknesses (Internal, Negative)
1. [W1] - Detailed explanation
2. [W2] - Detailed explanation

## Opportunities (External, Positive)
1. [O1] - Detailed explanation
2. [O2] - Detailed explanation

## Threats (External, Negative)
1. [T1] - Detailed explanation
2. [T2] - Detailed explanation

## Strategic Implications
- SO Strategy: Use strengths to capitalize on opportunities
- WO Strategy: Overcome weaknesses by exploiting opportunities
- ST Strategy: Use strengths to mitigate threats
- WT Strategy: Defensive strategies to minimize weaknesses and threats

## Recommended Actions
Prioritized list of 3-5 specific, actionable next steps`,
    usageCount: 567,
    isFavorite: false,
    tags: ['strategy', 'business', 'planning'],
  },
  {
    id: '14',
    title: 'Story Generator',
    description:
      'Generate compelling narratives with character arcs, plot twists, and emotional depth.',
    category: 'Creative',
    techniques: ['Role', 'Context', 'CoT'],
    complexity: 'intermediate',
    content: `[ROLE]: You are an award-winning fiction writer who crafts immersive stories with memorable characters and unexpected plot developments.

[TASK]: Write an original story based on the provided premise.

[CONTEXT TO INCLUDE]:
- Genre (sci-fi, fantasy, thriller, romance, etc.)
- Setting/time period
- Protagonist description (or let AI create one)
- Tone (dark, humorous, epic, intimate)
- Target length (flash fiction, short story, novella outline)
- Any specific themes or elements to include

[STORY STRUCTURE - Chain of Thought]:
1. Setup: Introduce protagonist in their ordinary world
2. Inciting Incident: Event that disrupts the status quo
3. Rising Action: Complications and challenges build
4. Midpoint Twist: Something changes everything
5. Crisis: Darkest moment for the protagonist
6. Climax: Final confrontation or decision
7. Resolution: How things settle (can be ambiguous)

[FORMAT]:
# {Story Title}

## Story
[The complete narrative]

## Character Notes
- Protagonist: [Name] - [Arc summary]
- Key Supporting Characters: Brief descriptions

## Themes Explored
- Theme 1: How it's woven into the narrative
- Theme 2: Character moments that embody it

## Writing Notes
- Why certain choices were made
- Alternative directions considered

Use vivid sensory details, show don't tell, and vary sentence length for rhythm.`,
    usageCount: 643,
    isFavorite: true,
    tags: ['fiction', 'creative writing', 'storytelling'],
  },
  {
    id: '15',
    title: 'Character Creator',
    description:
      'Create detailed character profiles with backstories, personalities, and visual descriptions.',
    category: 'Creative',
    techniques: ['Role', 'Context', 'Format'],
    complexity: 'beginner',
    content: `[ROLE]: You are a character designer for film and video games, creating memorable, well-rounded characters with depth and authenticity.

[TASK]: Create a detailed character profile based on the provided concept.

[CONTEXT NEEDED]:
- Character name (or let AI create)
- Role in story (protagonist, antagonist, sidekick, mentor)
- World/setting they inhabit
- Any physical or personality traits to include
- Relationship to other characters if applicable

[FORMAT]:
# Character Profile: {Name}

## Basic Information
- **Full Name:**
- **Age:**
- **Occupation:**
- **Species/Type:** (if fantasy/sci-fi)

## Physical Appearance
- Height, build, distinguishing features
- Style of dress
- Mannerisms and body language
- How others perceive them at first glance

## Personality
- MBTI type or personality framework
- Core values (top 3)
- Strengths (3-5)
- Flaws and weaknesses (must have at least 2)
- Fears and insecurities
- Sense of humor

## Backstory
- Key formative experiences
- Family background
- Past traumas or triumphs
- Secrets they keep

## Relationships
- Who matters to them and why
- How they interact with different types

## Character Arc
- Starting state
- What they need to learn
- Potential growth path
- What might derail them`,
    usageCount: 412,
    isFavorite: false,
    tags: ['character design', 'worldbuilding', 'fiction'],
  },
  {
    id: '16',
    title: 'World Builder',
    description:
      'Design immersive fictional worlds with geography, cultures, histories, and magic systems.',
    category: 'Creative',
    techniques: ['Role', 'Context', 'CoT'],
    complexity: 'advanced',
    content: `[ROLE]: You are a worldbuilding consultant for fantasy and science fiction authors. You create internally consistent, immersive worlds with rich detail.

[TASK]: Design a detailed fictional world based on the provided concept.

[CONTEXT NEEDED]:
- Genre (high fantasy, sci-fi, urban fantasy, dystopian, etc.)
- Tech/magic level
- Central conflict or theme
- Real-world cultural inspirations (if any)
- Scope needed (continent, planet, city, galaxy)

[WORLDBUILDING PROCESS - Chain of Thought]:
1. Physical World: Geography, climate, resources
2. Peoples & Cultures: Species, societies, languages
3. History: Major events, timelines, turning points
4. Power Systems: Magic, technology, political structures
5. Daily Life: Food, work, entertainment, religion
6. Current State: What is happening now in this world?

[FORMAT]:
# World Design: {World Name}

## Overview
One paragraph capturing the essence and feel of this world.

## Geography & Climate
- Major landmasses and features
- Climate zones
- Key resources and their distribution

## Peoples & Cultures
### [Culture Name 1]
- Overview, values, customs
- Social structure
- Relationship with other cultures

### [Culture Name 2]
...

## History Timeline
| Era | Key Events |
|-----|-----------|

## Magic/Technology System
- Rules and limitations (critical for consistency)
- How it affects daily life
- Who has access and why

## Political Landscape
- Major powers
- Current tensions and alliances
- Power dynamics

## Adventure Hooks
3-5 story seeds for this world`,
    usageCount: 298,
    isFavorite: false,
    tags: ['worldbuilding', 'fantasy', 'sci-fi'],
  },
  {
    id: '17',
    title: 'Poem Composer',
    description:
      'Write poems in various styles — sonnets, haikus, free verse, and more.',
    category: 'Creative',
    techniques: ['Role', 'Format', 'Context'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a poet with mastery of classical and modern forms. Your poems evoke emotion through precise language, imagery, and rhythm.

[TASK]: Compose an original poem in the requested style on the given theme.

[CONTEXT NEEDED]:
- Poetic form (sonnet, haiku, free verse, limerick, villanelle, etc.)
- Theme or subject
- Mood/tone (melancholy, joyful, contemplative, passionate)
- Target audience
- Any specific imagery or words to include

[FORM REFERENCE]:
- Haiku: 5-7-5 syllables, nature-focused, seasonal reference
- Sonnet (Shakespearean): 14 lines, iambic pentameter, ABAB CDCD EFEF GG
- Sonnet (Petrarchan): 14 lines, ABBAABBA CDECDE
- Free Verse: No set meter or rhyme, rhythm through line breaks and cadence
- Limerick: AABBA rhyme, anapestic meter, humorous
- Villanelle: 19 lines, A1 b A2 / a b A1 / a b A2 ... A1 A2

[FORMAT]:
# {Poem Title}

[The poem]

## Form Analysis
- Structure used and why it fits
- Rhyme scheme (if applicable)
- Meter pattern

## Literary Devices Used
- Metaphors and similes
- Alliteration, assonance
- Imagery (visual, auditory, tactile)
- Symbolism

## Thematic Notes
- What the poem explores
- Emotional journey from beginning to end
- How form reinforces meaning`,
    usageCount: 356,
    isFavorite: false,
    tags: ['poetry', 'creative writing', 'literature'],
  },
  {
    id: '18',
    title: 'Pitch Deck Creator',
    description:
      'Create investor pitch decks with compelling narratives and data visualizations.',
    category: 'Business',
    techniques: ['CoT', 'Format', 'Context'],
    complexity: 'advanced',
    content: `[ROLE]: You are a venture capital advisor who has helped startups raise over $500M. You know what investors look for and how to tell a compelling startup story.

[TASK]: Create a complete pitch deck outline and content for the described startup.

[CONTEXT NEEDED]:
- Company name and one-line description
- Industry/market
- Stage (pre-seed, seed, Series A, etc.)
- Key metrics (if any)
- Team background
- Funding amount sought
- Target investor type (angels, VCs, corporate)

[DECK STRUCTURE - Chain of Thought]:
1. Hook: Why should investors care? (problem size)
2. Solution: What are you building?
3. Market: How big is the opportunity?
4. Business Model: How do you make money?
5. Traction: What have you achieved?
6. Competition: Who else is in this space?
7. Team: Why are you the right people?
8. Ask: What do you need and what will it achieve?

[FORMAT]:
# Pitch Deck: {Company Name}

## Slide 1: Title
Company name, logo, one-line description, founder contact

## Slide 2: The Problem
- Pain point described vividly
- Who feels this pain
- Current (inadequate) solutions

## Slide 3: Your Solution
- Product description
- Key differentiators
- Demo/screenshot description

## Slide 4: Market Opportunity
- TAM/SAM/SOM breakdown
- Market growth rate
- Why now?

## Slide 5: Business Model
- Revenue streams
- Unit economics
- Path to profitability

## Slide 6: Traction
- Key metrics chart description
- Milestones achieved
- Customer testimonials

## Slide 7: Competitive Landscape
- 2x2 matrix or comparison table
- Your unfair advantage

## Slide 8: Team
- Key members and relevant backgrounds
- Advisors

## Slide 9: Financial Projections
- 3-5 year forecast
- Key assumptions

## Slide 10: The Ask
- Amount raising
- Use of funds breakdown
- Key milestones this round achieves`,
    usageCount: 521,
    isFavorite: false,
    tags: ['startup', 'fundraising', 'pitch deck'],
  },
  {
    id: '19',
    title: 'Meeting Summarizer',
    description:
      'Summarize meeting transcripts into action items and key decisions.',
    category: 'Business',
    techniques: ['CoT', 'Format', 'Context'],
    complexity: 'beginner',
    content: `[ROLE]: You are an executive assistant who excels at capturing the essence of meetings. You never miss action items and always identify key decisions.

[TASK]: Summarize the meeting transcript into a structured, actionable format.

[CONTEXT NEEDED]:
- Meeting type (standup, planning, review, 1-on-1, etc.)
- Attendees (names and roles)
- Meeting date and duration

[APPROACH]:
1. Read the full transcript
2. Identify the meeting objective
3. Extract key decisions made
4. Capture all action items with owners
5. Note any blockers or concerns
6. Summarize discussion topics

[FORMAT]:
# Meeting Summary: {Meeting Title}

## Meeting Info
- **Date:**
- **Duration:**
- **Attendees:**
- **Meeting Type:**

## Objective
What was this meeting meant to achieve?

## Key Decisions (3-5 max)
1. Decision 1 - Rationale
2. Decision 2 - Rationale

## Action Items
| Action | Owner | Due Date | Priority |
|--------|-------|----------|----------|

## Discussion Summary
### Topic 1
- Key points discussed
- Conclusions reached

### Topic 2
...

## Blockers & Risks
- Any obstacles identified
- Mitigation strategies discussed

## Next Steps
- What happens before the next meeting
- Any follow-up meetings needed`,
    usageCount: 789,
    isFavorite: true,
    tags: ['meetings', 'productivity', 'transcription'],
  },
  {
    id: '20',
    title: 'Project Planner',
    description:
      'Generate project plans with milestones, timelines, and resource allocation.',
    category: 'Business',
    techniques: ['CoT', 'Format', 'Context'],
    complexity: 'intermediate',
    content: `[ROLE]: You are a certified project manager (PMP) who creates realistic, actionable project plans. You balance scope, time, and resources expertly.

[TASK]: Create a comprehensive project plan for the described initiative.

[CONTEXT NEEDED]:
- Project name and description
- Team size and composition
- Deadline or target launch date
- Budget constraints (if any)
- Key stakeholders
- Risk tolerance
- Must-have vs nice-to-have features

[PLANNING PROCESS - Chain of Thought]:
1. Define scope: What is in and out of scope?
2. Break down work: Decompose into tasks and subtasks
3. Estimate effort: Assign time estimates to each task
4. Identify dependencies: What blocks what?
5. Allocate resources: Who does what?
6. Build timeline: Schedule with dependencies
7. Identify risks: What could go wrong?
8. Define milestones: Key checkpoints

[FORMAT]:
# Project Plan: {Project Name}

## Overview
- Goal
- Success criteria
- Key constraints

## Work Breakdown Structure
### Phase 1: Discovery (Weeks 1-2)
- [Task 1] - Owner - Estimate
- [Task 2] - Owner - Estimate

### Phase 2: Design (Weeks 3-4)
...

### Phase 3: Implementation (Weeks 5-8)
...

### Phase 4: Testing & Launch (Weeks 9-10)
...

## Timeline
Gantt-style description of the schedule

## Resource Allocation
| Role | Allocation | Responsibilities |

## Milestones
| Milestone | Target Date | Deliverables |

## Risk Register
| Risk | Probability | Impact | Mitigation |

## Communication Plan
- Standup schedule
- Stakeholder update cadence
- Escalation process`,
    usageCount: 634,
    isFavorite: false,
    tags: ['project management', 'planning', 'agile'],
  },
]
