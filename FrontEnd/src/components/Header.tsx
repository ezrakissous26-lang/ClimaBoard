import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const nickname = localStorage.getItem('nickname')

  function logout() {
    localStorage.removeItem('nickname')
    navigate('/')
  }

  return (
    <header className="header">
      <Link className="logo" to="/">ClimaBoard</Link>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/compare">Compare</Link>
      </nav>
      <div className="user-area">
        {nickname && <span>Hello {nickname}</span>}
        {nickname && <button type="button" onClick={logout}>Logout</button>}
      </div>
    </header>
  )
}
