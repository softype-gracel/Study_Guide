import TopicCard from './TopicCard'
import type { Section as SectionType } from '@/data/topicsDataFromMarkdown'

interface SectionProps {
  section: SectionType
  active: boolean
  checkedTopics: Set<string>
  toggleCheck: (topicId: string) => void
}

export default function Section({ section, active, checkedTopics, toggleCheck }: SectionProps) {
  if (!active) return null

  return (
    <div className="section active">
      <div className="section-header">
        <h2>{section.title}</h2>
        {section.description && <p>{section.description}</p>}
      </div>

      {section.topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          isChecked={checkedTopics.has(topic.id)}
          toggleCheck={toggleCheck}
        />
      ))}
    </div>
  )
}
