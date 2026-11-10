/* Shared header and footer. Pages set data-root ("" | "../" | "../../")
   and data-page. 404.html sets window.__ENESMA_BASE instead.
   Agent names in the Agents menu come from js/agents.js. */
(function () {
  var NAV = [
    { id: "home", path: "", label: "Home" },
    { id: "buy", path: "buy/", label: "Buy" },
    { id: "sell", path: "sell/", label: "Sell" },
    { id: "refinance", path: "refinance/", label: "Refinance" },
    { id: "join", path: "join/", label: "Join" },
    { id: "agents", path: "agents/", label: "Agents", menu: true },
    { id: "contact", path: "contact/", label: "Contact" }
  ];

  function base() {
    var body = document.body;
    if (body && body.hasAttribute("data-root")) return body.getAttribute("data-root");
    if (window.__ENESMA_BASE) return window.__ENESMA_BASE;
    return "/";
  }

  function url(path) {
    var root = base();
    if (!path) return root || "./";
    return root + path;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function agentMenu() {
    var list = window.ENESMA_AGENTS || [];
    var items = ['<a href="' + url("agents/") + '">All Agents</a>'];
    for (var i = 0; i < list.length; i++) {
      var agent = list[i];
      items.push('<a href="' + url("agents/" + agent.slug + "/") + '">' + esc(agent.name) + "</a>");
    }
    return items.join("");
  }

  function navItem(item, page) {
    var current = item.id === page ? ' aria-current="page"' : "";
    if (!item.menu) {
      return '<a href="' + url(item.path) + '"' + current + ">" + item.label + "</a>";
    }
    return (
      '<div class="drop">' +
        '<a class="drop-link" href="' + url(item.path) + '"' + current + ">" + item.label + "</a>" +
        '<button class="caret-btn" type="button" aria-expanded="false" aria-controls="agents-menu" aria-label="Show agent pages">' +
          '<i class="caret" aria-hidden="true"></i>' +
        "</button>" +
        '<div class="drop-menu" id="agents-menu">' + agentMenu() + "</div>" +
      "</div>"
    );
  }

  function headerHtml() {
    var page = (document.body && document.body.getAttribute("data-page")) || "";
    var links = NAV.map(function (item) { return navItem(item, page); }).join("");
    return (
      '<header class="top">' +
        '<a class="brand" href="' + url("") + '" aria-label="ENESMA Realty home">' +
          '<img src="' + url("assets/logo-white.png") + '" alt="" width="1600" height="369">' +
        "</a>" +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
        '<nav id="site-nav" class="nav" aria-label="Primary">' + links +
          '<a class="nav-login" href="https://agent.enesmarealty.com">Agent Login</a>' +
        "</nav>" +
      "</header>"
    );
  }

  function footerHtml() {
    return (
      '<footer class="site-footer">' +
        '<div class="foot">' +
          '<div class="foot-brand">' +
            '<a class="brand" href="' + url("") + '" aria-label="ENESMA Realty home">' +
              '<img src="' + url("assets/logo-white.png") + '" alt="" width="1600" height="369">' +
            "</a>" +
            '<p class="tag">Underpromise &amp; Overdeliver</p>' +
            '<div class="eho">' +
              '<img src="' + url("assets/eho-white.png") + '" alt="Equal Housing Opportunity" width="421" height="446">' +
              "<span>DRE# 01926362</span>" +
            "</div>" +
          "</div>" +
          "<div>" +
            "<h2>Explore</h2>" +
            "<ul>" +
              '<li><a href="' + url("buy/") + '">Buy</a></li>' +
              '<li><a href="' + url("sell/") + '">Sell</a></li>' +
              '<li><a href="' + url("refinance/") + '">Refinance</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h2>Company</h2>" +
            "<ul>" +
              '<li><a href="' + url("join/") + '">Join</a></li>' +
              '<li><a href="' + url("agents/") + '">Agents</a></li>' +
              '<li><a href="' + url("contact/") + '">Contact</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h2>Contact</h2>" +
            "<ul>" +
              "<li>Enrique Esparza, Broker</li>" +
              '<li><a href="tel:+19095660505">(909) 566-0505</a></li>' +
              '<li><a href="mailto:enrique@enesmabroker.com">enrique@enesmabroker.com</a></li>' +
              "<li>Southern California</li>" +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<p class="legal">© 2026 ENESMA Realty. All rights reserved.</p>' +
      "</footer>"
    );
  }

  function setOpen(top, btn, open) {
    top.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-lock", open);
    if (!open) closeDrop(top);
  }

  function closeDrop(top) {
    var drop = top.querySelector(".drop");
    var caret = top.querySelector(".caret-btn");
    if (drop) drop.classList.remove("open");
    if (caret) caret.setAttribute("aria-expanded", "false");
  }

  var INTRO_MS = 3000;
  var introToken = 0;

  function introSeen() {
    try { return sessionStorage.getItem("enesma_intro_seen") === "1"; }
    catch (e) { return false; }
  }
  function markIntroSeen() {
    try { sessionStorage.setItem("enesma_intro_seen", "1"); } catch (e) {}
  }
  function clearIntroPending() {
    document.documentElement.classList.remove("brand-intro-pending");
  }
  function endBrandIntro(token) {
    if (token && token !== introToken) return;
    var el = document.querySelector(".brand-intro");
    if (el && el.parentNode) el.parentNode.removeChild(el);
    clearIntroPending();
  }
  function maybePlayIntro() {
    var page = (document.body && document.body.getAttribute("data-page")) || "";
    if (page !== "home") return;
    if (introSeen()) {
      clearIntroPending();
      return;
    }
    markIntroSeen();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearIntroPending();
      return;
    }
    var token = ++introToken;
    var overlay = document.createElement("div");
    overlay.className = "brand-intro";
    overlay.setAttribute("role", "button");
    overlay.setAttribute("tabindex", "0");
    overlay.setAttribute("aria-label", "ENESMA");
    var mark = document.createElement("div");
    mark.className = "brand-intro-mark";
    var zoom = document.createElement("div");
    zoom.className = "brand-intro-zoom";
    var logo = document.createElement("img");
    logo.className = "brand-intro-logo";
    logo.alt = "";
    logo.draggable = false;
    logo.src = url("assets/logo-gold.svg?v=1");
    var glint = document.createElement("div");
    glint.className = "brand-intro-glint";
    glint.setAttribute("aria-hidden", "true");
    var streak = document.createElement("span");
    glint.appendChild(streak);
    zoom.appendChild(logo);
    zoom.appendChild(glint);
    mark.appendChild(zoom);
    overlay.appendChild(mark);
    document.body.appendChild(overlay);
    clearIntroPending();
    var finished = false;
    var raf = 0;
    var safety = 0;
    function finish() {
      if (finished || token !== introToken) return;
      finished = true;
      if (raf) cancelAnimationFrame(raf);
      if (safety) clearTimeout(safety);
      document.removeEventListener("keydown", onKey);
      endBrandIntro(token);
    }
    function onKey(e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    }
    overlay.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      finish();
    });
    document.addEventListener("keydown", onKey);
    safety = setTimeout(finish, INTRO_MS + 700);
    function playMark() {
      var start = 0;
      function frame(now) {
        if (finished || token !== introToken) return;
        if (!start) start = now;
        var t = Math.min(1, (now - start) / INTRO_MS);
        drawIntroFrame(zoom, streak, overlay, t);
        if (t >= 1) { finish(); return; }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }
    if (logo.complete) playMark();
    else {
      logo.onload = function () { if (!finished) playMark(); };
      logo.onerror = function () { finish(); };
    }
  }
  function drawIntroFrame(zoom, streak, overlay, t) {
    var visual = 1;
    var alpha = 1;
    var veil = 1;
    if (t < 0.14) {
      alpha = 1 - Math.pow(1 - t / 0.14, 3);
    } else if (t >= 0.46) {
      var u = (t - 0.46) / 0.54;
      var rush = u * u;
      visual = 1 + 7 * rush;
      var fadeU = Math.max(0, (u - 0.22) / 0.78);
      veil = 1 - fadeU * fadeU * (3 - 2 * fadeU);
    }
    zoom.style.transform = "translate(-50%, -50%) scale(" + (visual / 8).toFixed(4) + ")";
    zoom.style.opacity = alpha.toFixed(3);
    overlay.style.opacity = veil.toFixed(3);
    if (t >= 0.14 && t < 0.46) {
      var g = (t - 0.14) / 0.32;
      var sweep = g * g * (3 - 2 * g);
      streak.style.opacity = "1";
      streak.style.transform = "translate3d(" + (-150 + sweep * 860).toFixed(1) + "%, 0, 0)";
    } else {
      streak.style.opacity = "0";
    }
  }

  var HERO_BASE = "https://agent.enesmarealty.com/assets/hero/";
  var HERO_CLIPS = [
    "hero-01-santa-monica.mp4",
    "hero-02-hollywood.mp4",
    "hero-03-downtown-la.mp4",
    "hero-04-big-bear.mp4",
    "hero-05-palm-springs.mp4",
    "hero-06-palos-verdes.mp4",
    "hero-07-catalina.mp4",
    "hero-08-marina-del-rey.mp4",
    "hero-09-beverly-hills.mp4",
    "hero-10-long-beach.mp4",
    "hero-11-redondo-beach.mp4",
    "hero-12-san-diego.mp4"
  ];

  function heroSrc(index) {
    return HERO_BASE + HERO_CLIPS[index] + "?v=2";
  }

  function prepHeroVideo(v) {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.removeAttribute("poster");
  }

  function bindHero() {
    var box = document.querySelector(".hero-videos");
    if (!box) return;
    var hero = box.closest(".home-hero");
    var clips = HERO_CLIPS.map(function (_, i) { return heroSrc(i); });
    var slots = box.querySelectorAll("video");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      box.classList.add("off");
      for (var r = 0; r < slots.length; r++) {
        slots[r].removeAttribute("autoplay");
        slots[r].removeAttribute("src");
        slots[r].removeAttribute("poster");
        try { slots[r].pause(); } catch (e) {}
      }
      return;
    }
    if (slots.length < 2 || !clips.length) return;
    for (var s = 0; s < slots.length; s++) prepHeroVideo(slots[s]);
    var active = 0;
    var clipAt = [0, 1 % clips.length];
    var fading = false;
    var fadeMs = 1600;
    slots[0]._heroSrc = slots[0]._heroSrc || clips[0];
    slots[1]._heroSrc = slots[1]._heroSrc || clips[1 % clips.length];

    function showGesture() {
      if (hero) hero.classList.add("needs-gesture");
    }
    function clearGesture() {
      if (hero) hero.classList.remove("needs-gesture");
    }
    function autoplayBlocked(err) {
      if (!err || err.name === "NotAllowedError") return true;
      return /not allowed|user gesture|interact with|user agent/i.test(String(err && err.message || ""));
    }
    function restack() {
      for (var i = 0; i < slots.length; i++) {
        var v = slots[i];
        var top = i === active;
        v.classList.toggle("over", top);
        v.classList.toggle("under", !top);
        v.classList.toggle("on", top);
        if (!v.classList.contains("fading")) v.style.opacity = "1";
      }
    }
    function arm(el, src) {
      prepHeroVideo(el);
      el.autoplay = false;
      el.removeAttribute("autoplay");
      if (el._heroSrc === src && el.getAttribute("src")) return;
      el._heroSrc = src;
      el.src = src;
      el.addEventListener("loadeddata", function parkFrame() {
        if (el.classList.contains("over")) return;
        try {
          if (el.currentTime < 0.001) el.currentTime = 0.001;
        } catch (e) {}
        try { el.pause(); } catch (e) {}
      }, { once: true });
    }
    function play(v) {
      if (!v || box.classList.contains("off")) return;
      prepHeroVideo(v);
      v.autoplay = true;
      var wasLoop = v.loop || v.hasAttribute("loop");
      v.loop = false;
      v.removeAttribute("loop");
      if (wasLoop && isFinite(v.duration) && v.currentTime > v.duration - fadeMs / 1000 - 0.3) {
        try { v.currentTime = 0.05; } catch (e) {}
      }
      v.setAttribute("autoplay", "");
      box.classList.remove("off");
      v.classList.add("on", "over");
      var result = v.play();
      if (result && result.then) {
        result.then(function () { clearGesture(); }).catch(function (err) {
          if (err && err.name === "AbortError") return;
          if (autoplayBlocked(err)) showGesture();
        });
      }
      return result;
    }
    function goNext() {
      if (fading || box.classList.contains("off")) return;
      fading = true;
      var outgoing = active;
      var incoming = outgoing ? 0 : 1;
      var incomingClip = clipAt[incoming];
      var prev = slots[outgoing];
      var next = slots[incoming];
      var started = false;
      function begin() {
        if (started || !next.isConnected) return;
        if (!(next.videoWidth > 1)) return;
        started = true;
        next.removeEventListener("playing", onPlaying);
        prev.classList.add("over", "fading");
        next.classList.add("under");
        next.classList.remove("over");
        prev.style.opacity = "1";
        void prev.offsetWidth;
        prev.style.opacity = "0";
        active = incoming;
        setTimeout(function () {
          if (!next.isConnected) { fading = false; return; }
          prev.classList.remove("fading", "over", "on");
          prev.classList.add("under");
          prev.style.opacity = "1";
          next.classList.remove("under");
          next.classList.add("over", "on");
          try { prev.pause(); } catch (e) {}
          var follow = (incomingClip + 1) % clips.length;
          arm(prev, clips[follow]);
          clipAt[outgoing] = follow;
          fading = false;
        }, fadeMs);
      }
      function onPlaying() { begin(); }
      next.addEventListener("playing", onPlaying);
      prepHeroVideo(next);
      next.autoplay = true;
      try {
        if (next.currentTime > 0.2 || next.currentTime < 0.001) next.currentTime = 0.001;
      } catch (e) {}
      var result = next.play();
      if (result && result.then) {
        result.then(function () { if (next.videoWidth > 1) begin(); }).catch(function (err) {
          if (err && err.name === "AbortError") return;
          if (autoplayBlocked(err)) showGesture();
        });
      }
      setTimeout(function () {
        if (started || !next.isConnected) return;
        fading = false;
        next.removeEventListener("playing", onPlaying);
        try { next.pause(); } catch (e) {}
        restack();
      }, 1200);
    }
    for (var i = 0; i < slots.length; i++) {
      (function (v) {
        v.addEventListener("playing", function () {
          if (v === slots[active]) clearGesture();
        });
        v.addEventListener("error", function () {
          if (v !== slots[active] || fading) return;
          goNext();
        });
        v.addEventListener("timeupdate", function () {
          if (v !== slots[active] || fading || !isFinite(v.duration)) return;
          if (v.currentTime >= v.duration - fadeMs / 1000) goNext();
        });
        v.addEventListener("ended", function () {
          if (v === slots[active]) goNext();
        });
      })(slots[i]);
    }
    if (!slots[1].getAttribute("src")) arm(slots[1], clips[clipAt[1]]);
    else {
      (function (el) {
        function park() {
          if (el.classList.contains("over")) return;
          try { if (el.currentTime < 0.001) el.currentTime = 0.001; } catch (e) {}
          try { el.pause(); } catch (e) {}
        }
        if (el.readyState >= 2) park();
        else el.addEventListener("loadeddata", park, { once: true });
      })(slots[1]);
    }
    restack();
    box.classList.remove("off");
    if (hero && !hero._heroClick) {
      hero._heroClick = true;
      hero.addEventListener("click", function () {
        if (!hero.classList.contains("needs-gesture")) return;
        play(slots[active]);
      });
    }
    if ("IntersectionObserver" in window && hero) {
      var io = new IntersectionObserver(function (ents) {
        var vis = ents[0] && ents[0].isIntersecting;
        if (!vis) {
          if (fading) return;
          for (var n = 0; n < slots.length; n++) {
            try { slots[n].pause(); } catch (e) {}
          }
        } else {
          play(slots[active]);
        }
      }, { threshold: 0.2 });
      io.observe(hero);
    }
    play(slots[active]);
  }

  function bindPromo() {
    var nodes = document.querySelectorAll("video[data-autoplay]");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (ents) {
      for (var i = 0; i < ents.length; i++) {
        var v = ents[i].target;
        if (ents[i].isIntersecting) {
          if (v._held) continue;
          if (!v._started) {
            v.muted = true;
            v.setAttribute("muted", "");
            v.playsInline = true;
            v._started = true;
          }
          var result = v.play();
          if (result && result.catch) result.catch(function () {});
        } else if (!v.paused) {
          v._auto = true;
          v.pause();
        }
      }
    }, { threshold: 0.4 });
    for (var n = 0; n < nodes.length; n++) {
      (function (v) {
        v.addEventListener("pause", function () {
          if (v._auto) { v._auto = false; return; }
          v._held = true;
        });
        v.addEventListener("play", function () { v._held = false; });
        io.observe(v);
      })(nodes[n]);
    }
  }

  function boot() {
    var headerSlot = document.getElementById("site-header");
    var footerSlot = document.getElementById("site-footer");
    if (headerSlot) headerSlot.innerHTML = headerHtml();
    if (footerSlot) footerSlot.innerHTML = footerHtml();
    bindHero();
    bindPromo();

    var btn = document.querySelector(".menu-btn");
    var top = document.querySelector(".top");
    if (!btn || !top) return;

    btn.addEventListener("click", function () {
      setOpen(top, btn, !top.classList.contains("nav-open"));
    });

    var caret = top.querySelector(".caret-btn");
    var drop = top.querySelector(".drop");
    if (caret && drop) {
      caret.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = !drop.classList.contains("open");
        drop.classList.toggle("open", open);
        caret.setAttribute("aria-expanded", open ? "true" : "false");
      });
      drop.addEventListener("mouseleave", function () {
        if (window.matchMedia("(min-width: 960px)").matches) closeDrop(top);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(top, btn, false);
    });
    document.addEventListener("click", function (event) {
      if (top.classList.contains("nav-open") && !top.contains(event.target)) setOpen(top, btn, false);
      if (drop && drop.classList.contains("open") && !drop.contains(event.target)) closeDrop(top);
    });
    var links = top.querySelectorAll(".nav a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () { setOpen(top, btn, false); });
    }
  }

  function start() {
    function go() {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
      else boot();
    }
    var ready = window.ENESMA_ROSTER_READY;
    if (ready && ready.then) ready.then(go, go);
    else go();
  }

  maybePlayIntro();
  start();
})();
