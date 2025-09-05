import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Calendar as CalendarComponent } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Phone,
  CalendarX,
  Edit
} from 'lucide-react';
import { format } from 'date-fns';

const PatientAppointments = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    doctor: '',
    specialty: '',
    date: null,
    time: '',
    reason: ''
  });

  // Mock data
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      location: 'Cardiology Wing, Room 302',
      phone: '+1 (555) 123-4567',
      reason: 'Follow-up consultation'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2024-01-18',
      time: '2:30 PM',
      status: 'pending',
      location: 'General Medicine, Room 105',
      phone: '+1 (555) 987-6543',
      reason: 'Annual check-up'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      date: '2024-01-22',
      time: '11:15 AM',
      status: 'confirmed',
      location: 'Dermatology Clinic, Room 201',
      phone: '+1 (555) 456-7890',
      reason: 'Skin examination'
    }
  ];

  const doctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { name: 'Dr. Michael Chen', specialty: 'General Medicine' },
    { name: 'Dr. Emily Davis', specialty: 'Dermatology' },
    { name: 'Dr. James Wilson', specialty: 'Orthopedics' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
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

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle appointment booking logic here
    console.log('Booking data:', bookingData);
    setShowBookingForm(false);
    setBookingData({
      doctor: '',
      specialty: '',
      date: null,
      time: '',
      reason: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Manage your medical appointments</p>
        </div>
        <Button 
          onClick={() => setShowBookingForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search appointments..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Appointment Booking Form */}
      {showBookingForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Book New Appointment</CardTitle>
            <CardDescription>
              Fill in the details to schedule your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor">Select Doctor</Label>
                  <Select onValueChange={(value) => setBookingData({...bookingData, doctor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor, index) => (
                        <SelectItem key={index} value={doctor.name}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Select Time</Label>
                  <Select onValueChange={(value) => setBookingData({...bookingData, time: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time, index) => (
                        <SelectItem key={index} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input
                  id="reason"
                  placeholder="Brief description of your concern"
                  value={bookingData.reason}
                  onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.doctor}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{appointment.phone}</span>
                      </div>
                      <div>
                        <span className="font-medium">Specialty:</span> {appointment.specialty}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <CalendarX className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
          <p className="text-gray-600 mb-4">Book your first appointment to get started.</p>
          <Button 
            onClick={() => setShowBookingForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;