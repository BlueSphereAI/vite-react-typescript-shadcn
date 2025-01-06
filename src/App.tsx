'use client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import PriceComparison from '@/pages/PriceComparison'
import FacilityViewer from '@/pages/FacilityViewer'
import TravelEstimation from '@/pages/TravelEstimation'
import BookingManagement from '@/pages/BookingManagement'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<PriceComparison />} />
          <Route path="/facilities" element={<FacilityViewer />} />
          <Route path="/travel" element={<TravelEstimation />} />
          <Route path="/bookings" element={<BookingManagement />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
