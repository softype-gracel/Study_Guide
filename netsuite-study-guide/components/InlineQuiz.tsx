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

  return (
    <div className="q-item" style={{ marginTop: '1.25rem' }}>
      <div className="q-top">
        <div className="q-text">{question}</div>
        {!revealed && (
          <button className="q-reveal-btn" onClick={() => setSelected(-1)}>Reveal</button>
        )}
        {revealed && (
          <button className="q-reveal-btn" onClick={() => setSelected(null)}>Hide</button>
        )}
      </div>

      {revealed && (
        <ul className="quiz-options" style={{ marginTop: '12px' }}>
          {options.map((opt, i) => {
            let cls = 'quiz-opt'
            cls += ' disabled'
            if (i === correctIndex) cls += ' correct'
            else if (i === selected && i !== correctIndex) cls += ' incorrect'
            return <li key={i} className={cls}>{String.fromCharCode(65 + i)}. {opt}</li>
          })}
        </ul>
      )}

      <div className={`q-answer${revealed ? ' ' : ''}`} style={revealed ? { display: 'block' } : {}}>
        <div className="q-answer-inner">
          {revealed && (
            <div className="q-answer-content">{explanation}</div>
          )}
        </div>
      </div>

      <div className="q-footer">
        <input
          type="checkbox"
          id={`understood-${question.slice(0, 20)}`}
          checked={understood}
          onChange={() => setUnderstood(!understood)}
        />
        <label htmlFor={`understood-${question.slice(0, 20)}`}>Mark as understood</label>
      </div>
    </div>
  )
}
