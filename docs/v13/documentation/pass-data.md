---
heading: Pass data from page to page
---


You may want to use or display data a user has entered over a few screens. The kit automatically stores all data entered, so you can show it later.

To clear the data (for example at the end of a user research session) use the **Clear data** link in the footer.

[An example of what passing data looks like in a prototype](./examples/pass-data/vehicle-registration)

## How to use

The kit stores data from inputs using the `name` attribute of the input.

For example, if you have this input:

```
{{ govukInput({
    name: 'first-name'
}) }}
```

You can show what the user entered later on like this:

```
<p>
    {{ data['first-name'] }}
</p>
```

### Showing answers in inputs

If a user goes back to a page where they entered data, they would expect to see the answer they gave.

Most inputs use the `value` option:

```
{{ govukInput({
    name: 'first-name',
    value: data['first-name']
}) }}
```

For checkboxes the option is `values`, since more than one can be selected.

### Setting default data

You can set default data in your prototype. This will appear without the user having to enter anything. For example, if you want to prototype a journey where a user previously saved their responses and returned to it later to review or update the information already in the prototype.

If the user changes this data in the prototype, their new answers will be saved.

Add default data to this file:

```
app/data/session-data-defaults.js
```

For example to set default data for the inputs for 'First name' and 'Over 18' in the examples above, you would have this in your `session-data-defaults.js` file:

```
module.exports = {

  'first-name': 'Amina',
  'over-18': 'yes'

}
```

## Advanced features

### Using the data on the server

You can access the data on the server in a route function

For example for an input with `name="first-name"`:

```
var firstName = req.session.data['first-name']
```

### Nested values

For complex data you can use nested values, for example:

```
{{ govukInput({
    name: 'claimant[first-name]'
}) }}
```

You can show what the user entered later on like this:

```
<p>
    {{ data['claimant']['first-name'] }}
</p>
```

You can set the value in an input like this:

```
{{ govukInput({
    name: 'first-name',
    value: data['claimant']['first-name']
}) }}
```

You can access the data on the server in a route function:

```
var firstName = req.session.data['claimant']['first-name']
```

### Ignoring inputs

To prevent an input being stored, use an underscore at the start of the name.

```
{{ govukInput({
    name: '_secret'
}) }}
```

To use this data you'll have to write your own route.
