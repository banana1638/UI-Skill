# design-premium-frontends

End-to-end **Product Design & Senior Frontend Engineering** skill for Antigravity.

Orchestrates the full pipeline from Discovery → Strategy → UX Architecture → Visual Direction → Design System → Production Implementation → Design Validation.

## Structure

```
scripts/          Python toolchain (render, review, patch, convergence)
tests/            Unit tests for the toolchain
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
python scripts/design_loop.py --target examples/ai-design-studio/index.html
```
