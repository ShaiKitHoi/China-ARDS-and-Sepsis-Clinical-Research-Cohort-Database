(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
})();
