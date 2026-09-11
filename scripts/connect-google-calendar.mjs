import http from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { chmod, readFile, writeFile } from 'node:fs/promises';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local first. Run with node --env-file=.env.local scripts/connect-google-calendar.mjs');
  process.exit(1);
}
const redirectUri = 'http://localhost:3013/oauth/callback';
const state = randomBytes(32).toString('hex');
const consent = new URL('https://accounts.google.com/o/oauth2/v2/auth');
consent.search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: 'code', scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.freebusy', access_type: 'offline', prompt: 'consent', state }).toString();
let exchanging = false;
const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', redirectUri);
  if (url.pathname !== '/oauth/callback') { response.writeHead(404).end(); return; }
  const returnedState = url.searchParams.get('state') || '';
  if (returnedState.length !== state.length || !timingSafeEqual(Buffer.from(returnedState), Buffer.from(state))) { response.writeHead(400).end('Invalid authorization state.'); return; }
  if (!url.searchParams.get('code') || url.searchParams.has('error')) { response.writeHead(400).end('Authorization was not completed. You can close this tab.'); return; }
  if (exchanging) { response.writeHead(409).end('Authorization is already being completed.'); return; }
  exchanging = true;
  try {
    const result = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, code: url.searchParams.get('code'), grant_type: 'authorization_code', redirect_uri: redirectUri }), signal: AbortSignal.timeout(15000) });
    const data = await result.json();
    if (!result.ok || !data.refresh_token) throw new Error('No refresh token returned.');
    const file = await readFile('.env.local', 'utf8');
    const assignment = `GOOGLE_REFRESH_TOKEN=${JSON.stringify(data.refresh_token)}`;
    await writeFile('.env.local', /^GOOGLE_REFRESH_TOKEN=.*$/m.test(file) ? file.replace(/^GOOGLE_REFRESH_TOKEN=.*$/m, assignment) : `${file}\n${assignment}\n`, { mode: 0o600 });
    await chmod('.env.local', 0o600);
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }).end('Google Calendar connected. The refresh token was saved locally. You can close this tab.');
    console.log('Google refresh token saved to .env.local. No token was printed.');
    server.close();
  } catch {
    response.writeHead(502).end('Connection could not be completed. Restart the helper and authorize again.');
    console.error('Google authorization failed. No credentials were logged.');
    server.close();
  }
});
server.listen(3013, '127.0.0.1', () => { console.log('Let Bruna open this link and authorize her Google account:'); console.log(consent.toString()); });
const expiry = setTimeout(() => { console.log('Authorization window expired. Restart the helper to try again.'); server.close(); }, 10 * 60 * 1000);
server.on('close', () => clearTimeout(expiry));
