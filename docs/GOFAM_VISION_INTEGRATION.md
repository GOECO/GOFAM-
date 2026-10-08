# GOFAM AI VISION – React integration (feature branch)

This adds a **Vision** button and a **read-only dashboard** to the existing React/Vite GOFAM prototype, without modifying existing farming workflows.

## UI

- Dashboard card -> Vision screen -> back to dashboard.
- Fetches summary and recent batches from **same-origin** `/api/gofam-vision/summary` and `/api/gofam-vision/sessions`.
- If no authenticated proxy exists, shows an explicit "Vision Cloud chưa kết nối" message; no fabricated production values.
- Optional public environment variable `VITE_GOFAM_VISION_APP_URL` can point to the independently deployed HTTPS Vision PWA.

## Secure backend integration

The **backend proxy is not installed in this static Vite prototype**. Deploy the bridge available in the private repo `GOECO/GOFAM-AI-1`, feature branch `feat/gofam-vision-14day-mvp`, at `gofam-vision/integrations/replit/vision-bridge.mjs` into the **actual authenticated GOFAM application server**.

The bridge requires `authenticateUser(req)`, resolves server-side user organization membership, compares that tenant with the Vision API tenant, and forwards read-only requests.

- `GOFAM_VISION_BASE_URL`: HTTPS URL of GOFAM Vision API (**server-side only**).
- `GOFAM_VISION_INTEGRATION_KEY`: Vision API admin-provisioned, read-only integration token (**server-side only**).
- Never put the integration/admin key into a `VITE_...` variable, browser, or mobile app.

## What this does NOT do

- Does not modify/copy Vision camera/AI into the Vite code base.
- Does not expose a token-protected endpoint to untrusted users.
- Does not prove this repository is the **live Replit deployment**; user must identify actual Replit project/auth implementation before activating the backend bridge there.
- Does not deploy to production.

GOFAM Vision standalone Android/iOS native embed is supported in the private product's Flutter source SDK facade.