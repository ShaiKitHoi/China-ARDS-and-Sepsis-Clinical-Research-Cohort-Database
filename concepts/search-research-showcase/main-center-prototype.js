(function () {
  const root = document.querySelector("#main-department-grid");
  const count = document.querySelector("#main-department-count");
  if (!root || !count) return;

  let mainCenterData = null;
  let openCard = null;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function isEnglish() {
    return document.documentElement.lang === "en";
  }

  function localized(record, field) {
    return isEnglish() && record[`${field}_en`] ? record[`${field}_en`] : record[field];
  }

  function personRole(person, department) {
    return person.is_pi ? (isEnglish() ? "Professor" : "教授") : localized(department, "member_label");
  }

  function memberCard(person, department) {
    const card = element("article", `member-card${person.is_pi ? " is-pi" : ""}`);
    const image = element("img");
    image.src = person.photo;
    image.alt = `${person.name} · ${personRole(person, department)}`;
    image.loading = "lazy";
    card.append(image);

    const copy = element("div", "member-card-copy");
    copy.append(element("span", "member-role", personRole(person, department)));
    copy.append(element("h5", "", person.name));
    copy.append(element("p", "member-title", localized(department, "name")));
    card.append(copy);
    return card;
  }

  function summaryRow(person, department) {
    const row = element("div", "pi-row");
    const image = element("img");
    image.src = person.photo;
    image.alt = `${person.name} · ${personRole(person, department)}`;
    image.loading = "lazy";
    const copy = element("div");
    copy.append(element("span", "", personRole(person, department)));
    copy.append(element("strong", "", person.name));
    copy.append(element("p", "", localized(department, "name")));
    row.append(image, copy);
    return row;
  }

  function closeCard(card) {
    if (!card) return;
    const detail = card.querySelector(".center-detail");
    const button = card.querySelector(".center-toggle");
    card.classList.remove("is-open");
    detail.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.querySelector("span").textContent = isEnglish() ? "View team members" : "查看团队成员";
    if (openCard === card) openCard = null;
  }

  function openCardDetail(card) {
    if (openCard && openCard !== card) closeCard(openCard);
    const detail = card.querySelector(".center-detail");
    const button = card.querySelector(".center-toggle");
    card.classList.add("is-open");
    detail.hidden = false;
    button.setAttribute("aria-expanded", "true");
    button.querySelector("span").textContent = isEnglish() ? "Collapse team members" : "收起团队成员";
    openCard = card;
  }

  function departmentCard(department) {
    const card = element("article", "center-card main-department-card");
    card.id = `department-${department.id}`;
    const members = department.members || [];
    const professors = members.filter((member) => member.is_pi);
    // The mapping workbook is the source of truth for display order. Each card
    // surfaces its first three mapped members; the expanded panel keeps the full list.
    const highlights = members.slice(0, 3);
    const departmentName = localized(department, "name");

    const top = element("div", "center-card-top");
    const meta = element("div", "center-card-meta");
    meta.append(element("span", "region-tag", isEnglish() ? "COORDINATING CENTER" : "主中心团队"));
    meta.append(element("span", "member-count", isEnglish() ? `${members.length} members` : `${members.length} 位成员`));
    top.append(meta);
    top.append(element("h3", "", departmentName));
    card.append(top);

    const list = element("div", "pi-list");
    highlights.forEach((person) => list.append(summaryRow(person, department)));
    card.append(list);

    const button = element("button", "center-toggle");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `members-${department.id}`);
    button.append(element("span", "", isEnglish() ? "View team members" : "查看团队成员"));
    button.append(element("b", "", "＋"));
    card.append(button);

    const detail = element("div", "center-detail");
    detail.id = `members-${department.id}`;
    detail.hidden = true;
    const detailHead = element("div", "center-detail-head");
    detailHead.append(element("h4", "", departmentName));
    detailHead.append(element("p", "", isEnglish() ? `${professors.length} professors · ${members.length} members` : `${professors.length} 位教授 · ${members.length} 位成员`));
    detail.append(detailHead);
    const grid = element("div", "member-grid");
    members.forEach((person) => grid.append(memberCard(person, department)));
    detail.append(grid);
    card.append(detail);

    button.addEventListener("click", () => {
      if (card.classList.contains("is-open")) closeCard(card);
      else openCardDetail(card);
    });
    return card;
  }

  function render(data) {
    openCard = null;
    root.replaceChildren(...data.departments.map(departmentCard));
    count.textContent = String(data.departments.length);
  }

  function showError() {
    root.replaceChildren(element("p", "data-error", isEnglish()
      ? "Main-center member profiles could not be loaded."
      : "主中心成员资料未能载入。"));
  }

  // Always use a per-load cache marker so local previews and deployments show
  // the latest approved main-center mapping after a normal page refresh.
  fetch(`data/main-center.json?preview=${Date.now()}`, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      mainCenterData = data;
      render(data);
    })
    .catch(showError);

  window.addEventListener("search-language-change", () => {
    if (mainCenterData) render(mainCenterData);
  });
})();
