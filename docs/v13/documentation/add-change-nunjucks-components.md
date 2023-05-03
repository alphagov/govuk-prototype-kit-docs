---
heading: Add or change Nunjucks components
title: Add or change Nunjucks components
---
You can use 2 coding languages in your prototype with the [GOV.UK Design System](https://design-system.service.gov.uk/), Nunjucks or HTML.

HTML is the language used to create web pages. Nunjucks is another language we can run in the Prototype Kit, to make HTML for us. 

A small amount of Nunjucks code can create much longer, more complex HTML. It saves time with reusable, accessible components. For example, forms, navigation and tables.

Using Nunjucks makes it easier to manage your code and make changes to it in the future. It also helps to make services consistent with GOV.UK.

## Add a component

Find the component that you want to use on the [GOV.UK Design System](https://design-system.service.gov.uk/). There are different examples for each component, depending on the context. For example, if there is one question on a page or multiple. 

Choose the example that's most suitable, then select the Nunjucks tab and copy the code into your code editor. 

## Change a component

Each component has options that allow you to change how it looks or behaves. To view the options for a component:

1. Find the component in the Design System.
2. Select the **Nunjucks** tab.
3. Select **Nunjucks macro options**.

For example, you can use the `text` option to change the text on a [button](https://design-system.service.gov.uk/components/button/):
```
{{ govukButton({
    text: "Example button text"
}) }}
```

To add another option, you need to add a comma at the end of the previous option. 

In this example, we've changed the button to a secondary grey button:

```
{{ govukButton({
  text: "Find address",
  classes: "govuk-button--secondary"
}) }}
```

## Delete parts of a component

Some components like radios and tables have multiple `items` or `rows`. You can add or remove these to fit your design.

For example, this is the radios component:

```
{% from "govuk/components/radios/macro.njk" import govukRadios %}

{{ govukRadios({
  name: "where-do-you-live",
  fieldset: {
    legend: {
      text: "Where do you live?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  items: [
    {
      value: "england",
      text: "England"
    },
    {
      value: "scotland",
      text: "Scotland"
    },
    {
      value: "wales",
      text: "Wales"
    },
    {
      value: "northern-ireland",
      text: "Northern Ireland"
    }
  ]
}) }}
```

To remove the last radio ‘Northern Ireland’, delete this `item` including the comma before:

 ```
 ,
 {
     value: "northern-ireland",
     text: "Northern Ireland"
 }
```
You can add another country as a radio button, like Spain. Add this `item` including the comma:
```
 ,
 {
     value: "spain",
     text: "Spain"
 }
```
It is important that you do not change or delete the closing brackets:
```
 ]
}) }}
```
