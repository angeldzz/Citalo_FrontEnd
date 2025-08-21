import './register.css';
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { level: 0, text: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 2) return { level: 1, text: 'Débil', color: '#ef4444' };
    if (score <= 3) return { level: 2, text: 'Regular', color: '#f59e0b' };
    if (score <= 4) return { level: 3, text: 'Buena', color: '#10b981' };
    return { level: 4, text: 'Excelente', color: '#22d3ee' };
  }, [formData.password]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordStrength.level < 2) {
      alert('La contraseña es muy débil');
      return;
    }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    console.log(formData);
    alert('Registro exitoso');
    navigate('/login');
  };

  return (
    <div className="register-page">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <form className="register-card" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="title">
          <span className="title-accent">Crear</span> Cuenta
        </h1>
        <p className="subtitle">Únete a la plataforma</p>

        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" opacity=".6"/>
                <path d="M21 20C21 16.13 16.97 13 12 13C7.03 13 3 16.13 3 20" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange('nombre')}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="apellidos">Apellidos</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z" stroke="currentColor" opacity=".6"/>
              </svg>
            </span>
            <input
              id="apellidos"
              type="text"
              placeholder="Tus apellidos"
              value={formData.apellidos}
              onChange={handleChange('apellidos')}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75z" stroke="currentColor" opacity=".6"/>
                <path d="M4 7l8 6 8-6" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={formData.email}
              onChange={handleChange('email')}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" opacity=".6"/>
                <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange('password')}
              required
            />
            <button
              type="button"
              className="icon-btn"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowPassword(s => !s)}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" opacity=".6"/>
                  <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 3-3c0-.4-.08-.8-.22-1.1" stroke="currentColor"/>
                  <path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7c-2.3 0-4.3-1-5.9-2.3" stroke="currentColor" opacity=".8"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7z" stroke="currentColor" opacity=".8"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor"/>
                </svg>
              )}
            </button>
          </div>
          {formData.password && (
            <div className="strength-indicator">
              <div className="strength-bar">
                <div 
                  className="strength-fill" 
                  style={{ 
                    width: `${(passwordStrength.level / 4) * 100}%`,
                    backgroundColor: passwordStrength.color 
                  }}
                />
              </div>
              <span className="strength-text" style={{ color: passwordStrength.color }}>
                {passwordStrength.text}
              </span>
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="currentColor"/>
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" opacity=".6"/>
                <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
            />
            <button
              type="button"
              className="icon-btn"
              aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowConfirmPassword(s => !s)}
            >
              {showConfirmPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" opacity=".6"/>
                  <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 3-3c0-.4-.08-.8-.22-1.1" stroke="currentColor"/>
                  <path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7c-2.3 0-4.3-1-5.9-2.3" stroke="currentColor" opacity=".8"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7z" stroke="currentColor" opacity=".8"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor"/>
                </svg>
              )}
            </button>
          </div>
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <div className="error-message">Las contraseñas no coinciden</div>
          )}
        </div>

        <button className="btn" type="submit" onClick={() => window.open('/')} disabled={loading}>
          {loading ? 'Registrando…' : 'Registrar'}
        </button>

        <div className="login-link">
          ¿Ya tienes cuenta? <Link to="/login" className="link">Inicia sesión</Link>
        </div>
      </form>
    </div>
  );
}