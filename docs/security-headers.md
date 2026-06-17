# Security headers runbook

`static/_headers` is **inert** on this deployment: the site is GitHub Pages
behind a Cloudflare proxy, and neither reads an origin `_headers` file. Verify
the current state any time with:

    curl -sSI https://isaaclins.com/ | grep -iE 'x-frame-options|x-content-type-options|referrer-policy|permissions-policy|content-security-policy'

To actually enforce the headers, add a **Cloudflare → Rules → Transform Rules →
Modify Response Header** rule (or an equivalent Configuration Rule) on the zone
`isaaclins.com`, matching all requests, setting:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |

`X-XSS-Protection` is deprecated by modern browsers — prefer a CSP instead of
shipping it.

## Content-Security-Policy (apply carefully)

The site uses inline `<script type="application/ld+json">` (JSON-LD), inline
shortcode `<style>`/`<script>` (e.g. the SQL-flow visualizer), and mermaid. A
strict CSP will break these unless their hashes/nonces are allowed. A pragmatic
starting policy (loosened for inline; tighten over time):

    Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'

After vendoring fuse.js locally (plan 002) there is no third-party script origin
to whitelist, so `script-src` can stay `'self'` (+ `'unsafe-inline'` until inline
scripts are hashed). Test on a staging hostname before enabling site-wide.

## Caching

`static/_headers` also encodes cache-control intent (immutable hashed assets,
short-lived HTML). Cloudflare's own caching largely covers this; if you want the
exact `Cache-Control` values, replicate them as Cloudflare Cache Rules.
