import React from 'react';
import { Calendar, User, Building2, CheckCircle2, FileText, Search, Eye, Clock } from 'lucide-react';
import { Button } from './ui/button';
import jsPDF from 'jspdf';
import { Card } from './ui/card';
import type { Screen } from '../App';

export interface Case {
  id: string | number;
  firNumber?: string;
  caseType?: string;
  amountLost?: number | string;
  amountRecovered?: number | string;
  daysActive?: number | string;
  location?: string;
  officer?: string;
  timeline: Array<{
    title: string;
    date: string;
    time?: string;
    details: string;
    firDetails?: {
      complainantName: string;
      complainantPhone: string;
      complainantEmail: string;
      transactionId: string;
      amountLost: string;
      suspiciousNumber: string;
      bankAccount: string;
      incidentDescription: string;
      evidenceDetails: string;
    };
  }>;
}

export function CaseTracker({ cases, onNavigate }: { cases: Case[]; onNavigate: (screen: Screen, caseId?: string | number) => void }) {
  if (!cases || cases.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">No case data available.</div>
    );
  }

  // Timeline icon logic
  const getStepIcon = (title: string, idx: number) => {
    if (title.toLowerCase().includes('filed')) {
      return <FileText className="h-6 w-6 text-blue-600" />;
    }
    if (title.toLowerCase().includes('review')) {
      return <User className="h-6 w-6 text-blue-600" />;
    }
    if (title.toLowerCase().includes('investigation')) {
      return <Search className="h-6 w-6 text-blue-600" />;
    }
    if (title.toLowerCase().includes('funds')) {
      return <Eye className="h-6 w-6 text-orange-500" />;
    }
    return <CheckCircle2 className="h-6 w-6 text-blue-600" />;
  };

  // Show only the first case, and make the screen scrollable
  const caseData = cases[0];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="p-2 mr-2"
          >
            <FileText className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Case Tracker</h1>
        </div>
        <Button variant="outline" size="sm">Notify</Button>
      </div>

      {/* Summary Card */}
      <div className="px-4 pt-6">
        <Card className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{caseData.firNumber || 'FIR-2025-001234'}</div>
              <div className="text-base text-gray-700 dark:text-gray-300">{caseData.caseType || 'Phishing Fraud Case'}</div>
            </div>
            <div>
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">In Progress</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 mb-2">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">₹{caseData.amountLost || '15,000'}</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{caseData.amountRecovered || '14,000'}</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{caseData.daysActive || '3'} Days</div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 mt-2">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {caseData.location || 'Cyber Crime Cell, Mumbai'}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {caseData.officer || 'SI Rajesh Kumar'}
            </div>
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <div className="px-4 pt-6 pb-8">
        <div className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Case Timeline</div>
        <div className="relative pl-12">
          {caseData.timeline?.map((step, idx) => (
            <div key={idx} className="mb-8 flex items-start">
              {/* Timeline icon in blue circle, vertical line */}
              <div className="flex flex-col items-center mr-4" style={{ width: 64 }}>
                <div className="relative">
                  <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-800 rounded-full w-12 h-12 flex items-center justify-center shadow">
                    {getStepIcon(step.title, idx)}
                  </div>
                  <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center pointer-events-none">
                    {/* Overlay for active step if needed */}
                  </div>
                </div>
                {idx < (caseData.timeline?.length || 0) - 1 && (
                  <div className="w-0.5 bg-blue-200 dark:bg-blue-800 h-16" style={{ marginTop: 2 }}></div>
                )}
              </div>
              {/* Card box, rounded, shadow, left-aligned content, with top-right download button and extra margin */}
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 px-6 py-5 mb-6 relative">
                  {/* Download button at top right */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => {
                      const doc = new jsPDF();
                      doc.setFontSize(16);
                      doc.text('FIR Report', 20, 20);
                      doc.setFontSize(12);
                      doc.text(`Title: ${step.title}`, 20, 35);
                      doc.text(`Date: ${step.date}`, 20, 45);
                      if (step.time) doc.text(`Time: ${step.time}`, 20, 55);
                      doc.text(`Details: ${step.details}`, 20, 65);
                      // Add all FIR details if present
                      if (step.firDetails) {
                        const fd = step.firDetails;
                        doc.text(`Complainant Name: ${fd.complainantName || ''}`, 20, 75);
                        doc.text(`Complainant Phone: ${fd.complainantPhone || ''}`, 20, 85);
                        doc.text(`Complainant Email: ${fd.complainantEmail || ''}`, 20, 95);
                        doc.text(`Transaction ID: ${fd.transactionId || ''}`, 20, 105);
                        doc.text(`Amount Lost: ₹${fd.amountLost || ''}`, 20, 115);
                        doc.text(`Suspicious Number: ${fd.suspiciousNumber || ''}`, 20, 125);
                        doc.text(`Bank Account: ${fd.bankAccount || ''}`, 20, 135);
                        doc.text(`Incident Description: ${fd.incidentDescription || ''}`, 20, 145);
                        doc.text(`Evidence: ${fd.evidenceDetails || ''}`, 20, 155);
                      }
                      doc.text(`FIR Number: ${caseData.firNumber || ''}`, 20, 165);
                      doc.text(`Case Type: ${caseData.caseType || ''}`, 20, 175);
                      doc.text(`Location: ${caseData.location || ''}`, 20, 185);
                      doc.text(`Officer: ${caseData.officer || ''}`, 20, 195);
                      doc.save(`FIR_${step.title.replace(/\s+/g, '_')}_${step.date}.pdf`);
                    }}
                  >
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </Button>
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-lg text-gray-900 dark:text-white mr-2">{step.title}</span>
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{step.date}</span>
                    {step.time && <><Clock className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" /><span className="text-xs text-gray-500 dark:text-gray-400">{step.time}</span></>}
                  </div>
                  {/* FIR details section */}
                  {step.firDetails ? (
                    <div className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-line font-normal">
                      <div><b>Complainant Name:</b> {step.firDetails.complainantName}</div>
                      <div><b>Complainant Phone:</b> {step.firDetails.complainantPhone}</div>
                      <div><b>Complainant Email:</b> {step.firDetails.complainantEmail}</div>
                      <div><b>Transaction ID:</b> {step.firDetails.transactionId}</div>
                      <div><b>Amount Lost:</b> ₹{step.firDetails.amountLost}</div>
                      <div><b>Suspicious Number:</b> {step.firDetails.suspiciousNumber}</div>
                      <div><b>Bank Account:</b> {step.firDetails.bankAccount}</div>
                      <div><b>Incident Description:</b> {step.firDetails.incidentDescription}</div>
                      <div><b>Evidence:</b> {step.firDetails.evidenceDetails}</div>
                    </div>
                  ) : (
                    <div className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-line font-normal">{step.details}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mt-8">
        <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</h3>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">75%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div className="bg-blue-600 dark:bg-blue-400 h-3 rounded-full w-3/4"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Estimated Recovery</p>
              <p className="font-semibold text-green-600 dark:text-green-400">₹14,000 - ₹15,000</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Expected Closure</p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">Sept 5, 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="px-4 pb-6">
        <div className="space-y-3 pb-6">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onNavigate('money-trace')}
          >
            View Money Tracing Details
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onNavigate('help')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}