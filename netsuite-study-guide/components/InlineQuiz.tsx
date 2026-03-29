'use client'

import { useState } from 'react'

interface InlineQuizProps {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export default function InlineQuiz({ question, options, correctIndex, explanation }: InlineQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index)
    }
  }

  return (
    <div className="quiz-block">
      <h4>Practice Question</h4>
      <div className="quiz-q">{question}</div>
      <ul className="quiz-options">
        {options.map((option, index) => {
          let className = 'quiz-opt'

          if (selectedAnswer !== null) {
            className += ' disabled'
            if (index === correctIndex) {
              className += ' correct'
            } else if (index === selectedAnswer && index !== correctIndex) {
              className += ' incorrect'
            }
          }

          return (
            <li
              key={index}
              className={className}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </li>
          )
        })}
      </ul>
      <div className={`quiz-explanation ${selectedAnswer !== null ? 'show' : ''}`}>
        {explanation}
      </div>
    </div>
  )
}
