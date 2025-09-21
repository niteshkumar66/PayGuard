import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  X, 
  ExternalLink, 
  Phone,
  MessageSquare,
  Ban,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Brain,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface SMSMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  links: string[];
  riskLevel: 'safe' | 'suspicious' | 'fraud';
  riskScore: number;
  detectedThreats: string[];
  confidence?: number;
  aiInsights?: string[];
}

interface SMSFraudPopupProps {
  message: SMSMessage | null;
  onClose: () => void;
  onBlockNumber: (number: string) => void;
  onReportScam: () => void;
  onMarkSafe: () => void;
}

export function SMSFraudPopup({ 
  message, 
  onClose, 
  onBlockNumber, 
  onReportScam, 
  onMarkSafe 
}: SMSFraudPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      // Auto-hide after 10 seconds for safe messages
      if (message.riskLevel === 'safe') {
        const timer = setTimeout(() => {
          handleClose();
        }, 10000);
        return () => clearTimeout(timer);
      }
    }
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'fraud':
        return 'text-red-600 dark:text-red-400';
      case 'suspicious':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'safe':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'fraud':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'suspicious':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'safe':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'fraud':
        return <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />;
      case 'suspicious':
        return <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />;
      case 'safe':
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />;
      default:
        return <Shield className="h-6 w-6 text-gray-600 dark:text-gray-400" />;
    }
  };

  if (!message) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
          >
            <Card className={`p-6 shadow-2xl ${getRiskBgColor(message.riskLevel)}`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">PayGuard Alert</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {message.sender === 'Quick Scan Analysis' ? 'Quick Scan Result' : 'SMS Security Scan'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="p-1 h-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Risk Assessment */}
              <div className="flex items-center space-x-3 mb-4">
                {getRiskIcon(message.riskLevel)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-semibold ${getRiskColor(message.riskLevel)}`}>
                      {message.riskLevel === 'fraud' ? 'FRAUD DETECTED' :
                       message.riskLevel === 'suspicious' ? 'SUSPICIOUS CONTENT' : 'SAFE MESSAGE'}
                    </h4>
                    <Badge 
                      variant={message.riskLevel === 'fraud' ? 'destructive' : 
                              message.riskLevel === 'suspicious' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {message.riskScore}% Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {message.riskLevel === 'fraud' ? 'This message contains fraudulent content' :
                     message.riskLevel === 'suspicious' ? 'This message requires verification' : 
                     'This message appears to be legitimate'}
                  </p>
                </div>
              </div>

              {/* Message Details */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {message.sender === 'Quick Scan Analysis' ? 'Scanned Content:' : `From: ${message.sender}`}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  {message.content}
                </p>
                
                {/* Links */}
                {message.links.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Detected Links:</p>
                    {message.links.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-600 rounded text-xs">
                        <ExternalLink className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        <span className="font-mono text-gray-700 dark:text-gray-300 truncate flex-1">{link}</span>
                        <Badge variant="outline" className={getRiskColor(message.riskLevel)}>
                          {message.riskLevel}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Threat Details */}
              {message.detectedThreats.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detected Threats:</p>
                  <div className="space-y-1">
                    {message.detectedThreats.map((threat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{threat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insights */}
              {message.aiInsights && message.aiInsights.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Analysis:</p>
                    {message.confidence && (
                      <Badge variant="outline" className="text-xs">
                        {message.confidence}% Confidence
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {message.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <TrendingUp className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                {message.riskLevel === 'fraud' && (
                  <>
                    {message.sender !== 'Quick Scan Analysis' && (
                      <Button 
                        onClick={() => onBlockNumber(message.sender)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Block Number
                      </Button>
                    )}
                    <Button 
                      onClick={onReportScam}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Report Scam
                    </Button>
                  </>
                )}
                
                {message.riskLevel === 'suspicious' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {message.sender !== 'Quick Scan Analysis' && (
                        <Button 
                          onClick={() => onBlockNumber(message.sender)}
                          variant="outline"
                          className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                      )}
                      <Button 
                        onClick={onMarkSafe}
                        variant="outline"
                        className={`border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20 ${
                          message.sender === 'Quick Scan Analysis' ? 'col-span-2' : ''
                        }`}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Safe
                      </Button>
                    </div>
                    <Button 
                      onClick={onReportScam}
                      variant="ghost"
                      className="w-full text-gray-600 dark:text-gray-400"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Report as Suspicious
                    </Button>
                  </>
                )}
                
                {message.riskLevel === 'safe' && (
                  <Button 
                    onClick={handleClose}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    OK, Thanks
                  </Button>
                )}
              </div>

              {/* Powered by PayGuard */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Protected by PayGuard AI Security
                </p>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}