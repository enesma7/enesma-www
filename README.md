# ENESMA Realty consumer site (`www.enesmarealty.com`)

GitHub Pages site for the **public consumer** website. Mars · Marketing Manager owns layout, branding, agent pages, lead CTAs, and content in this repo.

The Agent Hub is a separate product. It stays in [`enesma-agent-hub`](https://github.com/enesma7/enesma-agent-hub) at [https://agent.enesmarealty.com/](https://agent.enesmarealty.com/). Do not copy Hub tools, Marketing Templates, Training, Compliance, Office Hubs, or calculators into this repo.

- **Custom domain:** `www.enesmarealty.com` (`CNAME` at the repo root)
- **Pages source:** `main` branch, site root (`/`)
- **Preview:** [https://enesma7.github.io/enesma-www/](https://enesma7.github.io/enesma-www/)
- **Stack:** static HTML, CSS, and JS. No build step. Styles and scripts are cache-busted with `?v=1`.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home. Wordmark, UNDERPROMISE & OVERDELIVER, paths into Buy, Sell, Agents, and Join |
| `/buy/` | Buyer inquiry. One full-page form button |
| `/sell/` | Seller inquiry |
| `/refinance/` | Refinance inquiry |
| `/agents/` | Enrique Esparza and Lilia Amador |
| `/agents/enrique-esparza/` | Broker page. Direct line (909) 212-2994 |
| `/agents/lilia-amador/` | Agent page |
| `/join/` | Join the team. `#join-calculator` is reserved for a later calculator embed |
| `/contact/` | Office line (909) 566-0505 and enrique@enesmabroker.com |

Shared header and footer live in `js/site.js`. Office email on every page is `enrique@enesmabroker.com`. Office phone is `(909) 566-0505`. Footer carries DRE# 01926362 and the Equal Housing mark. There is no MLS or IDX search.

## Lead forms still needed

Public form URLs were not in this repo or the public Agent Hub. The gold buttons use these placeholders until Mars drops in the live Google Form links (full page, new tab):

- Buy: `#todo-buy-form`
- Sell: `#todo-sell-form`
- Refinance: `#todo-refinance-form`
- Join: `#todo-join-form`
- Contact: `#todo-contact-form`

No Join calculator in Phase 1. Nothing stable and public was available to embed.

## DNS (GoDaddy — registrar stays GoDaddy)

| Host | Type | Points to |
| --- | --- | --- |
| `www` | CNAME | `enesma7.github.io` |
| `agent` | CNAME | `enesma7.github.io` (unchanged; Hub) |

Do not move the registrar. Do not edit the `agent` record when flipping `www`.

## After a marketing push

1. Confirm GitHub Pages Settings → Custom domain = `www.enesmarealty.com` and Enforce HTTPS once the cert is ready.
2. Remove `www.enesmarealty.com` from the old Google Site custom domains so Sites stops claiming it.
