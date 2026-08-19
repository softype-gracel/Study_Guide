import { memo } from 'react'
import TopicCard from './TopicCard'
import type { Section as SectionType } from '@/data/topicsDataFromMarkdown'

const CHIP_COLORS = ['var(--pink)', 'var(--mint)', 'var(--blue)', 'var(--orange)', 'var(--purple)']
const SCRAWLS = [
  'tick a topic when you feel confident!',
  'these show up a lot on the exam ✏️',
  'draw arrows between related concepts',
  'great for a 5-min review before bed',
  'make a one-page cheat sheet from this',
]

interface SectionProps {
  section: SectionType
  active: boolean
  checkedTopics: Set<string>
  toggleCheck: (topicId: string) => void
}

function Section({ section, active, checkedTopics, toggleCheck }: SectionProps) {
  if (!active) return null

  const idx = section.id - 1
  const chipColor = CHIP_COLORS[idx % CHIP_COLORS.length]
  const scrawl = SCRAWLS[idx % SCRAWLS.length]
  const num = String(section.id).padStart(2, '0')

  return (
    <section className="study-section">
      <div className="section-label">
        <span className="section-chip" style={{ background: chipColor }}>{num}</span>
        <h2>{section.title}</h2>
      </div>

      {section.description && (
        <p style={{ color: 'var(--ink-soft)', fontWeight: 600, marginBottom: '8px' }}>
          {section.description}
        </p>
      )}

      <span className="note-scrawl">{scrawl}</span>

      {/* Objective checklist pinned card */}
      <div className="obj-note">
        <div className="tape" />
        <p className="obj-heading">✅ Topics in this section</p>
        <ul className="obj-list">
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
      </div>

      {/* Accordion for each topic */}
      <div style={{ marginTop: '28px' }}>
        {section.topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isChecked={checkedTopics.has(topic.id)}
            toggleCheck={toggleCheck}
          />
        ))}
      </div>
    </section>
  )
}

export default memo(Section)
