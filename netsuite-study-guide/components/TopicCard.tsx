'use client'

import { useState } from 'react'
import InteractiveContent from './InteractiveContent'
import type { Topic } from '@/data/topicsData'

interface TopicCardProps {
  topic: Topic
  isChecked: boolean
  toggleCheck: (topicId: string) => void
}

export default function TopicCard({ topic, isChecked, toggleCheck }: TopicCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`topic-card ${isOpen ? 'open' : ''}`}>
      <div className="topic-header" onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`topic-checkbox ${isChecked ? 'checked' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            toggleCheck(topic.id)
          }}
        ></div>
        <h3 className="topic-title">{topic.title}</h3>
        <div className="topic-toggle">▼</div>
      </div>

      <div className="topic-content">
        <InteractiveContent html={topic.content} isVisible={isOpen} />
      </div>
    </div>
  )
}
