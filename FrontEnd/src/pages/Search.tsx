import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3000'

type City = { name: string; country?: string; latitude: number; longitude: number }

export default function Search() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [cityName, setCityName] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => { inputRef.current?.focus() }, [])

  async function searchCity(event: React.FormEvent) {
    event.preventDefault()
    if (!cityName.trim()) return
    setLoading(true); setError(''); setCities([]); setHasSearched(true)
    try {
      const response = await fetch(`${API_URL}/coordinates/${encodeURIComponent(cityName.trim())}`)
      if (!response.ok) throw new Error()
      const data = await response.json()
      setCities(data.results || [])
    } catch {
      setError('Server not found. Check that the backend is running on port 3000.')
    } finally { setLoading(false) }
  }

  function openCity(city: City) {
    navigate(`/city/${city.latitude}/${city.longitude}/${encodeURIComponent(city.name)}`)
  }

  return (
    <section className="page">
      <h1>Search a city</h1>
      <form className="search-form" onSubmit={searchCity}>
        <label htmlFor="city-search">City name</label>
        <div className="form-row">
          <input ref={inputRef} id="city-search" value={cityName} onChange={(event) => setCityName(event.target.value)} placeholder="Paris, Tel Aviv, Londres..." />
          <button type="submit">Search</button>
        </div>
      </form>
      {loading && <p className="message">Searching...</p>}
      {error && <p className="error">{error}</p>}
      {hasSearched && !loading && !error && cities.length === 0 && <p className="message">No city found.</p>}
      <div className="city-list">
        {cities.map((city) => (
          <button className="city-card" type="button" key={`${city.latitude}-${city.longitude}`} onClick={() => openCity(city)}>
            <strong>{city.name}</strong><span>{city.country || 'Country not available'}</span><span>Latitude: {city.latitude} — Longitude: {city.longitude}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
