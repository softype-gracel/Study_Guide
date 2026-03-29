'use client'

import { useEffect, useRef } from 'react'

interface InteractiveContentProps {
  html: string
}

export default function InteractiveContent({ html }: InteractiveContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const handlersAttached = useRef(false)

  useEffect(() => {
    if (!contentRef.current || handlersAttached.current) return

    console.log('Attaching quiz handlers...')

    // Find all quiz blocks
    const quizBlocks = contentRef.current.querySelectorAll('.quiz-block')
    console.log('Found quiz blocks:', quizBlocks.length)

    quizBlocks.forEach((block) => {
      const options = block.querySelectorAll('.quiz-opt')
      const explanation = block.querySelector('.quiz-explanation')
      let answered = false

      options.forEach((option) => {
        const li = option as HTMLLIElement

        // Check if this is the correct answer
        const isCorrect = li.getAttribute('data-correct') === 'true'

        // Remove onclick attribute to prevent conflicts
        li.removeAttribute('onclick')

        // Make sure cursor shows it's clickable
        li.style.cursor = 'pointer'

        // Create handler function
        const handleClick = (e: Event) => {
          console.log('Quiz option clicked!', { answered, isCorrect })
          e.preventDefault()
          e.stopPropagation()

          if (answered) {
            console.log('Already answered, ignoring')
            return
          }

          answered = true

          // Mark all options as disabled
          options.forEach((opt) => {
            opt.classList.add('disabled')
            ;(opt as HTMLElement).style.cursor = 'default'
          })

          // Mark correct answer
          options.forEach((opt) => {
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
        }

        // Add click handler
        li.addEventListener('click', handleClick, { once: false })
      })
    })

    handlersAttached.current = true
  }, [html])

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
}
