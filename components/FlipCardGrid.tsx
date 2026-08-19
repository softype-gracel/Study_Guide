'use client'

import { useState } from 'react'
import type { Topic } from '@/data/topicsDataFromMarkdown'

const ACCENTS = ['yellow', 'pink', 'mint', 'blue', 'purple', 'yellow', 'pink', 'mint', 'blue', 'purple']

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function getBackText(topic: Topic): string {
  // Prefer the mnemonic box content, then tip box, then first sentence of content
  const mnemonic = topic.content.match(/class="mnemonic-box"[^>]*>([\s\S]*?)<\/div>/)
  if (mnemonic) {
    const text = stripHtml(mnemonic[1]).slice(0, 100)
    return text.length > 80 ? text.slice(0, 80) + '…' : text
  }
  const tip = topic.content.match(/class="tip-box"[^>]*>([\s\S]*?)<\/div>/)
  if (tip) {
    const text = stripHtml(tip[1]).replace(/^Exam Tip:\s*/i, '').slice(0, 100)
    return text.length > 80 ? text.slice(0, 80) + '…' : text
  }
  // Fall back to first sentence of plain text
  const plain = stripHtml(topic.content)
  const sentence = plain.split(/[.!?]/)[0]
  return sentence.length > 80 ? sentence.slice(0, 80) + '…' : sentence
}

interface FlipCardGridProps {
  topics: Topic[]
}

export default function FlipCardGrid({ topics }: FlipCardGridProps) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="card-grid">
      {topics.map((topic, i) => {
        const accent = ACCENTS[i % ACCENTS.length]
        const isFlipped = flipped.has(topic.id)
        return (
          <div
            key={topic.id}
            className={`flip-card${isFlipped ? ' flipped' : ''}`}
            data-accent={accent}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            onClick={() => toggle(topic.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(topic.id) } }}
          >
            <div className="flip-inner">
              <div className="flip-face flip-front">{topic.title}</div>
              <div className="flip-face flip-back">{getBackText(topic)}</div>
            </div>
            <span className="flip-hint">{isFlipped ? 'flip back ←' : 'flip →'}</span>
          </div>
        )
      })}
    </div>
  )
}
