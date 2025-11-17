import React from 'react'
import CompaniesPage from './pages/CompaniesPage'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-blue-50 to-slate-100">
      <CompaniesPage />
    </div>
  )
}

export default App