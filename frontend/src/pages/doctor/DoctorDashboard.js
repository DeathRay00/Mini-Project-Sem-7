import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import DoctorDashboardHome from './DoctorDashboardHome';
import DoctorPatients from './DoctorPatients';
import DoctorAppointments from './DoctorAppointments';
import PatientProfile from './PatientProfile';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('Dashboard');

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/doctor',
      icon: 'LayoutDashboard'
    },
    {
      name: 'Patients',
      path: '/doctor/patients',
      icon: 'Users'
    },
    {
      name: 'Appointments',
      path: '/doctor/appointments',
      icon: 'Calendar'
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        navigationItems={navigationItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userRole="Doctor"
      />
      <div className="main-content">
        <Header user={user} />
        <div className="main-body">
          <Routes>
            <Route index element={<DoctorDashboardHome />} />
            <Route path="patients" element={<DoctorPatients />} />
            <Route path="patients/:patientId" element={<PatientProfile />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="*" element={<Navigate to="/doctor" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;