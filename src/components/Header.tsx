import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
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
            <Link to="/pagina-2" className="navLink">
              Página 2
            </Link>
            <Link to="/pagina-3" className="navLink">
              Página 3
            </Link>
          </div>
        </nav>

        {/* Botones de autenticación derecha */}
        <div className="authButtons">
          <Link to="/login" className="loginButton">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="registerButton">
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  )
}