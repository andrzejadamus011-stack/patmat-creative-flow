/* Pat&Mat.corp — animacje strony (czysty JavaScript, bez bibliotek) */
(function () {
  "use strict";

  var doc = document.documentElement;

  /* --- postęp przewijania 0→1 --- */
  function scrollProgress() {
    var h = doc.scrollHeight - window.innerHeight;
    return h > 0 ? Math.min(Math.max(window.scrollY / h, 0), 1) : 0;
  }

  var marker = document.querySelector("#scroll-marker span");
  var brush1 = document.querySelector("#brush-1");
  var brush2 = document.querySelector("#brush-2");
  var nav = document.querySelector(".nav");
  var navBrand = document.querySelector(".nav .brand");
  var heroLogo = document.querySelector(".hero__logo");
  var heroTag = document.querySelector(".hero__tag");
  var heroScroll = document.querySelector(".hero__scroll");
  var LEN = 4200;

  function onScroll() {
    var p = scrollProgress();

    if (marker) marker.style.transform = "scaleX(" + p + ") skewX(-12deg)";

    if (brush1) {
      brush1.style.strokeDashoffset = LEN * (1 - p);
      brush1.style.transform =
        "translate3d(0," + p * 900 + "px,0) rotate(" + (-2 + p * 6) + "deg)";
    }
    if (brush2) {
      brush2.style.strokeDashoffset = LEN * (1 - p);
      brush2.style.transform = "translate3d(0," + -p * 700 + "px,0)";
    }

    // postęp hero: logo stoi w miejscu, wjeżdża menu, potem logo odjeżdża
    var hp = Math.min(Math.max(window.scrollY / (window.innerHeight * 1.1), 0), 1);
    var out = Math.min(Math.max((hp - 0.45) / 0.55, 0), 1);

    if (nav) nav.setAttribute("data-shown", hp > 0.12 ? "true" : "false");
    if (navBrand) navBrand.style.opacity = hp > 0.5 ? "1" : "0";

    if (heroLogo) {
      heroLogo.style.opacity = String(1 - out);
      heroLogo.style.transform =
        "translateY(" + out * -70 + "px) scale(" + (1 - out * 0.12) + ")";
    }
    if (heroTag) {
      heroTag.style.opacity = String(1 - out * 1.6);
      heroTag.style.letterSpacing = 0.4 + hp * 0.12 + "em";
    }
    if (heroScroll) heroScroll.style.opacity = String(1 - hp * 2.2);
  }

  var ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      onScroll();
    });
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  onScroll();

  /* --- odsłanianie sekcji przy scrollu --- */
  var revealables = document.querySelectorAll(".reveal, .hl");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-visible", "true");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.setAttribute("data-visible", "true");
    });
  }

  /* --- liczniki --- */
  var counters = document.querySelectorAll("[data-count-to]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          var el = e.target;
          var to = parseInt(el.getAttribute("data-count-to"), 10) || 0;
          var suffix = el.getAttribute("data-count-suffix") || "";
          var start = performance.now();
          (function tick(t) {
            var pr = Math.min((t - start) / 1500, 1);
            el.textContent = Math.round(to * (1 - Math.pow(1 - pr, 3))) + suffix;
            if (pr < 1) requestAnimationFrame(tick);
          })(start);
        });
      },
      { threshold: 0.4 },
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  }

  /* --- magnetyczne przyciski --- */
  document.querySelectorAll(".magnetic").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width / 2)) * 0.22;
      var y = (e.clientY - (r.top + r.height / 2)) * 0.22;
      el.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    });
    el.addEventListener("pointerleave", function () {
      el.style.transform = "translate3d(0,0,0)";
    });
  });

  /* --- rok w stopce --- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
