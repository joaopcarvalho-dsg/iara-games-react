import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Iara Games — página inicial">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="13" stroke="#009AFF" strokeWidth="1.5" fill="none"/>
            <path d="M10 16h12M16 10v12" stroke="#009AFF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          IARA
        </Link>
        <nav className="navbar-links" aria-label="Navegação principal">
          <Link to="#" className="nav-link">Fórum</Link>
          <Link to="#" className="nav-link">Suporte</Link>
          <Link to="/login" className="btn-iara-login" aria-label="Fazer login ou criar conta">
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
