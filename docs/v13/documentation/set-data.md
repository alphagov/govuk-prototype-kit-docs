---
heading: Set default data
---
>To set default data, you need to know [how to pass data from page to page](pass-data).

You can set default data in your prototype. This will appear without the user having to enter anything. 

For example, if you want to test a journey where the user returns to review or update their information.

If the user changes this data in the prototype, their new answers are saved.

## Set default data in your session file

Add default data to your `app/data/session-data-defaults.js` file.

For example, to set default data for the ‘First name’ and ‘Over 18’ inputs in the [passing data example](https://prototype-kit.service.gov.uk/docs/examples/pass-data/vehicle-registration) add:

```
module.exports = {

  'first-name': 'Amina',
  'over-18': 'yes'

}
```

## Use links to set default data

If you want to test different scenarios, you can use links to set data for each scenario.

To set data from a link, add a `?` to the `href` followed by the data you want to set:

```
<a href="/start?first-name=Amina">
```

To set more than one piece of data in a link, use an `&` between them:

```
<a href="/start?first-name=Amina&over-18=yes">
```

If the user changes this data in the prototype, their new answers will be saved.

## Use the data on the server

You can access the data on the server in a route function.

For example for an input with `name="first-name"`:

```
var firstName = req.session.data['first-name']
```


