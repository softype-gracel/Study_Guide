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
        finalizeTopicContent(currentTopic, contentBuffer)
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

    // Skip description header but continue collecting content after it
    if (trimmedLine.startsWith('**Description:**')) {
      // Get description text on same line if present
      const descText = trimmedLine.replace('**Description:**', '').trim()
      if (descText) {
        contentBuffer.push(descText)
      }
      continue
    }

    // Collect content (skip the topic title line itself)
    if (currentSection === 'content' && !inQuestion && !trimmedLine.startsWith('## Topic:')) {
      contentBuffer.push(line)
    }
  }

  // Save last topic
  if (currentTopic) {
    if (inQuestion && questionData && questionData.question) {
      currentTopic.practiceQuestion = questionData
    }
    if (contentBuffer.length > 0) {
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
  let html = markdown

  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^#### (.+)$/gm, '<h5>$1</h5>')

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<div class="note">$1</div>')

  // Convert unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

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
