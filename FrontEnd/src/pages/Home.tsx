import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
  const savedNickname = localStorage.getItem('nickname') || ''
  const [nickname, setNickname] = useState(savedNickname)
  const [message, setMessage] = useState('')

  function saveNickname(event: React.FormEvent) {
    event.preventDefault()
    const cleanNickname = nickname.trim()

    if (!cleanNickname) {
      setMessage('Please enter a nickname.')
      return
    }

    localStorage.setItem('nickname', cleanNickname)
    setNickname(cleanNickname)
    setMessage('Nickname saved.')
  }

  return (
    <section className="page home-page">
      <p className="eyebrow">Simple weather app</p>
      <h1>ClimaBoard</h1>
      {savedNickname && <h2>Hello {savedNickname}</h2>}
      <p>Search for a city, check the weather, and save favorite cities.</p>
      <form className="nickname-form" onSubmit={saveNickname}>
        <label htmlFor="nickname">Your nickname</label>
        <div className="form-row">
          <input id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="Your name" />
          <button type="submit">Save</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="home-links">
        <Link to="/search">Search a city</Link>
        <Link to="/favorites">My favorites</Link>
        <Link to="/compare">Compare cities</Link>
      </div>
    </section>
  )
}
