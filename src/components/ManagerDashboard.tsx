export default function ManagerDashboard({ user }: { user: any }) {
  return (
    <div className="container">
      <div style={{ marginTop: '20px' }}>
        <h1>📊 דשבורד מנהל</h1>
        <p style={{ color: '#888', marginTop: '10px' }}>
          ברוך הבא, {user.email}
        </p>
        <div style={{ marginTop: '30px', padding: '20px', background: '#1a1a1a', borderRadius: '12px' }}>
          <p>עמוד זה יוכל לראות הכל - כל הזמנות, כל עובדים, כל דוחות</p>
          <p style={{ marginTop: '10px', color: '#888', fontSize: '12px' }}>
            (הבנייה בתהליך...)
          </p>
        </div>
      </div>
    </div>
  )
}
