(function () {
  const variants = [
    { key: "A", name: "队列总览" },
    { key: "B", name: "数据仪表盘" },
    { key: "C", name: "队列叙事" },
  ];

  const sections = document.querySelectorAll("[data-variant]");
  const label = document.querySelector("#variant-label");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  function activeVariant() {
    const requested = new URLSearchParams(window.location.search).get("variant");
    return variants.some((variant) => variant.key === requested) ? requested : "A";
  }

  function showVariant(key, updateHistory) {
    sections.forEach((section) => {
      section.hidden = section.dataset.variant !== key;
    });
    const variant = variants.find((item) => item.key === key);
    label.textContent = `${variant.key} — ${variant.name}`;
    document.body.dataset.activeVariant = key;
    document.title = `队列信息 · 方案 ${key} · SEARCH`;
    if (updateHistory) {
      const url = new URL(window.location.href);
      url.searchParams.set("variant", key);
      window.history.replaceState({}, "", url);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentIndex = variants.findIndex((variant) => variant.key === document.body.dataset.activeVariant);
      const direction = button.dataset.direction === "next" ? 1 : -1;
      const nextIndex = (currentIndex + direction + variants.length) % variants.length;
      showVariant(variants[nextIndex].key, true);
    });
  });

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  showVariant(activeVariant(), false);
})();
