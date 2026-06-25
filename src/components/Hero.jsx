export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__glow" aria-hidden="true"></div>
      <div className="hero__grain" aria-hidden="true"></div>

      <div className="hero__content">
        <p className="hero__eyebrow">Productora de eventos inmersivos</p>
        <h1 className="hero__title">
          Experiencias que<br />
          <em>se viven</em>, no solo se ven.
        </h1>
        <p className="hero__lead">
          Diseñamos y producimos eventos sensoriales, escenografías envolventes
          y activaciones de marca donde cada detalle —luz, sonido, espacio y
          relato— sumerge a tu audiencia por completo.
        </p>
        <div className="hero__actions">
          <a href="#contacto" className="btn btn--primary">Crear mi experiencia</a>
          <a href="#experiencias" className="btn btn--ghost">Ver experiencias</a>
        </div>
      </div>

      <a href="#servicios" className="hero__scroll" aria-label="Bajar">
        <span></span>
        Desliza
      </a>
    </section>
  )
}
