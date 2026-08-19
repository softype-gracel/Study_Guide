export default function Footer() {
  return (
    <footer style={{
      marginTop: '64px',
      paddingTop: '24px',
      borderTop: '1px dashed rgba(242,239,227,0.12)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '11px',
      color: 'var(--chalk-dim)',
    }}>
      Based on official NetSuite SuiteFoundation study materials.{' '}
      <a
        href="https://www.netsuite.com/portal/services/training/certification.shtml"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--sky)', textDecoration: 'underline' }}
      >
        NetSuite Certification ↗
      </a>
    </footer>
  )
}
