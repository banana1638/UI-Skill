# Frontend Design Quality, Visual Feedback Loop & Entropy Toolchain

本工具链为 AI Frontend Design 构建了**静态规则检查 + Playwright 视觉感知渲染 + 多模态审美评审 + 闭环自修正 + 多样性熵值仪表盘**的一体化系统。

---

## 架构组成

```
scripts/
├── check-motion-safety.js   # [第1层] 静态规则与动画无障碍 Linter (毫秒级)
├── render_pipeline.py       # [第2层] Playwright 真实渲染与计算样式/DOM提取 (秒级)
├── vision_reviewer.py       # [第3层] 多模态视觉审美与交互设计评审器 (分钟级)
├── design_loop.py           # [闭环控制器] 生成 → 渲染 → 评审 → 修正闭环 + 熔断保护
└── convergence_test.py      # [健康度仪表盘] 跨场景色相散布与信息熵测试
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
