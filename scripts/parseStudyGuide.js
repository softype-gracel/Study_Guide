const fs = require('fs')
const path = require('path')

/**
 * Parses a markdown study guide file
 */
function parseStudyGuideMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  const section = {
    id: 1,
    title: '',
    description: '',
    topics: []
  }

  let currentTopic = null
  let currentSection = null
  let contentBuffer = []
  let inCodeBlock = false
  let inQuestion = false
  let questionData = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Parse section metadata
    if (trimmedLine.startsWith('**Section ID:**')) {
      section.id = parseInt(trimmedLine.replace('**Section ID:**', '').trim())
      continue
    }

    if (trimmedLine.startsWith('**Section Title:**')) {
      section.title = trimmedLine.replace('**Section Title:**', '').trim()
      continue
    }

    // Detect code blocks
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      contentBuffer.push(line)
      continue
    }

    // Start new topic
    if (trimmedLine.startsWith('## Topic:') && !inCodeBlock) {
      // Save previous topic
      if (currentTopic) {
        // Only finalize if content hasn't been set yet (by practice question handler)
        if (!currentTopic.content && contentBuffer.length > 0) {
          finalizeTopicContent(currentTopic, contentBuffer)
        }
        section.topics.push(currentTopic)
        contentBuffer = []
      }

      const topicTitle = trimmedLine.replace('## Topic:', '').trim()
      currentTopic = {
        id: `topic-${section.topics.length + 1}`,
        title: topicTitle,
        content: '',
        practiceQuestion: null
      }
      currentSection = 'content'
      continue
    }

    if (!currentTopic) continue

    // Detect practice question section
    if (trimmedLine.startsWith('### Practice Question')) {
      if (contentBuffer.length > 0) {
        currentTopic.content = contentBuffer.join('\n').trim()
        contentBuffer = []
      }
      inQuestion = true
      questionData = {
        question: '',
        options: [],
        correctAnswer: '',
        explanation: ''
      }
      continue
    }

    // Parse question content
    if (inQuestion) {
      if (trimmedLine.startsWith('**Question:**')) {
        questionData.question = trimmedLine.replace('**Question:**', '').trim()
        continue
      }

      if (trimmedLine.startsWith('**Options:**')) {
        continue
      }

      if (/^[A-J]\)/.test(trimmedLine)) {
        questionData.options.push(trimmedLine.replace(/^[A-J]\)\s*/, '').trim())
        continue
      }

      if (trimmedLine.startsWith('**Correct Answer:**')) {
        questionData.correctAnswer = trimmedLine.replace('**Correct Answer:**', '').trim()
        continue
      }

      if (trimmedLine.startsWith('**Explanation:**')) {
        const explanation = trimmedLine.replace('**Explanation:**', '').trim()
        if (explanation) {
          questionData.explanation = explanation
        }
        continue
      }

      // Continue building explanation
      if (questionData.correctAnswer && trimmedLine && !trimmedLine.startsWith('**') && !trimmedLine.startsWith('---')) {
        if (questionData.explanation) {
          questionData.explanation += ' ' + trimmedLine
        } else {
          questionData.explanation = trimmedLine
        }
        continue
      }
    }

    // End of topic (horizontal rule or end of file)
    if (trimmedLine === '---' && !inCodeBlock) {
      if (inQuestion && questionData && questionData.question) {
        currentTopic.practiceQuestion = questionData
        inQuestion = false
        questionData = null
      }
      continue
    }

    // Handle description header - extract text but don't skip collecting
    if (trimmedLine.startsWith('**Description:**')) {
      // Get description text on same line if present
      const descText = trimmedLine.replace('**Description:**', '').trim()
      if (descText) {
        contentBuffer.push(descText)
      }
      currentSection = 'content' // Ensure we're in content section
      continue // Skip to next line
    }

    // Collect content (everything between Description and practice question)
    if (currentTopic && !inQuestion && currentSection === 'content') {
      contentBuffer.push(line)
    }
  }

  // Save last topic
  if (currentTopic) {
    if (inQuestion && questionData && questionData.question) {
      currentTopic.practiceQuestion = questionData
    }
    // Only finalize if content hasn't been set yet (by practice question handler)
    if (!currentTopic.content && contentBuffer.length > 0) {
      finalizeTopicContent(currentTopic, contentBuffer)
    }
    section.topics.push(currentTopic)
  }

  return section
}

function finalizeTopicContent(topic, contentBuffer) {
  // Remove empty lines at start and end
  while (contentBuffer.length > 0 && !contentBuffer[0].trim()) {
    contentBuffer.shift()
  }
  while (contentBuffer.length > 0 && !contentBuffer[contentBuffer.length - 1].trim()) {
    contentBuffer.pop()
  }

  topic.content = contentBuffer.join('\n').trim()
}

/**
 * Convert markdown to HTML-like format for the app
 */
function markdownToHtml(markdown) {
  const lines = markdown.split('\n')
  const result = []
  let currentSection = null
  let sectionContent = []
  let inCodeBlock = false

  const sectionMap = {
    'Key Points': 'concept-block',
    'Key Concepts': 'concept-block',
    'Key Characteristics': 'concept-block',
    'Key Difference': 'concept-block',
    'The Three Classifications': 'concept-block',
    'Enable Features': 'concept-block',
    'General Preferences': 'concept-block',
    'Use Cases': 'concept-block',
    'Important Notes': 'warning-box',
    'Important Note': 'warning-box',
    'Warning': 'warning-box',
    'Exam Tip': 'tip-box',
    'Tip': 'tip-box',
    'Example': 'mnemonic-box',
    'Memory Trick': 'mnemonic-box',
    'Memory Tip': 'mnemonic-box',
    'Elimination Subsidiaries': 'concept-block',
    'Enabling Custom Records': 'concept-block'
  }

  function flushSection() {
    if (currentSection) {
      const className = sectionMap[currentSection] || 'concept-block'
      // Show title for concept blocks and some specific sections
      const showTitle = className === 'concept-block' ||
                       currentSection.startsWith('Key') ||
                       currentSection.startsWith('The') ||
                       currentSection.includes('Characteristics') ||
                       currentSection.includes('Use Cases')
      const title = showTitle ? `<h4>${currentSection}</h4>` : ''
      const content = processInlineMarkdown(sectionContent.join('\n'))
      result.push(`<div class="${className}">${title}${content}</div>`)
      sectionContent = []
      currentSection = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      if (currentSection) {
        sectionContent.push(line)
      } else {
        result.push(line)
      }
      continue
    }

    // Check for section headers (### Something)
    if (trimmed.startsWith('### ') && !inCodeBlock) {
      flushSection()
      const headerText = trimmed.replace('### ', '')
      currentSection = headerText
      continue
    }

    // Collect content into current section or add to result
    if (currentSection) {
      sectionContent.push(line)
    } else if (trimmed) {
      result.push(line)
    } else {
      result.push('')
    }
  }

  flushSection()

  let html = result.join('\n')

  // Process remaining markdown (code blocks, inline formatting)
  html = processInlineMarkdown(html)

  return html
}

function processInlineMarkdown(text) {
  let html = text

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')

  // Convert blockquotes (for warnings within sections)
  html = html.replace(/^> \*\*(.+?):\*\* (.+)$/gm, '<div class="note"><strong>$1:</strong> $2</div>')
  html = html.replace(/^> (.+)$/gm, '<div class="note">$1</div>')

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert unordered lists - be more careful to avoid double wrapping
  const lines = html.split('\n')
  const processedLines = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith('- ')) {
      if (!inList) {
        processedLines.push('<ul>')
        inList = true
      }
      processedLines.push('<li>' + trimmed.substring(2) + '</li>')
    } else {
      if (inList) {
        processedLines.push('</ul>')
        inList = false
      }
      processedLines.push(line)
    }
  }

  if (inList) {
    processedLines.push('</ul>')
  }

  html = processedLines.join('\n')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Convert standalone #### headers
  html = html.replace(/^#### (.+)$/gm, '<h5>$1</h5>')

  return html
}

/**
 * Format practice question for the app
 */
function formatPracticeQuestion(questionData) {
  if (!questionData || !questionData.question) return null

  const correctIndex = questionData.correctAnswer.charCodeAt(0) - 65 // A=0, B=1, etc.

  return {
    question: questionData.question,
    options: questionData.options,
    correctIndex: correctIndex,
    explanation: questionData.explanation
  }
}

// Main execution
const studyGuideDir = path.join(__dirname, '..', 'data', 'study-guide')
const outputFile = path.join(__dirname, '..', 'data', 'parsedStudyGuide.json')

const sections = []

try {
  const files = fs.readdirSync(studyGuideDir)
  const mdFiles = files.filter(file =>
    file.endsWith('.md') &&
    file !== 'template.md' &&
    file !== 'README.md'
  ).sort() // Sort alphabetically for consistent ordering

  console.log(`Found ${mdFiles.length} study guide file(s) to parse\n`)

  for (const file of mdFiles) {
    const filePath = path.join(studyGuideDir, file)
    console.log(`Parsing ${file}...`)

    const section = parseStudyGuideMarkdown(filePath)

    // Convert markdown to HTML for each topic
    section.topics = section.topics.map(topic => {
      const htmlContent = markdownToHtml(topic.content)
      const practiceQuestion = formatPracticeQuestion(topic.practiceQuestion)

      return {
        id: topic.id,
        title: topic.title,
        content: htmlContent,
        practiceQuestion: practiceQuestion
      }
    })

    // Add default description if not set
    if (!section.description) {
      section.description = `Study guide section covering ${section.title.toLowerCase()}`
    }

    console.log(`  Parsed ${section.topics.length} topic(s)`)
    sections.push(section)
  }

  // Sort sections by ID
  sections.sort((a, b) => a.id - b.id)

  // Create the final data structure
  const studyGuideData = {
    title: 'NetSuite SuiteFoundation Study Guide',
    sections: sections
  }

  fs.writeFileSync(outputFile, JSON.stringify(studyGuideData, null, 2))
  console.log(`\n✓ Successfully parsed ${sections.length} section(s) and saved to ${outputFile}`)
} catch (error) {
  console.error('Error:', error)
  process.exit(1)
}
