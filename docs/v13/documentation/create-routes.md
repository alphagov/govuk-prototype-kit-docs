---
heading: Create routes
---

You may want to make prototypes that are more complex than simple HTML files. For example, you may want to respond to input from a form and show different pages based on answers given by the user (also called branching).

To do this you will need to create 'routes' - rules for the Prototype Kit to respond to certain web addresses (URLs), in the file `app/routes.js`

## Requests and responses

![Diagram showing a browser on a laptop with an arrow labelled 'request' going to a server. An arrow labelled 'response' comes back to the laptop.](/public/docs/v13/images/docs/request-response.svg)

When you enter `http://localhost:3000/start` in a browser, the browser sends a request to the server - the Prototype Kit. The kit processes that request and sends a response.

The kit looks in the `app/views` folder for a file called `start.html`. It adds the GOV.UK header and footer, and sends the whole start page back as a response to the browser.

If the kit cannot find `start.html` in `app/views`, it will send an 'Error: not found' page instead.

## Routes

You can control the response to any request by adding routes to the `app/routes.js` file. Routes are written in JavaScript.

This is an example of a route:

```js
router.post('/live-in-uk-answer', function(request, response) {

    var liveInUK = request.session.data['live-in-uk']
    if (liveInUK == "Yes"){
        response.redirect("/next-question")
    } else {
        response.redirect("/ineligible")
    }
})
```

In this example, the user was asked if they live in the UK, with 'Yes' and 'No' radio buttons to answer.

This route sends the user to a different page depending on their answer.

Let's look at each bit of this route code separately.

<div class="govuk-!-margin-bottom-8">

`router.post`

The router handles all the requests. There are 2 ways a browser can make a request: 'get' and 'post'.

* a get request is when you enter an address in the browser or follow a link
* a post request is when you submit your answer to a form with a button

This route will only run when the request is post, not get.

</div>
<div class="govuk-!-margin-bottom-8">

`'/live-in-uk-answer'`

This is called the request path. On the question page, the form has an `action` with the same path.

</div>
<div class="govuk-!-margin-bottom-8">

`function(request, response)`

This is our function (piece of code) to process the request. It has access to 2 variables (pieces of data):

* request - contains information from the browser, including the user's answers
* response - lets us send instructions to the browser, for example the next page to redirect to

</div>
<div class="govuk-!-margin-bottom-8">

`var liveInUK = request.session.data['live-in-uk']`

To send users to different pages based on their answers, the kit stores all answers in a variable called `request.session.data`.

We need the answer to 'Do you live in the UK?' `['live-in-uk']`

We use `var liveInUK =` to copy `request.session.data['live-in-uk']` to a shorter variable. This makes it easier to type later on.

</div>
<div class="govuk-!-margin-bottom-8">

`if (liveInUK == "Yes"){`

This code checks whether the answer to 'Do you live in the UK' is 'Yes'.

Note the double = symbol for checking an answer. A single = makes a copy as we did above.

</div>
<div class="govuk-!-margin-bottom-8">

`response.redirect("/next-question")`

Because the user's answer is 'Yes', our `response` is to `redirect` them to `/next-question` - as they are eligible to use the service.

</div>
<div class="govuk-!-margin-bottom-8">

`} else {`

If the user's answer was not 'Yes', we use `else` to set a different response.

</div>
<div class="govuk-!-margin-bottom-8">

`response.redirect("/ineligible")`

Our `response` is to `redirect` them to `/ineligible` - they are not eligible to continue in the service.

</div>

Find out [how to make branching journeys using routes](./branching-journeys)

[Advanced documentation for routes](https://expressjs.com/en/guide/routing.html)
