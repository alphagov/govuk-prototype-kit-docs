---
heading: Apply filters and functions to format or change content or Create dynamic content
---

> To apply filters and functions, you need to know how to [pass data from page to page](./pass-data).

The kit stores data from all answers that users give in a prototype, so that you can use or show the answers later. np

To change the format of how these answers appear, you can apply filters and functions. For example, to change the font from lower to uppercase.

## Filters and functions
You can use filters to change how content appears on a page. For example, to change the format of a date from 28/08/2023 to 28th August 2023.

Functions perform tasks or calculate values by taking an input and returning an output, so that you caan dynamically add content to a page. They are useful if you want to include content that will change over time, like a date.

For example, if you ask the user when they taxed their vehicle, you can use their answer to show: 
- the date their vehicle tax runs out 
- how many days are left until their tax runs out

### Nunjucks filters

You can create your own filters or use existing Nunjucks filters in the kit. For example, you can use the Nunjucks `uppercase` filter to change the format of text:

```
const { addFilter } = require('govuk-prototype-kit').views

addFilter(someFilter.uppercase', function (content) {
  return content.toUpperCase()
})
```

Nunjucks will use default formatting to show content. If you want to make other changes to the HTML, you need to use `renderAsHtml`. For example, this filter makes text uppercase and bold:

```
const { addFilter } = require('govuk-prototype-kit').views

addFilter(someFilter.uppercase', function (content) {
  return '<strong>' + content + '</strong>'
}, { renderAsHtml: true })
```

### Apply multiple filters together

You can add multiple filters to a file using one require statement. For example, these 2 filters are in a `filters.js` file:

```
const { addFilter } = require('govuk-prototype-kit').views

addFilter(someFilter.uppercase', function (content) {
  return content.toUpperCase()
})

addFilter(someFilter.uppercase', function (content) {
  return '<strong>' + content + '</strong>'
}, { renderAsHtml: true })
```
Add these filters in your `govuk-prototype-kit.config.json`:

```
{
  "filters": [
    "/filters.js"
  ]
}
```
You can use these filters on each page in your prototype:

```
<p>Hello {{ "world" | someFilter.uppercase }}<p>

<p>Hello {{ "world" | someFilter.bold }}<p>
```

You can also use these filters together:
```
<p>Hello {{ "world" | someFilter.uppercase | someFilter.bold }}<p>
```