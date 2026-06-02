/* Be The Boss Network — prototype interactions (illustrative only) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.querySelector(".nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", mobile.classList.contains("open") ? "true" : "false");
    });
  }

  /* ---------- Mock form submissions ---------- */
  document.querySelectorAll("[data-mock-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.getAttribute("data-success") || "Thanks! We'll be in touch shortly.";
      var note = form.querySelector("[data-form-note]") || document.createElement("div");
      note.textContent = "✓ " + msg;
      note.style.color = "#10B981";
      note.style.fontWeight = "600";
      note.style.marginTop = "10px";
      if (!note.parentNode) form.appendChild(note);
      form.querySelectorAll("input,select,textarea,button").forEach(function (el) {
        if (el.type !== "hidden") el.setAttribute("disabled", "disabled");
      });
    });
  });

  /* ---------- Removable active-filter chips ---------- */
  document.querySelectorAll(".active-filters .x").forEach(function (x) {
    x.addEventListener("click", function () {
      var chip = x.closest(".chip");
      if (chip) chip.remove();
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  if (reduce) return; /* skip motion-heavy enhancements */

  /* ---------- 3D cursor tilt on cards ---------- */
  var tiltSel = ".opp-card, .cat-card, .testi, .step";
  document.querySelectorAll(tiltSel).forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      var max = 6; /* degrees */
      card.style.transform =
        "perspective(900px) rotateX(" + (-py * max).toFixed(2) + "deg) rotateY(" +
        (px * max).toFixed(2) + "deg) translateY(-6px)";
    });
    card.addEventListener("pointerleave", function () { card.style.transform = ""; });
  });

  /* ---------- Hero parallax (floats + orbs follow the cursor) ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    var layers = hero.querySelectorAll("[data-parallax]");
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var cx = (e.clientX - r.left) / r.width - 0.5;
      var cy = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(function (l) {
        var d = parseFloat(l.getAttribute("data-parallax")) || 1;
        /* use the `translate` property so it composes with the float `transform` animation */
        l.style.translate = (cx * d * 20).toFixed(1) + "px " + (cy * d * 20).toFixed(1) + "px";
      });
    });
    hero.addEventListener("pointerleave", function () {
      layers.forEach(function (l) { l.style.translate = ""; });
    });
  }

  /* ---------- Animated count-up for stats ---------- */
  function animateCount(el) {
    var raw = el.getAttribute("data-count") || el.textContent;
    var m = raw.match(/^(\D*)([\d,\.]+)(.*)$/);
    if (!m) return;
    var prefix = m[1], digits = m[2], suffix = m[3];
    var hasComma = digits.indexOf(",") > -1;
    var target = parseFloat(digits.replace(/,/g, ""));
    if (isNaN(target)) return;
    var decimals = (digits.split(".")[1] || "").length;
    var start = null, dur = 1400;
    function fmt(n) {
      var s = decimals ? n.toFixed(decimals) : Math.round(n).toString();
      if (hasComma) s = parseFloat(s).toLocaleString("en-US");
      return prefix + s + suffix;
    }
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* ease-out */
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".hero-stats .num, .proof .num");
  if ("IntersectionObserver" in window && counters.length) {
    counters.forEach(function (el) { el.setAttribute("data-count", el.textContent.trim()); });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }
})();
