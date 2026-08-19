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

    // Wait for CSS transition to complete and DOM to be fully rendered
    const timeoutId = setTimeout(() => {
      if (!contentRef.current) return

      const quizBlocks = contentRef.current.querySelectorAll('.quiz-block')

      if (quizBlocks.length === 0) return

      quizBlocks.forEach((block) => {
        const options = block.querySelectorAll('.quiz-opt')
        const explanation = block.querySelector('.quiz-explanation')
        let answered = false

        options.forEach((option) => {
          const li = option as HTMLLIElement

          const isCorrect = li.getAttribute('data-correct') === 'true'

          li.removeAttribute('onclick')
          li.style.cursor = 'pointer'

          const oldHandler = handlersRef.current.get(li)
          if (oldHandler) {
            li.removeEventListener('click', oldHandler)
          }

          const handleClick = (e: Event) => {
            e.preventDefault()
            e.stopPropagation()

            if (answered) return

            answered = true

            options.forEach((opt) => {
              opt.classList.add('disabled')
              ;(opt as HTMLElement).style.cursor = 'default'
            })

            options.forEach((opt) => {
              if ((opt as HTMLLIElement).getAttribute('data-correct') === 'true') {
                opt.classList.add('correct')
              }
            })

            if (!isCorrect) {
              li.classList.add('incorrect')
            }

            if (explanation) {
              explanation.classList.add('show')
            }
          }

          handlersRef.current.set(li, handleClick)
          li.addEventListener('click', handleClick)
        })
      })
    }, 350) // Wait for CSS transition (300ms) + buffer

    return () => {
      clearTimeout(timeoutId)
      handlersRef.current.forEach((handler, element) => {
        element.removeEventListener('click', handler)
      })
      handlersRef.current.clear()
    }
  }, [isVisible]) // html is static per card instance — no need to re-run when it hasn't changed

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
}
