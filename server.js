'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Pool } = require('pg');

const PORT = process.env.PORT || 8080;
const PAGES = {
  '/': 'index.html',
  '/privacy': 'privacy.html',
  '/privacy.html': 'privacy.html',
  '/register': 'register.html',
  '/account': 'account.html',
};

// ---------------------------------------------------------------------------
// Database
//
// On the Lessly deploy platform we provision a Managed Postgres in the same
// Environment and reference its connection string from this Service as
// `DATABASE_URL = ${{postgres.DATABASE_URL}}`. The platform resolves that
// reference at deploy time and injects the real value here. Locally you can
// point DATABASE_URL at any Postgres (or leave it unset to run UI-only).
// ---------------------------------------------------------------------------
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

if (!pool) {
  console.warn('[startup] DATABASE_URL is not set — registrations will NOT be persisted.');
}

// Demo schema bootstrap: create the table on boot if it does not exist.
// A real app would use versioned migrations; for a demo this is enough.
async function initDb() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id            bigserial PRIMARY KEY,
      email         text NOT NULL UNIQUE,
      password_hash text NOT NULL,
      created_at    timestamptz NOT NULL DEFAULT now()
    )
  `);
  console.log('[startup] registrations table is ready.');
}

// Hash the password with scrypt (built-in crypto) so we never store it raw.
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

// Upsert the registration. Returns silently on misconfig/errors so the demo
// UX never breaks — failures are logged for the operator instead.
async function saveRegistration(email, password) {
  if (!pool) return;
  try {
    await pool.query(
      `INSERT INTO registrations (email, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [email, hashPassword(password)],
    );
  } catch (err) {
    console.error('[register] failed to persist registration:', err.message);
  }
}

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];

  // Healthcheck — the platform probes HTTP paths and expects 200.
  // Answer all of them: readiness probe is set to /healthz, liveness to /livez.
  if (url === '/healthz' || url === '/health' || url === '/livez') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end('{"status":"ok"}');
  }

  // Demo registration: persist the signup, then redirect to the account page.
  if (req.method === 'POST' && url === '/register') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e4) req.destroy(); // guard against oversized payloads
    });
    req.on('end', async () => {
      const params = new URLSearchParams(body);
      const email = (params.get('email') || '').trim();
      const password = params.get('password') || '';
      await saveRegistration(email, password);
      res.writeHead(303, { location: '/account?email=' + encodeURIComponent(email) });
      res.end();
    });
    return;
  }

  const file = PAGES[url];
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('Not found');
  }
  fs.readFile(path.join(__dirname, file), (err, data) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end('Server error');
    }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

initDb()
  .catch((err) => console.error('[startup] DB init failed (continuing):', err.message))
  .finally(() => {
    server.listen(PORT, () => console.log(`PureAir demo listening on :${PORT}`));
  });
