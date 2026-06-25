import Reveal from './Reveal.jsx'

const EXPERIENCIAS = [
  {
    cat: 'Lanzamiento de marca',
    titulo: 'Sala Sensorial',
    desc: 'Recorrido inmersivo de luz y sonido para revelar un producto en un viaje de cinco actos.',
  },
  {
    cat: 'Gala corporativa',
    titulo: 'Noche en Negro',
    desc: 'Cena-espectáculo con mapping en vivo, performance y una atmósfera escenográfica envolvente.',
  },
  {
    cat: 'Activación',
    titulo: 'Portal Interactivo',
    desc: 'Instalación reactiva al movimiento que convirtió a cada visitante en parte de la obra.',
  },
  {
    cat: 'Experiencia de marca',
    titulo: 'Bosque Lumínico',
    desc: 'Escenografía natural intervenida con iluminación y audio espacial para un evento privado.',
  },
]

export default function Experiencias() {
  return (
    <section className="section experiencias" id="experiencias">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Experiencias</p>
          <h2 className="section__title">
            Cada proyecto, un mundo propio.
          </h2>
          <p className="section__lead">
            Una muestra del tipo de experiencias que creamos. El contenido y las
            imágenes reales se incorporan al cerrar el portafolio definitivo.
          </p>
        </Reveal>

        <div className="grid grid--2">
          {EXPERIENCIAS.map((e, i) => (
            <Reveal key={e.titulo} className="exp" delay={i * 90}>
              <div className="exp__media" aria-hidden="true">
                <span className="exp__placeholder">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="exp__body">
                <span className="exp__cat">{e.cat}</span>
                <h3 className="exp__title">{e.titulo}</h3>
                <p className="exp__desc">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
