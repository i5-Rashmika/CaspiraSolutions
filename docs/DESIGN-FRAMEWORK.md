# 设计框架与页面排序

## 一、整站区块排序（从上到下）

在 `src/app/page.js` 中，首页各区块的**渲染顺序**为：

| 顺序 | 区块 | 组件 | 说明 |
|------|------|------|------|
| 1 | 首屏 / Hero | `Header` | 主标题、slogan、评分、Our Services / Selected Projects 按钮 |
| 2 | 我们的服务 | `ServicesSection` | OUR SERVICES，左侧服务分类 + 右侧详情 |
| 3 | 精选项目 | `OurWork` | Selected Projects，筛选 + 项目卡片 |
| 4 | 我们的解决方案 | `OurProducts` | Our Solutions，3 张 Solution 卡片 + CTA |
| 5 | 客户评价 | `Testimonial` | Testimonials，副标题 + 3 行 Marquee 评价卡 |
| 6 | 联系我们 | `ContactUs` | Contact Us，副标题 + 表单与联系信息 |
| 7 | 回到顶部 | `BackToTop` | 右下角浮动按钮 |

---

## 二、Contact Us 设计框架

### 2.1 层级结构

```
ContactUs（外层）
├── 标题区
│   ├── GradientText（背景渐变字 "Contact Us"）
│   ├── h2 主标题：t("contact.title")  → "Contact Us"
│   └── 副标题：t("contact.subtitle")
└── ContactForm（表单与信息区）
    ├── 背景与装饰
    │   ├── Spotlight
    │   └── 椭圆图 / ellipse
    └── 主卡片（grid 两列：lg 下左右分栏）
        ├── 左列：表单
        └── 右列：地图 + 联系信息
```

### 2.2 左列：表单（从上到下）

| 顺序 | 元素 | i18n key | 说明 |
|------|------|----------|------|
| 1 | 小标题 | `contact.getInTouch` | "Get In Touch"（前有 "Let's "） |
| 2 | 描述文案 | `contact.weLoveToHear` | "We'd love to hear from you..." |
| 3 | 表单 | — | 见下表 |

**表单项顺序：**

| 顺序 | 类型 | i18n placeholder | 布局 |
|------|------|------------------|------|
| 1 | input 文本 | `contact.firstName` | 第一行左 |
| 2 | input 文本 | `contact.lastName` | 第一行右 |
| 3 | input email | `contact.email` | 全宽 |
| 4 | input 文本 | `contact.phone` | 全宽 |
| 5 | textarea | `contact.message` | 全宽，多行 |
| 6 | button submit | `contact.submit` | 全宽，"Submit" |

### 2.3 右列：信息区（从上到下）

| 顺序 | 元素 | 内容 |
|------|------|------|
| 1 | 地图 iframe | Google Maps 嵌入（Malaysia） |
| 2 | 联系信息卡片 | 图标 + "Malaysia" + support@caspirasolutions.com |

*当前地点与邮箱在组件内写死，未走 i18n。*

### 2.4 Contact 文案 i18n 键（en）

| Key | 用途 |
|-----|------|
| `contact.title` | 区块主标题 "Contact Us" |
| `contact.subtitle` | 主标题下方副标题 |
| `contact.getInTouch` | 表单区小标题 "Get In Touch" |
| `contact.weLoveToHear` | 表单区描述段 |
| `contact.firstName` | 名字 placeholder |
| `contact.lastName` | 姓氏 placeholder |
| `contact.email` | 邮箱 placeholder |
| `contact.phone` | 电话 placeholder |
| `contact.message` | 留言 placeholder |
| `contact.submit` | 提交按钮文案 |

---

## 三、其他区块简要框架

- **Header**：GradientText + 主标题 + slogan + 星级评分 + 两枚 CTA（Our Services #our-services、Selected Projects #selected-projects）。
- **ServicesSection**：id=`our-services`，左侧 servicesList 分类 + 右侧详情（description + features）。
- **OurWork**：id=`selected-projects`，标题 + 副标题 + 筛选标签 + 项目列表。
- **OurProducts**：标题 Our Solutions + 副标题 + CardSlider 展示 3 个 solution（title, shortDesc, ctas）。
- **Testimonial**：标题 Testimonials + 副标题（testimonial.subtitle）+ TestimonialCards 三行 Marquee（按 tag 分：Systems/Operations、UI/UX/Customer Support、AI/Systems）。

---

## 四、修改顺序或文案时建议

- **调整区块顺序**：改 `src/app/page.js` 里各组件的先后顺序。
- **改 Contact 表单顺序**：改 `src/components/ContactForm.jsx` 内表单项顺序，并同步本文档。
- **改 Contact / Testimonial 文案**：改 `src/messages/en.json`（及 ru、hy、hi）中 `contact.*`、`testimonial.*`。
