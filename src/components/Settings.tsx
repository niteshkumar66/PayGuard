import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  LogOut,
  Eye,
  Smartphone,
  Mail,
  ChevronRight,
  Info,
  HelpCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import type { Screen } from '../App';

interface SettingsProps {
  onNavigate: (screen: Screen, caseId?: string | number) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Settings({ onNavigate, onLogout, darkMode, onToggleDarkMode }: SettingsProps) {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile Information',
          description: 'Manage your personal details',
          action: 'navigate',
          hasArrow: true
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          description: 'Control your data and security settings',
          action: 'navigate',
          hasArrow: true
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          description: 'Get alerts for fraud detection',
          action: 'toggle',
          enabled: true
        },
        {
          icon: Mail,
          label: 'Email Notifications',
          description: 'Receive updates via email',
          action: 'toggle',
          enabled: false
        },
        {
          icon: Smartphone,
          label: 'SMS Alerts',
          description: 'Critical alerts via SMS',
          action: 'toggle',
          enabled: true
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: 'Dark Mode',
          description: 'Toggle dark/light theme',
          action: 'darkmode',
          enabled: darkMode
        },
        {
          icon: Globe,
          label: 'Language',
          description: 'English (US)',
          action: 'navigate',
          hasArrow: true
        },
        {
          icon: Eye,
          label: 'Accessibility',
          description: 'Screen reader and display options',
          action: 'navigate',
          hasArrow: true
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'FAQs and customer support',
          action: 'help',
          hasArrow: true
        },
        {
          icon: Info,
          label: 'About PayGuard',
          description: 'App version and information',
          action: 'navigate',
          hasArrow: true
        }
      ]
    }
  ];

  const handleItemClick = (item: any) => {
    switch (item.action) {
      case 'help':
        onNavigate('help', undefined);
        break;
      case 'darkmode':
        onToggleDarkMode();
        break;
      case 'navigate':
        // Handle navigation to specific settings pages
        if (item.label === 'Profile Information') {
          onNavigate('profile', undefined);
        } else if (item.label === 'Privacy & Security') {
          onNavigate('privacy-security', undefined);
        }
        break;
      case 'toggle':
        // Handle toggle actions for notifications
        break;
      default:
        break;
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
              onClick={() => onNavigate('dashboard')}
              className="p-2 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-full p-3 mr-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h2>
                <p className="text-gray-600 dark:text-gray-300">john.doe@email.com</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Premium Member</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (sectionIndex + 1) }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
              {section.title}
            </h3>
            
            <Card className="overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === section.items.length - 1;
                
                return (
                  <React.Fragment key={itemIndex}>
                    <div
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {item.label}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {item.action === 'toggle' && (
                            <Switch 
                              checked={item.enabled} 
                              className="mr-2"
                            />
                          )}
                          {item.action === 'darkmode' && (
                            <Switch 
                              checked={darkMode} 
                              onCheckedChange={onToggleDarkMode}
                              className="mr-2"
                            />
                          )}
                          {item.hasArrow && (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    {!isLast && <Separator />}
                  </React.Fragment>
                );
              })}
            </Card>
          </motion.div>
        ))}

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-4 mb-6">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>PayGuard Version 1.2.0</p>
              <p>© 2025 PayGuard Technologies</p>
              <p className="mt-2">Your trusted fraud protection partner</p>
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="pb-6"
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full py-3 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}