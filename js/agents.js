/* Public agent profiles. The roster, the Agents menu, and /agents/<slug>/
   all read one feed. data/roster-feed.json chooses the URL. An empty
   feedUrl uses data/roster.json. Point feedUrl at the Agent Hub public
   roster when that feed is live. Office phone (909) 566-0505 stays on the
   brokerage footer and Contact page, not on an agent's own line.

   Add an agent:
   1. Append one object to data/roster.json (photo under assets/agents/).
   2. Copy agents/enrique-esparza/index.html to agents/<slug>/index.html
      and set data-agent="<slug>". Update the <title>. Do not invent a bio.
*/
(function () {
  var SOCIAL_ICONS = {
  "facebook": "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  "instagram": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  "tiktok": "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  "x": "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  "linkedin": "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  "youtube": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  "zillow": "M12.006 0L1.086 8.627v3.868c3.386-2.013 11.219-5.13 14.763-6.015.11-.024.16.005.227.078.372.427 1.586 1.899 1.916 2.301a.128.128 0 0 1-.03.195 43.607 43.607 0 0 0-6.67 6.527c-.03.037-.006.043.012.03 2.642-1.134 8.828-2.94 11.622-3.452V8.627zm-.48 11.177c-2.136.708-8.195 3.307-10.452 4.576V24h21.852v-7.936c-2.99.506-11.902 3.16-15.959 5.246a.183.183 0 0 1-.23-.036l-2.044-2.429c-.055-.061-.062-.098.011-.208 1.574-2.3 4.789-5.899 6.833-7.418.042-.03.031-.06-.012-.042Z"
};


  /* Roster comes from data/roster-feed.json. An empty feedUrl uses
     data/roster.json. Set feedUrl to the Agent Hub public roster URL
     when that feed is live. See the README. */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function root() {
    var body = document.body;
    if (body && body.hasAttribute("data-root")) return body.getAttribute("data-root");
    if (window.__ENESMA_BASE) return window.__ENESMA_BASE;
    return "";
  }

  function telHref(phone) {
    var digits = String(phone || "").replace(/\D/g, "");
    if (digits.length === 10) digits = "1" + digits;
    return "tel:+" + digits;
  }

  function socialIcon(label) {
    var d = SOCIAL_ICONS[String(label || "").toLowerCase()];
    if (!d) return "";
    return '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="#000000" d="' + d + '"/></svg>';
  }

  function bySlug(slug) {
    var list = window.ENESMA_AGENTS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) return list[i];
    }
    return null;
  }

  function socialRow(items) {
    return (items || []).map(function (s) {
      var icon = socialIcon(s.label);
      return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' + (icon || esc(s.label)) + "</a>";
    }).join("");
  }

  function resolveImg(img) {
    var value = String(img || "");
    if (!value) return "";
    if (/^(https?:|data:)/i.test(value)) return value;
    if (value.charAt(0) === "/") return value;
    return root() + value;
  }

  function contactHtml(a) {
    var bits = [];
    if (a.phone) bits.push('<a href="' + telHref(a.phone) + '">' + esc(a.phone) + "</a>");
    if (a.email) bits.push('<a href="mailto:' + esc(a.email) + '">' + esc(a.email) + "</a>");
    if (a.web) bits.push('<a href="' + esc(a.web) + '" target="_blank" rel="noopener noreferrer">' + esc(a.webLabel || a.web) + "</a>");
    if (!bits.length) return "";
    return '<p class="agent-contact">' + bits.join("") + "</p>";
  }

  function profileHtml(a) {
    var base = root();
    return (
      '<section class="page-body agent-layout">' +
        '<div class="shell">' +
          '<p class="back"><a href="' + base + 'agents/">All Agents</a></p>' +
          '<article class="agent">' +
            '<img src="' + esc(resolveImg(a.img)) + '" width="700" height="700" alt="Portrait of ' + esc(a.name) + '">' +
            '<div class="agent-body">' +
              '<p class="agent-kicker">Agent</p>' +
              '<h1 class="agent-name">' + esc(a.name) + "</h1>" +
              '<p class="agent-role">' + esc(a.role) + " · DRE# " + esc(a.dre) + "</p>" +
              ((a.languages && a.languages.length) ? '<p class="agent-langs">' + esc(a.languages.join(" · ")) + "</p>" : "") +
              contactHtml(a) +
              '<div class="socials">' + socialRow(a.social) + "</div>" +
              '<div class="bio">' + (a.bioHtml || "") + "</div>" +
            "</div>" +
          "</article>" +
        "</div>" +
      "</section>"
    );
  }

  function rosterCard(a) {
    var href = esc(a.slug) + "/";
    var langs = a.languages || [];
    var phone = a.phone ? '<p class="agent-line">' + esc(a.phone) + "</p>" : "";
    var email = a.email ? '<p class="agent-line">' + esc(a.email) + "</p>" : "";
    return (
      '<a class="agent-card" href="' + href + '" data-name="' + esc(a.name) + '" data-languages="' + esc(langs.join("|")) + '">' +
        '<img src="' + esc(resolveImg(a.img)) + '" width="700" height="700" alt="Portrait of ' + esc(a.name) + '">' +
        "<h2>" + esc(a.name) + "</h2>" +
        '<p class="agent-role">' + esc(a.role) + " · DRE# " + esc(a.dre) + "</p>" +
        phone +
        email +
      "</a>"
    );
  }

  function rosterHtml() {
    return (window.ENESMA_AGENTS || []).map(rosterCard).join("");
  }

  function applyRosterFilter() {
    var roster = document.getElementById("agent-roster");
    var search = document.getElementById("agent-search");
    var language = document.getElementById("agent-language");
    var empty = document.getElementById("agent-empty");
    if (!roster) return;
    var q = search ? String(search.value || "").trim().toLowerCase() : "";
    var lang = language ? String(language.value || "") : "";
    var cards = roster.querySelectorAll(".agent-card");
    var shown = 0;
    for (var i = 0; i < cards.length; i++) {
      var name = String(cards[i].getAttribute("data-name") || "").toLowerCase();
      var langs = String(cards[i].getAttribute("data-languages") || "").split("|").filter(Boolean);
      var okName = !q || name.indexOf(q) !== -1;
      var okLang = !lang || langs.indexOf(lang) !== -1;
      var show = okName && okLang;
      cards[i].hidden = !show;
      if (show) shown += 1;
    }
    if (empty) empty.hidden = shown !== 0;
  }

  function fillLanguages() {
    var language = document.getElementById("agent-language");
    if (!language) return;
    var seen = {};
    var names = [];
    (window.ENESMA_AGENTS || []).forEach(function (a) {
      (a.languages || []).forEach(function (lang) {
        if (!lang || seen[lang]) return;
        seen[lang] = true;
        names.push(lang);
      });
    });
    names.sort(function (a, b) { return a.localeCompare(b); });
    var current = language.value;
    language.innerHTML = '<option value="">All Languages</option>';
    names.forEach(function (lang) {
      var opt = document.createElement("option");
      opt.value = lang;
      opt.textContent = lang;
      language.appendChild(opt);
    });
    if (current && seen[current]) language.value = current;
  }

  function bindRoster() {
    var search = document.getElementById("agent-search");
    var language = document.getElementById("agent-language");
    if (search && !search._enesmaBound) {
      search._enesmaBound = true;
      search.addEventListener("input", applyRosterFilter);
    }
    if (language && !language._enesmaBound) {
      language._enesmaBound = true;
      language.addEventListener("change", applyRosterFilter);
    }
    fillLanguages();
    applyRosterFilter();
  }

  function mount() {
    var body = document.body;
    if (!body) return;
    var slug = body.getAttribute("data-agent");
    var main = document.getElementById("main");
    if (slug && main) {
      var agent = bySlug(slug);
      if (!agent) {
        main.innerHTML = '<section class="not-found"><div class="shell"><p>That agent is not on this site.</p><p><a href="' + root() + 'agents/">All Agents</a></p></div></section>';
        return;
      }
      document.title = agent.name + " · ENESMA Realty";
      main.innerHTML = profileHtml(agent);
      return;
    }
    var roster = document.getElementById("agent-roster");
    if (roster) {
      if (!(window.ENESMA_AGENTS || []).length) {
        roster.innerHTML = '<p class="roster-empty">Agents Are Temporarily Unavailable.</p>';
      } else {
        roster.innerHTML = rosterHtml();
      }
      bindRoster();
    }
  }

  function whenDom(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function loadJson(url) {
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 5000) : 0;
    return fetch(url, { credentials: "omit", signal: ctrl ? ctrl.signal : undefined }).then(function (res) {
      if (timer) clearTimeout(timer);
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    }, function (err) {
      if (timer) clearTimeout(timer);
      throw err;
    });
  }

  function asList(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.agents)) return data.agents;
    return null;
  }

  function normalizeAgent(raw) {
    if (!raw || typeof raw !== "object") return null;
    var slug = String(raw.slug || "").trim();
    var name = String(raw.name || "").trim();
    if (!slug || !name) return null;
    var languages = [];
    if (Array.isArray(raw.languages)) {
      raw.languages.forEach(function (lang) {
        var value = String(lang || "").trim();
        if (value) languages.push(value);
      });
    }
    var social = [];
    if (Array.isArray(raw.social)) {
      raw.social.forEach(function (item) {
        if (!item || !item.href) return;
        social.push({ label: String(item.label || "Link"), href: String(item.href) });
      });
    }
    return {
      slug: slug,
      name: name,
      role: String(raw.role || ""),
      phone: String(raw.phone || ""),
      email: String(raw.email || ""),
      web: String(raw.web || ""),
      webLabel: String(raw.webLabel || ""),
      dre: String(raw.dre || ""),
      img: String(raw.img || raw.image || ""),
      languages: languages,
      social: social,
      bioHtml: String(raw.bioHtml || "")
    };
  }

  function normalizeList(data) {
    var list = asList(data);
    if (!list) throw new Error("shape");
    return list.map(normalizeAgent).filter(Boolean);
  }

  function resolveFeed(feedUrl) {
    var value = String(feedUrl || "").trim();
    if (!value) return root() + "data/roster.json";
    if (/^https?:\/\//i.test(value)) return value;
    return root() + value.replace(/^\//, "");
  }

  function publish(list) {
    window.ENESMA_AGENTS = list || [];
    whenDom(mount);
    return window.ENESMA_AGENTS;
  }

  var localUrl = root() + "data/roster.json";
  window.ENESMA_AGENTS = window.ENESMA_AGENTS || [];
  window.ENESMA_ROSTER_READY = loadJson(root() + "data/roster-feed.json").catch(function () {
    return { feedUrl: "" };
  }).then(function (cfg) {
    var url = resolveFeed(cfg && cfg.feedUrl);
    return loadJson(url).then(function (data) {
      return publish(normalizeList(data));
    }).catch(function () {
      if (url === localUrl) throw new Error("local");
      return loadJson(localUrl).then(function (data) {
        return publish(normalizeList(data));
      });
    });
  }).catch(function () {
    return publish([]);
  });
})();
