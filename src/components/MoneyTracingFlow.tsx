import jsPDF from 'jspdf';
import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Wallet,
  Building2,
  HelpCircle,
  ArrowRight,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  IndianRupee
} from 'lucide-react';
interface MoneyTracingFlowProps {
  onNavigate: (screen: import('../App').Screen, caseId?: string | number) => void;
  firAmount?: string;
  firWallet?: string;
  firTransactionId?: string;
}

export function MoneyTracingFlow({ onNavigate, firAmount, firWallet, firTransactionId }: MoneyTracingFlowProps) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('FIR Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${firTransactionId || 'TXN123456'}`, 20, 35);
    doc.text(`Amount Reported: ${firAmount || '₹15,000'}`, 20, 45);
    doc.text(`Wallet/Account: ${firWallet || 'PayTM Wallet'}`, 20, 55);
    doc.text(`Date Reported: 21 September 2025`, 20, 65);
    doc.text('Status: Under Investigation', 20, 75);
    doc.save('FIR_Report.pdf');
  };
  const transactionFlow = [
    {
      id: 1,
      type: 'wallet',
      name: firWallet || 'Your PayTM Wallet',
      amount: firAmount || '₹15,000',
      status: 'debited',
      time: '2:30 PM',
      verified: true
    },
    {
      id: 2,
      type: 'bank',
      name: 'Axis Bank Account',
      amount: firAmount || '₹15,000',
      status: 'credited',
      time: '2:31 PM',
      verified: true
    },
    {
      id: 3,
      type: 'wallet',
      name: 'PhonePe Wallet',
      amount: '₹14,500',
      status: 'transferred',
      time: '2:45 PM',
      verified: false
    },
    {
      id: 4,
      type: 'unknown',
      name: 'Unknown Account',
      amount: '₹14,000',
      status: 'final',
      time: '3:15 PM',
      verified: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'wallet':
        return Wallet;
      case 'bank':
        return Building2;
      default:
        return HelpCircle;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'debited':
        return <ArrowRight className="h-4 w-4 text-red-500" />;
      case 'credited':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'transferred':
        return <ArrowRight className="h-4 w-4 text-blue-500" />;
      case 'final':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard', undefined)}
              className="p-2 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Money Tracing</h1>
          </div>
          <Badge variant="destructive" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            Under Investigation
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Transaction Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction ID: {firTransactionId || 'TXN123456'}</h2>
                <p className="text-gray-600 dark:text-gray-300">Fraudulent transaction reported on Sept 1, 2025</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{firAmount || '₹15,000'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Initial Amount</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">₹14,000</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Currently Traced</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">₹1,000</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Fees Deducted</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">4 Hops</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Transaction Path</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Transaction Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Flow</h3>
            </div>

            <div className="space-y-4">
              {transactionFlow.map((transaction, index) => {
                const Icon = getIcon(transaction.type);
                const isLast = index === transactionFlow.length - 1;
                
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="relative"
                  >
                    <div className="flex items-start">
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                        transaction.verified ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          transaction.verified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`} />
                        {transaction.verified && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 ml-4">
                        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{transaction.name}</h4>
                            <div className="flex items-center">
                              {getStatusIcon(transaction.status)}
                              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{transaction.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {transaction.amount}
                            </span>
                            <Badge variant={transaction.verified ? "secondary" : "destructive"}>
                              {transaction.verified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {!isLast && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Status & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investigation Status</h3>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Funds Located but Blocked</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    The remaining ₹14,000 has been frozen in the final account pending investigation
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Investigation Progress</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="space-y-3">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => onNavigate('case-tracker', undefined)}
            >
              View Case Progress
            </Button>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleDownloadPDF}
            >
              Download FIR PDF
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('fir-form', undefined)}
            >
              Update FIR Details
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-gray-600 dark:text-gray-300"
              onClick={() => onNavigate('dashboard', undefined)}
            >
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}