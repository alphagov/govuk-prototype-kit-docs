---
heading: Change the content within a page based on a user's answers
---

>To change the content within a page based on a user's answers, you need to know [how to pass data from page to page](pass-data).

There are 2 ways to show content based on a user's answers. You can either [send the user to different pages](branching-journeys) (called 'branching') or change the content within a page (called 'conditional' content).

Branching is better when most of the content on the page is different.

## If statements

We can use `if` statements to show conditional content, in the format: 
```
{% if (condition) %} 
    The content you want to appear 
{% endif %}
``` 
The content will only appear when your `if` statement is true.

For example, to show specific content when the user answers Scotland:

```
{% if (data['country'] == "Scotland") %}
    <div class="govuk-inset-text">
        This service is also available in Gaelic.
    </div>
{% endif %}
```

### Conditional content for any other answer
An example with conditional content when the answer is Scotland and different content for any other answer: 
```
{% if (data['country'] == "Scotland") %}

    <div class="govuk-inset-text">
        This service is also available in Gaelic.
    </div>

{% else %}

    <div class="govuk-inset-text">
        This service is available in other languages.
    </div>

{% endif %}
```

### Conditional content for 2 specific answers
An example with conditional content when the answer is Scotland and different content for Wales: 

```
{% if (data['country'] == "Scotland") %}

    <div class="govuk-inset-text">
        This service is also available in Gaelic.
    </div>

{% elseif (data['country'] == "Wales") %}

    <div class="govuk-inset-text">
        This service is also available in Welsh.
    </div>

{% endif %}
```

### Combine conditions
An example with the same conditional content for the answer Scotland or Northern Ireland:
```
{% if (data['country'] == "Scotland" or data['country'] == "Northern Ireland") %}
 
    <div class="govuk-inset-text">
        This service is also available in Gaelic and Irish.
    </div>

{% endif %}
```
An example with conditional content when the answer for 'country' is Scotland and the answer for 'nationality' is French:

```
{% if (data['country'] == "Scotland" and data['nationality'] == "French") %}

    <div class="govuk-inset-text">
        This service is also available in Gaelic and French.
    </div>

{% endif %}
```

### Multiple conditions
An example where the 'country' is Scotland and the content is different based on the 'nationality':
```
{% if (data['country'] == "Scotland") %}

    <div class="govuk-inset-text">

        {% if (data['nationality'] == "Northern Irish") %}

            This service is also available in Gaelic and Irish.

        {% elseif (data['nationality'] == "French") %}

            This service is also available in Gaelic and French.

        {% endif %}

    </div>

{% endif %}
```
