import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import '../styles/auth.css'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [emailStatus, setEmailStatus] = useState(null)
  const [emailFeedback, setEmailFeedback] = useState('')
  const [senhaStatus, setSenhaStatus] = useState(null)
  const [senhaFeedback, setSenhaFeedback] = useState('')
  const [loading, setLoading] = useState(false)

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
      setSenhaFeedback('Por favor, insira sua senha.')
    } else if (value.length < 6) {
      setSenhaStatus('error')
      setSenhaFeedback('A senha deve ter pelo menos 6 caracteres.')
    } else {
      setSenhaStatus('success')
      setSenhaFeedback('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    validateEmail(email)
    validateSenha(senha)

    const emailOk = isValidEmail(email)
    const senhaOk = senha.length >= 6

    if (!emailOk || !senhaOk) return

    setLoading(true)
    // Simula envio — substitua por chamada à API real
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <AuthLayout>
      <section className="auth-card" aria-labelledby="titulo-login">
        <div className="auth-header">
          <span className="auth-label">// acesse sua conta</span>
          <h1 className="auth-title" id="titulo-login">Login</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onBlur={() => validateSenha(senha)}
            autoComplete="current-password"
            required
            status={senhaStatus}
            feedback={senhaFeedback}
          >
            <Link to="#" className="form-link-small" tabIndex={0}>
              Esqueci minha senha
            </Link>
          </InputField>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer-text">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="form-link">
            Criar conta
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}

export default Login
