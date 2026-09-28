/* =============================================
   KEPHREN BUSINESS LIMITED — World Class Scripts
   ============================================= */

(function () {
  'use strict';

  /* ─── Year in Footer ─── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Header Scroll Effect ─── */
  const header = document.querySelector('header');
  let lastScrollY = 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = y;
  }, { passive: true });

  /* ─── Mobile Nav Toggle ─── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Active Link Highlight ─── */
  const sectionIds = ['about', 'team', 'services', 'contact'];
  const sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(function (s) { io.observe(s); });

  /* ─── Reveal on Scroll ─── */
  const revealEls = document.querySelectorAll('.reveal');
  const rio = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        rio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { rio.observe(el); });

  /* ─── Hero Image Carousel ─── */
  (function initHeroCarousel() {
    const track = document.querySelector('.hero-img-track');
    const dots = document.querySelectorAll('.hero-carousel-dots button');
    if (!track || !dots.length) return;

    let current = 0;
    const total = dots.length;
    let autoplayTimer;

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (index * 25) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    }

    function next() {
      goTo((current + 1) % total);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(next, 5000);
      });
    });

    autoplayTimer = setInterval(next, 5000);
    goTo(0);
  })();

  /* ─── Back to Top ─── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Counter Animation for Stats ─── */
  (function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10);
          var duration = 2000;
          var start = null;

          function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = target;
            }
          }
          requestAnimationFrame(step);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { cio.observe(c); });
  })();

  /* ─── Parallax Effect on Track Record Section ─── */
  (function initParallax() {
    const parallaxEls = document.querySelectorAll('.parallax-bg');
    if (!parallaxEls.length) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          parallaxEls.forEach(function (el) {
            var rect = el.parentElement.getBoundingClientRect();
            var speed = 0.3;
            var y = rect.top * speed;
            el.style.transform = 'translateY(' + y + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

})();
document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".num[data-target]");

  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.dataset.target;

      let current = 0;

      const duration = 1800; // milliseconds

      const increment = target / (duration / 16);

      function updateCounter() {

        current += increment;

        if (current < target) {

          const suffix = counter.dataset.suffix || "";
          counter.textContent = Math.floor(current) + suffix;

          requestAnimationFrame(updateCounter);

        } else {

          counter.textContent = target + suffix;

        }

      }

      updateCounter();

      observer.unobserve(counter);

    });

  }, {
    threshold: 0.4
  });

  counters.forEach(counter => observer.observe(counter));

});