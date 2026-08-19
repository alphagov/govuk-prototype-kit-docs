---
heading: Let the user change their answers
caption: Build a basic prototype
---
Next to each question on the Check answers page there’s a **Change** link, so that users can add or change the information. 

## Make the ‘Change’ links work

Make the **Change** links on the ‘Check answers’ page work by adding the right links.

1. Find `visuallyHiddenText: "number of balls you can juggle"`
2. Change the `href` above it from `#` to `/juggling-balls`
3. Find `visuallyHiddenText: "your most impressive juggling trick"`
4. Change the `href` above it from `#` to `/juggling-trick`

If you select a **Change** link, you’ll go back to the right question page, but your answer will not appear yet.

## Show the user’s answer in question 1

The GOV.UK radios component has a `value` option to set which ones are selected when the page loads. (The same option for checkboxes  is called `values` as checkboxes can have more than one selection.)

Open the `juggling-balls.html` file in your `app/views` folder.

In the `govukRadios` component, add a `value` line, like this:

{% raw %}
```
{{ govukRadios({
  name: "how-many-balls",
  value: data['how-many-balls'],
  fieldset: {
  ...
```
{% endraw %}

Go to <a href="http://localhost:3000/juggling-balls" target="_blank">http://localhost:3000/juggling-balls (opens in a new tab)</a> and check the journey works by selecting an answer, continuing to the next page, then going back.

## Show the user’s answer in question 2

Text inputs and textareas also have a `value` option to set what text appears in them when the page loads.

Open the `juggling-trick.html` file in your `app/views` folder.

Add `value: data['most-impressive-trick']` like this:

{% raw %}
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
{% endraw %}

Go to <a href="http://localhost:3000/juggling-trick" target="_blank">http://localhost:3000/juggling-trick (opens in a new tab)</a> and check it works by filling in an answer, continuing to the next page, going back, then refreshing your browser.

{% from "govuk/components/pagination/macro.njk" import govukPagination %}
{{ govukPagination({
  next: {
    labelText: "Show different pages depending on user input",
    href: "branching"
  }
}) }}

