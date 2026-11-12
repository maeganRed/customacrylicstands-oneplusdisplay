# 首页文案中英对照（第五轮：大块图文节奏）

用途：让业主按中文核对**意思**，不必判断英文语感。英文按“全球通用 + 美式拼写”定稿，
改动英文时请同步改这张表，否则两处会走散。

> 本轮按业主反馈重排：page 压成 12 个大块，每块一个主标题、一段直给文案、一张配图，
> 图文左右交替；删除“工厂 vs 贸易商”对比表、分类小字描述和所有分区眉标。
> 编造的数字仍用 `// [VERIFY] HP-xx` 标记，汇总在 `docs/copy-claims-review.md`。

## 一、写法约定

| 约定 | 说明 |
| --- | --- |
| 大块阅读 | 每块只讲一件事，块内不再切小节、不画分割线 |
| 图文交替 | 除分类/产品网格外，相邻两块的图片左右换边 |
| 一个标题 | 每块只有 1 个 H2；段内小标题最多 1 层 h3 |
| 分类只写标题 | 展示架类型磁贴只保留图片 + 分类名，不写小字描述 |
| 标题写关键词 | H2 放买家会搜的说法，变体放正文 |
| 编造要标记 | 营销数字可编，但必须带 `[VERIFY] HP-xx`，由业主审核 |
| 认证不编 | 仍只写 amfori BSCI / CE / FSC / RoHS / Sedex / UL 六项 |
| 客户匿名 | 继续用 North American consumer electronics brand 这类画像，不写具名品牌 |
| 拼写统一美式 | color、center、program |

---

## 二、首屏（`src/data/site.ts` → `hero`）

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| 品牌定义句 | One Plus Display is a custom acrylic display manufacturer in Dongguan, China — 23,000 m², 150+ staff, 13 years of OEM/ODM retail display production. | One Plus Display 是中国东莞的定制亚克力展示架制造商：23,000 平方米、150 多名员工、13 年 OEM/ODM 零售展示生产经验。 |
| CTA 下注 | Reply within 24 h · No obligation · MOQ 100 sets | 24 小时内回复 · 不询价也没关系 · 100 套起订 |

**Slide 1**

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| 角标 | 13 years OEM/ODM · 5,000+ brands served · Own factory in Dongguan | 13 年 OEM/ODM · 服务 5,000+ 品牌 · 东莞自有工厂 |
| 主标题 | Custom Acrylic Display Stands / Wholesale Manufacturer | 定制亚克力展示架 / 批发制造商 |
| 筛选行 | Bulk B2B only · MOQ 100 sets · Factory-direct — no trading company | 只接批量订单 · 100 套起订 · 工厂直供，不经贸易公司 |
| 亮点 | 5,000+ brands served · 40+ export countries · 98.6% on-time delivery | 服务 5,000+ 品牌 · 40+ 出口国 · 98.6% 准时交付 |
| 说明 | Send your product and target quantity: free 3D render in 24 hours, a sample in 3 days, bulk production in 12–15 days. Factory-direct pricing from 100 sets. | 把产品和目标数量发来：24 小时内出免费 3D 图，3 天出样，12–15 天量产。100 套起享工厂直供价。 |
| 按钮 | Get My Free 3D Render & Quote | 免费拿 3D 图与报价 |

**Slide 2（亚克力）**

- 标题：`Custom Acrylic / Display Stands` → 定制亚克力 / 展示架
- 亮点：`8–15 mm cast acrylic` / `Laser cut · heat bent` / `Diamond-polished edges`
- 说明：`Built to your product, not a catalogue size — clear, frosted, black or color-matched, cut and polished in our own plant.`

**Slide 3（PVC 发泡板）**

- 标题：`PVC Foam Board / Display Stands` → PVC 发泡板 / 展示架
- 亮点：`UV flatbed print` / `Cut to any silhouette` / `Flat-packed for freight`
- 说明：`Full-color print on rigid foam board, flat-packed to cut freight by up to 40% and built in store in minutes.`

---

## 三、工厂介绍大块（合并原定义段 + 数字带 + 参数带）

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Custom Acrylic Display Manufacturer in Dongguan, China | 中国东莞定制亚克力展示架制造商 |
| 正文 | One Plus Display is a factory-direct custom acrylic and PVC foam board display manufacturer in Dongguan, Guangdong, China. Since 2013, we have designed, cut, bent, polished, UV-printed and assembled wholesale retail displays in-house for 5,000+ brands, retailers and distributors in 40+ countries. MOQ is 100 sets per design; free 3D renders return in 24 hours, samples in 3 working days and bulk production in 12–15 days. | One Plus Display 是中国广东东莞的工厂直供定制亚克力与 PVC 发泡板展示架制造商。自 2013 年起，我们在自有工厂完成设计、切割、热弯、抛光、UV 印刷与组装，为 40+ 国家的 5,000+ 品牌、零售商与经销商供货。每款 100 套起订；24 小时出免费 3D 图，3 个工作日出样，12–15 天量产。 |
| 采购条件行 | 100 sets per design · Free 3D render in 24 hours · Sample in 3 working days · Bulk in 12–15 days · ±1 mm cut and drill · 90%+ container load · US$100 sample fee, refunded at 100 sets · FOB, CIF or DDP | 每款 100 套 · 24 小时免费 3D 图 · 3 个工作日出样 · 12–15 天量产 · 切割钻孔 ±1 mm · 装柜率 90%+ · 样品费 100 美元，满 100 套退还 · FOB / CIF / DDP |
| 主按钮 | Get a Factory Quote in 24 Hours | 24 小时内拿工厂报价 |
| 内链 | About our factory / See the order process / Browse display styles | 关于工厂 / 查看下单流程 / 浏览展示风格 |
| 配图 | 工厂展厅实拍（右） | — |

数字带（同块底部，6 项）：

| 英文 | 中文 |
| --- | --- |
| 13+ Years manufacturing | 13+ 年制造经验 |
| 23,000 m² Own factory in Dongguan | 东莞 23,000 平方米自有工厂 |
| 350,000+ Display stands a month | 每月 350,000+ 件展示架 |
| 5,000+ Brands and retail chains | 5,000+ 品牌与零售连锁 |
| 40+ Export countries | 40+ 出口国 |
| 98.6% On-time delivery | 98.6% 准时交付 |

认证行：`Certified: amfori BSCI · CE · FSC · RoHS · Sedex · UL`

---

## 四、分类与精选产品

**分类（`homeSections.categories`）**

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Custom Display Stand Categories We Manufacture | 我们制造的定制展示架类别 |
| 副标题 | Floor-standing, countertop, pegboard, lockable, LED and PVC foam board displays — each one re-drawn around your product, shelf and brand. | 落地、台面、挂板、锁柜、LED 与 PVC 发泡板展示架——每一款都按你的产品、货架与品牌重画。 |
| 磁贴 | 图片 + 分类名，无小字描述、无磁贴内 CTA | 只写分类标题 |
| 区块链接 | Browse all display stand types | 浏览全部展示架类型 |

**精选产品（`homeSections.products`）**

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Wholesale Custom Display Stands Built to Your Spec | 按你的规格定制的批发展示架 |
| 副标题 | Three recent builds from our floor — every dimension, material, finish and print re-drawn for your product before the first sample. | 车间里最近做的三款——每一款的尺寸、材料、表面与印刷都会在打样前按你的产品重画。 |
| 按钮 | Get a Price for This Build | 按这款拿报价 |

---

## 五、定制三段（图文交替）

| # | 标题 | 正文 | 要点 |
| --- | --- | --- | --- |
| 1 | Size and structure, drawn around your product / 尺寸与结构，围绕你的产品来画 | Send the product, the shelf and the target quantity. We set the width, depth, height, shelf spacing and load bearing around them, then hold cut and drilled dimensions to ±1 mm. Nothing comes from a catalogue size — the drawing is yours before the first sheet is cut. / 把产品、货架和目标数量发来。宽度、深度、高度、层板间距与承重都按它们设定，切割与钻孔尺寸控制在 ±1 mm。没有一项来自目录尺寸——第一张板下料前，图纸就是你的。 | Any width, depth or height / 3–15 mm, matched to the load / Shelves, dividers, hooks and locks |
| 2 | Materials, color and print in one run / 材料、颜色与印刷，一次做完 | Cast acrylic, PVC foam board, or both in one unit. Clear, frosted, black, color-matched or printed with your artwork. Cutting, heat bending, diamond polishing and UV printing all happen in the same plant, so the finish and the print are matched before the unit is packed. / 浇铸亚克力、PVC 发泡板，或两者同柜。透明、磨砂、黑色、对色或印刷你的图案。切割、热弯、钻石抛光与 UV 印刷都在同一工厂完成，打包前表面与印刷已经对齐。 | Cast acrylic and PVC foam board / Pantone-matched on request / UV print, proofed before production |
| 3 | Built to be packed, shipped and reordered / 按“能打包、能海运、能返单”来做 | Locks, backlit headers and cable routing are designed in from the start. Units ship flat-packed or assembled, with corner protection and a container load rate above 90%. OEM and ODM runs follow the same files: sample in 3 working days, bulk in 12–15 days, repeat drops split by market. / 锁具、背光头牌与走线从设计阶段就做进去。平板或组装出货，带护角，装柜率 90% 以上。OEM / ODM 沿用同一套文件：3 个工作日出样，12–15 天量产，返单按市场分批。 | Flat-packed or assembled / 90%+ container load / OEM and ODM repeat rollouts |

区块 H2：`Custom Display Stands: Size, Material and Packing`
中文：定制展示架：尺寸、材料与包装

副标题：`Three things decide the price and the build — the dimensions, the material and print, and the way it ships. All three are set by you.`
中文：决定价格与做法的三件事——尺寸、材料与印刷、出货方式。这三件都由你定。

按钮：`Send Your Product, Get a Free 3D Drawing` → 发产品，免费拿 3D 图

---

## 六、为什么选 One Plus Display

H2：`Why Buyers Choose Our Acrylic Display Factory` → 买家为什么选我们的亚克力展示架工厂

开场：`One Plus Display is a direct manufacturer, not a trading company: drawing, sampling, printing, assembly and inspection all run in one plant in Dongguan. 23,000 m², 150+ staff and 350,000+ units a month — quoted and built by the same team.`
中文：One Plus Display 是直接制造商，不是贸易公司：绘图、打样、印刷、组装与检验都在东莞同一个工厂完成。23,000 平方米、150+ 员工、每月 350,000+ 件——报价的人和做货的人是同一批人。

| # | 图文行 | 英文 | 中文 |
| --- | --- | --- | --- |
| 1 | 工厂 | Our Own Factory, Not a Trading Desk | 自有工厂，不是贸易柜台 |
| | 正文 | 23,000 m², 150+ staff, 350,000+ units a month — cutting, heat bending, diamond polishing, UV printing and assembly under one roof in Dongguan. We quote only what we run ourselves, so there is no third party to blame when something slips. | 23,000 平方米、150+ 员工、每月 350,000+ 件——切割、热弯、钻石抛光、UV 印刷与组装都在东莞同一个厂里。我们只报自己能做的工序，出问题时没有第三方可以推。 |
| | 配图 | 工厂车间轮播 | — |
| 2 | 质检 | Three Quality Checks on Every Batch | 每批三道质检 |
| | 正文 | Three checks, not one: the sheet when it arrives, the unit in line, the batch before it ships. Dimensions are held to ±1 mm, and load and drop tests are photographed for your file. | 查三次，不是一次：来料查板、制程查件、出货查批。尺寸控制在 ±1 mm，承重与跌落测试拍照存档。 |
| | 配图 | 3 张产品检验实拍 | — |
| 3 | 认证 | Six Certifications, Copies With Every Quote | 六项认证，报价随附复印件 |
| | 正文 | We hold amfori BSCI, CE, FSC, RoHS, Sedex and UL. Copies go out with the quote; if your retailer asks for a document we do not have, tell us before the order — not after it ships. | 我们持有 amfori BSCI、CE、FSC、RoHS、Sedex 与 UL。复印件随报价提供；如果零售商要的文件我们没有，请在订单前说，不要等出货后。 |
| | 配图 | 六项认证标志 | — |

---

## 七、流程与工厂视频

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Custom Display Production: Sample in 3 Days, Bulk in 12–15 | 定制展示架生产：3 天出样，12–15 天量产 |
| 副标题 | Your quote returns in 24 hours. The sample ships in 3 working days. Bulk runs 12–15 days from artwork approval and deposit — the clock starts when the paperwork does, not before. | 报价 24 小时内回。样品 3 个工作日寄出。量产从确认图纸并收到定金起算 12–15 天——计时从手续齐了开始，不是从口头承诺开始。 |
| 步骤 | 6 步，沿用 `ProcessSteps` | — |
| 视频标题 | Walk the Floor Before You Place the Order | 下单前先看车间 |
| 视频说明 | Cutting, bending, UV printing, assembly and inspection, filmed in our plant — no stock footage. | 切割、热弯、UV 印刷、组装与检验，全部在自有工厂拍摄，没有素材片。 |

---

## 八、案例与证言

**案例**

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Custom Display Case Studies: From Brief to Container | 定制展示架案例：从简报到装柜 |
| 副标题 | What the brief asked for, what we changed to make it build, and the client-reported result. | 客户最初要什么、我们为了能做改了哪里、客户报告的结果是什么。 |
| 结果 | Product visibility +340% / Sell-through +28% / Impulse sales +45% | 产品可见度 +340% / 售罄率 +28% / 冲动购买 +45% |
| 小字 | Client-reported figures; not independently audited. | 客户报告数据，未经独立审计。 |

**证言**

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | What Buyers Say About Our Display Factory | 买家如何评价我们的展示架工厂 |
| 副标题 | First orders are judged on the render. Second orders are judged on whether the box matched it. | 第一单看效果图，第二单看实物对不对得上图。 |
| 免责声明 | Quotes are anonymised at the customer's request and lightly edited for length. | 证言按客户要求匿名，并做了少量长度编辑。 |

---

## 九、FAQ（23 条）

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Custom Display Stand Manufacturer FAQ: MOQ, Samples and Delivery | 定制展示架制造商常见问题：起订量、打样与交付 |
| 副标题 | MOQ, sampling, lead times, materials, print, packing, certifications and shipping — the questions buyers send before the first purchase order. | 起订量、打样、交期、材料、印刷、包装、认证与运输——买家在下第一张采购单前会问的问题。 |
| 新增 1 | How much does a custom acrylic display stand cost? | 定制亚克力展示架多少钱？ |
| 新增 2 | What is the difference between a display manufacturer and a trading company? | 展示架制造商与贸易公司有什么区别？ |
| 新增 3 | Do you ship custom displays to the US, Europe and Australia? | 定制展示架能发到美国、欧洲和澳大利亚吗？ |

> 对比表已删除；第 2 条回答只讲制造商与贸易公司的区别，不再指向页内表格。

---

## 十、行业洞察

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| H2 | Display Manufacturing Insights and Buying Guides | 展示架制造洞察与采购指南 |
| 副标题 | Material choice, structure, freight and what survives a store. | 选材、结构、运输，以及什么东西能在店里活下来。 |
| 按钮 | Display manufacturing guides | 展示架制造指南 |

---

## 十一、终极 CTA（`homeCta`）

| 位置 | 英文 | 中文 |
| --- | --- | --- |
| 标题 | Send Your Product. We'll Send the Drawing. | 把产品发来，我们把图发回去。 |
| 说明 | One photo, a size and a quantity is enough to start. You get a 3D render, a sample date and a factory price — the quote itself costs nothing. | 一张照片、一个尺寸、一个数量就能开始。你会拿到 3D 图、样品日期和工厂价——报价本身不收费。 |
| 清单 1 | Free 3D render in 24 hours | 24 小时免费 3D 图 |
| 清单 2 | Sample in 3 working days | 3 个工作日出样 |
| 清单 3 | Sample fee refunded at 100 sets | 满 100 套退样品费 |
| 清单 4 | Revisions until you sign off | 改到你签样为止 |
| 筛选句 | Bulk B2B only · MOQ 100 sets · Made in Dongguan, shipped FOB, CIF or DDP · 5,000+ brands served | 只接批量订单 · 100 套起订 · 东莞生产，FOB / CIF / DDP · 服务 5,000+ 品牌 |
| 主按钮 | Get My Free 3D Render | 免费拿我的 3D 图 |
| 次按钮 | Email the Factory | 直接发邮件给工厂 |

---

## 十二、首页三张产品卡

| 型号 | 英文名称 | 中文 |
| --- | --- | --- |
| AC-720 | Wholesale Lockable Acrylic Lighter Display Case - Custom Black & Clear Commercial Cabinet | 批发可锁亚克力打火机展示柜——黑白定制商用柜 |
| FS-1800 | Wholesale 4-Tier Acrylic Floor Display Stand with Backlit Header - Custom Retail Merchandiser | 批发四层亚克力落地展示架，背光头牌——定制零售陈列架 |
| PF-1200 | Wholesale Printed PVC Foam Board Floor Display - Custom Seasonal Promotion Stand | 批发印刷 PVC 发泡板落地展示架——定制季节性促销架 |

> 三款产品都复用现有展示架照片，未新增图片文件。

---

## 十三、审核标记

代码里搜索：

```bash
rg "\[VERIFY\]" src
```

- `HP-01` 40+ 出口国
- `HP-02` 5,000+ 品牌
- `HP-03` 8–15 mm 亚克力
- `HP-04` 3–15 mm 厚度
- `HP-06` 98.6% 准时交付
- `HP-07` 最高省 40% 运费
- `HP-09` 产品可见度 +340%
- `HP-10` 售罄率 +28%
- `HP-11` 冲动购买 +45%
- `HP-12` 500+ 套时 US$18–65/套
- `HP-13` 视频发布日期

> `HP-05`（六色平板）与 `HP-08`（12 条产线）随对比表和服务卡一起删掉了，无需再审。
