---
heading: Pass data from page to page
---


The kit stores data from all answers that users give in a prototype. This lets you use or show the answers later.

To clear the data (for example at the end of a user research session) use the **Clear data** link in the footer.

[View an example of what passing data looks like in a prototype](./examples/pass-data/vehicle-registration).

## How to use

The kit stores data from answers that users give in a prototype using the `name` attribute of the input.

For example, when a user enters their first name you could have this input:

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

Answers from checkboxes will appear with commas, like 'a,b,c'. To show them as a list, use a for loop:
```
<ul>
{% for country in data['countries'] %}
  <li>{{ country }}</li>
{% endfor %}
</ul>
```

### Show answers in inputs

If a user goes back to a page where they entered data, they would expect to see the answer they gave.

Most inputs use the `value` option:

```
{{ govukInput({
    name: 'first-name',
    value: data['first-name']
}) }}
```

For checkboxes the option is `values`, since more than one can be selected.

### Show content if users have not answered optional questions

You can show content if data is currently blank using `or`, for example:

```
{{ data['first-name'] or "First name not given" }}
```

You can also use this in a component. For example to show that a user has not answered an optional question on Check your answers:

```
{{ govukSummaryList({
  rows: [
    {
      key: {
        text: "First name"
      },
      value: {
        text: data['first-name'] or "First name not given"
      }
    }
  ]
})}}
```


### Set default data

You can set default data in your prototype. This will appear without the user having to enter anything. 

For example, if you want to test a journey where the user returns to review or update their information.

If the user changes this data in the prototype, their new answers are saved.

Add default data to your `app/data/session-data-defaults.js` file.

For example, to set default data for the ‘First name’ and ‘Over 18’ inputs in the [passing data example](https://prototype-kit.service.gov.uk/docs/examples/pass-data/vehicle-registration) add:

```
module.exports = {

  'first-name': 'Amina',
  'over-18': 'yes'

}
```

### Use links to set data

You can use links to set data. If you want to test different scenarios, you can have links to set data for each scenario.

To set data from a link, add a `?` to the `href` followed by the data you want to set:

```
<a href="/start?first-name=Amina">
```

To clear data from a link, as above without the equals sign and the value:

```
<a href="/start?first-name">
```

To set more than one piece of data in a link, use an `&` between them:

```
<a href="/start?first-name=Amina&over-18=yes">
```

To clear more than one piece of data in a link, as above without the equals sign and the value:

```
<a href="/start?first-name&over-18">
```

If the user changes this data in the prototype, their new answers will be saved.

## Advanced features

### Checkboxes and radios using HTML

If you are using the HTML components instead of Nunjucks, you need to use the `checked` function for radios and checkboxes. For example:

```
<input class="govuk-checkboxes__input" id="waste-2" name="waste" type="checkbox" value="mines" {{ checked('waste','mines') }}>
```

### Use the data on the server

You can access the data on the server in a route function.

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

### Ignore inputs

To prevent an input being stored, use an underscore at the start of the name.

```
{{ govukInput({
    name: '_secret'
}) }}
```

To use this data you'll have to [write your own route](create-routes).
