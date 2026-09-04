(function () {
  const variant = { key: "A", name: "人文叙事" };
  const sections = document.querySelectorAll("[data-variant]");
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

  function render() {
    document.body.dataset.currentVariant = variant.key;
    sections.forEach((section) => {
      const active = section.dataset.variant === variant.key;
      section.hidden = !active;
      section.setAttribute("aria-hidden", active ? "false" : "true");
    });
    document.title = "SEARCH | Clinical Research Collaboration Network";
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

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  window.addEventListener("popstate", () => {
    renderScene(requestedScene());
  });
  render();
  renderScene(requestedScene(), false);
  startSceneRotation();
})();
