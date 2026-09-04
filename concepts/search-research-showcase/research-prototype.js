(function () {
  const variants = [
    { key: "A", name: "研究图谱" },
    { key: "B", name: "研究浏览器" },
    { key: "C", name: "证据矩阵" },
  ];

  const tracks = {
    ards: {
      number: "01",
      eyebrow: "ARDS phenotypes & precision care",
      title: "ARDS 炎症表型与精准通气",
      question: "相似临床诊断背后，是否存在具有不同炎症状态、器官损伤和治疗反应的生物学亚型？",
      method: "临床表型、血清蛋白组、胸部影像、随访结局与肺损伤机制研究。",
    },
    immune: {
      number: "02",
      eyebrow: "Immune & metabolic remodeling",
      title: "脓毒症免疫与代谢重塑",
      question: "感染后的免疫激活与免疫抑制，如何共同影响继发感染和器官功能？",
      method: "关键免疫细胞、RNA 修饰、细胞因子通路与临床治疗暴露。",
    },
    prediction: {
      number: "03",
      eyebrow: "Multimodal early warning",
      title: "多模态早期预警与预后",
      question: "如何在疾病早期识别高风险患者，并持续判断器官衰竭与治疗反应？",
      method: "临床、实验室、影像和多组学数据融合与可解释风险建模。",
    },
    validation: {
      number: "04",
      eyebrow: "Multicenter translation",
      title: "多中心队列与转化验证",
      question: "研究发现能否在不同地区、患者结构和临床流程中保持稳定？",
      method: "统一入组、采样、数据字典与质量控制，并开展跨中心重复验证。",
    },
  };

  const publications = [
    {
      id: "ards-phenotypes",
      track: "ards",
      year: "2026",
      journal: "European Respiratory Journal",
      journalShort: "ERJ",
      title: "Large-scale proteomic profiling identifies distinct inflammatory phenotypes in acute respiratory distress syndrome: a multicentre, prospective cohort study.",
      authors: "Lin M, Xu F, Deng Y, et al.",
      link: "https://pubmed.ncbi.nlm.nih.gov/41067873/",
      doi: "10.1183/13993003.00933-2025",
      pageImage: "assets/publications/ards-phenotypes-page1.webp",
      license: "CC BY-NC 4.0",
      accent: "#2449a4",
    },
    {
      id: "erbb4-lung-repair",
      track: "ards",
      year: "2026",
      journal: "Advanced Science",
      journalShort: "ADV SCI",
      title: "Activation of ERBB4 Pathway Inhibits Pathological Transdifferentiation of Lung Epithelial Progenitors into CD66c+ Basal Cells in Severe Lung Injury.",
      authors: "Lin K, Deng X, Wang H, et al.",
      link: "https://pubmed.ncbi.nlm.nih.gov/41944369/",
      doi: "10.1002/advs.202519151",
      pageImage: "assets/publications/erbb4-lung-repair-page1.webp",
      license: "CC BY",
      accent: "#a13232",
    },
    {
      id: "nat10-t-cell",
      track: "immune",
      year: "2025",
      journal: "Nature Immunology",
      journalShort: "NAT IMMUNOL",
      title: "A critical role of N4-acetylation of cytidine in mRNA by NAT10 in T cell expansion and antiviral immunity.",
      authors: "Sun L, Li X, Xu F, et al.",
      link: "https://pubmed.ncbi.nlm.nih.gov/40045031/",
      doi: "10.1038/s41590-025-02100-2",
      pageImage: "assets/publications/nat10-t-cell-page1.webp",
      license: "CC BY-NC-ND 4.0",
      accent: "#0d6b62",
    },
    {
      id: "ccl2-ccr2",
      track: "immune",
      year: "2025",
      journal: "Respiratory Research",
      journalShort: "RESP RES",
      title: "Glucocorticoid-mediated suppression of the CCL2-CCR2 axis drives monocyte dysfunction in severe pneumonia among immunocompromised hosts.",
      authors: "Kuang Z, Luo Y, Chen Y, et al.",
      link: "https://pubmed.ncbi.nlm.nih.gov/41299657/",
      doi: "10.1186/s12931-025-03437-w",
      pageImage: "assets/publications/ccl2-ccr2-page1.webp",
      license: "CC BY-NC-ND 4.0",
      accent: "#875d15",
    },
    {
      id: "multiomics-ards",
      track: "prediction",
      year: "2024",
      journal: "Critical Care",
      journalShort: "CRIT CARE",
      title: "Integrative multi-omics analysis unravels the host response landscape and reveals a serum protein panel for early prognosis prediction for ARDS.",
      authors: "Lin M, Xu F, Sun J, et al.",
      link: "https://pubmed.ncbi.nlm.nih.gov/38956604/",
      doi: "10.1186/s13054-024-05000-3",
      pageImage: "assets/publications/multiomics-ards-page1.webp",
      license: "CC BY 4.0",
      accent: "#7a318c",
    },
    {
      id: "omicron-shanghai",
      track: "validation",
      year: "2024",
      journal: "National Science Review",
      journalShort: "NSR",
      title: "Reduced clinical severity during 2022 Shanghai Spring epidemic of SARS-CoV-2 omicron BA.2 variant infection—an integrated account of virus pathogenicity and vaccination effectiveness.",
      authors: "Wu X, Chen Y, Cao K, et al.",
      link: "https://pubmed.ncbi.nlm.nih.gov/38699632/",
      doi: "10.1093/nsr/nwae011",
      pageImage: "assets/publications/omicron-shanghai-page1.webp",
      license: "CC BY 4.0",
      accent: "#0d568c",
    },
  ];

  const publicationArchive = [
    {
      year: "2026",
      title: "Large-scale proteomic profiling identifies distinct inflammatory phenotypes in acute respiratory distress syndrome: a multicentre, prospective cohort study.",
      authors: "Lin M, Xu F, Deng Y, et al.",
      journal: "European Respiratory Journal",
      citation: "67(2):2500933",
      role: "通讯作者",
      doi: "10.1183/13993003.00933-2025",
    },
    {
      year: "2026",
      title: "Gut microbiota metabolite butyric acid alleviated Klebsiella pneumoniae-induced lung injury by regulating CX3CR1+ NK cells via the PI3K/AKT pathway.",
      authors: "Mu S, Chang M, Shen Y, et al.",
      journal: "Burns & Trauma",
      citation: "14:tkaf069",
      role: "并列通讯作者",
      doi: "10.1093/burnst/tkaf069",
    },
    {
      year: "2026",
      title: "Activation of ERBB4 Pathway Inhibits Pathological Transdifferentiation of Lung Epithelial Progenitors into CD66c+ Basal Cells in Severe Lung Injury.",
      authors: "Lin K, Deng X, Wang H, et al.",
      journal: "Advanced Science",
      citation: "e19151",
      role: "共同通讯作者",
      doi: "10.1002/advs.202519151",
    },
    {
      year: "2026",
      title: "血清生物标志物联合检测在急性呼吸窘迫综合征诊断和预后预测中的价值",
      authors: "孙健、孙湛、杨依霖、宋振举、徐斐翔",
      journal: "中华急诊医学杂志",
      citation: "35(6):806–813",
      role: "通讯作者",
      doi: "10.3760/cma.j.cn114656-20241226-00907",
    },
    {
      year: "2025",
      title: "A critical role of N4-acetylation of cytidine in mRNA by NAT10 in T cell expansion and antiviral immunity.",
      authors: "Sun L, Li X, Xu F, et al.",
      journal: "Nature Immunology",
      citation: "26(4):619–634",
      role: "并列通讯作者",
      doi: "10.1038/s41590-025-02100-2",
    },
    {
      year: "2025",
      title: "Glucocorticoid-mediated suppression of the CCL2-CCR2 axis drives monocyte dysfunction in severe pneumonia among immunocompromised hosts.",
      authors: "Kuang Z, Luo Y, Chen Y, et al.",
      journal: "Respiratory Research",
      citation: "26(1):355",
      role: "通讯作者",
      doi: "10.1186/s12931-025-03437-w",
    },
    {
      year: "2025",
      title: "Uncovering host response in adults with severe community-acquired pneumonia: a proteomics and metabolomics perspective study.",
      authors: "Kuang Z, Li R, Lu S, et al.",
      journal: "World Journal of Emergency Medicine",
      citation: "16(3):248–255",
      role: "并列通讯作者",
    },
    {
      year: "2024",
      title: "Reduced clinical severity during 2022 Shanghai Spring epidemic of SARS-CoV-2 omicron BA.2 variant infection—an integrated account of virus pathogenicity and vaccination effectiveness.",
      authors: "Wu X, Chen Y, Cao K, et al.",
      journal: "National Science Review",
      citation: "11(4):nwae011",
      role: "通讯作者",
      doi: "10.1093/nsr/nwae011",
    },
    {
      year: "2024",
      title: "Integrative multi-omics analysis unravels the host response landscape and reveals a serum protein panel for early prognosis prediction for ARDS.",
      authors: "Lin M, Xu F, Sun J, et al.",
      journal: "Critical Care",
      citation: "28(1):213",
      role: "并列通讯作者",
      doi: "10.1186/s13054-024-05000-3",
    },
    {
      year: "2023",
      title: "A follow-up study on the recovery and reinfection of Omicron COVID-19 patients in Shanghai, China.",
      authors: "Lin M, Cao K, Xu F, et al.",
      journal: "Emerging Microbes & Infections",
      citation: "12(2):2261559",
      role: "通讯作者",
    },
    {
      year: "2023",
      title: "Understanding the viral shedding time of Omicron variant BA.2 infection in Shanghai: a population-based observational study.",
      authors: "Lu Z, Kuang Z, Li B, et al.",
      journal: "Heliyon",
      citation: "9(6):e17173",
      role: "并列通讯作者",
    },
    {
      year: "2023",
      title: "Global signatures of the microbiome and metabolome during hospitalization of septic patients.",
      authors: "Long X, Mu S, Zhang J, et al.",
      journal: "Shock",
      citation: "59:716–724",
      role: "通讯作者",
      doi: "10.1097/SHK.0000000000002117",
    },
    {
      year: "2022",
      title: "GPR174 knockdown enhances blood flow recovery in hindlimb ischemia mice model by upregulating AREG expression.",
      authors: "Liu J, Pan L, Hong W, et al.",
      journal: "Nature Communications",
      citation: "13(1):7519",
      role: "并列通讯作者",
      doi: "10.1038/s41467-022-35159-8",
    },
    {
      year: "2022",
      title: "The pathogens of secondary infection in septic patients share a similar genotype to those that predominate in the gut.",
      authors: "Mu S, Xiang H, Wang Y, et al.",
      journal: "Critical Care",
      citation: "26(1):68",
      role: "通讯作者",
      doi: "10.1186/s13054-022-03943-z",
    },
    {
      year: "2022",
      title: "GPR174 Knockout Alleviates DSS-Induced Colitis via Regulating the Immune Function of Dendritic Cells.",
      authors: "Wei W, Mu S, Han Y, et al.",
      journal: "Frontiers in Immunology",
      citation: "13:841254",
      role: "通讯作者",
      doi: "10.3389/fimmu.2022.841254",
    },
    {
      year: "2022",
      title: "Protective role of (5R)-5-hydroxytriptolide in lipopolysaccharide-induced acute lung injury by suppressing dendritic cell activation.",
      authors: "Chen Y, Kuang Z, Wei W, et al.",
      journal: "International Immunopharmacology",
      citation: "102:108410",
      role: "通讯作者",
      doi: "10.1016/j.intimp.2021.108410",
    },
    {
      year: "2022",
      title: "GPR174 mRNA Acts as a Novel Prognostic Biomarker for Patients With Sepsis via Regulating the Inflammatory Response.",
      authors: "Wang J, Hu Y, Kuang Z, et al.",
      journal: "Frontiers in Immunology",
      citation: "13:789141",
      role: "通讯作者",
      doi: "10.3389/fimmu.2021.789141",
    },
  ];

  const variantSections = document.querySelectorAll("[data-variant]");
  const variantLabel = document.querySelector("#variant-label");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function publicationCard(publication, compact) {
    const anchor = element("a", `paper-entry${compact ? " is-compact" : ""}`);
    anchor.href = publication.link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.style.setProperty("--paper-accent", publication.accent);
    anchor.setAttribute("aria-label", `打开论文：${publication.title}`);

    const thumbnail = element("span", "paper-thumbnail");
    thumbnail.setAttribute("aria-hidden", "true");
    if (publication.pageImage) {
      thumbnail.classList.add("is-real");
      const thumbnailImage = element("img");
      thumbnailImage.src = publication.pageImage;
      thumbnailImage.alt = "";
      thumbnailImage.loading = "lazy";
      thumbnail.append(thumbnailImage);
    } else {
      thumbnail.append(element("b", "paper-journal-mark", publication.journalShort));
      thumbnail.append(element("i", "paper-rule"));
      thumbnail.append(element("i", "paper-rule short"));
      thumbnail.append(element("i", "paper-figure"));
      thumbnail.append(element("small", "paper-year", publication.year));
    }

    const copy = element("span", "paper-copy");
    copy.append(element("span", "paper-meta", `${publication.journal} · ${publication.year}`));
    copy.append(element("strong", "paper-title", publication.title));
    if (!compact) copy.append(element("small", "paper-authors", publication.authors));

    const arrow = element("span", "paper-arrow", "↗");
    const preview = element("span", "paper-preview");
    preview.setAttribute("role", "tooltip");
    if (publication.pageImage) {
      preview.classList.add("has-page-image");
      preview.append(element("small", "preview-label", `开放获取 PDF 首页 · ${publication.license} · 点击访问 PubMed`));
      const previewImage = element("img", "preview-page-image");
      previewImage.src = publication.pageImage;
      previewImage.alt = `${publication.title} PDF 首页预览`;
      previewImage.loading = "lazy";
      preview.append(previewImage);
    } else {
      preview.append(element("small", "preview-label", "非开放获取 PDF · 当前使用首页版式示意"));
      const previewSheet = element("span", "preview-sheet");
      previewSheet.append(element("b", "preview-journal", publication.journal));
      previewSheet.append(element("i", "preview-rule"));
      previewSheet.append(element("strong", "preview-title", publication.title));
      previewSheet.append(element("small", "preview-authors", publication.authors));
      const previewGraphic = element("span", "preview-graphic");
      previewGraphic.append(element("i"), element("i"), element("i"));
      previewSheet.append(previewGraphic);
      previewSheet.append(element("small", "preview-note", `DOI ${publication.doi} · 等待已授权 PDF`));
      preview.append(previewSheet);
    }

    anchor.append(thumbnail, copy, arrow, preview);
    return anchor;
  }

  function renderPaperLists() {
    document.querySelectorAll("[data-paper-list]").forEach((root) => {
      const items = publications.filter((publication) => publication.track === root.dataset.paperList);
      const compact = root.dataset.paperMode === "compact";
      root.replaceChildren(...items.map((publication) => publicationCard(publication, compact)));
    });
  }

  function renderExplorer(trackKey) {
    const track = tracks[trackKey] || tracks.ards;
    const panel = document.querySelector("#explorer-panel");
    const top = element("div", "explorer-panel-top");
    top.append(element("span", "explorer-number", track.number));
    const title = element("div");
    title.append(element("p", "eyebrow dark", track.eyebrow));
    title.append(element("h2", "", track.title));
    top.append(title);

    const detail = element("div", "explorer-detail");
    const question = element("div");
    question.append(element("small", "", "核心问题"));
    question.append(element("p", "", track.question));
    const method = element("div");
    method.append(element("small", "", "主要方法"));
    method.append(element("p", "", track.method));
    detail.append(question, method);

    const papers = element("div", "explorer-papers");
    papers.append(element("p", "explorer-label", "SELECTED EVIDENCE"));
    publications.filter((publication) => publication.track === trackKey).forEach((publication) => papers.append(publicationCard(publication, false)));
    panel.replaceChildren(top, detail, papers);

    document.querySelectorAll("[data-explorer-track]").forEach((button) => {
      const active = button.dataset.explorerTrack === trackKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function archivePaperRow(publication, index) {
    const article = element("article", "archive-paper");
    article.append(element("span", "archive-paper-index", String(index).padStart(2, "0")));

    const copy = element("div", "archive-paper-copy");
    copy.append(element("strong", "archive-paper-title", publication.title));
    copy.append(element("p", "archive-paper-authors", publication.authors));
    const metadata = element("div", "archive-paper-meta");
    metadata.append(element("span", "", publication.journal));
    metadata.append(element("span", "", publication.citation));
    metadata.append(element("span", "archive-role", publication.role));
    copy.append(metadata);
    article.append(copy);

    if (publication.doi) {
      const doi = element("a", "archive-doi", "DOI ↗");
      doi.href = `https://doi.org/${publication.doi}`;
      doi.target = "_blank";
      doi.rel = "noopener noreferrer";
      doi.setAttribute("aria-label", `通过 DOI 打开论文：${publication.title}`);
      article.append(doi);
    }
    return article;
  }

  function renderPublicationArchive() {
    const root = document.querySelector("#publication-archive-list");
    const archive = document.querySelector("#publication-archive");
    if (!root || !archive) return;

    const years = [...new Set(publicationArchive.map((publication) => publication.year))].sort((a, b) => Number(b) - Number(a));
    let publicationIndex = 1;
    const groups = years.map((year) => {
      const publicationsForYear = publicationArchive.filter((publication) => publication.year === year);
      const group = element("section", "archive-year-group");
      const heading = element("header", "archive-year-heading");
      heading.append(element("strong", "", year));
      heading.append(element("span", "", `${publicationsForYear.length} 篇`));
      const papers = element("div", "archive-year-papers");
      publicationsForYear.forEach((publication) => {
        papers.append(archivePaperRow(publication, publicationIndex));
        publicationIndex += 1;
      });
      group.append(heading, papers);
      return group;
    });
    root.replaceChildren(...groups);

    document.querySelector("#archive-paper-count").textContent = String(publicationArchive.length).padStart(2, "0");
    document.querySelector("#archive-journal-count").textContent = String(new Set(publicationArchive.map((publication) => publication.journal)).size).padStart(2, "0");

    const label = archive.querySelector("[data-archive-toggle-label]");
    const icon = archive.querySelector("[data-archive-toggle-icon]");
    const updateToggle = () => {
      label.textContent = archive.open ? "收起论文总表" : "展开论文总表";
      icon.textContent = archive.open ? "−" : "＋";
    };
    archive.addEventListener("toggle", updateToggle);
    updateToggle();
  }

  function requestedVariant() {
    const value = new URLSearchParams(window.location.search).get("variant");
    return variants.some((variant) => variant.key === value) ? value : "A";
  }

  function renderVariant(key) {
    const current = variants.find((variant) => variant.key === key) || variants[0];
    document.body.dataset.currentVariant = current.key;
    variantSections.forEach((section) => {
      const active = section.dataset.variant === current.key;
      section.hidden = !active;
      section.setAttribute("aria-hidden", active ? "false" : "true");
    });
    variantLabel.textContent = `${current.key} — ${current.name}`;
    document.title = `方案 ${current.key} · ${current.name} | SEARCH 研究与成果`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function setVariant(key) {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", key);
    history.replaceState({ variant: key }, "", url);
    renderVariant(key);
  }

  function cycle(direction) {
    const currentIndex = variants.findIndex((variant) => variant.key === document.body.dataset.currentVariant);
    const nextIndex = (currentIndex + direction + variants.length) % variants.length;
    setVariant(variants[nextIndex].key);
  }

  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => cycle(button.dataset.direction === "next" ? 1 : -1));
  });

  document.querySelectorAll("[data-explorer-track]").forEach((button) => {
    button.addEventListener("click", () => renderExplorer(button.dataset.explorerTrack));
  });

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

  window.addEventListener("popstate", () => renderVariant(requestedVariant()));
  renderPaperLists();
  renderExplorer("ards");
  renderPublicationArchive();
  renderVariant(requestedVariant());
})();
