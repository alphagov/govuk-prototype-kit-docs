---
heading: Add a textarea to question 2
caption: Build a basic prototype
---

1. Go to the [textarea page of the Design System](https://design-system.service.gov.uk/components/textarea/).
2. Select the **Nunjucks** tab, then **Copy code**.
3. Open `juggling-trick.html` in your `app/views` folder.
4. Replace the 2 example `<p>...</p>` paragraphs with the code you copied.
5. Delete the old `<h1>` tag with "What is your most impressive juggling trick?" (again the example code comes with an accessible heading for the question).

### Customise the example code

1. Under `label`, change `text` from "Can you provide more detail?" to "What is your most impressive juggling trick?".
2. Change the `id` and `name` to `most-impressive-trick`.
3. We don’t need a hint, so remove it and the comma just before it.

Your component code should now look like this:

```
{{ govukTextarea({
  name: "most-impressive-trick",
  id: "most-impressive-trick",
  label: {
    text: "What is your most impressive juggling trick?",
    classes: "govuk-label--l",
    isPageHeading: true
  }
}) }}
```

Your page should now look like this:

<figure>

![Web page with the heading "What is your most impressive juggling trick", a textarea and continue button](/public/docs/v13/images/docs/tutorial-textarea.png)

<figcaption class="govuk-body">Screenshot of how your prototype should look.</figcaption>
</figure>

<nav class="govuk-pagination govuk-pagination--block" role="navigation" aria-label="results">
  <div class="govuk-pagination__next">
    <a class="govuk-link govuk-pagination__link" href="show-users-answers" rel="next"> <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg> <span class="govuk-pagination__link-title">Next</span><span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">Show the user’s answers on the ‘Check answers’ page</span></a>
  </div>
</nav>
