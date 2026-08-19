import { memo } from 'react'
import TopicCard from './TopicCard'
import type { Section as SectionType } from '@/data/topicsDataFromMarkdown'

const SECTION_COLORS = ['yellow', 'coral', 'sky', 'yellow', 'coral'] as const

interface SectionProps {
  section: SectionType
  active: boolean
  checkedTopics: Set<string>
  toggleCheck: (topicId: string) => void
}

function Section({ section, active, checkedTopics, toggleCheck }: SectionProps) {
  if (!active) return null

  const num = String(section.id).padStart(2, '0')
  const color = SECTION_COLORS[(section.id - 1) % SECTION_COLORS.length]

  return (
    <section className="study-section" id={`section-${section.id}`}>
      <div className="section-label">
        <span className="num">{num}</span>
        <h2>{section.title}</h2>
      </div>

      {section.description && (
        <p style={{ color: 'var(--chalk-dim)', marginBottom: '1rem' }}>{section.description}</p>
      )}

      <p className="note-hand">tick a topic when you feel confident — watch the mastery ring grow</p>

      <p className="obj-heading">Topics</p>
      <ul className="obj-list" style={{ marginBottom: '2rem' }}>
        {section.topics.map((topic) => (
          <li key={topic.id}>
            <input
              type="checkbox"
              id={`obj-${topic.id}`}
              checked={checkedTopics.has(topic.id)}
              onChange={() => toggleCheck(topic.id)}
            />
            <label htmlFor={`obj-${topic.id}`}>{topic.title}</label>
          </li>
        ))}
      </ul>

      <div id="accordion">
        {section.topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            accent={color}
            isChecked={checkedTopics.has(topic.id)}
            toggleCheck={toggleCheck}
          />
        ))}
      </div>
    </section>
  )
}

export default memo(Section)
