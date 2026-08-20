---
heading: How to use layouts
title: How to use layouts
redirects:
  - /docs/how-to-use-layouts
---

{% raw %}

Layouts let you share a common design across pages. For example, to include the name of your service or use the GOV.UK footer on every page in your service.

If your pages share a custom header and footer, you can add them to one shared layout file. To change those parts of the page in future, you can change them once and they will update on all the pages that use that layout.

To make a page use a layout, you need to add an `extends` line at the top of the file. For example if you want to extend a layout called admin, use:

`{% extends "layouts/admin.html" %}`

The Prototype Kit comes with a layout file for you to edit. You can also add more layouts if you need to.

## Adding layouts

In your code editor, open `app/views/layouts/main.html`.

Note the line:

```
{% extends "govuk-prototype-kit/layouts/govuk-branded.html" %}
```

It means this layout extends a standard layout that comes with the Prototype Kit. It loads the default code needed for GOV.UK branded pages, along with the functionality in the kit, such as automatically storing data.

You can make changes to existing blocks and define your own blocks in your layout.

## Unbranded pages

If you do not want to use the GOV.UK logo or footer, you can choose to use unbranded pages in your prototype. Go to <strong>Manage your prototype</strong> and create a page with the <strong>Unbranded page</strong> template.

## Using blocks

Blocks are how layouts and pages share code. For example, there's a block called `govukHeader` for the header on every page.

You can use blocks to:

- customise or replace the default GOV.UK header, GOV.UK footer or Service navigation components
- add your own content to parts of the page
- include extra scripts or stylesheets in the page

[See the page template guidance on the GOV.UK Design System](https://design-system.service.gov.uk/styles/page-template/) for a list of all the blocks you can use.

### Customising service navigation

Your prototype will already include the [Service navigation component](https://design-system.service.gov.uk/components/service-navigation/) if you've set `serviceName` in the config for your prototype.

If you want to add additional links to your Service navigation, you'll need to use the `govukServiceNavigation` block to replace the default Service navigation component with your own:

```
{% block govukServiceNavigation %}
  {{ govukServiceNavigation({
    serviceName: serviceName,
    navigation: [
      {
        href: "#",
        text: "Navigation item 1"
      },
      {
        href: "#",
        text: "Navigation item 2",
        active: true
      },
      {
        href: "#",
        text: "Navigation item 3"
      }
    ]
  }) }}
{% endblock %}
 ```

### Footer block

You can make changes to the [GOV.UK footer](https://design-system.service.gov.uk/components/footer/) using the `govukFooter` block:

```
{% block govukFooter %}
 {{ govukFooter({
   meta: {
     items: [
       {
         href: "/privacy",
         text: "Privacy policy"
       },
       {
         href: "/manage-prototype",
         text: "Manage your prototype"
       },
       {
         href: "/manage-prototype/clear-data",
         text: "Clear data"
       }
     ],
     visuallyHiddenTitle: "Footer links"
   }
 }) }}
{% endblock %}
```

## Stylesheets (CSS) and JavaScript

You can use custom layouts to load your own stylesheets (CSS) and JavaScript on multiple pages. [Find out more about adding CSS and JavaScript](/adding-css-javascript-and-images/).

{% endraw %}
