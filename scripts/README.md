# Frontend Design Quality, Visual Feedback Loop & Entropy Toolchain

本工具链为 AI Frontend Design 构建了**静态规则检查 + Playwright 视觉感知渲染 + 多模态审美评审 + 闭环自修正 + 多样性熵值仪表盘**的一体化系统。

---

## 架构组成

```
scripts/
├── check-motion-safety.js   # [第1层] 静态规则与动画无障碍 Linter (毫秒级)
├── render_pipeline.py       # [第2层] Playwright 并发渲染与计算样式/DOM提取 (秒级)
├── vision_reviewer.py       # [第3层] 多模态视觉审美与交互设计评审器 (带自纠错重试与溯源)
├── patch_generator.py       # [第4层] 补丁合成器 (结构完整性防御 + diff 生成与写入)
├── design_loop.py           # [闭环控制器] 生成 → 渲染 → 评审 → 修正真闭环 + 熔断保护
└── convergence_test.py      # [健康度仪表盘] 跨场景色相散布与信息熵测试
├── frontend_quality_gate.py # [语义门禁] 静态 HTML、标签、图片、输入和弹窗契约检查
├── visual_regression.py     # [视觉回归] 命名 PNG 基线与候选图的像素差异比较
├── performance_budget.py    # [性能门禁] 资源传输和 Web Vitals 预算评估
└── skill_eval.py            # [技能评估] 固定场景合同校验器
tests/
├── test_color_utils.py      # 色彩转换与解析纯函数单测 (P5)
├── test_patch_generator.py  # 补丁生成与防御校验单测 (P1)
└── test_vision_reviewer.py  # 评审源溯源与 JSON 提取单测 (P2/P3)
```

---

## 运行自动化测试套件

无需外部三方库即可在标准 Python 环境下快速运行全量单测：
```bash
python -m unittest discover -s tests -p "test_*.py" -v
```

---

## 环境准备

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 安装 Playwright 浏览器二进制
playwright install chromium
```

> **注**：`vision_reviewer.py` 支持在未配置 API Key 时自动启用智能离线 Mock 评审引擎；若配置了 `ANTHROPIC_API_KEY` 或 `OPENAI_API_KEY`，则自动调用 Claude 3.5 Sonnet / GPT-4o 进行视觉评审。

---

## 常用命令与工作流

### 1. 静态安全检查 (Static Rule Gate)
```bash
node scripts/check-motion-safety.js
```

### 2. 渲染目标页面并提取视觉指标 (Render & Extract)
```bash
python scripts/render_pipeline.py examples/saas-console-obsidian/index.html
```

### 3. 多模态视觉评审 (Vision Review)
```bash
python scripts/vision_reviewer.py artifacts/renders/render_1770989000/summary.json
```

### 4. 运行“感知-修正”闭环 (Perception-Fix Loop)
```bash
python scripts/design_loop.py examples/landing-page-editorial/index.html --max-iter 3 --target-score 8.5
```

### 5. 运行多样性与色相熵值仪表盘 (Diversity & Entropy Dashboard)
```bash
python scripts/convergence_test.py
```
执行后将生成终端彩色报告以及可视化的 `artifacts/convergence/convergence_dashboard.html`。

### 6. 运行静态无障碍与交互契约检查
```bash
python scripts/frontend_quality_gate.py examples/landing-page-editorial/index.html --strict
```

此检查验证基础语义（语言、图片替代文本、输入标签、按钮名称、弹窗名称）。它不替代真实浏览器的键盘路径、屏幕阅读器或触摸测试。

### 7. 创建和比较视觉基线
```bash
python scripts/render_pipeline.py examples/landing-page-editorial/index.html --output artifacts/baseline
python scripts/render_pipeline.py examples/landing-page-editorial/index.html --output artifacts/candidate
python scripts/visual_regression.py artifacts/baseline/<render-id> artifacts/candidate/<render-id> --threshold 0.02
```

基线与候选必须使用相同浏览器、字体、视口、比例和确定性数据。阈值通过不代表无需人工审阅。

### 8. 审核性能预算
```bash
python scripts/performance_budget.py artifacts/renders/<render-id>/summary.json --strict
```

渲染摘要现在记录资源传输、LCP、CLS 和 INP（浏览器支持时）。项目有自己的预算时，使用 `--budget path/to/budget.json` 覆盖默认值。

### 9. 验证 Skill 场景合同
```bash
python scripts/skill_eval.py evals/frontend-contracts.json --strict
```

该命令检查场景的结构和覆盖范围；它不是 agent 行为的替代测试。实际评估时应逐项执行场景，并保存对应证据。
