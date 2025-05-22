import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import AppRoutes from './router/AppRoutes'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from '@/context/AuthContex.jsx'

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App