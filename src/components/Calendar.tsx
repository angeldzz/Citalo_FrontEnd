import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import './Calendar.css'
import { useState, useCallback } from 'react'
import React from 'react'

// Tipos de servicios generales
const serviceTypes = [
  { 
    value: 'peluqueria-corte', 
    label: 'Peluquería - Corte Caballero',
    category: 'peluqueria',
    duration: 60,
    color: '#1e40af'
  },
  { 
    value: 'peluqueria-tinte', 
    label: 'Peluquería - Tinte/Color',
    category: 'peluqueria',
    duration: 120,
    color: '#1d4ed8'
  },
  { 
    value: 'veterinario-revision', 
    label: 'Veterinario - Revisión General',
    category: 'veterinario',
    duration: 60,
    color: '#2563eb'
  },
  { 
    value: 'veterinario-vacunacion', 
    label: 'Veterinario - Vacunación',
    category: 'veterinario',
    duration: 30,
    color: '#3b82f6'
  },
  { 
    value: 'consultoria-asesoria', 
    label: 'Consultoría - Asesoría',
    category: 'consultoria',
    duration: 90,
    color: '#60a5fa'
  },
  { 
    value: 'fitness-entrenamiento', 
    label: 'Fitness - Entrenamiento Personal',
    category: 'fitness',
    duration: 60,
    color: '#93c5fd'
  }
]

// Datos de ejemplo
const initialEvents = [
  {
    id: '1',
    title: 'Corte Caballero - Juan Pérez',
    start: '2025-01-10T10:00:00',
    end: '2025-01-10T11:00:00',
    backgroundColor: '#1e40af',
    extendedProps: {
      serviceType: 'peluqueria-corte',
      clientName: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '123456789',
      notes: 'Cliente preferido'
    }
  },
  {
    id: '2',
    title: 'Revisión Veterinaria - Mascota Luna',
    start: '2025-01-12T16:30:00',
    end: '2025-01-12T17:30:00',
    backgroundColor: '#2563eb',
    extendedProps: {
      serviceType: 'veterinario-revision',
      clientName: 'María García',
      email: 'maria@email.com',
      phone: '987654321',
      notes: 'Revisión anual de Luna (gato)'
    }
  }
]

// Función para validar horarios permitidos
const isValidTimeSlot = (start: Date): boolean => {
  const dayOfWeek = start.getDay()
  
  // Verificar que sea de lunes a viernes (1-5)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false
  }
  
  const hour = start.getHours()
  
  // Horarios permitidos: 10:00-14:00 y 16:00-20:00
  return (hour >= 10 && hour < 14) || (hour >= 16 && hour < 20)
}

// Función para generar horarios disponibles basado en la fecha seleccionada
const generateTimeSlots = (selectedDate: Date) => {
  const slots = []
  const now = new Date()
  const isToday = selectedDate.toDateString() === now.toDateString()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  
  // Horarios de mañana: 10:00 - 14:00
  for (let hour = 10; hour < 14; hour++) {
    // Agregar slot :00
    if (!isToday || hour > currentHour || (hour === currentHour && currentMinute < 0)) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    // Agregar slot :30
    if (!isToday || hour > currentHour || (hour === currentHour && currentMinute < 30)) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  
  // Horarios de tarde: 16:00 - 20:00
  for (let hour = 16; hour < 20; hour++) {
    // Agregar slot :00
    if (!isToday || hour > currentHour || (hour === currentHour && currentMinute < 0)) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    // Agregar slot :30
    if (!isToday || hour > currentHour || (hour === currentHour && currentMinute < 30)) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  
  return slots
}

// Función para verificar si una fecha es válida (no en el pasado)
const isValidDate = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const selectedDate = new Date(date)
  selectedDate.setHours(0, 0, 0, 0)
  
  return selectedDate >= today
}

// Componente Modal mejorado
const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  selectedSlot 
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (appointment: any) => void
  selectedSlot: { start: Date; end: Date } | null
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceType: 'peluqueria-corte',
    duration: 60,
    selectedTime: '',
    notes: ''
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Generar slots disponibles cuando cambie la fecha seleccionada
  const timeSlots = selectedSlot ? generateTimeSlots(selectedSlot.start) : []

  // Establecer la primera hora disponible cuando se abra el modal
  React.useEffect(() => {
    if (isOpen && timeSlots.length > 0 && !formData.selectedTime) {
      setFormData(prev => ({ ...prev, selectedTime: timeSlots[0] }))
    }
  }, [isOpen, timeSlots])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre del cliente es obligatorio'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido'
    }

    if (!formData.selectedTime) {
      newErrors.selectedTime = 'Debe seleccionar una hora'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleServiceTypeChange = (value: string) => {
    const selectedService = serviceTypes.find(service => service.value === value)
    setFormData({
      ...formData,
      serviceType: value,
      duration: selectedService?.duration || 60
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !selectedSlot) return

    const selectedService = serviceTypes.find(service => service.value === formData.serviceType)
    
    // Crear la fecha con la hora seleccionada
    const selectedDate = new Date(selectedSlot.start)
    const [hours, minutes] = formData.selectedTime.split(':').map(Number)
    selectedDate.setHours(hours, minutes, 0, 0)
    
    // Verificar que la fecha y hora no esté en el pasado
    const now = new Date()
    if (selectedDate <= now) {
      alert('⚠️ No se puede agendar una cita en el pasado')
      return
    }
    
    const endTime = new Date(selectedDate.getTime() + formData.duration * 60000)

    const newAppointment = {
      id: Date.now().toString(),
      title: `${selectedService?.label.split(' - ')[1]} - ${formData.clientName}`,
      start: selectedDate.toISOString(),
      end: endTime.toISOString(),
      backgroundColor: selectedService?.color || '#2563eb',
      extendedProps: {
        serviceType: formData.serviceType,
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes
      }
    }

    onSave(newAppointment)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      clientName: '',
      email: '',
      phone: '',
      serviceType: 'peluqueria-corte',
      duration: 60,
      selectedTime: '',
      notes: ''
    })
    setErrors({})
    onClose()
  }

  if (!isOpen || !selectedSlot) return null

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-content" role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <div className="modal-header">
          <h3 id="modal-title">Agendar Nueva Cita</h3>
          <button 
            className="modal-close" 
            onClick={handleClose}
            aria-label="Cerrar modal"
            type="button"
          >
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          <div className="appointment-time">
            <strong>📅 Fecha seleccionada:</strong><br />
            {formatDate(selectedSlot.start)}
          </div>

          {timeSlots.length === 0 ? (
            <div className="no-slots-available">
              <p>⚠️ No hay horarios disponibles para esta fecha.</p>
              <p>Los horarios ya han pasado o no hay slots libres.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="selectedTime">
                  Hora de la cita <span className="required">*</span>
                </label>
                <select
                  id="selectedTime"
                  value={formData.selectedTime}
                  onChange={(e) => setFormData({ ...formData, selectedTime: e.target.value })}
                  className={errors.selectedTime ? 'error' : ''}
                  required
                >
                  <option value="">Selecciona una hora</option>
                  {timeSlots.length > 0 && timeSlots.some(slot => parseInt(slot.split(':')[0]) < 14) && (
                    <optgroup label="🌅 Horarios de Mañana (10:00 - 14:00)">
                      {timeSlots.filter(slot => parseInt(slot.split(':')[0]) < 14).map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {timeSlots.length > 0 && timeSlots.some(slot => parseInt(slot.split(':')[0]) >= 16) && (
                    <optgroup label="🌆 Horarios de Tarde (16:00 - 20:00)">
                      {timeSlots.filter(slot => parseInt(slot.split(':')[0]) >= 16).map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
                {errors.selectedTime && (
                  <span className="error-message" role="alert">
                    {errors.selectedTime}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="clientName">
                  Nombre del cliente <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nombre completo del cliente"
                  className={errors.clientName ? 'error' : ''}
                  aria-describedby={errors.clientName ? 'clientName-error' : undefined}
                  required
                />
                {errors.clientName && (
                  <span id="clientName-error" className="error-message" role="alert">
                    {errors.clientName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Correo electrónico <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="cliente@email.com"
                  className={errors.email ? 'error' : ''}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Número de contacto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="serviceType">
                  Tipo de servicio <span className="required">*</span>
                </label>
                <select
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => handleServiceTypeChange(e.target.value)}
                  required
                >
                  {serviceTypes.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duración (minutos)</label>
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                >
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1 hora 30 min</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notas adicionales</label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Información adicional sobre la cita (opcional)"
                  rows={3}
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleClose} className="btn-cancel">
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-save"
                  disabled={timeSlots.length === 0}
                >
                  Agendar Cita
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CalendarComponent() {
  const [events, setEvents] = useState(initialEvents)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)

  // Función para manejar clics en días con validación de fecha
  const handleDateClick = useCallback((dateInfo: any) => {
    const clickedDate = new Date(dateInfo.date)
    const dayOfWeek = clickedDate.getDay()
    
    // Verificar que no sea fin de semana
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert('⚠️ Las citas solo se pueden agendar de lunes a viernes')
      return
    }
    
    // Verificar que no sea una fecha pasada
    if (!isValidDate(clickedDate)) {
      alert('⚠️ No se pueden agendar citas en fechas pasadas')
      return
    }
    
    // Establecer el día seleccionado
    const start = new Date(clickedDate)
    const end = new Date(clickedDate)
    
    setSelectedSlot({ start, end })
    setModalOpen(true)
  }, [])

  const handleEventClick = useCallback((clickInfo: any) => {
    const event = clickInfo.event
    const details = `
📋 Servicio: ${serviceTypes.find(s => s.value === event.extendedProps.serviceType)?.label}
👤 Cliente: ${event.extendedProps.clientName}
📧 Email: ${event.extendedProps.email}
📞 Teléfono: ${event.extendedProps.phone || 'No proporcionado'}
📝 Notas: ${event.extendedProps.notes || 'Sin notas'}
    `.trim()

    const action = window.confirm(`${details}\n\n¿Deseas eliminar esta cita?`)
    if (action) {
      setEvents(events.filter(e => e.id !== event.id))
    }
  }, [events])

  const handleSaveAppointment = (newAppointment: any) => {
    setEvents([...events, newAppointment])
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>📅 Sistema de Citas</h1>
        <p>Gestiona tus citas de forma fácil y eficiente</p>
        <div className="schedule-info">
          <strong>🕒 Horarios disponibles:</strong> Lunes a Viernes de 10:00 a 14:00 y de 16:00 a 20:00
        </div>
        <div className="instruction-info">
          <em>💡 Haz clic en cualquier día del mes para agendar una cita</em>
        </div>
      </div>
      
      <div className="calendar-legend">
        <h3>Tipos de Servicios</h3>
        <div className="legend-grid">
          {serviceTypes.map((service) => (
            <div key={service.value} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: service.color }}
              ></span>
              <span>{service.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listWeek'
          }}
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            list: 'Lista'
          }}
          locale={esLocale}
          initialView='dayGridMonth'
          editable={false}
          selectable={false}
          dayMaxEvents={3}
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          eventDisplay="block"
          dayHeaderFormat={{ weekday: 'long' }}
          moreLinkText="más citas"
          dayCellClassNames={(dateInfo) => {
            const dayOfWeek = dateInfo.date.getDay()
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              return ['fc-weekend-disabled']
            }
            return []
          }}
        />
      </div>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAppointment}
        selectedSlot={selectedSlot}
      />
    </div>
  )
}