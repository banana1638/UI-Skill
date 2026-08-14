# Compound Components And Modern CSS

Use this reference for interactive widgets with coordinated state, overlays, keyboard behavior, or component-level responsiveness. Treat Radix Primitives as an implementation study, not a requirement. Preserve the project's framework, dependency policy, and component system.

## Contents

- Decision order
- Interaction contract
- Overlay patterns
- Composite widgets
- Native modern CSS
- Progressive enhancement
- Review checklist
- Source basis

## Decision Order

Choose the lowest-complexity option that satisfies the behavior:

1. Use the correct native HTML element when it already provides the semantics and behavior: `button`, `details`, `select`, or `dialog`.
2. Reuse an accessible primitive already installed and established in the project.
3. Add a mature primitive library only when the user authorizes the dependency and its cost fits the product.
4. Build a custom APG-aligned widget only when the visual or behavioral requirement cannot be met otherwise.

Do not copy a Radix DOM tree or ARIA attributes mechanically. Its value is the behavior contract: correct roles, keyboard interaction, focus management, dismissal, positioning, and controlled or uncontrolled state.

## Interaction Contract

Define the complete state model before styling a compound widget:

- Name its closed, opening, open, closing, disabled, loading, empty, and error states where relevant.
- Identify the trigger, label, description, content, active item, selected value, and owning form.
- Specify keyboard behavior, pointer behavior, outside interaction, Escape behavior, and focus destination after dismissal.
- Preserve focus when content rerenders. Do not send focus to `body` or an arbitrary first element.
- Keep a visible focus indicator and a logical tab sequence.
- Support typeahead, orientation, Home and End, arrow keys, RTL, and selection semantics when the adopted APG pattern requires them.
- Separate focus, active, selected, checked, expanded, and disabled states. They are not interchangeable.
- Test nested layers, portals, scroll locking, collision with viewport edges, zoom, mobile keyboards, and coarse pointers.

Expose controlled and uncontrolled APIs only when both are genuinely useful. Keep the source of truth singular and make state changes observable through explicit callbacks.

## Overlay Patterns

### Modal dialog

- Use `<dialog>` or a proven dialog primitive for modal work.
- Move focus into the dialog on open, contain the modal interaction, and restore focus to the invoking control on close unless the workflow has a more logical destination.
- Give the dialog an accessible name and, when useful, a concise description.
- Support Escape unless dismissing would cause data loss or violate a critical flow. If dismissal is blocked, explain why.
- Keep destructive confirmation focused on the consequence and action, not generic wording such as "Are you sure?"

### Non-modal popover

- Prefer the HTML Popover API for lightweight non-modal top-layer UI when the support target and behavior fit.
- Use `popovertarget` for declarative trigger relationships where practical.
- Do not use a popover as a substitute for a modal dialog.
- Confirm focus order, focus return, light-dismiss behavior, nested popovers, and anchor positioning across the supported browsers.

### Tooltip

- Keep tooltips supplemental; never hide required instructions or essential actions inside them.
- Open them from keyboard focus as well as pointer hover and allow the pointer to reach the tooltip without dismissal when it contains meaningful content.
- Do not make a tooltip interactive. Use a non-modal popover when the surface contains controls.

## Composite Widgets

- Use a menu for application commands, not ordinary site navigation or a replacement for every select field.
- Distinguish listbox selection from menu actions and combobox input. Follow the matching APG pattern rather than mixing their keyboard models.
- For accordions, use semantic headings and buttons, expose expanded state, and keep panel relationships explicit.
- For tabs, keep tab order and selected state synchronized. Arrow navigation should not unexpectedly submit forms or scroll the page.
- For command palettes, provide a real label, predictable search, empty results, loading, keyboard selection, and a clear close path.
- Announce meaningful asynchronous result changes without making every keystroke noisy to assistive technology.

## Native Modern CSS

Prefer platform capabilities when they simplify code without weakening browser support:

- Use container queries when a reusable component should respond to its allocated space rather than the viewport.
- Use `subgrid` when nested content must share the parent grid's tracks and alignment.
- Use a tightly scoped `:has()` selector for parent or previous-sibling styling. Avoid broad anchors such as `body`, `:root`, or `*` on frequently changing trees.
- Use the Popover API for suitable non-modal top-layer UI and `<dialog>` for modal UI.
- Use `@starting-style` with CSS transitions for entry transitions on newly rendered or top-layer elements. Keep the interface usable without the transition.

CSS can express presentation and some state-dependent styling. It cannot replace the correct HTML semantics, accessible name, keyboard model, or application state.

## Progressive Enhancement

- Check the project's browser support policy before adopting a new platform feature.
- Provide a functional base layout before container-query, `:has()`, top-layer, or entry-transition enhancements.
- Use `@supports` when the fallback needs an explicit branch.
- Avoid shipping a JavaScript polyfill when a simpler CSS fallback preserves the task.
- Feature-detect behavior rather than parsing user-agent strings.
- Test real browser behavior; compilation does not verify focus, top-layer stacking, virtual keyboards, or screen-reader output.

## Review Checklist

- Does the chosen pattern match the user's mental model and APG semantics?
- Can it be opened, operated, and dismissed with keyboard alone?
- Does Escape close the correct layer and return focus appropriately?
- Are focus, selection, checked, active, and expanded states distinct and visible?
- Do nested overlays and outside interactions behave deterministically?
- Does the layout adapt to its container without brittle viewport assumptions?
- Is every modern CSS feature an enhancement over a usable baseline?
- Was a new dependency avoided or explicitly justified?

## Source Basis

- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Radix Primitives introduction](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- [Radix Popover](https://www.radix-ui.com/primitives/docs/components/popover)
- [Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
- [MDN Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
- [MDN subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)
- [MDN `:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has)
- [MDN `@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)
