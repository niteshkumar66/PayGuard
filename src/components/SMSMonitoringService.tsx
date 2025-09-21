import { useEffect, useState } from 'react';

export interface SMSMessage {
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

interface SMSMonitoringServiceProps {
  onNewSMS: (message: SMSMessage) => void;
  isActive: boolean;
}

// Mock SMS messages for demonstration
const mockSMSMessages: Omit<SMSMessage, 'id' | 'timestamp'>[] = [
  {
    sender: '+91-98765-43210',
    content: 'URGENT! Your bank account has been compromised. Click here to secure it immediately: http://fake-bank-secure.com/verify-now',
    links: ['http://fake-bank-secure.com/verify-now'],
    riskLevel: 'fraud',
    riskScore: 95,
    detectedThreats: [
      'Phishing URL detected',
      'Urgency-based manipulation',
      'Fake banking domain',
      'Account compromise claim'
    ]
  },
  {
    sender: 'REWARD',
    content: 'Congratulations! You have won ₹50,000 in our lucky draw. Claim now: bit.ly/claim-prize-xyz',
    links: ['bit.ly/claim-prize-xyz'],
    riskLevel: 'fraud',
    riskScore: 92,
    detectedThreats: [
      'Prize scam pattern',
      'Shortened URL (suspicious)',
      'Unrealistic reward amount',
      'Immediate action required'
    ]
  },
  {
    sender: '+91-87654-32109',
    content: 'Hi, I am calling from your mobile network. Your SIM will be blocked in 2 hours. Call 18001234567 to reactivate.',
    links: [],
    riskLevel: 'suspicious',
    riskScore: 78,
    detectedThreats: [
      'SIM blocking threat',
      'Impersonation attempt',
      'Time pressure tactics'
    ]
  },
  {
    sender: 'AMAZON',
    content: 'Your Amazon order #123456789 has been dispatched. Track your order: https://amazon.in/track/order/123456789',
    links: ['https://amazon.in/track/order/123456789'],
    riskLevel: 'safe',
    riskScore: 15,
    detectedThreats: []
  },
  {
    sender: 'PAYTM',
    content: 'Your Paytm wallet has been credited with ₹100 as cashback for your recent transaction. Check balance: https://paytm.com/balance',
    links: ['https://paytm.com/balance'],
    riskLevel: 'safe',
    riskScore: 10,
    detectedThreats: []
  },
  {
    sender: '+91-99887-76655',
    content: 'Your COVID vaccination certificate is ready. Download from: gov-covid-cert.in/download',
    links: ['gov-covid-cert.in/download'],
    riskLevel: 'suspicious',
    riskScore: 85,
    detectedThreats: [
      'Fake government domain',
      'Health-related scam',
      'Document fraud attempt'
    ]
  },
  {
    sender: 'HDFC',
    content: 'Alert: Transaction of ₹25,000 debited from A/C **1234. If not done by you, visit https://netbanking.hdfcbank.com immediately.',
    links: ['https://netbanking.hdfcbank.com'],
    riskLevel: 'safe',
    riskScore: 20,
    detectedThreats: []
  },
  {
    sender: '+91-98888-88888',
    content: 'Congratulations! WhatsApp is giving free internet for 1 year. Forward this message to 10 friends: wa.me/share-internet',
    links: ['wa.me/share-internet'],
    riskLevel: 'fraud',
    riskScore: 88,
    detectedThreats: [
      'Chain message scam',
      'False promise of free service',
      'Social engineering attack',
      'Fake WhatsApp promotion'
    ]
  }
];

export function SMSMonitoringService({ onNewSMS, isActive }: SMSMonitoringServiceProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // Simulate incoming SMS messages at random intervals
    const scheduleNextMessage = () => {
      const delay = Math.random() * 20000 + 15000; // Random delay between 15-35 seconds
      
      setTimeout(() => {
        if (messageIndex < mockSMSMessages.length) {
          const messageTemplate = mockSMSMessages[messageIndex];
          const newMessage: SMSMessage = {
            ...messageTemplate,
            id: `sms_${Date.now()}_${messageIndex}`,
            timestamp: new Date()
          };
          
          onNewSMS(newMessage);
          setMessageIndex(prev => (prev + 1) % mockSMSMessages.length);
        }
        
        // Schedule next message
        scheduleNextMessage();
      }, delay);
    };

    // Start with first message after 10 seconds
    const initialTimer = setTimeout(() => {
      if (messageIndex < mockSMSMessages.length) {
        const messageTemplate = mockSMSMessages[messageIndex];
        const newMessage: SMSMessage = {
          ...messageTemplate,
          id: `sms_${Date.now()}_${messageIndex}`,
          timestamp: new Date()
        };
        
        onNewSMS(newMessage);
        setMessageIndex(prev => (prev + 1) % mockSMSMessages.length);
        
        // Schedule subsequent messages
        scheduleNextMessage();
      }
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [isActive, onNewSMS, messageIndex]);

  // This is a service component, so it doesn't render anything
  return null;
}

// Utility function to analyze SMS content for fraud patterns
export function analyzeSMSContent(content: string, sender: string, links: string[]): {
  riskLevel: 'safe' | 'suspicious' | 'fraud';
  riskScore: number;
  detectedThreats: string[];
  confidence?: number;
  aiInsights?: string[];
} {
  const threats: string[] = [];
  let riskScore = 0;

  // Check for urgency words
  const urgencyWords = ['urgent', 'immediate', 'expire', 'block', 'suspend', 'limited time', 'act now'];
  urgencyWords.forEach(word => {
    if (content.toLowerCase().includes(word)) {
      threats.push('Urgency-based manipulation');
      riskScore += 15;
    }
  });

  // Check for financial threats
  const financialThreats = ['account', 'bank', 'credit card', 'debit', 'transaction', 'payment'];
  financialThreats.forEach(word => {
    if (content.toLowerCase().includes(word)) {
      riskScore += 10;
    }
  });

  // Check for prize/reward scams
  const prizeWords = ['won', 'winner', 'congratulations', 'prize', 'reward', 'lucky'];
  prizeWords.forEach(word => {
    if (content.toLowerCase().includes(word)) {
      threats.push('Prize scam pattern');
      riskScore += 20;
    }
  });

  // Check links for suspicious patterns
  links.forEach(link => {
    if (link.includes('bit.ly') || link.includes('tinyurl') || link.includes('t.co')) {
      threats.push('Shortened URL (suspicious)');
      riskScore += 25;
    }
    
    if (!link.startsWith('https://')) {
      threats.push('Insecure link (HTTP)');
      riskScore += 20;
    }
    
    // Check for suspicious domains
    const suspiciousDomains = ['-secure', 'fake-', 'verify-', 'update-', 'confirm-'];
    suspiciousDomains.forEach(pattern => {
      if (link.includes(pattern)) {
        threats.push('Suspicious domain pattern');
        riskScore += 30;
      }
    });
  });

  // Check sender patterns
  if (sender.includes('+') && sender.length > 15) {
    threats.push('Suspicious phone number format');
    riskScore += 15;
  }

  // Determine risk level
  let riskLevel: 'safe' | 'suspicious' | 'fraud' = 'safe';
  if (riskScore >= 70) {
    riskLevel = 'fraud';
  } else if (riskScore >= 40) {
    riskLevel = 'suspicious';
  }

  return {
    riskLevel,
    riskScore: Math.min(riskScore, 100),
    detectedThreats: threats
  };
}