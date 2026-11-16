/* Agent earnings calculator for /join/.
   Same math as enesma-calculators join-calculator.html
   at 6b390e57639c1900e746dcfda96665d6c68d6ac0.
   ENESMA terms confirmed by Enrique 2026-10-16:
   80% split, $10,000 annual cap, $200 admin fee per deal, no monthly fee. */
(function () {
  var root = document.getElementById("join-calculator");
  if (!root) return;

  var ENESMA = {
    split: 80,
    cap: 10000,
    monthly: 0,
    txnFee: 200,
    desk: 0, eoTxn: 0, eoYear: 0, tech: 0, review: 0,
    franPct: 0, franCap: 0, annual: 0, marketing: 0, postCap: 0,
    benefit: 0,
    capNote: "Cap resets on your anniversary date"
  };
  var GLOBAL = { price: 600000, comm: 2.5, txns: 10 };
  var CURRENT = { split: 80, cap: 21000, txnFee: 395, monthly: 50, plan: "split", flat: 700 };

  var MAIN = [["split", "Your Split (%)"], ["cap", "Annual Cap ($)"], ["monthly", "Monthly Fee ($/mo)"], ["txnFee", "Transaction Fee ($/deal)"]];
  var MAIN_FLAT = [["flat", "Flat Fee Per Transaction ($)"], ["monthly", "Monthly Fee ($/mo)"], ["txnFee", "Transaction Fee ($/deal)"]];
  var MORE = [
    ["desk", "Desk Fee ($/mo)"],
    ["eoTxn", "E&O Insurance ($/deal)"],
    ["eoYear", "E&O Insurance ($/yr)"],
    ["tech", "Technology Fee ($/mo)"],
    ["review", "Broker Review / Compliance ($/deal)"],
    ["marketing", "Marketing Fee ($/mo)"],
    ["franPct", "Franchise / Royalty (%)"],
    ["franCap", "Royalty Cap ($/yr, 0 = None)"],
    ["annual", "Annual / Membership Fee ($/yr)"],
    ["postCap", "Post-Cap Transaction Fee ($/deal)"],
    ["benefit", "Other Annual Benefit: Rev Share / Stock ($/yr)"]
  ];
  var B = [Object.assign({}, CURRENT), Object.assign({}, ENESMA)];
  var G = Object.assign({}, GLOBAL);
  var NAMES = ["Your Current Brokerage", "ENESMA Realty"];

  function n(v) {
    v = parseFloat(v);
    return isFinite(v) ? v : 0;
  }
  function money(v) {
    return (v < 0 ? "\u2212$" : "$") + Math.abs(Math.round(v)).toLocaleString("en-US");
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  function byId(id) {
    return root.querySelector("#" + id);
  }

  function calc(b) {
    var g = n(G.price) * n(G.comm) / 100;
    var T = Math.max(0, Math.round(n(G.txns)));
    var flat = b.plan === "flat";
    var sp = (b.split === "" || b.split == null) ? 100 : n(b.split);
    var cap = flat ? 0 : n(b.cap);
    var fc = n(b.franCap);
    var split = 0, fran = 0, perDeal = 0, post = 0, capDeal = null, franDeal = null;
    for (var i = 1; i <= T; i++) {
      var capped = cap > 0 && split >= cap;
      var s = flat ? n(b.flat) : g * (100 - sp) / 100;
      if (cap > 0) s = Math.min(s, Math.max(0, cap - split));
      split += s;
      if (cap > 0 && capDeal === null && split >= cap) capDeal = i;
      var f = g * n(b.franPct) / 100;
      if (fc > 0) f = Math.min(f, Math.max(0, fc - fran));
      fran += f;
      if (fc > 0 && franDeal === null && n(b.franPct) > 0 && fran >= fc) franDeal = i;
      perDeal += n(b.txnFee) + n(b.eoTxn) + n(b.review);
      if (capped) post += n(b.postCap);
    }
    var rec = 12 * (n(b.monthly) + n(b.desk) + n(b.tech) + n(b.marketing)) + n(b.eoYear) + n(b.annual);
    var cost = split + fran + perDeal + post + rec;
    var gci = g * T;
    return {
      flat: flat, gci: gci, split: split, fran: fran, perDeal: perDeal, post: post, rec: rec,
      cost: cost, benefit: n(b.benefit), net: gci - cost + n(b.benefit),
      capDeal: capDeal, franDeal: franDeal, cap: cap, fc: fc, T: T
    };
  }

  function inp(path, k, label, v, type) {
    var cls = type === "text" ? ' class="full"' : "";
    var extra = type ? "" : ' step="any" inputmode="decimal"';
    return '<label' + cls + ">" + label + '<input type="' + (type || "number") + '"' + extra +
      ' value="' + esc(v) + '" placeholder="0" data-p="' + path + '" data-k="' + k + '"></label>';
  }
  function fx(label, value, note) {
    return '<div class="fx">' + label + "<b>" + value + (note ? "<small>" + note + "</small>" : "") + "</b></div>";
  }

  function draw() {
    byId("jc-glob").innerHTML =
      inp("g", "price", "Average Sale Price ($)", G.price) +
      inp("g", "comm", "Your Commission Side (%)", G.comm) +
      inp("g", "txns", "Transactions Per Year", G.txns);

    B.forEach(function (b, i) {
      var fl = i === 0 && b.plan === "flat";
      var plan = b.plan || "split";
      var toggle = "";
      if (i === 0) {
        toggle = '<div class="seg" role="group" aria-label="Commission Plan">Commission Plan<span class="opts">' +
          [["split", "Split"], ["flat", "Flat Fee"]].map(function (o) {
            var on = plan === o[0];
            return '<button type="button" data-plan="' + o[0] + '" aria-pressed="' + on + '" class="' + (on ? "on" : "") + '">' + o[1] + "</button>";
          }).join("") +
          "</span></div>";
      }
      var fields = i === 1
        ? '<div class="f">' +
            inp(1, "split", "Your Split (%)", b.split) +
            fx("Annual Cap", money(ENESMA.cap)) +
            fx("Admin Fee", money(ENESMA.txnFee), "Per Transaction") +
            fx("Monthly Fee", ENESMA.monthly ? money(ENESMA.monthly) : "$0", "None") +
          '</div><p class="lock">Cap, admin fee and monthly fee are fixed ENESMA terms.</p>'
        : '<div class="f">' + (fl ? MAIN_FLAT : MAIN).map(function (m) { return inp(i, m[0], m[1], b[m[0]]); }).join("") + "</div>" +
          '<details><summary>More Fees</summary><div class="f">' +
            MORE.map(function (m) { return inp(i, m[0], m[1], b[m[0]]); }).join("") +
            inp(i, "capNote", "Cap Reset Note", b.capNote, "text") +
          "</div></details>";
      byId("jc-c" + i).innerHTML = '<div class="hrow"><h3>' + NAMES[i] + "</h3>" + toggle + "</div>" + fields + '<div class="res" id="jc-r' + i + '"></div>';
    });

    root.querySelectorAll("[data-plan]").forEach(function (el) {
      el.addEventListener("click", function () {
        var details = byId("jc-c0").querySelector("details");
        var open = details ? details.open : false;
        B[0].plan = el.getAttribute("data-plan");
        draw();
        var nextDetails = byId("jc-c0").querySelector("details");
        if (nextDetails) nextDetails.open = open;
        var focus = root.querySelector('[data-plan="' + el.getAttribute("data-plan") + '"]');
        if (focus) focus.focus();
      });
    });
    root.querySelectorAll("input").forEach(function (el) {
      el.addEventListener("input", function () {
        var target = el.getAttribute("data-p") === "g" ? G : B[+el.getAttribute("data-p")];
        target[el.getAttribute("data-k")] = el.value;
        update();
      });
    });
    update();
  }

  function capTxt(r, b) {
    var parts = [];
    if (r.cap > 0) {
      parts.push(r.capDeal
        ? "Cap hit on deal #" + r.capDeal + " of " + r.T
        : "Cap not reached (" + money(r.split) + " of " + money(r.cap) + ")");
    }
    if (r.fc > 0 && n(b.franPct) > 0) {
      parts.push(r.franDeal ? "Royalty cap hit on deal #" + r.franDeal : "Royalty cap not reached");
    }
    if (b.capNote) parts.push(esc(b.capNote));
    return parts.join(" \u00b7 ");
  }

  function update() {
    var R = B.map(calc);
    R.forEach(function (r, i) {
      byId("jc-r" + i).innerHTML =
        "<div><span>Gross Commission (GCI)</span><span>" + money(r.gci) + "</span></div>" +
        "<div><span>" + (r.flat ? "Flat Broker Fee" : "Broker Split") + "</span><span>" + money(r.split) + "</span></div>" +
        "<div><span>Franchise / Royalty</span><span>" + money(r.fran) + "</span></div>" +
        "<div><span>Per-Deal Fees (Txn, E&amp;O, Review)</span><span>" + money(r.perDeal) + "</span></div>" +
        "<div><span>Post-Cap Fees</span><span>" + money(r.post) + "</span></div>" +
        "<div><span>Monthly &amp; Annual Fees</span><span>" + money(r.rec) + "</span></div>" +
        "<div><span>Total Costs</span><span>" + money(r.cost) + "</span></div>" +
        "<div><span>Other Annual Benefit</span><span>+" + money(r.benefit) + "</span></div>" +
        '<div class="tot"><span>You Keep</span><span>' + money(r.net) + "</span></div>" +
        '<div class="capinfo">' + capTxt(r, B[i]) + "</div>";
    });
    var delta = R[1].net - R[0].net;
    var head = byId("jc-head");
    if (delta > 0) {
      head.className = "head";
      head.textContent = "You Keep " + money(delta) + " More Per Year With ENESMA Realty";
    } else if (delta === 0) {
      head.className = "head neutral";
      head.textContent = "Both Brokerages Come Out Even With These Numbers";
    } else {
      head.className = "head neutral";
      head.textContent = "Your Current Setup Keeps More With These Numbers. Talk To Us About Your Situation";
    }
    var maxNet = Math.max(1, R[0].net > 0 ? R[0].net : 0, R[1].net > 0 ? R[1].net : 0);
    byId("jc-bars").innerHTML = R.map(function (r, i) {
      var width = Math.max(0, r.net) / maxNet * 100;
      return '<div class="bar"><div class="lbl"><span>' + NAMES[i] + "</span><span>" + money(r.net) +
        '</span></div><div class="track"><div class="fill' + (i ? " g" : "") + '" style="width:' + width + '%"></div></div></div>';
    }).join("");
  }

  draw();
})();
