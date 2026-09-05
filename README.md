# 中国 ARDS 与脓毒症临床研究队列数据库（SEARCH）

SEARCH（Sepsis and ARDS Research Collaborative Network of China）致力于把临床一线的问题、规范化队列、生物样本与多中心研究连接起来，推动 ARDS、脓毒症及危重症相关研究的发现、验证与转化。本仓库保存 SEARCH 的中英双语科研门户及其公开展示资料。

网站面向临床医生、科研人员和合作机构，呈现团队围绕 ARDS 异质性与精准诊疗、脓毒症免疫与代谢重塑、多模态早期预警、多中心队列与转化验证开展的代表性工作。我们希望通过统一的研究方案、数据标准和样本流程，凝聚全国多学科力量，让来自不同中心的临床观察能够沉淀为可比较、可追溯、可验证的证据。

## 网站内容

- **首页**：介绍 SEARCH 的协作理念、研究网络及主要工作方向。
- **研究与成果**：按研究主线梳理代表性论文与近五年成果，展示从临床问题到证据形成的路径。
- **合作单位**：呈现主中心与全国分中心的协作网络，以及共同的数据、样本和验证标准。
- **队列信息**：说明公开的队列规模、生物样本与数据审核口径。
- **项目文件**：集中提供可公开的研究资料与相关文件。

我们欢迎国内外从事急危重症、呼吸、感染、影像、组学、数据科学及转化医学研究的同仁开展交流与合作。科研合作、数据规范或公开资料咨询，请联系 [search_cn@163.com](mailto:search_cn@163.com)。

## 当前网站

- `concepts/search-research-showcase/`：当前持续维护的中英双语网站，共包含首页、研究成果、合作中心、队列和文件中心五个页面。
- Vercel 通过根目录的 `vercel.json` 将 `/` 重写到该网站首页；网站的资源与数据文件仍保留在原目录，避免破坏相对路径。

## 本地预览

请在仓库根目录运行：

```bash
python3 scripts/preview_site.py
```

然后访问：

```text
http://127.0.0.1:4176/concepts/search-research-showcase/index.html
```

必须通过 HTTP 预览页面；直接双击 HTML 以 `file://` 打开时，浏览器可能阻止读取成员 JSON 数据。

## 目录说明

- `concepts/search-research-showcase/`：当前网站的 HTML、CSS、JavaScript、JSON 和页面图片。
- `concepts/search-research-showcase/assets/team/`：网站实际使用的团队成员照片，以 Vercel 可稳定提供的相对路径引用。
- `Document/`：文件中心提供下载的公开 PDF。
- `icon/`：网站共用的视觉素材。
- `scripts/preview_site.py`：本地无缓存预览服务器。

## 归档说明

旧网页原型、重复照片、映射工作簿、设计 PPT、资料源文件及未被网站引用的论文 PDF 已移出仓库，保存在工作区同级的 `Backup/China-ARDS-and-Sepsis-Clinical-Research-Cohort-Database-pre-github-2026-08-31/`。该备份不参与网站运行，也不应随本仓库推送到 GitHub；如需恢复源文件，请按备份目录内的说明还原。
