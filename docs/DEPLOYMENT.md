# Serving the app

Use the protocol repository's Node service behind HTTPS and set these values in the protocol host environment:

~~~dotenv
PUBLIC_ORIGIN=https://app.rillvane.trade
SITE_MODE=app
FRONTEND_ROOT=/srv/rillvane-app/dist
~~~

Follow the protocol deployment guide for persistent SQLite, RPC, private keys and registry configuration. Its Caddy example proxies all app requests to Node, which serves the explicit static root and API together. HTTPS, DNS and VPS setup remain operator tasks.

Alternatively, an existing same-origin reverse proxy can serve the static files and proxy /api plus WebSocket upgrades to the protocol service. Map / to /app/index.html. Do not expose source directories containing .env or keys, and do not introduce wildcard CORS.

The landing site at rillvane.trade is a separate deployment and is not included here. The workspace's brand/story links point to that site. Social metadata likewise references the brand site's public preview image.

After pulling dependency changes run npm ci and npm run build:wallet; after source changes run the documented checks before restarting the protocol host. The browser files need no additional application build.
