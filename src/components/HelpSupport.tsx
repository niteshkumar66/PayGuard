import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import type { Screen } from '../App';

interface HelpSupportProps {
  onNavigate: (screen: Screen, caseId?: string | number) => void;
}

export function HelpSupport({ onNavigate }: HelpSupportProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'chat' | 'contact'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Hello! I\'m PayGuard AI Assistant. How can I help you today?',
      timestamp: '10:30 AM'
    }
  ]);

  const faqs = [
    {
      id: 1,
      question: 'How does PayGuard detect fraud?',
      answer: 'PayGuard uses advanced AI algorithms to analyze transaction patterns, verify sender authenticity, check URL reputation, and cross-reference with our global fraud database to provide real-time fraud detection.',
      category: 'Detection'
    },
    {
      id: 2,
      question: 'What should I do if I receive a suspicious message?',
      answer: 'Use our Quick Scan feature to paste the suspicious content. PayGuard will analyze it instantly and provide a risk assessment with recommended actions.',
      category: 'Prevention'
    },
    {
      id: 3,
      question: 'How long does money tracing take?',
      answer: 'Money tracing typically takes 24-72 hours. Our system works with banking partners to track fraudulent transactions and freeze accounts when possible.',
      category: 'Recovery'
    },
    {
      id: 4,
      question: 'Can I file an FIR directly through the app?',
      answer: 'Yes! PayGuard provides an automated FIR generation feature that pre-fills case details and submits them directly to the cyber crime authorities.',
      category: 'Legal'
    },
    {
      id: 5,
      question: 'Is my personal data safe with PayGuard?',
      answer: 'Absolutely. We use end-to-end encryption, store minimal data locally, and follow strict privacy policies. Your data is never shared with third parties without consent.',
      category: 'Privacy'
    },
    {
      id: 6,
      question: 'What is the success rate of money recovery?',
      answer: 'Our success rate varies by case complexity, but we achieve 70-80% recovery for cases reported within 24 hours of the fraud incident.',
      category: 'Recovery'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        sender: 'user',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory([...chatHistory, newMessage]);
      setChatMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatHistory.length + 2,
          sender: 'bot',
          message: 'Thank you for your question. I\'m processing your request and will provide assistance shortly. For immediate help with fraud detection, please use our Quick Scan feature on the dashboard.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings', undefined)}
            className="p-2 mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Help & Support</h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4">
        <div className="flex space-x-6">
          {[
            { id: 'faq', label: 'FAQs', icon: Search },
            { id: 'chat', label: 'AI Chat', icon: MessageCircle },
            { id: 'contact', label: 'Contact', icon: Phone }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-3 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'faq' && (
          <div className="px-4 py-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            {/* FAQ Categories */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Badge variant="secondary" className="text-xs mr-2">
                                {faq.category}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white text-left">
                              {faq.question}
                            </h3>
                          </div>
                          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
              {chatHistory.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`flex-shrink-0 ${
                      message.sender === 'user' ? 'ml-2' : 'mr-2'
                    }`}>
                      {message.sender === 'bot' ? (
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      ) : (
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                          <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100 dark:text-blue-200' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask PayGuard AI..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendChatMessage}
                  disabled={!chatMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Emergency Contact */}
              <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-4">Emergency Fraud Hotline</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call: 1800-FRAUD-HELP
                  </Button>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Available 24/7 for immediate fraud assistance
                  </p>
                </div>
              </Card>

              {/* Regular Support */}
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">support@payguard.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Phone Support</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">1800-PAY-GUARD</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Live Chat</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Available Mon-Fri, 9AM-6PM</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Office Information */}
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Office</h3>
                <div className="text-gray-600 dark:text-gray-400">
                  <p>PayGuard Technologies Pvt. Ltd.</p>
                  <p>Cyber Security Division</p>
                  <p>123, Tech Park, Bangalore - 560001</p>
                  <p>Karnataka, India</p>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}