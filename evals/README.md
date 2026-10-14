# Frontend Skill Evaluation Suite

`frontend-contracts.json` is a versioned contract for evaluating the skill itself. It is intentionally scenario-based: a high-quality result in one visual style does not prove the skill will respect an existing system, handle localization, or preserve trust in a destructive flow.

Validate its structure with:

```bash
python scripts/skill_eval.py evals/frontend-contracts.json --strict
```

When an implementation exposes a new recurring failure, add a narrowly scoped scenario with observable must-pass, must-not-do, and evidence fields. Do not turn the suite into a gallery of subjective preferences.
