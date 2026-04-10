
import './estilos/global.css';
import { Boton } from './design-system/Boton';

import { Input } from './design-system/Input';

function App() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 48 }}>
        <h1>Historias de impacto en UX financiero</h1>
        <p>
          Mi propósito es transformar retos complejos en experiencias digitales simples, seguras y humanas para millones de personas. Como Staff/Principal UX, lidero la estrategia y ejecución de productos que conectan la visión de negocio con las verdaderas necesidades de usuarios en banca, inversiones y tecnología financiera.
        </p>
        <p>
          Creo que el diseño es un puente entre la confianza y la innovación. Cada proyecto es una oportunidad para alinear equipos, desafiar el status quo y entregar valor medible, incluso en los entornos más regulados y exigentes.
        </p>
        <Boton onClick={() => window.open('https://github.com/tuusuario', '_blank')}>
          Ver perfil en GitHub
        </Boton>
      </header>
      <section>
        <h2>Casos de éxito recientes</h2>
        <CardCasoEstudio
          titulo="Onboarding digital bancario inclusivo"
          resumen="Lideré el diseño y validación de un MVP de onboarding digital, priorizando accesibilidad y cumplimiento. El proceso fue iterado en sprints scrum, logrando reducir el abandono y sentar bases para releases futuros."
          imagen="/src/imagenes/onboarding.webp"
          link="#"
        />
        <CardCasoEstudio
          titulo="Framework UX Enterprise para banca regional"
          resumen="Diseñé y documenté un framework UX escalable, alineando equipos multidisciplinarios bajo una visión común. El MVP permitió validar procesos clave y acelerar la adopción en 5 países."
          imagen="/src/imagenes/framework-ux.png"
          link="#"
        />
        <CardCasoEstudio
          titulo="Optimización de reservas en movilidad premium"
          resumen="Apliqué metodología scrum para rediseñar el flujo de reservas, priorizando quick wins y validando hipótesis en cada sprint. El MVP redujo el tiempo de reserva y mejoró la conversión."
          imagen="/src/imagenes/movilidad-premium.png"
          link="#"
        />
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
