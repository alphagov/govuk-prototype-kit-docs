---
heading: Use error messages in the kit 
---
Use the [error summary](https://design-system.service.gov.uk/components/error-summary/) and [error message](https://design-system.service.gov.uk/components/error-message/) to help users recover from validation errors.

Live services use validation messages to help users when they miss information or enter something that cannot be correct. 

## How to design error messages

If you add validation errors that behave in the same way as the live service, it's difficult to click-through each page in your kit.

To test your error messages in user research, you can create separate pages to show what happens when something goes wrong.

For example, to show an error message for a name input:
```
{{ govukErrorSummary({
    titleText: "There is a problem",
    errorList: [
      {
        text: "Enter your full name",
        href: "#"
      }
    ]
  }) }}
  
  {{ govukInput({
    label: {
      text: "Full name"
    },
    id: "full-name",
    name: "fullName",
    errorMessage: {
      text: "Enter your full name"
    }
  }) }}
  ```






