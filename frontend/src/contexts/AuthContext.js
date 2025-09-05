import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for testing
  const mockUsers = {
    patient: {
      id: 1,
      email: 'patient@example.com',
      name: 'John Doe',
      role: 'patient',
      phone: '+1234567890',
      dateOfBirth: '1990-01-01',
      address: '123 Main St, City, State',
      emergencyContact: 'Jane Doe - +1234567891'
    },
    doctor: {
      id: 2,
      email: 'doctor@example.com',
      name: 'Dr. Smith',
      role: 'doctor',
      phone: '+1234567892',
      specialization: 'Cardiology',
      licenseNumber: 'DOC123456',
      experience: '10 years'
    }
  };

  useEffect(() => {
    // Check for existing session on app load
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType = 'patient') => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Determine user type based on email or explicit parameter
    let selectedUser;
    if (email.includes('doctor') || userType === 'doctor') {
      selectedUser = mockUsers.doctor;
    } else {
      selectedUser = mockUsers.patient;
    }
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(selectedUser));
    
    setUser(selectedUser);
    return { success: true };
  };

  const signup = async (userData) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new user based on role
    const newUser = {
      id: Date.now(), // Simple ID generation
      email: userData.email,
      name: userData.name,
      role: userData.role || 'patient',
      phone: userData.phone || '',
      ...(userData.role === 'doctor' ? {
        specialization: userData.specialization || 'General Medicine',
        licenseNumber: userData.licenseNumber || 'DOC' + Date.now(),
        experience: userData.experience || '5 years'
      } : {
        dateOfBirth: userData.dateOfBirth || '',
        address: userData.address || '',
        emergencyContact: userData.emergencyContact || ''
      })
    };
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};