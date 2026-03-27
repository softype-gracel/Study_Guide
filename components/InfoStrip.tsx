export default function InfoStrip() {
  const infoItems = [
    { val: '$300', lbl: 'Exam Fee' },
    { val: '$150', lbl: 'Retake Cost' },
    { val: '77 Q', lbl: 'Format' },
    { val: '1+ yr', lbl: 'Recommended Experience' },
    { val: '5', lbl: 'Exam Domains' },
  ]

  return (
    <div className="info-strip">
      <div className="info-grid">
        {infoItems.map((item, index) => (
          <div key={index} className="info-item">
            <span className="info-val">{item.val}</span>
            <span className="info-lbl">{item.lbl}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
