'use client'

import { useState, useEffect } from 'react'
import { type QuizQuestion } from '@/data/quizData'

export interface QuizExam {
  id: string
  title: string
  description: string
  totalQuestions: number
  timeAllowed?: string
  passingScore?: string
  questions: QuizQuestion[]
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function EnhancedQuizMode() {
  const [availableExams, setAvailableExams] = useState<QuizExam[]>([])
  const [selectedExam, setSelectedExam] = useState<QuizExam | null>(null)
  const [quizData, setQuizData] = useState<QuizQuestion[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [quizCorrect, setQuizCorrect] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)

  // Load available exams on mount
  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await fetch('/api/quiz-exams')
        if (response.ok) {
          const exams = await response.json()
          setAvailableExams(exams)
        } else {
          console.error('Failed to load quiz exams')
        }
      } catch (error) {
        console.error('Error fetching quiz exams:', error)
      }
    }
    fetchExams()
  }, [])

  const startExam = (exam: QuizExam) => {
    const shuffled = shuffleArray(exam.questions)
    setSelectedExam(exam)
    setQuizData(shuffled)
    setQuizAnswers(new Array(shuffled.length).fill(null))
    setCurrentQ(0)
    setQuizCorrect(0)
    setQuizAnswered(0)
    setShowResults(false)
  }

  const handleAnswer = (idx: number) => {
    if (quizAnswers[currentQ] !== null) return

    const newAnswers = [...quizAnswers]
    newAnswers[currentQ] = idx
    setQuizAnswers(newAnswers)

    if (idx === quizData[currentQ].correct) {
      setQuizCorrect((prev) => prev + 1)
    }
    setQuizAnswered((prev) => prev + 1)
  }

  const nextQuestion = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ((prev) => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1)
    }
  }

  const restartQuiz = () => {
    if (selectedExam) {
      const shuffled = shuffleArray(selectedExam.questions)
      setQuizData(shuffled)
      setCurrentQ(0)
      setQuizCorrect(0)
      setQuizAnswered(0)
      setQuizAnswers(new Array(shuffled.length).fill(null))
      setShowResults(false)
    }
  }

  const backToExamSelection = () => {
    setSelectedExam(null)
    setQuizData([])
    setCurrentQ(0)
    setQuizCorrect(0)
    setQuizAnswered(0)
    setQuizAnswers([])
    setShowResults(false)
  }

  const finishExam = () => {
    setShowResults(true)
  }

  // Show exam selection screen
  if (!selectedExam || quizData.length === 0) {
    return (
      <div className="section active">
        <div className="section-header">
          <h2>Practice Quiz</h2>
          <p>Select a practice exam to begin</p>
        </div>

        <div className="exam-selection-container" style={{ marginTop: '2rem' }}>
          {availableExams.map((exam) => (
            <div
              key={exam.id}
              className="exam-card"
              style={{
                background: 'var(--bg-card)',
                border: '2px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1.75rem',
                marginBottom: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow)'
              }}
              onClick={() => startExam(exam)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow)'
              }}
            >
              <h3 style={{
                marginTop: 0,
                marginBottom: '0.75rem',
                color: 'var(--primary)',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                {exam.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                margin: '0.5rem 0 1.25rem',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                {exam.description}
              </p>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ color: 'var(--text)' }}>
                  <strong style={{ color: 'var(--primary)' }}>Questions:</strong> {exam.totalQuestions}
                </span>
                {exam.timeAllowed && (
                  <span style={{ color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--primary)' }}>Time:</strong> {exam.timeAllowed}
                  </span>
                )}
                {exam.passingScore && (
                  <span style={{ color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--primary)' }}>Passing Score:</strong> {exam.passingScore}
                  </span>
                )}
              </div>
              <button
                style={{
                  padding: '0.75rem 1.75rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(196, 93, 62, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-dark)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--primary)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                Start Exam →
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show results screen
  if (showResults) {
    const percentageScore = Math.round((quizCorrect / quizData.length) * 100)
    const passingThreshold = selectedExam?.passingScore ? parseInt(selectedExam.passingScore) : 70
    const passed = percentageScore >= passingThreshold

    return (
      <div className="section active">
        <div className="section-header">
          <h2>Exam Results</h2>
          <p>{selectedExam?.title}</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Results Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '2.5rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}>
            {/* Pass/Fail Badge */}
            <div style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              background: passed ? 'var(--green-light)' : 'var(--primary-light)',
              color: passed ? 'var(--green)' : 'var(--primary-dark)',
              border: `2px solid ${passed ? 'var(--green)' : 'var(--primary)'}`
            }}>
              {passed ? '✓ PASSED' : '✗ NOT PASSED'}
            </div>

            {/* Score Display */}
            <div style={{
              fontSize: '4rem',
              fontWeight: '700',
              color: passed ? 'var(--green)' : 'var(--primary)',
              marginBottom: '0.5rem',
              fontFamily: "'DM Serif Display', serif"
            }}>
              {percentageScore}%
            </div>

            <div style={{
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem'
            }}>
              {quizCorrect} out of {quizData.length} correct
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Correct Answers
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--green)' }}>
                  {quizCorrect}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Incorrect Answers
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                  {quizData.length - quizCorrect}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Passing Score
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>
                  {passingThreshold}%
                </div>
              </div>
            </div>

            {/* Feedback Message */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: passed ? 'var(--green-light)' : 'var(--primary-light)',
              borderRadius: '8px',
              color: 'var(--text)'
            }}>
              {passed ? (
                <>
                  <strong>Congratulations!</strong> You've passed the exam. Great job on demonstrating your knowledge!
                </>
              ) : (
                <>
                  <strong>Keep learning!</strong> Review the material and try again. You're on your way to success!
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={restartQuiz}
              style={{
                padding: '0.75rem 1.75rem',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(196, 93, 62, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary-dark)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--primary)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Retake Exam
            </button>
            <button
              onClick={backToExamSelection}
              style={{
                padding: '0.75rem 1.75rem',
                background: 'var(--bg-card)',
                color: 'var(--text)',
                border: '2px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Choose Another Exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show quiz interface
  const q = quizData[currentQ]
  const answered = quizAnswers[currentQ] !== null
  const isLastQuestion = currentQ === quizData.length - 1
  const percentageScore = quizAnswered > 0 ? Math.round((quizCorrect / quizAnswered) * 100) : 0
  const allQuestionsAnswered = quizAnswers.every(answer => answer !== null)

  return (
    <div className="section active">
      <div className="section-header">
        <h2>{selectedExam.title}</h2>
        <p>Test your knowledge with randomized questions</p>
      </div>

      <div className="quiz-mode-container">
        <div className="quiz-mode-header">
          <div>
            <h3>
              Question {currentQ + 1} of {quizData.length}
            </h3>
            {selectedExam.timeAllowed && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>
                Time Allowed: {selectedExam.timeAllowed}
              </p>
            )}
          </div>
          <div className="quiz-score-display">
            <div>Score: {quizCorrect} / {quizAnswered}</div>
            {quizAnswered > 0 && (
              <div style={{ fontSize: '0.9rem', color: percentageScore >= 70 ? 'var(--success)' : 'var(--text-muted)' }}>
                {percentageScore}%
                {selectedExam.passingScore && ` (Passing: ${selectedExam.passingScore})`}
              </div>
            )}
          </div>
        </div>

        <div className="quiz-block" style={{ background: 'var(--bg-accent)', borderColor: 'var(--border)' }}>
          <h4 style={{ color: 'var(--text-muted)' }}>Domain: {q.domain}</h4>
          <div className="quiz-q">{q.q}</div>
          <ul className="quiz-options">
            {q.opts.map((opt, i) => {
              let cls = 'quiz-opt'
              if (answered) {
                cls += ' disabled'
                if (i === q.correct) cls += ' correct'
                else if (i === quizAnswers[currentQ] && i !== q.correct) cls += ' incorrect'
              }

              return (
                <li key={i} className={cls} onClick={() => handleAnswer(i)}>
                  {String.fromCharCode(65 + i)}. {opt}
                </li>
              )
            })}
          </ul>
          <div className={`quiz-explanation ${answered ? 'show' : ''}`}>{q.explain}</div>
        </div>

        <div className="quiz-nav-btns">
          <button onClick={backToExamSelection}>
            ← Back to Exams
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={prevQuestion} disabled={currentQ === 0}>
              ← Previous
            </button>
            {allQuestionsAnswered ? (
              <button
                onClick={finishExam}
                style={{
                  background: 'var(--green)',
                  color: 'white'
                }}
              >
                Finish Exam ✓
              </button>
            ) : (
              <button onClick={nextQuestion} disabled={currentQ === quizData.length - 1}>
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
