---
heading: Use components from the Design System
caption: Build a basic prototype
---

You can copy example code from the GOV.UK Design System to add page elements like radios and text inputs - we call these ‘components’.

## HTML and Nunjucks

HTML is the language used to create web pages.

Nunjucks is another language we can run in the Prototype Kit, to make HTML for us. Short, simple Nunjucks code can create much longer, more complex HTML.

In the Design System, components have both Nunjucks and HTML example code. Either will work in the Prototype Kit.

## Add radios to question 1

1. Go to the [radios component in the Design System](https://design-system.service.gov.uk/components/radios/).
2. Select the **Nunjucks** tab under the first example, then **Copy code**.
3. Open `juggling-balls.html` in your `app/views` folder.
4. Replace the 2 example `<p>...</p>` paragraphs with the code you copied.
5. The example comes with a heading that is connected to the answers for accessibility, so delete the old `<h1>` tag with "How many balls can you juggle?".

### Customise the example code

1. Under `legend`, change `text` from "Where do you live?" to "How many balls can you juggle?".
2. Change `name` to `how-many-balls`.
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

![Web page with the heading "How many balls can you juggle?", 3 radios and a continue button](/public/docs/v13/images/docs/tutorial-radios.png)

<figcaption class="govuk-body">Screenshot of how your prototype should look.</figcaption>
</figure>


<nav class="govuk-pagination govuk-pagination--block" role="navigation" aria-label="results">
  <div class="govuk-pagination__next">
    <a class="govuk-link govuk-pagination__link" href="use-components-2" rel="next"> <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg> <span class="govuk-pagination__link-title">Next</span><span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">Add a textarea to question 2</span></a>
  </div>
</nav>
