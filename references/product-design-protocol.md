# Product Design & Interaction Decision Protocol (Product Design Thinking)

This protocol elevates UI engineering into **Senior Product Design** practice. Before writing frontend components or styles, designers and engineers must reason through user context, interaction costs, information architecture, and mental models.

---

## 1. 交互组件形态选择指南（Interaction Pattern Decision Tree）

在决定使用哪种 UI 组件来承载功能时，必须严格遵守以下产品决策逻辑，拒绝盲目套用 Modal（弹窗）：

* **Modal（模态弹窗）**: 仅用于**高中断性、短流程、需强确认**的操作（如：删除确认、重命名、简单设置）。
  * *禁忌*：严禁在 Modal 中嵌套复杂多步骤表单或长列表。
* **Sheet / Drawer（侧边抽屉）**: 用于**查看/编辑主视图中某个项目的详细上下文**（如：查看订单详情、筛选面板、中等复杂度的编辑表单）。
  * *优势*：保持用户与主视图（List/Table）的空间心理连接与滚动位置。
* **Page / Sub-page（新页面/子路由）**: 用于**高专注度、长流程、多步骤**的任务（如：创建复杂项目、数据报表分析、多阶段 Checkout）。
* **Popover / Dropdown（气泡/下拉菜单）**: 用于**上下文相关的轻量操作或选单**（如：更多操作 `...`、颜色选择器、快速过滤）。
* **Inline Editing（行内/原位编辑）**: 用于**低风险、频繁修改的单字段文本**（如：点击标题直接修改）。

---

## 2. 页面信息架构与认知负荷控制（Information Architecture & Cognitive Load）

1. **希克定律（Hick's Law - 减少选择）**:
   - 页面上的 **Primary Action（主要行动点/主按钮）在视口内有且仅有一个**（采用 Primary 高对比度视觉样式）。
   - 次要操作使用 Secondary / Subtle，危险或破坏性操作使用 Destructive，其余隐蔽操作归入 `...` (More Options) 下拉菜单。
2. **渐进式呈现（Progressive Disclosure）**:
   - 不要把所有数据和选项一次性塞满屏幕。默认只展示 80% 用户最常看的核心信息（Top-level Summary），高级设置或次要字段通过“展开/更多/Accordion”折叠隐藏，按需加载。
3. **费茨法则（Fitts's Law - 触达成本）**:
   - 高频操作（如：保存、提交、搜索框）必须放在视口焦点或底部易触达区域。
   - 破坏性操作（如：清空、删除账户）必须远离高频点击区，并增加二次确认或滑动解锁屏障。

---

## 3. 生产级用户体验闭环（UX Journey & System Feedback）

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

## 4. 生成代码前的“产品设计思考小结”（Product Design Thought Process）

在输出最终 UI/组件代码前，必须先在回答开头用 2-3 句话简要输出产品设计决策思考：

> **💡 Product Design Decision**:
> 1. **场景与目标**：[简述该界面/组件解决的核心用户痛点与业务场景]
> 2. **形态决策**：[说明为什么选择该交互组件（如：为什么用 Drawer 而不用 Modal）]
> 3. **信息层级**：[明确 Primary Action 是什么，如何控制认知负荷与流转]

---

## 5. 常见交互场景决策矩阵（UX Decision Matrix）

| 业务场景 | 推荐组件形态 | 核心考量依据 | 禁忌形态 |
| :--- | :--- | :--- | :--- |
| 单项记录快速编辑 (如改名) | **Inline Editing / Popover** | 极低中断成本，上下文即时可见 | 全屏 Page、多步 Modal |
| 订单/客户详情查看与轻编辑 | **Sheet / Drawer** | 保留列表锚点，减少路由切换摩擦 | 居中 Modal（空间不足） |
| 5步以上复杂配置向导 (Wizard) | **Dedicated Sub-Page** | 专注沉浸，需清晰步骤导航与保存进度 | Modal、Drawer（空间挤压） |
| 高危删除/权限转让确认 | **Modal (Destructive)** | 强打断注意力，强制双重认知确认 | 轻量 Toast 自动消失 |
| 列表批量多选操作栏 | **Floating Sticky Action Bar** | 紧邻视觉焦点，快速批量触发 | 页面顶部死板表头 |
