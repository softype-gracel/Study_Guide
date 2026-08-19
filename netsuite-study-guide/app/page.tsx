'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Header from '@/components/Header'
import Section from '@/components/Section'
import EnhancedQuizMode from '@/components/EnhancedQuizMode'
import Footer from '@/components/Footer'
import { studyGuideData } from '@/data/topicsDataFromMarkdown'

const TAB_COLORS = ['yellow', 'coral', 'sky', 'yellow', 'coral', 'sky'] as const
const QUIZ_TAB_ID = 6

const totalTopics = studyGuideData.sections.reduce(
  (sum, s) => sum + s.topics.length,
  0
)

const CIRC = 238.76

export default function Home() {
  const [activeTab, setActiveTab] = useState(1)
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set())
  const ringRef = useRef<SVGCircleElement>(null)
  const ringLabelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('checkedTopics')
    if (saved) setCheckedTopics(new Set(JSON.parse(saved)))
  }, [])

  useEffect(() => {
    localStorage.setItem('checkedTopics', JSON.stringify(Array.from(checkedTopics)))
  }, [checkedTopics])

  const progress = useMemo(
    () => (totalTopics > 0 ? Math.round((checkedTopics.size / totalTopics) * 100) : 0),
    [checkedTopics.size]
  )

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(CIRC - (CIRC * progress) / 100)
    }
    if (ringLabelRef.current) {
      ringLabelRef.current.textContent = `${progress}%`
    }
  }, [progress])

  const toggleCheck = useCallback((topicId: string) => {
    setCheckedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(topicId)) next.delete(topicId)
      else next.add(topicId)
      return next
    })
  }, [])

  const tabs = [
    ...studyGuideData.sections.map((s, i) => ({
      id: s.id,
      label: s.title,
      color: TAB_COLORS[i] ?? 'sky',
    })),
    { id: QUIZ_TAB_ID, label: 'Practice Quiz', color: 'sky' as const },
  ]

  return (
    <div className="app">
      {/* Left rail */}
      <nav className="rail">
        <div className="rail-brand">
          <div className="eyebrow">Oracle NetSuite</div>
          <div className="name">Study Guide</div>
        </div>

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab${activeTab === tab.id ? ' active' : ''}`}
            data-color={tab.color}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="dot" />
            {tab.label}
          </button>
        ))}

        <div className="rail-footer">SuiteFoundation Exam Prep</div>
      </nav>

      {/* Main content */}
      <main>
        <Header progress={progress} ringRef={ringRef} ringLabelRef={ringLabelRef} />

        {studyGuideData.sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            active={activeTab === section.id}
            checkedTopics={checkedTopics}
            toggleCheck={toggleCheck}
          />
        ))}

        {activeTab === QUIZ_TAB_ID && <EnhancedQuizMode />}

        <Footer />
      </main>
    </div>
  )
}
