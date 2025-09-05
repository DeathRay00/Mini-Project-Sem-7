import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.role === 'Patient' ? '/patient' : '/doctor'} replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={user ? <Navigate to={user.role === 'Patient' ? '/patient' : '/doctor'} replace /> : <Signup />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/patient/*" 
        element={
          <ProtectedRoute requiredRole="Patient">
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctor/*" 
        element={
          <ProtectedRoute requiredRole="Doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Default Route */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={user.role === 'Patient' ? '/patient' : '/doctor'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;