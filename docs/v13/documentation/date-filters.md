---
heading: Use filters to add dates 
---

> To use date filters, you need to know how to [pass data from page to page](./pass-data) and [use filters to change how answers appear](./filters).

You can [use existing x-govuk date filters](https://x-govuk.github.io/govuk-prototype-filters/get-started/) to add dates that will change in your prototype. 

To show today's date when a user submits their application:
```
You submitted your application on {{ "today" | govukDate }}.
```
To display a time:
```
You signed into your account at {{ "now" | govukTime }}.
```

## Change the format of a date
You can change how dates appear, so that you display the name of the month instead of a number. 

To show the month 'March':
```
{{ 3 | monthName }}
```
To shorten (or 'truncate') the month 'March' to 'Mar':
```
{{ 3 | monthName("truncate") }}
```
## Show how many days have passed
To show how long it's been since a user submitted their application:

```
{% set dateSubmitted = '2023-09-18' %}

<p>You submitted your application {{ dateSubmitted | daysAgo | plural("day") }} ago</p>
```

## Show when a user is eligible
You can use filters to show when someone is eligible to use your service. For example, if they must be 18 to apply:

```
{% set dateOfBirth = '2010-09-18' %}

<p>You can apply for a juggling licence on {{ dateOfBirth | duration(18, 'years') | govukDate }}</p>
```