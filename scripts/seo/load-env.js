/**
 * Minimal .env loader for the build scripts.
 *
 * react-scripts loads .env.production itself, but scripts/prerender.js and
 * scripts/generate-sitemap.js run as plain Node processes and don't — which
 * silently left canonical/OG URLs relative even though the variable was set.
 *
 * Values already present in the environment win, so variables configured in
 * the Cloudflare Pages dashboard still take precedence over the committed file.
 * No dependency: `dotenv` isn't (and shouldn't be) a frontend dependency.
 */
const fs = require('fs');
const path = require('path');

function loadEnv(files = ['.env.production.local', '.env.production', '.env.local', '.env']) {
  const root = path.join(__dirname, '..', '..');
  for (const file of files) {
    const full = path.join(root, file);
    if (!fs.existsSync(full)) continue;
    for (const rawLine of fs.readFileSync(full, 'utf8').split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      // strip surrounding quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

module.exports = { loadEnv };
