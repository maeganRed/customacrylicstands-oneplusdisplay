# AGENTS.md — 项目长期开发规范

> 本文件是本项目（EcoRide e-bike 模板）的**强制开发规则**。任何 AI 或开发者在开始任务前
> 必须先读本文件，再读将要修改的具体文件。规则冲突时，以本文件为准。
>
> 核心原则：**优先修改 → 其次复用 → 最后才新增。**

---

## 0. 每次任务开始前

1. 先定位：要改的是哪个页面 / 组件 / 数据文件 / 样式。
2. 先读：打开那个文件，确认它现在长什么样。**没有读过代码，不允许生成新实现。**
3. 先问：现有组件能否通过 Props、变体（variant）、组合方式满足？能就不新建。
4. 再定范围：只动必要文件，不做顺手重写。

## 1. 技术栈与硬约束

| 层 | 选型 |
| --- | --- |
| 框架 / 路由 / 静态构建 | Astro 6（`output: "static"`） |
| UI 组件 | React 19，经 `@astrojs/react` |
| 类型 | TypeScript 5.9，`astro/tsconfigs/strict` |
| 样式 | Tailwind CSS 4.3（`@tailwindcss/postcss`）+ CSS 设计令牌 |
| 构建器 | Vite 7（`package.json` 的 `overrides` 锁定） |
| 图标 | `lucide-react` |
| SEO | `@astrojs/sitemap` + 手写 `robots.txt` |
| 表单 | 原生 HTML 表单（`mailto:`），无后端 |

**三条不可动的配置**（改动会导致隐性故障，先确认再动）：

- 不升级到 Astro 7：当前 Node 22.22 不满足 Astro 7 的 `>= 22.23.4`。
- 不删除 `overrides.vite`：Astro 6 配 Vite 8 时 React 在 dev 下会静默失去水合。
- Tailwind 走 `@tailwindcss/postcss`，不要改回 `@tailwindcss/vite`（Vite 主版本不匹配）。
- `astro.config.mjs` 里的 `devToolbar: { enabled: false }` 是刻意为之（Astro 自带工具栏为纯英文界面，项目里隐藏），不要当成配置错误“修复”掉。

**依赖纪律**：不为单个需求引入 UI 框架、动画库、状态管理、日期库或图标库。
需要新依赖时，先在最终报告里说明现有方案为何不够。

## 2. 目录职责

| 路径 | 职责 | 允许的改动 |
| --- | --- | --- |
| `src/pages/*.astro` | 路由与页面编排、各页 SEO props | 组合组件、传 props、调整区块顺序 |
| `src/layouts/BaseLayout.astro` | `<head>`、SEO 标签、滚动显现脚本 | 全局 meta / 脚本 |
| `src/components/*.tsx` | 可复用 UI 与交互 | 组件内部实现、视觉样式 |
| `src/data/*.ts` | 全部业务内容（文案、产品、分类、案例、新闻、导航、图片路径） | 内容增删改 |
| `src/types/index.ts` | 跨组件共享的数据结构 | 新增/调整类型 |
| `src/styles/global.css` | 设计令牌、`.container-page` / `.section` / `.btn-*` / `.card` 等公共类 | 统一视觉调整 |
| `public/images/` | 图片实体 | 新增/替换图片 |
| `docs/image-inventory.md` | 图片清单与用途 | 与图片变更同步 |

业务内容一律不进 `.astro` 页面模板，也不进组件 JSX（除结构性文案如表头、占位符）。

## 3. 现有组件清单（新建前先看这里）

| 组件 | 职责 |
| --- | --- |
| `Header.tsx` | 顶部信息栏 + 主导航 + mega menu + 移动抽屉（唯一必需 `client:load`） |
| `Hero.tsx` | 首页首屏：标题、副文案、按钮、统计 |
| `ProductCategories.tsx` | 4 个分类磁贴 |
| `ProductCard.tsx` | 单个产品卡片，`variant="default" \| "compact"` |
| `FeaturedProducts.tsx` | 热门产品区（网格 + 标题） |
| `ManufacturingAdvantages.tsx` | 制造能力 / 企业优势列表 |
| `FactoryShowcase.tsx` | 工厂图集轮播（`client:visible`） |
| `CaseStudies.tsx` | 成功案例区 |
| `LatestNews.tsx` | 新闻区（首页与 `/news` 共用） |
| `FinalCTA.tsx` | 橙色询价 CTA 区块（全站多页复用） |
| `Footer.tsx` | 四列页脚 + 法务链接 |
| `SectionHeader.tsx` | 统一的 `h2` + 副标题 + “View all” 链接 |
| `PageHeader.tsx` | 内页横幅 + 面包屑 |
| `SocialLinks.tsx` | 社交图标 / 文字链接 |

**遇到以下需求，先复用而不是新写：**

- 区块标题 → `SectionHeader`（`align` 决定居中或左右分栏）。
- 内页顶部横幅 → `PageHeader`。
- 产品展示（任何网格、列表、下拉里）→ `ProductCard`，必要时加变体。
- 按钮 → `global.css` 的 `.btn-primary` / `.btn-outline` / `.btn-light` / `.btn-ghost-light`。
- 卡片 / 标签 / 小标题 / 表单控件 → `.card` / `.chip` / `.section-title` / `.eyebrow` / `.form-*`。
- 询价 CTA → `FinalCTA`；页脚、导航 → `Footer`、`Header`。

**新建组件的门槛**（同时满足才允许）：有独立且单一的职责，且至少满足其一 ——
会在 ≥2 处使用、含独立交互状态、或修改频率明显独立于周围代码。
只有一两行 JSX、没有复用价值的包装组件不要创建。

## 4. 组件与 Props 规范

- 每个组件一个主职责；页面只负责编排和传 props。
- Props 用 `interface XxxProps`（或 `type XxxProps`），定义在组件文件内；跨组件共享的数据结构放 `src/types/index.ts`，不重复声明。
- 凡是可能复用的组件，都保留默认值 + props 覆盖（现有 `Hero`、`LatestNews`、`CaseStudies`、`SectionHeader` 即此模式）。默认值来自 `src/data/`，不要写死在 JSX。
- 变体用联合类型 props（如 `variant`、`align`、`tone`）实现，**不要复制组件**做第二份。
- 禁止 `any`、无意义的 `as` 断言、`!` 非空断言来掩盖类型问题；类型不匹配就改类型或数据。
- 不用 `React.FC`；用普通函数组件 + 显式返回类型推断。
- 事件与交互状态优先用 React 原生 hooks；不要把交互逻辑堆进页面或其他组件。
- 导入风格与现有代码一致：相对路径（`../data/...`、`./SectionHeader`）。

## 5. 数据与 UI 分离

- 内容只放 `src/data/`：`site.ts`（品牌/联系方式/首屏/CTA/SEO）、`navigation.ts`（导航、下拉、页脚栏目）、`categories.ts`、`products.ts`、`cases.ts`、`news.ts`、`advantages.ts`；图片路径统一在 `images.ts`。
- 组件通过 import 数据或 Props 取内容，**不在多个组件里重复硬编码同一信息**。
- 数据文件之间只允许引用 `images.ts`（图片路径）；其余跨文件关联用 `slug` 字符串（如 `Product.categorySlug`、`/category/<slug>`），避免循环依赖与内容重复。
- 新增图片：文件放 `public/images/`，路径加进 `images.ts`，同步更新 `docs/image-inventory.md`。不要编造不存在的文件路径。
- 产品是否出现在首页由 `featured: true` 决定，不要在模板里写列表。

## 6. Tailwind 与样式规范

- 布局与视觉优先用 Tailwind 工具类，写在组件内部。
- 全站统一的设计令牌只在 `global.css` 的 `@theme` 维护：主色 `--color-primary-*`（品牌橙 `#ff6800`）、`--radius-card`、`--spacing-section`、字体。
- 公共结构类只有这几个来源：`.container-page`（1280px + 响应式内边距）、`.section`（垂直节奏）、`.btn-*`、`.card`、`.chip`、`.section-title`、`.section-subtitle`、`.eyebrow`、`.nav-link`、`.form-*`、`[data-animate]`。
- 禁止：新增第二套颜色常量、为单个组件新建 CSS 文件、反复追加同一选择器的覆盖、`!important`、在 JSX 里堆叠互相冲突的类、用内联 `style` 替代本可由 Tailwind 表达的常规样式。
- 要改主色/间距/圆角，改 `@theme`，不要逐组件改类名。
- 改样式优先编辑原实现；如遇既有混乱，在该组件范围内整理后再改，不要把覆盖层继续堆高。

## 7. 客户端 JavaScript 策略

- 默认**不加** `client:*`：静态展示组件由 Astro 构建成 HTML，零 JS。
- 需要状态时才加指令：`Header` 用 `client:load`（移动抽屉、折叠菜单）；`FactoryShowcase` 用 `client:visible`（滚动到视口才水合）。
- mega menu 与 About 下拉是纯 CSS（`group-hover`）；滚动显现是 `BaseLayout.astro` 里的小段内联脚本。不要为一个 hover 效果引入 JS 库。
- 新增交互前先确认能否用 CSS 或现有组件实现。

## 8. 修改范围控制

- 改首屏 → `Hero` + `site.hero`；改产品卡片 → `ProductCard`；改主色 → `@theme`；改导航 → `navigation.ts`；改产品 → `products.ts`。
- 未经要求，不重写其他组件、不替换整套 CSS 体系、不调整无关页面、不升级依赖、不改 `astro.config.mjs`。
- 确需跨多文件修改时，只改必要文件，并在最终说明里写清原因。

## 9. 禁止冗余

- 不创建功能重复的新文件；不留 `HeroNew` / `HeroFinal2` 之类版本文件。
- 替换实现前确认无其他引用，然后**删除**旧实现（页面、组件、类型、数据一并清理）。
- 不留重复的函数、重复的数据定义、不可达代码、失效的样式覆盖、成片注释掉的旧代码。
- 不重复安装已存在的依赖；不新增不必要的抽象层。
- 不为了让改动“看起来完成”而删除仍被引用的代码。

## 10. 完成后必须验证（轻量）

```bash
npm run check    # astro check：类型与模板检查，必须 0 error
npm run build    # 静态构建，必须成功产出 dist/
```

- 涉及路由时抽查状态码：`curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/<path>`。
- 涉及移动端布局时确认 390px 无横向溢出（不要做截图循环验收）。
- 自查清单：是否复用了现有组件 → 是否多建了文件 → 是否有重复数据/样式 → Props 与类型是否合理 → 是否影响其他页面或公共组件。
- 不引入 Lint/格式化等新工具链来“补齐流程”。

## 11. 交付汇报格式（简短）

1. 修改了哪些文件。
2. 修改了哪些组件。
3. 是否复用了现有组件。
4. 是否新增组件/依赖及原因。
5. 是否通过 `npm run check` 与 `npm run build`。

不写长篇架构分析，不重复 README 已说明的内容。
