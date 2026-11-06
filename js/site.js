/* Shared header and footer. Pages set data-root ("" | "../" | "../../")
   and data-page. 404.html sets window.__ENESMA_BASE instead. */
(function () {
  var NAV = [
    { id: "home", path: "", label: "Home" },
    { id: "buy", path: "buy/", label: "Buy" },
    { id: "sell", path: "sell/", label: "Sell" },
    { id: "refinance", path: "refinance/", label: "Refinance" },
    { id: "agents", path: "agents/", label: "Agents" },
    { id: "join", path: "join/", label: "Join" },
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

  function headerHtml() {
    var page = (document.body && document.body.getAttribute("data-page")) || "";
    var links = NAV.map(function (item) {
      var current = item.id === page ? ' aria-current="page"' : "";
      return '<a href="' + url(item.path) + '"' + current + ">" + item.label + "</a>";
    }).join("");
    return (
      '<header class="top">' +
        '<a class="brand" href="' + url("") + '" aria-label="Home">' +
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
        '<div class="foot-grid">' +
          '<div class="foot-brand">' +
            '<a class="brand" href="' + url("") + '" aria-label="Home">' +
              '<img src="' + url("assets/logo-white.png") + '" alt="" width="1600" height="369">' +
            "</a>" +
            '<p class="slogan"><span>UNDERPROMISE</span> <span>&amp; OVERDELIVER</span></p>' +
          "</div>" +
          "<div>" +
            "<h2>EXPLORE</h2>" +
            "<ul>" +
              '<li><a href="' + url("buy/") + '">Buy</a></li>' +
              '<li><a href="' + url("sell/") + '">Sell</a></li>' +
              '<li><a href="' + url("refinance/") + '">Refinance</a></li>' +
              '<li><a href="' + url("agents/") + '">Agents</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h2>OFFICE</h2>" +
            "<ul>" +
              '<li><a href="tel:+19095660505">(909) 566-0505</a></li>' +
              '<li><a href="mailto:enrique@enesmabroker.com">enrique@enesmabroker.com</a></li>' +
              "<li>Southern California</li>" +
              '<li><a href="' + url("join/") + '">Join</a></li>' +
              '<li><a href="' + url("contact/") + '">Contact</a></li>' +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="foot-legal">' +
          '<img src="' + url("assets/eho-white.png") + '" alt="Equal Housing Opportunity" width="421" height="446">' +
          "<span>DRE# 01926362</span>" +
          "<span>© 2026</span>" +
        "</div>" +
      "</footer>"
    );
  }

  function setOpen(top, btn, open) {
    top.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-lock", open);
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
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(top, btn, false);
    });
    document.addEventListener("click", function (event) {
      if (!top.classList.contains("nav-open")) return;
      if (!top.contains(event.target)) setOpen(top, btn, false);
    });
    var links = top.querySelectorAll(".nav a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () { setOpen(top, btn, false); });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
