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

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch('/api/quiz-exams')
        if (res.ok) setAvailableExams(await res.json())
      } catch (err) {
        console.error('Error fetching quiz exams:', err)
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
    if (idx === quizData[currentQ].correct) setQuizCorrect((p) => p + 1)
    setQuizAnswered((p) => p + 1)
  }

  const restartQuiz = () => {
    if (!selectedExam) return
    const shuffled = shuffleArray(selectedExam.questions)
    setQuizData(shuffled)
    setCurrentQ(0)
    setQuizCorrect(0)
    setQuizAnswered(0)
    setQuizAnswers(new Array(shuffled.length).fill(null))
    setShowResults(false)
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

  // ── Exam selection ──
  if (!selectedExam || quizData.length === 0) {
    return (
      <section className="study-section">
        <div className="section-label">
          <span className="num">06</span>
          <h2>Practice Quiz</h2>
        </div>
        <p style={{ color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
          Select an exam to begin. Questions are randomised each attempt.
        </p>
        <p className="note-hand">treat each wrong answer as a free hint — not a failure</p>

        <div className="exam-selection-container">
          {availableExams.length === 0 && (
            <p style={{ color: 'var(--chalk-dim)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px' }}>
              Loading exams…
            </p>
          )}
          {availableExams.map((exam) => (
            <div key={exam.id} className="exam-card" onClick={() => startExam(exam)}>
              <h3>{exam.title}</h3>
              {exam.description && <p>{exam.description}</p>}
              <div className="exam-meta">
                <span><strong>Questions:</strong> {exam.totalQuestions}</span>
                {exam.timeAllowed && <span><strong>Time:</strong> {exam.timeAllowed}</span>}
                {exam.passingScore && <span><strong>Passing:</strong> {exam.passingScore}</span>}
              </div>
              <button className="exam-start-btn">Start Exam →</button>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ── Results ──
  if (showResults) {
    const pct = Math.round((quizCorrect / quizData.length) * 100)
    const threshold = selectedExam.passingScore ? parseInt(selectedExam.passingScore) : 70
    const passed = pct >= threshold

    return (
      <section className="study-section">
        <div className="section-label">
          <span className="num">06</span>
          <h2>Exam Results</h2>
        </div>

        <div className="results-card">
          <div className={`results-badge ${passed ? 'passed' : 'failed'}`}>
            {passed ? '✓ PASSED' : '✗ NOT PASSED'}
          </div>
          <div className={`results-score ${passed ? 'passed' : 'failed'}`}>{pct}%</div>
          <div className="results-sub">{quizCorrect} of {quizData.length} correct</div>
          <div className="results-stats">
            <div>
              <div className="results-stat-label">Correct</div>
              <div className="results-stat-val" style={{ color: '#64c882' }}>{quizCorrect}</div>
            </div>
            <div>
              <div className="results-stat-label">Incorrect</div>
              <div className="results-stat-val" style={{ color: 'var(--coral)' }}>{quizData.length - quizCorrect}</div>
            </div>
            <div>
              <div className="results-stat-label">Passing Score</div>
              <div className="results-stat-val" style={{ color: 'var(--chalk)' }}>{threshold}%</div>
            </div>
          </div>
          <div className={`results-feedback ${passed ? 'passed' : 'failed'}`}>
            {passed
              ? <><strong>Congratulations!</strong> You&apos;ve demonstrated solid knowledge of this material.</>
              : <><strong>Keep going!</strong> Review the study sections and try again — you&apos;re getting there.</>
            }
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="exam-start-btn" onClick={restartQuiz}>Retake Exam</button>
          <button
            className="q-reveal-btn"
            onClick={backToExamSelection}
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            ← All Exams
          </button>
        </div>
      </section>
    )
  }

  // ── Question interface ──
  const q = quizData[currentQ]
  const answered = quizAnswers[currentQ] !== null
  const allAnswered = quizAnswers.every((a) => a !== null)
  const pctLive = quizAnswered > 0 ? Math.round((quizCorrect / quizAnswered) * 100) : 0

  return (
    <section className="study-section">
      <div className="section-label">
        <span className="num">06</span>
        <h2>{selectedExam.title}</h2>
      </div>

      <div className="quiz-mode-container">
        <div className="quiz-mode-header">
          <h3>Question {currentQ + 1} / {quizData.length}</h3>
          <div className="quiz-score-display">
            {quizCorrect} / {quizAnswered} correct
            {quizAnswered > 0 && ` · ${pctLive}%`}
            {selectedExam.passingScore && ` · pass @ ${selectedExam.passingScore}`}
          </div>
        </div>

        <div className="quiz-domain">Domain: {q.domain}</div>
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

        <div className={`quiz-explanation${answered ? ' show' : ''}`}>{q.explain}</div>

        <div className="quiz-nav-btns">
          <button onClick={backToExamSelection}>← Exams</button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentQ((p) => p - 1)} disabled={currentQ === 0}>← Prev</button>
            {allAnswered ? (
              <button className="btn-finish" onClick={() => setShowResults(true)}>Finish ✓</button>
            ) : (
              <button onClick={() => setCurrentQ((p) => p + 1)} disabled={currentQ === quizData.length - 1}>
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
