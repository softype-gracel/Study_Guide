const fs = require('fs')
const path = require('path')

/**
 * Parses a markdown file containing practice questions
 */
function parseMarkdownQuiz(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  const exam = {
    title: '',
    description: '',
    totalQuestions: 0,
    questions: []
  }

  let currentQuestion = null
  let currentSection = null
  let optionsBuffer = []
  let explanationBuffer = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Parse title
    if (line.startsWith('# ') && !exam.title) {
      exam.title = line.replace(/^#\s+/, '')
      continue
    }

    // Parse metadata
    if (line.startsWith('**Total Questions:**')) {
      const match = line.match(/\*\*Total Questions:\*\*\s*(\d+)/)
      if (match) exam.totalQuestions = parseInt(match[1])
      continue
    }

    if (line.startsWith('**Time Allowed:**')) {
      const match = line.match(/\*\*Time Allowed:\*\*\s*(.+?)(?:\s*\||$)/)
      if (match) exam.timeAllowed = match[1].trim()
      continue
    }

    if (line.startsWith('**Passing Score:**')) {
      const match = line.match(/\*\*Passing Score:\*\*\s*(.+?)(?:\s*\||$)/)
      if (match) exam.passingScore = match[1].trim()
      continue
    }

    // Detect start of a new question
    if (line.startsWith('## Question ')) {
      // Save previous question
      if (currentQuestion && currentQuestion.question) {
        finalizeQuestion(currentQuestion, optionsBuffer, explanationBuffer, exam)
        optionsBuffer = []
        explanationBuffer = []
      }

      const questionNumber = line.replace(/^##\s*Question\s*/, '').trim()
      currentQuestion = {
        id: questionNumber,
        options: [],
        correctIndex: -1
      }
      currentSection = 'metadata'
      continue
    }

    if (!currentQuestion) continue

    // Parse question metadata
    if (line.startsWith('**Topic:**')) {
      currentQuestion.topic = line.replace(/^\*\*Topic:\*\*\s*/, '').trim()
      continue
    }

    if (line.startsWith('**Difficulty:**')) {
      currentQuestion.difficulty = line.replace(/^\*\*Difficulty:\*\*\s*/, '').trim()
      continue
    }

    if (line.startsWith('**Question Type:**')) {
      currentQuestion.questionType = line.replace(/^\*\*Question Type:\*\*\s*/, '').trim()
      continue
    }

    // Detect sections
    if (line.startsWith('**Options:**')) {
      currentSection = 'options'
      continue
    }

    if (line.startsWith('**Correct Answer:**')) {
      currentQuestion.correctAnswer = line.replace(/^\*\*Correct Answer:\*\*\s*/, '').trim()
      currentSection = 'answer'
      continue
    }

    if (line.startsWith('**Explanation:**')) {
      currentSection = 'explanation'
      continue
    }

    if (line.startsWith('**Reference:**')) {
      currentSection = 'reference'
      continue
    }

    if (line.startsWith('**Statement:**')) {
      currentQuestion.question = line.replace(/^\*\*Statement:\*\*\s*/, '').trim()
      currentSection = 'question'
      continue
    }

    // Parse content
    if (currentSection === 'metadata' && line && !line.startsWith('**') && !line.startsWith('---')) {
      if (!currentQuestion.question) {
        currentQuestion.question = line
      } else {
        currentQuestion.question += ' ' + line
      }
      continue
    }

    if (currentSection === 'options' && line && /^[A-J]\)/.test(line)) {
      optionsBuffer.push(line.replace(/^[A-J]\)\s*/, '').trim())
      continue
    }

    if (currentSection === 'explanation' && line && !line.startsWith('**') && !line.startsWith('---')) {
      explanationBuffer.push(line)
      continue
    }

    if (currentSection === 'reference' && line && !line.startsWith('**') && !line.startsWith('---')) {
      if (!currentQuestion.reference) {
        currentQuestion.reference = line
      } else {
        currentQuestion.reference += ' ' + line
      }
      continue
    }
  }

  // Save last question
  if (currentQuestion && currentQuestion.question) {
    finalizeQuestion(currentQuestion, optionsBuffer, explanationBuffer, exam)
  }

  return exam
}

function finalizeQuestion(question, optionsBuffer, explanationBuffer, exam) {
  if (!question.question || !question.topic || !question.correctAnswer) {
    return
  }

  question.options = optionsBuffer.length > 0 ? [...optionsBuffer] : []
  question.explanation = explanationBuffer.join(' ').trim()

  // Calculate correct index
  const answerLetter = question.correctAnswer.trim().toUpperCase()
  question.correctIndex = answerLetter.charCodeAt(0) - 65

  if (question.options.length > 0 && (question.correctIndex < 0 || question.correctIndex >= question.options.length)) {
    console.warn(`Invalid correct answer "${question.correctAnswer}" for question: ${question.question.substring(0, 50)}...`)
  }

  exam.questions.push(question)
}

// Main execution
const practiceQuestionsDir = path.join(__dirname, '..', 'data', 'practice-questions')
const outputFile = path.join(__dirname, '..', 'data', 'parsedQuizExams.json')

const exams = []

try {
  const files = fs.readdirSync(practiceQuestionsDir)
  const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'template.md')

  for (const file of mdFiles) {
    const filePath = path.join(practiceQuestionsDir, file)
    console.log(`Parsing ${file}...`)
    const exam = parseMarkdownQuiz(filePath)

    exam.id = exam.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    console.log(`  Found ${exam.questions.length} questions`)
    exams.push(exam)
  }

  fs.writeFileSync(outputFile, JSON.stringify(exams, null, 2))
  console.log(`\n✓ Successfully parsed ${exams.length} exam(s) and saved to ${outputFile}`)
} catch (error) {
  console.error('Error:', error)
  process.exit(1)
}
