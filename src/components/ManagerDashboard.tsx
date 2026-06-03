import { useState } from 'react'
import OrdersPage from './OrdersPage'

export default function ManagerDashboard({ user }: { user: any }) {
  const [view, setView] = useState('orders')

  return (
    <div>
      <div style={{
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
        padding: '20px',
        display: 'flex',
        gap: '20px'
      }}>
        <button
          onClick={() => setView('orders')}
          style={{
            background: view === 'orders' ? '#c8a96e' : '#222',
            color: view === 'orders' ? '#000' : '#f0ece4',
            padding: '10px 20px',
            borderRadius: '8px'
          }}
        >
          📋 הזמנות
        </button>
        <button
          onClick={() => setView('stats')}
          style={{
            background: view === 'stats' ? '#c8a96e' : '#222',
            color: view === 'stats' ? '#000' : '#f0ece4',
            padding: '10px 20px',
            borderRadius: '8px'
          }}
        >
          📊 דוחות
        </button>
      </div>

      {view === 'orders' && <OrdersPage />}
      {view === 'stats' && (
        <div className="container" style={{ marginTop: '30px' }}>
          <p>דוחות בקרוב...</p>
        </div>
      )}
    </div>
  )
}
