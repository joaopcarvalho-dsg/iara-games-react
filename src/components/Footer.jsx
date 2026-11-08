import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="navbar-brand" aria-label="Iara Games — voltar ao início">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#009AFF" strokeWidth="1.5" fill="none"/>
              <path d="M10 16h12M16 10v12" stroke="#009AFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            IARA
          </Link>
          <p>A plataforma dos jogos indie brasileiros.</p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h3 className="footer-col-title">Plataforma</h3>
            <ul>
              <li><Link to="#" className="footer-col">Explorar jogos</Link></li>
              <li><Link to="#" className="footer-col">Categorias</Link></li>
              <li><Link to="#" className="footer-col">Mais vendidos</Link></li>
              <li><Link to="#" className="footer-col">Gratuitos</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">Comunidade</h3>
            <ul>
              <li><Link to="#" className="footer-col">Fórum</Link></li>
              <li><Link to="#" className="footer-col">Avaliações</Link></li>
              <li><Link to="#" className="footer-col">Dev spotlight</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">Suporte</h3>
            <ul>
              <li><Link to="#" className="footer-col">Ajuda</Link></li>
              <li><Link to="#" className="footer-col">Privacidade</Link></li>
              <li><Link to="#" className="footer-col">Termos de uso</Link></li>
              <li><Link to="/cadastro" className="footer-col">Criar conta</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p><small>&copy; 2025 Iara Games. Feito no Brasil com orgulho.</small></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
