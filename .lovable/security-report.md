# Security Audit and Lead Table Status

## Git Security
The `.env` file was tracked in the repository. It has been removed from the working directory and will be ignored in future commits once GitHub Sync is triggered.
The file contained:
- `SUPABASE_PROJECT_ID`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

These are all public-facing keys (anon keys). 

**CRITICAL:** `RESEND_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` were **NOT** found in the `.env` file or in the codebase. They are correctly managed as secret environment variables in the Lovable Cloud environment.

## Frontend Security
- The public client (`src/integrations/supabase/client.ts`) uses `VITE_` prefixed variables.
- The admin client (`src/integrations/supabase/client.server.ts`) correctly uses non-prefixed `process.env` and is imported dynamically inside server functions.
- `RESEND_API_KEY` is only used inside the `sendLeadNotification` server function.

## Leads Table & RLS
- Table: `leads` (id, created_at, name, phone, email, message, notification_sent).
- RLS Policy: `Allow anonymous insert` is enabled.
- Rate Limiting: `check_lead_rate_limit` trigger is active (3 leads per 10 minutes per IP).
- Spam Protection: Honeypot field `website` is implemented in `BookingModal.tsx`.

## Recommendations
No immediate secret rotation is required for `RESEND_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` as they were never leaked. However, it is good practice to rotate them if you suspect any unauthorized access to the Lovable environment.
