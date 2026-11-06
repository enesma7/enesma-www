# ENESMA Realty consumer site (`www.enesmarealty.com`)

GitHub Pages site for the **public consumer** website.

- **Custom domain:** `www.enesmarealty.com` (CNAME file at repo root)
- **Pages source:** `main` branch, site root (`/`)
- **Agent Hub:** stays on [`enesma-agent-hub`](https://github.com/enesma7/enesma-agent-hub) at `https://agent.enesmarealty.com/` — do **not** put Hub content here

## Ownership

Mars · Marketing Manager owns layout, branding, agent pages, lead CTAs, and content on this repo.

## DNS (GoDaddy — registrar stays GoDaddy)

| Host | Type | Points to |
| --- | --- | --- |
| `www` | CNAME | `enesma7.github.io` |
| `agent` | CNAME | `enesma7.github.io` (unchanged; Hub) |

Do not move the registrar. Do not edit the `agent` record when flipping `www`.

## After first marketing push

1. Confirm GitHub Pages Settings → Custom domain = `www.enesmarealty.com` and Enforce HTTPS once the cert is ready.
2. Remove `www.enesmarealty.com` from the old Google Site custom domains so Sites stops claiming it.
