import { Routes, Route } from 'react-router-dom'
import Citalo from '../pages/Citalo.tsx'
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Citalo />} />
    </Routes>
  )
}

