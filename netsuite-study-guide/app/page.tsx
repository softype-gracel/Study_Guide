'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Header from '@/components/Header'
import Section from '@/components/Section'
import EnhancedQuizMode from '@/components/EnhancedQuizMode'
import Footer from '@/components/Footer'
import { studyGuideData } from '@/data/topicsDataFromMarkdown'

const QUIZ_TAB_ID = 6

const totalTopics = studyGuideData.sections.reduce(
  (sum, s) => sum + s.topics.length,
  0
)

const TABS = [
  ...studyGuideData.sections.map((s) => ({ id: s.id, label: s.title })),
  { id: QUIZ_TAB_ID, label: '📝 Practice Quiz' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(1)
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set())
  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLDivElement>(null)

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
    if (barRef.current) barRef.current.style.width = `${progress}%`
    if (pctRef.current) pctRef.current.textContent = `${progress}%`
  }, [progress])

  const toggleCheck = useCallback((topicId: string) => {
    setCheckedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(topicId)) next.delete(topicId)
      else next.add(topicId)
      return next
    })
  }, [])

  return (
    <>
      {/* Sticky top nav */}
      <div className="topnav-wrap">
        <nav className="topnav">
          <div className="brand">📌 StudyBoard</div>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <main>
        <Header progress={progress} barRef={barRef} pctRef={pctRef} />

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
    </>
  )
}
