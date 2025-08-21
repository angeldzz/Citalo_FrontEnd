import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    console.log({ email, password });
    alert('Inicio de sesión simulado');
    navigate('/calendar'); // redirige a la app
  };

  return (
    <div className="login-page">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <form className="login-card" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="title">
          <span className="title-accent">Aplicación</span> Citas
        </h1>
        <p className="subtitle">Acceso seguro al panel</p>

        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              {/* email icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75z" stroke="currentColor" opacity=".6"/>
                <path d="M4 7l8 6 8-6" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              {/* lock icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" opacity=".6"/>
                <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="icon-btn"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowPassword(s => !s)}
            >
              {/* eye icon */}
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
        </div>

        <div className="row">
          <label className="check">
            <input type="checkbox" /> <span>Recordarme</span>
          </label>
          <a className="link" href="#">¿Olvidaste tu contraseña?</a>
        </div>

        <button className="btn" type="submit" onClick={() => window.open('/')} disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
