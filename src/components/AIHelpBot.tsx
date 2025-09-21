import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Shield,
  AlertTriangle,
  HelpCircle,
  Minimize2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIHelpBotProps {
  isVisible: boolean;
}

export function AIHelpBot({ isVisible }: AIHelpBotProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm PayGuard Assistant, your AI-powered fraud protection helper. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        'How to identify phishing scams?',
        'Report suspicious activity',
        'Check transaction safety',
        'Security best practices',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const mockAIResponses = {
    phishing: {
      content:
        'Here are key signs of phishing scams:\n\n• Urgent language demanding immediate action\n• Suspicious sender email addresses\n• Generic greetings like "Dear Customer"\n• Links that don\'t match the claimed website\n• Requests for personal/financial information\n\nAlways verify with the official company directly!',
      suggestions: ['How to report phishing?', 'What if I clicked a suspicious link?', 'Email security tips'],
    },
    suspicious: {
      content:
        'To report suspicious activity:\n\n1. Take screenshots of the suspicious content\n2. Note the date, time, and platform\n3. Use our "Report Scam" feature in the app\n4. Contact your bank if money is involved\n5. File a complaint with cyber crime authorities\n\nDon\'t delay - quick reporting helps protect others!',
      suggestions: ['File FIR online', 'Block suspicious numbers', 'Secure my account'],
    },
    transaction: {
      content:
        'To check if a transaction is safe:\n\n✅ Verify the merchant is legitimate\n✅ Check for HTTPS and security certificates\n✅ Use official payment apps only\n✅ Never share OTP or PIN\n✅ Review transaction details carefully\n\nUse our Quick Scan feature to verify suspicious payment requests!',
      suggestions: ['Scan suspicious link', 'UPI safety tips', 'Credit card security'],
    },
    security: {
      content:
        'Essential security practices:\n\n🔐 Enable 2-factor authentication\n🔐 Use strong, unique passwords\n🔐 Keep apps and OS updated\n🔐 Don\'t use public WiFi for banking\n🔐 Regular security checkups\n🔐 Monitor account statements\n\nStay vigilant and trust your instincts!',
      suggestions: ['Enable 2FA', 'Password manager tips', 'Safe browsing practices'],
    },
    default: {
      content:
        "I'm here to help with fraud prevention and security questions. You can ask me about:\n\n• Identifying scams and phishing\n• Reporting suspicious activities\n• Transaction security\n• Account protection\n• Emergency response\n\nWhat specific security concern can I help you with?",
      suggestions: ['Common scam types', 'Emergency contact info', 'Account recovery help'],
    },
  };

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    if (message.includes('phishing') || message.includes('email') || message.includes('link')) {
      return mockAIResponses.phishing;
    }
    if (message.includes('report') || message.includes('suspicious') || message.includes('scam')) {
      return mockAIResponses.suspicious;
    }
    if (message.includes('transaction') || message.includes('payment') || message.includes('upi')) {
      return mockAIResponses.transaction;
    }
    if (message.includes('security') || message.includes('safe') || message.includes('protect')) {
      return mockAIResponses.security;
    }
    return mockAIResponses.default;
  };

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isVisible) return null;

  return (
    <div>
      <AnimatePresence>
        {isExpanded ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative z-[100]"
            >
              <Card
                className="w-full max-w-[350px] h-[80vh] max-h-[500px] flex flex-col shadow-2xl border-2 border-blue-200 dark:border-blue-800 mx-2"
                style={{
                  width: '100vw',
                  maxWidth: '350px',
                  height: '80vh',
                  maxHeight: '500px',
                  margin: '0 auto',
                  boxSizing: 'border-box',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/20 rounded-full p-1">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">PayGuard Assistant</h3>
                      <p className="text-xs text-blue-100">AI-powered help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="p-1 h-auto text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-2">
                        <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.type === 'bot' && (
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mt-1">
                                  <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-line">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              {message.type === 'user' && (
                                <div className="bg-white/20 rounded-full p-1 mt-1">
                                  <User className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Suggestions */}
                        {message.type === 'bot' && message.suggestions && (
                          <div className="flex flex-wrap gap-2 ml-8">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs h-auto py-1 px-2 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-sm max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1">
                              <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about fraud prevention..."
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className="fixed bottom-20 right-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Button
                onClick={() => setIsExpanded(true)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 relative"
              >
                <MessageCircle className="h-6 w-6 text-white" />
                {/* Notification Dot */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></div>
              </Button>
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.3 }}
                className="absolute right-16 top-2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
              >
                Need help? Ask me anything!
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-700"></div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}