import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PatientDashboardHome from './PatientDashboardHome';
import PatientAppointments from './PatientAppointments';
import PatientReports from './PatientReports';
import PatientPrescriptions from './PatientPrescriptions';
import PatientHealthTimeline from './PatientHealthTimeline';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('Dashboard');

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/patient',
      icon: 'LayoutDashboard'
    },
    {
      name: 'Appointments',
      path: '/patient/appointments',
      icon: 'Calendar'
    },
    {
      name: 'Medical Reports',
      path: '/patient/reports',
      icon: 'FileText'
    },
    {
      name: 'Prescriptions',
      path: '/patient/prescriptions',
      icon: 'Pill'
    },
    {
      name: 'Health Timeline',
      path: '/patient/timeline',
      icon: 'Activity'
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        navigationItems={navigationItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userRole="Patient"
      />
      <div className="main-content">
        <Header user={user} />
        <div className="main-body">
          <Routes>
            <Route index element={<PatientDashboardHome />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="reports" element={<PatientReports />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="timeline" element={<PatientHealthTimeline />} />
            <Route path="*" element={<Navigate to="/patient" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;