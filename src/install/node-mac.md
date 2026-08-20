---
layout: install_template.html
heading: Install Node.js (Mac)
caption: Create a prototype for new users
---

The kit is designed to work with Node.js version 24 and above.

### Check if you have Node.js

In the terminal, enter:
```
node --version
```
If it says `command not found` you do not have Node and will need to download and install it.

If the version number starts with 24 you have the correct version installed.

If it starts with a number lower than 24, you need to download and install version 24.

### Download and install Node.js

[Download version 24 from the Node.js website.](https://nodejs.org/en/)

Run the installer with all default options.

### Once Node is installed

You’ll need to quit and restart the terminal to be able to use Node for the first time.

To check it's installed correctly you can again run:
```
node --version
```

If it’s installed correctly it should show a number starting with 24.

{% from "govuk/components/pagination/macro.njk" import govukPagination %}
{{ govukPagination({
  next: {
    labelText: "Create a prototype",
    href: "/install/create-a-prototype/"
  }
}) }}
