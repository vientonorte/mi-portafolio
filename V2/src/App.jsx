
import './estilos/global.css';
import { Boton } from './design-system/Boton';

import { Input } from './design-system/Input';

function App() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 48 }}>
        <h1>Portafolio Staff/Principal UX</h1>
        <p>
          Diseño experiencias digitales que generan confianza, inclusión y resultados medibles en el sector financiero. Mi enfoque combina claridad, empatía y rigor en accesibilidad.
        </p>
        <Boton onClick={() => window.open('https://github.com/tuusuario', '_blank')}>
          Ver perfil en GitHub
        </Boton>
      </header>
      <section>
        <h2>Casos de éxito recientes</h2>
        <CardCasoEstudio
          titulo="Onboarding digital bancario inclusivo"
          resumen="Diseñé un flujo de alta digital que aumentó la conversión un 32% y redujo el abandono en dispositivos móviles."
          imagen="/src/imagenes/onboarding.webp"
          link="#"
        />
        {/* Agrega más <CardCasoEstudio /> aquí */}
      </section>
      <section style={{ marginTop: 48 }}>
        <h2>Contacto rápido</h2>
        <form aria-label="Formulario de contacto" autoComplete="on" style={{ maxWidth: 400 }}>
          <Input id="nombre" label="Nombre" required />
          <Input id="email" label="Email" type="email" required />
          <Input id="mensaje" label="Mensaje" as="textarea" required />
          <Boton tipo="submit">Enviar mensaje</Boton>
        </form>
      </section>
    </main>
  );
}

export default App;
