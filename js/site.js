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
      items.push('<a href="' + url(agent.pageHref || ("agents/" + agent.slug + "/")) + '">' + esc(agent.name) + "</a>");
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
    startMedia();
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
    var started = false;
    setTimeout(function () { if (!started) finish(); }, 1200);
    function playMark() {
      started = true;
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
    if (index === 0) return url("assets/hero/hero-01-santa-monica.mp4?v=1");
    return HERO_BASE + HERO_CLIPS[index] + "?v=2";
  }

  var gestureVideos = [];
  var gestureBound = false;

  function prepHeroVideo(v) {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("preload", "auto");
    v.removeAttribute("poster");
  }

  function watchGesture(v) {
    if (gestureVideos.indexOf(v) === -1) gestureVideos.push(v);
    if (gestureBound) return;
    gestureBound = true;
    function kick() {
      for (var i = 0; i < gestureVideos.length; i++) {
        var video = gestureVideos[i];
        if (!video || video._userPaused || video._soundOn || !video.paused) continue;
        video.muted = true;
        video.defaultMuted = true;
        var result = video.play();
        if (result && result.catch) result.catch(function () {});
      }
    }
    ["touchstart", "click", "scroll"].forEach(function (type) {
      window.addEventListener(type, kick, { capture: true, passive: true, once: true });
    });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") kick();
    });
  }

  var soundVideos = [];
  var soundArmed = false;

  function videoHasAudio(v) {
    try {
      if (v.audioTracks && v.audioTracks.length > 0) return true;
      if (v.audioTracks && v.audioTracks.length === 0 && v.readyState >= 1) return false;
    } catch (e) {}
    if (typeof v.mozHasAudio === "boolean") return v.mozHasAudio;
    if (v.webkitAudioDecodedByteCount > 0) return true;
    try {
      var stream = v.captureStream ? v.captureStream() : null;
      if (stream) {
        if (stream.getAudioTracks().length > 0) return true;
        if (v.readyState >= 2 && stream.getAudioTracks().length === 0 && v.currentTime > 0.2) return false;
      }
    } catch (e) {}
    if (v.currentTime > 0.25 && v.webkitAudioDecodedByteCount === 0 && typeof v.audioTracks === "undefined") return false;
    return null;
  }

  function speakerIcon(muted) {
    if (muted) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M16 9l5 6M21 9l-5 6"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M16.5 8.5a4 4 0 010 7M19 6a7 7 0 010 12"/></svg>';
  }

  function syncSoundButton(v) {
    var btn = v._soundBtn;
    if (!btn) return;
    var muted = !!v.muted;
    btn.innerHTML = speakerIcon(muted);
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
    btn.setAttribute("aria-label", muted ? "Unmute Video" : "Mute Video");
  }

  function ensureSoundButton(v) {
    if (v._soundBtn) return;
    var host = v.parentElement;
    if (!host) return;
    if (window.getComputedStyle(host).position === "static") host.style.position = "relative";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sound-toggle";
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (v.muted) unmuteVideo(v);
      else muteVideo(v);
    });
    host.appendChild(btn);
    v._soundBtn = btn;
    syncSoundButton(v);
  }

  function muteVideo(v) {
    v._soundOn = false;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    syncSoundButton(v);
  }

  function unmuteVideo(v) {
    if (!v || !v._hasAudio) return;
    v._soundOn = true;
    v.muted = false;
    v.defaultMuted = false;
    v.removeAttribute("muted");
    syncSoundButton(v);
    var result = v.play();
    function stayMuted(err) {
      if (err && err.name === "AbortError") return;
      v._soundOn = false;
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      var again = v.play();
      if (again && again.catch) again.catch(function () {});
      syncSoundButton(v);
    }
    if (result && result.then) result.then(function () { syncSoundButton(v); }).catch(stayMuted);
  }

  function onVideoSurface(event) {
    var target = event && event.target;
    if (!target || !target.closest || !target.closest("video")) return false;
    if (target.closest(".sound-toggle")) return false;
    if (event.cancelable) event.preventDefault();
    return true;
  }

  function onFirstActivation(event) {
    if (event && event.type === "pointerdown") {
      onVideoSurface(event);
      return;
    }
    ["pointerdown", "touchend", "click", "keydown"].forEach(function (type) {
      window.removeEventListener(type, onFirstActivation, true);
    });
    var target = event && event.target;
    if (target && target.closest && target.closest(".sound-toggle")) return;
    onVideoSurface(event);
    for (var i = 0; i < soundVideos.length; i++) {
      var video = soundVideos[i];
      if (video._hasAudio && video.muted) {
        video._resumeOnce = true;
        unmuteVideo(video);
      }
    }
  }

  function trackSound(v) {
    if (soundVideos.indexOf(v) === -1) soundVideos.push(v);
    ensureSoundButton(v);
    if (soundArmed) return;
    soundArmed = true;
    ["pointerdown", "touchend", "click", "keydown"].forEach(function (type) {
      window.addEventListener(type, onFirstActivation, true);
    });
  }

  function considerSound(v) {
    if (!v || v._soundReady) return;
    var has = videoHasAudio(v);
    if (has === true) {
      v._hasAudio = true;
      v._soundReady = true;
      trackSound(v);
    } else if (has === false) {
      v._hasAudio = false;
      v._soundReady = true;
      if (v._soundBtn && v._soundBtn.parentNode) v._soundBtn.parentNode.removeChild(v._soundBtn);
      v._soundBtn = null;
    }
  }

  function armAutoplay(v, loop) {
    if (!v) return;
    prepHeroVideo(v);
    if (loop) {
      v.loop = true;
      v.setAttribute("loop", "");
    }
    function tryPlay() {
      if (!v.isConnected || v._userPaused || !v.paused) return;
      if (!v._soundOn) {
        v.muted = true;
        v.defaultMuted = true;
      }
      var result = v.play();
      if (result && result.then) {
        result.then(function () {}).catch(function (err) {
          if (err && err.name === "AbortError") return;
          if (!v.paused) return;
          watchGesture(v);
        });
      }
    }
    if (!v._autoplayHooked) {
      v._autoplayHooked = true;
      v.addEventListener("loadedmetadata", function () { considerSound(v); tryPlay(); });
      v.addEventListener("canplay", function () { considerSound(v); tryPlay(); });
      v.addEventListener("playing", function () { setTimeout(function () { considerSound(v); }, 250); });
    }
    tryPlay();
    considerSound(v);
  }

  function startMedia() {
    var videos = document.querySelectorAll("video");
    for (var i = 0; i < videos.length; i++) {
      var v = videos[i];
      var heroClip = v.closest && v.closest(".hero-videos");
      var wants = v.hasAttribute("autoplay") || v.hasAttribute("data-autoplay") || (heroClip && v.classList.contains("over"));
      if (heroClip) prepHeroVideo(v);
      considerSound(v);
      if (!wants) continue;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) continue;
      armAutoplay(v, v.hasAttribute("loop") || v.hasAttribute("data-autoplay"));
    }
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
    var waitingPlay = false;
    var wantSwitch = false;
    var heroVisible = true;
    var handoff = 0;
    var retryTimer = 0;
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
    var prefetched = {};
    function prefetch(src) {
      if (!src || prefetched[src]) return;
      prefetched[src] = true;
      var link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = src;
      document.head.appendChild(link);
    }
    function bufferedEnough(v) {
      if (!v || v.error || !(v.videoWidth > 1)) return false;
      if (v.readyState >= 4) return true;
      if (v.readyState >= 3) {
        try {
          var end = v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0;
          if (end - Math.max(v.currentTime || 0, 0) > 1.2) return true;
        } catch (e) {}
      }
      return false;
    }
    function arm(el, src) {
      prepHeroVideo(el);
      el.autoplay = false;
      el.removeAttribute("autoplay");
      el.preload = "auto";
      el.setAttribute("preload", "auto");
      if (el._heroSrc === src && el.getAttribute("src")) {
        if (el.error) {
          try { el.load(); } catch (e) {}
        }
        return;
      }
      el._heroSrc = src;
      el._parked = false;
      el._sawTail = false;
      el._soundReady = false;
      el._hasAudio = null;
      el.src = src;
      considerSound(el);
    }
    function parkUnder(el) {
      if (!el || fading || waitingPlay || wantSwitch) return;
      if (el === slots[active] || el.classList.contains("over")) return;
      if (el.readyState < 4 || el.paused) return;
      try { el.pause(); } catch (e) {}
    }
    function play(v) {
      if (!v || box.classList.contains("off") || !heroVisible) return;
      prepHeroVideo(v);
      v.autoplay = true;
      v.setAttribute("autoplay", "");
      // Stay in a loop until a handoff has a real frame. Stripping loop
      // here is what left the hero stuck on the last frame.
      if (!fading) {
        v.loop = true;
        v.setAttribute("loop", "");
      }
      if (v.ended || (isFinite(v.duration) && v.duration > 0 && v.currentTime >= v.duration - 0.05)) {
        try { v.currentTime = 0.04; } catch (e) {}
      }
      box.classList.remove("off");
      v.classList.add("on", "over");
      var result = v.play();
      if (result && result.then) {
        result.then(function () { clearGesture(); }).catch(function (err) {
          if (err && err.name === "AbortError") return;
          if (autoplayBlocked(err)) {
            showGesture();
            watchGesture(v);
          }
        });
      }
      return result;
    }
    function scheduleRetry() {
      if (retryTimer) return;
      retryTimer = setTimeout(function () {
        retryTimer = 0;
        if (wantSwitch) goNext();
      }, 1000);
    }
    function clearRetry() {
      if (!retryTimer) return;
      clearTimeout(retryTimer);
      retryTimer = 0;
    }
    function goNext(force) {
      if (fading || waitingPlay || box.classList.contains("off") || !heroVisible) return;
      var outgoing = active;
      var incoming = outgoing ? 0 : 1;
      var incomingClip = clipAt[incoming];
      var prev = slots[outgoing];
      var next = slots[incoming];
      if (!next.getAttribute("src")) arm(next, clips[incomingClip]);
      var ready = bufferedEnough(next) || (force && next.videoWidth > 1 && next.readyState >= 2);
      if (!ready) {
        wantSwitch = true;
        if (prev && !prev.loop) {
          prev.loop = true;
          prev.setAttribute("loop", "");
        }
        if (prev && (prev.paused || prev.ended) && !prev.error) play(prev);
        scheduleRetry();
        return;
      }
      var token = ++handoff;
      var started = false;
      wantSwitch = true;
      waitingPlay = true;
      function begin() {
        if (started || token !== handoff || !next.isConnected) return;
        if (!(next.videoWidth > 1)) return;
        started = true;
        waitingPlay = false;
        wantSwitch = false;
        clearRetry();
        if (next._onHandoff) next.removeEventListener("playing", next._onHandoff);
        prev.loop = false;
        prev.removeAttribute("loop");
        next.loop = true;
        next.setAttribute("loop", "");
        next._sawTail = false;
        prev.classList.add("over", "fading");
        next.classList.add("under");
        next.classList.remove("over");
        prev.style.opacity = "1";
        void prev.offsetWidth;
        prev.style.opacity = "0";
        active = incoming;
        fading = true;
        var follow = (incomingClip + 1) % clips.length;
        prefetch(clips[follow]);
        setTimeout(function () {
          if (token !== handoff) return;
          if (!next.isConnected) { fading = false; return; }
          prev.classList.remove("fading", "over", "on");
          prev.classList.add("under");
          prev.style.opacity = "1";
          next.classList.remove("under");
          next.classList.add("over", "on");
          try { prev.pause(); } catch (e) {}
          arm(prev, clips[follow]);
          clipAt[outgoing] = follow;
          fading = false;
        }, fadeMs);
      }
      function onPlaying() { begin(); }
      if (next._onHandoff) next.removeEventListener("playing", next._onHandoff);
      next._onHandoff = onPlaying;
      next.addEventListener("playing", onPlaying);
      prepHeroVideo(next);
      next.autoplay = true;
      next.preload = "auto";
      try {
        if (next.readyState >= 1 && next.currentTime > 0.3) next.currentTime = 0.001;
      } catch (e) {}
      var result = next.play();
      if (result && result.then) {
        result.then(function () { if (next.videoWidth > 1) begin(); }).catch(function (err) {
          if (token !== handoff) return;
          if (err && err.name === "AbortError") return;
          if (autoplayBlocked(err)) {
            showGesture();
            watchGesture(prev);
          }
        });
      } else if (!next.paused && next.videoWidth > 1) {
        begin();
      }
      setTimeout(function () {
        if (token !== handoff || started || !next.isConnected) return;
        waitingPlay = false;
        if (next._onHandoff) next.removeEventListener("playing", next._onHandoff);
        wantSwitch = true;
        if (prev && !prev.loop) {
          prev.loop = true;
          prev.setAttribute("loop", "");
        }
        if (prev && (prev.paused || prev.ended) && !prev.error) play(prev);
        scheduleRetry();
      }, 1000);
    }
    function recover(v) {
      if (v !== slots[active] || fading || waitingPlay || !heroVisible || box.classList.contains("off")) return;
      if (hero && hero.classList.contains("needs-gesture") && v.paused) return;
      if (v._recoverTimer) return;
      var mark = v.currentTime || 0;
      v._recoverTimer = setTimeout(function () {
        v._recoverTimer = 0;
        if (v !== slots[active] || fading || waitingPlay || !heroVisible) return;
        if (!v.paused && !v.ended && (v.currentTime || 0) > mark + 0.05) return;
        if (v.error || v.ended) {
          wantSwitch = true;
          goNext(true);
          if (fading || waitingPlay) return;
        }
        if (!v.error) play(v);
      }, 1000);
    }
    for (var i = 0; i < slots.length; i++) {
      (function (v) {
        v.addEventListener("playing", function () {
          if (v === slots[active]) {
            clearGesture();
            v._stuckTries = 0;
            v._errCount = 0;
            v._played = true;
          }
        });
        v.addEventListener("canplaythrough", function () {
          parkUnder(v);
          if (wantSwitch && v !== slots[active] && !fading && !waitingPlay) goNext();
        });
        v.addEventListener("stalled", function () { recover(v); });
        v.addEventListener("waiting", function () { recover(v); });
        v.addEventListener("error", function () {
          if (fading || waitingPlay) return;
          v._errCount = (v._errCount || 0) + 1;
          if (v._errCount > clips.length) return;
          if (v === slots[active]) {
            wantSwitch = true;
            goNext(true);
            if (fading || waitingPlay) return;
            var n = (clipAt[active] + 1) % clips.length;
            clipAt[active] = n;
            v.removeAttribute("src");
            v._heroSrc = "";
            arm(v, clips[n]);
            play(v);
            return;
          }
          var idx = v === slots[0] ? 0 : 1;
          var n2 = (clipAt[idx] + 1) % clips.length;
          clipAt[idx] = n2;
          v.removeAttribute("src");
          v._heroSrc = "";
          arm(v, clips[n2]);
        });
        v.addEventListener("timeupdate", function () {
          if (v !== slots[active] || fading || waitingPlay || !isFinite(v.duration)) return;
          v._seenTime = v.currentTime;
          v._seenAt = Date.now();
          if (v.currentTime >= v.duration - fadeMs / 1000) {
            v._sawTail = true;
            if (wantSwitch && retryTimer) return;
            goNext();
          } else if (v._sawTail && v.currentTime < 0.35) {
            v._sawTail = false;
            goNext();
          }
        });
        v.addEventListener("ended", function () {
          if (v !== slots[active] || fading || waitingPlay) return;
          wantSwitch = true;
          goNext();
          if (!fading && !waitingPlay) play(v);
        });
      })(slots[i]);
    }
    if (!slots[1].getAttribute("src")) arm(slots[1], clips[clipAt[1]]);
    restack();
    box.classList.remove("off");
    if (hero && !hero._heroClick) {
      hero._heroClick = true;
      hero.addEventListener("click", function () {
        if (!hero.classList.contains("needs-gesture")) return;
        play(slots[active]);
        if (wantSwitch) goNext();
      });
    }
    if ("IntersectionObserver" in window && hero) {
      var io = new IntersectionObserver(function (ents) {
        var vis = ents[0] && ents[0].isIntersecting;
        heroVisible = !!vis;
        if (!vis) {
          if (fading) return;
          var lead = slots[active];
          if (!lead || lead.currentTime <= 0) return;
          for (var n = 0; n < slots.length; n++) {
            try { slots[n].pause(); } catch (e) {}
          }
        } else {
          play(slots[active]);
          if (wantSwitch) goNext();
        }
      }, { threshold: 0.2 });
      io.observe(hero);
    }
    var watchAt = 0;
    var watchTime = -1;
    setInterval(function () {
      if (box.classList.contains("off") || !heroVisible) return;
      var v = slots[active];
      if (!v) return;
      if (fading || waitingPlay) {
        if (v.paused && !v.ended && !v.error) {
          var again = v.play();
          if (again && again.catch) again.catch(function () {});
        }
        watchTime = v.currentTime || 0;
        watchAt = Date.now();
        return;
      }
      if (hero && hero.classList.contains("needs-gesture") && v.paused) return;
      var now = Date.now();
      var t = v.currentTime || 0;
      if (!v.paused && !v.ended && Math.abs(t - watchTime) > 0.04) {
        watchTime = t;
        watchAt = now;
        v._stuckTries = 0;
        return;
      }
      if (!watchAt) watchAt = now;
      if (now - watchAt < 1000) return;
      watchAt = now;
      v._stuckTries = (v._stuckTries || 0) + 1;
      var nxt = slots[active ? 0 : 1];
      if (v.error || v.ended || (v._played && v._stuckTries >= 2)) {
        v._stuckTries = 0;
        wantSwitch = true;
        goNext(true);
        if (fading || waitingPlay) return;
      }
      if (!v.error) play(v);
      if (nxt && !nxt.getAttribute("src")) arm(nxt, clips[clipAt[active ? 0 : 1]]);
    }, 500);
    play(slots[active]);
  }

  function bindPromo() {
    var nodes = document.querySelectorAll("video[data-autoplay]");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (var n = 0; n < nodes.length; n++) {
      (function (v) {
        armAutoplay(v, true);
        v.addEventListener("pause", function () {
          if (v._auto) { v._auto = false; return; }
          if (v._resumeOnce) {
            v._resumeOnce = false;
            var again = v.play();
            if (again && again.catch) again.catch(function () {});
            return;
          }
          v._userPaused = true;
        });
        v.addEventListener("play", function () { v._userPaused = false; });
      })(nodes[n]);
    }
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (ents) {
      for (var i = 0; i < ents.length; i++) {
        var v = ents[i].target;
        if (ents[i].isIntersecting) {
          if (v._userPaused) continue;
          armAutoplay(v, true);
        } else if (!v.paused && v.currentTime > 0) {
          v._auto = true;
          v.pause();
        }
      }
    }, { threshold: 0.15 });
    for (var j = 0; j < nodes.length; j++) io.observe(nodes[j]);
  }

  function boot() {
    var headerSlot = document.getElementById("site-header");
    var footerSlot = document.getElementById("site-footer");
    if (headerSlot) headerSlot.innerHTML = headerHtml();
    if (footerSlot) footerSlot.innerHTML = footerHtml();
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
  startMedia();
  // The roster feed can take seconds. The lead clip is only five seconds,
  // so the next file has to start loading now, not after that feed.
  if (document.querySelector(".hero-videos")) bindHero();
  start();
})();
