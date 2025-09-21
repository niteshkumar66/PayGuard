import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  Shield, 
  TrendingUp,
  Clock,
  Check,
  X,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Trash2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import type { Screen } from '../App';
import type { Alert } from './BottomNavigation';

interface NotificationsScreenProps {
  onNavigate: (screen: Screen) => void;
  alerts: Alert[];
}

export function NotificationsScreen({ onNavigate, alerts }: NotificationsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Extended notifications with more details
  const notifications = [
    {
      id: '1',
      type: 'fraud_alert',
      priority: 'high' as const,
      title: 'Suspicious Transaction Blocked',
      message: 'We blocked a suspicious UPI transaction of ₹15,000 to an unknown merchant. Your account remains secure.',
      time: '2 minutes ago',
      read: false,
      category: 'security'
    },
    {
      id: '2',
      type: 'security_alert',
      priority: 'medium' as const,
      title: 'New Device Login Detected',
      message: 'A new device signed into your account from Mumbai, India. If this wasn\'t you, please secure your account.',
      time: '1 hour ago',
      read: false,
      category: 'security'
    },
    {
      id: '3',
      type: 'fraud_alert',
      priority: 'high' as const,
      title: 'Phishing SMS Detected',
      message: 'We detected a phishing SMS claiming to be from your bank. The message contained malicious links.',
      time: '3 hours ago',
      read: true,
      category: 'security'
    },
    {
      id: '4',
      type: 'system_update',
      priority: 'low' as const,
      title: 'Security Update Available',
      message: 'A new security update is available for PayGuard. Update now to get the latest fraud protection features.',
      time: '6 hours ago',
      read: false,
      category: 'system'
    },
    {
      id: '5',
      type: 'fraud_alert',
      priority: 'medium' as const,
      title: 'Suspicious Website Blocked',
      message: 'We blocked access to a fake banking website that was trying to steal your credentials.',
      time: '1 day ago',
      read: true,
      category: 'security'
    },
    {
      id: '6',
      type: 'achievement',
      priority: 'low' as const,
      title: 'Monthly Protection Report',
      message: 'Great news! We protected you from 12 potential fraud attempts this month, saving you approximately ₹45,000.',
      time: '2 days ago',
      read: true,
      category: 'general'
    },
    {
      id: '7',
      type: 'fraud_alert',
      priority: 'high' as const,
      title: 'Fake Payment App Detected',
      message: 'We detected a fake payment app on your device that mimics a popular UPI app. Please uninstall it immediately.',
      time: '3 days ago',
      read: true,
      category: 'security'
    }
  ];

  const getNotificationIcon = (type: string, priority: string) => {
    switch (type) {
      case 'fraud_alert':
        return <AlertTriangle className={`h-5 w-5 ${
          priority === 'high' ? 'text-red-500' : 
          priority === 'medium' ? 'text-yellow-500' : 'text-gray-500'
        }`} />;
      case 'security_alert':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'system_update':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'achievement':
        return <Shield className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && !notification.read;
    if (activeTab === 'security') return matchesSearch && notification.category === 'security';
    if (activeTab === 'system') return matchesSearch && notification.category === 'system';
    
    return matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-2 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-blue-600 dark:text-blue-400">
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && <Badge variant="secondary" className="ml-1 text-xs">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
              <Bell className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {searchQuery ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          <div className="px-4 py-4 space-y-3">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`p-4 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-all ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10' : ''
                }`}>
                  <div className="flex items-start space-x-3">
                    {/* Icon and Priority Indicator */}
                    <div className="relative">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`font-medium ${
                          !notification.read ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                        </h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1 h-auto">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              {notification.read ? 'Mark as Unread' : 'Mark as Read'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            notification.priority === 'high' ? 'destructive' :
                            notification.priority === 'medium' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}