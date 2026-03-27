interface TabNavigationProps {
  activeTab: number
  setActiveTab: (tab: number) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: 1, label: 'Setup & Admin' },
    { id: 2, label: 'User Interface' },
    { id: 3, label: 'Process Flows' },
    { id: 4, label: 'SuiteAnalytics' },
    { id: 5, label: 'Maintenance & Security' },
    { id: 6, label: 'Practice Quiz' },
  ]

  return (
    <nav className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
