import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/login" className="logo" aria-label="Iara Games — página inicial">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: 'transparent' }}>
        <circle cx="12" cy="12" r="10" stroke="#3EA8DA" strokeWidth="1.5" fill="none" />
        <path d="M8 12h8M12 8v8" stroke="#3EA8DA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span>IARA</span>
    </Link>
  )
}

export default Logo
