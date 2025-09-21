import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Case } from './CaseTracker';
import type { Screen } from '../App';


interface CaseDetailProps {
  caseData: Case;
  onNavigate: (screen: Screen, caseId?: string | number) => void;
}

export function CaseDetail({ caseData, onNavigate }: CaseDetailProps) {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('case-tracker')}
          className="p-2 mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Case Details</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{caseData.firNumber || 'FIR-2025-001234'}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Case Type: {caseData.caseType || 'Phishing Fraud Case'}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Amount Lost: ₹{caseData.amountLost || '15,000'}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Amount Recovered: ₹{caseData.amountRecovered || '14,000'}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Days Active: {caseData.daysActive || '3'} Days</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Location: {caseData.location || 'Cyber Crime Cell, Mumbai'}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Officer: {caseData.officer || 'SI Rajesh Kumar'}</p>
          <div className="mt-4">
            <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Case Timeline:</div>
            {caseData.timeline?.map((step, idx) => (
              <div key={idx} className="mb-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center mb-1">
                  <span className="font-bold text-base text-gray-900 dark:text-white mr-2">{step.title}</span>
                  <span className="text-xs text-gray-500 mr-2">{step.date}</span>
                  {step.time && <span className="text-xs text-gray-500">| {step.time}</span>}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{step.details}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}