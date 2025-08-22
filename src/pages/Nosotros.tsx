import './Nosotros.css'

export default function Nosotros() {
  return (
    <div className="nosotros-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Conoce a <span className="highlight">Citalo</span>
            <br />
            La historia detrás de tu plataforma favorita
          </h1>
          <p className="hero-description">
            Desde 2020, hemos estado revolucionando la forma en que los negocios gestionan sus citas. 
            Nacimos de la necesidad de simplificar y digitalizar los procesos de reserva para miles de empresarios.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4+</span>
              <span className="stat-label">Años de experiencia</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Empleados dedicados</span>
            </div>
            <div className="stat">
              <span className="stat-number">25+</span>
              <span className="stat-label">Países presentes</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="team-illustration">
            <div className="team-members">
              <div className="member"></div>
              <div className="member"></div>
              <div className="member"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="nosotros-content-container">
          <h2 className="nosotros-section-title">Nuestra Misión</h2>
          <div className="mission-content">
            <div className="mission-text">
              <h3>Transformar la gestión empresarial</h3>
              <p>
                En Citalo creemos que cada minuto cuenta. Por eso desarrollamos una plataforma que no solo 
                simplifica la gestión de citas, sino que transforma por completo la relación entre negocios y clientes.
              </p>
              <p>
                Nuestra misión es empoderar a empresarios de todo el mundo con herramientas tecnológicas 
                accesibles, intuitivas y poderosas que les permitan crecer y prosperar en la era digital.
              </p>
            </div>
            <div className="mission-values">
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h4>Innovación</h4>
                <p>Buscamos constantemente nuevas formas de mejorar y evolucionar.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h4>Confianza</h4>
                <p>Construimos relaciones duraderas basadas en transparencia y calidad.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">⚡</div>
                <h4>Eficiencia</h4>
                <p>Optimizamos cada proceso para maximizar tu tiempo y resultados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="nosotros-content-container">
          <h2 className="nosotros-section-title">Nuestro Equipo</h2>
          <p className="team-description">
            Un grupo diverso de profesionales apasionados por la tecnología y el servicio al cliente
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <div className="avatar">👨‍💼</div>
              </div>
              <h3>Carlos Mendoza</h3>
              <p className="role">CEO & Fundador</p>
              <p className="bio">Visionario tecnológico con 15 años de experiencia en desarrollo de software empresarial.</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="avatar">👩‍💻</div>
              </div>
              <h3>Ana García</h3>
              <p className="role">CTO</p>
              <p className="bio">Experta en arquitectura de sistemas y líder del equipo de desarrollo técnico.</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="avatar">👨‍🎨</div>
              </div>
              <h3>Luis Rodriguez</h3>
              <p className="role">Director de Diseño</p>
              <p className="bio">Diseñador UX/UI especializado en crear experiencias intuitivas y atractivas.</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="avatar">👩‍📊</div>
              </div>
              <h3>María López</h3>
              <p className="role">Directora de Marketing</p>
              <p className="bio">Estratega digital enfocada en conectar nuestra tecnología con las necesidades del mercado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline">
        <div className="nosotros-content-container">
          <h2 className="nosotros-section-title">Nuestro Camino</h2>
          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>El Comienzo</h3>
                <p>Fundación de Citalo con una visión clara: simplificar la gestión de citas para pequeños negocios.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>Primeros 1,000 Clientes</h3>
                <p>Alcanzamos nuestro primer hito importante con más de 1,000 negocios confiando en nuestra plataforma.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Expansión Internacional</h3>
                <p>Lanzamiento en 10 países de Latinoamérica y Europa, adaptando la plataforma a diferentes mercados.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Innovación Continua</h3>
                <p>Introducción de IA para optimización automática de horarios y análisis predictivo de tendencias.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>El Futuro es Hoy</h3>
                <p>Más de 5,000 negocios activos y 100,000+ citas gestionadas mensualmente en toda la plataforma.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="nosotros-content-container">
          <h2>¿Quieres formar parte de nuestra historia?</h2>
          <p>Únete a la revolución digital y transforma tu negocio con Citalo</p>
          <button className="nosotros-btn-primary large">Comenzar Ahora</button>
          <p className="guarantee">🚀 Únete a miles de empresarios exitosos</p>
        </div>
      </section>
    </div>
  )
}