import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3000'

type Favorite = { latitude: number; longitude: number; explorerName: string; cityName?: string }

export default function Favorites() {
  const navigate = useNavigate()
  const nickname = localStorage.getItem('nickname')
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { loadFavorites() }, [])

  async function loadFavorites() {
    if (!nickname) { setLoading(false); return }
    try {
      const response = await fetch(`${API_URL}/favorites`)
      if (!response.ok) throw new Error()
      const data = await response.json()
      setFavorites(data.filter((favorite: Favorite) => favorite.explorerName === nickname))
    } catch { setError('Cannot load favorites. Check that the backend is running.') }
    finally { setLoading(false) }
  }

  async function removeFavorite(favorite: Favorite) {
    try {
      const response = await fetch(`${API_URL}/favorites`, {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(favorite),
      })
      if (!response.ok) throw new Error()
      setFavorites(favorites.filter((item) => !(item.latitude === favorite.latitude && item.longitude === favorite.longitude)))
    } catch { setError('Cannot remove this favorite.') }
  }

  function openFavorite(favorite: Favorite) {
    const cityName = favorite.cityName || `City ${favorite.latitude}, ${favorite.longitude}`
    navigate(`/city/${favorite.latitude}/${favorite.longitude}/${encodeURIComponent(cityName)}`)
  }

  if (!nickname) return <section className="page"><h1>My favorites</h1><p className="message">Save a nickname on the Home page to use favorites.</p></section>

  return (
    <section className="page">
      <h1>My favorites</h1>
      {loading && <p className="message">Loading favorites...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && favorites.length === 0 && <p className="message">No favorite city yet.</p>}
      <div className="city-list">
        {favorites.map((favorite) => (
          <article className="city-card favorite-card" key={`${favorite.latitude}-${favorite.longitude}`}>
            <strong>{favorite.cityName || 'Favorite city'}</strong>
            <span>Latitude: {favorite.latitude} — Longitude: {favorite.longitude}</span>
            <div className="button-row">
              <button type="button" onClick={() => openFavorite(favorite)}>View weather</button>
              <button className="secondary-button" type="button" onClick={() => removeFavorite(favorite)}>Remove</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
