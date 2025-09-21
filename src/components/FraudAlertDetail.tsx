import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Ban, 
  Flag, 
  Activity, 
  Clock,
  MapPin,
  Phone,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Screen } from '../App';

interface FraudAlertDetailProps {
  onNavigate: (screen: Screen) => void;
}

export function FraudAlertDetail({ onNavigate }: FraudAlertDetailProps) {
  const riskScore = 85;
  
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="p-2 mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Fraud Alert Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Threat Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 mr-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Phishing SMS Detected</h2>
                  <p className="text-gray-600 dark:text-gray-300">High Risk Transaction Alert</p>
                </div>
              </div>
              <Badge variant="destructive">High Risk</Badge>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suspicious Message:</p>
              <p className="text-gray-900 dark:text-gray-100 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                "URGENT: Your account will be blocked. Click here to verify: bit.ly/verify-account-urgent"
              </p>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>Received 2 minutes ago from +91-98765-XXXXX</span>
            </div>
          </Card>
        </motion.div>

        {/* AI Risk Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Risk Assessment</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Fraud Probability</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{riskScore}%</span>
              </div>
              <Progress value={riskScore} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">URL Reputation</p>
                <p className="font-semibold text-red-600 dark:text-red-400">Malicious</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Sender Verification</p>
                <p className="font-semibold text-red-600 dark:text-red-400">Unverified</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Message Pattern</p>
                <p className="font-semibold text-yellow-600 dark:text-yellow-400">Suspicious</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Domain Age</p>
                <p className="font-semibold text-red-600 dark:text-red-400">7 days</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Threat Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Threat Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Malicious URL Detected</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">The shortened URL redirects to a fake banking site designed to steal credentials</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Unregistered Number</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Sender number is not registered with any legitimate financial institution</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Location Anomaly</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Message originated from a high-risk geographical location</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Suggested Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Actions</h3>
            
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {}}
              >
                <Ban className="h-4 w-4 mr-2" />
                Block Sender & Report as Spam
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                onClick={() => {}}
              >
                <Flag className="h-4 w-4 mr-2" />
                Report to Authorities
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => onNavigate('money-trace')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trace This Transaction
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 dark:text-gray-300"
                onClick={() => onNavigate('dashboard')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Mark as Reviewed
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}