import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login.tsx'
import Register from './pages/register.tsx'
import AppRoutes from './components/Routes.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx' 

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <AppRoutes />
            <Footer />
          </>
        }
      />
      <Route path="/register" element={ <Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
