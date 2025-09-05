import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle,
  User,
  Phone,
  MapPin,
  FileText,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboardHome = () => {
  // Mock data - in real app, this would come from API
  const todayStats = [
    {
      title: "Today's Patients",
      value: '12',
      icon: Users,
      color: 'icon-blue'
    },
    {
      title: 'Appointments',
      value: '15',
      icon: Calendar,
      color: 'icon-green'
    },
    {
      title: 'Pending Reviews',
      value: '4',
      icon: FileText,
      color: 'icon-orange'
    },
    {
      title: 'Critical Alerts',
      value: '2',
      icon: AlertTriangle,
      color: 'icon-purple'
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      age: 45,
      time: '9:00 AM',
      type: 'Follow-up',
      condition: 'Hypertension',
      status: 'confirmed',
      lastVisit: '2024-01-01'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      age: 32,
      time: '9:30 AM',
      type: 'Check-up',
      condition: 'Diabetes',
      status: 'confirmed',
      lastVisit: '2023-12-15'
    },
    {
      id: 3,
      patient: 'Michael Chen',
      age: 58,
      time: '10:00 AM',
      type: 'Consultation',
      condition: 'Chest Pain',
      status: 'pending',
      lastVisit: 'New Patient'
    },
    {
      id: 4,
      patient: 'Emily Davis',
      age: 28,
      time: '10:30 AM',
      type: 'Follow-up',
      condition: 'Migraine',
      status: 'confirmed',
      lastVisit: '2024-01-08'
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      patient: 'Robert Wilson',
      alert: 'Blood pressure reading: 180/120 mmHg',
      time: '2 hours ago',
      severity: 'high',
      type: 'vital_signs'
    },
    {
      id: 2,
      patient: 'Lisa Brown',
      alert: 'Blood sugar level: 300 mg/dL',
      time: '4 hours ago',
      severity: 'high',
      type: 'lab_result'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Dashboard</h2>
        <p className="text-gray-600">
          Overview of today's schedule and patient alerts
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {todayStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="stat-header">
                <div>
                  <p className="stat-title">{stat.title}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
                <div className={`stat-icon ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Patient Queue */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Today's Patient Queue
            </CardTitle>
            <CardDescription>
              Scheduled appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full font-semibold">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                        <span className="text-sm text-gray-500">({appointment.age} years)</span>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.time}
                        </span>
                        <span>{appointment.type}</span>
                        <span className="font-medium">{appointment.condition}</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-1">
                        Last visit: {appointment.lastVisit}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/doctor/patients/${appointment.id}`}>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-1" />
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Link to="/doctor/appointments">
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    View All Appointments
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Critical Alerts
            </CardTitle>
            <CardDescription>
              Patients requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{alert.patient}</h4>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{alert.alert}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="h-3 w-3 mr-1" />
                      Call Patient
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}

              {criticalAlerts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No critical alerts</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used features for easy access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/doctor/patients">
              <Button variant="outline" className="h-20 flex-col w-full">
                <Users className="h-6 w-6 mb-2 text-blue-600" />
                <span className="text-sm">View Patients</span>
              </Button>
            </Link>
            <Link to="/doctor/appointments">
              <Button variant="outline" className="h-20 flex-col w-full">
                <Calendar className="h-6 w-6 mb-2 text-green-600" />
                <span className="text-sm">Manage Schedule</span>
              </Button>
            </Link>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2 text-purple-600" />
              <span className="text-sm">Write Prescription</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2 text-orange-600" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboardHome;