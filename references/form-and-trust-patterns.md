# Form And Trust Patterns

Use this reference for forms that create accounts, collect identity or payment data, change permissions, submit bookings, configure products, or perform irreversible actions. Make completion, recovery, and informed consent more important than decorative novelty.

## Contents

- Structure the task
- Label and describe fields
- Time validation helpfully
- Handle submission and recovery
- Support autofill and input tools
- Design high-trust moments
- Present data and evidence
- Review checklist
- Source basis

## Structure The Task

- Ask only for information needed at this stage of the workflow.
- Order fields by the user's task rather than the database schema.
- Prefer one column for most data-entry flows. Use side-by-side fields only when their relationship is obvious and narrow layouts remain legible.
- Use persistent visible labels. Treat placeholders as examples, not labels.
- Group related controls with `fieldset` and `legend` when the group needs a shared question or context.
- Break a long process into meaningful steps, disclose progress, preserve entered data, and allow safe back navigation.
- Add a review step before costly, irreversible, or legally meaningful submission.
- Keep primary and secondary actions visually distinct. Do not make cancellation or safe exit hard to find.

## Label And Describe Fields

- Associate every control with a programmatic label.
- Give hint and error text stable IDs. Reference all relevant IDs in `aria-describedby`, with the concise hint before the current error.
- Set `aria-invalid="true"` only after the value has been evaluated and found invalid.
- Write errors that identify the field, the problem, and the correction. Avoid only "Invalid input" or color changes.
- Keep errors adjacent to the field and add an error summary for long, multi-step, or server-validated forms.
- On failed submission, focus the summary or first invalid control according to the established application pattern, then preserve every valid value.
- Do not hide requirements until failure. Show format, limits, units, and required status before input when they are not obvious.
- Keep required and optional notation consistent across the form.

## Time Validation Helpfully

Do not turn `blur` or `submit` into a universal rule. Choose timing by consequence and interaction cost:

- Validate on submit as a reliable baseline.
- Validate on blur when a user has entered enough information for the result to be meaningful and early correction reduces later work.
- After the first failed submission, revalidate corrected fields at a helpful time so the user can see progress without resubmitting blindly.
- Avoid showing errors while the user is still typing an incomplete but plausible value.
- Validate immediately only for constraints where instant feedback is useful, such as character limits, password requirements, or availability checks; keep announcements restrained.
- Debounce remote validation, show a pending state, ignore stale responses, and never present a temporary network failure as proof that the value is invalid.
- Keep client and server validation aligned, but treat the server as authoritative.

## Handle Submission And Recovery

- Disable or guard duplicate submission without trapping the user in an indefinite disabled state.
- Show a truthful pending state while preserving the button label or action context.
- Make server errors recoverable. Explain whether data was saved, whether the action completed, and what the user can do next.
- Preserve form state across recoverable authentication, network, and validation failures.
- Use idempotency or an equivalent backend contract for payment and other duplicate-sensitive operations when the stack supports it.
- Do not show success before the authoritative response confirms it.
- Provide a safe retry path and distinguish field errors, form errors, and service outages.

## Support Autofill And Input Tools

- Add the correct `autocomplete` token to personal, address, payment, authentication, and one-time-code fields.
- Choose `type`, `inputmode`, and pattern constraints based on the data, but do not block paste.
- Preserve password-manager and browser-autofill behavior. Do not replace standard inputs solely for visual control.
- Let users reveal passwords and verify sensitive values without clearing the field.
- Support one-time-code autofill where applicable and provide an alternative when automatic delivery fails.
- Accept localized names, addresses, phone numbers, dates, and long values unless the domain has a verified narrower constraint.

## Design High-Trust Moments

- Show the exact item, amount, currency, recurring interval, fees, tax, recipient, effective date, and consequence before confirmation when applicable.
- Repeat the critical consequence in the final action label: "Pay RM 120", "Delete workspace", or "Cancel renewal" is clearer than "Continue".
- Distinguish destructive, reversible, delayed, and immediate outcomes.
- Explain security and privacy behavior factually. Do not invent encryption claims, compliance badges, urgency, scarcity, testimonials, or guarantees.
- Keep visual hierarchy restrained and predictable around payment, identity, permissions, and destructive actions.
- Use consistent components and language so users can recognize status and risk without relearning the interface.
- Offer receipts, reference IDs, audit history, or support paths only when the product actually provides them.

## Present Data And Evidence

- Label units, time ranges, currencies, sources, and update times.
- Distinguish zero from missing, delayed, estimated, and unavailable data.
- Provide exact values or an accessible table when a chart alone is insufficient.
- Do not use color as the only encoding for status or series identity.
- Avoid decorative charts, fake precision, truncated axes that exaggerate differences, or metrics invented to fill space.
- Keep dense information scannable through alignment, typography, grouping, and progressive disclosure before adding more panels.

## Review Checklist

- Can a new user understand why each field is needed?
- Are labels, hints, errors, and required status programmatically related?
- Does validation avoid interrupting plausible input while still helping recovery?
- Do autofill, password managers, paste, browser navigation, and mobile keyboards work?
- Are pending, duplicate, offline, server-error, and success states truthful?
- Are amounts, consequences, timing, and recipients explicit before a high-risk action?
- Is all trust copy supported by real product behavior?
- Can the user recover without re-entering valid data?

## Source Basis

- [Adam Silver, Form Design Patterns](https://adamsilver.io/books/form-design-patterns/)
- [W3C WAI form instructions](https://www.w3.org/WAI/tutorials/forms/instructions/)
- [W3C WAI form validation](https://www.w3.org/WAI/tutorials/forms/validation/)
- [CMS Design System form validation](https://design.cms.gov/patterns/Forms/validation/)
- [MDN `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
- [Stripe Apps design guidelines](https://docs.stripe.com/stripe-apps/design)
- [Stripe Apps style and design tokens](https://docs.stripe.com/stripe-apps/style)
