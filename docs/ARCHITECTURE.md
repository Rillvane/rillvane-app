# Frontend architecture

workspace.js renders hash routes for Overview, Markets, Trade, Supply, Borrow, Portfolio, Activity and Risk. backend-client.js uses relative /api URLs and same-origin wallet sessions. WebSockets and polling update market/account state without navigating away from the active route.

market-ui.js builds chart output from API candles and recorded trades. Chart navigation and appearance have isolated tests. No external market-data pair or third-party historical source is configured by this snapshot.

app-loading.js releases the initial circular spinner after the first online/offline connection attempt; a slow-start fallback permits retry or opening the workspace. It never shows an invented progress percentage.

The sibling protocol can serve dist/app/index.html at / using SITE_MODE=app and FRONTEND_ROOT. This preserves cookies, Origin verification and WebSocket behavior without a cross-origin API proxy.
