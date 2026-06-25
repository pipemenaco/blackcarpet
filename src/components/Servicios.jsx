import Reveal from './Reveal.jsx'

const SERVICIOS = [
  {
    n: '01',
    titulo: 'Eventos inmersivos',
    texto:
      'Lanzamientos, galas y experiencias de marca donde el público entra a otro mundo: ambientación 360°, narrativa espacial y momentos diseñados para emocionar.',
  },
  {
    n: '02',
    titulo: 'Escenografía y ambientación',
    texto:
      'Diseño y construcción de espacios envolventes. Estructuras, texturas y atmósferas que transforman cualquier locación en un escenario memorable.',
  },
  {
    n: '03',
    titulo: 'Luz, sonido y proyección',
    texto:
      'Iluminación arquitectónica, mapping, audio espacial y contenido audiovisual sincronizado para construir una experiencia sensorial completa.',
  },
  {
    n: '04',
    titulo: 'Activaciones de marca',
    texto:
      'Experiencias interactivas que conectan a tu marca con las personas: instalaciones, photo-experiences y dinámicas que se comparten y se recuerdan.',
  },
  {
    n: '05',
    titulo: 'Producción integral',
    texto:
      'Nos hacemos cargo de todo: concepto, dirección de arte, técnica, logística y coordinación el día del evento. Una sola contraparte, cero improvisación.',
  },
  {
    n: '06',
    titulo: 'Dirección creativa',
    texto:
      'Antes de producir, imaginamos. Construimos el concepto y el relato que dan sentido a cada decisión estética y técnica de tu experiencia.',
  },
]

export default function Servicios() {
  return (
    <section className="section servicios" id="servicios">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Qué hacemos</p>
          <h2 className="section__title">
            Producción inmersiva, de la idea al último detalle.
          </h2>
        </Reveal>

        <div className="grid grid--3">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.n} className="card" delay={i * 80}>
              <span className="card__num">{s.n}</span>
              <h3 className="card__title">{s.titulo}</h3>
              <p className="card__text">{s.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
