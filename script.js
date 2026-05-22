const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-category]");
const year = document.querySelector("[data-year]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
};

setHeaderState();
year.textContent = new Date().getFullYear();

window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navPanel.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    projects.forEach((project) => {
      const shouldShow = selected === "all" || project.dataset.category === selected;
      project.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
