/**
 * Scroll-reveal for elements marked with `data-reveal` (see global.css).
 * A container with `data-reveal-group` reveals all its `data-reveal` children at once,
 * matching the "section becomes visible" behaviour of the original React components.
 */
const show = (el: Element) => {
  el.classList.add("is-visible");
  el.querySelectorAll("[data-reveal]").forEach((child) => child.classList.add("is-visible"));
};

const targets = document.querySelectorAll("[data-reveal-group], [data-reveal]:not([data-reveal-group] [data-reveal])");

if (!("IntersectionObserver" in window)) {
  targets.forEach(show);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 },
  );
  targets.forEach((el) => observer.observe(el));
}

/** Elements with `data-scroll-state` get data-scrolled="true" once the page is scrolled past 50px. */
const scrollStateEls = document.querySelectorAll<HTMLElement>("[data-scroll-state]");
if (scrollStateEls.length) {
  const update = () => {
    const scrolled = String(window.scrollY > 50);
    scrollStateEls.forEach((el) => (el.dataset.scrolled = scrolled));
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}
