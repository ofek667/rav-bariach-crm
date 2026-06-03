import { useState } from 'react'
import { signUp, signIn } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('office')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password, role)
      } else {
        await signIn(email, password)
      }
    } catch (err: any) {
      setError(err.message || 'שגיאה')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#0f0f0f'
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚪</div>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '5px' }}>
            רב-בריח ירושלים
          </div>
          <div style={{ fontSize: '13px', color: '#888' }}>
            מערכת ניהול התקנות
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="כתובת אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignUp && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="manager">מנהל</option>
              <option value="office">פקידה</option>
              <option value="measurer">מודד</option>
              <option value="installer">מתקין</option>
            </select>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#c8a96e',
              color: '#000',
              width: '100%',
              marginTop: '20px'
            }}
          >
            {loading ? 'טוען...' : isSignUp ? 'יצירת חשבון' : 'כניסה'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            style={{
              background: 'transparent',
              color: '#c8a96e',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            {isSignUp ? 'כבר יש לך חשבון? כנס' : 'אין לך חשבון? צור חדש'}
          </button>
        </div>
      </div>
    </div>
  )
}
