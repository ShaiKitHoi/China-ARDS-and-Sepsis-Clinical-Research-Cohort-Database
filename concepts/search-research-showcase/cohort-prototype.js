(function () {
  const sections = document.querySelectorAll("[data-variant]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  function showVariant() {
    sections.forEach((section) => {
      section.hidden = section.dataset.variant !== "A";
    });
    document.body.dataset.activeVariant = "A";
    document.title = "队列信息 · SEARCH";
  }

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  showVariant();
})();
