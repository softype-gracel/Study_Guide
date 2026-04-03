'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProgressBar from '@/components/ProgressBar'
import InfoStrip from '@/components/InfoStrip'
import TabNavigation from '@/components/TabNavigation'
import Section from '@/components/Section'
import EnhancedQuizMode from '@/components/EnhancedQuizMode'
import Footer from '@/components/Footer'
import { studyGuideData } from '@/data/topicsDataFromMarkdown'

export default function Home() {
  const [activeTab, setActiveTab] = useState(1)
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('checkedTopics')
    if (saved) {
      setCheckedTopics(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('checkedTopics', JSON.stringify(Array.from(checkedTopics)))
    updateProgress()
  }, [checkedTopics])

  const updateProgress = () => {
    const totalTopics = studyGuideData.sections.reduce(
      (sum, section) => sum + section.topics.length,
      0
    )
    const percentage = totalTopics > 0 ? (checkedTopics.size / totalTopics) * 100 : 0
    setProgress(Math.round(percentage))
  }

  const toggleCheck = (topicId: string) => {
    setCheckedTopics((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(topicId)) {
        newSet.delete(topicId)
      } else {
        newSet.add(topicId)
      }
      return newSet
    })
  }

  return (
    <>
      <Header />
      <ProgressBar progress={progress} />
      <InfoStrip />

      <div className="container">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {studyGuideData.sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            active={activeTab === section.id}
            checkedTopics={checkedTopics}
            toggleCheck={toggleCheck}
          />
        ))}

        {activeTab === 6 && <EnhancedQuizMode />}
      </div>

      <Footer />
    </>
  )
}
