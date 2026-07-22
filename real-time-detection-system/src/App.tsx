import { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { Dashboard } from './components/Dashboard';
import { HistoryPanel } from './components/HistoryPanel';
import { analyzeURL, getHostname, type URLAnalysisResult, type FeatureData } from './utils/urlAnalyzer';
import { fetchDomainIntelligence } from './utils/domainIntel';

export type { URLAnalysisResult, FeatureData };

export default function App() {
  type TabType = 'scanner' | 'dashboard' | 'history';
  const [activeTab, setActiveTab] = useState<TabType>('scanner');
  const [results, setResults] = useState<URLAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanHistory, setScanHistory] = useState<URLAnalysisResult[]>([]);
  // Guards against a slow domain-intel response from an earlier scan landing
  // after the user has already kicked off (and is now looking at) a newer one.
  const latestScanId = useRef(0);

  const handleScan = useCallback(async (url: string) => {
    const scanId = ++latestScanId.current;
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate real-time processing delay (1-2 seconds as per paper)
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    if (scanId !== latestScanId.current) return; // superseded by a newer scan
    
    const heuristicResult: URLAnalysisResult = {
      ...analyzeURL(url),
      domainIntel: { status: 'pending', domainAgeDays: null, registrar: null, isBlocklisted: false, blocklistSource: null },
    };
    setResults(heuristicResult);
    setScanHistory(prev => [heuristicResult, ...prev].slice(0, 50));
    setIsAnalyzing(false);

    // Live domain intelligence (registration age + threat-feed match) loads
    // in the background so the instant heuristic verdict isn't held up by it.
    const hostname = getHostname(url);
    const domainIntel = hostname
      ? await fetchDomainIntelligence(hostname)
      : { status: 'error' as const, domainAgeDays: null, registrar: null, isBlocklisted: false, blocklistSource: null };

    if (scanId !== latestScanId.current) return; // superseded while the lookup was in flight

    setResults(prev => (prev && prev.url === url ? { ...prev, domainIntel } : prev));
    setScanHistory(prev => {
      if (prev.length === 0 || prev[0].url !== url) return prev;
      const updated = [...prev];
      updated[0] = { ...updated[0], domainIntel };
      return updated;
    });
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
          <p>PhishGuard - Real-Time Phishing Detection System | Research by Soniya R, Srikant SP, Abhishek K, Gagan M</p>
          <p className="mt-1">Acharya Institute of Technology, Bengaluru | Dept. of Computer Science & Engineering</p>
          <p className="mt-1 text-xs">&copy; 2026 PhishGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
