---
name: accessibility-checker
description: Ensure WCAG2AA accessibility compliance. Use when creating forms, adding images, building navigation, creating interactive elements, or any user-facing HTML content.
allowed-tools: Read, Write, Edit
---

# Accessibility Checker Skill

This skill ensures all HTML content meets WCAG2AA accessibility standards.

## Quick Reference

| Element | Requirement |
|---------|-------------|
| Images | Must have `alt` attribute |
| Form inputs | Must have associated `<label>` |
| Links | Must have descriptive text (not "click here") |
| Navigation | Use `<nav>` with `aria-label` |
| Main content | Use `<main>` with `id` for skip link |
| Headings | Follow hierarchy (h1 → h2 → h3) |
| Tables | Use `<th scope="col/row">` |

## Forms (MUST follow)

Every input MUST have a label:

```html
<!-- Method 1: for/id association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email"/>

<!-- Method 2: wrapping -->
<label>
  Email Address
  <input type="email" name="email"/>
</label>
```

Use fieldset for related inputs:

```html
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input type="text" id="street" name="street"/>
  <label for="city">City</label>
  <input type="text" id="city" name="city"/>
</fieldset>
```

## Images (MUST follow)

All images MUST have alt text:

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased 20% in Q4"/>

<!-- Decorative image (empty alt) -->
<img src="decoration.png" alt=""/>

<!-- Complex image (use figure) -->
<figure>
  <img src="diagram.png" alt="System architecture diagram"/>
  <figcaption>Figure 1: Three-tier architecture with load balancer</figcaption>
</figure>
```

## Navigation (MUST follow)

Provide skip links and landmarks:

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <main id="main">
    <!-- Content -->
  </main>
</body>
```

## Links (MUST follow)

Links need descriptive, unique text:

```html
<!-- Bad -->
<a href="/products">Click here</a>
<a href="/docs">Read more</a>

<!-- Good -->
<a href="/products">View all products</a>
<a href="/docs">Read the documentation</a>
```

## Headings

Follow logical hierarchy:

```html
<h1>Page Title</h1>
  <h2>Section One</h2>
    <h3>Subsection</h3>
  <h2>Section Two</h2>
```

Never skip levels (h1 → h3 is wrong).

See [FORMS.md](FORMS.md), [IMAGES.md](IMAGES.md), [NAVIGATION.md](NAVIGATION.md) for details.
