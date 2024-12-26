'use client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import PriceComparison from './pages/PriceComparison'
import FacilityViewer from './pages/FacilityViewer'
import TravelExpense from './pages/TravelExpense'
import Support from './pages/Support'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<PriceComparison />} />
          <Route path="/facilities" element={<FacilityViewer />} />
          <Route path="/travel" element={<TravelExpense />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
