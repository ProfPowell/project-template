# Faq List

**Status:** ✅ stable

## Description

Accordion-style FAQ list using native details/summary elements

## Anatomy

- **list**: `<faq-list>` Container for FAQ items
- **question**: `<faq-question>` Question wrapper with toggle
- **answer**: `<faq-answer>` Collapsible answer content

## States

| State | Supported |
|-------|-----------|
| default | ✓ |
| expanded | ✓ |
| collapsed | ✓ |

## Accessibility

**Keyboard:**

| Key | Action |
|-----|--------|
| Enter/Space | Toggle expanded state |

## Examples

### Basic FAQ

```html
<faq-list>
  <faq-question>What is your return policy?</faq-question>
  <faq-answer>We offer 30-day returns on all items.</faq-answer>
</faq-list>
```

## Related Patterns

- [tabs](./tabs.md)
- [accordion](./accordion.md)
