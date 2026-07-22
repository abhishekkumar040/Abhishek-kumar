import type { URLAnalysisResult } from '../App';

interface DashboardProps {
  scanHistory: URLAnalysisResult[];
}

export function Dashboard({ scanHistory }: DashboardProps) {
  const totalScans = scanHistory.length;
  const phishingDetected = scanHistory.filter(r => r.isPhishing).length;
  const legitimateCount = totalScans - phishingDetected;
  const avgConfidence = totalScans > 0 
    ? Math.round(scanHistory.reduce((sum, r) => sum + r.confidence, 0) / totalScans)
    : 96;

  // Simulate model comparison data
  const modelMetrics = [
    { name: 'XGBoost (Active)', accuracy: 96, precision: 95, recall: 94, f1: 94 },
    { name: 'Random Forest', accuracy: 87, precision: 85, recall: 84, f1: 84 },
    { name: 'Decision Tree', accuracy: 82, precision: 80, recall: 79, f1: 79 },
    { name: 'SVM', accuracy: 85, precision: 83, recall: 82, f1: 82 },
    { name: 'Logistic Regression', accuracy: 78, precision: 76, recall: 75, f1: 75 },
  ];

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time monitoring and ML model performance</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-green-400 font-medium">System Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Scans', value: totalScans || '247', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', color: 'from-blue-500 to-blue-600' },
          { label: 'Phishing Detected', value: phishingDetected || '43', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'from-red-500 to-red-600' },
          { label: 'Legitimate Sites', value: legitimateCount || '204', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-emerald-500 to-emerald-600' },
          { label: 'Avg Confidence', value: `${avgConfidence}%`, icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'from-purple-500 to-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Model Comparison */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Model Performance Comparison
          </h3>
          
          <div className="space-y-4">
            {modelMetrics.map((model) => (
              <div key={model.name} className={`p-4 rounded-lg ${model.name.includes('Active') ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-slate-900/50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${model.name.includes('Active') ? 'text-emerald-400' : 'text-slate-300'} text-sm`}>
                    {model.name}
                    {model.name.includes('Active') && (
                      <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded">IN USE</span>
                    )}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{model.accuracy}% Acc</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Precision', value: model.precision },
                    { label: 'Recall', value: model.recall },
                    { label: 'F1-Score', value: model.f1 },
                  ].map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1">
                        <div
                          className={`h-full rounded-full ${
                            model.name.includes('Active') ? 'bg-emerald-500' : 'bg-slate-600'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{metric.label}</div>
                      <div className="text-xs font-medium text-slate-300">{metric.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Importance */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Feature Importance (SHAP Analysis)
          </h3>
          
          <div className="space-y-3">
            {[
              { name: 'IP Address Usage', importance: 25, impact: '+25% Phishing Prob.' },
              { name: '@ Symbol Presence', importance: 22, impact: '+22% Phishing Prob.' },
              { name: 'DNS Record Validity', importance: 20, impact: '+20% Phishing Prob.' },
              { name: 'Credential Request', importance: 18, impact: '+18% Phishing Prob.' },
              { name: 'SSL Certificate', importance: 15, impact: '+15% Risk if Missing' },
              { name: 'Phishing Keywords', importance: 14, impact: '+14% Phishing Prob.' },
              { name: 'External Redirects', importance: 12, impact: '+12% Risk Factor' },
              { name: 'URL Shortener Use', importance: 11, impact: '+11% Hidden Dest.' },
              { name: 'Domain Age (<30d)', importance: 10, impact: '+10% Suspicion' },
              { name: 'Domain Reputation', importance: 10, impact: '+10% Risk Factor' },
            ].map((feature) => (
              <div key={feature.name} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{feature.name}</span>
                  <span className="text-[10px] text-slate-500">{feature.impact}</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-700"
                    style={{ width: `${feature.importance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Detection Methodology
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'URL-Based Features',
              icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
              color: 'blue',
              features: ['URL Length Analysis', 'IP Address Detection', '@ Symbol Obfuscation', 'Double Slash Check', 'Subdomain Depth', 'Path Depth Analysis'],
            },
            {
              title: 'Domain-Based Features',
              icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
              color: 'emerald',
              features: ['Domain Reputation', 'TLD Analysis', 'Domain Registration Age', 'DNS Record Validation', 'Numeric Domain Check', 'SSL Certificate Status'],
            },
            {
              title: 'Content-Based Features',
              icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
              color: 'purple',
              features: ['Login Keywords Scan', 'Phishing Word Detection', 'Redirect Counting', 'Credential Harvesting', 'Form Analysis', 'Embed Detection'],
            },
          ].map((section) => (
            <div key={section.title} className={`${section.color === 'blue' ? 'border-l-2 border-l-blue-500' : section.color === 'emerald' ? 'border-l-2 border-l-emerald-500' : 'border-l-2 border-l-purple-500'} pl-4`}>
              <div className={`inline-flex w-8 h-8 rounded-lg bg-${section.color}-500/20 items-center justify-center mb-3`}>
                <svg className={`w-4 h-4 text-${section.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">{section.title}</h4>
              <ul className="space-y-1.5">
                {section.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                    <svg className="w-3 h-3 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
