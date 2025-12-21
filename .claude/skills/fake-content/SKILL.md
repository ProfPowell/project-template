---
name: fake-content
description: Generate realistic fake content for HTML prototypes. Use when populating pages with sample text, products, testimonials, or other content. NOT generic lorem ipsum.
allowed-tools: Read, Write, Edit, Bash
---

# Fake Content Skill

Generate realistic fake content using @faker-js/faker. Create contextually appropriate sample data for prototypes and development.

## Philosophy

- **Realistic over generic** - Use proper names, realistic prices, believable text
- **Contextually appropriate** - Match content to the page purpose
- **Consistent within context** - Same person name throughout a section
- **Locale-aware** - Match content to page language

## Setup

Install faker as a dev dependency:

```bash
npm install @faker-js/faker --save-dev
```

## Content Types

### Person

Generate realistic user data:

```javascript
import { faker } from '@faker-js/faker';

const person = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  jobTitle: faker.person.jobTitle(),
  avatar: faker.image.avatar(),
  bio: faker.person.bio()
};
```

**HTML Template:**

```html
<article class="team-member">
  <img src="[avatar URL]" alt="[name]"/>
  <h3>[name]</h3>
  <p class="title">[jobTitle]</p>
  <p class="bio">[bio]</p>
  <a href="mailto:[email]">[email]</a>
</article>
```

---

### Product

Generate e-commerce product data:

```javascript
import { faker } from '@faker-js/faker';

const product = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price({ min: 10, max: 500, dec: 2 }),
  category: faker.commerce.department(),
  sku: faker.string.alphanumeric(8).toUpperCase(),
  rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
  reviews: faker.number.int({ min: 10, max: 500 })
};
```

**HTML Template:**

```html
<product-card sku="[sku]">
  <img src="/assets/images/placeholder/product-400x400.svg"
       alt="[name]"/>
  <h3>[name]</h3>
  <p>[description]</p>
  <data class="price" value="[price]">$[price]</data>
  <p class="category">[category]</p>
  <p class="rating">[rating] stars ([reviews] reviews)</p>
</product-card>
```

---

### Testimonial

Generate customer testimonials:

```javascript
import { faker } from '@faker-js/faker';

const testimonial = {
  quote: faker.lorem.sentences({ min: 2, max: 4 }),
  author: faker.person.fullName(),
  company: faker.company.name(),
  role: faker.person.jobTitle(),
  avatar: faker.image.avatar()
};
```

**HTML Template:**

```html
<blockquote class="testimonial">
  <p>"[quote]"</p>
  <footer>
    <img src="[avatar]" alt="[author]"/>
    <cite>[author]</cite>
    <span class="role">[role], [company]</span>
  </footer>
</blockquote>
```

---

## Content Guidelines

### Text Length

| Content Type | Recommended Length |
|--------------|-------------------|
| Product name | 2-5 words |
| Product description | 15-30 words |
| Testimonial | 20-50 words |
| Bio | 15-25 words |
| Headline | 5-10 words |

### Realistic Proportions

```javascript
// Good: Realistic price range
faker.commerce.price({ min: 19.99, max: 299.99 })

// Good: Realistic rating
faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 })

// Good: Varying review counts
faker.number.int({ min: 5, max: 500 })
```

### Consistency

Keep related data consistent within a section:

```javascript
// Generate person once, reuse data
const author = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName()
};

// Use consistently
const fullName = `${author.firstName} ${author.lastName}`;
const email = faker.internet.email({
  firstName: author.firstName,
  lastName: author.lastName
});
```

---

## Seeding for Reproducibility

Use seeds to generate consistent data across runs:

```javascript
import { faker } from '@faker-js/faker';

// Set seed for reproducible results
faker.seed(12345);

// Same seed = same output every time
const name = faker.person.fullName(); // Always "John Smith"
```

---

## Generate Multiple Items

```javascript
import { faker } from '@faker-js/faker';

// Generate array of products
const products = faker.helpers.multiple(
  () => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription()
  }),
  { count: 10 }
);

// Generate with index
const items = faker.helpers.multiple(
  (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName()
  }),
  { count: 5 }
);
```

---

## Quick Reference

| Need | Faker Method |
|------|-------------|
| Full name | `faker.person.fullName()` |
| First name | `faker.person.firstName()` |
| Email | `faker.internet.email()` |
| Phone | `faker.phone.number()` |
| Job title | `faker.person.jobTitle()` |
| Company | `faker.company.name()` |
| Product name | `faker.commerce.productName()` |
| Price | `faker.commerce.price()` |
| Description | `faker.commerce.productDescription()` |
| Paragraph | `faker.lorem.paragraph()` |
| Sentences | `faker.lorem.sentences(3)` |
| Date | `faker.date.recent()` |
| UUID | `faker.string.uuid()` |
| Avatar URL | `faker.image.avatar()` |

---

## Checklist

When generating fake content:

- [ ] Use faker methods, not lorem ipsum
- [ ] Match content length to context
- [ ] Keep related data consistent
- [ ] Use realistic value ranges
- [ ] Consider using seed for reproducibility
- [ ] Generate appropriate count for the UI
