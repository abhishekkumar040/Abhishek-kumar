import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { Dashboard } from './components/Dashboard';
import { HistoryPanel } from './components/HistoryPanel';
import { analyzeURL, type URLAnalysisResult, type FeatureData } from './utils/urlAnalyzer';

export type { URLAnalysisResult, FeatureData };

export default function App() {
  type TabType = 'scanner' | 'dashboard' | 'history';
  const [activeTab, setActiveTab] = useState<TabType>('scanner');
  const [results, setResults] = useState<URLAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanHistory, setScanHistory] = useState<URLAnalysisResult[]>([]);

  const handleScan = useCallback(async (url: string) => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate real-time processing delay (1-2 seconds as per paper)
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
    
    const analysisResult = analyzeURL(url);
    setResults(analysisResult);
    setScanHistory(prev => [analysisResult, ...prev].slice(0, 50));
    setIsAnalyzing(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'scanner' && (
        <main className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-2 gap-6 min-h-[calc(100vh-140px)]">
            {/* Left Panel - Input */}
            <InputPanel onScan={handleScan} isAnalyzing={isAnalyzing} />
            
            {/* Right Panel - Results */}
            <ResultsPanel results={results} isAnalyzing={isAnalyzing} />
          </div>
        </main>
      )}
      
      {activeTab === 'dashboard' && <Dashboard scanHistory={scanHistory} />}
      {activeTab === 'history' && <HistoryPanel history={scanHistory} />}
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>PhishGuard - Real-Time Phishing Detection System | Research by Abhishek K</p>
          <p className="mt-1">Acharya Institute of Technology, Bengaluru | Dept. of Computer Science & Engineering</p>
          <P © 2026 PhishGuard. All rights reserved. <P></P>
        </div>
      </footer>
    </div>
  );
}
