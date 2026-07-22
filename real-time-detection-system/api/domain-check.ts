// Vercel serverless function (auto-detected from /api - no framework needed).
// Runs server-side so the browser never hits CORS issues and no API keys
// are ever exposed to the client.
//
// GET /api/domain-check?domain=example.com
// -> { domainAgeDays: number|null, registrar: string|null, isBlocklisted: boolean, blocklistSource: string|null }

export const config = { runtime: 'edge' };

const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const domain = (searchParams.get('domain') || '').trim().toLowerCase();

  if (!domain || !DOMAIN_RE.test(domain)) {
    return new Response(JSON.stringify({ error: 'A valid domain query parameter is required.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  let domainAgeDays: number | null = null;
  let registrar: string | null = null;
  let isBlocklisted = false;
  let blocklistSource: string | null = null;

  // --- RDAP: free, keyless domain registration lookup (IANA-endorsed) ---
  try {
    const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, {
      headers: { accept: 'application/rdap+json, application/json' },
      signal: AbortSignal.timeout(5000),
    });
    if (rdapRes.ok) {
      const rdap = await rdapRes.json();
      const events: Array<{ eventAction?: string; eventDate?: string }> = rdap.events || [];
      const registrationEvent = events.find(e => e.eventAction === 'registration');
      if (registrationEvent?.eventDate) {
        const registeredAt = new Date(registrationEvent.eventDate).getTime();
        if (!Number.isNaN(registeredAt)) {
          domainAgeDays = Math.max(0, Math.floor((Date.now() - registeredAt) / 86_400_000));
        }
      }
      const entities: Array<{ roles?: string[]; vcardArray?: unknown }> = rdap.entities || [];
      const registrarEntity = entities.find(e => (e.roles || []).includes('registrar'));
      const vcard = registrarEntity?.vcardArray as unknown[] | undefined;
      const vcardFields = Array.isArray(vcard) ? (vcard[1] as unknown[][] | undefined) : undefined;
      const fnField = vcardFields?.find(f => f[0] === 'fn');
      if (fnField && typeof fnField[3] === 'string') registrar = fnField[3];
    }
  } catch {
    // RDAP unreachable or domain not found there - leave age/registrar as null,
    // this is non-fatal, we still return the blocklist result below.
  }

  // --- URLhaus (abuse.ch): free, keyless known-malicious-host blocklist ---
  try {
    const uhRes = await fetch('https://urlhaus-api.abuse.ch/v1/host/', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `host=${encodeURIComponent(domain)}`,
      signal: AbortSignal.timeout(5000),
    });
    if (uhRes.ok) {
      const uh = await uhRes.json();
      if (uh.query_status === 'ok' && Number(uh.url_count || 0) > 0) {
        isBlocklisted = true;
        blocklistSource = 'URLhaus (abuse.ch)';
      }
    }
  } catch {
    // Blocklist provider unreachable - leave isBlocklisted false rather than
    // guessing; the heuristic model's own result still stands on its own.
  }

  return new Response(
    JSON.stringify({ domainAgeDays, registrar, isBlocklisted, blocklistSource }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
