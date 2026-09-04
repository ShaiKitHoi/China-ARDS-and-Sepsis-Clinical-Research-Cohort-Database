# 英文页面数据数字字体调研与建议

调研日期：2026-08-29

## 结论

建议将 `Inter` 作为首页和研究页全部数据数字的唯一字体，并显式使用 `font-variant-numeric: lining-nums tabular-nums`。它已经是原型英文无衬线体系的一部分，且官方资料明确列出 tabular numbers（等宽数字）；这能统一日期、统计数字与跨卡片的视觉节奏，而不改变每一处既定字号。

其中 `lining-nums` 让数字等高、贴齐基线；`tabular-nums` 让每个数字占同样宽度，因此适合本项目的“3,271 / 2,867 / 23+ / 2026.07.02 / 04 / 06”等并列数据。CSS Fonts 标准也将 tabular figures 的典型用途定义为需要按列对齐的数字。[W3C CSS Fonts Level 3](https://www.w3.org/TR/css-fonts-3/#font-variant-numeric-prop)

## 候选比较（仅使用字体项目或规范的第一方资料）

| 字体 | 官方定位与数字能力 | 对 SEARCH 英文数据的判断 |
| --- | --- | --- |
| **Inter（推荐）** | Inter 官方说明其为屏幕阅读设计，具高 x-height；同时明确列举 OpenType 的 tabular numbers、slashed zero 等能力，并提供官方 Web CDN。[Inter 官方仓库](https://github.com/rsms/inter) | 与既有英文字体衔接最自然；`lining + tabular` 既有临床数据的严谨感，也不会像等宽字体那样显得像代码。 |
| IBM Plex Sans | IBM 说明 Plex Sans/Serif/Mono 是一个面向 UI 等多种媒介的开源家族；Sans 与 Serif 都有多个字重和真正斜体。官方还提示 Mono 的每个字形固定 600 单位，定位为代码/规格文本。[IBM Plex 官方资料](https://www.ibm.com/design/language/typography/typeface/) | 可作为备选：其研究/技术气质很强，但会使数字与当前 Inter 英文正文脱节；若采用，应先在浏览器中复核 `tnum` 的实际渲染和中英混排。**不建议为统计卡片直接改用 Plex Mono**，它更适于代码。 |
| Source Sans 3 | Adobe 将其定位为适合 UI 环境的 OpenType 字体，并提供 TTF/WOFF/WOFF2/变量字体发布。[Adobe Source Sans 3](https://github.com/adobe-fonts/source-sans)；但该项目目前公开的数字特性问题仍显示 `lnum`、`tnum` 可能缺失，不能把这两个 CSS 开关当成已确认能力。[官方 issue #236](https://github.com/adobe-fonts/source-sans/issues/236) | 正文候选可用；不适合作为本轮需要稳定列对齐的数字首选，除非先以目标 Web 字体文件完成跨浏览器实测。 |
| Source Serif 4（衬线备选） | Adobe 将其定位为可在多种尺寸、字重和语言中排版正文、并与 Source Sans 配套的开放字体；发布内容包括 Web 字体和变量字体。[Adobe Source Serif](https://github.com/adobe-fonts/source-serif) | 适合论文题名、引言式大标题等“叙事性强调”，不建议替换数据卡的数字：会与当前英文界面的无衬线数据语言产生额外对比，且不利于首页/研究页统一。 |

## 应用边界

- 统计卡、日期、年份、章节编号和表格内数值：统一使用 Inter 的 `lining-nums tabular-nums`。
- 正文行内的普通数字：可保留默认比例数字，避免文本字距显得僵硬；只有需要纵向或横向比较时才启用 tabular。
- `+`、`,`、`.` 与日期分隔符应继续使用相同的 Inter 字体、字重和 `line-height`；本轮不要用 `letter-spacing` 或不同字体去单独修补某一组数字。
- 这是一项字体与 OpenType 特性建议，不涉及字号变更；实际合并 CSS 后应在 Chrome/Safari 的桌面与移动宽度各复核一次。

## 可直接采用的 CSS 规则（待页面改动任务执行时使用）

```css
.metric-number,
.metric-date,
.chapter-number {
  font-family: Inter, "Noto Sans SC", sans-serif;
  font-variant-numeric: lining-nums tabular-nums;
}
```

来源核验方式：上表链接均指向字体作者/维护组织的官方仓库或官方设计系统；数字排版术语与 CSS 行为以 W3C 规范为准。
