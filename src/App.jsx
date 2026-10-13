import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ClassPage from './pages/ClassPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clases/:classSlug" element={<ClassPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
