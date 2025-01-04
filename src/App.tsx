import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { ContractSubmission } from './pages/Dashboard/ContractSubmission/ContractSubmission'

// Placeholder components for dashboard routes
const ImmutableRecords = () => <div>Immutable Records Page</div>
const NegotiationLog = () => <div>Negotiation Log Page</div>
const ApprovalWorkflow = () => <div>Approval Workflow Page</div>
const AuditTrail = () => <div>Audit Trail Page</div>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="submit" replace />} />
          <Route path="submit" element={<ContractSubmission />} />
          <Route path="records" element={<ImmutableRecords />} />
          <Route path="negotiations" element={<NegotiationLog />} />
          <Route path="approvals" element={<ApprovalWorkflow />} />
          <Route path="audit" element={<AuditTrail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
