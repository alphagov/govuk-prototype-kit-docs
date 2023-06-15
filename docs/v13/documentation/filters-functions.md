---
heading: Show different content depending on user input
---


We have a filters.js file, but no documentation on how to use it.

Filters are a way to manipulate pieces of text on the page, for example to format a date.

Functions are a way to dynamically add content to a page.

If you want to include content that will change over time you can use functions, such as today's date. 

Filters are a way to automatically make changes to content on a page. For example, if a user enters the date 28/8/20 and you want to show it in a different format like 28 August 2020.

## Show today's date

To display today's date, you can use the `date` filter. 

1. Create a variable in your `filters.js`:
`{% set currentDate = govuk.now() %}`
The variable
2. 


