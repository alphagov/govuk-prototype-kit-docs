---
heading: Show previous answers when a user goes back to a page
---

>To show previous answers when a user goes back to a page, you need to know [how to pass data from page to page](pass-data).

If a user goes back to a page where they entered data, they would expect to see the answer they gave.

## Show answers in inputs

Most inputs use the `value` option:

```
{{ govukInput({
    name: 'first-name',
    value: data['first-name']
}) }}
```

For checkboxes the option is `values`, since more than one can be selected.

## Ignore inputs

To prevent an input being stored, use an underscore at the start of the name.

```
{{ govukInput({
    name: '_secret'
}) }}
```

To use this data you'll have to [write your own route](create-routes).