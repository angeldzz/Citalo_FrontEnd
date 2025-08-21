import './Citalo.css'

export default function Citalo() {
  return (
    <div className="citalo-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">Citalo</span>
            <br />
            Transforma la gestión de citas de tu negocio
          </h1>
          <p className="hero-description">
            La plataforma líder para peluquerías, veterinarios y negocios de servicios. 
            Permite que tus clientes reserven citas 24/7 mientras tú te enfocas en lo que mejor sabes hacer.
          </p>
          <div className="hero-buttons">
            <button className="citalo-btn-primary">Comenzar Gratis</button>
            <button className="citalo-btn-secondary">Ver Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Negocios Activos</span>
            </div>
            <div className="stat">
              <span className="stat-number">100,000+</span>
              <span className="stat-label">Citas Agendadas</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="phone-mockup">
            <div className="screen">
              <div className="app-preview">
                <div className="calendar-widget"></div>
                <div className="time-slots"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="features">
        <div className="citalo-content-container">
          <h2 className="citalo-section-title">¿Por qué elegir Citalo?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Agenda Inteligente</h3>
              <p>Sistema de reservas automatizado que se adapta a tus horarios y disponibilidad en tiempo real.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>App Móvil</h3>
              <p>Tus clientes pueden agendar desde cualquier dispositivo, en cualquier momento del día.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Recordatorios</h3>
              <p>Notificaciones automáticas que reducen las ausencias y mantienen a tus clientes informados.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics</h3>
              <p>Reportes detallados para optimizar tu negocio y entender mejor a tus clientes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Pagos Online</h3>
              <p>Acepta pagos por adelantado y reduce cancelaciones de último minuto.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalización</h3>
              <p>Adapta la plataforma a tu marca y tipo de negocio específico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="business-types">
        <div className="citalo-content-container">
          <h2 className="citalo-section-title">Perfecto para tu tipo de negocio</h2>
          <div className="business-grid">
            <div className="business-card">
              <div className="business-icon">💇‍♀️</div>
              <h3>Peluquerías & Spas</h3>
              <p>Gestiona citas de corte, coloración y tratamientos con facilidad</p>
            </div>
            <div className="business-card">
              <div className="business-icon">🐕</div>
              <h3>Veterinarias</h3>
              <p>Organiza consultas, vacunas y emergencias veterinarias</p>
            </div>
            <div className="business-card">
              <div className="business-icon">🦷</div>
              <h3>Clínicas Dentales</h3>
              <p>Programa limpiezas, tratamientos y consultas especializadas</p>
            </div>
            <div className="business-card">
              <div className="business-icon">💅</div>
              <h3>Centros de Belleza</h3>
              <p>Coordina manicures, pedicures y tratamientos estéticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="citalo-content-container">
          <h2 className="citalo-section-title">Precios transparentes</h2>
          <div className="pricing-cards">
            <div className="pricing-card client-card">
              <div className="card-header">
                <h3>Para Clientes</h3>
                <div className="price">
                  <span className="currency">€</span>
                  <span className="amount">0</span>
                  <span className="period">/siempre</span>
                </div>
              </div>
              <ul className="features-list">
                <li>✅ Reservas ilimitadas</li>
                <li>✅ Recordatorios automáticos</li>
                <li>✅ Historial de citas</li>
                <li>✅ Valoraciones y reseñas</li>
                <li>✅ Soporte 24/7</li>
              </ul>
              <button className="citalo-btn-outline">Descargar App</button>
            </div>
            
            <div className="pricing-card business-card-price featured">
              <div className="card-header">
                <div className="popular-badge">Más Popular</div>
                <h3>Para Negocios</h3>
                <div className="price">
                  <span className="currency">€</span>
                  <span className="amount">20</span>
                  <span className="period">/mes</span>
                </div>
              </div>
              <ul className="features-list">
                <li>✅ Panel de administración completo</li>
                <li>✅ Calendario sincronizado</li>
                <li>✅ Gestión de servicios y precios</li>
                <li>✅ Analytics avanzados</li>
                <li>✅ Integración con redes sociales</li>
                <li>✅ Soporte prioritario</li>
                <li>✅ Personalización de marca</li>
              </ul>
              <button className="citalo-btn-primary">Comenzar Prueba Gratis</button>
              <p className="trial-text">30 días gratis • Sin compromiso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="citalo-content-container">
          <h2>¿Listo para revolucionar tu negocio?</h2>
          <p>Únete a miles de negocios que ya confían en Citalo para gestionar sus citas</p>
          <button className="citalo-btn-primary large">Comenzar Ahora</button>
          <p className="guarantee">💰 Garantía de devolución de 30 días</p>
        </div>
      </section>
    </div>
  )
}
