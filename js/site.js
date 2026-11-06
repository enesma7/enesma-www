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
    var items = ['<a href="' + url("agents/") + '">All agents</a>'];
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
        '<nav id="site-nav" class="nav" aria-label="Primary">' + links + "</nav>" +
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

  function boot() {
    var headerSlot = document.getElementById("site-header");
    var footerSlot = document.getElementById("site-footer");
    if (headerSlot) headerSlot.innerHTML = headerHtml();
    if (footerSlot) footerSlot.innerHTML = footerHtml();

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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
