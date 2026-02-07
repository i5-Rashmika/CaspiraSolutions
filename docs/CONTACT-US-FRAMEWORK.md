# Contact Us — 排列与设计框架

## 一、整体排列（从上到下）

```
① 标题区（居中）
   ├ 背景渐变字 "Contact Us"
   ├ 主标题：Contact Us（白字粗体）
   └ 副标题：contact.subtitle（灰字一行）

② 主内容区（一大块圆角卡片，深蓝底）
   ┌─────────────────────────────────────────────────┐
   │  左列（表单）          │  右列（地图 + 联系信息）  │
   │  Let's Get In Touch   │  Google 地图（Malaysia）  │
   │  描述文案              │  联系信息卡片             │
   │  表单项…               │  Malaysia                │
   │  Submit 按钮           │  support@caspira...     │
   └─────────────────────────────────────────────────┘
```

---

## 二、左列 — 表单区排列

| 顺序 | 元素 | 文案来源 | 说明 |
|:----:|------|----------|------|
| 1 | 小标题 | `contact.getInTouch` | "Let's **Get In Touch**" |
| 2 | 描述 | `contact.weLoveToHear` | "We'd love to hear from you — whether you have a project idea, a question, or just want to say hello." |
| 3 | 第一行（两格） | `contact.firstName` / `contact.lastName` | First Name（左）｜ Last Name（右） |
| 4 | 单行输入 | `contact.email` | Email，全宽 |
| 5 | 单行输入 | `contact.phone` | Phone Number，全宽 |
| 6 | 多行输入 | `contact.message` | "Tell us about your project..."，全宽 |
| 7 | 按钮 | `contact.submit` | Submit，全宽、圆角、蓝色 |

样式要点：输入框统一深蓝底、圆角（`rounded-[55px]` / textarea `rounded-xl`），placeholder 浅灰。

---

## 三、右列 — 信息区排列

| 顺序 | 元素 | 内容 |
|:----:|------|------|
| 1 | 地图 | Google Maps iframe，Malaysia，占满上方区域 |
| 2 | 联系卡片 | 定位图标 + **Malaysia** + support@caspirasolutions.com |

地点与邮箱当前在 `ContactForm.jsx` 内写死，未用 i18n。

---

## 四、设计框架（层级与组件）

- **组件**：`ContactUs.jsx`（标题 + 副标题）→ 内嵌 `ContactForm.jsx`（表单 + 右列）。
- **背景**：Spotlight + 椭圆图（`/images/png/ellipse.png`），主内容用 `nav_bg`、圆角、边框（`border_map`）、`backdrop-blur`。
- **布局**：大屏 `lg` 为两列 `grid grid-cols-2`，小屏单列；最大宽度 `max-w-7xl`，居中。
- **动效**：左列自左滑入、右列自右滑入（GSAP ScrollTrigger）。

---

## 五、修改时对应文件

| 要改的内容 | 文件 |
|------------|------|
| 主标题、副标题、表单项文案 | `src/messages/en.json`（及 ru、hy、hi）下 `contact.*` |
| 左列/右列顺序、表单项顺序、样式 | `src/components/ContactForm.jsx` |
| 标题区结构或样式 | `src/components/ContactUs.jsx` |
