---
heading: Use filters to add dates 
---

> To use date filters, you need to know how to [pass data from page to page](./pass-data) and [use filters to change how answers appear](./filters).

You can use date filters to add dates that will change in your prototype. 

You can [use existing x-govuk date filters](https://x-govuk.github.io/govuk-prototype-filters/get-started/) in the kit. For example, you can show today's date when a user submits their application:
```
You submitted your application on {{ "today" | govukDate }}.
```

To display a time:
```
You signed into your account at {{ "now" | govukTime }}.
```

## Change the format of a date
You can change how dates appear, so that you display the month name instead of a number. For example, to show the month 'March':
```
{{ 3 | monthName }}
```
You can also shorten (or 'truncate') the month 'March':
```
{{ 3 | monthName("truncate") }}
```
## Show the number of days since an application was made 
To show how many days have passed since the user submitted their application:

```
{% set dateSubmitted = '2023-09-18' %}

<p>You submitted your application {{ dateSubmitted | daysAgo | plural("day") }} ago</p>
```

## Show when a user is eligible
If you ask for the user's date of birth, you can use filters to show when they're eligible to use your service. For example, if the user must be 18 to apply:

```
<p>You can apply for a juggling licence on {{ dateOfBirth | duration(18, 'years') | govukDate }}</p>
```