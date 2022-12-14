---
heading: Link your pages together
caption: Build a basic prototype
---

To take users from one page to another, you can use either:

- a link (`<a>` tag)
- a form (`<form>` tag, when the user inputs data)

## Link your start page to question 1

1. Open `start.html` in your `app/views` folder.
2. Find the `<a>` tag with 'Start now' inside.
3. Change the value of the `href` attribute from `#` to `/juggling-balls`.

[Go to http://localhost:3000/start](http://localhost:3000/start) and select the **Start now** button to check the link works.

Links normally appear as text with underlines. We make **Start now** look like a button to make it more obvious to users.

## Link question 1 to question 2

1. Open `juggling-balls.html` in your `app/views` folder.
2. Find the line `<form class="form" action="/url/of/next/page" method="post">`.
3. Change the value of the `action` attribute from `/url/of/next/page` to `/juggling-trick`.

[Go to http://localhost:3000/juggling-balls](http://localhost:3000/juggling-balls) and select **Continue** to check the button works.

This time it's a real HTML button, not a link. Buttons submit form data - the URL is on the form tag, not the button.

## Link question 2 to your 'Check answers' page

1. Open `juggling-trick.html` in your `app/views` folder.
2. Find the line `<form class="form" action="/url/of/next/page" method="post">`.
3. Change the value of the `action` attribute from `/url/of/next/page` to `/check-answers`.

[Go to http://localhost:3000/juggling-trick](http://localhost:3000/juggling-trick) and select **Continue** to check the button works.

The 'Check answers' page template links to the ‘Confirmation’ page by default. So you do not need to change the ‘Check answers’ page.

<nav class="govuk-pagination govuk-pagination--block" role="navigation" aria-label="results">
  <div class="govuk-pagination__next">
    <a class="govuk-link govuk-pagination__link" href="use-components" rel="next"> <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg> <span class="govuk-pagination__link-title">Next</span><span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">Use components from the Design System</span></a>
  </div>
</nav>
