# 中国 ARDS 与脓毒症临床研究队列数据库（SEARCH）

本项目是 SEARCH（Sepsis and ARDS Research Collaborative Network of China）的静态科研门户，展示多中心临床队列、研究成果、合作机构、队列信息和公开文件。

## 当前网站

- 仓库根目录的 `index.html`：既有入口页面，暂不改动。
- `concepts/search-research-showcase/`：当前持续维护的中英双语网站，共包含首页、研究成果、合作中心、队列和文件中心五个页面。

## 本地预览

请在仓库根目录运行：

```bash
python3 scripts/preview_site.py
```

然后访问：

```text
http://127.0.0.1:4176/concepts/search-research-showcase/index.html?variant=A
```

必须通过 HTTP 预览页面；直接双击 HTML 以 `file://` 打开时，浏览器可能阻止读取成员 JSON 数据。

## 目录说明

- `concepts/search-research-showcase/`：当前网站的 HTML、CSS、JavaScript、JSON 和页面图片。
- `Co-Team/主中心/`、`Co-Team/分中心/`：网站实际使用的团队成员照片。
- `Document/`：文件中心提供下载的公开 PDF。
- `assets/`、`icon/`：根页面与网站共用的视觉素材。
- `scripts/preview_site.py`：本地无缓存预览服务器。
- `api/`：既有接口代码。

## 归档说明

旧网页原型、重复照片、映射工作簿、设计 PPT、资料源文件及未被网站引用的论文 PDF 已移出仓库，保存在工作区同级的 `Backup/China-ARDS-and-Sepsis-Clinical-Research-Cohort-Database-pre-github-2026-08-31/`。该备份不参与网站运行，也不应随本仓库推送到 GitHub；如需恢复源文件，请按备份目录内的说明还原。
