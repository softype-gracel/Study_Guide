interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <span className="progress-label">Study Progress</span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="progress-pct">{progress}%</span>
    </div>
  )
}
