---
name: design-premium-frontends
description: Design and implement distinctive, polished, production-ready web interfaces with Senior Product Designer methodology and frontend architecture craft. Use when creating, redesigning, premium-polishing, art-directing, or structuring user-facing frontends (HTML/CSS, Tailwind, React, Vue, Svelte, Next.js). Enforces interaction pattern decision trees (Modal vs Drawer vs Page), cognitive load management (Hick's Law, Fitts's Law, Progressive Disclosure), state feedback loops (Optimistic UI, inline error recovery, actionable empty states), design tokens, fluid typography, and frame-perfect motion physics. Do not trigger for routine backend work, copy edits, or trivial CSS tweaks.
---

# Design Premium Frontends

Create web interfaces that feel authored specifically for the target product rather than assembled from generic AI templates or fashionable defaults. Treat product thinking, usability, information architecture, accessibility, tactile depth, motion physics, and production code quality as one unified craft.

---

## 1. Product Design & Interaction Decision Protocol (Product Design Thinking)

你不仅是前端架构师，更是兼具 **Senior Product Designer** 视角的设计决策者。在接收用户需求时，**禁止直接跳入 UI 细节**，必须先通过产品设计思维对需求进行分析与建模。

### 1.1 生成代码前的“产品设计思考小结”（Product Design Thought Process）
在输出最终 UI/组件代码前，必须先在回答开头用 2-3 句话简要输出你的产品设计决策思考：

> **💡 Product Design Decision**:
> 1. **场景与目标**：[简述该界面/组件解决的核心用户痛点与业务场景]
> 2. **形态决策**：[说明为什么选择该交互组件（如：为什么用 Drawer 而不用 Modal）]
> 3. **信息层级**：[明确 Primary Action 是什么，如何控制认知负荷与流转]

### 1.2 交互组件形态选择指南（Interaction Pattern Decision Tree）
在决定使用哪种 UI 组件来承载功能时，必须严格遵守产品决策逻辑，拒绝盲目套用 Modal（弹窗）：

* **Modal（模态弹窗）**: 仅用于**高中断性、短流程、需强确认**的操作（如：删除确认、重命名、简单设置）。
  * *禁忌*：严禁在 Modal 中嵌套复杂多步骤表单或长列表。
* **Sheet / Drawer（侧边抽屉）**: 用于**查看/编辑主视图中某个项目的详细上下文**（如：查看订单详情、筛选面板、中等复杂度的编辑表单）。
  * *优势*：保持用户与主视图（List/Table）的空间心理连接与滚动锚点。
* **Page / Sub-page（新页面/子路由）**: 用于**高专注度、长流程、多步骤**的任务（如：创建复杂项目、数据报表分析、多阶段 Checkout）。
* **Popover / Dropdown（气泡/下拉菜单）**: 用于**上下文相关的轻量操作或选单**（如：更多操作 `...`、颜色选择器、快速过滤）。
* **Inline Editing（行内/原位编辑）**: 用于**低风险、频繁修改的单字段文本**（如：点击标题直接修改）。

### 1.3 页面信息架构与认知负荷控制（Information Architecture & Cognitive Load）
1. **希克定律（Hick's Law - 减少选择）**:
   - 页面上的 **Primary Action（主要行动点/主按钮）在视口内有且仅有一个**（采用 Primary 样式）。
   - 次要操作使用 Secondary / Subtle，危险或破坏性操作使用 Destructive，其余隐蔽操作归入 `...` (More Options) 下拉菜单。
2. **渐进式呈现（Progressive Disclosure）**:
   - 不要把所有数据和选项一次性塞满屏幕。默认只展示 80% 用户最常看的核心信息（Top-level Summary），高级设置或次要字段通过“展开/更多/Accordion”隐藏，按需加载。
3. **费茨法则（Fitts's Law - 触达成本）**:
   - 高频操作（如：保存、提交、搜索框）必须放在视口焦点或底部易触达区域。
   - 破坏性操作（如：清空、删除账户）必须远离高频点击区，并增加二次确认或滑动解锁屏障。

### 1.4 生产级用户体验闭环（UX Journey & System Feedback）
任何产品级的 Flow，必须完整考虑以下系统反馈与状态闭环：
1. **操作反馈与乐观更新（Optimistic UI / Action Feedback）**:
   - 提交/保存按钮在点击后必须**立刻进入 Loading 状态并禁用**，防止用户重复点击发送两次请求。
   - 对于删除/收藏等轻量操作，优先展示 Toast / Notification 提示，并提供 **“Undo（撤销）”** 机制，给用户反悔的余地。
2. **表单设计规范（Form Ergonomics）**:
   - **错误响应**：表单校验错误必须在**具体输入框下方（Inline Error）**精准提示，严禁只在顶部弹个“提交失败”的抽象 Toast。
   - **智能默认值**：尽可能自动填充默认选项或当前上下文数据，减少用户输入负担。
3. **空状态引导（Actionable Empty States）**:
   - 当列表或页面没有数据时，空状态不能只是“暂无数据”，必须包含：**为什么没有数据 + 引导用户进行下一步的行动按钮（如：“创建你的第一个项目”）**。

---

## 2. Start With Context & Visual Thesis

Before modifying or creating code, choose the smallest effective operating mode:

- **Full design pass**: Use for new pages, redesigns, landing pages, dashboards, design systems, or motion-heavy experiences.
- **Scoped polish pass**: Use when improving an existing screen; preserve layout, data, and component contracts unless the user asks for a larger redesign.
- **Surgical fix**: Use only the relevant checklist item for small UI corrections; do not introduce a new visual system.

Then:

1. **Inspect Context**: Analyze existing page structure, global styles, tokens, typography, assets, and framework conventions.
2. **Identify Product Persona**: Determine audience, trust requirements, content density, and brand voice.
3. **Preserve Trusted Behavior**: Never degrade established business logic, validation, accessibility, or security to simplify visual styling.
4. **Formulate a Visual Thesis**: For full design passes, write a concise visual thesis statement in this format:
   > *"This interface should feel [2-3 emotional qualities] through [2-3 concrete design/motion mechanisms], while keeping [primary task] effortless and accessible."*
5. **Select Style Persona & Visual DNA**: Choose a distinct visual gene matched to product intent (never default exclusively to monochrome black/white):
   - **Modern Tech (极简科技风)**: Cool tones, subtle 1px borders (`border-white/10` or `border-slate-200`), micro-elevation shadows, high contrast.
   - **Neo-Brutalism (新粗犷/潮牌/Web3 风格)**: Stark 2px-4px black borders (`border-2 border-black`), hard offset shadows (`box-shadow: 4px 4px 0 #000`), saturated color pops, deliberate sharp or pill corners.
   - **Warm Editorial (人文/内容/知识库风格)**: Serif display titles, warm ivory canvas (`#FDFBF7` / `hsl(40 20% 97%)`), soft low-contrast shadows, generous whitespace, exquisite publication feel.
   - **Enterprise Clean (传统 B 端/高密度 SaaS 风格)**: High data density, clear Primary/Secondary color blocking, 4px-6px standard radii, crisp tabular numbers, zero layout shift.
   *(See [references/visual-direction-system.md](references/visual-direction-system.md) for expanded archetype formulas including Skeuomorphic tactile depth and Obsidian Cyberpunk).*

---

## 3. Frame-Perfect Motion Physics & Micro-Interactions

Treat motion as physical feedback, continuity, and hierarchy—never as aimless decoration.

### Spring Easing Physics
For primary tactile interactions, avoid generic `ease` or `linear` transitions unless the project already has a coherent motion token system. Use calibrated cubic-beziers:
- **Snappy Spring (Panels, Menus, Modals)**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Tactile Bounce (Button Press, Toggles, Switches)**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Atmospheric Transition (Theme Shift, View Transitions)**: `cubic-bezier(0.65, 0, 0.35, 1)`

### Complete Interaction States
Every user-facing interactive element touched by the work must define distinct, polished visual feedback across relevant states:
- **Resting**: Clean surface elevation and legible text.
- **Hover**: Subtle lift (`translateY(-2px)`), shimmer pass, or ambient border highlight with snappy easing. (Wrap hover styles in `@media (hover: hover)` to prevent mobile ghosting).
- **Active / Press**: Tactile compression (`scale(0.97)` or inset shadow shift) with zero delay.
- **Focus-Visible**: High-contrast, 2px-offset focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).
- **Loading / Skeleton**: Smooth GPU shimmer gradient or `animate-pulse` skeleton without layout shift.
- **Disabled**: Reduced opacity (`0.5`), `cursor: not-allowed`, no hover/active transforms.
- **Success / Error**: Semantic color pulse and clear inline message or icon state.

### CSS vs GSAP Decision Boundary
CSS transitions and `@keyframes` are sufficient for single-element hover, press, focus, and skeleton states. When the animation requires **coordinated multi-element timelines, scroll-driven pinning, text splitting, path morphing, or physics-based elastic easing**, use GSAP if the dependency already exists or the user approves adding it. Account for licensing and fallbacks; SplitText is not always available. See `references/gsap-animation-patterns.md` for ScrollTrigger, timeline orchestration, SplitText, and framework integration patterns.

---

## 4. Deliberate System Architecture & Token Blueprint

Establish CSS custom properties or framework tokens before scattering hardcoded values. Reuse existing token names when they are coherent. Organize new tokens by responsibility: **Raw scales → Semantic roles → Component overrides**.

```css
:root {
  /* Surfaces */       --surface-canvas: hsl(220 20% 98%);
  /* Text */            --text-primary: hsl(220 30% 10%);
  /* Accent */          --accent-brand: hsl(245 80% 60%);
  /* Borders */         --border-subtle: hsl(220 15% 90%);
  /* Focus */           --focus-ring: hsl(245 90% 58%);
  /* Spring Easing */   --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  /* Typography */      --font-display: 'Syne', 'Playfair Display', sans-serif;
  /* Elevation */       --shadow-md: 0 8px 24px -4px rgba(0, 0, 0, 0.08);
}
```

See [references/color-and-token-system.md](references/color-and-token-system.md) for the full token layer architecture, OKLCH perceptual color, theme contrast rules, and review checklist.

---

## 5. Modern Code Structure, A11y & Defensive Engineering

### 5.1 Code Structure & Maintainability (No Monolithic Class Dumping)
- **Class Limit**: Never dump >12 arbitrary Tailwind classes directly onto a single JSX/HTML element.
- **Variant Decoupling**: Decouple component styling using `cva` (Class Variance Authority) and `cn()` utility helpers:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        subtle: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### 5.2 Accessibility (A11y) & Real-World UX Rules
1. **Typography Size Floor**:
   - **Body text must NEVER be smaller than 14px (`text-sm`)**.
   - `text-xs` (12px) is restricted strictly to badges, tags, or secondary timestamps.
2. **Text Contrast Standard (WCAG AA)**:
   - Body copy contrast against background must be $\ge 4.5:1$.
   - Deep dark backgrounds: never use text color lighter than `text-slate-400`.
   - Light backgrounds: never use text color lighter than `text-slate-500`.
3. **Touch Targets (Hit Area)**:
   - All interactive elements (icon buttons, toggles, links) must have a physical touch area of at least **44x44px** (using `p-2`, `min-h-[44px] min-w-[44px]`, or pseudo-elements).
4. **Touch Device Hover Degradation**:
   - Wrap hover pseudo-classes in `@media (hover: hover)` or framework hover primitives to avoid sticky touch states on mobile.
5. **GPU & Glass Performance Fallback**:
   - Avoid globally stacked `backdrop-blur-*`. In low-performance or high-density views, provide a clean opaque/semi-opaque fallback (`bg-background/95`).

### 5.3 Defensive UI & Edge Case Protection
1. **Text Overflow Protection**:
   - All dynamic text (usernames, titles, API payloads) must include `truncate` or `line-clamp-*`.
   - Parent flex containers **must** include `min-w-0` to prevent flex items from bursting the layout.
2. **Mandatory Edge States**:
   Every data/card/list view must implement or provide hooks for 3 core states:
   - **Loading State**: Clean `animate-pulse` skeleton screen matching target layout.
   - **Empty State**: Centered icon/illustration + informative text + clear Action CTA button.
   - **Error State**: Localized error banner with retry trigger without breaking the surrounding layout.

---

## 6. Anti-AI-Slop Craft Review

Reject or refine the interface if any of the following cliché AI tropes are present:

- ❌ **Generic Purple-on-Dark Glow**: Adding random purple/pink radial blurs behind dark boxes without brand context.
- ❌ **Unvarying Bento Cards**: Forcing every section into identical square cards without visual hierarchy or focal tension.
- ❌ **Font Indifference**: Defaulting automatically to system Inter/Roboto without choosing an intentional display typeface.
- ❌ **Decorative Fake Content**: Inventing fake metrics, charts, testimonials, or claims to fill empty space.
- ❌ **Jittery / Rigid Motion**: Motion that lags, jumps, or uses standard linear transition curves.
- ❌ **Mobile Stacking Failure**: Desktop layout looks decorated, but mobile collapses into a plain vertical list without thoughtful touch adaptation.
- ❌ **Missing Interaction States**: Controls lack explicit `:focus-visible`, active press depth, empty states, or error handling.

---

## 7. Pre-Flight Self-Check & Quality Gates

Before outputting final code or finishing delivery, run this **5-Point Pre-Flight Check**:

1. [ ] **Product Design Decision**: Is there a clear `💡 Product Design Decision` upfront detailing user scenario, component form factor (Modal vs Drawer vs Page), and primary action hierarchy?
2. [ ] **Class Decoupling**: Are CSS classes modular and structured via CVA/variables rather than dumped >12 classes in raw markup?
3. [ ] **Legibility & Contrast**: Is body text $\ge 14\text{px}$ (`text-sm`) and contrast compliant ($\ge 4.5:1$, no faint low-contrast grays)?
4. [ ] **Defensive Containment**: Are parent flex containers protected with `min-w-0` and dynamic strings protected with `truncate`/`line-clamp` against text blowout?
5. [ ] **Touch Target Integrity**: Can mobile fingers reliably tap every interactive icon/button (hit target $\ge 44 \times 44\text{px}$)?

---

## 8. Recommended References

- Read [references/product-design-protocol.md](references/product-design-protocol.md) for the Product Design Decision Protocol, interaction pattern trees, cognitive load rules, and UX feedback loops.
- Read [references/visual-direction-system.md](references/visual-direction-system.md) for the 7 Design Archetypes, Skeuomorphism/Neumorphism formulas, and typography pairing matrix.
- Read [references/design-inspiration-and-benchmarks.md](references/design-inspiration-and-benchmarks.md) for industry benchmark products by archetype, curated font catalogs, UI ecosystem layering, and the "Squint Test" visual audit.
- Read [references/framework-adapters.md](references/framework-adapters.md) for Tailwind CSS token mapping, CVA component architecture, React/Next.js client boundaries, Vue 3 GSAP context, and Svelte 5 spring physics.
- Read [references/taste-system-v4-avant-garde.md](references/taste-system-v4-avant-garde.md) for tactile depth physics, pointer tilt, spring motion curves, and CSS 3D transforms.
- Read [references/accessibility-motion-performance.md](references/accessibility-motion-performance.md) for frame-perfect motion budgets, GPU acceleration, WCAG AA focus rings, touch targets, and reduced motion fallbacks.
- Read [references/interface-craft-checklist.md](references/interface-craft-checklist.md) for state completeness auditing, defensive UI, touch target sizing, and anti-slop verification.
- Read [references/color-and-token-system.md](references/color-and-token-system.md) for HSL semantic role architecture and dark/light mode elevation scaling.
- Read [references/compound-components-and-modern-css.md](references/compound-components-and-modern-css.md) for modern HTML5 popover, container query, and top-layer UI patterns.
- Read [references/fluid-layout-and-typography.md](references/fluid-layout-and-typography.md) for fluid type scales, intrinsic layout primitives (Stack/Switcher/Sidebar), container-aware components, and font delivery optimization.
- Read [references/form-and-trust-patterns.md](references/form-and-trust-patterns.md) for form validation timing, autofill compatibility, high-trust submission patterns, and data presentation integrity.
- Read [references/gsap-animation-patterns.md](references/gsap-animation-patterns.md) for GSAP ScrollTrigger, timeline orchestration, SplitText, elastic easing, and framework integration patterns (React/Vue/Next.js).
