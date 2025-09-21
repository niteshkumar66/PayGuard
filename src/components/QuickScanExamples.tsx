import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export const fraudExamples = [
  {
    type: 'High Risk Fraud',
    content: 'URGENT! Your bank account has been compromised. Click here immediately to secure: http://fake-bank-secure.com/verify-account-now',
    expectedRisk: 'fraud',
    badge: 'destructive' as const
  },
  {
    type: 'Prize Scam',
    content: 'Congratulations! You have won ₹50,000 in our lucky draw. Claim now: bit.ly/claim-prize-xyz',
    expectedRisk: 'fraud',
    badge: 'destructive' as const
  },
  {
    type: 'Suspicious Content',
    content: 'Hi, Your SIM will be blocked in 2 hours. Call 18001234567 to reactivate immediately.',
    expectedRisk: 'suspicious',
    badge: 'secondary' as const
  },
  {
    type: 'Government Scam',
    content: 'Your COVID vaccination certificate is ready. Download: gov-covid-cert.in/download',
    expectedRisk: 'suspicious',
    badge: 'secondary' as const
  },
  {
    type: 'Safe Content',
    content: 'Your Amazon order #123456789 has been dispatched. Track: https://amazon.in/track/order/123456789',
    expectedRisk: 'safe',
    badge: 'outline' as const
  },
  {
    type: 'Legitimate Bank',
    content: 'Alert: Transaction of ₹2,500 debited from A/C **1234. If not done by you, visit https://netbanking.hdfcbank.com',
    expectedRisk: 'safe',
    badge: 'outline' as const
  }
];

interface QuickScanExamplesProps {
  onSelectExample: (content: string) => void;
  isVisible: boolean;
}

export function QuickScanExamples({ onSelectExample, isVisible }: QuickScanExamplesProps) {
  if (!isVisible) return null;

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'fraud':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'suspicious':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'safe':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Try these examples:
      </h4>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {fraudExamples.map((example, index) => (
          <Card 
            key={index}
            className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            onClick={() => onSelectExample(example.content)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getRiskIcon(example.expectedRisk)}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {example.type}
                </span>
              </div>
              <Badge variant={example.badge} className="text-xs">
                {example.expectedRisk.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {example.content}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}