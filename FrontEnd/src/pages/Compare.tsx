import { useState } from 'react'

const API_URL = 'http://localhost:3000'

type City = { name: string; country?: string; latitude: number; longitude: number }
type WeatherData = { current?: { temperature_2m?: number; apparent_temperature?: number; wind_speed_10m?: number; weather_code?: number } }

export default function Compare() {
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [firstResults, setFirstResults] = useState<City[]>([])
  const [secondResults, setSecondResults] = useState<City[]>([])
  const [firstCity, setFirstCity] = useState<City | null>(null)
  const [secondCity, setSecondCity] = useState<City | null>(null)
  const [firstWeather, setFirstWeather] = useState<WeatherData | null>(null)
  const [secondWeather, setSecondWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function searchCity(cityName: string, position: 'first' | 'second') {
    if (!cityName.trim()) return
    setError('')
    try {
      const response = await fetch(`${API_URL}/coordinates/${encodeURIComponent(cityName.trim())}`)
      if (!response.ok) throw new Error()
      const data = await response.json()
      if (position === 'first') setFirstResults(data.results || [])
      else setSecondResults(data.results || [])
    } catch { setError('Cannot search cities. Check that the backend is running.') }
  }

  async function compareWeather() {
    if (!firstCity || !secondCity) { setError('Choose one city in each column before comparing.'); return }
    setLoading(true); setError(''); setFirstWeather(null); setSecondWeather(null)
    try {
      const firstResponse = await fetch(`${API_URL}/weather?latitude=${firstCity.latitude}&longitude=${firstCity.longitude}`)
      const secondResponse = await fetch(`${API_URL}/weather?latitude=${secondCity.latitude}&longitude=${secondCity.longitude}`)
      if (!firstResponse.ok || !secondResponse.ok) throw new Error()
      setFirstWeather(await firstResponse.json())
      setSecondWeather(await secondResponse.json())
    } catch { setError('Cannot load weather for this comparison.') }
    finally { setLoading(false) }
  }

  return (
    <section className="page">
      <h1>Compare two cities</h1>
      <div className="compare-searches">
        <div>
          <h2>City 1</h2>
          <div className="form-row"><input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="City name" /><button type="button" onClick={() => searchCity(firstName, 'first')}>Search</button></div>
          <CityChoices cities={firstResults} chooseCity={setFirstCity} selectedCity={firstCity} />
        </div>
        <div>
          <h2>City 2</h2>
          <div className="form-row"><input value={secondName} onChange={(event) => setSecondName(event.target.value)} placeholder="City name" /><button type="button" onClick={() => searchCity(secondName, 'second')}>Search</button></div>
          <CityChoices cities={secondResults} chooseCity={setSecondCity} selectedCity={secondCity} />
        </div>
      </div>
      <button className="compare-button" type="button" onClick={compareWeather}>Compare weather</button>
      {loading && <p className="message">Loading comparison...</p>}
      {error && <p className="error">{error}</p>}
      {firstWeather && secondWeather && <div className="weather-comparison"><WeatherCard city={firstCity} weather={firstWeather} /><WeatherCard city={secondCity} weather={secondWeather} /></div>}
    </section>
  )
}

function CityChoices({ cities, chooseCity, selectedCity }: { cities: City[]; chooseCity: (city: City) => void; selectedCity: City | null }) {
  return <div className="choice-list">{cities.map((city) => <button className={selectedCity?.latitude === city.latitude && selectedCity?.longitude === city.longitude ? 'selected-city' : ''} type="button" key={`${city.latitude}-${city.longitude}`} onClick={() => chooseCity(city)}>{city.name}, {city.country || 'Country not available'}</button>)}</div>
}

function WeatherCard({ city, weather }: { city: City | null; weather: WeatherData }) {
  return <article className="weather-card"><h2>{city?.name}</h2><p>Temperature: {weather.current?.temperature_2m ?? '—'} °C</p><p>Feels like: {weather.current?.apparent_temperature ?? '—'} °C</p><p>Wind: {weather.current?.wind_speed_10m ?? '—'} km/h</p><p>Weather code: {weather.current?.weather_code ?? '—'}</p></article>
}
