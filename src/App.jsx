import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Servicios from './components/Servicios.jsx'
import Experiencias from './components/Experiencias.jsx'
import Proceso from './components/Proceso.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Experiencias />
        <Proceso />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
