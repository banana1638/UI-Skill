# design-premium-frontends

End-to-end **Product Design & Senior Frontend Engineering** skill for Antigravity.

Orchestrates the full pipeline from Discovery → Strategy → UX Architecture → Visual Direction → Design System → Production Implementation → Design Validation.

## Structure

```
scripts/          Python toolchain (render, review, patch, convergence)
tests/            Unit tests for the toolchain
evals/            Versioned scenario contracts for skill evaluation
examples/         Reference frontend implementations
  shared/         Shared utilities (motion-init.js)
references/       Design protocols and knowledge base
agents/           Agent configuration
SKILL.md          Skill definition (loaded by Antigravity)
requirements.txt  Python dependencies
```

## Setup

Install Python dependencies via MSYS2 pacman (Python 3.14):
```bash
C:\msys64\usr\bin\pacman.exe -S --noconfirm \
  mingw-w64-ucrt-x86_64-python-pydantic \
  mingw-w64-ucrt-x86_64-python-numpy \
  mingw-w64-ucrt-x86_64-python-pillow \
  mingw-w64-ucrt-x86_64-python-rich \
  mingw-w64-ucrt-x86_64-python-aiofiles
```

## Running the Design Loop

```bash
python scripts/design_loop.py examples/ai-design-studio/index.html
```

## Quality Gates

```bash
python -m unittest discover -s tests -p "test_*.py" -v
python scripts/skill_eval.py evals/frontend-contracts.json --strict
python scripts/frontend_quality_gate.py path/to/page.html --strict
python scripts/performance_budget.py artifacts/renders/<render-id>/summary.json --strict
python scripts/visual_regression.py artifacts/baseline/<render-id> artifacts/candidate/<render-id> --threshold 0.02
```

The skill treats these as evidence gates: a static pass does not replace keyboard and assistive-technology testing, a screenshot review is not a visual-regression pass, and missing measurements must be reported rather than marked as passed.
