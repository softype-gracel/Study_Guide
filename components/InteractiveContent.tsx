'use client'

import { useEffect, useRef } from 'react'

interface InteractiveContentProps {
  html: string
  isVisible?: boolean
}

export default function InteractiveContent({ html, isVisible = true }: InteractiveContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const handlersRef = useRef<Map<HTMLElement, (e: Event) => void>>(new Map())

  useEffect(() => {
    // Only attach handlers when content is visible
    if (!contentRef.current || !isVisible) return

    console.log('InteractiveContent: Setting up quiz handlers (isVisible:', isVisible, ')')

    // Wait for CSS transition to complete and DOM to be fully rendered
    const timeoutId = setTimeout(() => {
      if (!contentRef.current) return

      // Find all quiz blocks
      const quizBlocks = contentRef.current.querySelectorAll('.quiz-block')
      console.log('Found quiz blocks:', quizBlocks.length)

      if (quizBlocks.length === 0) return

      quizBlocks.forEach((block, blockIndex) => {
        const options = block.querySelectorAll('.quiz-opt')
        const explanation = block.querySelector('.quiz-explanation')
        let answered = false

        console.log(`Block ${blockIndex}: Found ${options.length} options`)

        options.forEach((option, optIndex) => {
          const li = option as HTMLLIElement

          // Check if this is the correct answer
          const isCorrect = li.getAttribute('data-correct') === 'true'
          console.log(`Block ${blockIndex}, Option ${optIndex}: correct=${isCorrect}`)

          // Remove onclick attribute to prevent conflicts
          li.removeAttribute('onclick')

          // Make sure cursor shows it's clickable
          li.style.cursor = 'pointer'

          // Remove old handler if exists
          const oldHandler = handlersRef.current.get(li)
          if (oldHandler) {
            li.removeEventListener('click', oldHandler)
          }

          // Create handler function
          const handleClick = (e: Event) => {
            console.log('Quiz option clicked!', { answered, isCorrect })
            e.preventDefault()
            e.stopPropagation()

            if (answered) return

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

          // Store handler reference
          handlersRef.current.set(li, handleClick)

          // Add click handler
          li.addEventListener('click', handleClick)
          console.log(`Added handler to option ${optIndex}`)
        })
      })

      console.log('Quiz handlers setup complete')
    }, 350) // Wait for CSS transition (300ms) + buffer

    return () => {
      clearTimeout(timeoutId)
      // Cleanup handlers
      handlersRef.current.forEach((handler, element) => {
        element.removeEventListener('click', handler)
      })
      handlersRef.current.clear()
    }
  }, [html, isVisible])

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
}
