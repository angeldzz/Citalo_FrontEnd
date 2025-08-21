import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        {/* Navegación izquierda */}
        <nav className="nav">
          <a href="/" className="logo">
            Citalo
          </a>
          <div className="navLinks">
            <a href="/pagina-1" className="navLink">
              Página 1
            </a>
            <a href="/pagina-2" className="navLink">
              Página 2
            </a>
            <a href="/pagina-3" className="navLink">
              Página 3
            </a>
          </div>
        </nav>

        {/* Botones de autenticación derecha */}
        <div className="authButtons">
          <a href="/login" className="loginButton">
            Iniciar Sesión
          </a>
          <a href="/register" className="registerButton">
            Registrarse
          </a>
        </div>
      </div>
    </header>
  )
}