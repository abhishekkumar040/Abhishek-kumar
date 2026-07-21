import type { URLAnalysisResult } from '../App';

interface ResultsPanelProps {
  results: URLAnalysisResult | null;
  isAnalyzing: boolean;
}

const severityColors = {
  low: 'bg-slate-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
};

const riskConfig = {
  safe: { color: 'from-emerald-500 to-green-400', bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'SAFE' },
  low: { color: 'from-emerald-500 to-cyan-400', bg: 'bg-cyan-500/20', text: 'text-cyan-400', label: 'LOW RISK' },
  medium: { color: 'from-yellow-500 to-orange-400', bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'MEDIUM RISK' },
  high: { color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'HIGH RISK' },
  critical: { color: 'from-red-600 to-red-700', bg: 'bg-red-500/20', text: 'text-red-400', label: 'CRITICAL' },
};

export function ResultsPanel({ results, isAnalyzing }: ResultsPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          {/* Animated Scanner */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
            <div className="absolute inset-2 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">Analyzing URL</h3>
          <p className="text-slate-400 text-sm mb-6">Extracting features and running ML classification...</p>
          
          <div className="space-y-3 max-w-xs mx-auto">
            {['URL Feature Extraction', 'Domain Analysis', 'Content Scanning', 'ML Classification', 'XAI Explanation'].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isAnalyzing ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-700 text-slate-400'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-sm ${isAnalyzing ? 'text-slate-300' : 'text-slate-500'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm flex items-center justify-center min-h-[500px]">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-900 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Scan</h3>
          <p className="text-slate-400 text-sm">
            Enter a URL on the left panel or click one of the sample URLs to start a security analysis. 
            The system will use machine learning models to detect potential phishing attempts.
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'Accuracy', value: '96%' },
              { label: 'Precision', value: '95%' },
              { label: 'Recall', value: '94%' },
              { label: 'F1-Score', value: '94%' },
            ].map((metric) => (
              <div key={metric.label} className="p-3 bg-slate-900 rounded-lg">
                <div className="text-lg font-bold text-emerald-400">{metric.value}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const risk = riskConfig[results.riskLevel];

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-1 custom-scrollbar">
      {/* Main Result Card */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
        {/* Result Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${risk.color} flex items-center justify-center shadow-lg ${
              results.isPhishing ? 'shadow-red-500/30' : 'shadow-emerald-500/30'
            }`}>
              {results.isPhishing ? (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <span className={`inline-block px-2 py-0.5 ${risk.bg} ${risk.text} text-xs font-bold rounded-md mb-1`}>
                {risk.label}
              </span>
              <h3 className="text-xl font-bold text-white">
                {results.isPhishing ? 'PHISHING DETECTED!' : 'Legitimate Website'}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-black ${risk.text}`}>
              {results.isPhishing ? results.confidence : results.confidence}%
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Confidence</div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden mb-4">
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${risk.color} transition-all duration-1000 ease-out`}
            style={{ width: `${results.confidence}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white drop-shadow-md">
              {results.modelUsed}
            </span>
          </div>
        </div>

        {/* Analyzed URL */}
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Analyzed URL</div>
          <div className="text-sm text-slate-300 break-all font-mono">{results.url}</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Precision', value: `${results.precision}%`, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { label: 'Recall', value: `${results.recall}%`, icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
            { label: 'F1 Score', value: `${results.f1Score}%`, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'ROC-AUC', value: `${results.rocAuc}%`, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
          ].map((metric) => (
            <div key={metric.label} className="text-center p-2 bg-slate-900/50 rounded-lg">
              <svg className="w-4 h-4 text-slate-500 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
              </svg>
              <div className="text-sm font-bold text-white">{metric.value}</div>
              <div className="text-[9px] text-slate-500 uppercase">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Prediction time: {results.predictionTime}ms
          </div>
          <div className="text-xs text-slate-500">
            {results.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* XAI Explainability Panel */}
      {results.suspiciousFeatures.length > 0 && (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Explainable AI (XAI) Analysis</h3>
              <p className="text-xs text-slate-400">SHAP values showing feature impact on prediction</p>
            </div>
          </div>

          {/* SHAP Values */}
          <div className="space-y-3 mb-6">
            {results.shapValues.map((shap) => (
              <div key={shap.feature} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                    {shap.feature}
                  </span>
                  <span className={`text-xs font-bold ${
                    shap.impact > 15 ? 'text-red-400' : shap.impact > 8 ? 'text-orange-400' : 'text-yellow-400'
                  }`}>
                    +{shap.impact.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      shap.impact > 15 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                      shap.impact > 8 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                      'bg-gradient-to-r from-yellow-500 to-yellow-400'
                    }`}
                    style={{ width: `${Math.min(100, shap.impact * 4)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Suspicious Features List */}
          <div className="border-t border-slate-700 pt-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Suspicious Features Detected ({results.suspiciousFeatures.length})
            </div>
            
            <div className="space-y-2">
              {results.suspiciousFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-slate-900/50 hover:bg-slate-900 rounded-lg border border-slate-700/50 transition-colors"
                >
                  <span className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${severityColors[feature.severity]}`}></span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-white">{feature.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0">
                        {typeof feature.value === 'number' ? feature.value : feature.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                        feature.category === 'url' ? 'bg-blue-500/20 text-blue-400' :
                        feature.category === 'domain' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {feature.category.toUpperCase()}
                      </span>
                      <span className={`text-[9px] capitalize ${
                        feature.severity === 'critical' || feature.severity === 'high' ? 'text-red-400' :
                        feature.severity === 'medium' ? 'text-yellow-400' : 'text-slate-500'
                      }`}>
                        {feature.severity} severity
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Features Overview */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          All Extracted Features ({results.features.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {results.features.map((feature) => (
            <div
              key={feature.name}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                feature.isSuspicious
                  ? 'bg-red-500/5 border-red-500/20'
                  : 'bg-slate-900/50 border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${feature.isSuspicious ? 'bg-red-400' : 'bg-green-400'}`}></span>
                <span className="text-slate-300 truncate">{feature.name}</span>
              </div>
              <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                feature.isSuspicious ? 'bg-red-500/20 text-red-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {typeof feature.value === 'number' ? feature.value : feature.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
