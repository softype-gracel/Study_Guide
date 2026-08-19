'use client'

import { useState } from 'react'

interface InlineQuizProps {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export default function InlineQuiz({ question, options, correctIndex, explanation }: InlineQuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [understood, setUnderstood] = useState(false)

  const uid = question.slice(0, 20).replace(/\s/g, '-')

  const handleReveal = () => {
    if (revealed) {
      // Hide — reset everything
      setRevealed(false)
      setSelected(null)
    } else {
      setRevealed(true)
    }
  }

  const handleSelect = (i: number) => {
    if (selected !== null) return // already answered
    setSelected(i)
  }

  return (
    <div className="q-item" style={{ marginTop: '16px' }}>
      <div className="q-top">
        <div className="q-text">{question}</div>
        <button className="q-reveal-btn" onClick={handleReveal}>
          {revealed ? 'Hide' : 'Reveal'}
        </button>
      </div>

      {revealed && (
        <ul className="quiz-options" style={{ marginTop: '12px' }}>
          {options.map((opt, i) => {
            let cls = 'quiz-opt'
            if (selected !== null) {
              cls += ' disabled'
              if (i === correctIndex) cls += ' correct'
              else if (i === selected) cls += ' incorrect'
            }
            return (
              <li
                key={i}
                className={cls}
                role="button"
                tabIndex={selected !== null ? -1 : 0}
                onClick={() => handleSelect(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(i) } }}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </li>
            )
          })}
        </ul>
      )}

      {revealed && selected !== null && (
        <div className="quiz-explanation show" style={{ marginTop: '8px' }}>
          {explanation}
        </div>
      )}

      <div className="q-footer">
        <input
          type="checkbox"
          id={`got-${uid}`}
          checked={understood}
          onChange={() => setUnderstood(!understood)}
        />
        <label htmlFor={`got-${uid}`}>Got it! ✔</label>
      </div>
    </div>
  )
}
