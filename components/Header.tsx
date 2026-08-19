import { RefObject } from 'react'

interface HeaderProps {
  progress: number
  barRef: RefObject<HTMLDivElement>
  pctRef: RefObject<HTMLDivElement>
}

export default function Header({ progress, barRef, pctRef }: HeaderProps) {
  return (
    <header className="top">
      <div>
        <span className="hero-badge">Oracle NetSuite · SuiteFoundation</span>
        <h1>The <span className="underline">Study Guide</span></h1>
        <p className="sub">
          All exam domains covered — classifications, roles, process flows,
          SuiteAnalytics, and more.
        </p>
      </div>

      <div className="mastery-note">
        <div ref={pctRef} className="pct">{progress}%</div>
        <div className="cap hand">mastered!</div>
        <div className="mastery-bar-track">
          <div
            ref={barRef}
            className="mastery-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  )
}
