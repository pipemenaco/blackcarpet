export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          BLACK<span>CARPET</span>
          <p>Experiencias inmersivas que se viven, no solo se ven.</p>
        </div>

        <nav className="footer__nav" aria-label="Pie de página">
          <a href="#servicios">Servicios</a>
          <a href="#experiencias">Experiencias</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="footer__contact">
          <a href="mailto:contacto@blackcarpet.cl">contacto@blackcarpet.cl</a>
          <p>Santiago, Chile</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} Black Carpet. Todos los derechos reservados.</p>
        <p>blackcarpet.cl</p>
      </div>
    </footer>
  )
}
