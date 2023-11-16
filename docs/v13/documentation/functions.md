---
heading: Use a function to change how an answer appears
---

> To use functions, you need to know how to [pass data from page to page](./pass-data).

The kit stores data from all answers that users give in a prototype, so that you can use or show the answers later. To change the format of how these answers appear, you can use a function. 

You can create a function to process your data.  For example, this function will return the last "count" characters as follows:

```
{{ lastCharacters(data['phone-number'], 4) }}
```

### Create a Nunjucks function

Add your own functions to the `app/functions.js` file. Functions are written in JavaScript.

```
const govukPrototypeKit = require('govuk-prototype-kit')
const addFunction = govukPrototypeKit.views.addFunction

addFunction('lastCharacters', function (text, count) {
  return text.substring(text.length - count)
})
```

Then use it on a page like this:

```
<p>
   The last 4 numbers in your telephone number are {{ lastCharacters(data['phone-number'], 4) }}
</p>
```

### Use HTML in a Nunjucks function

If you want to use HTML in a function, use the `renderAsHTML` option like this:

```
addFunction('lastCharactersBold', function (text, count) {
  return '<strong>' + text.substring(text.length - count) + '</strong>'
}, { renderAsHtml: true })
```

Then use it on a page like this:

```
<p>
   The last 4 numbers in your telephone number are {{ lastCharactersBold(data['phone-number'], 4) }}
</p>
```
