import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import '../styles/auth.css'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const generos = [
  { value: 'acao', label: 'Ação' },
  { value: 'rpg', label: 'RPG' },
  { value: 'terror', label: 'Terror' },
  { value: 'aventura', label: 'Aventura' },
  { value: 'estrategia', label: 'Estratégia' },
  { value: 'plataforma', label: 'Plataforma' },
]

function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirma, setConfirma] = useState('')
  const [generosEscolhidos, setGenerosEscolhidos] = useState([])
  const [loading, setLoading] = useState(false)

  const [nomeStatus, setNomeStatus] = useState(null)
  const [nomeFeedback, setNomeFeedback] = useState('')
  const [emailStatus, setEmailStatus] = useState(null)
  const [emailFeedback, setEmailFeedback] = useState('')
  const [senhaStatus, setSenhaStatus] = useState(null)
  const [senhaFeedback, setSenhaFeedback] = useState('')
  const [confirmaStatus, setConfirmaStatus] = useState(null)
  const [confirmaFeedback, setConfirmaFeedback] = useState('')

  const validateNome = (value) => {
    if (!value.trim()) {
      setNomeStatus('error')
      setNomeFeedback('Por favor, insira seu nome.')
    } else if (value.trim().length < 2) {
      setNomeStatus('error')
      setNomeFeedback('Nome muito curto.')
    } else {
      setNomeStatus('success')
      setNomeFeedback('')
    }
  }

  const validateEmail = (value) => {
    if (!value) {
      setEmailStatus('error')
      setEmailFeedback('Por favor, insira seu e-mail.')
    } else if (!isValidEmail(value)) {
      setEmailStatus('error')
      setEmailFeedback('E-mail inválido.')
    } else {
      setEmailStatus('success')
      setEmailFeedback('')
    }
  }

  const validateSenha = (value) => {
    if (!value) {
      setSenhaStatus('error')
      setSenhaFeedback('Por favor, crie uma senha.')
    } else if (value.length < 6) {
      setSenhaStatus('error')
      setSenhaFeedback('A senha deve ter pelo menos 6 caracteres.')
    } else {
      setSenhaStatus('success')
      setSenhaFeedback('')
    }
  }

  const validateConfirma = (value) => {
    if (!value) {
      setConfirmaStatus('error')
      setConfirmaFeedback('Por favor, confirme sua senha.')
    } else if (value !== senha) {
      setConfirmaStatus('error')
      setConfirmaFeedback('As senhas não coincidem.')
    } else {
      setConfirmaStatus('success')
      setConfirmaFeedback('')
    }
  }

  const toggleGenero = (value) => {
    setGenerosEscolhidos((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    validateNome(nome)
    validateEmail(email)
    validateSenha(senha)
    validateConfirma(confirma)

    const nomeOk = nome.trim().length >= 2
    const emailOk = isValidEmail(email)
    const senhaOk = senha.length >= 6
    const confirmaOk = confirma === senha

    if (!nomeOk || !emailOk || !senhaOk || !confirmaOk) return

    setLoading(true)
    // Simula envio — substitua por chamada à API real
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <AuthLayout>
      <section className="auth-card" aria-labelledby="titulo-cadastro">
        <div className="auth-header">
          <span className="auth-label">// crie sua conta</span>
          <h1 className="auth-title" id="titulo-cadastro">Cadastro</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <InputField
            id="nome"
            label="Nome"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => validateNome(nome)}
            autoComplete="name"
            required
            status={nomeStatus}
            feedback={nomeFeedback}
          />

          <InputField
            id="email"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            autoComplete="email"
            required
            status={emailStatus}
            feedback={emailFeedback}
          />

          <InputField
            id="senha"
            label="Senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onBlur={() => validateSenha(senha)}
            autoComplete="new-password"
            required
            status={senhaStatus}
            feedback={senhaFeedback}
          />

          <InputField
            id="confirma-senha"
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            onBlur={() => validateConfirma(confirma)}
            autoComplete="new-password"
            required
            status={confirmaStatus}
            feedback={confirmaFeedback}
          />

          <fieldset className="form-fieldset">
            <legend>
              Gêneros favoritos{' '}
              <span className="form-optional">(opcional)</span>
            </legend>
            <div className="checkbox-grid">
              {generos.map(({ value, label }) => (
                <label key={value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={generosEscolhidos.includes(value)}
                    onChange={() => toggleGenero(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="form-terms">
            <span>
              Ao criar uma conta você concorda com os{' '}
              <Link to="#" className="form-link">
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link to="#" className="form-link">
                Política de Privacidade
              </Link>{' '}
              da Iara Games.
            </span>
          </p>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-footer-text">
          Já tem uma conta?{' '}
          <Link to="/login" className="form-link">
            Entrar
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}

export default Cadastro
