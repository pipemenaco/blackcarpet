import { useState } from 'react'
import Reveal from './Reveal.jsx'

const TIPOS = [
  'Lanzamiento de marca',
  'Gala / evento corporativo',
  'Activación / experiencia',
  'Evento privado',
  'Otro',
]

const VACIO = { nombre: '', email: '', telefono: '', tipoEvento: '', mensaje: '' }

export default function Contacto() {
  const [form, setForm] = useState(VACIO)
  const [estado, setEstado] = useState({ tipo: 'idle', msg: '' })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setEstado({ tipo: 'enviando', msg: '' })
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setEstado({
          tipo: 'ok',
          msg: 'Gracias. Recibimos tu mensaje y te contactaremos pronto.',
        })
        setForm(VACIO)
      } else {
        setEstado({
          tipo: 'error',
          msg: data.error || 'No pudimos enviar el mensaje. Intenta nuevamente.',
        })
      }
    } catch {
      setEstado({
        tipo: 'error',
        msg: 'Hubo un problema de conexión. Intenta nuevamente.',
      })
    }
  }

  return (
    <section className="section contacto" id="contacto">
      <div className="container contacto__grid">
        <Reveal className="contacto__intro">
          <p className="section__eyebrow">Hablemos</p>
          <h2 className="section__title">
            Cuéntanos qué quieres hacer sentir.
          </h2>
          <p className="section__lead">
            Escríbenos sobre tu evento o tu idea. Te respondemos con una
            propuesta a la medida.
          </p>
          <ul className="contacto__data">
            <li>
              <span>Correo</span>
              <a href="mailto:contacto@blackcarpet.cl">contacto@blackcarpet.cl</a>
            </li>
            <li>
              <span>Ubicación</span>
              <p>Santiago, Chile</p>
            </li>
          </ul>
        </Reveal>

        <Reveal className="contacto__formwrap" delay={120}>
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form__row">
              <label className="field">
                <span>Nombre *</span>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange}
                  required
                  autoComplete="name"
                />
              </label>
              <label className="field">
                <span>Correo *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="form__row">
              <label className="field">
                <span>Teléfono</span>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={onChange}
                  autoComplete="tel"
                />
              </label>
              <label className="field">
                <span>Tipo de evento</span>
                <select name="tipoEvento" value={form.tipoEvento} onChange={onChange}>
                  <option value="">Selecciona…</option>
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>Cuéntanos sobre tu evento *</span>
              <textarea
                name="mensaje"
                rows="5"
                value={form.mensaje}
                onChange={onChange}
                required
              ></textarea>
            </label>

            <button
              type="submit"
              className="btn btn--primary form__submit"
              disabled={estado.tipo === 'enviando'}
            >
              {estado.tipo === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {estado.msg && (
              <p className={`form__status form__status--${estado.tipo}`}>
                {estado.msg}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
