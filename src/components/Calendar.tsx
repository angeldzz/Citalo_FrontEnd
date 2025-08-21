import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import { useState, useCallback } from 'react'

// Configurar moment en español
moment.locale('es')
const localizer = momentLocalizer(moment)

// Datos de ejemplo para las citas
const initialEvents = [
  {
    id: 1,
    title: 'Cita con Dr. García',
    start: new Date(2025, 7, 8, 10, 0), // 8 de agosto, 10:00 AM
    end: new Date(2025, 7, 8, 11, 0),
    resource: 'medicina-general'
  },
  {
    id: 2,
    title: 'Consulta Cardiología',
    start: new Date(2025, 7, 10, 14, 30), // 10 de agosto, 2:30 PM
    end: new Date(2025, 7, 10, 15, 30),
    resource: 'cardiologia'
  },
  {
    id: 3,
    title: 'Revisión Dental',
    start: new Date(2025, 7, 12, 9, 0), // 12 de agosto, 9:00 AM
    end: new Date(2025, 7, 12, 10, 0),
    resource: 'odontologia'
  },
  {
    id: 4,
    title: 'Cita Dermatología',
    start: new Date(2025, 7, 15, 16, 0), // 15 de agosto, 4:00 PM
    end: new Date(2025, 7, 15, 17, 0),
    resource: 'dermatologia'
  }
]

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Cita',
  noEventsInRange: 'No hay citas en este rango de fechas.',
  showMore: (total: number) => `+ Ver más (${total})`
}

// Función para validar horarios permitidos
const isValidTimeSlot = (start: Date, end: Date): boolean => {
  const startMoment = moment(start)
  const endMoment = moment(end)
  
  // Verificar que sea de lunes a viernes (1-5)
  const dayOfWeek = startMoment.day()
  if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 = domingo, 6 = sábado
    return false                            
  }
  
  const startHour = startMoment.hour()
  const startMinute = startMoment.minute()
  const endHour = endMoment.hour()
  const endMinute = endMoment.minute()
  
  // Convertir a minutos para facilitar la comparación
  const startTimeMinutes = startHour * 60 + startMinute
  const endTimeMinutes = endHour * 60 + endMinute
  
  // Horarios permitidos: 10:00-14:00 (600-840 min) y 16:00-20:00 (960-1200 min)
  const morningStart = 10 * 60 // 10:00 = 600 min
  const morningEnd = 14 * 60   // 14:00 = 840 min
  const afternoonStart = 16 * 60 // 16:00 = 960 min
  const afternoonEnd = 20 * 60   // 20:00 = 1200 min
  
  // La cita debe estar completamente dentro de uno de los horarios permitidos
  const inMorningSlot = startTimeMinutes >= morningStart && endTimeMinutes <= morningEnd
  const inAfternoonSlot = startTimeMinutes >= afternoonStart && endTimeMinutes <= afternoonEnd
  
  return inMorningSlot || inAfternoonSlot
}

// Componente Modal para agendar citas
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
    title: '',
    patientName: '',
    phone: '',
    specialty: 'medicina-general',
    notes: ''
  })

  const specialties = [
    { value: 'medicina-general', label: 'Medicina General' },
    { value: 'cardiologia', label: 'Cardiología' },
    { value: 'odontologia', label: 'Odontología' },
    { value: 'dermatologia', label: 'Dermatología' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) return

    const newAppointment = {
      id: Date.now(),
      title: `${formData.title} - ${formData.patientName}`,
      start: selectedSlot.start,
      end: selectedSlot.end,
      resource: formData.specialty,
      patientName: formData.patientName,
      phone: formData.phone,
      notes: formData.notes
    }

    onSave(newAppointment)
    setFormData({
      title: '',
      patientName: '',
      phone: '',
      specialty: 'medicina-general',
      notes: ''
    })
    onClose()
  }

  const handleClose = () => {
    setFormData({
      title: '',
      patientName: '',
      phone: '',
      specialty: 'medicina-general',
      notes: ''
    })
    onClose()
  }

  if (!isOpen || !selectedSlot) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Agendar Nueva Cita</h3>
          <button className="modal-close" onClick={handleClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="appointment-time">
            <strong>Fecha y hora:</strong> {moment(selectedSlot.start).format('dddd, D [de] MMMM [de] YYYY [a las] HH:mm')}
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Tipo de consulta *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Consulta general, Revisión, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientName">Nombre del paciente *</label>
              <input
                type="text"
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Nombre completo"
                required
              />
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
              <label htmlFor="specialty">Especialidad *</label>
              <select
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              >
                {specialties.map((spec) => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notas adicionales</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Información adicional sobre la cita"
                rows={3}
              />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={handleClose} className="btn-cancel">
                Cancelar
              </button>
              <button type="submit" className="btn-save">
                Agendar Cita
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CalendarComponent() {
  const [events, setEvents] = useState(initialEvents)
  const [view, setView] = useState<'month' | 'week' | 'work_week' | 'day' | 'agenda'>('month')
  const [date, setDate] = useState(new Date())
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // Validar que el horario esté permitido
      if (!isValidTimeSlot(start, end)) {
        alert('Las citas solo se pueden agendar de lunes a viernes:\n• De 10:00 a 14:00\n• De 16:00 a 20:00')
        return
      }
      
      setSelectedSlot({ start, end })
      setModalOpen(true)
    },
    []
  )

  const handleSaveAppointment = (newAppointment: any) => {
    setEvents([...events, newAppointment])
  }

  const handleSelectEvent = useCallback((event: any) => {
    const action = window.confirm(`¿Deseas eliminar la cita: "${event.title}"?`)
    if (action) {
      setEvents(events.filter(e => e.id !== event.id))
    }
  }, [events])

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#2563eb'
    
    switch (event.resource) {
      case 'medicina-general':
        backgroundColor = '#059669'
        break
      case 'cardiologia':
        backgroundColor = '#dc2626'
        break
      case 'odontologia':
        backgroundColor = '#3b82f6'
        break
      case 'dermatologia':
        backgroundColor = '#7c3aed'
        break
      default:
        backgroundColor = '#2563eb'
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        padding: '4px 8px'
      }
    }
  }

  // Función para deshabilitar días y horarios no permitidos
  const slotPropGetter = useCallback((date: Date) => {
    const dayOfWeek = moment(date).day()
    const hour = moment(date).hour()
    
    // Deshabilitar fines de semana
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        style: {
          backgroundColor: '#f3f4f6',
          color: '#9ca3af',
          cursor: 'not-allowed'
        }
      }
    }
    
    // Deshabilitar horarios no permitidos (fuera de 10-14 y 16-20)
    if (hour < 10 || (hour >= 14 && hour < 16) || hour >= 20) {
      return {
        style: {
          backgroundColor: '#f9fafb',
          color: '#d1d5db',
          cursor: 'not-allowed'
        }
      }
    }
    
    return {}
  }, [])

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Calendario de Citas</h2>
        <p>Haz clic en un horario vacío para crear una nueva cita o en una cita existente para eliminarla</p>
        <div className="schedule-info">
          <strong>Horarios disponibles:</strong> Lunes a Viernes de 10:00 a 14:00 y de 16:00 a 20:00
        </div>
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color medicina-general"></span>
          <span>Medicina General</span>
        </div>
        <div className="legend-item">
          <span className="legend-color cardiologia"></span>
          <span>Cardiología</span>
        </div>
        <div className="legend-item">
          <span className="legend-color odontologia"></span>
          <span>Odontología</span>
        </div>
        <div className="legend-item">
          <span className="legend-color dermatologia"></span>
          <span>Dermatología</span>
        </div>
      </div>

      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          views={['month', 'week', 'day', 'agenda']}
          view={view}
          onView={(newView) => setView(newView)}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          messages={messages}
          eventPropGetter={eventStyleGetter}
          slotPropGetter={slotPropGetter}
          min={new Date(2025, 7, 7, 8, 0)} // Hora mínima mostrada: 8:00 AM
          max={new Date(2025, 7, 7, 22, 0)} // Hora máxima mostrada: 10:00 PM
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: moment(date).isSame(moment(), 'day') 
                ? 'rgba(37, 99, 235, 0.1)' 
                : 'transparent'
            }
          })}
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