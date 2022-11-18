---
heading: Use backwards compatibility to upgrade from version 6
---

Versions 7 and above of the Prototype Kit use the GOV.UK Design System. They are not compatible with prototypes built with older versions.

Backwards compatibility lets you import a large old prototype into the latest version without having to rewrite it. You can update old pages one by one as you need to, and add new pages.

You will end up with 2 'apps' in your prototype:

**/app** using version 7 and above

**/app/v6** using version 6


## Instructions

1. Make a note of your Prototype Kit version in **VERSION.txt** in your prototype folder.

1. Make sure you have a backup of your prototype folder, for example by copying it to another folder or by uploading to GitHub.

1. Delete everything in your prototype folder except for the **app** and **.git** folders. (.git may be hidden).

1. Rename your **app** folder to **v6**

1. Find and replace all instances of **/public/** to **/public/v6/** in your code.
In Atom, press **cmd shift F**. It looks like this:

![Screenshot of section of the Atom user interface with: a text field that contains '/public/'; a button labelled 'find all'; a text field containing '/public/v6'; and a button labelled 'replace all'.](/public/docs/v13/images/docs/backwards-compatibility-atom.png)

1. [Download the latest Prototype Kit](./download) and unzip it.

1. Copy everything from the new Prototype Kit folder into your prototype folder.

1. Move your **v6** folder into the new **app** folder.

1. Update **app/config.js** to your settings, in particular the **serviceName**. You can then safely remove **app/v6/config.js**.

1. On the command line, in your prototype folder, run **npm install**, then **npm start**.

1. If your previous Prototype Kit version was older than 6.3.0, follow the guidance below about updating from older versions.

## Updating pages to use versions 7 and above

You can now create new pages using version 7 and above by working in the app/views folder.

You can update old pages by moving them from app/v6/views to app/views. You will then need to update the code on these pages to work with versions 7 and above. See the [updating your code guide in the GOV.UK Design System](https://design-system.service.gov.uk/get-started/updating-your-code/).

## Updating from versions older than 6.3.0

The instructions above are for updating from version 6.3.0 of the Prototype Kit. If you had an older version, follow the normal instructions then run the commands below:

### 6.2.0

```
npm install govuk-elements-sass@3.0.1 govuk_frontend_toolkit@5.1.2 govuk_template_jinja@0.22.1
```

### 6.1.0 or 6.0.0

```
npm install govuk-elements-sass@3.0.1 govuk_frontend_toolkit@5.1.2 govuk_template_jinja@0.19.2
```
