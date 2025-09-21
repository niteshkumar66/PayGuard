import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff,
  Smartphone,
  Fingerprint,
  UserX,
  Database,
  Share2,
  Globe,
  AlertTriangle,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import type { Screen } from '../App';

interface PrivacySecurityProps {
  onNavigate: (screen: Screen) => void;
}

export function PrivacySecurity({ onNavigate }: PrivacySecurityProps) {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    biometricAuth: true,
    dataSharing: false,
    locationTracking: true,
    deviceTracking: true,
    dataBackup: true,
    fraudAlerts: true,
    marketingEmails: false,
    analyticsSharing: false
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      key: 'twoFactorAuth',
      enabled: settings.twoFactorAuth,
      status: 'active'
    },
    {
      icon: Fingerprint,
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition to unlock',
      key: 'biometricAuth',
      enabled: settings.biometricAuth,
      status: 'active'
    },
    {
      icon: Smartphone,
      title: 'Device Tracking',
      description: 'Monitor and manage logged-in devices',
      key: 'deviceTracking',
      enabled: settings.deviceTracking,
      status: 'active'
    },
    {
      icon: Shield,
      title: 'Fraud Alert System',
      description: 'Real-time notifications for suspicious activities',
      key: 'fraudAlerts',
      enabled: settings.fraudAlerts,
      status: 'active'
    }
  ];

  const privacySettings = [
    {
      icon: Database,
      title: 'Data Backup',
      description: 'Securely backup your data to cloud',
      key: 'dataBackup',
      enabled: settings.dataBackup
    },
    {
      icon: Share2,
      title: 'Data Sharing with Partners',
      description: 'Share anonymized data to improve fraud detection',
      key: 'dataSharing',
      enabled: settings.dataSharing
    },
    {
      icon: Globe,
      title: 'Location Tracking',
      description: 'Use location data for enhanced security',
      key: 'locationTracking',
      enabled: settings.locationTracking
    },
    {
      icon: Settings,
      title: 'Analytics & Performance',
      description: 'Help improve app performance with usage data',
      key: 'analyticsSharing',
      enabled: settings.analyticsSharing
    }
  ];

  const recentSecurityEvents = [
    {
      id: 1,
      type: 'login',
      description: 'Successful login from new device',
      location: 'Mumbai, India',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'password_change',
      description: 'Password changed successfully',
      location: 'Mumbai, India',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'failed_login',
      description: 'Failed login attempt blocked',
      location: 'Unknown Location',
      time: '3 days ago',
      status: 'blocked'
    }
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('settings')}
              className="p-2 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Security Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <div className="flex items-center">
              <div className="bg-green-600 rounded-full p-3 mr-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Secure</h2>
                <p className="text-gray-600 dark:text-gray-300">All security features are active and up to date</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Security Score: 98%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Features</h3>
          
          <Card className="overflow-hidden">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isLast = index === securityFeatures.length - 1;
              
              return (
                <React.Fragment key={feature.key}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`rounded-full p-2 ${
                          feature.enabled 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            feature.enabled 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {feature.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {feature.enabled && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Active
                          </Badge>
                        )}
                        <Switch 
                          checked={feature.enabled} 
                          onCheckedChange={() => handleToggle(feature.key)}
                        />
                      </div>
                    </div>
                  </div>
                  {!isLast && <Separator />}
                </React.Fragment>
              );
            })}
          </Card>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy Controls</h3>
          
          <Card className="overflow-hidden">
            {privacySettings.map((setting, index) => {
              const Icon = setting.icon;
              const isLast = index === privacySettings.length - 1;
              
              return (
                <React.Fragment key={setting.key}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                          <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {setting.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      
                      <Switch 
                        checked={setting.enabled} 
                        onCheckedChange={() => handleToggle(setting.key)}
                      />
                    </div>
                  </div>
                  {!isLast && <Separator />}
                </React.Fragment>
              );
            })}
          </Card>
        </motion.div>

        {/* Recent Security Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Security Activity</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
              View All
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            {recentSecurityEvents.map((event, index) => {
              const isLast = index === recentSecurityEvents.length - 1;
              
              return (
                <React.Fragment key={event.id}>
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`rounded-full p-2 ${
                        event.status === 'success' 
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : event.status === 'blocked'
                          ? 'bg-red-100 dark:bg-red-900/30'
                          : 'bg-yellow-100 dark:bg-yellow-900/30'
                      }`}>
                        {event.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : event.status === 'blocked' ? (
                          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {event.description}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.location}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                      </div>
                      <Badge variant={
                        event.status === 'success' ? 'secondary' :
                        event.status === 'blocked' ? 'destructive' : 'secondary'
                      } className="text-xs">
                        {event.status === 'success' ? 'Success' :
                         event.status === 'blocked' ? 'Blocked' : 'Warning'}
                      </Badge>
                    </div>
                  </div>
                  {!isLast && <Separator />}
                </React.Fragment>
              );
            })}
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <Card className="p-4 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                    <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-2">
                    <Smartphone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Manage Devices</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View and remove trusted devices</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2">
                    <UserX className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Tip:</strong> Regularly review your security settings and recent activity. 
              Enable all recommended security features for maximum protection against fraud.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </div>
  );
}