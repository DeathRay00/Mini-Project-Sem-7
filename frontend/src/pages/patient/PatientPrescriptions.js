import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { 
  Pill, 
  Clock, 
  Calendar, 
  User, 
  RefreshCw,
  Bell,
  BellOff,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const PatientPrescriptions = () => {
  const [reminders, setReminders] = useState({});

  // Mock data
  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      doctor: 'Dr. Sarah Johnson',
      dateIssued: '2024-01-10',
      instructions: 'Take with food. Avoid alcohol.',
      status: 'active',
      remainingDays: 22,
      refillsRemaining: 2,
      nextDose: '8:00 AM',
      sideEffects: ['Dizziness', 'Dry cough'],
      remindersEnabled: true
    },
    {
      id: 2,
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '60 days',
      doctor: 'Dr. Michael Chen',
      dateIssued: '2024-01-08',
      instructions: 'Take with meals. Monitor blood sugar levels.',
      status: 'active',
      remainingDays: 45,
      refillsRemaining: 1,
      nextDose: '7:00 AM, 7:00 PM',
      sideEffects: ['Nausea', 'Stomach upset'],
      remindersEnabled: false
    },
    {
      id: 3,
      medication: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      duration: '90 days',
      doctor: 'Dr. Sarah Johnson',
      dateIssued: '2023-12-15',
      instructions: 'Take with fat-containing meal for better absorption.',
      status: 'completed',
      remainingDays: 0,
      refillsRemaining: 0,
      nextDose: 'Completed',
      sideEffects: [],
      remindersEnabled: false
    },
    {
      id: 4,
      medication: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      duration: '7 days',
      doctor: 'Dr. Emily Davis',
      dateIssued: '2024-01-12',
      instructions: 'Take with food. Do not exceed 3 doses per day.',
      status: 'active',
      remainingDays: 5,
      refillsRemaining: 0,
      nextDose: 'As needed',
      sideEffects: ['Stomach irritation'],
      remindersEnabled: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleReminder = (prescriptionId) => {
    setReminders(prev => ({
      ...prev,
      [prescriptionId]: !prev[prescriptionId]
    }));
  };

  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const completedPrescriptions = prescriptions.filter(p => p.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prescriptions</h2>
          <p className="text-gray-600">Manage your medications and dosage reminders</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Request Refill
        </Button>
      </div>

      {/* Today's Medications */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Medications
          </CardTitle>
          <CardDescription>
            Medications scheduled for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePrescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                  <Badge className={getStatusColor(prescription.status)}>
                    {prescription.dosage}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Next dose: {prescription.nextDose}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{prescription.frequency}</span>
                  <div className="flex items-center gap-2">
                    {prescription.remindersEnabled ? (
                      <Bell className="h-4 w-4 text-blue-600" />
                    ) : (
                      <BellOff className="h-4 w-4 text-gray-400" />
                    )}
                    <Switch
                      checked={prescription.remindersEnabled}
                      onCheckedChange={() => toggleReminder(prescription.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Prescriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Prescriptions ({activePrescriptions.length})</CardTitle>
          <CardDescription>
            Your current active medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePrescriptions.map((prescription) => (
              <div key={prescription.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {prescription.medication}
                      </h3>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                      <Badge variant="outline">
                        {prescription.dosage}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{prescription.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{prescription.remainingDays} days remaining</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{prescription.doctor}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div>
                          <span className="font-medium">Next dose:</span> {prescription.nextDose}
                        </div>
                        <div>
                          <span className="font-medium">Refills:</span> {prescription.refillsRemaining} remaining
                        </div>
                        <div>
                          <span className="font-medium">Issued:</span> {prescription.dateIssued}
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Instructions</h4>
                      <p className="text-sm text-blue-700">{prescription.instructions}</p>
                    </div>

                    {/* Side Effects */}
                    {prescription.sideEffects.length > 0 && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-yellow-800">Possible Side Effects</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              {prescription.sideEffects.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Reminders</span>
                      <Switch
                        checked={prescription.remindersEnabled}
                        onCheckedChange={() => toggleReminder(prescription.id)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refill
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Prescriptions */}
      {completedPrescriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed Prescriptions ({completedPrescriptions.length})
            </CardTitle>
            <CardDescription>
              Previously completed medications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                    <p className="text-sm text-gray-600">
                      {prescription.dosage} • {prescription.frequency} • Completed
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Prescribed by {prescription.doctor}</p>
                    <p>{prescription.dateIssued}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {prescriptions.length === 0 && (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-600">Your prescriptions will appear here when available.</p>
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;