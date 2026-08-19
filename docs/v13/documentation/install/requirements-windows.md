---
layout: install_template.html
heading: Prototype Kit requirements (Windows)
caption: Create a prototype for new users
---

You'll usually need admin access to your machine to install the software.

If you do not have admin access, ask your IT team to install the software for you.

GDS staff can install the software themselves with the Self Service app.

## Terminal

This guide will use Git Bash as a terminal (for entering commands) instead of the existing Command Prompt application. Git Bash has more features and uses the same commands as Mac and Linux.

You'll need to use the terminal application to install, start and stop the kit. Using a terminal is sometimes called ‘using the command line’.

### Installing Git Bash

Download [Git Bash (direct download)](https://git-scm.com/download/win).

When you install, on the screen titled **Choosing the default editor used by Git** select **Use Nano editor by default** (you may need to scroll the options to see it).

On all other screens, continue with the default options.

To paste in Git Bash, you can either:

* use the `insert` key
* turn on **Quick Edit Mode** to use the paste command (`ctrl` and `v`) - right click, then select **Properties**, **Options** and **Quick Edit Mode** 

## Code editor

These two code editors are popular, well established and fairly accessible:

* [VS Code](https://code.visualstudio.com/)
* [Notepad++](https://notepad-plus-plus.org/)

{% from "govuk/components/details/macro.njk" import govukDetails %}

{{ govukDetails({
  summaryText: "VS Code keyboard shortcuts",
  text: "
  * `ctrl` and `s` = save your changes
  * `ctrl` and `p` = search for a file in your project
  * `ctrl` and `f` = search for something in your file

  [Find out more about how to use VS Code](https://code.visualstudio.com/docs/introvideos/basics)
  "

}) }}

{% from "govuk/components/pagination/macro.njk" import govukPagination %}
{{ govukPagination({
  next: {
    labelText: "Install Node",
    href: "node-windows"
  }
}) }}