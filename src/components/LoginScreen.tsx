import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, User } from '../App';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogin: (user: User) => void;
}

export function LoginScreen({ onNavigate, onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [contact, setContact] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (contact) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') { // Mock OTP
      onLogin({
        name: 'John Doe',
        phone: loginMethod === 'phone' ? contact : '+1234567890',
        isGuest: false
      });
    }
  };

  const handleGuestLogin = () => {
    onLogin({
      name: 'Guest User',
      phone: '',
      isGuest: true
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header with Logo */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* PayGuard Logo */}
          <motion.div 
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg">
              <Shield className="h-12 w-12 text-white" />
            </div>
            {/* Badge/indicator */}
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full h-4 w-4 border-2 border-white dark:border-gray-800"></div>
          </motion.div>
          
          {/* Brand name and tagline */}
          <div className="text-center">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PayGuard
            </motion.h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Secure your financial journey
            </motion.p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-8">
        {step === 'login' ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 shadow-lg border-0 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Welcome Back</h2>
              
              {/* Login Method Selector */}
              <div className="flex space-x-2 mb-6">
                <Button
                  variant={loginMethod === 'phone' ? 'default' : 'outline'}
                  className="flex-1 py-3"
                  onClick={() => setLoginMethod('phone')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </Button>
                <Button
                  variant={loginMethod === 'email' ? 'default' : 'outline'}
                  className="flex-1 py-3"
                  onClick={() => setLoginMethod('email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>

              {/* Input Field */}
              <div className="mb-6">
                <Input
                  type={loginMethod === 'phone' ? 'tel' : 'email'}
                  placeholder={loginMethod === 'phone' ? 'Enter your phone number' : 'Enter your email'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="py-3 text-base"
                />
              </div>

              {/* Send OTP Button */}
              <Button 
                onClick={handleSendOTP}
                disabled={!contact}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700"
              >
                Send OTP
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Continue as Guest */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  onClick={handleGuestLogin}
                  className="w-full py-3 text-gray-600 dark:text-gray-300"
                >
                  Continue as Guest
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Limited Features
                  </Badge>
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 shadow-lg border-0 bg-white dark:bg-gray-800">
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('login')}
                  className="p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold ml-2 text-gray-900 dark:text-white">Verify OTP</h2>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've sent a 4-digit OTP to {contact}
              </p>

              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="py-3 text-base text-center text-2xl tracking-widest"
                  maxLength={4}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Demo OTP: 1234
                </p>
              </div>

              <Button 
                onClick={handleVerifyOTP}
                disabled={otp.length !== 4}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700"
              >
                Verify & Continue
              </Button>

              <Button
                variant="ghost"
                className="w-full py-3 mt-4 text-blue-600 dark:text-blue-400"
                onClick={handleSendOTP}
              >
                Didn't receive OTP? Resend
              </Button>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}