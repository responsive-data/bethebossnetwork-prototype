/* Be The Boss Network — prototype interactions (illustrative only) */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.querySelector(".nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      mobile.classList.toggle("open");
      var open = mobile.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Mock form submissions (no backend in a prototype)
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

  // Removable active-filter chips (cosmetic)
  document.querySelectorAll(".active-filters .x").forEach(function (x) {
    x.addEventListener("click", function () {
      var chip = x.closest(".chip");
      if (chip) chip.remove();
    });
  });

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
