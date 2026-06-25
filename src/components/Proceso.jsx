import Reveal from './Reveal.jsx'

const PASOS = [
  {
    n: '01',
    titulo: 'Escuchar',
    texto: 'Entendemos tu objetivo, tu marca y a quién quieres emocionar. Todo nace de ahí.',
  },
  {
    n: '02',
    titulo: 'Imaginar',
    texto: 'Construimos un concepto y un relato. Definimos la atmósfera, la estética y la experiencia.',
  },
  {
    n: '03',
    titulo: 'Producir',
    texto: 'Diseño, escenografía, técnica y logística. Coordinamos cada proveedor y cada detalle.',
  },
  {
    n: '04',
    titulo: 'Vivir',
    texto: 'Dirección en vivo el día del evento para que todo fluya y la experiencia sea impecable.',
  },
]

export default function Proceso() {
  return (
    <section className="section proceso" id="proceso">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Cómo trabajamos</p>
          <h2 className="section__title">Un proceso claro detrás de cada experiencia.</h2>
        </Reveal>

        <div className="steps">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} className="step" delay={i * 90}>
              <span className="step__num">{p.n}</span>
              <h3 className="step__title">{p.titulo}</h3>
              <p className="step__text">{p.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
