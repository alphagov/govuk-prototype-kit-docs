---
heading: Use the GOV.UK brand refresh in your prototype
title: Use the GOV.UK brand refresh in your prototype
---

On 25 June 2025, GDS launched a refreshed GOV.UK brand for web. If you're prototyping a GOV.UK service and your prototype is not using the refreshed GOV.UK brand, we recommend you use the refreshed brand so that it's consistent with the GOV.UK website and other GOV.UK services.

To check if your prototype is using the refreshed GOV.UK brand, see [the guidance on changes to GOV.UK](https://www.gov.uk/guidance/changes-to-govuk). If your prototype is already using the refreshed brand, you do not need to make any changes.

You can update the branding in your prototype using the `rebrand` option in the GOV.UK Frontend Prototype Kit plugin.

Before you start, make sure your prototype is using GOV.UK Frontend v5.10.0 or later.  See [installing and using plugins](/docs/install-and-use-plugins) for details on how to check.

## Add the `rebrand` option and set it to `true`

Go to your prototype's `config.json`, located in your prototype's `app` folder. Add a comma after the `serviceName` line if there isn't one there already. After `serviceName` but still within the curly brackets, enter the following:

```json
"plugins": {
  "govuk-frontend": {
    "rebrand": true
  }
}
```

If there was nothing else besides `serviceName` in your config, it should now look like this:

```json
{
  "serviceName": "Your service name",
  "plugins": {
    "govuk-frontend": {
      "rebrand": true
    }
  }
}
```

If you haven't already, start your prototype locally, [using the instructions on running the kit](/docs/install/how-to-run-the-kit). You should now see the refreshed GOV.UK brand.
