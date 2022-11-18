---
heading: Create routes
---

You may want to make prototypes that are more complex than simple HTML files. For example, you may want to respond to input from a form and show different pages based on answers given by the user.

To do this you will need to create 'routes' - rules for the server to respond to certain URLs.

You can edit the file `app/routes.js` to process requests from the browser and send custom responses. For example processing data and sending the user to different pages based on their answers.

## Requests and responses

When you enter http://localhost:3000 in a browser, the browser sends a request to the Prototype Kit. The kit processes that request and sends a response.

By default, the Prototype Kit looks in the `app/views` folder for a corresponding file, turns the file into a complete HTML page and sends that as a response to the browser.

For example, if you go to http://localhost:3000/start, the Prototype Kit looks in the `app/views` folder for `start.html`. It adds the GOV.UK header and footer, and sends the whole start page back as a response to the browser.

If the kit cannot find a corresponding file in `app/views`, it will send an 'Error: not found' page instead.

## Routes

Routes let you control the response to any request. You can add routes to the `app/routes.js` file.

This is an example of a route:

```js
router.get('/games/dice', function(request, response) {

	var dice = Math.ceil(Math.random()*6)
	response.locals.dice = dice
	response.render('dice')

})
```

This route will pick a random number between 1 and 6, then display a 'dice' page with that number.

Let's look at each bit of this route code separately.

### router.get

There are 2 ways a browser can make a request. They are 'get' and 'post':

* a get request is when you enter an address or follow a link
* a post request is when you submit a form

This route will only run when the request is get, not post.

### '/games/dice'

This is called the request path.

### function(request, response)

This is our function (piece of code) to process the request. It has access to 2 variables or pieces of data:

* request
* response

The request contains all the data related to the request from the browser. For example, `request.path` will give you the request path.

The response lets us send a response back to the browser.

### var dice = Math.ceil(Math.random()*6)

This line simulates a dice throw. It stores a random number between 1 and 6 in the variable called dice.

### response.locals.dice = dice

This line makes the dice variable available to the view or page.

### response.render('dice')

Finally, we 'render' the page called 'dice' (don't add the extension `.html`. The kit does that automatically.

On the page called 'dice', the variable is:

```
**{{ dice }}**
```


[Express documentation for routes](http://expressjs.com/4x/api.html#app.VERB)
