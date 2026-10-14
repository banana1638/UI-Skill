# Interaction Craft & Accessibility Architecture

A single source of truth for accessible, resilient, and intuitive interaction engineering in modern Vanilla HTML and CSS.

---

## 1. Accessibility Floor (WCAG 2.2 AA / AAA Principles)

Never compromise on foundational ergonomics:

1. **Touch Targets**: All interactive controls (`<button>`, `<a>`, `<input>`, `<select>`, custom controls) must have an active target area of at least **44 × 44px** on touch viewports. Use CSS padding or `min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center;`.
2. **Color Contrast**:
   - Regular body copy: $\ge 4.5:1$ against surface.
   - Large text ($\ge 18\text{pt}$ or bold $\ge 14\text{pt}$): $\ge 3:1$.
   - Interactive boundaries and focus indicators: $\ge 3:1$.
   - Never use color alone to convey state or error.
3. **Keyboard Navigation & Visible Focus**:
   - Every interactive control must be focusable via `Tab` in a logical sequential order.
   - Never suppress outline without providing a high-contrast replacement:
     ```css
     :focus-visible {
       outline: 2px solid var(--intent-accent);
       outline-offset: 2px;
     }
     ```
4. **Form Labels & ARIA**:
   - Every `<input>` must have an associated `<label for="...">`.
   - Dynamic status updates (e.g. search count, live error message) must use `aria-live="polite"` or `role="status"`.
   - Modals and drawers must trap focus, lock background scroll, and close on `Escape`.

---

## 2. Modern Native HTML & CSS Primitives

Prioritize native platform capabilities over bloated JavaScript libraries:

### The Native Popover API
```html
<button popovertarget="filter-menu" class="btn-secondary">Filters</button>
<div id="filter-menu" popover class="popover-surface">
  <p>Filter criteria here...</p>
</div>
```
```css
[popover] {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-4);
  background: var(--surface-elevated);
}
[popover]::backdrop {
  background: rgba(0, 0, 0, 0.2);
}
```

### Native `<dialog>` for Accessible Modals
```html
<dialog id="confirm-modal" class="modal-dialog">
  <form method="dialog">
    <h3>Confirm Action</h3>
    <p>Are you sure you want to proceed?</p>
    <div class="modal-actions">
      <button value="cancel" class="btn-ghost">Cancel</button>
      <button value="confirm" class="btn-danger">Delete</button>
    </div>
  </form>
</dialog>
```
*Note: Open with `dialog.showModal()` for built-in backdrop, focus trapping, and `Escape` key handling.*

### Modern Native Form Validation (`:user-invalid`)
Avoid validating inputs before the user has finished typing. Use the native `:user-invalid` pseudo-class:
```css
input:user-invalid {
  border-color: var(--intent-danger);
  background-color: hsl(350 100% 98%);
}
input:user-valid:not(:placeholder-shown) {
  border-color: var(--intent-success);
}
```

---

## 3. The 5 Core UI States (Defensive State Coverage)

Every data-bearing component must gracefully handle and render all 5 fundamental states:

1. **Ideal State**: Complete data rendered with crisp visual hierarchy.
2. **Loading State**: Content-shaped shimmer skeletons matching exact dimensions of upcoming content (avoid generic full-page spinners).
3. **Empty State**: Friendly visual indicator, clear explanation of why it is empty, and a primary call-to-action to create or populate data.
4. **Error State**: Non-technical explanation, actionable recovery button (e.g. "Retry Connection"), and state preservation of user inputs.
5. **Partial / Constrained State**: Extreme text strings (30+ characters), missing avatars, null fields with sensible fallbacks (`—`).

---

## 4. Trust Patterns & Form Ergonomics

1. **Non-Destructive Actions**: Place high-consequence buttons (e.g. "Delete Project") far from routine actions, require a typed phrase or two-step confirmation, and provide an undo toast window when possible.
2. **Optimistic Updates with Rollback**: When a user toggles a status, reflect the state change immediately in the UI; if the network call fails, revert the toggle and surface an inline error toast.
3. **Smart Autocomplete**: Always include standard `autocomplete` attributes (`email`, `current-password`, `tel`, `address-line1`) on form fields to respect user preferences and assistive tools.
4. **Numeric Steppers & Masking**: Display formatted currency or phone numbers on blur while preserving raw numeric values in underlying form state.
