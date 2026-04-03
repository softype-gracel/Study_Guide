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

// Export the parsed data
export const studyGuideData: StudyGuideData = parsedStudyGuide as StudyGuideData

// For backward compatibility, also export sections directly
export const sections = studyGuideData.sections
