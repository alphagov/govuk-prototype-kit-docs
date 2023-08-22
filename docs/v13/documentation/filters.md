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

Then use it on a page like this:

```
{{ data['name'] | uppercase }}
```

### Use HTML in a Nunjucks filter

If you want to use HTML in a filter, use the `renderAsHTML` option like this:

```
addFilter('bold', function (content) {
  return '<strong>' + content + '</strong>'
}, { renderAsHtml: true })
```

Then use it on a page like this:

```
{{ data['name'] | bold }}
```

You can also use these filters together:

```
{{ data['name'] | upper | bold }}
```
