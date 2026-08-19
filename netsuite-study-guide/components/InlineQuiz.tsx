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
  const [understood, setUnderstood] = useState(false)
  const revealed = selected !== null

  const uid = question.slice(0, 20).replace(/\s/g, '-')

  return (
    <div className="q-item" style={{ marginTop: '16px' }}>
      <div className="q-top">
        <div className="q-text">{question}</div>
        <button
          className="q-reveal-btn"
          onClick={() => setSelected(revealed ? null : -1)}
        >
          {revealed ? 'Hide' : 'Reveal'}
        </button>
      </div>

      {revealed && (
        <ul className="quiz-options" style={{ marginTop: '12px' }}>
          {options.map((opt, i) => {
            let cls = 'quiz-opt disabled'
            if (i === correctIndex) cls += ' correct'
            else if (i === selected && i !== correctIndex) cls += ' incorrect'
            return <li key={i} className={cls}>{String.fromCharCode(65 + i)}. {opt}</li>
          })}
        </ul>
      )}

      <div className={`q-answer${revealed ? ' revealed' : ''}`} style={revealed ? { display: 'block' } : {}}>
        <div className="q-answer-inner">
          {revealed && <div className="q-answer-content">{explanation}</div>}
        </div>
      </div>

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
