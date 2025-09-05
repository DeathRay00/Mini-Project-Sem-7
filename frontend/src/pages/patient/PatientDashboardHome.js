import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Clock,
  AlertCircle,
  TrendingUp,
  Heart
} from 'lucide-react';

const PatientDashboardHome = () => {
  // Mock data - in real app, this would come from API
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Follow-up'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2024-01-18',
      time: '2:30 PM',
      type: 'Check-up'
    }
  ];

  const healthInsights = [
    {
      title: 'Blood Pressure Trend',
      message: 'Your blood pressure has been stable over the last month.',
      type: 'positive'
    },
    {
      title: 'Medication Reminder',
      message: 'Remember to take your evening medication at 8 PM.',
      type: 'reminder'
    },
    {
      title: 'Lab Results',
      message: 'New lab results are available for review.',
      type: 'info'
    }
  ];

  const quickStats = [
    {
      title: 'Upcoming Appointments',
      value: '2',
      icon: Calendar,
      color: 'icon-blue'
    },
    {
      title: 'Active Prescriptions',
      value: '4',
      icon: Pill,
      color: 'icon-green'
    },
    {
      title: 'Recent Reports',
      value: '3',
      icon: FileText,
      color: 'icon-orange'
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: Heart,
      color: 'icon-purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">
          Here's a summary of your health information and upcoming activities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        {quickStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>
              Your next scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {appointment.type}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Appointments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Health Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              AI Health Insights
            </CardTitle>
            <CardDescription>
              Personalized health recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthInsights.map((insight, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'positive' 
                      ? 'bg-green-50 border-green-400' 
                      : insight.type === 'reminder'
                      ? 'bg-yellow-50 border-yellow-400'
                      : 'bg-blue-50 border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${
                      insight.type === 'positive' 
                        ? 'text-green-600' 
                        : insight.type === 'reminder'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`}>
                      {insight.type === 'positive' && <TrendingUp size={16} />}
                      {insight.type === 'reminder' && <AlertCircle size={16} />}
                      {insight.type === 'info' && <FileText size={16} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                    </div>
                  </div>
                </div>
              ))}
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
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2 text-blue-600" />
              <span className="text-sm">Book Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2 text-green-600" />
              <span className="text-sm">Upload Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Pill className="h-6 w-6 mb-2 text-purple-600" />
              <span className="text-sm">View Prescriptions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2 text-orange-600" />
              <span className="text-sm">Health Timeline</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboardHome;