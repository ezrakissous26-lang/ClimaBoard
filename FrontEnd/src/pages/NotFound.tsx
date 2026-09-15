import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="page"><h1>404 — Page not found</h1><p>This page does not exist.</p><Link to="/">Back to Home</Link></section>
}
