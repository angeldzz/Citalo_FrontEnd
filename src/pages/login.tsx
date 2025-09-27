import './login.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    tipo_usuario: string;
  };
}

interface ApiError {
  message?: string;
  detail?: string;
  username?: string[];
  password?: string[];
  non_field_errors?: string[];
  [key: string]: any;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Limpiar error del campo cuando el usuario comienza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario o email es requerido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
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
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data); // Debug log

      if (response.ok) {
        const loginData: LoginResponse = data;
        
        // Verificar que tenemos el token
        if (!loginData.token) {
          setErrors({ general: 'Error en la respuesta del servidor: token no encontrado' });
          return;
        }

        // Guardar token
        if (rememberMe) {
          localStorage.setItem('authToken', loginData.token);
        } else {
          sessionStorage.setItem('authToken', loginData.token);
        }

        // Si tenemos datos del usuario, los guardamos
        if (loginData.user) {
          const userData = JSON.stringify(loginData.user);
          if (rememberMe) {
            localStorage.setItem('userData', userData);
          } else {
            sessionStorage.setItem('userData', userData);
          }

          // Mostrar mensaje de bienvenida
          const userName = loginData.user.first_name || loginData.user.username || 'Usuario';
          alert(`¡Bienvenido ${userName}!`);
          
          // Redirigir según el tipo de usuario
          if (loginData.user.tipo_usuario === 'negocio') {
            navigate('/');
          } else if (loginData.user.tipo_usuario === 'admin') {
            navigate('/admin-panel');
          } else {
            navigate('/calendar');
          }
        } else {
          // Si no tenemos datos del usuario pero sí token, hacer una segunda petición
          try {
            const userResponse = await fetch('http://localhost:8000/api/usuarios/me/', {
              headers: {
                'Authorization': `Token ${loginData.token}`,
                'Content-Type': 'application/json',
              },
            });

            if (userResponse.ok) {
              const userData = await userResponse.json();
              const userDataString = JSON.stringify(userData);
              
              if (rememberMe) {
                localStorage.setItem('userData', userDataString);
              } else {
                sessionStorage.setItem('userData', userDataString);
              }

              const userName = userData.first_name || userData.username || 'Usuario';
              alert(`¡Bienvenido ${userName}!`);
              
              if (userData.tipo_usuario === 'negocio') {
                navigate('/dashboard-negocio');
              } else if (userData.tipo_usuario === 'admin') {
                navigate('/admin-panel');
              } else {
                navigate('/calendar');
              }
            } else {
              // Login exitoso pero no podemos obtener datos del usuario
              alert('¡Login exitoso!');
              navigate('/calendar');
            }
          } catch (userError) {
            console.error('Error al obtener datos del usuario:', userError);
            // Login exitoso pero no podemos obtener datos del usuario
            alert('¡Login exitoso!');
            navigate('/calendar');
          }
        }
      } else {
        // Manejar errores de autenticación
        const apiError: ApiError = data;
        
        if (apiError.username && Array.isArray(apiError.username) && apiError.username.length > 0) {
          setErrors(prev => ({ ...prev, username: apiError.username![0] }));
        }
        if (apiError.password && Array.isArray(apiError.password) && apiError.password.length > 0) {
          setErrors(prev => ({ ...prev, password: apiError.password![0] }));
        }
        if (apiError.non_field_errors && Array.isArray(apiError.non_field_errors) && apiError.non_field_errors.length > 0) {
          setErrors(prev => ({ ...prev, general: apiError.non_field_errors![0] }));
        }
        if (apiError.detail) {
          setErrors(prev => ({ ...prev, general: apiError.detail || 'Error desconocido' }));
        }
        if (apiError.message) {
          setErrors(prev => ({ ...prev, general: apiError.message || 'Error desconocido' }));
        }
        
        // Error genérico si no hay errores específicos
        const hasSpecificErrors = 
          (apiError.username && apiError.username.length > 0) ||
          (apiError.password && apiError.password.length > 0) ||
          (apiError.non_field_errors && apiError.non_field_errors.length > 0) ||
          apiError.detail ||
          apiError.message;
          
        if (!hasSpecificErrors) {
          setErrors({ general: 'Credenciales inválidas' });
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrors({ general: 'Error de conexión. Por favor, intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
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

        {errors.general && (
          <div className="error-message" style={{ marginBottom: '16px', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <div className="field">
          <label htmlFor="username">Usuario o Email</label>
          <div className="input-wrap">
            <span className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" opacity=".6"/>
              </svg>
            </span>
            <input
              id="username"
              type="text"
              placeholder="usuario o correo@ejemplo.com"
              value={formData.username}
              onChange={handleChange('username')}
              required
            />
          </div>
          {errors.username && <div className="error-message">{errors.username}</div>}
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
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="row">
          <label className="check">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            /> 
            <span>Recordarme</span>
          </label>
          <Link to="/forgot-password" className="link">¿Olvidaste tu contraseña?</Link>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <div className="register-link">
          ¿No tienes cuenta? <Link to="/register" className="link">Regístrate</Link>
        </div>
      </form>
    </div>
  );
}
