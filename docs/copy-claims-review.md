# 首页文案待审核声明清单

首页已按业主反馈改为大块结构：每块一个主标题 + 一段直给文案 + 一张配图，
图文左右交替；删掉了“工厂 vs 贸易商”对比表、分类小字描述和分区眉标。
部分数字仍属营销估算，**全部在代码里带 `// [VERIFY] HP-xx` 注释**，
不会显示在页面上；业主审核后改值或删除注释即可。

```bash
rg "\[VERIFY\]" src
```

---

## 一、待审核的营销估算

| ID | 页面原句（英文） | 位置 | 建议来源 / 处理 |
| --- | --- | --- | --- |
| HP-01 | `40+ Export countries` / `40+ countries` | `src/data/home.ts` → `homeTrustBar`、`homeDefinition.paragraph`；`site.ts` Hero 亮点 | 换成销售台账里的实际出口国数量 |
| HP-02 | `5,000+ brands served` / `5,000+ Brands and retail chains` | `src/data/home.ts` → `homeTrustBar`、`homeDefinition`、`homeCta.footnote`、定制第三段；`site.ts` Hero / `footerBlurb`；`advantages.ts`；`about.ts` | 换成 CRM 里的已成交客户数；同时改 `about.ts` 保持一致 |
| HP-03 | `8–15 mm cast acrylic` | `src/data/site.ts` → Hero slide 2 亮点 | 换成实际常做的浇铸亚克力板厚区间 |
| HP-04 | `3–15 mm, matched to the load` | `src/data/home.ts` → `homeCustomizationRows` 第 1 段要点 | 与 HP-03 使用同一区间，或改成实际报价范围 |
| HP-06 | `98.6% On-time delivery` | `src/data/home.ts` → `homeTrustBar`；`site.ts` Hero 亮点 | 换成出货台账的准时交付率 |
| HP-07 | `up to 40%` freight reduction | 原本在 `src/data/site.ts` → Hero slide 3 描述 | **2026-11 已从文案删除**，改用可核对的 `90%+ container load` 与 `under 3 minutes, no tools`；如日后有实测值再恢复 |
| HP-09 | `+340%` product visibility | `src/data/cases.ts` → 美国电子案例 `results`；`home.ts` → 第 1 条证言 | 换成客户书面确认的结果；页面已注 `Client-reported` |
| HP-10 | `+28%` sell-through | `src/data/cases.ts` → 德国药妆案例 `results`；`home.ts` → 第 2 条证言 | 同上 |
| HP-11 | `+45%` impulse sales | `src/data/cases.ts` → 澳洲酒类案例 `results`；`home.ts` → 第 4 条证言 | 同上 |
| HP-12 | `US$18–65 per set at 500+ units` | `src/data/home.ts` → FAQ 价格题；`src/data/faq.ts` → 同一题 | 换成销售部的价格矩阵；页面已注 `typical, confirmed against artwork` |
| HP-13 | Video `uploadDate: 2025-06-01` | `src/pages/index.astro` → `videoSchema` | 换成 YouTube 后台的实际发布日期 |
| HP-14 | `US$9M+ annual sales` | `src/data/home.ts` → `homeTrustBar` | 换成财务台账的年销售额；确认口径（出厂价/含税）后在文案中注明 |
| HP-15 | `ISO 2859-1 sampling`、六项测试清单（承重/色差/跌落/环境/包装/合规） | `src/data/home.ts` → `homeWhy.pillars.quality`、`homeQuality`、FAQ 质量题；`faq.ts` → 质量控制题 | 请 QC 确认抽样标准与 AQL 等级；确认后可补跌落高度、ΔE 阈值；测试视频到位后替换 `homeQuality.videos` 占位块 |
| HP-16 | `20–55 kg (44–121 lb) per shelf` | `src/data/home.ts` → `homeSpecStrip`、`homeCustomizationRows[0]`、`homeWhy.pillars.quality`、`homeQuality.tests`、新增 FAQ 承重题；`site.ts` → Hero slide 1/2/3 与 `homeDefinition.terms`；`advantages.ts`；`productDetails.ts` → 三个产品的 `Load per shelf` 行 | 口径来源：竞品 popdisplay.me 的 15–50 kg 上浮 5 kg，**不是实测值**。上线前须由 QC 按实际结构做承重测试并签字；若无法确认，退回为 `Load rated per structure` 并删除 kg 数值（单点回退，不动结构）。**不得写入任何 JSON-LD**：`index.astro` 的 `Organization` / `Service` / `OfferCatalog` 保持无承重、无价格 |

> 审核方式：把真实值替换进 `value` / 文案字段，删除该行注释；再跑一次
> `rg "\[VERIFY\]" src`，直到只剩决定保留的条目。

**已随版式删除、无需审核**：HP-05（`Six-color flatbed`）和 HP-08（`12 production lines`）
原先只存在于已删掉的“服务卡”和“对比表”里，本轮不再出现。

---

## 二、站内已有事实（无需审核，勿再改动）

以下数字与 `/faq/`、`/order-process/`、案例数据一致，改一处会与全站口径冲突：

- 2013 年建厂 → 首页写 `13+` 年
- 23,000 m² 厂房；150+ 员工，其中 5 名全职 QC
- 350,000+ 件/月产能
- MOQ 100 套/款；打样 3 个工作日；量产 12–15 天
- 样品费约 US$100，满 100 套返还
- 免费 3D 渲染 1 个工作日内出图，改到签样
- 切割与钻孔公差 ±1 mm；三道检验（来料 / 制程 / 出货）
- 装柜率 90%+；报价 1 个工作日内回复
- 贸易条款 FOB / CIF / DDP；单张板材最大 1.2 × 2.4 m

---

## 三、本轮刻意没有编造的内容

- **认证**：仍只写 `certifications.ts` 里持有的六项（amfori BSCI / CE / FSC / RoHS / Sedex / UL）。
  没有新增 ISO9001、SGS、ISTA、REACH，也没有证书编号。
- **具名客户**：首页案例与证言继续用匿名客户画像；没有新增 Walmart、Coca-Cola 等具名品牌。
- **评分 schema**：没有 `aggregateRating`、`review` 或虚构星级。
- **价格 schema**：`Service` / `OfferCatalog` 不含 `price`，价格只出现在 FAQ 正文并标注 `typical`。
- **对比表**：已按业主要求整块删除，不再比较工厂、贸易商与本地加工商。

---

## 四、本轮版式与一致性修复

- 首屏后的“定义段 + 信任数字带 + 采购参数带”三块合并成一块：左文右图，数字与认证放在同块底部。
- 分类磁贴只保留图片和标题；删除分类小字描述与磁贴内 “Get a quote”。
- 定制区由 6 张卡改为 3 段图文（尺寸 / 材料与印刷 / 包装与铺货），左右交替。
- Why 区由 4 个子块压缩为 3 段图文（工厂 / 质检 / 认证），删掉 6 条承诺卡。
- 删除“工厂 vs 贸易商 vs 本地加工商”对比表；FAQ 中相应回答不再引用该表。
- 删除首页所有分区眉标（eyebrow）与多个子标题，每块只保留一个 `h2`。
- 采购参数由 8 格参数带改为定义段下方的一行文字。
- 首页 FAQ 仍为 23 条；`faq.ts` 与 `/faq/` 口径不变。
- “Three builds” 与产品数一致：首页 3 个精选产品（AC-720、FS-1800、PF-1200）。

---

## 五、Jack Li 专题页待审声明（JP-xx）

`/jack-li/` 的文案集中在 `src/data/jackLi.ts`，页面只编排。质量体系直接
import `homeQuality`，客户评价取 `testimonials` 前三条，因此只有下列三项
需要业主确认，不与首页口径脱钩：

| ID | 页面原句（英文） | 位置 | 建议来源 / 处理 |
| --- | --- | --- | --- |
| JP-01 | 时间线 `2013 / 2019 / 2021 / 2023 / 2024–2025` 目前用的是工厂节点 | `src/data/jackLi.ts` → `timelineItems` | 换成 Jack 本人加入年份与历任岗位；未确认前条目只描述他管的产线，不写“他主导” |
| JP-02 | `A batch is not finished when the last unit is packed…` | `src/data/jackLi.ts` → `quote.text` | 草稿口吻，待 Jack 本人确认或改写后再当作引述发布 |
| JP-03 | `15+ years` factory production & quality | `src/data/jackLi.ts` → `hero.facts`；源头 `src/data/about.ts` → `aboutTeam` | 与 About 团队简介同一口径，确认年限后两边一起改 |

> `ISO 2859-1` 抽样与六项测试沿用 HP-15，人物页不新增检测数值
> （承重 kg、跌落高度、ΔE、AQL 等级仍为空白）。

---

## 六、2026-11 销售力改造（对标 popdisplay.me）

- 首屏下方新增「采购规格速览条」`homeSpecStrip`（6 项：尺寸 / 材料 / 承重 / 样品 / 量产 / MOQ），
  用 `dl` + 现有 Tailwind 网格渲染，未新建组件，类型复用 `src/types/index.ts` 的 `SpecItem`。
- 定义段之后新增「付费前免费包 + 数量阶梯」`homeOffer`：左栏 5 条免费项，右栏
  100–299 / 300–999 / 1,000–9,999 / 10,000+ 四档，只写「量越大单价越低」，不写单价。
- 这是第 74 行「删除首页所有分区眉标」之后的**唯一例外**：`homeOffer.eyebrow` 使用了
  `.eyebrow`，因为该块是 offer 包裹而不是普通段落；其余长区块仍不加眉标。
- 产品卡片新增 `ctaLabel`：整卡仍是单一 `<a>`，报价入口渲染为 `span`（不是嵌套链接）。
  卡片标题下的 `cardSpec` 规格小字已按反馈全站移除（2026-11-11）。
- 免责声明内联：案例的 `Client-reported` 与证言的 `anonymised` 说明并入各自 `subtitle`，
  `CaseStudies.note` 与 `Testimonials.disclaimer` 两个 prop 已删除，不再有灰色小字单独占行。
- 删掉的「聪明话」收尾：`so the box is the last thing you have to take on trust`、
  `First orders are judged on the render…`、`the clock starts when the paperwork does`、
  `No stock footage`、`Real builds, not catalog pages` 等，改为参数或动作句。

---

## 七、2026-11 首页减负预览（/home2/ 与 /quality/）

新增两个页面（现有 `index.astro` / `home.ts` 不动），供业主对比后择一保留：

- `/home2/`（noindex 预览页）：文案在 `src/data/home2.ts`。信任带从 7 个数字减到 5 个
  （删掉 5,000+ / 98.6% / US$9M+，即 HP-02 / HP-06 / HP-14 不再出现在该页），
  其余 HP 标记沿用：HP-04（3–15 mm）、HP-15（ISO 2859-1）、HP-16（承重，
  仅出现在 hero qualifier 与 FAQ，不进 JSON-LD）。
- `/quality/`：质检大块从首页移出后的完整承载页，文案在 `src/data/quality.ts`，
  沿用 HP-15 / HP-16，无新增数值。
- 两个页面均未新增任何待审数字；确认择一保留后的清理任务里再做单一数据源合并。

### 2026-11-06 /home2/ 二次修改（能力条 + 品牌足迹）

- **HP-01（40+ 出口国家）已随 5 数字信任带整体从 /home2/ 移除**：信任带删除，
  规模信息当时只保留在 hero 的 brandLine 一句话里（13 年 / 23,000㎡ 不在页面正文重复）。
- hero 下方新增两个复刻自集团中文站（popzhihuojia.com，自有站点）的模块：
  - **能力条**（4 项，图标来自原站文件/内联 SVG）：Custom Design / Sample Validation /
    Volume Production / Packing & Shipping。无数字声明，无需审核。
  - **品牌足迹**：24 个具名客户 logo 跑马灯（`home2BrandLogos`，图片与清单取自中文站）。
    **这是对外客户关系声明（BP-01）**：英文站展示即宣称这些品牌为服务客户，
    业主需确认与中文站客户清单口径一致后再上线正式首页。
- 新增品牌 logo 与图标清单见 `docs/image-inventory.md` 的 brands / icons 两节。

### 2026-11-09 /home2/ 语气重写（对齐中文站）

- 首屏改为 3 屏轮播（沿用现有 `hero-bg-01/02/03`），按中文站"零售保驾护航 / 您的想法我们落地 / 让产品更受青睐"三句主张改写；单按钮不变，新增 `home2Hero.ctaNote`。
- 工厂规模（13 年 / 23,000 ㎡ / 150+ 人 / 350,000 套每月）从 `site.ts` 的 `hero.brandLine` 复用到能力区下方**一行**（`home2Scale`），全页只此一处；数字口径与现有首页一致，未新增待审数字。
- 品牌足迹标语改写为背书句式，但 24 个客户 logo 仍是**对外客户关系声明（BP-01）**，处理方式不变：业主确认后才可随正式首页上线。
- 本轮为纯文案与一层栅格调整，不涉及新增检测数值；HP-04 / HP-15 标记位置未变。

### 2026-11-09 /home2/ 品牌叙事（第三次改写）

- 全页主语从"这款陈列卖得好"改为"你的品牌在线下的实体表达，我们负责落地"。首屏一屏 `Built Around Your Brand`、三屏 `Build Your Brand / One Shelf at a Time`（原 `Make Your Product`，业主认为定制客户买的是品牌表达）。
- **本页不出现现货/在售/上市语义**：`in stores now`、`available now`、`on the market`、`in stock`、`shelf-ready` 一律不用；门店关系只写位置（"stands in those brands' stores"）。案例区标题由 `Displays in Stores Now` 改为 `Custom Display Programs We Manufacture`，副标题删除 `right now`。
- `shelf-ready` 属零售包装（SRP）术语，已从定制区标题删除，改为 `From Brand Sketch to Finished Stand`。
- 数字、认证与交期口径全部未变（MOQ 100 / 24 小时 / 3 个工作日 / 12–15 天 / ±1 mm / 3–15 mm / ISO 2859-1 / 六项认证）；工厂规模仍只在 `home2Scale` 一行；BP-01（客户 logo）状态不变。

---

## 八、验证

```bash
rg "\[VERIFY\]" src                 # 所有待审声明
rg "ISO ?9001|SGS|ISTA|REACH" src   # 必须为空
rg "500\+|5,000\+" src              # 只保留 5,000+ 一个口径
rg "#compare|homeComparison" src    # 必须为空
npm run check                       # 0 error
npm run build                       # 成功产出 dist/
```

页面渲染后不会出现 `[VERIFY]`；标记只存在于 `.ts` / frontmatter 注释中。

---

## 九、2026-11 产品详情页改版（对标 grandfly 产品页）

- 结构改为：图册 + 标题/描述/5 字段询价表单 → 一段产品简介 → 四个 Tab（Specifications / Artwork Guidelines / Order Process / Why Choose One Plus Display）→ 10 条 FAQ（3 条产品专属 + 7 条订购通用）→ 相关产品 → CTA。文案分别在 `src/data/productDetails.ts`（每款）与 `src/data/productPage.ts`（全站共享）。
- 本轮**未新增**任何业绩数字。三款产品的规格表沿用既有口径：MOQ 100 套、样品 3 个工作日、批量 12–15 天、±1 mm、90%+ 装柜率、FOB / CIF / DDP。
- HP-16（20–55 kg 单层承重）原样保留在三款产品的规格表里，仍是对标的比较口径，等 QC 承重测试数值。
- 艺术作品指南的验收规范（矢量 PDF / AI / EPS、位图 ≥300 DPI、3 mm 出血、文字距边 ≥6 mm、CMYK、最小 6 pt、线宽 ≥0.25 pt、印前 digital proof）登记为 **HP-17 待设计部确认**，确认后再写进正式 FAQ 或服务页。
- 产品页新增 Product 与 FAQPage 结构化数据，字段全部取自页面既有文案，未引入新数字。

---

## 十、2026-11 产品链接改为标题、型号下线、产品数据合并

- 三款产品的 URL 改为由标题自动生成的 slug（`src/data/products.ts` 的 `slugify` + `defineProduct`），产品卡片、菜单、首页、相关产品、sitemap 与 canonical 全部跟随；旧链接（`custom-acrylic-displays-ac-720` 等）按要求直接下线，不做跳转，本地验证新链接 200、旧链接 404。
- 全站删除型号说法：`Product.model` 字段移除，首屏小标签只留分类，询价表单去掉 `model` 隐藏字段，结构化数据去掉 `sku`，CTA 改为 `Get a Quote for This Display`。
- 产品数据合并为一条记录：`productDetails.ts` 删除，图片、标题、标题下描述、Overview、逐行规格全部在 `products.ts`；Specifications 用 `Label: Value` 纯文本行，前端按第一个冒号拆成两列。
- Overview 移入 Specifications 面板顶部，页面上独立的 Overview 区块删除；首屏 3 条卖点删除（不在上传时需要填写的清单内）。
- 3 条产品 FAQ 改为可选覆盖：未填写时使用 `productPage.ts` 的默认三条（尺寸与工艺可改、批量是否匹配样品、能否复单），不再依赖型号。（该覆盖机制已被第十一节取消。）
- 本轮未新增业绩数字；HP-16（20–55 kg 单层承重）仍在三款产品的规格行注释中，HP-17（艺术品规范）状态不变。

---

## 十一、2026-11 卡片标题居中、产品 FAQ 改为标题衍生的 7 条

- 产品卡片标题全站居中：`ProductCard` 删除 `titleAlign` 参数，default / catalog / compact 三种变体一律 `text-center`，规格小字同步居中；`Related models` 区块标题改为 `align="center"`（标题、副标题、蓝色短横与 View all 链接一起居中）。
- 产品页 FAQ 由 10 条两组（3 条产品 + 7 条订购）改为**单组 7 条**，取消 `About this product` / `Ordering & customization` 分组标题；`FaqAccordion` 的 `groups` 分支删除，全站只用 `items`。
- 7 条问答由 `productPage.ts` 的 `productFaqsFor(product)` 生成：取标题 `Wholesale` 之后、` - ` 之前的主标题作为关键词短语（如 `lockable acrylic lighter display case`），与产品 `description`、定制服务（3D 渲染、样品、印刷、包装）组合；`Product.faqs` 覆盖字段与三款产品手写 FAQ 一并删除，新品上传零文案。
- 数字口径全部复用既有登记：100 套起订、样品 3 个工作日、批量 12–15 天、样品约 US$100、300 DPI、装柜率 90%+、FOB / CIF / DDP、3D 渲染一个工作日内。**本轮未新增任何业绩数字**，无需新 HP 编号。
- FAQPage 结构化数据与页面同源，条数为 7，问答文本一致。

---

## 十二、2026-11 关于页（/about-us/）改版

- 板块重排为：横幅 → 01 公司简介（左文右图 + 4 格数字条）→ 02 我们做什么（4 张能力卡）→
  03 Why 六卡 → 04 工厂工艺链（3 张实拍 + 8 步）→ 05 Milestones → 06 Core team →
  07 Certifications → CTA。Milestones / Core team / Certifications / CTA 四个板块按要求保留。
- 叙事取自集团中文站（popzhihuojia.com/about/，自有站点）：「深圳商务 + 东莞制造」双中心、
  2013 年以纸品陈列起步、后延伸至亚克力与 PVC 雪弗板。**未新增任何业绩数字**：
  2013 / 23,000 ㎡ / 150+ 人 / 350,000+ 套每月 / MOQ 100 套 / 样品 3 个工作日 /
  批量 12–15 天 / ±1 mm / 90%+ 装柜率 / FOB·CIF·DDP 全部沿用站内既有口径。
- 认证仍只写 `certifications.ts` 的六项（BSCI / CE / FSC / RoHS / Sedex / UL），
  **没有写 ISO 9001、SGS、阿里巴巴深度认证**；认证区块文案只加「副本随报价提供」。
- HP-02（5,000+ 品牌）原先在关于页数字带里，本轮数字带改为 2013 / 23,000 ㎡ / 150+ / 350,000+；
  该声明只保留在简介的客户名小卡（NIVEA / Walmart / Costco / Red Bull / Coca-Cola / Disney），
  仍属 BP-01 待业主确认的客户关系声明。
- 材料不再单独成块：亚克力与 PVC 雪弗板的能力写进简介、四张能力卡、Why 第 3 条与八步工艺链；
  纸板只作为「2013 起点 + 可按需承接」的一句描述。
- 删除 `aboutMaterials` 与 `types/index.ts` 的 `MaterialCapability`；`aboutFactorySlides` 保留
  （`/jack-li/` 引用）。未新增组件、未新增依赖，未改 `certifications.ts` 与公共组件。

---

## 十三、2026-11-11 交期口径统一（业主确认）

- 业主确认：3 天/3 个工作日只是**样品制作时间**，不是到货时间，原「Sample in 3 days」易被读成
  「3 天到手」。全站统一为三条固定口径：
  - `free 3D render in 24 hours`（3D 效果图）
  - `sample built in 48 hours`（样品制作，不含运输）
  - `MOQ 100 sets`（不用 units）
- 改动覆盖 `site.ts`（description / ctaNote / hero description / qualifiers / footerBlurb / seo）、
  `home.ts`、`home2.ts`、`products.ts`、`productPage.ts`、`orderProcess.ts`、`news.ts`、
  `faq.ts`、`about.ts`、`cases.ts`、`inquiry.ts`、`types/index.ts` 注释，以及
  `request-quote.astro`、`order-process.astro` 的 description / 页面文案。
- 规格表中的 `Sample lead time` 统一改为 `Sample build time`（`48 hours`），避免 lead time 被理解为到货周期；
  案例指标改为 `Sample build: 48 hours`；新闻标题 `100 Sets, 48 Hours, 12–15 Days`。
- 仅剩的 `within one business day` 都是**回复时效**（询盘回复、报价回复），不含样品/到货承诺，保留。
- 未新增业绩或检测数值，无需新 HP 编号。
