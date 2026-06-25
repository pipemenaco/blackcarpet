import { useState } from 'react'

export default function Construccion() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState({ tipo: 'idle', msg: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      setEstado({ tipo: 'error', msg: 'Ingresa un correo válido.' })
      return
    }
    setEstado({ tipo: 'enviando', msg: '' })
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Aviso de lanzamiento',
          email,
          mensaje: 'Quiere recibir aviso cuando el sitio esté disponible.',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setEstado({ tipo: 'ok', msg: 'Listo. Te avisaremos cuando estemos en línea.' })
        setEmail('')
      } else {
        setEstado({ tipo: 'error', msg: data.error || 'No pudimos registrarte. Intenta de nuevo.' })
      }
    } catch {
      setEstado({ tipo: 'error', msg: 'Problema de conexión. Intenta de nuevo.' })
    }
  }

  return (
    <main className="cs">
      <div className="cs__glow" aria-hidden="true"></div>

      <header className="cs__top">
        <span className="cs__brand">BLACK CARPET</span>
      </header>

      <section className="cs__hero">
        <p className="cs__eyebrow">Próximamente</p>
        <h1 className="cs__title">
          Estamos creando algo
          <br />
          que <span>se vive</span>.
        </h1>
        <p className="cs__lead">
          Black Carpet es una productora de experiencias inmersivas. Nuestro nuevo
          sitio está en construcción. Déjanos tu correo y te avisamos cuando esté
          en línea.
        </p>

        <form className="cs__form" onSubmit={onSubmit} noValidate>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Correo electrónico"
          />
          <button type="submit" disabled={estado.tipo === 'enviando'}>
            {estado.tipo === 'enviando' ? 'Enviando…' : 'Avísame'}
          </button>
        </form>

        {estado.msg && (
          <p className={`cs__status cs__status--${estado.tipo}`}>{estado.msg}</p>
        )}
      </section>

      <footer className="cs__foot">
        <a href="mailto:contacto@blackcarpet.cl">contacto@blackcarpet.cl</a>
        <span className="cs__dot" aria-hidden="true">·</span>
        <span>Santiago, Chile</span>
      </footer>
    </main>
  )
}
