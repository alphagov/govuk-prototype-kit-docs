---
heading: Create your first plugin
title: Create your first plugin
---

This tutorial shows you how to create a plugin that provides a simple 'Hello world' page template.

Our example is for templates, but you can follow the same steps for other plugin types.

## Create a folder and initialise it

1. Create a new folder for your plugin and navigate to it in the terminal, then enter:
`git init && npm init`

2. npm will now ask you questions to create a `package.json` file. You can change any of your answers later if you need to.

<div class="govuk-!-margin-bottom-8">

  `name`

  The name for your plugin using only lowercase letters and hyphens, for example "hello-world-template"

</div>
<div class="govuk-!-margin-bottom-8">

  `version`

  Use the default version number 1.0.0

</div>
<div class="govuk-!-margin-bottom-8">

  `description`

  Enter a summary of what your plugin does, for example "Provides a Hello World template"

</div>
<div class="govuk-!-margin-bottom-8">

  `test command`  
  `git repository`  
  `keywords`  

  Leave these blank

</div>
<div class="govuk-!-margin-bottom-8">

  `author`

  Your name - this will only appear publicly if you share the plugin later.

</div>
<div class="govuk-!-margin-bottom-8">

  `license`

  Use the default "ISC"
  
</div>

3. Confirm your answers by pressing enter when asked "Is this OK?".

## Create a config file

1. Create a file called `govuk-prototype-kit.config.json` in your plugin folder. This is called your config file.

  Your config file tells the kit what’s included in the plugin. 

2. In your config file add a ‘Hello World’ template using the `templates` option:

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

## Create a template

Create a file called `hello-world.html` and add HTML:

```
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
```

You have created a plugin that provides a template page.

## Test your plugin

1. If you do not have a prototype, [create one](./create-new-prototype)
2. In the terminal change to your prototype folder.
3. Run `npm install [path]` where `[path]` is the path to your plugin folder, for example `~/projects/prototype-plugins/my-example-plugin`
4. Run your prototype, your template should be available in the **Templates** section of **Manage your prototype**
