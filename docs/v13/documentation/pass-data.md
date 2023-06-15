---
heading: Pass data from page to page
---


The kit stores data from all answers that users give in a prototype. This lets you use or show the answers later.

To clear the data (for example at the end of a user research session) use the **Clear data** link in the footer.

[View an example of what passing data looks like in a prototype](./examples/pass-data/vehicle-registration).

To clear the data (for example at the end of a user research session) use the **Clear data** link in the footer.

> To take users from one page to another, your button must have a `form` tag. Do not add a `href` - this will turn the button into a link and means it will not submit any data.

Find out how to:
- [show data in check your answers](./make-first-prototype/show-users-answers)
- [set default data](set-data)
- [show previous answers when a user goes back to a page](pass-answers) 
- [use an answer to change the content on a page](conditional-content)

## How to use

The kit stores data from answers that users give in a prototype using the `name` attribute of the input. We can then use the `name` attribute to `call` this session data later on.

Names cannot have spaces, so use hyphens and lowercase for simplicity.

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

## Checkboxes and radios 

To identify each radio or checkbox answer (like the country name) we use the `value` tag. For a text input, the `value` is whatever the user enters in the text area.

For example, we’ve used `name: "country"` to set the list of countries:

```
{{ govukRadios({ 
name: "country"
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
items: [
{
value: "england", 
text: "England" 
}, 
```

### Checkboxes and radios using HTML
If you are using the HTML components instead of Nunjucks, you need to use the `checked` function for radios and checkboxes. For example:

```
<input class="govuk-checkboxes__input" id="waste-2" name="waste" type="checkbox" value="mines" {{ checked('waste','mines') }}>
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
