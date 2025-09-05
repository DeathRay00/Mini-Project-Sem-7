import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  AlertTriangle,
  TrendingUp,
  Eye,
  Calendar,
  User
} from 'lucide-react';

const PatientReports = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    type: '',
    date: '',
    notes: '',
    file: null
  });

  // Mock data
  const reports = [
    {
      id: 1,
      title: 'Blood Test Results',
      type: 'Lab Report',
      date: '2024-01-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'reviewed',
      abnormalValues: ['High Cholesterol', 'Low Vitamin D'],
      summary: 'Overall results show slight elevation in cholesterol levels. Vitamin D deficiency noted. Recommend dietary changes and supplements.',
      fileUrl: '#'
    },
    {
      id: 2,
      title: 'Chest X-Ray',
      type: 'Imaging',
      date: '2024-01-05',
      doctor: 'Dr. Michael Chen',
      status: 'normal',
      abnormalValues: [],
      summary: 'Chest X-ray shows clear lungs with no signs of infection or abnormalities. Heart size appears normal.',
      fileUrl: '#'
    },
    {
      id: 3,
      title: 'ECG Report',
      type: 'Cardiac',
      date: '2023-12-28',
      doctor: 'Dr. Sarah Johnson',
      status: 'reviewed',
      abnormalValues: ['Irregular Rhythm'],
      summary: 'ECG shows mild irregular rhythm. Recommend follow-up with cardiologist for further evaluation.',
      fileUrl: '#'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('Upload data:', uploadData);
    setShowUploadForm(false);
    setUploadData({
      title: '',
      type: '',
      date: '',
      notes: '',
      file: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Reports</h2>
          <p className="text-gray-600">View and manage your medical reports</p>
        </div>
        <Button 
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Report
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search reports by title, type, or doctor..."
          className="pl-10"
        />
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Upload Medical Report</CardTitle>
            <CardDescription>
              Add a new medical report to your health records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Blood Test Results"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Report Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Lab Report, X-Ray, MRI"
                    value={uploadData.type}
                    onChange={(e) => setUploadData({...uploadData, type: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Report Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={uploadData.date}
                  onChange={(e) => setUploadData({...uploadData, date: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
                  required
                />
                <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about this report..."
                  value={uploadData.notes}
                  onChange={(e) => setUploadData({...uploadData, notes: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Report
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {report.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{report.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{report.doctor}</span>
                    </div>
                  </div>

                  {/* Abnormal Values Alert */}
                  {report.abnormalValues.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Abnormal Values Detected</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            {report.abnormalValues.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Summary */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">AI Summary</h4>
                        <p className="text-sm text-blue-700 mt-1">{report.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {reports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports uploaded</h3>
          <p className="text-gray-600 mb-4">Upload your first medical report to get started.</p>
          <Button 
            onClick={() => setShowUploadForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientReports;