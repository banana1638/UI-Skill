# Frontend Design Quality Toolchain

本工具链提供**静态规则检查 + Playwright 视觉渲染 + 多模态审美评审 + 闭环修正**能力。

---

## 架构组成

```
scripts/
├── check-motion-safety.js   # [第1层] 静态规则与动画无障碍 Linter (毫秒级)
├── render_pipeline.py       # [第2层] Playwright 并发渲染与计算样式/DOM提取 (秒级)
├── vision_reviewer.py       # [第3层] 多模态视觉审美与交互设计评审器 (带自纠错重试与溯源)
├── patch_generator.py       # [第4层] 补丁合成器 (结构完整性防御 + diff 生成与写入)
├── design_loop.py           # [闭环控制器] 生成 → 渲染 → 评审 → 修正真闭环 + 熔断保护
├── frontend_quality_gate.py # [语义门禁] 静态 HTML、标签、图片、输入和弹窗契约检查
├── visual_regression.py     # [视觉回归] 命名 PNG 基线与候选图的像素差异比较
├── performance_budget.py    # [性能门禁] 资源传输和 Web Vitals 预算评估
└── skill_eval.py            # [技能评估] 固定场景合同校验器
```

---

## 常用命令与工作流

### 1. 静态安全检查 (Static Rule Gate)
```bash
node scripts/check-motion-safety.js <target-html-or-css>
```

### 2. 渲染目标页面并提取视觉指标 (Render & Extract)
```bash
python scripts/render_pipeline.py <path-to-index.html>
```

### 3. 多模态视觉评审 (Vision Review)
```bash
python scripts/vision_reviewer.py <path-to-summary.json> --provider mock|openai|anthropic
```

> **注**：`vision_reviewer.py` 支持在未配置 API Key 时自动启用智能离线 Mock 评审引擎；若配置了 `ANTHROPIC_API_KEY` 或 `OPENAI_API_KEY`，则自动调用 Claude 3.5 Sonnet / GPT-4o 进行视觉评审。

### 4. 运行"感知-修正"闭环 (Perception-Fix Loop)
```bash
python scripts/design_loop.py <path-to-index.html> --max-iter 3 --target-score 8.5
```

### 5. 运行静态无障碍与交互契约检查
```bash
python scripts/frontend_quality_gate.py <path-to-index.html> --strict
```

此检查验证基础语义（语言、图片替代文本、输入标签、按钮名称、弹窗名称）。它不替代真实浏览器的键盘路径、屏幕阅读器或触摸测试。

### 6. 创建和比较视觉基线
```bash
python scripts/render_pipeline.py <path-to-index.html> --output artifacts/baseline
python scripts/render_pipeline.py <path-to-index.html> --output artifacts/candidate
python scripts/visual_regression.py artifacts/baseline/<render-id> artifacts/candidate/<render-id> --threshold 0.02
```

基线与候选必须使用相同浏览器、字体、视口、比例和确定性数据。阈值通过不代表无需人工审阅。

### 7. 审核性能预算
```bash
python scripts/performance_budget.py <path-to-summary.json> --strict
```

渲染摘要现在记录资源传输、LCP、CLS 和 INP（浏览器支持时）。项目有自己的预算时，使用 `--budget path/to/budget.json` 覆盖默认值。
