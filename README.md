# 🗓️ Citalo - Plataforma de Gestión de Citas

¡Bienvenido a **Citalo**! 🎉 

Una plataforma web moderna diseñada para negocios que trabajan con citas previas. Desde peluquerías hasta clínicas veterinarias, pasando por centros de estética y cualquier negocio que necesite organizar su agenda de manera profesional.

## 🤔 ¿Qué problema resuelve?

¿Te ha pasado que has querido pedir cita en tu peluquería favorita y has tenido que llamar varias veces hasta que te cojan el teléfono? ¿O que como dueño de un negocio pasas más tiempo gestionando citas por WhatsApp que atendiendo a tus clientes?

**Citalo** nace para solucionar exactamente estos problemas. Es la manera más sencilla para que los negocios gestionen sus citas online y los clientes puedan reservar cuando les venga mejor, las 24 horas del día.

## ✨ ¿Cómo funciona?

### Para negocios
1. **Te registras** en la plataforma por €20/mes
2. **Configuras tu perfil** (servicios, horarios, información de contacto)
3. **Gestionas tu calendario** de disponibilidad
4. **Recibes las reservas** automáticamente
5. **¡Listo!** Ya puedes dedicarte a lo que mejor sabes hacer

### Para clientes
1. **Te registras gratis** en la plataforma
2. **Buscas tu negocio favorito** o descubres nuevos
3. **Ves los horarios disponibles** en tiempo real
4. **Reservas tu cita** con un par de clics
5. **Recibes confirmación** y recordatorios

## 🛠️ Tecnología

Hemos construido Citalo con las mejores tecnologías para garantizar una experiencia fluida y segura:

### Frontend
- **React 18** con TypeScript para una interfaz moderna y robusta
- **Vite** para un desarrollo ágil
- **CSS puro** siguiendo metodología BEM (¡sí, sin frameworks CSS! A veces menos es más)

### Backend
- **Django 4.x** con Django REST Framework para una API potente
- **Python 3.11+** porque nos gusta escribir código limpio
- **MySQL 8.x** para almacenar todos los datos de forma segura
- **JWT** para autenticación segura

### Pagos y infraestructura
- **Stripe** para gestionar suscripciones de forma segura
- **Docker** para despliegues consistentes
- **Nginx + Gunicorn** para servir la aplicación en producción

## 🏗️ Estructura del proyecto

```
citalo/
├── frontend_citalo/          # Aplicación React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   └── ...
│   └── ...
│
├── backend_citalo/          # API Django
│   ├── Citalo/             # Configuración del proyecto
│   ├── api/                # Lógica principal de la API
│   └── ...
│
└── README.md               # Este archivo 😊
```

## 🚀 Empezar a desarrollar

### Requisitos previos
- Node.js 18+
- Python 3.11+
- MySQL 8.x
- Cuenta de Stripe (para pagos)

### Configuración inicial

1. **Clona el repositorio**
```bash
git clone https://github.com/angeldzz/BackEnd_Citalo
cd citalo
```

2. **Configura el backend**
```bash
cd backend_citalo
pip install -r requirements.txt
# Configura tu .env con las variables necesarias
python manage.py migrate
python manage.py runserver
```

3. **Configura el frontend**
```bash
cd frontend_citalo
npm install
npm run dev
```

¡Y ya está! Tu instancia local de Citalo debería estar corriendo en `http://localhost:5173` (frontend) y `http://localhost:8000` (API).

## 👥 ¿Quién usa Citalo?

### Tipos de negocio perfectos para Citalo:
- 💇 Peluquerías y barberías
- 🐕 Clínicas veterinarias
- 💅 Centros de estética y belleza
- 🦷 Consultas médicas
- 🧘‍♀️ Centros de bienestar
- Y cualquier negocio que trabaje con citas previas

### Roles en la plataforma:
- **Administrador**: Gestiona la plataforma globalmente
- **Propietario del negocio**: Configura su negocio y gestiona citas
- **Empleados**: (Funcionalidad futura) Ayudan en la gestión
- **Clientes**: Reservan citas fácilmente

## 🔮 Futuras funcionalidades

Estamos trabajando constantemente para mejorar Citalo. Algunas cosas que tenemos en mente:

- 📱 Aplicación móvil nativa
- 📧 Notificaciones automáticas por email/SMS
- 📊 Dashboard con estadísticas avanzadas para negocios
- 🌍 Soporte multi-idioma
- 📅 Integración con Google Calendar
- 💳 Pagos online para servicios

## 🤝 Contribuir

¿Tienes ideas geniales? ¿Has encontrado algún bug? ¡Nos encanta recibir contribuciones!

1. Fork el proyecto
2. Crea tu rama de funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -m 'Añade nueva funcionalidad increíble'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ve el archivo `LICENSE` para más detalles.


*"Porque tu tiempo es valioso, y reservar una cita no debería ser complicado"*