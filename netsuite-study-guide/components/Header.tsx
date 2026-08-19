import { RefObject } from 'react'

interface HeaderProps {
  progress: number
  ringRef: RefObject<SVGCircleElement>
  ringLabelRef: RefObject<HTMLDivElement>
}

const CIRC = 238.76

export default function Header({ progress, ringRef, ringLabelRef }: HeaderProps) {
  return (
    <header className="top">
      <div>
        <div className="eyebrow">SuiteFoundation Certification</div>
        <h1>NetSuite Study Guide</h1>
        <p className="sub">
          Comprehensive review of all exam domains — classifications, roles,
          process flows, SuiteAnalytics, and more.
        </p>
      </div>

      <div className="mastery">
        <div className="ring-wrap">
          <svg width="92" height="92" viewBox="0 0 92 92">
            <circle className="ring-bg" cx="46" cy="46" r="38" />
            <circle
              ref={ringRef}
              className="ring-fg"
              cx="46"
              cy="46"
              r="38"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (CIRC * progress) / 100}
            />
          </svg>
          <div ref={ringLabelRef} className="ring-label">{progress}%</div>
        </div>
        <div className="mastery-caption">Mastery</div>
      </div>
    </header>
  )
}
