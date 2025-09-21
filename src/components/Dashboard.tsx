import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Bell, 
  Search, 
  AlertTriangle, 
  Eye, 
  FileText, 
  Settings, 
  Home,
  Activity,
  TrendingUp,
  Clock,
  ArrowRight,
  Scan,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { BottomNavigation } from './BottomNavigation';
import { QuickScanExamples } from './QuickScanExamples';
import type { Screen, User } from '../App';
import type { Alert } from './BottomNavigation';

interface DashboardProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  alerts?: Alert[];
  onQuickScan?: (content: string) => Promise<void>;
}

export function Dashboard({ user, onNavigate, onLogout, alerts = [], onQuickScan }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'alerts' | 'fir' | 'trace' | 'settings'>('home');
  const [quickScanText, setQuickScanText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleQuickScan = async () => {
    if (quickScanText.trim() && !isScanning) {
      setIsScanning(true);
      try {
        // Trigger quick scan analysis
        await onQuickScan?.(quickScanText);
        // Clear the input after scanning
        setQuickScanText('');
        // Hide examples after scan
        setShowExamples(false);
      } catch (error) {
        console.error('Quick scan failed:', error);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleSelectExample = (content: string) => {
    setQuickScanText(content);
    setShowExamples(false);
  };

  if (activeTab !== 'home') {
    // Handle other tabs through bottom navigation
    if (activeTab === 'settings') {
      onNavigate('settings');
      return null;
    }
    if (activeTab === 'fir') {
      onNavigate('fir-form');
      return null;
    }
    if (activeTab === 'trace') {
      onNavigate('case-tracker');
      return null;
    }
    if (activeTab === 'alerts') {
      onNavigate('fraud-detail');
      return null;
    }
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">
                {user?.isGuest ? 'Welcome, Guest' : `Hi, ${user?.name || 'User'}`}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stay protected today</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 relative"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {alerts.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
        {/* Quick Scan Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <Scan className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Scan</h2>
              {isScanning && (
                <div className="ml-auto flex items-center text-blue-600 dark:text-blue-400">
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  <span className="text-sm">AI Analyzing...</span>
                </div>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Paste suspicious links, SMS, or messages for instant verification</p>
            <div className="flex space-x-2">
              <Input
                placeholder="Paste suspicious content here..."
                value={quickScanText}
                onChange={(e) => setQuickScanText(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleQuickScan}
                disabled={!quickScanText.trim() || isScanning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isScanning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* Examples Toggle */}
            <div className="mt-4 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {showExamples ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide Examples
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Try Example Content
                  </>
                )}
              </Button>
            </div>
            
            {/* Quick Scan Examples */}
            <QuickScanExamples 
              onSelectExample={handleSelectExample}
              isVisible={showExamples}
            />
          </Card>
        </motion.div>

        {/* Fraud Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Alerts</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
              View All
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            {alerts.slice(0, 3).map((alert) => (
              <Card 
                key={alert.id} 
                className="p-4 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                onClick={() => onNavigate('fraud-detail')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.priority === 'high' ? 'text-red-500 dark:text-red-400' :
                        alert.priority === 'medium' ? 'text-yellow-500 dark:text-yellow-400' : 'text-green-500 dark:text-green-400'
                      }`} />
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {alert.priority === 'high' ? 'Transaction Blocked' :
                         alert.priority === 'medium' ? 'Device Security Alert' : 'Security Scan Complete'}
                      </h4>
                      <Badge variant={
                        alert.priority === 'high' ? 'destructive' :
                        alert.priority === 'medium' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {alert.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{alert.message}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.priority === 'high' ? '2 minutes ago' : 
                       alert.priority === 'medium' ? '1 hour ago' : '3 hours ago'}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-2" />
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className="p-6 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-shadow text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              onClick={() => onNavigate('money-trace')}
            >
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-fit mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Trace Money</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Track transaction flow</p>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-shadow text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              onClick={() => onNavigate('fir-form')}
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3 w-fit mx-auto mb-3">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Report Scam</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">File a complaint</p>
            </Card>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">247</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Scams Blocked</div>
            </Card>
            <Card className="p-4 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹50K</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Money Saved</div>
            </Card>
            <Card className="p-4 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}