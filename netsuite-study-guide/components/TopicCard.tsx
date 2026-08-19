'use client'

import { useState, memo } from 'react'
import InteractiveContent from './InteractiveContent'
import InlineQuiz from './InlineQuiz'
import type { Topic } from '@/data/topicsDataFromMarkdown'

interface TopicCardProps {
  topic: Topic
  accent: string
  isChecked: boolean
  toggleCheck: (topicId: string) => void
}

function TopicCard({ topic, accent: _accent, isChecked: _isChecked, toggleCheck: _toggleCheck }: TopicCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`accordion-item${isOpen ? ' open' : ''}`}>
      <div className="accordion-head" onClick={() => setIsOpen(!isOpen)}>
        <span>{topic.title}</span>
        <span className="plus">+</span>
      </div>
      <div className="accordion-body">
        <div className="accordion-body-inner">
          <div className="accordion-body-content">
            <InteractiveContent html={topic.content} isVisible={isOpen} />
            {topic.practiceQuestion && isOpen && (
              <InlineQuiz
                question={topic.practiceQuestion.question}
                options={topic.practiceQuestion.options}
                correctIndex={topic.practiceQuestion.correctIndex}
                explanation={topic.practiceQuestion.explanation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(TopicCard)
