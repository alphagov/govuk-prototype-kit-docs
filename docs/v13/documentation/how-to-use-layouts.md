---
heading: How to use layouts
title: How to use layouts
---

Layouts let you share a common design across pages. For example, if your pages share a custom header and footer, you can add them to one shared layout file. If you need to change those parts of the page in future, you can change them once and they will update on all the pages that use that layout.

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

You can overwrite existing blocks and define your own blocks in your layout.

<div class="govuk-inset-text">
  If you do not want your pages to be GOV.UK branded, go to <strong>Manage your prototype</strong> and create a page with the <strong>Unbranded page</strong> template.
</div>

## Using blocks

Blocks are how layouts and pages share code. For example, there is a block called `header` for the header content on every page.

These are some of the default blocks on the [template page on the GOV.UK Design System](https://design-system.service.gov.uk/styles/page-template/#exploded-view-of-the-page-template-block-areas).

### Header block

You can overwrite the existing GOV.UK header using the `header` block, adding navigation like this:

```
{% block header %}
{{ govukHeader({
  homepageUrl: "#",
  serviceName: "Service name",
  serviceUrl: "#",
  navigation: [
    {
      href: "#1",
      text: "Navigation item 1",
      active: true
    },
    {
      href: "#2",
      text: "Navigation item 2"
    },
    {
      href: "#3",
      text: "Navigation item 3"
    }
  ]
}) }}
{% endblock %}
 ```

Read more about [headers in the GOV.UK Design System](https://design-system.service.gov.uk/components/header/).

### Footer block

You can overwrite the existing GOV.UK footer using the `footer` block:

```
{% block footer %}
 {{ govukFooter({
   meta: {
     items: [,
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

Read more about [footers in the GOV.UK Design System](https://design-system.service.gov.uk/components/footer/).

## Stylesheets (CSS) and JavaScript

You can use custom layouts to load your own stylesheets (CSS) and JavaScript on multiple pages. See the [guide to adding CSS and JavaScript](./adding-css-javascript-and-images).
