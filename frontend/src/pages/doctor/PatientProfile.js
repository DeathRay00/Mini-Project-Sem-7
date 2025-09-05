import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Pill, 
  Activity,
  Heart,
  Weight,
  Thermometer,
  Save,
  Plus,
  Eye,
  Download
} from 'lucide-react';

const PatientProfile = () => {
  const { patientId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });
  const [vitalsForm, setVitalsForm] = useState({
    weight: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    notes: ''
  });

  // Mock patient data - in real app, this would come from API based on patientId
  const patient = {
    id: patientId,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Smith - +1 (555) 987-6543',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-20',
    totalVisits: 12,
    joinDate: '2022-03-15'
  };

  // Mock medical history
  const medicalHistory = [
    {
      date: '2024-01-15',
      type: 'Visit',
      title: 'Routine Follow-up',
      doctor: 'Dr. Sarah Johnson',
      notes: 'Blood pressure stable. Continue current medication.'
    },
    {
      date: '2024-01-10',
      type: 'Lab',
      title: 'Blood Test Results',
      doctor: 'Dr. Sarah Johnson',
      notes: 'HbA1c: 7.2%, Cholesterol: 180 mg/dL'
    },
    {
      date: '2023-12-20',
      type: 'Prescription',
      title: 'Medication Update',
      doctor: 'Dr. Sarah Johnson',
      notes: 'Increased Lisinopril to 10mg daily'
    }
  ];

  // Mock reports
  const reports = [
    {
      id: 1,
      title: 'Blood Test Results',
      date: '2024-01-10',
      type: 'Lab Report',
      status: 'Normal'
    },
    {
      id: 2,
      title: 'ECG Report',
      date: '2023-12-28',
      type: 'Cardiac',
      status: 'Abnormal'
    }
  ];

  // Mock current prescriptions
  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2023-12-20',
      status: 'Active'
    },
    {
      id: 2,
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2023-10-15',
      status: 'Active'
    }
  ];

  // Mock vitals history
  const vitalsHistory = [
    {
      date: '2024-01-15',
      weight: '82 kg',
      bloodPressure: '135/85',
      heartRate: '72 bpm',
      temperature: '36.5°C'
    },
    {
      date: '2023-12-20',
      weight: '83 kg',
      bloodPressure: '140/90',
      heartRate: '75 bpm',
      temperature: '36.7°C'
    }
  ];

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    console.log('New prescription:', prescriptionForm);
    // Reset form
    setPrescriptionForm({
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
  };

  const handleVitalsSubmit = (e) => {
    e.preventDefault();
    console.log('New vitals:', vitalsForm);
    // Reset form
    setVitalsForm({
      weight: '',
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      notes: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Abnormal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full font-bold text-xl">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-600">{patient.age} years old • {patient.gender} • Patient ID: {patient.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Patient
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Patient Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Last Visit</p>
                <p className="font-semibold">{patient.lastVisit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="font-semibold">{patient.totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Pill className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Prescriptions</p>
                <p className="font-semibold">{prescriptions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Reports</p>
                <p className="font-semibold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Contact Information</Label>
                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div>
                        <span className="font-medium">Address:</span> {patient.address}
                      </div>
                      <div>
                        <span className="font-medium">Emergency Contact:</span> {patient.emergencyContact}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Medical Information</Label>
                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Blood Type:</span> {patient.bloodType}
                      </div>
                      <div>
                        <span className="font-medium">Allergies:</span> {patient.allergies.join(', ')}
                      </div>
                      <div>
                        <span className="font-medium">Chronic Conditions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patient.chronicConditions.map((condition, index) => (
                            <Badge key={index} variant="outline">{condition}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Patient Since:</span> {patient.joinDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Vitals */}
            <Card>
              <CardHeader>
                <CardTitle>Record New Vitals</CardTitle>
                <CardDescription>Add current vital measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVitalsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="75.5"
                        value={vitalsForm.weight}
                        onChange={(e) => setVitalsForm({...vitalsForm, weight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">Blood Pressure</Label>
                      <Input
                        id="bloodPressure"
                        placeholder="120/80"
                        value={vitalsForm.bloodPressure}
                        onChange={(e) => setVitalsForm({...vitalsForm, bloodPressure: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                      <Input
                        id="heartRate"
                        type="number"
                        placeholder="72"
                        value={vitalsForm.heartRate}
                        onChange={(e) => setVitalsForm({...vitalsForm, heartRate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="36.5"
                        value={vitalsForm.temperature}
                        onChange={(e) => setVitalsForm({...vitalsForm, temperature: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional observations..."
                      value={vitalsForm.notes}
                      onChange={(e) => setVitalsForm({...vitalsForm, notes: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Vitals
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Vitals History */}
            <Card>
              <CardHeader>
                <CardTitle>Vitals History</CardTitle>
                <CardDescription>Recent vital measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vitalsHistory.map((vital, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{vital.date}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Weight className="h-4 w-4 text-blue-600" />
                          <span>{vital.weight}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-600" />
                          <span>{vital.bloodPressure}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-600" />
                          <span>{vital.heartRate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-orange-600" />
                          <span>{vital.temperature}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Reports</CardTitle>
              <CardDescription>Patient's medical reports and test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Prescription */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Prescription</CardTitle>
                <CardDescription>Prescribe medication for the patient</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medication">Medication Name</Label>
                    <Input
                      id="medication"
                      placeholder="e.g., Lisinopril"
                      value={prescriptionForm.medication}
                      onChange={(e) => setPrescriptionForm({...prescriptionForm, medication: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input
                        id="dosage"
                        placeholder="e.g., 10mg"
                        value={prescriptionForm.dosage}
                        onChange={(e) => setPrescriptionForm({...prescriptionForm, dosage: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select onValueChange={(value) => setPrescriptionForm({...prescriptionForm, frequency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once_daily">Once daily</SelectItem>
                          <SelectItem value="twice_daily">Twice daily</SelectItem>
                          <SelectItem value="three_times_daily">Three times daily</SelectItem>
                          <SelectItem value="four_times_daily">Four times daily</SelectItem>
                          <SelectItem value="as_needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 30 days"
                      value={prescriptionForm.duration}
                      onChange={(e) => setPrescriptionForm({...prescriptionForm, duration: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Special instructions for taking the medication..."
                      value={prescriptionForm.instructions}
                      onChange={(e) => setPrescriptionForm({...prescriptionForm, instructions: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Prescription
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Current Prescriptions */}
            <Card>
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
                <CardDescription>Active medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{prescription.medication}</h4>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                        <p><span className="font-medium">Frequency:</span> {prescription.frequency}</p>
                        <p><span className="font-medium">Started:</span> {prescription.startDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Chronological history of medical events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.map((event, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        {event.type === 'Visit' && <User size={16} />}
                        {event.type === 'Lab' && <FileText size={16} />}
                        {event.type === 'Prescription' && <Pill size={16} />}
                      </div>
                      {index !== medicalHistory.length - 1 && (
                        <div className="w-px h-8 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">by {event.doctor}</p>
                      <p className="text-sm text-gray-700">{event.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;