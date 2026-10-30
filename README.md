# Rillvane App

Trading workspace for RLVN / USDC with wallet sign-in, market candles and streaming, single-asset supply, collateral-backed credit and account activity. Built with native browser modules; no framework migration is required.

## Local development

Requires Node.js 24 and a sibling [rillvane-protocol](https://github.com/Rillvane/rillvane-protocol) checkout. These are intended GitHub repository names; publish the protocol repository first.

~~~text
parent/
  rillvane-protocol/
  rillvane-app/
~~~

From rillvane-app:

~~~sh
npm ci
npm run dev
~~~

Open http://localhost:8787/. The development server mounts the app and sibling API on the same origin. It uses an in-memory database, no authority keys and no background workers. A restart clears its state. It is a local projection/test environment, not a public-chain deployment.

Optional: copy .env.example to .env to change PORT, PUBLIC_ORIGIN, PROTOCOL_ROOT or persist development state. Actual chain operation requires the protocol service with its own registry/RPC/authority configuration; see docs/DEPLOYMENT.md.

## Checks

~~~sh
npm run check
npm test
npm run test:integration
npm run build:wallet
~~~

npm test runs chart and appearance tests without requiring the sibling repository. test:integration verifies the same-origin app/API using an in-memory protocol instance. The optional npm run test:browser exercises sign-in, faucet, supply, swap, borrow/repay, withdrawal and session recovery with a generated test wallet and mocked RPC; it needs Chrome and the sibling protocol. Set CHROME_PATH if Chrome is installed elsewhere. It does not broadcast transactions.

## Files

- dist/: authored browser JavaScript/CSS and static app HTML; this directory is source, despite its name.
- dist/vendor/: locally bundled Solana transaction decoder. Rebuild after dependency changes.
- tools/: development server, checks and integration tests.
- docs/: deployment and architecture.

The landing-page renderer and reference-owned models, textures, camera tracks and bird assets are excluded. Only the workspace is published. The original logo remains unchanged. See THIRD_PARTY_NOTICES.md for bundled dependencies, font licenses and branding exclusions, SECURITY.md for vulnerability reporting, and CONTRIBUTING.md for development guidance.

This is unaudited development software. Empty trade history cannot supply ten days of real historical fills. The protocol repository labels zero-volume oracle-mark fallback separately from executed trades.
