import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  Camera,
  Shield,
  Verified
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';
import type { Screen, User as UserType } from '../App';

interface ProfileInformationProps {
  user: UserType | null;
  onNavigate: (screen: Screen) => void;
}

export function ProfileInformation({ user, onNavigate }: ProfileInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || 'John Doe',
    email: 'john.doe@email.com',
    phone: user?.phone || '+91 9876543210',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    emergencyContact: '+91 9876543211'
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || 'John Doe',
      email: 'john.doe@email.com',
      phone: user?.phone || '+91 9876543210',
      dateOfBirth: '1990-01-15',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      emergencyContact: '+91 9876543211'
    });
    setIsEditing(false);
  };

  const profileFields = [
    {
      icon: User,
      label: 'Full Name',
      value: editedUser.name,
      key: 'name',
      type: 'text'
    },
    {
      icon: Mail,
      label: 'Email Address',
      value: editedUser.email,
      key: 'email',
      type: 'email'
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: editedUser.phone,
      key: 'phone',
      type: 'tel'
    },
    {
      icon: Calendar,
      label: 'Date of Birth',
      value: editedUser.dateOfBirth,
      key: 'dateOfBirth',
      type: 'date'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: editedUser.address,
      key: 'address',
      type: 'text'
    },
    {
      icon: Phone,
      label: 'Emergency Contact',
      value: editedUser.emergencyContact,
      key: 'emergencyContact',
      type: 'tel'
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h1>
          </div>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="p-2"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="p-2 text-blue-600 dark:text-blue-400"
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="flex flex-col items-center text-center">
              {/* Profile Avatar */}
              <div className="relative mb-4">
                <div className="bg-blue-600 rounded-full p-6">
                  <User className="h-12 w-12 text-white" />
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full h-6 w-6 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <Verified className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {editedUser.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{editedUser.email}</p>
              
              <div className="flex space-x-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified Account
                </Badge>
                <Badge variant="secondary">Premium Member</Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Profile Information Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              
              <div className="space-y-4">
                {profileFields.map((field, index) => {
                  const Icon = field.icon;
                  return (
                    <React.Fragment key={field.key}>
                      <div className="flex items-start space-x-3">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mt-1">
                          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {field.label}
                          </Label>
                          {isEditing ? (
                            <Input
                              type={field.type}
                              value={field.value}
                              onChange={(e) => 
                                setEditedUser(prev => ({ 
                                  ...prev, 
                                  [field.key]: e.target.value 
                                }))
                              }
                              className="w-full"
                            />
                          ) : (
                            <p className="text-gray-600 dark:text-gray-300">
                              {field.value}
                            </p>
                          )}
                        </div>
                      </div>
                      {index < profileFields.length - 1 && <Separator />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Security Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Security
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                    <Verified className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">Email Verified</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Verified
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                    <Verified className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">Phone Verified</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Verified
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1">
                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">Two-Factor Authentication</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Enabled
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Account Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 mb-6"
        >
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">156 days</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Member Since</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">₹2.5L</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Protected Amount</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}