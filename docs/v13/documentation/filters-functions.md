---
heading: Use filters to change how answers appear
---

> To use filters, you need to know how to [pass data from page to page](./pass-data).

The kit stores data from all answers that users give in a prototype, so that you can use or show the answers later. To change the format of how these answers appear, you can apply filters. 

You can create your own filters or [use existing Nunjucks filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters) in the kit. For example, you can use the Nunjucks `upper` filter to change the format of text to upper case:

```
{{ data['name'] | upper }}
```


### Create a Nunjucks filter

Add your own filters to the `app/filters.js` file. Filters are written in JavaScript.

```
const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('uppercase', function (content) {
  return content.toUpperCase()
})
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

You can use these filters on each page in your prototype:

```
<p>Hello {{ "world" | someFilter.uppercase }}<p>

<p>Hello {{ "world" | someFilter.bold }}<p>
```

You can also use these filters together:
```
<p>Hello {{ "world" | someFilter.uppercase | someFilter.bold }}<p>
```