import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

const navLinks = [
  { to: '/dashboard', label: '儀表板' },
  { to: '/vehicles', label: '車輛管理' },
  { to: '/employees', label: '員工管理', adminOnly: true },
]

export default function Navbar() {
  const { user, role, logout } = useAuth()
  const location = useLocation()

  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-primary">🚗 車輛管理系統</span>
          <div className="flex gap-1">
            {navLinks
              .filter(link => !link.adminOnly || role === 'admin')
              .map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    location.pathname === link.to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user?.name}</span>
          <Button variant="outline" size="sm" onClick={logout}>登出</Button>
        </div>
      </div>
    </nav>
  )
}
