import { quizDataAll, type QuizQuestion } from './quizData'
import parsedExamsData from './parsedQuizExams.json'

export interface QuizExam {
  id: string
  title: string
  description: string
  totalQuestions: number
  timeAllowed?: string
  passingScore?: string
  questions: QuizQuestion[]
}

interface ParsedQuestion {
  id: string
  topic: string
  difficulty: string
  questionType: string
  question: string
  options: string[]
  correctAnswer: string
  correctIndex: number
  explanation: string
  reference?: string
}

interface ParsedExam {
  id: string
  title: string
  description?: string
  totalQuestions: number
  timeAllowed?: string
  passingScore?: string
  questions: ParsedQuestion[]
}

/**
 * Converts parsed questions to QuizQuestion format
 */
function convertToQuizFormat(questions: ParsedQuestion[]): QuizQuestion[] {
  return questions.map(q => ({
    q: q.question,
    opts: q.options,
    correct: q.correctIndex,
    domain: q.topic,
    explain: q.explanation
  }))
}

/**
 * Loads all available quiz exams
 * @returns Array of QuizExam objects
 */
export function loadQuizExams(): QuizExam[] {
  const exams: QuizExam[] = []

  // Add the default/built-in quiz
  exams.push({
    id: 'default',
    title: 'NetSuite Foundation Practice Quiz',
    description: 'Comprehensive practice questions covering all NetSuite Foundation domains',
    totalQuestions: quizDataAll.length,
    questions: quizDataAll
  })

  // Load parsed markdown exams from JSON
  try {
    const parsedExams = parsedExamsData as ParsedExam[]

    for (const parsedExam of parsedExams) {
      const questions = convertToQuizFormat(parsedExam.questions)

      exams.push({
        id: parsedExam.id,
        title: parsedExam.title,
        description: parsedExam.description || `Practice exam with ${parsedExam.totalQuestions} questions`,
        totalQuestions: questions.length,
        timeAllowed: parsedExam.timeAllowed,
        passingScore: parsedExam.passingScore,
        questions
      })
    }
  } catch (error) {
    console.error('Error loading parsed quiz exams:', error)
  }

  return exams
}

