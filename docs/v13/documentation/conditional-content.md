---
heading: Change the content within a page based on a user's answers
---

You can show different text on a page depending on how a user answers a question. For example, using a previous answer to ask more specific questions.

When you use dynamic content, all content variations are on one page instead of linking to lots of slightly different pages.

## Use session data

When a user answers questions in your prototype, their answers are stored in session data. We use the `name` attribute to `call` this session data and decide which conditional content to use. 

Our example question will ask the user where they live, we’ll then include the name of the country in the next question.
We’ve used `name: "country"` to set the list of countries. Names cannot have spaces, so use hyphens and lowercase for simplicity.

The `value` tag is how we identify each radio or checkbox answer (like the country name). For a text input, the `value` is whatever the user enters in the text area.

```
{% from "govuk/components/radios/macro.njk" import govukRadios %} 
{{ govukRadios({ 
name: "country", 
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
value: 
"scotland", 
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

## Call session data

To change the content in a heading based on the user’s previous input, we use the `name` attribute in the format `{{data.name}}`. Our example uses `{{data.country}}`.

```
<legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
 <h1 class="govuk-fieldset__heading">
 How long have you lived in {{data.country}}?
 </h1>
</legend>
```

>Make sure you have double brackets around your data, like `{{data.example}}`. If you are calling content within the middle of a sentence, leave spacing either side of it.

## Link 

The button to take the user to another page must be between a `<form>` tag. Do not add an href to the button - this will turn it into a link and means it will not submit the form or any of its data.

## If statements

We can also use if statements to show conditional content, in the format: 
```
{% if (condition) %} 
The content you want to appear 
{% endif %}
``` 
The content will only appear when your `if statement` is true.

For example, to show specific content when the user answers Scotland:

```
{% if (data.country == "Scotland") %}
 <div class="govuk-inset-text">
This service is also available in Gaelic.
 </div>
 {% endif %}
```

### 2 different conditions
An example with conditional content based on if the answer is Scotland or anything else: 
```
{% if (data.country == "Scotland") %}
 <div class="govuk-inset-text">
 This service is also available in
Gaelic.
 </div>
{% else %}
 <div class="govuk-inset-text">
 This service is available in other
languages.
 </div>
{% endif %}
```

### More than 2 conditions
An example with conditional content based on whether the answer for 'country' is Scotland, Wales and no content for any other answer: 
```
{% if (data.country == "Scotland") %}
 <div class="govuk-inset-text">
 This service is also available in
Gaelic.
 </div>
{% elseif (data.country == "Wales") %}
 <div class="govuk-inset-text">
 This service is also available in Welsh.
 </div>
{% else %}
{% endif %}
```

### Combine conditions
An example with the same conditional content for the answer Scotland or Northern Ireland:
```
{% if (data.country == "Scotland") or (data.
country == "Northern Ireland") %}
 <div class="govuk-inset-text">
 This service is also available in
Gaelic and Irish.
 </div>
{% endif %}
```
An example with the same conditional content for the answer for 'country' being Scotland and the answer for 'nationality' being French:

```
{% if (data.country == "Scotland") and
(data.nationality == "French") %}
 <div class="govuk-inset-text">
 This service is also available in
Gaelic and French.
 </div>
{% endif %}
```

### Multiple conditions
An example where the 'country' is Scotland and the content is different based on the 'nationality':
```
{% if (data.country == "Scotland") %}
 <div class="govuk-inset-text">
 {% if (data.nationality == "Northern
Irish") %}
This service is also available in
Gaelic and Irish.
 {% endif %}
 {% if (data.nationality == "French") %}
This service is also available in
Gaelic and French.
 {% endif %}
 </div>
{% endif %}
```

### Hide an answer
You can choose to only show content and style when there’s actually data. For example, an optional phone number field. 

On the **Check your answers** page, you can include a row in the table when the user gives their phone number and hide it when they do not. 

Add an `if statement` in the format `{% if data.nametag %}` like in this example:
```
{% if data.phone %}
 <div class="govuk-summary-list__row">
 <dt class="govuk-summary-list__key">
Phone number
 </dt>
 <dd class="govuk-summary-list__value">
{{data.phone}}
 </dd>
 <dd class="govuk-summary-list__actions">
<a class="govuk-link" href="personal-details">
Change<span class="govuk-visually-hidden"> phone number<
/span>
</a>
 </dd>
 </div>
{% endif %}
```