import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/global.css'
import '../styles/jogo.css'

const SCREENSHOTS = [
  '/images/enigma do medo/enigma_1.png',
  '/images/enigma do medo/enigma_2.png',
  '/images/enigma do medo/enigma_3.png',
  '/images/enigma do medo/enigma_4.png',
  '/images/enigma do medo/enigma_5.png',
]

const RELACIONADOS = [
  { src: '/images/fobia.png',        name: 'Fobia St. Dinfna', price: 'R$ 59,90' },
  { src: '/images/aila.png',         name: 'A.I.L.A',          price: 'R$ 79,95' },
  { src: '/images/ruff-ghannor.png', name: 'Ruff Ghannor',     price: 'R$ 55,99' },
  { src: '/images/chroma-squad.png', name: 'Chroma Squad',     price: 'R$ 46,99' },
  { src: '/images/bagdex.png',       name: 'Bagdex',           price: 'Grátis', free: true },
]

// ─── Componente: Consulta de CEP ─────────────────────────────
function CepConsulta() {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null) // { status: 'success'|'error', msg, address }

  const formatCep = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
  }

  const handleChange = (e) => {
    setCep(formatCep(e.target.value))
    setResultado(null)
  }

  const consultar = async () => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      setResultado({ status: 'error', msg: 'Digite um CEP válido com 8 dígitos.' })
      return
    }

    setLoading(true)
    setResultado(null)

    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()

      if (data.erro) {
        setResultado({ status: 'error', msg: 'CEP não encontrado. Verifique e tente novamente.' })
      } else {
        setResultado({
          status: 'success',
          msg: '✓ Entrega disponível para',
          address: `${data.localidade}, ${data.uf} — ${data.logradouro ? data.logradouro + ', ' : ''}${data.bairro}`,
        })
      }
    } catch {
      setResultado({ status: 'error', msg: 'Não foi possível consultar o CEP. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') consultar()
  }

  return (
    <div className="cep-section">
      <div className="divider" />
      <p className="cep-label">Versão física — Consultar entrega</p>
      <div className="cep-form">
        <input
          type="text"
          className="cep-input"
          placeholder="00000-000"
          value={cep}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Digite seu CEP"
          inputMode="numeric"
          maxLength={9}
        />
        <button
          className="btn-cep"
          onClick={consultar}
          disabled={loading}
          aria-label="Consultar entrega pelo CEP"
        >
          {loading ? '...' : 'Consultar'}
        </button>
      </div>

      {resultado && (
        <div className={`cep-result ${resultado.status}`} role="status" aria-live="polite">
          <span>{resultado.msg}</span>
          {resultado.address && (
            <p className="cep-address">{resultado.address}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Página do Jogo ──────────────────────────────────────────
function Jogo() {
  const [activeThumb, setActiveThumb] = useState(0)
  const [buyState, setBuyState] = useState('idle') // 'idle' | 'loading' | 'done'
  const [wishlisted, setWishlisted] = useState(false)

  const handleBuy = () => {
    if (buyState !== 'idle') return
    setBuyState('loading')
    setTimeout(() => {
      setBuyState('done')
      setTimeout(() => setBuyState('idle'), 3000)
    }, 800)
  }

  const buyLabel = {
    idle: 'Comprar agora',
    loading: 'Adicionando...',
    done: '✓ Adicionado ao carrinho',
  }[buyState]

  return (
    <>
      <Navbar />
      <main id="conteudo-principal">

        {/* HERO */}
        <section className="game-hero" aria-label="Capa do jogo O Enigma do Medo">
          <div
            className="game-hero-bg"
            style={{ backgroundImage: "url('/images/image50.png')" }}
            aria-hidden="true"
          />
          <div className="game-hero-overlay" aria-hidden="true" />
          <div className="container game-hero-content">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb-iara">
                <li><Link to="/">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="#">Terror</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">O Enigma do Medo</li>
              </ol>
            </nav>
            <h1 className="game-hero-title">O Enigma do Medo</h1>
            <p className="game-hero-dev">por <Link to="#">Dark Vortex Studios</Link></p>
            <div className="game-hero-badges">
              <span className="badge-iara badge-genre">Terror</span>
              <span className="badge-iara badge-genre">Aventura</span>
              <span className="badge-iara badge-genre">Mistério</span>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <section className="container" aria-labelledby="titulo-info-jogo">
          <h2 id="titulo-info-jogo" className="visually-hidden">
            Informações e compra — O Enigma do Medo
          </h2>

          <div className="jogo-layout">

            {/* COLUNA PRINCIPAL */}
            <div>

              {/* Galeria */}
              <div className="section-block">
                <h2 className="block-title">Screenshots</h2>
                <div className="gallery-main">
                  <img
                    src={SCREENSHOTS[activeThumb]}
                    alt={`Screenshot ${activeThumb + 1} — O Enigma do Medo`}
                  />
                </div>
                <div className="gallery-thumbs">
                  {SCREENSHOTS.map((src, i) => (
                    <button
                      key={i}
                      className={`gallery-thumb${activeThumb === i ? ' active' : ''}`}
                      onClick={() => setActiveThumb(i)}
                      aria-label={`Ver screenshot ${i + 1}`}
                      aria-current={activeThumb === i}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <div className="section-block" style={{ marginTop: 40 }}>
                <h2 className="block-title">Sobre o jogo</h2>
                <p className="game-description">
                  O Enigma do Medo é um jogo de aventura e terror desenvolvido por um estúdio independente brasileiro. Um grupo de investigadores é convocado para resolver desaparecimentos misteriosos em uma pequena cidade do interior.
                </p>
                <p className="game-description">
                  Com mecânicas de exploração, resolução de puzzles e tomada de decisões que afetam o destino dos personagens, o jogo mergulha o jogador em uma narrativa densa, cheia de reviravoltas e com forte identidade visual brasileira.
                </p>

                <dl className="game-meta">
                  {[
                    ['Desenvolvedor', 'Dark Vortex Studios'],
                    ['Lançamento', '14 de março de 2024'],
                    ['Plataformas', 'Windows, Mac'],
                    ['Idiomas', 'Português, Inglês, Espanhol'],
                    ['Classificação', '16 anos'],
                  ].map(([dt, dd]) => (
                    <div key={dt} className="game-meta-row">
                      <dt>{dt}</dt>
                      <dd>{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Avaliações */}
              <div className="section-block" style={{ marginTop: 40 }}>
                <h2 className="block-title">Avaliações</h2>

                <div className="review-summary">
                  <div className="review-score">
                    <span className="score-number">4.7</span>
                    <div className="score-stars" aria-label="4.7 de 5 estrelas">★★★★★</div>
                    <span className="score-count">238 avaliações</span>
                  </div>
                  <div className="score-bars">
                    {[['5★', 72], ['4★', 18], ['3★', 6], ['2★', 3], ['1★', 1]].map(([label, pct]) => (
                      <div key={label} className="score-bar-row">
                        <span>{label}</span>
                        <div className="score-bar-track">
                          <div className="score-bar-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span>{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reviews-list">
                  {[
                    { initials: 'PA', name: 'Pedro Alves', date: '2024-04-02', dateLabel: '2 de abril de 2024', stars: '★★★★★', text: 'Um dos melhores jogos indie brasileiros que já joguei. A atmosfera é densa e a narrativa prende do começo ao fim. Recomendo muito!' },
                    { initials: 'CR', name: 'Camila Rocha', date: '2024-03-19', dateLabel: '19 de março de 2024', stars: '★★★★☆', text: 'Jogabilidade sólida e história envolvente. Alguns puzzles são bem difíceis, mas isso faz parte do charme. A identidade visual é incrível.' },
                    { initials: 'LM', name: 'Lucas Mendes', date: '2024-03-15', dateLabel: '15 de março de 2024', stars: '★★★★★', text: 'Simplesmente incrível. Suporte ao produtor nacional de games. O estúdio merece muito reconhecimento por esse trabalho.' },
                  ].map((r) => (
                    <article key={r.name} className="review-card" aria-label={`Avaliação de ${r.name}`}>
                      <div className="review-header">
                        <div className="review-avatar" aria-hidden="true">{r.initials}</div>
                        <div>
                          <strong className="review-author">{r.name}</strong>
                          <time className="review-date" dateTime={r.date}>{r.dateLabel}</time>
                        </div>
                        <span className="review-stars-ml" aria-label={`${r.stars.replace(/[★☆]/g, s => s === '★' ? '5' : '0')} de 5 estrelas`}>{r.stars}</span>
                      </div>
                      <p className="review-text">{r.text}</p>
                    </article>
                  ))}
                </div>
              </div>

            </div>

            {/* CARD DE COMPRA */}
            <aside aria-label="Comprar o jogo">
              <div className="buy-card">
                <img src="/images/image50.png" alt="Capa de O Enigma do Medo" className="buy-card-cover" />
                <div className="buy-card-body">
                  <p className="buy-label">Preço</p>
                  <p className="buy-price">R$ 49,90</p>

                  <button
                    className="btn-buy"
                    onClick={handleBuy}
                    disabled={buyState === 'loading'}
                    aria-label="Comprar O Enigma do Medo por R$ 49,90"
                    style={buyState === 'done' ? { backgroundColor: '#4caf7d' } : {}}
                  >
                    {buyLabel}
                  </button>

                  <button
                    className={`btn-wishlist${wishlisted ? ' wishlisted' : ''}`}
                    onClick={() => setWishlisted(w => !w)}
                    aria-pressed={wishlisted}
                    aria-label={wishlisted ? 'Remover da lista de desejos' : 'Adicionar à lista de desejos'}
                  >
                    {wishlisted ? '♥ Na lista de desejos' : '♡ Lista de desejos'}
                  </button>

                  <hr className="divider" />

                  <ul className="buy-tags">
                    {['Terror', 'Aventura', 'Mistério', 'Puzzle', 'Single-player'].map(tag => (
                      <li key={tag}><span className="badge-iara badge-genre">{tag}</span></li>
                    ))}
                  </ul>

                  <hr className="divider" />

                  <dl className="buy-info">
                    {[['Tamanho', '4.2 GB'], ['Versão', '1.3.2'], ['Atualizado', 'Jan 2025']].map(([dt, dd]) => (
                      <div key={dt} className="buy-info-row">
                        <dt>{dt}</dt>
                        <dd>{dd}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* ── CONSULTA DE CEP (ViaCEP) ── */}
                  <CepConsulta />
                </div>
              </div>
            </aside>

          </div>
        </section>

        {/* JOGOS RELACIONADOS */}
        <section className="section-games container" style={{ marginBottom: 80 }} aria-labelledby="titulo-relacionados">
          <div className="section-header">
            <h2 className="section-title" id="titulo-relacionados">Jogos Relacionados</h2>
            <Link to="#" className="section-link">Ver todos</Link>
          </div>
          <ul className="games-grid" role="list">
            {RELACIONADOS.map((jogo) => (
              <li key={jogo.name} className="game-card">
                <Link to="/jogo" aria-label={jogo.name}>
                  <img src={jogo.src} alt={`Capa do jogo ${jogo.name}`} />
                  <span className="game-name">{jogo.name}</span>
                  <span className={`game-price${jogo.free ? ' free' : ''}`}>{jogo.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Jogo
