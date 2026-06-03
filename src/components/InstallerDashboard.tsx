export default function InstallerDashboard({ user }: { user: any }) {
  return (
    <div className="container">
      <div style={{ marginTop: '20px' }}>
        <h1>🔧 התקנות שלי</h1>
        <p style={{ color: '#888', marginTop: '10px' }}>
          ברוך הבא, {user.email}
        </p>
        <div style={{ marginTop: '30px', padding: '20px', background: '#1a1a1a', borderRadius: '12px' }}>
          <p>כאן תוכל לראות את התקנות שלך ולתעד עם תמונות וסטטוס</p>
          <p style={{ marginTop: '10px', color: '#888', fontSize: '12px' }}>
            (הבנייה בתהליך...)
          </p>
        </div>
      </div>
    </div>
  )
}
