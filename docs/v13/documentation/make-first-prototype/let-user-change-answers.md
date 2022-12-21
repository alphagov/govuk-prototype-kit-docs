---
heading: Let the user change their answers
caption: Build a basic prototype
---

## Make the ‘Change’ links work

Make the **Change** links on the ‘Check answers’ page work by adding the right links.

1. In the `<a>` tag under `{{ data['how-many-balls'] }}`, change the href attribute from `#` to `/juggling-balls`
2. In the `<a>` tag under `{{ data['most-impressive-trick'] }}`, change the href attribute from `#` to `/juggling-trick`

If you select a **Change** link, you’ll go back to the right question page, but your answer will not appear yet.

## Show the user’s answer in question 1

The GOV.UK radios component has a `value` option to set which ones are selected when the page loads. (The same option for checkboxes  is called `values` as checkboxes can have more than one selection.)

Open the `juggling-balls.html` file in your `app/views` folder.

In the `govukRadios` component, add a `value` line, like this:

```
{{ govukRadios({
  name: "how-many-balls",
  value: data['how-many-balls'],
  fieldset: {
  ...
```

[Go to http://localhost:3000/juggling-balls](http://localhost:3000/juggling-balls) and check the journey works by selecting an answer, continuing to the next page, then going back.

## Show the user’s answer in question 2

Text inputs and textareas also have a `value` option to set what text appears in them when the page loads.

Open the `juggling-trick.html` file in your `app/views` folder.

Add `value: data['most-impressive-trick']` like this:

```
{{ govukTextarea({
    name: "most-impressive-trick",
    id: "most-impressive-trick",
    label: {
        text: "What is your most impressive juggling trick?",
        classes: "govuk-label--l",
        isPageHeading: true
    },
    value: data['most-impressive-trick']
}) }}
```

[Go to http://localhost:3000/juggling-trick](http://localhost:3000/juggling-trick) and check it works by filling in an answer, continuing to the next page, going back, then refreshing your browser.

[Next (Show different pages depending on user input)](branching)
