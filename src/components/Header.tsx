import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'

interface UserData {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  tipo_usuario: string;
}

export default function Header() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    // Verificar token en localStorage o sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Error parsing user data:', error)
        handleLogout()
      }
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  const handleLogout = () => {
    // Limpiar datos de autenticación
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userData')
    
    // Actualizar estado
    setIsLoggedIn(false)
    setUser(null)
    setShowUserMenu(false)
    
    // Redirigir al home
    navigate('/')
  }

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`
    } else if (user?.first_name) {
      return user.first_name
    } else {
      return user?.username || 'Usuario'
    }
  }

  return (
    <header className="header">
      <div className="container">
        {/* Navegación izquierda */}
        <nav className="nav">
          <Link to="/" className="logo">
            Citalo
          </Link>
          <div className="navLinks">
            <Link to="/BetaCalendario" className="navLink">
              Calendario
            </Link>
            <Link to="/nosotros" className="navLink">
              Nosotros
            </Link>
            <Link to="/contacto" className="navLink">
              Contacto
            </Link>
          </div>
        </nav>

        {/* Botones de autenticación derecha */}
        <div className="authButtons">
          {isLoggedIn ? (
            <div className="userMenu">
              <button 
                className="userButton"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="userIcon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                <span className="userName">{getUserDisplayName()}</span>
                <svg 
                  className={`dropdownIcon ${showUserMenu ? 'rotated' : ''}`} 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="userDropdown">
                  <div className="userInfo">
                    <p className="userFullName">{getUserDisplayName()}</p>
                    <p className="userEmail">{user?.email}</p>
                    <span className="userType">{user?.tipo_usuario}</span>
                  </div>
                  <hr className="divider" />
                  <button className="dropdownItem" onClick={() => {
                    setShowUserMenu(false)
                    navigate('/profile')
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor"/>
                    </svg>
                    Mi Perfil
                  </button>
                  {user?.tipo_usuario === 'negocio' && (
                    <button className="dropdownItem" onClick={() => {
                      setShowUserMenu(false)
                      navigate('/dashboard-negocio')
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor"/>
                        <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor"/>
                        <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor"/>
                      </svg>
                      Dashboard
                    </button>
                  )}
                  {user?.tipo_usuario === 'admin' && (
                    <button className="dropdownItem" onClick={() => {
                      setShowUserMenu(false)
                      navigate('/admin-panel')
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 15l3-3-3-3M8 12h8" stroke="currentColor"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor"/>
                      </svg>
                      Panel Admin
                    </button>
                  )}
                  <button className="dropdownItem logout" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor"/>
                      <polyline points="16,17 21,12 16,7" stroke="currentColor"/>
                      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor"/>
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="loginButton">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="registerButton">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}