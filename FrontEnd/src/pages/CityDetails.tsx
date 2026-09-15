import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = 'http://localhost:3000'

type WeatherData = {
  current?: { temperature_2m?: number; apparent_temperature?: number; wind_speed_10m?: number; weather_code?: number }
  daily?: { time?: string[]; temperature_2m_mean?: number[]; apparent_temperature_mean?: number[]; wind_speed_10m_max?: number[]; weather_code?: number[] }
}

export default function CityDetails() {
  const { latitude, longitude, name } = useParams()
  const cityName = decodeURIComponent(name || 'Ville')
  const nickname = localStorage.getItem('nickname')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favoriteMessage, setFavoriteMessage] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function loadWeather() {
      if (!latitude || !longitude) { setError('Invalid city coordinates.'); setLoading(false); return }
      try {
        const response = await fetch(`${API_URL}/weather?latitude=${latitude}&longitude=${longitude}`)
        if (!response.ok) throw new Error()
        setWeather(await response.json())
      } catch { setError('Cannot load weather. Check that the backend is running.') }
      finally { setLoading(false) }
    }
    loadWeather()
  }, [latitude, longitude])

  useEffect(() => {
    async function checkFavorite() {
      if (!nickname || !latitude || !longitude) return
      try {
        const response = await fetch(`${API_URL}/favorites`)
        if (!response.ok) return
        const favorites = await response.json()
        setIsFavorite(favorites.some((favorite: { latitude: string | number; longitude: string | number; explorerName: string }) =>
          Number(favorite.latitude) === Number(latitude) && Number(favorite.longitude) === Number(longitude) && favorite.explorerName === nickname
        ))
      } catch { /* Weather can still be used if favorites fail. */ }
    }
    checkFavorite()
  }, [latitude, longitude, nickname])

  async function changeFavorite(method: 'POST' | 'DELETE') {
    if (!nickname) { setFavoriteMessage('Save a nickname on the Home page to use favorites.'); return }
    try {
      const response = await fetch(`${API_URL}/favorites`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: Number(latitude), longitude: Number(longitude), explorerName: nickname, cityName }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erreur')
      setIsFavorite(method === 'POST')
      setFavoriteMessage(data.message)
    } catch (requestError) {
      setFavoriteMessage(requestError instanceof Error ? requestError.message : 'Favorite error.')
    }
  }

  if (loading) return <section className="page"><p className="message">Loading weather...</p></section>
  if (error) return <section className="page"><p className="error">{error}</p></section>

  const days = weather?.daily?.time || []
  return (
    <section className="page">
      <p className="eyebrow">Weather details</p>
      <h1>{cityName}</h1>
      <p>Latitude: {latitude} — Longitude: {longitude}</p>
      <div className="weather-card">
        <h2>Now</h2>
        <p>Temperature: {weather?.current?.temperature_2m ?? 'Not available'} °C</p>
        <p>Feels like: {weather?.current?.apparent_temperature ?? 'Not available'} °C</p>
        <p>Wind: {weather?.current?.wind_speed_10m ?? 'Not available'} km/h</p>
        <p>Weather code: {weather?.current?.weather_code ?? 'Not available'}</p>
      </div>
      <div className="button-row">
        {!isFavorite && <button type="button" onClick={() => changeFavorite('POST')}>Add to favorites</button>}
        {isFavorite && <button className="secondary-button" type="button" onClick={() => changeFavorite('DELETE')}>Remove from favorites</button>}
      </div>
      {favoriteMessage && <p className="message">{favoriteMessage}</p>}

      <h2>Daily forecast</h2>
      <div className="forecast-list">
        {days.map((day, index) => (
          <article className="forecast-card" key={day}>
            <strong>{day}</strong>
            <span>Average temperature: {weather?.daily?.temperature_2m_mean?.[index] ?? '—'} °C</span>
            <span>Average feels like: {weather?.daily?.apparent_temperature_mean?.[index] ?? '—'} °C</span>
            <span>Max wind: {weather?.daily?.wind_speed_10m_max?.[index] ?? '—'} km/h</span>
            <span>Weather code: {weather?.daily?.weather_code?.[index] ?? '—'}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
