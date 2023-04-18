---
heading: Branching using radios
---

You can create branches from any form fields, including checkboxes and radios. In this example we will use radios.

Our example question will ask the user where they live. We’re going to send them to an ‘ineligible’ page if they live in any country other than England.

Sending users to different pages based on their answers is called branching.


## Create the page


Create a page that has a form with radio buttons, using this code:

```
<form class="form" action="/country-answer" method="post">

{{ govukRadios({
  name: "country",
  value: data['country'],
  fieldset: {
    legend: {
      text: "Where do you live?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  items: [
    {
      value: "England",
      text: "England"
    },
    {
      value: "Scotland",
      text: "Scotland"
    },
    {
      value: "Wales",
      text: "Wales"
    },
    {
      value: "Northern Ireland",
      text: "Northern Ireland"
    }
  ]
}) }}

{{ govukButton({
  text: "Continue"
}) }}

</form>
```

In the radios component, the `name` is "country". The name is important - it is where the kit stores the answer to the question. Names cannot have spaces, so use hyphens instead and use lowercase for simplicity.

The page should look like this:

![Where do you live? Radios: England, Scotland, Wales, Northern Ireland Button:Continue](/public/docs/v13/images/docs/branching-radios.png)

## Using routes

We need some logic to decide when to send users to different pages. This kind of logic goes in a file called `app/routes.js`, which is written in JavaScript. Routes tell the kit what to do when the user goes to specific pages.

The route takes the answer the user gave to the question and either sends them to the next question or the ineligible page, depending on their answer.

> [Find out more about routes](/docs/create-routes)

### How we set the route from the page

```
<form class="form" action="/country-answer" method="post">
```

The action is where the form data goes and the method is `post` because we are sending (posting) data.

This will make a `post` request to the path `/country-answer`, we will write a route to respond to that request.


## Create a route

We’re going to write some logic to process the user’s answer to the question.

If the user lives in England, we’ll send them to the next question. If they answer with anything else, we’ll send them to the ineligible page. 

In `app/routes.js` we need to add a route to process the answer from the form.

1. Open `app/routes.js`.
2. Add this code to the end of the file (this is called a route):

```
router.post('/country-answer', function(request, response) {

	var country = request.session.data['country']
	if (country == "England"){
		response.redirect("/age")
	} else {
		response.redirect("/ineligible-country")
	}
})
```

Let's look at what each line in the route does.

<div class="govuk-!-margin-bottom-8">

`router.post`

This route is for a post request - the same as the `method` we set on the form. We use a post request to send the kit new information (like the user’s answer to the question).

</div>
<div class="govuk-!-margin-bottom-8">

`'/country-answer'`

This is the path for the route - the same as the 'action' we set on the form.

</div>
<div class="govuk-!-margin-bottom-8">

`var country = request.session.data['country']`

To send users to different pages based on their answers, the kit stores all answers in a variable called `request.session.data`.

We need the answer to 'Where do you live?', so we use the `name` we set on the component: `country`

We use `var country =` to copy `request.session.data['country']` to a shorter variable. This makes it easier to type later on.

</div>
<div class="govuk-!-margin-bottom-8">

`if (country == "England"){`

This code checks whether the answer to `country` is 'England'. This is the same as the `value` we set on one of our radios.

Note the double = symbol for checking an answer. A single = makes a copy as we did above.

</div>
<div class="govuk-!-margin-bottom-8">

`response.redirect("/next-question")`

Because the user's answer is 'England', our `response` is to `redirect` them to `/next-question` - as they are eligible to use the service.

</div>
<div class="govuk-!-margin-bottom-8">

`} else {`

If the user's answer was not 'England', we use `else` to set a different response.

</div>
<div class="govuk-!-margin-bottom-8">

`response.redirect("/ineligible-country")`

Our `response` is to `redirect` them to `/ineligible-country` - they are not eligible to continue in the service.

</div>
