import Logo from './Logo'

function AuthLayout({ children }) {
  return (
    <>
      <header className="header" role="banner">
        <Logo />
      </header>
      <main className="auth-main" id="conteudo-principal">
        {children}
      </main>
    </>
  )
}

export default AuthLayout
