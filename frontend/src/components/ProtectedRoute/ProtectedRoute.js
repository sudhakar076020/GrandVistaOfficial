import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') // Or use Auth Context

  return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute
