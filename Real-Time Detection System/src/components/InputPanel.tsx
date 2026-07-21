import { useState } from 'react';

interface InputPanelProps {
  onScan: (url: string) => void;
  isAnalyzing: boolean;
}

const SAMPLE_URLS = [
  { url: 'https://www.google.com/search?q=phishing+detection', label: 'Google (Safe)' },
  { url: 'http://192.168.1.1/login/secure/account/update', label: 'IP Address (Phishing)' },
  { url: 'https://github.com/facebook/react', label: 'GitHub (Safe)' },
  { url: 'http://secure-banking-login.xyz/verify-account?id=12345', label: 'Suspicious TLD' },
  { url: 'bit.ly/3xK9mPq', label: 'URL Shortener' },
  { url: 'https://amazon.com/dp/B08N5WRWNW', label: 'Amazon (Safe)' },
];

export function InputPanel({ onScan, isAnalyzing }: InputPanelProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onScan(url.trim());
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* URL Input Card */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">URL Scanner</h2>
            <p className="text-xs text-slate-400">Enter or paste a URL to analyze</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or example.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              disabled={isAnalyzing}
            />
          </div>
          
          <button
            type="submit"
            disabled={isAnalyzing || !url.trim()}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              isAnalyzing || !url.trim()
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing URL...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Scan URL
              </>
            )}
          </button>
        </form>

        {/* Sample URLs */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Sample URLs</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_URLS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUrl(sample.url);
                  if (!isAnalyzing) onScan(sample.url);
                }}
                disabled={isAnalyzing}
                className="group text-left p-3 bg-slate-900/50 hover:bg-slate-900 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200 disabled:opacity-50"
              >
                <div className="text-xs font-medium text-emerald-400 group-hover:text-emerald-300 truncate">
                  {sample.label}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {sample.url.length > 35 ? sample.url.substring(0, 35) + '...' : sample.url}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-blue-300 leading-relaxed">
              <strong>How it works:</strong> Our ML-powered system analyzes 20+ features including URL structure, domain reputation, and content patterns using Random Forest and XGBoost ensemble models.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
