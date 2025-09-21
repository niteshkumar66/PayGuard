import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Send, 
  User, 
  Phone, 
  Mail, 
  IndianRupee,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import type { Screen, User as FIRUser } from '../App';



interface FIRFormProps {
  user: FIRUser | null;
  onNavigate: (screen: Screen, caseId?: string | number) => void;
  onSubmitFIR?: (newCase: any) => void;
}

export function FIRForm({ user, onNavigate, onSubmitFIR }: FIRFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    complainantName: user?.name || 'John Doe',
    complainantPhone: user?.phone || '+91-9876543210',
    complainantEmail: 'john.doe@email.com',
    incidentDate: '2025-09-01',
    incidentTime: '14:30',
    transactionId: 'TXN123456789',
    amountLost: '15000',
    suspiciousNumber: '+91-98765-XXXXX',
    bankAccount: 'HDFC Bank - ****1234',
    incidentDescription: 'I received a suspicious SMS claiming my bank account would be blocked. The message contained a malicious link that redirected to a fake banking website. I was tricked into entering my banking credentials, following which ₹15,000 was debited from my account without authorization.',
    evidenceDetails: 'Screenshot of SMS, bank transaction statement, fake website URL'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Build FIR/case object from formData
    const newCase = {
      id: `FIR-${Date.now()}`,
      status: 'Case Filed',
      date: formData.incidentDate,
      time: formData.incidentTime,
      description: formData.incidentDescription,
      completed: false,
      icon: FileText,
      details: `Amount lost: ₹${formData.amountLost}, Transaction ID: ${formData.transactionId}`,
      complainantName: formData.complainantName,
      complainantPhone: formData.complainantPhone,
      complainantEmail: formData.complainantEmail,
      suspiciousNumber: formData.suspiciousNumber,
      bankAccount: formData.bankAccount,
      evidenceDetails: formData.evidenceDetails,
      firNumber: `FIR-${Date.now()}`,
      caseType: 'Phishing Fraud Case',
      amountLost: Number(formData.amountLost),
      amountRecovered: 0,
      daysActive: 1,
      location: 'Cyber Crime Cell, Mumbai',
      officer: 'SI Rajesh Kumar',
      timeline: [
        {
          title: 'Case Filed',
          date: formData.incidentDate,
          time: formData.incidentTime,
          details: `FIR submitted successfully with reference number ${`FIR-${Date.now()}`}
Case registered at Cyber Crime Cell, Mumbai`
        }
      ]
    };
    if (onSubmitFIR) onSubmitFIR(newCase);
    setTimeout(() => {
      onNavigate('case-tracker');
    }, 2000);
  };

  const handleDownloadPDF = () => {
    // Mock PDF download functionality
    alert('FIR copy downloaded successfully!');
  };

  if (isSubmitted) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-6 w-fit mx-auto mb-6">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">FIR Submitted Successfully!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Your complaint has been registered with reference number:</p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">FIR-2025-001234</p>
          </div>
          <Button 
            onClick={() => onNavigate('case-tracker')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Track Your Case
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-2 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">File FIR</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              Pre-filled information can be edited. Ensure all details are accurate before submission.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Complainant Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complainant Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.complainantName}
                  onChange={(e) => handleInputChange('complainantName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.complainantPhone}
                  onChange={(e) => handleInputChange('complainantPhone', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.complainantEmail}
                  onChange={(e) => handleInputChange('complainantEmail', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Incident Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Incident Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Incident Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Incident Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.incidentTime}
                    onChange={(e) => handleInputChange('incidentTime', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={formData.transactionId}
                  onChange={(e) => handleInputChange('transactionId', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="amount">Amount Lost (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amountLost}
                  onChange={(e) => handleInputChange('amountLost', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="suspiciousNumber">Suspicious Phone Number</Label>
                <Input
                  id="suspiciousNumber"
                  value={formData.suspiciousNumber}
                  onChange={(e) => handleInputChange('suspiciousNumber', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bankAccount">Affected Bank Account</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Incident Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Incident Description</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  rows={6}
                  value={formData.incidentDescription}
                  onChange={(e) => handleInputChange('incidentDescription', e.target.value)}
                  className="mt-1"
                  placeholder="Provide a detailed description of how the fraud occurred..."
                />
              </div>
              
              <div>
                <Label htmlFor="evidence">Evidence Details</Label>
                <Textarea
                  id="evidence"
                  rows={3}
                  value={formData.evidenceDetails}
                  onChange={(e) => handleInputChange('evidenceDetails', e.target.value)}
                  className="mt-1"
                  placeholder="List any evidence you have (screenshots, documents, etc.)"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pb-6"
        >
          <Button 
            onClick={handleSubmit}
            className="w-full py-3 bg-red-600 hover:bg-red-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit FIR
          </Button>
          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            By submitting, you confirm that all information provided is accurate and complete.
          </p>
        </motion.div>
      </div>
    </div>
  );
}