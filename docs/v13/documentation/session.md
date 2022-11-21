---
heading: Store data in session
---

**Advanced topic**

When a user answers questions in your prototype, their answers are stored in session data.

To clear session data you can either:

* use the 'Clear data' link in the footer
* use incognito mode or private browsing for each user and close that window when they're done

## How to use

In a route function, refer to `req.session`.

### Accessing fields from the session

For example, when submitting the following (simplified) HTML:

```html
<input name="first-name" value="Sarah">
<input name="last-name" value="Philips">
```

You'll have a `req.session.data` object in your route function:

```js
{
    'first-name': 'Sarah',
    'last-name': 'Philips'
}
```

These 2 field values can be accessed in JavaScript as:

```js
req.session.data['first-name']
req.session.data['last-name']
```

Or in views as:

```
{{ data['first-name'] }}
{{ data['last-name'] }}
```

### Accessing nested fields from the session

Session data can also be nested for easy grouping. For example answers from multiple family members:

```html
<input name="claimant[first-name]" value="Sarah">
<input name="claimant[last-name]" value="Philips">

<input name="partner[first-name]" value="Michael">
<input name="partner[last-name]" value="Philips">
```

You'll have a nested `req.session.data` object in your route function:

```js
{
    claimant: {
        'first-name': 'Sarah',
        'last-name': 'Philips'
    },
    partner: {
        'first-name': 'Michael',
        'last-name': 'Philips'
    }
}
```

These 4 field values can be accessed in your route function as:

```js
req.session.data['claimant']['first-name']
req.session.data['claimant']['last-name']
req.session.data['partner']['first-name']
req.session.data['partner']['last-name']
```

Or in views as:

```
{{ data['claimant']['first-name'] }}
{{ data['claimant']['last-name'] }}
{{ data['partner']['first-name'] }}
{{ data['partner']['last-name'] }}
```

An [example using express-session to store page views for a user](https://github.com/expressjs/session#example)

Read more about the [Express Session](https://github.com/expressjs/session)
