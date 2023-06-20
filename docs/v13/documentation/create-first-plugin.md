---
heading: Create your first plugin
title: Create your first plugin
---

>To create a plugin, you need to understand how to [configure a plugin](./configure-plugin.md).

A plugin is a folder containing various files and other folders.

1. Create a new folder for your plugin and navigate to it in the terminal, then enter:
`git init && npm init`

2. You’ve created a `package.json` file. Let's look at each bit of this file to understand what you need to enter.

* `name`= a unique name for your plugin using lowercase letters and hyphens
* `version`= the plugin version number, which must follow semantic versioning guidelines in the format x.x.x
* `description`= what your plugin does and how to use it
* `author`= your name
* `license`= the github license for your department or organisation
* `homepage`: a URL for more information about your project
* `Repository: { type`= the type of version control software you’re using (usually git)
* `url`= the url of your git repository

Here’s an example of the `package.json` file for a plugin template:
```js
"name": "@govuk-prototype-kit/task-list",
  "version": "1.0.0",
  "description": "GOV.UK Task List Pattern for the GOV.UK Prototype Kit",
  "author": "GOV.UK Prototype team, UK Government Digital Service",
  "license": "MIT",
  "homepage": "https://github.com/alphagov/govuk-prototype-kit-task-list",
  "repository": {
    "type": "git",
    "url": "https://github.com/alphagov/govuk-prototype-kit-task-list.git"
```

3. In the terminal, enter the information for your `package.json` file. 

4. Create a file called `govuk-prototype-kit.config.json` in the root directory of your project. 

  A `govuk-prototype-kit.config.json` is the plugin configuration file that tells the Prototype Kit what’s included in the plugin. 

  For example, the `govuk-prototype-kit.config.json` file for a plugin that adds a ‘Hello World’ template should look like this:

```
{
  "templates": [
    {
      "name": "Hello World example",
      "path": "/hello-world.html",
      "type": "nunjucks"
    }
  ]
}
```

5. All file paths inside a `govuk-prototype-kit.config.json` file must start with a forward slash, this refers to the plugin’s root file. The path for our template is `/hello-world.html`, which is a basic HTML file:

```
<!DOCTYPE html>

<h1>Hello world</h1>
```

6. You now have a plugin that you can use in a prototype.

7. To locally install a plugin for your prototype, you can run the npm install <plugin-path> command. 

  For example, if your plugin directory path is `~/projects/prototype-plugins/my-example-plugin` run `npm install ~/projects/prototype-plugins/my-example-plugin`.

8. Run the `npm publish` command to publish your plugin using the name in your `package.json`. Check how to name your plugin before you publish, as it's hard to delete packages from npm.

