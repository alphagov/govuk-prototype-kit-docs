---
heading: Use filters to add dates or deadlines
---

> To use date filters, you need to know how to [pass data from page to page](./pass-data) and [use filters to change how answers appear](./filters).

You can use date filters to add dates or deadlines that will change in your prototype. 

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
## Show a deadline 
You can use filters to show how long is left until a deadline:

```
You have {{ "2024-01-31" | duration(5) }} days left to submit your Self Assessment return.
```

You can also work out the deadline from a previous input. For example, if the user has to wait until they are 16 to vote:

```
You can register to vote in {{ data[date-of-birth] | duration(16, "years") }} days.
```