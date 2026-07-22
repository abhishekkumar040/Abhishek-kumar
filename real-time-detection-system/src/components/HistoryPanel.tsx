import type { URLAnalysisResult } from '../App';

interface HistoryPanelProps {
  history: URLAnalysisResult[];
}

export function HistoryPanel({ history }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Scan History</h3>
          <p className="text-slate-400 text-sm">
            Your scanned URLs will appear here. Go to the Scanner tab to start analyzing URLs.
          </p>
        </div>
      </main>
    );
  }

  const phishingCount = history.filter(r => r.isPhishing).length;
  const safeCount = history.length - phishingCount;

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Scan History</h2>
          <p className="text-slate-400 text-sm mt-1">{history.length} URLs analyzed</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            <span className="text-xs text-red-400">{phishingCount} Phishing</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span className="text-xs text-emerald-400">{safeCount} Safe</span>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-500 font-semibold">URL</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Confidence</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Model</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Risk Level</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {history.map((result, idx) => {
                const intel = result.domainIntel;
                const isBlocklisted = intel?.status === 'success' && intel.isBlocklisted;
                const isVeryNewDomain = intel?.status === 'success' && intel.domainAgeDays !== null && intel.domainAgeDays < 30;
                const isCleanUnverified = result.trustLevel === 'unverified' && result.suspiciousFeatures.length === 0 && !isVeryNewDomain;
                const isLegit = !isBlocklisted && (result.trustLevel === 'verified_legitimate' || isCleanUnverified);
                const isDangerous = result.trustLevel === 'phishing' || isBlocklisted;
                return (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isDangerous ? 'bg-red-500/20' :
                      isLegit ? 'bg-emerald-500/20' :
                      'bg-red-500/10'
                    }`} title={
                      isDangerous ? (result.trustLevel === 'phishing' ? 'Phishing detected' : 'Flagged by threat intelligence') :
                      isLegit ? 'Legitimate Website' :
                      'Suspicious Website'
                    }>
                      {isDangerous ? (
                        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ) : isLegit ? (
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="text-sm text-white truncate font-mono" title={result.url}>
                      {result.url}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            result.isPhishing ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-gradient-to-r from-emerald-500 to-green-400'
                          }`}
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-300">{result.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400">{result.modelUsed.split(' ')[0]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      result.riskLevel === 'critical' || result.riskLevel === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : result.riskLevel === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {result.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-500">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold text-white">{history.length}</div>
          <div className="text-xs text-slate-400 mt-1">Total Scans</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold text-red-400">{phishingCount}</div>
          <div className="text-xs text-slate-400 mt-1">Threats Blocked</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold text-emerald-400">{safeCount}</div>
          <div className="text-xs text-slate-400 mt-1">Safe Sites Verified</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold text-purple-400">
            {Math.round((phishingCount / Math.max(1, history.length)) * 100)}%
          </div>
          <div className="text-xs text-slate-400 mt-1">Threat Rate</div>
        </div>
      </div>
    </main>
  );
}
