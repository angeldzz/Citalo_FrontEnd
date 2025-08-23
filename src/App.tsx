import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login.tsx'
import Register from './pages/register.tsx'
import Citalo from './pages/Citalo.tsx'
import Nosotros from './pages/Nosotros.tsx'
import Contacto from './pages/Contacto.tsx'
import CalendarComponent from './components/Calendar.tsx'
import Layout from './components/Layout.tsx'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout><Citalo /></Layout>} />
        <Route path="/BetaCalendario" element={<Layout><CalendarComponent /></Layout>} />
        <Route path="/nosotros" element={<Layout><Nosotros /></Layout>} />
        <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
