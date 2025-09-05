import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Weight,
  Heart,
  Thermometer,
  Download,
  Plus,
  Filter
} from 'lucide-react';

const PatientHealthTimeline = () => {
  const [selectedMetric, setSelectedMetric] = useState('blood_pressure');
  const [timeRange, setTimeRange] = useState('6months');

  // Mock data for health metrics
  const healthMetrics = {
    blood_pressure: {
      name: 'Blood Pressure',
      unit: 'mmHg',
      icon: Heart,
      color: 'text-red-600',
      data: [
        { date: '2024-01-01', value: '120/80', systolic: 120, diastolic: 80 },
        { date: '2024-01-15', value: '125/82', systolic: 125, diastolic: 82 },
        { date: '2024-01-30', value: '118/78', systolic: 118, diastolic: 78 },
        { date: '2024-02-15', value: '122/79', systolic: 122, diastolic: 79 }
      ]
    },
    weight: {
      name: 'Weight',
      unit: 'kg',
      icon: Weight,
      color: 'text-blue-600',
      data: [
        { date: '2024-01-01', value: '75.2' },
        { date: '2024-01-15', value: '74.8' },
        { date: '2024-01-30', value: '74.5' },
        { date: '2024-02-15', value: '74.1' }
      ]
    },
    blood_sugar: {
      name: 'Blood Sugar',
      unit: 'mg/dL',
      icon: Activity,
      color: 'text-green-600',
      data: [
        { date: '2024-01-01', value: '95' },
        { date: '2024-01-15', value: '98' },
        { date: '2024-01-30', value: '92' },
        { date: '2024-02-15', value: '96' }
      ]
    },
    temperature: {
      name: 'Temperature',
      unit: '°C',
      icon: Thermometer,
      color: 'text-orange-600',
      data: [
        { date: '2024-01-01', value: '36.5' },
        { date: '2024-01-15', value: '36.7' },
        { date: '2024-01-30', value: '36.4' },
        { date: '2024-02-15', value: '36.6' }
      ]
    }
  };

  const healthEvents = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'appointment',
      title: 'Cardiology Consultation',
      description: 'Follow-up appointment with Dr. Sarah Johnson',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'lab_result',
      title: 'Blood Test Results',
      description: 'Cholesterol levels slightly elevated',
      icon: Activity,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 3,
      date: '2024-01-05',
      type: 'medication',
      title: 'Prescription Updated',
      description: 'Lisinopril dosage adjusted to 10mg',
      icon: Activity,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      date: '2023-12-28',
      type: 'symptom',
      title: 'Mild Headache',
      description: 'Reported mild headache, resolved with rest',
      icon: Activity,
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  const aiPredictions = [
    {
      metric: 'Blood Pressure',
      prediction: 'Based on current trends, your blood pressure is likely to remain stable over the next 3 months.',
      risk: 'low',
      recommendation: 'Continue current medication and maintain regular exercise routine.'
    },
    {
      metric: 'Weight',
      prediction: 'Gradual weight loss trend detected. You may reach your target weight in 2-3 months.',
      risk: 'positive',
      recommendation: 'Keep up the good work with diet and exercise.'
    },
    {
      metric: 'Blood Sugar',
      prediction: 'Blood sugar levels are within normal range with good stability.',
      risk: 'low',
      recommendation: 'Continue monitoring and maintain current lifestyle habits.'
    }
  ];

  const currentMetric = healthMetrics[selectedMetric];
  const latestValue = currentMetric.data[currentMetric.data.length - 1];
  const previousValue = currentMetric.data[currentMetric.data.length - 2];

  const getTrend = () => {
    if (!previousValue) return null;
    
    const current = selectedMetric === 'blood_pressure' 
      ? latestValue.systolic 
      : parseFloat(latestValue.value);
    const previous = selectedMetric === 'blood_pressure' 
      ? previousValue.systolic 
      : parseFloat(previousValue.value);
    
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  const trend = getTrend();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Timeline</h2>
          <p className="text-gray-600">Track your health metrics and progress over time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blood_pressure">Blood Pressure</SelectItem>
            <SelectItem value="weight">Weight</SelectItem>
            <SelectItem value="blood_sugar">Blood Sugar</SelectItem>
            <SelectItem value="temperature">Temperature</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">1 Month</SelectItem>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="1year">1 Year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Current Metric Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100 ${currentMetric.color}`}>
                  <currentMetric.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{currentMetric.name}</h3>
                  <p className="text-sm text-gray-600">Latest Reading</p>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {latestValue.value}
              </span>
              <span className="text-sm text-gray-600 mb-1">{currentMetric.unit}</span>
            </div>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                {trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500" />}
                {trend === 'stable' && <Activity className="h-4 w-4 text-gray-500" />}
                <span className={`text-sm font-medium ${
                  trend === 'up' ? 'text-red-600' : 
                  trend === 'down' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {trend === 'up' ? 'Trending up' : 
                   trend === 'down' ? 'Trending down' : 'Stable'}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chart Placeholder */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{currentMetric.name} Trend</CardTitle>
            <CardDescription>
              {currentMetric.name} readings over the selected time period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive chart would be displayed here</p>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {currentMetric.data.length} data points
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI Health Predictions
          </CardTitle>
          <CardDescription>
            AI-driven insights based on your health data trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiPredictions.map((prediction, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    prediction.risk === 'low' ? 'bg-green-100 text-green-600' :
                    prediction.risk === 'positive' ? 'bg-blue-100 text-blue-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <TrendingUp size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{prediction.metric}</h4>
                    <p className="text-sm text-gray-700 mb-2">{prediction.prediction}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Recommendation:</span> {prediction.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Health Events Timeline</CardTitle>
          <CardDescription>
            Chronological view of your health events and milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthEvents.map((event, index) => (
              <div key={event.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${event.color}`}>
                    <event.icon size={16} />
                  </div>
                  {index !== healthEvents.length - 1 && (
                    <div className="w-px h-8 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientHealthTimeline;