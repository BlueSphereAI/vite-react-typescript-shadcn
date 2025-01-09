import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Home } from '@/pages'
import { ProcedureDetail } from '@/pages/Procedures/[id]'
import { Search } from '@/pages/Procedures/Search'
import { TravelExpense } from '@/pages/TravelExpense/TravelExpense'
import { Booking } from '@/pages/Booking/Booking'
import { Dashboard } from '@/pages/Dashboard/Dashboard'
import { Contact } from '@/pages/Contact/Contact'
import { MainLayout } from '@/components/layout/MainLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ManageProcedures } from '@/pages/Admin/ManageProcedures'
import { ManageFacilities } from '@/pages/Admin/ManageFacilities'
import { ManagePriceComparisons } from '@/pages/Admin/ManagePriceComparisons'
import { preloadImages } from '@/lib/utils'

const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
)

const AdminLayoutWrapper = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
)

function App() {
  useEffect(() => {
    // Preload images on app mount
    preloadImages()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/procedures" element={<Search />} />
          <Route path="/procedures/:id" element={<ProcedureDetail />} />
          <Route path="/travel-expense" element={<TravelExpense />} />
          <Route path="/procedures/:id/book" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayoutWrapper />}>
          <Route path="procedures" element={<ManageProcedures />} />
          <Route path="facilities" element={<ManageFacilities />} />
          <Route path="price-comparisons" element={<ManagePriceComparisons />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
