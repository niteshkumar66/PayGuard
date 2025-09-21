import ReportFraud from "./components/ReportFraud";
import ReportsList from "./components/ReportsList";
import Scanner from "./components/Scanner";
import { scanLink, createCase, generateFIR, getCases, getAlerts } from "./api";
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { FraudAlertDetail } from './components/FraudAlertDetail';
import { MoneyTracingFlow } from './components/MoneyTracingFlow';
import { FIRForm } from './components/FIRForm';
import { CaseTracker, Case } from './components/CaseTracker';
import { Settings } from './components/Settings';
import { HelpSupport } from './components/HelpSupport';
import { ProfileInformation } from './components/ProfileInformation';
import { PrivacySecurity } from './components/PrivacySecurity';
import { NotificationsScreen } from './components/NotificationsScreen';
import { AIHelpBot } from './components/AIHelpBot';
import { SMSFraudPopup } from './components/SMSFraudPopup';
import { analyzeContentWithAI } from './components/AIFraudDetectionService';
import type { SMSMessage } from './components/SMSMonitoringService';
import { BottomNavigation, Alert } from './components/BottomNavigation';

export type Screen =
  | 'splash'
  | 'login'
  | 'otp'
  | 'dashboard'
  | 'fraud-detail'
  | 'money-trace'
  | 'fir-form'
  | 'case-tracker'
  | 'case-detail'
  | 'settings'
  | 'help'
  | 'profile'
  | 'privacy-security'
  | 'notifications';   


export interface User {
  name: string;
  phone: string;
  isGuest: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [refreshReports, setRefreshReports] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSMSAlert, setCurrentSMSAlert] = useState<SMSMessage | null>(null);
  const [blockedNumbers, setBlockedNumbers] = useState<string[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | number | null>(null);

  // Mock alert data with different priority levels
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      priority: 'high',
      message: 'Suspicious UPI transaction of ₹15,000 blocked to unknown merchant ID: fake_pay@ybl'
    },
    {
      id: '2', 
      priority: 'medium',
      message: 'New device login detected from Mumbai, Maharashtra. Verify if this was you.'
    },
    {
      id: '3',
      priority: 'low',
      message: 'Security scan completed - 3 potential threats found and neutralized automatically'
    }
  ]);

  useEffect(() => {
    // Auto-transition from splash to login after 3 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigateToScreen = (screen: Screen, caseId?: string | number) => {
    setCurrentScreen(screen);
    if (screen === 'case-detail' && caseId) {
      setSelectedCaseId(caseId);
    }
  };

  const loginUser = (userData: User) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Quick Scan Fraud Detection Handler
  const handleQuickScan = async (content: string) => {
    // Extract links from content
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/g;
    const links = content.match(linkRegex) || [];
    
    // Analyze content for fraud patterns using AI
    const analysis = await analyzeContentWithAI(content, 'Quick Scan Analysis', links);
    
    // Create a mock SMS message for the popup
    const scanResult: SMSMessage = {
      id: `scan_${Date.now()}`,
      sender: 'Quick Scan Analysis',
      content: content,
      timestamp: new Date(),
      links: links,
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      detectedThreats: analysis.detectedThreats,
      confidence: analysis.confidence,
      aiInsights: analysis.aiInsights
    };
    
    // Always show popup for quick scan results
    setCurrentSMSAlert(scanResult);
  };

  const handleBlockNumber = (number: string) => {
    setBlockedNumbers(prev => [...prev, number]);
    setCurrentSMSAlert(null);
    // Show success notification (could be enhanced with toast)
    console.log(`Number ${number} blocked successfully`);
  };

  const handleReportScam = () => {
    setCurrentSMSAlert(null);
    // Example: Add a new case when reporting a scam
    const newCase: Case = {
      id: `case_${Date.now()}`,
      firNumber: `FIR-${Date.now()}`,
      caseType: 'Phishing Fraud Case',
      amountLost: '15000',
      amountRecovered: '0',
      daysActive: '1',
      location: 'Cyber Crime Cell, Mumbai',
      officer: 'SI Rajesh Kumar',
      timeline: [
        {
          title: 'Case Filed',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          details: 'FIR submitted successfully. Case registered by user.'
        }
      ]
    };
    setCases(prev => [...prev, newCase]);
    setCurrentScreen('fir-form');
  };

  const handleMarkSafe = () => {
    setCurrentSMSAlert(null);
    // Could add to safe list for future reference
    console.log('Message marked as safe');
  };

  const handleCloseSMSAlert = () => {
    setCurrentSMSAlert(null);
  };

  // Map screens to bottom navigation tabs
  const getActiveTab = (): 'home' | 'alerts' | 'fir' | 'trace' | 'settings' => {
    switch (currentScreen) {
      case 'dashboard':
      case 'notifications':
        return 'home';
      case 'fraud-detail':
        return 'alerts';
      case 'fir-form':
      case 'case-tracker':
        return 'fir';
      case 'money-trace':
        return 'trace';
      case 'settings':
      case 'help':
      case 'profile':
      case 'privacy-security':
        return 'settings';
      default:
        return 'home';
    }
  };

  // Handle bottom navigation tab changes
  const handleTabChange = (tab: 'home' | 'alerts' | 'fir' | 'trace' | 'settings') => {
    switch (tab) {
      case 'home':
        setCurrentScreen('dashboard');
        break;
      case 'alerts':
        setCurrentScreen('fraud-detail');
        break;
      case 'fir':
        setCurrentScreen('fir-form');
        break;
      case 'trace':
        setCurrentScreen('money-trace');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
    }
  };

  // Determine if bottom navigation should be shown
  const shouldShowBottomNav = !['splash', 'login', 'otp'].includes(currentScreen);

  // Determine if AI Help Bot should be shown
  const shouldShowAIBot = !['splash', 'login', 'otp'].includes(currentScreen);

  return (
    <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen relative overflow-hidden">
        {/* Main content with bottom padding when navigation is visible */}
        <div className={`min-h-screen ${shouldShowBottomNav ? 'pb-16' : ''}`}>
          {currentScreen === 'splash' && (
            <SplashScreen />
          )}
          
          {currentScreen === 'login' && (
            <LoginScreen 
              onNavigate={navigateToScreen}
              onLogin={loginUser}
            />
          )}
          
          {currentScreen === 'dashboard' && (
            <Dashboard 
              user={user}
              onNavigate={navigateToScreen}
              onLogout={logout}
              alerts={alerts}
              onQuickScan={handleQuickScan}
            />
          )}
          
          {currentScreen === 'fraud-detail' && (
            <FraudAlertDetail 
              onNavigate={navigateToScreen}
            />
          )}
          
          {currentScreen === 'money-trace' && (
            <MoneyTracingFlow 
              onNavigate={navigateToScreen}
            />
          )}
          
          {currentScreen === 'fir-form' && (
            <FIRForm 
              user={user}
              onNavigate={navigateToScreen}
              onSubmitFIR={newCase => {
                setCases(prev => {
                  if (prev.length === 0) {
                    // If no case exists, add the new case
                    return [newCase];
                  }
                  // Otherwise, append a new timeline step to the first case
                  const updatedCases = [...prev];
                  updatedCases[0] = {
                    ...updatedCases[0],
                    timeline: [
                      ...updatedCases[0].timeline,
                      {
                        title: 'Case Filed',
                        date: newCase.date,
                        time: newCase.time,
                        details: `FIR submitted successfully with reference number ${newCase.firNumber}. Case registered at Cyber Crime Cell, Mumbai`,
                        firDetails: {
                          complainantName: newCase.complainantName,
                          complainantPhone: newCase.complainantPhone,
                          complainantEmail: newCase.complainantEmail,
                          transactionId: newCase.transactionId,
                          amountLost: newCase.amountLost,
                          suspiciousNumber: newCase.suspiciousNumber,
                          bankAccount: newCase.bankAccount,
                          incidentDescription: newCase.incidentDescription,
                          evidenceDetails: newCase.evidenceDetails
                        }
                      }
                    ]
                  };
                  return updatedCases;
                });
              }}
            />
          )}
          
          {currentScreen === 'case-tracker' && (
            <CaseTracker 
              onNavigate={navigateToScreen}
              cases={cases}
            />
          )}

          {currentScreen === 'case-detail' && selectedCaseId && (
            (() => {
              const caseData = cases.find(c => c.id === selectedCaseId);
              if (!caseData) return <div className="p-6">Case not found.</div>;
              const CaseDetail = require('./components/CaseDetail').CaseDetail;
              return <CaseDetail caseData={caseData} onNavigate={navigateToScreen} />;
            })()
          )}
          
          {currentScreen === 'settings' && (
            <Settings 
              onNavigate={navigateToScreen}
              onLogout={logout}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          )}
          
          {currentScreen === 'help' && (
            <HelpSupport 
              onNavigate={navigateToScreen}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileInformation 
              user={user}
              onNavigate={navigateToScreen}
            />
          )}

          {currentScreen === 'privacy-security' && (
            <PrivacySecurity 
              onNavigate={navigateToScreen}
            />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsScreen 
              onNavigate={navigateToScreen}
              alerts={alerts}
            />
          )}
        </div>

        {/* Fixed Bottom Navigation */}
        {shouldShowBottomNav && (
          <BottomNavigation 
            activeTab={getActiveTab()}
            onTabChange={handleTabChange}
            alerts={alerts}
          />
        )}

        {/* AI Help Bot */}
        <AIHelpBot isVisible={shouldShowAIBot} />

        {/* Quick Scan Fraud Popup */}
        <SMSFraudPopup
          message={currentSMSAlert}
          onClose={handleCloseSMSAlert}
          onBlockNumber={handleBlockNumber}
          onReportScam={handleReportScam}
          onMarkSafe={handleMarkSafe}
        />
      </div>
    </div>
  );
}

export default App;