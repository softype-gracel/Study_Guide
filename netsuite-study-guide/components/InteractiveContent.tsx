'use client'

import { useEffect, useRef } from 'react'

interface InteractiveContentProps {
  html: string
}

export default function InteractiveContent({ html }: InteractiveContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Find all quiz blocks
    const quizBlocks = contentRef.current.querySelectorAll('.quiz-block')

    quizBlocks.forEach((block) => {
      const options = block.querySelectorAll('.quiz-opt')
      const explanation = block.querySelector('.quiz-explanation')
      let answered = false

      options.forEach((option, index) => {
        const li = option as HTMLLIElement

        // Check if this is the correct answer
        const isCorrect = li.getAttribute('data-correct') === 'true'

        // Remove onclick attribute to prevent conflicts
        li.removeAttribute('onclick')

        // Add click handler
        li.addEventListener('click', () => {
          if (answered) return

          answered = true

          // Mark all options as disabled
          options.forEach((opt) => {
            opt.classList.add('disabled')
          })

          // Mark correct answer
          options.forEach((opt, idx) => {
            const isOptCorrect = (opt as HTMLLIElement).getAttribute('data-correct') === 'true'
            if (isOptCorrect) {
              opt.classList.add('correct')
            }
          })

          // Mark selected answer if incorrect
          if (!isCorrect) {
            li.classList.add('incorrect')
          }

          // Show explanation
          if (explanation) {
            explanation.classList.add('show')
          }
        })
      })
    })
  }, [html])

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
}
