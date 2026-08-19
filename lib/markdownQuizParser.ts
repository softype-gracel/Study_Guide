import fs from 'fs'
import path from 'path'

export interface ParsedQuestion {
  id: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questionType: 'Multiple Choice' | 'True/False' | 'Matching' | 'Code Analysis'
  question: string
  options: string[]
  correctAnswer: string
  correctIndex: number
  explanation: string
  reference?: string
}

export interface ParsedExam {
  title: string
  description: string
  totalQuestions: number
  timeAllowed?: string
  passingScore?: string
  questions: ParsedQuestion[]
}

/**
 * Parses a markdown file containing practice questions in the standardized format
 * @param filePath - Path to the markdown file
 * @returns ParsedExam object containing all questions
 */
export function parseMarkdownQuiz(filePath: string): ParsedExam {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  const exam: ParsedExam = {
    title: '',
    description: '',
    totalQuestions: 0,
    questions: []
  }

  let currentQuestion: Partial<ParsedQuestion> | null = null
  let currentSection: 'metadata' | 'question' | 'options' | 'answer' | 'explanation' | 'reference' | null = null
  let optionsBuffer: string[] = []
  let explanationBuffer: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Parse title
    if (line.startsWith('# ') && !exam.title) {
      exam.title = line.replace(/^#\s+/, '')
      continue
    }

    // Parse metadata (Total Questions, Time Allowed, etc.)
    if (line.startsWith('**Total Questions:**')) {
      const match = line.match(/\*\*Total Questions:\*\*\s*(\d+)/)
      if (match) exam.totalQuestions = parseInt(match[1])
      continue
    }

    if (line.startsWith('**Time Allowed:**')) {
      const match = line.match(/\*\*Time Allowed:\*\*\s*(.+?)(?:\s*\*\*|$)/)
      if (match) exam.timeAllowed = match[1].trim()
      continue
    }

    if (line.startsWith('**Passing Score:**')) {
      const match = line.match(/\*\*Passing Score:\*\*\s*(.+?)(?:\s*\*\*|$)/)
      if (match) exam.passingScore = match[1].trim()
      continue
    }

    // Detect start of a new question
    if (line.startsWith('## Question ')) {
      // Save previous question if exists
      if (currentQuestion && currentQuestion.question) {
        finalizeQuestion(currentQuestion, optionsBuffer, explanationBuffer, exam)
        optionsBuffer = []
        explanationBuffer = []
      }

      // Start new question
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
      const difficulty = line.replace(/^\*\*Difficulty:\*\*\s*/, '').trim()
      currentQuestion.difficulty = difficulty as 'Easy' | 'Medium' | 'Hard'
      continue
    }

    if (line.startsWith('**Question Type:**')) {
      const type = line.replace(/^\*\*Question Type:\*\*\s*/, '').trim()
      currentQuestion.questionType = type as ParsedQuestion['questionType']
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

    // Handle statement for True/False questions
    if (line.startsWith('**Statement:**')) {
      currentQuestion.question = line.replace(/^\*\*Statement:\*\*\s*/, '').trim()
      currentSection = 'question'
      continue
    }

    // Parse content based on current section
    if (currentSection === 'metadata' && line && !line.startsWith('**') && !line.startsWith('---')) {
      // This is the question text
      if (!currentQuestion.question) {
        currentQuestion.question = line
      } else {
        currentQuestion.question += ' ' + line
      }
      continue
    }

    if (currentSection === 'options' && line) {
      // Parse option lines (A), B), C), etc.)
      if (/^[A-J]\)/.test(line)) {
        optionsBuffer.push(line.replace(/^[A-J]\)\s*/, '').trim())
      }
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

/**
 * Finalizes a question by adding options, calculating correct index, and adding to exam
 */
function finalizeQuestion(
  question: Partial<ParsedQuestion>,
  optionsBuffer: string[],
  explanationBuffer: string[],
  exam: ParsedExam
) {
  if (!question.question || !question.topic || !question.correctAnswer) {
    return // Skip incomplete questions
  }

  question.options = optionsBuffer.length > 0 ? [...optionsBuffer] : []
  question.explanation = explanationBuffer.join(' ').trim()

  // Calculate correct index from correct answer (A, B, C, D, etc.)
  const answerLetter = question.correctAnswer.trim().toUpperCase()
  question.correctIndex = answerLetter.charCodeAt(0) - 65 // 'A' = 0, 'B' = 1, etc.

  // Validate
  if (question.options.length > 0 && (question.correctIndex < 0 || question.correctIndex >= question.options.length)) {
    console.warn(`Invalid correct answer "${question.correctAnswer}" for question: ${question.question?.substring(0, 50)}...`)
  }

  exam.questions.push(question as ParsedQuestion)
}

/**
 * Loads all markdown quiz files from a directory
 * @param dirPath - Path to directory containing markdown files
 * @returns Array of ParsedExam objects
 */
export function loadAllMarkdownQuizzes(dirPath: string): ParsedExam[] {
  const exams: ParsedExam[] = []

  try {
    const files = fs.readdirSync(dirPath)
    const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'template.md')

    for (const file of mdFiles) {
      const filePath = path.join(dirPath, file)
      try {
        const exam = parseMarkdownQuiz(filePath)
        exams.push(exam)
      } catch (error) {
        console.error(`Error parsing ${file}:`, error)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }

  return exams
}

/**
 * Converts parsed questions to the format expected by QuizMode component
 * @param questions - Array of ParsedQuestion objects
 * @param domain - Domain/category name for the questions
 * @returns Array in QuizQuestion format
 */
export function convertToQuizFormat(questions: ParsedQuestion[], domain?: string) {
  return questions.map(q => ({
    q: q.question,
    opts: q.options,
    correct: q.correctIndex,
    domain: domain || q.topic,
    explain: q.explanation
  }))
}
