'use client'

import { useState, useEffect } from 'react'
import { quizDataAll, type QuizQuestion } from '@/data/quizData'

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function QuizMode() {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [quizCorrect, setQuizCorrect] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([])

  useEffect(() => {
    const shuffled = shuffleArray(quizDataAll)
    setQuizData(shuffled)
    setQuizAnswers(new Array(shuffled.length).fill(null))
  }, [])

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
    const shuffled = shuffleArray(quizDataAll)
    setQuizData(shuffled)
    setCurrentQ(0)
    setQuizCorrect(0)
    setQuizAnswered(0)
    setQuizAnswers(new Array(shuffled.length).fill(null))
  }

  if (quizData.length === 0) {
    return <div>Loading quiz...</div>
  }

  const q = quizData[currentQ]
  const answered = quizAnswers[currentQ] !== null
  const isLastQuestion = currentQ === quizData.length - 1

  return (
    <div className="section active">
      <div className="section-header">
        <h2>Practice Quiz</h2>
        <p>Test your knowledge with randomized questions from all domains</p>
      </div>

      <div className="quiz-mode-container">
        <div className="quiz-mode-header">
          <h3>
            Question {currentQ + 1} of {quizData.length}
          </h3>
          <div className="quiz-score-display">
            Score: {quizCorrect} / {quizAnswered}
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
          <button onClick={prevQuestion} disabled={currentQ === 0}>
            ← Previous
          </button>
          {isLastQuestion && answered ? (
            <button onClick={restartQuiz}>Restart Quiz</button>
          ) : (
            <button onClick={nextQuestion} disabled={currentQ === quizData.length - 1}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
