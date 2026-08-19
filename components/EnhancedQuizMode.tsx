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
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)

  // Derive counts from quizAnswers to avoid async state drift
  const quizAnswered = quizAnswers.filter((a) => a !== null).length
  const quizCorrect = quizAnswers.reduce<number>((sum, answer, i) => {
    if (answer !== null && answer === quizData[i]?.correct) return sum + 1
    return sum
  }, 0)

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
    setCurrentQ(0); setShowResults(false)
  }

  const handleAnswer = (idx: number) => {
    if (quizAnswers[currentQ] !== null) return
    const next = [...quizAnswers]
    next[currentQ] = idx
    setQuizAnswers(next)
  }

  const restartQuiz = () => {
    if (!selectedExam) return
    const shuffled = shuffleArray(selectedExam.questions)
    setQuizData(shuffled)
    setQuizAnswers(new Array(shuffled.length).fill(null))
    setCurrentQ(0)
    setShowResults(false)
  }

  const backToExamSelection = () => {
    setSelectedExam(null)
    setQuizData([])
    setQuizAnswers([])
    setCurrentQ(0)
    setShowResults(false)
  }

  // ── Exam selection ──
  if (!selectedExam || quizData.length === 0) {
    return (
      <section className="study-section">
        <div className="section-label">
          <span className="section-chip" style={{ background: 'var(--purple)' }}>06</span>
          <h2>Practice Quiz</h2>
        </div>
        <span className="note-scrawl">pick an exam and go for it — you've got this!</span>

        <div className="exam-selection-container">
          {availableExams.length === 0 && (
            <p style={{ color: 'var(--ink-soft)', fontFamily: "'Kalam', cursive", marginTop: '12px' }}>
              Loading exams…
            </p>
          )}
          {availableExams.map((exam) => (
            <div key={exam.id} className="exam-card" onClick={() => startExam(exam)}>
              <h3>{exam.title}</h3>
              {exam.description && <p>{exam.description}</p>}
              <div className="exam-meta">
                <span>📋 {exam.totalQuestions} questions</span>
                {exam.timeAllowed && <span>⏱ {exam.timeAllowed}</span>}
                {exam.passingScore && <span>🎯 Pass @ {exam.passingScore}</span>}
              </div>
              <button className="exam-start-btn" onClick={(e) => { e.stopPropagation(); startExam(exam) }}>Start Exam →</button>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ── Results ──
  if (showResults) {
    const pct = Math.round((quizCorrect / quizData.length) * 100)
    const threshold = selectedExam.passingScore
      ? (parseInt(selectedExam.passingScore.replace(/\D/g, '')) || 70)
      : 70
    const passed = pct >= threshold

    return (
      <section className="study-section">
        <div className="section-label">
          <span className="section-chip" style={{ background: 'var(--purple)' }}>06</span>
          <h2>Results</h2>
        </div>

        <div className="results-card">
          <div className={`results-badge ${passed ? 'passed' : 'failed'}`}>
            {passed ? '🎉 PASSED' : '📚 NOT PASSED'}
          </div>
          <div className={`results-score ${passed ? 'passed' : 'failed'}`}>{pct}%</div>
          <div className="results-sub">{quizCorrect} of {quizData.length} correct</div>
          <div className="results-stats">
            <div>
              <div className="results-stat-label">Correct</div>
              <div className="results-stat-val" style={{ color: 'var(--mint)' }}>{quizCorrect}</div>
            </div>
            <div>
              <div className="results-stat-label">Incorrect</div>
              <div className="results-stat-val" style={{ color: 'var(--pink)' }}>{quizData.length - quizCorrect}</div>
            </div>
            <div>
              <div className="results-stat-label">Passing score</div>
              <div className="results-stat-val" style={{ color: 'var(--ink)' }}>{threshold}%</div>
            </div>
          </div>
          <div className={`results-feedback ${passed ? 'passed' : 'failed'}`}>
            {passed
              ? <><strong>Woohoo!</strong> You nailed it. Great work studying this material!</>
              : <><strong>Almost there!</strong> Review the sections above and give it another shot.</>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="exam-start-btn" onClick={restartQuiz}>🔄 Retake</button>
          <button
            onClick={backToExamSelection}
            style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '14px',
              background: 'var(--cork)', border: '2.5px solid var(--ink)', color: 'var(--ink)',
              borderRadius: '20px', padding: '8px 20px', cursor: 'pointer',
              boxShadow: '0 3px 0 rgba(46,42,37,0.15)',
            }}
          >
            ← All Exams
          </button>
        </div>
      </section>
    )
  }

  // ── Question ──
  const q = quizData[currentQ]
  const answered = quizAnswers[currentQ] !== null
  const allAnswered = quizAnswers.every((a) => a !== null)
  const pctLive = quizAnswered > 0 ? Math.round((quizCorrect / quizAnswered) * 100) : 0

  return (
    <section className="study-section">
      <div className="section-label">
        <span className="section-chip" style={{ background: 'var(--purple)' }}>06</span>
        <h2>{selectedExam.title}</h2>
      </div>

      <div className="quiz-mode-container">
        <div className="quiz-mode-header">
          <h3>Question {currentQ + 1} / {quizData.length}</h3>
          <div className="quiz-score-display">
            {quizCorrect}/{quizAnswered} correct {quizAnswered > 0 && `· ${pctLive}%`}
          </div>
        </div>

        <div className="quiz-domain">📂 {q.domain}</div>
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
            {allAnswered
              ? <button className="btn-finish" onClick={() => setShowResults(true)}>Finish ✓</button>
              : <button onClick={() => setCurrentQ((p) => p + 1)} disabled={currentQ === quizData.length - 1}>Next →</button>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
