import React from 'react';
import { Home, AlertTriangle, FileText, Activity, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export interface Alert {
  id: string;
  priority: 'high' | 'medium' | 'low';
  message: string;
}

interface BottomNavigationProps {
  activeTab: 'home' | 'alerts' | 'fir' | 'trace' | 'settings';
  onTabChange: (tab: 'home' | 'alerts' | 'fir' | 'trace' | 'settings') => void;
  alerts?: Alert[];
}

export function BottomNavigation({ activeTab, onTabChange, alerts = [] }: BottomNavigationProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'alerts' as const, icon: AlertTriangle, label: 'Alerts' },
    { id: 'fir' as const, icon: FileText, label: 'FIR' },
    { id: 'trace' as const, icon: Activity, label: 'Trace' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  // Get the highest priority alert for badge color
  const getAlertBadgeColor = () => {
    if (alerts.length === 0) return null;
    
    const hasHigh = alerts.some(alert => alert.priority === 'high');
    const hasMedium = alerts.some(alert => alert.priority === 'medium');
    
    if (hasHigh) return 'bg-red-500'; // High priority - red
    if (hasMedium) return 'bg-yellow-500'; // Medium priority - yellow
    return 'bg-green-500'; // Low priority - green
  };

  const badgeColor = getAlertBadgeColor();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="grid grid-cols-5 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-1 relative ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-0 top-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
              <span className={`text-xs ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                {tab.label}
              </span>
              
              {tab.id === 'alerts' && alerts.length > 0 && badgeColor && (
                <motion.div 
                  className={`absolute -top-1 -right-1 ${badgeColor} text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-sm`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {alerts.length}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}