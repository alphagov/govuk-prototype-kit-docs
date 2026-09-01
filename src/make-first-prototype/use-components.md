---
layout: tutorials_guides_template.html
heading: Use components from the Design System
caption: Build a basic prototype
next: /make-first-prototype/use-components-2/
redirects:
  - /docs/make-first-prototype/use-components
  - /docs/make-first-prototype/add-questions
---

{% raw %}

You can copy example code from the GOV.UK Design System to add page elements like radios and text inputs - we call these ‘components’.

## HTML and Nunjucks

HTML is the language used to create web pages.

Nunjucks is another language we can run in the Prototype Kit, to make HTML for us. Short, simple Nunjucks code can create much longer, more complex HTML.

In the Design System, components have both Nunjucks and HTML example code. Either will work in the Prototype Kit.

## Add radios to question 1

1. Go to the <a href="https://design-system.service.gov.uk/components/radios/" target="_blank">radios component in the Design System (opens in a new tab)</a>.

2. Select the **Nunjucks** tab under the first example, then **Copy code**.

3. Open `juggling-balls.html` in your `app/views` folder.

4. Replace this paragraph with the code you copied:

```
<p>
  [Insert question content here - see the
  <a href="https://design-system.service.gov.uk">GOV.UK Design System</a>
  for examples]
</p>
```
5. The example code comes with a heading that is connected to the answers for accessibility, so delete the old `<h1>` tag with "How many balls can you juggle?".

### Customise the example code

1. Under `legend`, change `text` from `"Where do you live?"` to `"How many balls can you juggle?"`.

2. Change `name` to `how-many-balls`. We use the name to show the answer to this question on the **Check answers page**.

3. We only want 3 options not 4, so delete the last of the `items` including the comma from the previous item:

```
    ,
    {
        value: "northern-ireland",
        text: "Northern Ireland"
    }
```
4. Change the `value` and `text` in the `items` to:

  - 3 or more
  - 1 or 2
  - None - I cannot juggle

Your component code should now look like this:

```
{{ govukRadios({
  name: "how-many-balls",
  fieldset: {
    legend: {
      text: "How many balls can you juggle?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  items: [
    {
      value: "3 or more",
      text: "3 or more"
    },
    {
      value: "1 or 2",
      text: "1 or 2"
    },
    {
      value: "None - I cannot juggle",
      text: "None - I cannot juggle"
    }
  ]
}) }}
```

Your page should now look like this:

<figure>

![Web page with the heading "How many balls can you juggle?", 3 radios and a continue button](/images/tutorial-radios.png)

<figcaption class="govuk-body">Screenshot of how your prototype should look.</figcaption>
</figure>

{% endraw %}
