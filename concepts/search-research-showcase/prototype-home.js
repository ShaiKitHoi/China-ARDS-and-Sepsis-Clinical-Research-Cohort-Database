(function () {
  const variants = [
    { key: "A", name: "人文叙事" },
    { key: "B", name: "学术编辑部" },
    { key: "C", name: "队列数据优先" },
  ];
  const sections = document.querySelectorAll("[data-variant]");
  const label = document.querySelector("#variant-label");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const sceneContainer = document.querySelector(".a-hero-visual");
  const sceneImages = [...document.querySelectorAll("[data-scene-image]")];
  const sceneButtons = document.querySelectorAll("[data-scene]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sceneInterval = 6000;
  let activeSceneImageIndex = 0;
  let currentSceneKey = null;
  let sceneTimer = null;
  const scenes = {
    icu: {
      src: "assets/hero-icu-team.png",
      alt: "ICU 多学科团队在床旁共同讨论",
    },
    ecmo: {
      src: "assets/hero-ecmo-team.png",
      alt: "ECMO 团队共同检查循环管路与设备",
    },
    night: {
      src: "assets/hero-icu-night.png",
      alt: "ICU 夜班医护人员协同开展床旁工作",
    },
  };

  Object.values(scenes).forEach((scene) => {
    const image = new Image();
    image.src = scene.src;
  });

  function requestedVariant() {
    const value = new URLSearchParams(window.location.search).get("variant");
    return variants.some((variant) => variant.key === value) ? value : "A";
  }

  function render(key) {
    const current = variants.find((variant) => variant.key === key) || variants[0];
    document.body.dataset.currentVariant = current.key;
    sections.forEach((section) => {
      const active = section.dataset.variant === current.key;
      section.hidden = !active;
      section.setAttribute("aria-hidden", active ? "false" : "true");
    });
    label.textContent = `${current.key} — ${current.name}`;
    document.title = `方案 ${current.key} · ${current.name} | SEARCH 首页视觉原型`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function setVariant(key) {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", key);
    window.history.replaceState({ variant: key }, "", url);
    render(key);
  }

  function requestedScene() {
    const value = new URLSearchParams(window.location.search).get("scene");
    return scenes[value] ? value : "icu";
  }

  function renderScene(key, animate = true) {
    const currentKey = scenes[key] ? key : "icu";
    const current = scenes[currentKey];
    if (sceneImages.length && currentSceneKey !== currentKey) {
      if (!animate || reducedMotion.matches) {
        const activeImage = sceneImages[activeSceneImageIndex];
        activeImage.src = current.src;
        activeImage.alt = current.alt;
        activeImage.removeAttribute("aria-hidden");
        sceneImages.forEach((image, index) => {
          image.classList.toggle("is-active", index === activeSceneImageIndex);
          if (index !== activeSceneImageIndex) image.setAttribute("aria-hidden", "true");
        });
      } else {
        const nextImageIndex = (activeSceneImageIndex + 1) % sceneImages.length;
        const activeImage = sceneImages[activeSceneImageIndex];
        const nextImage = sceneImages[nextImageIndex];
        nextImage.src = current.src;
        nextImage.alt = current.alt;
        nextImage.removeAttribute("aria-hidden");
        nextImage.classList.add("is-active");
        activeImage.classList.remove("is-active");
        activeImage.setAttribute("aria-hidden", "true");
        activeSceneImageIndex = nextImageIndex;
      }
    }
    currentSceneKey = currentKey;
    sceneButtons.forEach((button) => {
      const active = button.dataset.scene === currentKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setScene(key, restartRotation = true) {
    const url = new URL(window.location.href);
    url.searchParams.set("scene", key);
    window.history.replaceState({ variant: document.body.dataset.currentVariant, scene: key }, "", url);
    renderScene(key);
    if (restartRotation) startSceneRotation();
  }

  function showNextScene() {
    const sceneKeys = Object.keys(scenes);
    const currentIndex = sceneKeys.indexOf(currentSceneKey);
    setScene(sceneKeys[(currentIndex + 1) % sceneKeys.length], false);
  }

  function stopSceneRotation() {
    window.clearInterval(sceneTimer);
    sceneTimer = null;
  }

  function startSceneRotation() {
    stopSceneRotation();
    if (reducedMotion.matches) return;
    sceneTimer = window.setInterval(() => {
      if (document.hidden || document.body.dataset.currentVariant !== "A") return;
      showNextScene();
    }, sceneInterval);
  }

  function cycle(direction) {
    const currentIndex = variants.findIndex((variant) => variant.key === document.body.dataset.currentVariant);
    const nextIndex = (currentIndex + direction + variants.length) % variants.length;
    setVariant(variants[nextIndex].key);
  }

  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => cycle(button.dataset.direction === "next" ? 1 : -1));
  });

  sceneButtons.forEach((button) => {
    button.addEventListener("click", () => setScene(button.dataset.scene));
  });

  sceneContainer.addEventListener("mouseenter", stopSceneRotation);
  sceneContainer.addEventListener("mouseleave", startSceneRotation);
  sceneContainer.addEventListener("focusin", stopSceneRotation);
  sceneContainer.addEventListener("focusout", (event) => {
    if (!sceneContainer.contains(event.relatedTarget)) startSceneRotation();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSceneRotation();
    else startSceneRotation();
  });
  reducedMotion.addEventListener("change", startSceneRotation);

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && (target.matches("input, textarea, [contenteditable]") || target.isContentEditable)) return;
    if (event.key === "ArrowLeft") cycle(-1);
    if (event.key === "ArrowRight") cycle(1);
  });

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  window.addEventListener("popstate", () => {
    render(requestedVariant());
    renderScene(requestedScene());
  });
  render(requestedVariant());
  renderScene(requestedScene(), false);
  startSceneRotation();
})();
