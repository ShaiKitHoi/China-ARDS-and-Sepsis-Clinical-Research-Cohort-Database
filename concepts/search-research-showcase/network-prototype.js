(function () {
  const centerRoot = document.querySelector("#center-grid");
  const filters = document.querySelectorAll("[data-region]");
  const visibleCount = document.querySelector("#visible-center-count");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  let openCard = null;
  let networkData = null;
  let activeRegion = "all";

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function localize(record, field) {
    if (document.documentElement.lang === "en" && record[`${field}_en`]) return record[`${field}_en`];
    return record[field];
  }

  function isEnglish() {
    return document.documentElement.lang === "en";
  }

  function firstLine(text) {
    return String(text || (isEnglish() ? "Team member" : "团队成员")).split("\n").find(Boolean) || (isEnglish() ? "Team member" : "团队成员");
  }

  function personCard(person, onProfileToggle) {
    const introduction = localize(person, "introduction");
    const card = element("article", `member-card${person.is_pi ? " is-pi" : ""}`);
    const image = element("img");
    image.src = person.photo;
    image.alt = `${person.name}${person.is_pi ? (isEnglish() ? ", Branch-center PI" : "，分中心 PI") : ""}`;
    image.loading = "lazy";
    card.append(image);

    const copy = element("div", "member-card-copy");
    copy.append(element("span", "member-role", person.is_pi ? (isEnglish() ? "Branch-center PI" : "分中心 PI") : (isEnglish() ? "Team member" : "团队成员")));
    copy.append(element("h5", "", person.name));
    copy.append(element("p", "member-title", firstLine(introduction)));

    if (introduction && introduction !== firstLine(introduction)) {
      const details = element("details", "member-bio");
      details.append(element("summary", "", isEnglish() ? "View profile" : "查看简介"));
      details.append(element("p", "", introduction));
      details.addEventListener("toggle", onProfileToggle);
      copy.append(details);
    }
    card.append(copy);
    return card;
  }

  function closeCard(card, updateUrl = true) {
    if (!card) return;
    const details = card.querySelector(".center-detail");
    const button = card.querySelector(".center-toggle");
    card.classList.remove("is-open");
    details.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.querySelector("span").textContent = isEnglish() ? "View center members" : "查看中心成员";
    if (openCard === card) openCard = null;
    if (updateUrl && window.location.hash === `#${card.id}`) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }

  function openCenterCard(card, updateUrl = true) {
    if (openCard && openCard !== card) closeCard(openCard, false);
    const details = card.querySelector(".center-detail");
    const button = card.querySelector(".center-toggle");
    card.classList.add("is-open");
    details.hidden = false;
    button.setAttribute("aria-expanded", "true");
    button.querySelector("span").textContent = isEnglish() ? "Collapse center members" : "收起中心成员";
    openCard = card;
    if (updateUrl) history.replaceState(null, "", `#${card.id}`);
  }

  function toggleCenter(card) {
    if (card.classList.contains("is-open")) closeCard(card);
    else openCenterCard(card);
  }

  function centerCard(center) {
    const englishPage = document.documentElement.lang === "en";
    const centerName = localize(center, "center_name");
    const centerRegion = localize(center, "region");
    const card = element("article", "center-card");
    card.id = `center-${center.center_id}`;
    card.dataset.region = center.region;

    const top = element("div", "center-card-top");
    const meta = element("div", "center-card-meta");
    meta.append(element("span", "region-tag", centerRegion));
    meta.append(element("span", "member-count", englishPage ? `${center.member_count} public members` : `${center.member_count} 名公开成员`));
    top.append(meta);
    top.append(element("h3", "", centerName));
    card.append(top);

    const piList = element("div", "pi-list");
    center.pis.forEach((pi) => {
      const piRow = element("div", "pi-row");
      const image = element("img");
      image.src = pi.photo;
      image.alt = `${pi.name}${englishPage ? ", Branch-center PI" : "，分中心 PI"}`;
      image.loading = "lazy";
      const piCopy = element("div");
      piCopy.append(element("span", "", englishPage ? "Branch-center PI" : "分中心 PI"));
      piCopy.append(element("strong", "", pi.name));
      piCopy.append(element("p", "", firstLine(localize(pi, "introduction"))));
      piRow.append(image, piCopy);
      piList.append(piRow);
    });
    card.append(piList);

    const button = element("button", "center-toggle");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `members-${center.center_id}`);
    button.append(element("span", "", englishPage ? "View center members" : "查看中心成员"));
    button.append(element("b", "", "＋"));
    card.append(button);

    const detail = element("div", "center-detail");
    detail.id = `members-${center.center_id}`;
    detail.hidden = true;
    const detailHead = element("div", "center-detail-head");
    detailHead.append(element("h4", "", englishPage ? `Team · ${centerName}` : `${centerName}团队`));
    detailHead.append(element(
      "p",
      "",
      englishPage
        ? `${center.pis.length} ${center.pis.length === 1 ? "PI" : "PIs"} · ${center.members.length} team ${center.members.length === 1 ? "member" : "members"}`
        : `${center.pis.length} 位 PI · ${center.members.length} 位团队成员`,
    ));
    detail.append(detailHead);
    const members = element("div", "member-grid");
    const syncMemberGridLayout = () => {
      const piCards = [...members.querySelectorAll(".member-card.is-pi")];
      const openPiCards = piCards.filter((piCard) => piCard.querySelector(".member-bio[open]"));
      const hasSingleOpenPi = piCards.length === 1 && openPiCards.length === 1;
      members.classList.toggle("has-single-open-pi", hasSingleOpenPi);

      if (hasSingleOpenPi) {
        const teamMemberCount = members.querySelectorAll(".member-card:not(.is-pi)").length;
        members.style.setProperty("--pi-detail-row-span", String(Math.max(2, Math.ceil(teamMemberCount / 2))));
      } else {
        members.style.removeProperty("--pi-detail-row-span");
      }
    };
    [...center.pis, ...center.members].forEach((person) => members.append(personCard(person, syncMemberGridLayout)));
    syncMemberGridLayout();
    detail.append(members);
    card.append(detail);

    button.addEventListener("click", () => toggleCenter(card));
    return card;
  }

  function applyRegion(region) {
    activeRegion = region;
    let count = 0;
    centerRoot.querySelectorAll(".center-card").forEach((card) => {
      const show = region === "all" || card.dataset.region === region;
      card.hidden = !show;
      if (show) count += 1;
      if (!show && card.classList.contains("is-open")) closeCard(card);
    });
    visibleCount.textContent = String(count);
    filters.forEach((button) => {
      const active = button.dataset.region === region;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function openHashTarget() {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const requestedCard = document.getElementById(targetId);
    if (requestedCard?.classList.contains("center-card")) openCenterCard(requestedCard, false);
  }

  function renderCenters(data) {
    openCard = null;
    centerRoot.replaceChildren(...data.centers.map(centerCard));
    applyRegion(activeRegion);
    requestAnimationFrame(openHashTarget);
  }

  function showLoadError(error) {
    const message = element("div", "data-error");
    message.append(element("strong", "", isEnglish() ? "Member profiles could not be loaded" : "成员资料未能载入"));
    message.append(element("p", "", isEnglish()
      ? "Open this page with a local preview server or Vercel; opening the HTML file directly may prevent the browser from reading JSON."
      : "请通过本地预览服务器或 Vercel 打开此页面；直接双击 HTML 时浏览器可能阻止读取 JSON。"));
    message.title = error.message;
    centerRoot.replaceChildren(message);
  }

  // Always use a per-load cache marker so local previews and deployments show
  // the latest approved branch-center mapping after a normal page refresh.
  fetch(`data/centers.json?preview=${Date.now()}`, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      document.querySelector("#branch-center-count").textContent = data.summary.branch_centers;
      // The PI total is available in the data file, but this field is not
      // currently displayed in the page overview. Keep it optional so its
      // absence never prevents the center cards from rendering.
      const branchPiCount = document.querySelector("#branch-pi-count");
      if (branchPiCount) branchPiCount.textContent = data.summary.branch_pis;
      document.querySelector("#branch-person-count").textContent = data.summary.branch_people;

      networkData = data;
      renderCenters(data);
    })
    .catch(showLoadError);

  filters.forEach((button) => button.addEventListener("click", () => applyRegion(button.dataset.region)));
  window.addEventListener("hashchange", openHashTarget);
  window.addEventListener("search-language-change", () => {
    if (networkData) renderCenters(networkData);
  });

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();
