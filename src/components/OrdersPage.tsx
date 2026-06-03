import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Order {
  id: string
  order_number: number
  client_name: string
  client_phone: string
  status: string
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: ''
  })

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createOrder(e: React.FormEvent) {
    e.preventDefault()
    try {
      const { error } = await supabase.from('orders').insert([
        {
          client_name: formData.client_name,
          client_phone: formData.client_phone,
          status: 'new'
        }
      ])

      if (error) throw error
      
      setFormData({ client_name: '', client_phone: '' })
      setShowForm(false)
      loadOrders()
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  async function updateStatus(orderId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error
      loadOrders()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const statusOptions = ['new', 'measuring', 'waiting_for_doors', 'installing', 'done']

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>📋 הזמנות</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#c8a96e',
            color: '#000',
            padding: '10px 20px'
          }}
        >
          {showForm ? 'ביטול' : '➕ הזמנה חדשה'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <form onSubmit={createOrder}>
            <input
              type="text"
              placeholder="שם הלקוח"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="טלפון"
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              required
            />
            <button
              type="submit"
              style={{
                background: '#4caf7d',
                color: 'white',
                width: '100%'
              }}
            >
              צור הזמנה
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div>טוען...</div>
      ) : orders.length === 0 ? (
        <div style={{ color: '#888' }}>אין הזמנות עדיין</div>
      ) : (
        <div style={{
          overflowX: 'auto',
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                <th style={{ textAlign: 'right', padding: '10px', color: '#c8a96e' }}>מספר הזמנה</th>
                <th style={{ textAlign: 'right', padding: '10px', color: '#c8a96e' }}>שם לקוח</th>
                <th style={{ textAlign: 'right', padding: '10px', color: '#c8a96e' }}>טלפון</th>
                <th style={{ textAlign: 'right', padding: '10px', color: '#c8a96e' }}>סטטוס</th>
                <th style={{ textAlign: 'right', padding: '10px', color: '#c8a96e' }}>תאריך</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '12px' }}>#{order.order_number}</td>
                  <td style={{ padding: '12px' }}>{order.client_name}</td>
                  <td style={{ padding: '12px' }}>{order.client_phone}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      style={{
                        background: '#222',
                        border: '1px solid #2a2a2a',
                        color: '#f0ece4',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#888' }}>
                    {new Date(order.created_at).toLocaleDateString('he-IL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
