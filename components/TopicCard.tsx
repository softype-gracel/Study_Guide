'use client'

import { useState, memo } from 'react'
import InteractiveContent from './InteractiveContent'
import InlineQuiz from './InlineQuiz'
import type { Topic } from '@/data/topicsDataFromMarkdown'

interface TopicCardProps {
  topic: Topic
  isChecked: boolean
  toggleCheck: (topicId: string) => void
}

function TopicCard({ topic, isChecked, toggleCheck }: TopicCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`accordion-item${isOpen ? ' open' : ''}`}>
      <div className="accordion-head" onClick={() => setIsOpen(!isOpen)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => { e.stopPropagation(); toggleCheck(topic.id) }}
            onClick={(e) => e.stopPropagation()}
            style={{
              appearance: 'none', width: '18px', height: '18px',
              border: '2.5px solid var(--ink)', borderRadius: '6px',
              cursor: 'pointer', position: 'relative', flexShrink: 0,
              background: isChecked ? 'var(--mint)' : 'white',
            }}
          />
          {topic.title}
        </span>
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
