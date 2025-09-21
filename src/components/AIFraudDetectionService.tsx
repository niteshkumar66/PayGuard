interface FraudAnalysisResult {
  riskLevel: 'safe' | 'suspicious' | 'fraud';
  riskScore: number;
  detectedThreats: string[];
  confidence: number;
  aiInsights: string[];
}

interface URLAnalysis {
  domain: string;
  isShortened: boolean;
  isDangerous: boolean;
  reputation: 'trusted' | 'unknown' | 'suspicious' | 'malicious';
  threatTypes: string[];
}

export class AIFraudDetectionService {
  // Known trusted domains database
  private static trustedDomains = new Set([
    'amazon.com', 'amazon.in', 'flipkart.com', 'myntra.com',
    'paytm.com', 'phonepe.com', 'googlepay.com', 'bhim.com',
    'sbi.co.in', 'hdfcbank.com', 'icicibank.com', 'axisbank.com',
    'google.com', 'facebook.com', 'whatsapp.com', 'instagram.com',
    'youtube.com', 'microsoft.com', 'apple.com', 'netflix.com',
    'gov.in', 'uidai.gov.in', 'mygov.in', 'digitalindia.gov.in'
  ]);

  // Known malicious/suspicious patterns
  private static suspiciousDomains = new Set([
    'bit.ly', 'tinyurl.com', 't.co', 'ow.ly', 'short.link',
    'cutt.ly', 'rebrand.ly', 'tiny.cc', 'is.gd', 'v.gd'
  ]);

  // Phishing keywords and patterns
  private static phishingPatterns = [
    // Urgency indicators
    'urgent', 'immediate', 'expire', 'expires', 'suspend', 'suspended',
    'block', 'blocked', 'deactivate', 'verify now', 'act now', 'limited time',
    
    // Financial threats
    'account compromised', 'unauthorized transaction', 'security breach',
    'suspicious activity', 'fraudulent activity', 'card blocked',
    
    // Fake rewards/prizes
    'congratulations', 'winner', 'won', 'prize', 'lottery', 'jackpot',
    'lucky draw', 'reward', 'cashback', 'bonus', 'free money',
    
    // Impersonation indicators
    'bank notification', 'government notice', 'tax refund', 'covid certificate',
    'vaccination', 'subsidy', 'scheme', 'benefit',
    
    // Social engineering
    'click here', 'download now', 'install app', 'update required',
    'confirm identity', 'provide details', 'share otp', 'enter pin'
  ];

  // Advanced URL analysis using AI-like pattern recognition
  static analyzeURL(url: string): URLAnalysis {
    const domain = this.extractDomain(url);
    const analysis: URLAnalysis = {
      domain,
      isShortened: false,
      isDangerous: false,
      reputation: 'unknown',
      threatTypes: []
    };

    // Check if it's a shortened URL
    analysis.isShortened = this.suspiciousDomains.has(domain) || 
      this.isLikelyShortened(url);

    // Determine domain reputation
    if (this.trustedDomains.has(domain)) {
      analysis.reputation = 'trusted';
    } else if (this.suspiciousDomains.has(domain)) {
      analysis.reputation = 'suspicious';
      analysis.threatTypes.push('Shortened URL service');
    } else if (this.isSuspiciousDomain(domain)) {
      analysis.reputation = 'malicious';
      analysis.isDangerous = true;
      analysis.threatTypes.push(...this.getDomainThreats(domain));
    }

    // Protocol analysis
    if (url.startsWith('http://') && !url.startsWith('https://')) {
      analysis.threatTypes.push('Insecure HTTP connection');
    }

    // Suspicious URL patterns
    if (this.hasSuspiciousUrlPattern(url)) {
      analysis.isDangerous = true;
      analysis.threatTypes.push('Suspicious URL structure');
    }

    return analysis;
  }

  // Main AI fraud detection function
  static async analyzeContent(content: string, sender: string = 'Unknown'): Promise<FraudAnalysisResult> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const analysis: FraudAnalysisResult = {
      riskLevel: 'safe',
      riskScore: 0,
      detectedThreats: [],
      confidence: 0,
      aiInsights: []
    };

    // Extract and analyze URLs
    const urls = this.extractURLs(content);
    let urlRiskScore = 0;
    
    for (const url of urls) {
      const urlAnalysis = this.analyzeURL(url);
      
      if (urlAnalysis.isDangerous || urlAnalysis.reputation === 'malicious') {
        urlRiskScore += 40;
        analysis.detectedThreats.push(...urlAnalysis.threatTypes);
        analysis.aiInsights.push(`Dangerous domain detected: ${urlAnalysis.domain}`);
      } else if (urlAnalysis.reputation === 'suspicious' || urlAnalysis.isShortened) {
        urlRiskScore += 25;
        analysis.detectedThreats.push(...urlAnalysis.threatTypes);
        analysis.aiInsights.push(`Suspicious URL pattern: ${urlAnalysis.domain}`);
      } else if (urlAnalysis.reputation === 'trusted') {
        urlRiskScore -= 10; // Reduce risk for trusted domains
        analysis.aiInsights.push(`Trusted domain verified: ${urlAnalysis.domain}`);
      }
    }

    // Content analysis using NLP-like pattern matching
    const contentRisk = this.analyzeContentPatterns(content.toLowerCase());
    analysis.detectedThreats.push(...contentRisk.threats);
    analysis.aiInsights.push(...contentRisk.insights);

    // Sender analysis
    const senderRisk = this.analyzeSender(sender);
    analysis.detectedThreats.push(...senderRisk.threats);

    // Calculate final risk score
    analysis.riskScore = Math.min(100, Math.max(0, 
      urlRiskScore + contentRisk.score + senderRisk.score
    ));

    // Determine risk level and confidence
    if (analysis.riskScore >= 75) {
      analysis.riskLevel = 'fraud';
      analysis.confidence = Math.min(95, 70 + (analysis.riskScore - 75));
    } else if (analysis.riskScore >= 45) {
      analysis.riskLevel = 'suspicious';
      analysis.confidence = Math.min(85, 60 + (analysis.riskScore - 45));
    } else {
      analysis.riskLevel = 'safe';
      analysis.confidence = Math.min(90, 80 - analysis.riskScore);
    }

    // Add AI confidence insights
    if (analysis.confidence > 85) {
      analysis.aiInsights.push(`High confidence analysis (${analysis.confidence}%)`);
    } else if (analysis.confidence < 60) {
      analysis.aiInsights.push(`Low confidence - manual review recommended`);
    }

    return analysis;
  }

  // Helper methods
  private static extractDomain(url: string): string {
    try {
      // Remove protocol
      let domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
      // Remove path and query parameters
      domain = domain.split('/')[0].split('?')[0];
      return domain.toLowerCase();
    } catch {
      return url.toLowerCase();
    }
  }

  private static extractURLs(content: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/g;
    return content.match(urlRegex) || [];
  }

  private static isLikelyShortened(url: string): boolean {
    const domain = this.extractDomain(url);
    // Check for short domain patterns
    const shortPatterns = [
      /^[a-z]{1,3}\.[a-z]{2,3}$/, // Very short domains like t.co
      /^[a-z0-9]{1,6}\.(com|net|org|ly|me|co)$/, // Short branded domains
    ];
    
    return shortPatterns.some(pattern => pattern.test(domain));
  }

  private static isSuspiciousDomain(domain: string): boolean {
    const suspiciousPatterns = [
      // Typosquatting patterns
      /amazon[0-9]/, /paytm[0-9]/, /google[0-9]/, /facebook[0-9]/,
      /bank.*secure/, /.*-secure/, /secure-.*/, /verify-.*/,
      /.*-verification/, /.*-update/, /.*-login/,
      
      // Common phishing patterns
      /fake.*/, /scam.*/, /phish.*/, /malware.*/,
      /free.*money/, /easy.*cash/, /instant.*loan/,
      
      // Suspicious TLDs with banking terms
      /bank.*\.(tk|ml|ga|cf)/, /pay.*\.(tk|ml|ga|cf)/,
      
      // Random character patterns
      /[a-z]{20,}/, // Very long random strings
      /[0-9]{8,}/, // Long number sequences
    ];

    return suspiciousPatterns.some(pattern => pattern.test(domain));
  }

  private static getDomainThreats(domain: string): string[] {
    const threats: string[] = [];
    
    if (/bank|pay|financial|secure/.test(domain)) {
      threats.push('Potential financial phishing');
    }
    if (/amazon|flipkart|shopping/.test(domain)) {
      threats.push('E-commerce impersonation');
    }
    if (/gov|government|tax|covid/.test(domain)) {
      threats.push('Government impersonation');
    }
    if (this.isLikelyShortened(domain)) {
      threats.push('URL shortening service');
    }
    
    return threats;
  }

  private static hasSuspiciousUrlPattern(url: string): boolean {
    const suspiciousPatterns = [
      /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, // IP addresses
      /[a-z0-9]{20,}/, // Very long random strings
      /.*phish.*/, /.*scam.*/, /.*fake.*/,
      /.*\.(tk|ml|ga|cf|pw)/, // Suspicious TLDs
      /%[0-9a-f]{2}/i, // URL encoding (potential obfuscation)
    ];

    return suspiciousPatterns.some(pattern => pattern.test(url));
  }

  private static analyzeContentPatterns(content: string) {
    const result = {
      score: 0,
      threats: [] as string[],
      insights: [] as string[]
    };

    // Check for phishing patterns
    for (const pattern of this.phishingPatterns) {
      if (content.includes(pattern.toLowerCase())) {
        result.score += 15;
        result.threats.push(`Phishing keyword: "${pattern}"`);
      }
    }

    // Financial amount analysis
    const amountMatches = content.match(/₹[\d,]+|rs\.?\s*[\d,]+|\$[\d,]+/gi);
    if (amountMatches) {
      const amounts = amountMatches.map(match => {
        const num = parseInt(match.replace(/[₹$rs,.\s]/gi, ''));
        return num;
      });
      
      const maxAmount = Math.max(...amounts);
      if (maxAmount > 50000) {
        result.score += 20;
        result.threats.push('High-value transaction mentioned');
        result.insights.push(`Large amount detected: ₹${maxAmount.toLocaleString()}`);
      }
    }

    // Urgency indicators
    const urgencyWords = ['urgent', 'immediate', 'expire', 'suspend', 'block'];
    const urgencyCount = urgencyWords.filter(word => content.includes(word)).length;
    if (urgencyCount > 0) {
      result.score += urgencyCount * 10;
      result.threats.push('Urgency-based manipulation');
      result.insights.push(`${urgencyCount} urgency indicators found`);
    }

    // Personal information requests
    const infoRequests = ['otp', 'pin', 'password', 'card number', 'cvv', 'aadhar'];
    const requestCount = infoRequests.filter(req => content.includes(req)).length;
    if (requestCount > 0) {
      result.score += requestCount * 20;
      result.threats.push('Personal information request');
      result.insights.push('Requests sensitive information');
    }

    return result;
  }

  private static analyzeSender(sender: string) {
    const result = {
      score: 0,
      threats: [] as string[]
    };

    // Check for suspicious sender patterns
    if (sender.match(/^\+?\d{10,15}$/)) {
      // It's a phone number
      if (sender.includes('+91-99999') || sender.includes('88888')) {
        result.score += 25;
        result.threats.push('Suspicious phone number pattern');
      }
    } else if (sender !== 'Quick Scan Analysis' && sender !== 'Unknown') {
      // It's a sender ID - check for impersonation
      const suspiciousSenders = ['BANK', 'GOV', 'GOVT', 'PAYTM', 'AMAZON', 'REWARD'];
      if (suspiciousSenders.some(sus => sender.toUpperCase().includes(sus))) {
        result.score += 15;
        result.threats.push('Potential sender impersonation');
      }
    }

    return result;
  }
}

// Utility function for easy integration
export async function analyzeContentWithAI(
  content: string, 
  sender: string = 'Quick Scan', 
  links: string[] = []
): Promise<{
  riskLevel: 'safe' | 'suspicious' | 'fraud';
  riskScore: number;
  detectedThreats: string[];
  confidence: number;
  aiInsights: string[];
}> {
  const analysis = await AIFraudDetectionService.analyzeContent(content, sender);
  
  return {
    riskLevel: analysis.riskLevel,
    riskScore: analysis.riskScore,
    detectedThreats: analysis.detectedThreats,
    confidence: analysis.confidence,
    aiInsights: analysis.aiInsights
  };
}