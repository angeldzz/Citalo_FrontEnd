import './Contacto.css'

export default function Contacto() {
  return (
    <div className="contacto-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">Contáctanos</span>
            <br />
            Estamos aquí para ayudarte
          </h1>
          <p className="hero-description">
            ¿Tienes preguntas sobre Citalo? ¿Necesitas soporte técnico? ¿Quieres una demostración personalizada? 
            Nuestro equipo está listo para asistirte en todo lo que necesites.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Soporte disponible</span>
            </div>
            <div className="stat">
              <span className="stat-number">&lt;2h</span>
              <span className="stat-label">Tiempo de respuesta</span>
            </div>
            <div className="stat">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfacción del cliente</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="contact-illustration">
            <div className="support-icons">
              <div className="support-icon">📞</div>
              <div className="support-icon">💬</div>
              <div className="support-icon">📧</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="contact-methods">
        <div className="contacto-content-container">
          <h2 className="contacto-section-title">Múltiples formas de contactar</h2>
          <div className="methods-grid">
            <div className="method-card">
              <div className="method-icon">📧</div>
              <h3>Email</h3>
              <p>Escríbenos y te responderemos en menos de 2 horas</p>
              <a href="mailto:soporte@citalo.com" className="contact-link">soporte@citalo.com</a>
            </div>
            <div className="method-card">
              <div className="method-icon">💬</div>
              <h3>Chat en Vivo</h3>
              <p>Chatea con nuestro equipo de soporte en tiempo real</p>
              <button className="contact-link">Iniciar Chat</button>
            </div>
            <div className="method-card">
              <div className="method-icon">📞</div>
              <h3>Teléfono</h3>
              <p>Llámanos de lunes a viernes de 9:00 a 18:00</p>
              <a href="tel:+34900123456" className="contact-link">+34 900 123 456</a>
            </div>
            <div className="method-card">
              <div className="method-icon">📍</div>
              <h3>Oficina</h3>
              <p>Visítanos en nuestras oficinas centrales</p>
              <span className="contact-link">Madrid, España</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contacto-content-container">
          <div className="form-container">
            <div className="form-header">
              <h2 className="contacto-section-title">Envíanos un mensaje</h2>
              <p>Completa el formulario y nos pondremos en contacto contigo lo antes posible</p>
            </div>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input type="text" id="nombre" name="nombre" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" />
                </div>
                <div className="form-group">
                  <label htmlFor="empresa">Empresa</label>
                  <input type="text" id="empresa" name="empresa" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo de consulta</label>
                <select id="tipo" name="tipo" required>
                  <option value="">Selecciona una opción</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="ventas">Información de ventas</option>
                  <option value="demo">Solicitar demo</option>
                  <option value="facturacion">Facturación</option>
                  <option value="general">Consulta general</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows={6} required placeholder="Cuéntanos en qué podemos ayudarte..."></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="contacto-btn-primary">
                  Enviar Mensaje
                </button>
                <p className="privacy-note">
                  Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos personales.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="contacto-content-container">
          <h2 className="contacto-section-title">Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>¿Cómo puedo empezar a usar Citalo?</h3>
              <p>Simplemente regístrate en nuestra plataforma, configura tu negocio y servicios, ¡y estarás listo para recibir reservas!</p>
            </div>
            <div className="faq-item">
              <h3>¿Hay un período de prueba gratuito?</h3>
              <p>Sí, ofrecemos 30 días de prueba gratuita sin compromiso para que puedas experimentar todas las funcionalidades.</p>
            </div>
            <div className="faq-item">
              <h3>¿Puedo cancelar mi suscripción en cualquier momento?</h3>
              <p>Por supuesto. No hay permanencia y puedes cancelar tu suscripción cuando desees desde tu panel de administración.</p>
            </div>
            <div className="faq-item">
              <h3>¿Ofrecen soporte técnico?</h3>
              <p>Sí, nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta técnica o problema que puedas tener.</p>
            </div>
            <div className="faq-item">
              <h3>¿Es segura la plataforma?</h3>
              <p>Absolutamente. Utilizamos encriptación SSL y cumplimos con todas las normativas de protección de datos (GDPR).</p>
            </div>
            <div className="faq-item">
              <h3>¿Puedo personalizar la apariencia de mi página de reservas?</h3>
              <p>Sí, puedes personalizar colores, logotipos y textos para que coincidan con la imagen de tu marca.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location">
        <div className="contacto-content-container">
          <h2 className="contacto-section-title">Nuestra Ubicación</h2>
          <div className="location-content">
            <div className="location-info">
              <h3>Oficinas Centrales</h3>
              <div className="address">
                <div className="address-item">
                  <div className="address-icon">📍</div>
                  <div>
                    <strong>Dirección:</strong><br />
                    Calle Gran Vía, 123<br />
                    28013 Madrid, España
                  </div>
                </div>
                <div className="address-item">
                  <div className="address-icon">🕒</div>
                  <div>
                    <strong>Horario de atención:</strong><br />
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábados: 10:00 - 14:00
                  </div>
                </div>
                <div className="address-item">
                  <div className="address-icon">🚇</div>
                  <div>
                    <strong>Transporte público:</strong><br />
                    Metro: Gran Vía (Líneas 1 y 5)<br />
                    Autobús: Líneas 3, 40, 149
                  </div>
                </div>
              </div>
            </div>
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-icon">🗺️</div>
                <p>Mapa interactivo</p>
                <button className="map-button">Ver en Google Maps</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="contacto-content-container">
          <h2>¿Listo para comenzar?</h2>
          <p>No esperes más. Únete a miles de negocios que ya confían en Citalo</p>
          <div className="cta-buttons">
            <button className="contacto-btn-primary large">Comenzar Prueba Gratuita</button>
            <button className="contacto-btn-secondary large">Solicitar Demo</button>
          </div>
          <p className="guarantee">💬 ¿Tienes dudas? Hablemos sin compromiso</p>
        </div>
      </section>
    </div>
  )
}