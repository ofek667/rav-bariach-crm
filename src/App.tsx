import { useEffect, useState } from 'react'
import { supabase, getCurrentUser, getUserProfile, signOut } from './lib/supabase'
import Login from './components/Login'
import ManagerDashboard from './components/ManagerDashboard'
import OfficeDashboard from './components/OfficeDashboard'
import MeasurerDashboard from './components/MeasurerDashboard'
import InstallerDashboard from './components/InstallerDashboard'

interface User {
  id: string
  email: string
  role: string
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      try {
        const authUser = await getCurrentUser()
        
        if (authUser) {
          const profile = await getUserProfile(authUser.id)
          setUser({
            id: authUser.id,
            email: authUser.email || '',
            role: profile.role,
          })
        }
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const profile = await getUserProfile(session.user.id)
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: profile.role,
          })
        } else {
          setUser(null)
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>טוען...</div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const handleLogout = async () => {
    await signOut()
    setUser(null)
  }

  // Navbar for all roles
  const navbar = (
    <nav style={{
      background: '#1a1a1a',
      borderBottom: '1px solid #2a2a2a',
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '18px', fontWeight: '700', color: '#c8a96e' }}>
        🚪 רב-בריח ירושלים
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ fontSize: '13px', color: '#888' }}>
          {user.email}
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: '#d95f5f',
            color: 'white',
            padding: '8px 16px'
          }}
        >
          התנתק
        </button>
      </div>
    </nav>
  )

  // Route based on role
  return (
    <>
      {navbar}
      {user.role === 'manager' && <ManagerDashboard user={user} />}
      {user.role === 'office' && <OfficeDashboard user={user} />}
      {user.role === 'measurer' && <MeasurerDashboard user={user} />}
      {user.role === 'installer' && <InstallerDashboard user={user} />}
    </>
  )
}
