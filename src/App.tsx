import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages'
import { ProcedureDetail } from '@/pages/Procedures/[id]'
import { MainLayout } from '@/components/layout/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/procedures/:id" element={<ProcedureDetail />} />
          {/* Add more routes as they are developed */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
