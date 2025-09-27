import './register.css';
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  tipo_usuario: string;
  telefono: string;
}

interface ApiError {
  message?: string;
  [key: string]: any;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    tipo_usuario: 'cliente',
    telefono: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const handleChange = (field: keyof RegisterFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Limpiar error del campo cuando el usuario comienza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Los apellidos son requeridos';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (passwordStrength.level < 2) {
      newErrors.password = 'La contraseña es muy débil';
    }

    if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Las contraseñas no coinciden';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:8000/api/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        navigate('/login');
      } else {
        // Manejar errores de validación del backend
        if (data.username) {
          setErrors(prev => ({ ...prev, username: data.username[0] }));
        }
        if (data.email) {
          setErrors(prev => ({ ...prev, email: data.email[0] }));
        }
        if (data.password) {
          setErrors(prev => ({ ...prev, password: data.password[0] }));
        }
        if (data.non_field_errors) {
          setErrors(prev => ({ ...prev, general: data.non_field_errors[0] }));
        }
        
        // Si hay un mensaje general de error
        if (data.message || data.detail) {
          setErrors(prev => ({ ...prev, general: data.message || data.detail }));
        }
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrors({ general: 'Error de conexión. Por favor, intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
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

        {errors.general && (
          <div className="error-message" style={{ marginBottom: '16px', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <div className="field">
          <label htmlFor="first_name">Nombre</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" opacity=".6"/>
                <path d="M21 20C21 16.13 16.97 13 12 13C7.03 13 3 16.13 3 20" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="first_name"
              type="text"
              placeholder="Tu nombre"
              value={formData.first_name}
              onChange={handleChange('first_name')}
              required
            />
          </div>
          {errors.first_name && <div className="error-message">{errors.first_name}</div>}
        </div>

        <div className="field">
          <label htmlFor="last_name">Apellidos</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z" stroke="currentColor" opacity=".6"/>
              </svg>
            </span>
            <input
              id="last_name"
              type="text"
              placeholder="Tus apellidos"
              value={formData.last_name}
              onChange={handleChange('last_name')}
              required
            />
          </div>
          {errors.last_name && <div className="error-message">{errors.last_name}</div>}
        </div>

        <div className="field">
          <label htmlFor="username">Nombre de usuario</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" opacity=".6"/>
              </svg>
            </span>
            <input
              id="username"
              type="text"
              placeholder="nombreusuario"
              value={formData.username}
              onChange={handleChange('username')}
              required
            />
          </div>
          {errors.username && <div className="error-message">{errors.username}</div>}
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
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="field">
          <label htmlFor="telefono">Teléfono</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" opacity=".6"/>
              </svg>
            </span>
            <input
              id="telefono"
              type="tel"
              placeholder="+34 600 000 000"
              value={formData.telefono}
              onChange={handleChange('telefono')}
              required
            />
          </div>
          {errors.telefono && <div className="error-message">{errors.telefono}</div>}
        </div>

        <div className="field">
          <label htmlFor="tipo_usuario">Tipo de usuario</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" opacity=".6"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" opacity=".6"/>
                <path d="m22 11-3-3 3-3" stroke="currentColor"/>
                <path d="m19 8 3 3-3 3" stroke="currentColor"/>
              </svg>
            </span>
            <select
              id="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleChange('tipo_usuario')}
              style={{
                flex: 1,
                background: 'transparent',
                border: 0,
                outline: 0,
                color: 'var(--text)',
                fontSize: '14px',
                padding: '2px'
              }}
              required
            >
              <option value="cliente">Cliente</option>
              <option value="negocio">Propietario de Negocio</option>
            </select>
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
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="field">
          <label htmlFor="password_confirm">Confirmar contraseña</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="currentColor"/>
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" opacity=".6"/>
                <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor"/>
              </svg>
            </span>
            <input
              id="password_confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password_confirm}
              onChange={handleChange('password_confirm')}
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
          {errors.password_confirm && <div className="error-message">{errors.password_confirm}</div>}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Registrando…' : 'Registrar'}
        </button>

        <div className="login-link">
          ¿Ya tienes cuenta? <Link to="/login" className="link">Inicia sesión</Link>
        </div>
      </form>
    </div>
  );
}