import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  User,
  Phone,
  CheckCircle,
  XCircle,
  Edit,
  Plus
} from 'lucide-react';

const DoctorAppointments = () => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const appointments = [
    {
      id: 1,
      patient: 'John Smith',
      age: 45,
      time: '9:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      condition: 'Hypertension',
      status: 'confirmed',
      phone: '+1 (555) 123-4567',
      notes: 'BP monitoring follow-up',
      lastVisit: '2024-01-01',
      isNew: false
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      age: 32,
      time: '9:30 AM',
      duration: '45 min',
      type: 'Check-up',
      condition: 'Diabetes',
      status: 'confirmed',
      phone: '+1 (555) 987-6543',
      notes: 'Routine diabetes check-up',
      lastVisit: '2023-12-15',
      isNew: false
    },
    {
      id: 3,
      patient: 'Michael Chen',
      age: 58,
      time: '10:00 AM',
      duration: '60 min',
      type: 'Consultation',
      condition: 'Chest Pain',
      status: 'pending',
      phone: '+1 (555) 456-7890',
      notes: 'New patient - chest pain investigation',
      lastVisit: null,
      isNew: true
    },
    {
      id: 4,
      patient: 'Emily Davis',
      age: 28,
      time: '10:30 AM',
      duration: '30 min',
      type: 'Follow-up',
      condition: 'Migraine',
      status: 'confirmed',
      phone: '+1 (555) 321-0987',
      notes: 'Migraine treatment follow-up',
      lastVisit: '2024-01-08',
      isNew: false
    },
    {
      id: 5,
      patient: 'Robert Wilson',
      age: 62,
      time: '11:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      condition: 'Arthritis',
      status: 'cancelled',
      phone: '+1 (555) 654-3210',
      notes: 'Patient cancelled - reschedule needed',
      lastVisit: '2024-01-05',
      isNew: false
    },
    {
      id: 6,
      patient: 'Lisa Brown',
      age: 41,
      time: '2:00 PM',
      duration: '45 min',
      type: 'Consultation',
      condition: 'Annual Physical',
      status: 'confirmed',
      phone: '+1 (555) 789-0123',
      notes: 'Annual health check-up',
      lastVisit: '2023-01-20',
      isNew: false
    },
    {
      id: 7,
      patient: 'David Miller',
      age: 35,
      time: '2:45 PM',
      duration: '30 min',
      type: 'Follow-up',
      condition: 'Back Pain',
      status: 'rescheduled',
      phone: '+1 (555) 456-1234',
      notes: 'Rescheduled from yesterday',
      lastVisit: '2024-01-10',
      isNew: false
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
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rescheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Follow-up':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Check-up':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Consultation':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Emergency':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && appointment.status === filterStatus;
  });

  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  const handleStatusChange = (appointmentId, newStatus) => {
    // Handle status change logic here
    console.log(`Changing appointment ${appointmentId} to ${newStatus}`);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Manage your appointment schedule</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search appointments by patient or condition..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-semibold">
                    {getInitials(appointment.patient)}
                  </div>
                  
                  {/* Appointment Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.patient}</h3>
                      <span className="text-sm text-gray-500">({appointment.age} years)</span>
                      {appointment.isNew && (
                        <Badge className="bg-blue-100 text-blue-800">New Patient</Badge>
                      )}
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time} • {appointment.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{appointment.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{appointment.condition}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(appointment.type)}`}>
                          {appointment.type}
                        </div>
                        {appointment.lastVisit && (
                          <div className="text-gray-500">
                            Last visit: {appointment.lastVisit}
                          </div>
                        )}
                        {appointment.isNew && (
                          <div className="text-blue-600 font-medium">
                            First-time patient
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-gray-50 border-l-4 border-gray-300 p-3 mt-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  {appointment.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Visit
                      </Button>
                    </>
                  )}

                  {appointment.status === 'cancelled' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
                  )}

                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms.' : 'No appointments match the selected filter.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;