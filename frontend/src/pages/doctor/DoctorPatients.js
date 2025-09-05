import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Users, 
  Search, 
  Filter, 
  User, 
  Phone, 
  Mail,
  Calendar,
  Activity,
  FileText,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data - in real app, this would come from API
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-20',
      condition: 'Hypertension',
      status: 'active',
      riskLevel: 'medium',
      totalVisits: 12,
      bloodPressure: '135/85',
      lastPrescription: 'Lisinopril 10mg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-01-18',
      condition: 'Type 2 Diabetes',
      status: 'active',
      riskLevel: 'high',
      totalVisits: 8,
      bloodSugar: '185 mg/dL',
      lastPrescription: 'Metformin 500mg'
    },
    {
      id: 3,
      name: 'Michael Chen',
      age: 58,
      gender: 'Male',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      lastVisit: '2024-01-10',
      nextAppointment: 'Not scheduled',
      condition: 'Chest Pain (Under Investigation)',
      status: 'new',
      riskLevel: 'high',
      totalVisits: 1,
      heartRate: '95 bpm',
      lastPrescription: 'None'
    },
    {
      id: 4,
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-22',
      condition: 'Migraine',
      status: 'active',
      riskLevel: 'low',
      totalVisits: 15,
      frequency: '2-3 per month',
      lastPrescription: 'Sumatriptan 50mg'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      age: 62,
      gender: 'Male',
      email: 'robert.wilson@email.com',
      phone: '+1 (555) 654-3210',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-01-25',
      condition: 'Arthritis',
      status: 'active',
      riskLevel: 'medium',
      totalVisits: 20,
      painLevel: '6/10',
      lastPrescription: 'Ibuprofen 400mg'
    }
  ];

  const todayPatients = patients.filter(patient => 
    patient.nextAppointment === new Date().toISOString().split('T')[0]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'today') return matchesSearch && todayPatients.includes(patient);
    if (filterBy === 'high-risk') return matchesSearch && patient.riskLevel === 'high';
    if (filterBy === 'new') return matchesSearch && patient.status === 'new';
    
    return matchesSearch;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
          <p className="text-gray-600">Manage your patient records and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients by name or condition..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filterBy === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterBy('all')}
          >
            All ({patients.length})
          </Button>
          <Button 
            variant={filterBy === 'today' ? 'default' : 'outline'}
            onClick={() => setFilterBy('today')}
          >
            Today ({todayPatients.length})
          </Button>
          <Button 
            variant={filterBy === 'high-risk' ? 'default' : 'outline'}
            onClick={() => setFilterBy('high-risk')}
          >
            High Risk
          </Button>
          <Button 
            variant={filterBy === 'new' ? 'default' : 'outline'}
            onClick={() => setFilterBy('new')}
          >
            New Patients
          </Button>
        </div>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-semibold text-lg">
                    {getInitials(patient.name)}
                  </div>
                  
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <span className="text-sm text-gray-500">({patient.age} years, {patient.gender})</span>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <Badge className={getRiskColor(patient.riskLevel)}>
                        {patient.riskLevel} risk
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          <span>{patient.condition}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{patient.totalVisits} total visits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Next: {patient.nextAppointment || 'Not scheduled'}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {patient.bloodPressure && (
                          <div>
                            <span className="font-medium">BP:</span> {patient.bloodPressure}
                          </div>
                        )}
                        {patient.bloodSugar && (
                          <div>
                            <span className="font-medium">Blood Sugar:</span> {patient.bloodSugar}
                          </div>
                        )}
                        {patient.heartRate && (
                          <div>
                            <span className="font-medium">Heart Rate:</span> {patient.heartRate}
                          </div>
                        )}
                        {patient.frequency && (
                          <div>
                            <span className="font-medium">Frequency:</span> {patient.frequency}
                          </div>
                        )}
                        {patient.painLevel && (
                          <div>
                            <span className="font-medium">Pain Level:</span> {patient.painLevel}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Last Rx:</span> {patient.lastPrescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  <Link to={`/doctor/patients/${patient.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Prescribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms.' : 'No patients match the selected filter.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;