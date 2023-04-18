---
heading: Branching journeys using checkboxes
---

You can create branches using any form fields, including checkboxes and radios. In this example we will use checkboxes.

We will look at an example question to ask the user what they export. If the user:
 
- exports fruit, we will take them to a page with specific questions about fruit 
- does not export fruit, we will send them to a different path that skips the questions about fruit

Sending users to different pages based on their answers is called branching.

## Create the page

Create a page that has a form with checkboxes, using this code:

```
<form class="form" action="/exports-answer" method="post">

{{ govukCheckboxes({
  name: "exports",
  values: data["exports"],
  fieldset: {
    legend: {
      text: "What do you export?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  hint: {
    text: "Select all that apply."
  },
  items: [
    {
      value: "Fruit",
      text: "Fruit"
    },
    {
      value: "Vegetables",
      text: "Vegetables"
    },
    {
      value: "Meat",
      text: "Meat"
    }
  ]
}) }}

{{ govukButton({
  text: "Continue"
}) }}

</form>
```

In the checkboxes component, the `name` is "exports". The name is important - it is where the kit stores the answer to the question. Names cannot have spaces, so use hyphens instead and use lowercase for simplicity.

The button needs to be between the 2 `form` tags. Do not add an `href` to the button - this will turn it into a link and means it no longer submits the form.

The page should look like this:

![What do you export? Select all that apply. Checkboxes: Fruit Vegetables Meat. Button: Continue](/public/docs/v13/images/docs/branching-checkboxes.png)

## Using routes

We need some logic to decide when to send users to different pages. This kind of logic goes in a file called `app/routes.js`, which is written in JavaScript. Routes tell the kit what to do when the user goes to specific pages.

The route takes the answer the user gave to the question and either sends them to the next question or the ineligible page, depending on their answer.

> [Find out more about routes](/docs/create-routes)

### How we set the route from the page

In the page’s form tag, we have an action "/exports-answer" and a method "post":

```
<form class="form" action="/exports-answer" method="post">
```

The action is where the form data goes and the method is `post` because we are sending (posting) data.

This will make a `post` request to the path `/exports-answer`, we will write a route to respond to that request.

## Create a route

We’re going to write some logic to process the user’s answer to the question.

We will look at 2 example routes for checkboxes:

1. A specific answer is selected (and it does not matter if any other answer is selected)
2. Only a specific answer is selected

### Example 1: A specific answer is selected (and it does not matter if any other answer is selected)

In this first example we will check if the user selected the 'Fruit' checkbox. We don't care if they selected any other checkboxes.

In `app/routes.js` we need to add a route to process the answer from the form.

1. Open `/app/routes.js`
2. Add this code to the end of the file (this is called a route):

```
router.post('/exports-answer', function(request, response) {

	var exports = request.session.data['exports']
	if (exports.includes("Fruit")){
		response.redirect("/fruit")
	} else {
		response.redirect("/next-question")
	}
})
```

Let's look at what each line in the route does.

<div class="govuk-!-margin-bottom-8">

`router.post`

This route is for a post request - the same as the `method` we set on the form. We use a post request to send the kit new information (like the user’s answer to the question).

</div>
<div class="govuk-!-margin-bottom-8">

`'/exports-answer'`

This is the path for the route - the same as the `action` we set on the form.

</div>
<div class="govuk-!-margin-bottom-8">

`var exports = request.session.data['exports']`

To send users to different pages based on their answers, the kit stores all answers in a variable called `request.session.data`.

We need the answer to 'What do you export?', so we use the `name` we set on the component: `exports`

We use `var exports =` to copy `request.session.data['exports']` to a shorter variable. This makes it easier to type later on.

</div>
<div class="govuk-!-margin-bottom-8">

`if (exports.includes("Fruit")){`

Answers to checkboxes are stored as lists (called 'arrays') in the kit.

This code checks whether the array stored for exports includes the answer 'Fruit'. This is the same as the `value` we set on one of our checkboxes.

As long as the answer 'Fruit' is selected, it does not matter if any other checkbox is also selected. We'll see how to check for a single answer in the 2nd example.

</div>
<div class="govuk-!-margin-bottom-8">

`response.redirect("/fruit")`

Because the user's answer includes 'Fruit', our `response` is to `redirect` them to `/fruit` - a page with specific questions about fruit.

</div>
<div class="govuk-!-margin-bottom-8">

`} else {`

If the user's answer does not include 'Fruit', we use `else` to set a different response.

</div>
<div class="govuk-!-margin-bottom-8">

`response.redirect("/next-question")`

Our `response` is to `redirect` them to `/next-question` - skipping the page with specific questions about fruit.

### Example 2: Only a specific answer is selected

Add this line at the top of `routes.js`:

```
const util = require('util')
```

Then add this route:

```
router.post('/exports-answer', function(request, response) {

	var exports = request.session.data['exports']
	if (util.deepStrictEqual(exports, ['Fruit'])){
		response.redirect("/fruit")
	} else {
		response.redirect("/next-question")
	}
})
```

This is all the same as our first example, but instead of `exports.includes` we have:

```
util.deepStrictEqual(exports, ['Fruit'])
```

This checks whether the array stored for exports only has the answer 'Fruit', and no other answer.

We could also check for 2 specific answers:

```
util.deepStrictEqual(exports, ['Fruit', 'Vegetables'])
```

Note the order is the same as the checkboxes, that's important - checking `['Vegetables', 'Fruit']` will not work.
