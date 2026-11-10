# ENESMA Realty consumer site (`www.enesmarealty.com`)

GitHub Pages site for the **public consumer** website. Mars · Marketing Manager owns layout, branding, agent pages, lead CTAs, and content in this repo.

The Agent Hub is a separate product. It stays in [`enesma-agent-hub`](https://github.com/enesma7/enesma-agent-hub) at [https://agent.enesmarealty.com/](https://agent.enesmarealty.com/). Do not copy Hub tools, Marketing Templates, Training, Compliance, Office Hubs, or calculators into this repo.

- **Custom domain:** `www.enesmarealty.com` (`CNAME` at the repo root)
- **Pages source:** `main` branch, site root (`/`)
- **Preview:** [https://enesma7.github.io/enesma-www/](https://enesma7.github.io/enesma-www/)
- **Stack:** static HTML, CSS, and JS. No build step. `site.css` is cache-busted with `?v=8`. `site.js` is `?v=4`. `agents.js` is `?v=5`.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home. Video hero (Hub SoCal clip loop) and six photo tiles: Buy, Sell, Refinance, Join, Agents, Contact |
| `/buy/` | Buyer inquiry. One full-page form button |
| `/sell/` | Seller inquiry |
| `/refinance/` | Refinance inquiry |
| `/agents/` | Roster from `data/roster.json`, unless `data/roster-feed.json` points at another feed |
| `/agents/enrique-esparza/` | Broker page. Direct line (909) 212-2994 |
| `/agents/lilia-amador/` | Agent page |
| `/join/` | Join the team. `#join-calculator` is reserved for a later calculator embed |
| `/contact/` | Office line (909) 566-0505 and enrique@enesmabroker.com |

Shared header and footer live in `js/site.js`. The header is a sticky black bar. Agents opens a menu of the people in `js/agents.js`. Office email on the brokerage footer and Contact page is `enrique@enesmabroker.com`. Office phone `(909) 566-0505` is the footer, the Contact page, and the no-JavaScript office line. Enrique’s personal number `(909) 212-2994` is only on his agent tile and profile. Other agents’ numbers stay on their own tile and profile. Footer carries DRE# 01926362 and the Equal Housing mark. There is no MLS or IDX search.

## Adding an agent

Profiles share one template. Append one object to the `agents` array in `data/roster.json` (photo, name, contact, `languages`, socials, Zillow bio). Then copy `agents/enrique-esparza/index.html` to `agents/<slug>/index.html`, set `data-agent` to that slug, and update the title. The roster, the language filter, and the Agents menu pick up the new entry. Do not invent a bio.

## Roster feed

`data/roster-feed.json` is the only switch:

- `feedUrl` empty: the site loads `data/roster.json`.
- `feedUrl` set to an absolute URL: the site loads that JSON instead, and falls back to `data/roster.json` if the request fails.

The feed may be `{ "agents": [ ... ] }` or a bare array. Each agent uses `slug`, `name`, `role`, `phone`, `email`, `web`, `webLabel`, `dre`, `img`, `languages`, `social` (`label`, `href`), and `bioHtml`. On a remote feed, `img` should be an absolute URL. `languages` is an array of names such as `"English"` and `"Spanish"`. The Meet Our Agents page searches `name` and filters on `languages`. A tile shows the photo, name, title, DRE, phone, and email, and links to that agent’s page. Social icons, website, languages, and the bio stay on the profile.

When the Agent Hub public roster is live, set `feedUrl` to that URL. No other file needs to change.

## Lead forms

Each gold button opens the matching full-page form in a new tab:

- Buy: https://app.enesmarealty.com/leadforms/buy.html
- Sell: https://app.enesmarealty.com/leadforms/sell.html
- Refinance: https://app.enesmarealty.com/leadforms/refinance.html
- Join: https://app.enesmarealty.com/leadforms/join.html
- Contact: https://app.enesmarealty.com/leadforms/contact.html

`https://app.enesmarealty.com/leadforms/refer.html` is live. This consumer site has no Refer page, so it is not linked.

No Join calculator in Phase 1. `#join-calculator` on the Join page is reserved for a later embed.

## DNS (GoDaddy — registrar stays GoDaddy)

| Host | Type | Points to |
| --- | --- | --- |
| `www` | CNAME | `enesma7.github.io` |
| `agent` | CNAME | `enesma7.github.io` (unchanged; Hub) |

Do not move the registrar. Do not edit the `agent` record when flipping `www`.

## After a marketing push

1. Confirm GitHub Pages Settings → Custom domain = `www.enesmarealty.com` and Enforce HTTPS once the cert is ready.
2. Remove `www.enesmarealty.com` from the old Google Site custom domains so Sites stops claiming it.
