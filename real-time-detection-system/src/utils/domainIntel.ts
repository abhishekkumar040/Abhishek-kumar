import type { DomainIntelligence } from './urlAnalyzer';

// Calls our own /api/domain-check serverless function (see /api/domain-check.ts),
// which in turn queries RDAP (domain registration age) and URLhaus (known
// malicious host blocklist). Going through our own API route avoids CORS
// issues you'd hit calling those services directly from the browser, and
// keeps room to add a keyed provider later without exposing the key client-side.
export async function fetchDomainIntelligence(hostname: string): Promise<DomainIntelligence> {
  try {
    const res = await fetch(`/api/domain-check?domain=${encodeURIComponent(hostname)}`);
    if (!res.ok) {
      return { status: 'error', domainAgeDays: null, registrar: null, isBlocklisted: false, blocklistSource: null };
    }
    const data = await res.json();
    return {
      status: 'success',
      domainAgeDays: typeof data.domainAgeDays === 'number' ? data.domainAgeDays : null,
      registrar: typeof data.registrar === 'string' ? data.registrar : null,
      isBlocklisted: !!data.isBlocklisted,
      blocklistSource: typeof data.blocklistSource === 'string' ? data.blocklistSource : null,
    };
  } catch {
    // Network error, offline, or the lookup services are unreachable -
    // fail closed to "unknown" rather than blocking the rest of the UI.
    return { status: 'error', domainAgeDays: null, registrar: null, isBlocklisted: false, blocklistSource: null };
  }
}
