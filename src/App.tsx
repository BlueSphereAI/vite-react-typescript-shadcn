'use client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import PriceComparison from '@/pages/PriceComparison'
import FacilityList from '@/pages/FacilityList'
import FacilityViewer from '@/pages/FacilityViewer'
import TravelEstimation from '@/pages/TravelEstimation'
import BookingManagement from '@/pages/BookingManagement'
import UserDashboard from '@/pages/UserDashboard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<PriceComparison />} />
          <Route path="/facilities" element={<FacilityList />} />
          <Route path="/facilities/:id" element={<FacilityViewer />} />
          <Route path="/travel" element={<TravelEstimation />} />
          <Route path="/bookings" element={<BookingManagement />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
