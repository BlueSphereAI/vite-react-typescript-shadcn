import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages'
import { ProcedureDetail } from '@/pages/Procedures/[id]'
import { Search } from '@/pages/Procedures/Search'
import { TravelExpense } from '@/pages/TravelExpense/TravelExpense'
import { Booking } from '@/pages/Booking/Booking'
import { Dashboard } from '@/pages/Dashboard/Dashboard'
import { MainLayout } from '@/components/layout/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/procedures/search" element={<Search />} />
          <Route path="/procedures/:id" element={<ProcedureDetail />} />
          <Route path="/travel-expense" element={<TravelExpense />} />
          <Route path="/procedures/:id/book" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as they are developed */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
