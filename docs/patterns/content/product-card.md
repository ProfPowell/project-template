# Product Card

**Status:** ✅ stable

## Description

Product display card with image, title, price, and action

## Anatomy

- **image**: `<img>` Product image
- **title**: `<h3>` Product name
- **price**: `<data>` Product price
- **description** (optional): `<p>` Brief product description
- **action**: `<button>` Call-to-action button

## States

| State | Supported |
|-------|-----------|
| default | ✓ |
| hover | ✓ |
| focus | ✓ |

## Variants

### featured

**Attribute:** `data-data-featured`
**Values:** `true`

## Examples

### Basic Product Card

```html
<product-card>
  <img src="product.jpg" alt="Product Name" />
  <h3>Product Name</h3>
  <data value="29.99">$29.99</data>
  <button>Add to Cart</button>
</product-card>
```

## Related Patterns

- [card](./card.md)
- [blog-card](./blog-card.md)
