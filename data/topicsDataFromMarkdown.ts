// Load study guide data from parsed markdown files
import parsedStudyGuide from './parsedStudyGuide.json'

export interface Topic {
  id: string
  title: string
  content: string
  practiceQuestion?: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  } | null
}

export interface Section {
  id: number
  title: string
  description?: string
  topics: Topic[]
}

export interface StudyGuideData {
  title: string
  sections: Section[]
}

// Prefix each topic ID with its section ID to make them globally unique.
// The raw JSON reuses ids like "topic-1" across sections, which would cause
// checkedTopics to incorrectly mark the same id in every section.
const raw = parsedStudyGuide as StudyGuideData
export const studyGuideData: StudyGuideData = {
  ...raw,
  sections: raw.sections.map((section) => ({
    ...section,
    topics: section.topics.map((topic) => ({
      ...topic,
      id: `s${section.id}-${topic.id}`,
    })),
  })),
}

export const sections = studyGuideData.sections
