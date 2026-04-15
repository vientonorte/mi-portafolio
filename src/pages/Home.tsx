import React from 'react';

const Home = () => (
  <section aria-labelledby="hero-title" style={{ padding: '64px 0', textAlign: 'center' }}>
    <h1 id="hero-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
      Diseño sistemas de inversión que convierten bajo regulación
    </h1>
    <h2 style={{ fontWeight: 400, color: 'var(--color-pizarra)', marginBottom: '32px' }}>
      UX + datos + compliance + comportamiento humano
    </h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px' }}>
      <div className="card" aria-label="Conversión">
        <strong>+18%</strong><br />conversión
      </div>
      <div className="card" aria-label="Tiempo decisión">
        <strong>-30%</strong><br />tiempo decisión
      </div>
      <div className="card" aria-label="Error">
        <strong>-20%</strong><br />error
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
      <a href="/proyectos" className="card" style={{ textDecoration: 'none', color: 'var(--color-noche)' }}>Ver proyectos</a>
      <a href="/contacto" className="card" style={{ textDecoration: 'none', color: 'var(--color-noche)' }}>Contactar</a>
    </div>
    <p style={{ marginTop: '48px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', color: 'var(--color-pizarra)' }}>
      No diseño pantallas: diseño decisiones.<br />
      Transformo sistemas financieros complejos en experiencias que cumplen regulación, reducen errores y aceleran la toma de decisión.<br />
      Cada solución parte de evidencia, no de supuestos.
    </p>
  </section>
);

export default Home;
