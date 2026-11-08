import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/global.css'

const HERO_SLIDES = [
  { src: '/images/image50.png',   alt: 'O Enigma do Medo — grupo de personagens em floresta sombria' },
  { src: '/images/image25-1.png', alt: 'Mullet MadJack — personagens estilo anime em cena de ação' },
  { src: '/images/fobia.png',     alt: 'Fobia St. Dinfna Hotel — personagem mascarado em ambiente de terror' },
]

const CATEGORIAS = [
  { genero: 'acao',      label: 'AÇÃO',      bg: '#6EFAB4', color: '#1A7A4A' },
  { genero: 'rpg',       label: 'RPG',       bg: '#F4967C', color: '#A63A1E' },
  { genero: 'terror',    label: 'TERROR',    bg: '#111111', color: '#ffffff' },
  { genero: 'aventura',  label: 'AVENTURA',  bg: '#87DCFA', color: '#1A6A8A' },
  { genero: 'estrategia',label: 'ESTRATÉGIA',bg: '#C87EF5', color: '#6A1FA3' },
]

const MAIS_VENDIDOS = [
  { src: '/images/aila.png',        name: 'A.I.L.A',           price: 'R$ 79,95', genero: 'terror' },
  { src: '/images/ruff-ghannor.png',name: 'Ruff Ghannor',      price: 'R$ 55,99', genero: 'acao' },
  { src: '/images/chroma-squad.png',name: 'Chroma Squad',      price: 'R$ 46,99', genero: 'estrategia' },
  { src: '/images/lenda-heroi.png', name: 'A Lenda do Herói',  price: 'R$ 35,00', genero: 'rpg' },
  { src: '/images/bagdex.png',      name: 'Bagdex',            price: 'Grátis',   genero: 'aventura', free: true },
]

const MELHORES = [
  { src: '/images/chroma-squad.png',name: 'Chroma Squad',      price: 'R$ 46,99', genero: 'estrategia' },
  { src: '/images/aila.png',        name: 'A.I.L.A',           price: 'R$ 79,95', genero: 'terror' },
  { src: '/images/ruff-ghannor.png',name: 'Ruff Ghannor',      price: 'R$ 55,99', genero: 'acao' },
  { src: '/images/bagdex.png',      name: 'Bagdex',            price: 'Grátis',   genero: 'aventura', free: true },
  { src: '/images/lenda-heroi.png', name: 'A Lenda do Herói',  price: 'R$ 35,00', genero: 'rpg' },
]

function GameCard({ src, name, price, free, genero, activeFilter }) {
  const hidden = activeFilter && activeFilter !== genero
  if (hidden) return null
  return (
    <li className="game-card">
      <Link to="/jogo" aria-label={`${name} — ${price}`}>
        <img src={src} alt={`Capa do jogo ${name}`} />
        <span className="game-name">{name}</span>
        <span className={`game-price${free ? ' free' : ''}`}>{price}</span>
      </Link>
    </li>
  )
}

function Home() {
  const [slide, setSlide] = useState(0)
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeGenero, setActiveGenero] = useState(null)

  const toggleFilter = (genero, label) => {
    if (activeGenero === genero) {
      setActiveFilter(null)
      setActiveGenero(null)
    } else {
      setActiveFilter(genero)
      setActiveGenero(genero)
    }
  }

  return (
    <>
      <Navbar />
      <main id="conteudo-principal">

        {/* HERO BANNER */}
        <section className="container" style={{ paddingTop: 40 }} aria-label="Jogos em destaque">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
            <Link to="/jogo" aria-label={`Ver ${HERO_SLIDES[slide].alt}`}>
              <img
                src={HERO_SLIDES[slide].src}
                alt={HERO_SLIDES[slide].alt}
                style={{ width: '100%', borderRadius: 12, aspectRatio: '16/9', objectFit: 'cover' }}
              />
            </Link>
          </div>

          {/* Paginação */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: 120,
                  height: 4,
                  borderRadius: 99,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: i === slide ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)',
                  transition: 'background-color 0.2s',
                }}
              />
            ))}
            <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
              <button
                onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                aria-label="Slide anterior"
                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
              >◀</button>
              <button
                onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)}
                aria-label="Próximo slide"
                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
              >▶</button>
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="section-games container" aria-labelledby="titulo-categorias">
          <div className="section-header">
            <h2 className="section-title" id="titulo-categorias">Categorias</h2>
            <Link to="#" className="section-link">Ver todos</Link>
          </div>
          <ul className="categories-grid" role="list">
            {CATEGORIAS.map(({ genero, label, bg, color }) => (
              <li key={genero}>
                <div
                  className={`category-card${activeGenero === genero ? ' active' : ''}`}
                  data-genero={genero}
                  style={{ backgroundColor: bg, cursor: 'pointer' }}
                  onClick={() => toggleFilter(genero, label)}
                  role="button"
                  aria-pressed={activeGenero === genero}
                  aria-label={`Filtrar por ${label}`}
                >
                  <span style={{ color }}>{label}</span>
                </div>
              </li>
            ))}
          </ul>
          {activeGenero && (
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
              Filtrando por: <strong style={{ color: 'var(--color-text)' }}>
                {CATEGORIAS.find(c => c.genero === activeGenero)?.label}
              </strong>
              <button
                onClick={() => { setActiveFilter(null); setActiveGenero(null) }}
                style={{
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                  borderRadius: 4,
                  fontSize: 11,
                  padding: '2px 7px',
                  cursor: 'pointer',
                }}
              >✕</button>
            </div>
          )}
        </section>

        {/* MAIS VENDIDOS */}
        <section className="section-games container" aria-labelledby="titulo-mais-vendidos">
          <div className="section-header">
            <h2 className="section-title" id="titulo-mais-vendidos">$ Mais Vendidos</h2>
            <Link to="#" className="section-link">Ver todos</Link>
          </div>
          <ul className="games-grid" role="list">
            {MAIS_VENDIDOS.map((jogo) => (
              <GameCard key={jogo.name} {...jogo} activeFilter={activeFilter} />
            ))}
          </ul>
        </section>

        {/* MELHORES AVALIAÇÕES */}
        <section className="section-games container" style={{ marginBottom: 80 }} aria-labelledby="titulo-melhores">
          <div className="section-header">
            <h2 className="section-title" id="titulo-melhores">Melhores Avaliações</h2>
            <Link to="#" className="section-link">Ver todos</Link>
          </div>
          <ul className="games-grid" role="list">
            {MELHORES.map((jogo) => (
              <GameCard key={jogo.name + '-best'} {...jogo} activeFilter={activeFilter} />
            ))}
          </ul>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Home
