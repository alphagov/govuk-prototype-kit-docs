---
heading: Configure your plugin
title: Configure your plugin
---

<!--## Package.json file - is this something that we still need?

To do-->

## Use a namespace

When configuring your plugin, you need to choose a short and unique name (called a namespace) for your plugin or group of plugins. This means your plugin will not clash with other plugins.

For example if 2 plugins include a component called `timeline`, they would clash and not work correctly. If they use the namespaces `govuk` and `hmrc`, the 2 components have different names and will work correctly (`govuk-timeline` and `hmrc-timeline`).

## The config file

Plugins need a file called `govuk-prototype-kit.config.json` (also known as a config file). The config file tells the kit what’s included in the plugin. 

There are multiple options you can use in the config file, depending on what your plugin provides.

`nunjucksPaths`

An array of paths for Nunjucks includes, layouts and macros. For example:

```
{
  "nunjucksPaths": [
    "/nunjucks/"
  ]
}
```

In this example, if you add `{% extends “some-plugin/layouts/main.njk” %}` to a page then Nunjucks will search for a matching file inside the plugin folder (`/nunjucks/some-plugin/layouts/main.njk`).

Inside your Nunjucks path folder you need a folder with the same name as your plugin (`some-plugin`). This lets users know which plugin they’re getting the include or layout from.

You can add multiple `nunjucksPaths`, but it’s easier for users to find your includes and layouts when you use one.

`nunjucksFilters`

An array of files for Nunjucks filters. For example:

```
{
  "nunjucksFilters": [
    "/filters.js"
  ]
}
```

Filters change the format of how a users answers appear in a prototype. We have a [guide to creating filters](./create-filters).

When creating filters for a plugin, use your namespace in your filter names. For example:

```
addFilter('somePlugin.uppercase', function (content) {
  return content.toUpperCase()
})
```

`nunjucksMacros`

An array of objects, consisting of:
 - `macroName` - the name of the macro
 - `importFrom` - the path of the macro

It requires the [`nunjucksPaths`](#) option.

For example:

```
{
  "nunjucksPaths": [
    "/nunjucks/
  ],
  "nunjucksMacros": [
    {
      "macroName": "somePluginTextInput",
      "importFrom": "somePlugin/macros/text-input.njk"
    }
  ]
}
```

Nunjucks Macros are reusable components, like the components in the GOV.UK Design System.

Use your namespace in your Nunjucks Macro names and paths, as in the example above.

Do not include a `/` at the start of `importFrom`. The path is relative to any of the folders you’ve listed in `nunjucksPaths`. In the example above you would add a file at this path:

```
nunjucks/somePlugin/macros/text-input.njk
```

With a Nunjucks macro like this:

```
{% macro somePluginTextInput(value) %}
  <input type="text" class="some-plugin_text-input" value="{{ value }}">
{% endmacro %}
```

[Find out more about macros in the Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html#macro).

<!-- check with Natalie -->
You’ve set up the macro, so now the user does not need to import the macro (unless they’re creating their own layout files). If they do need to import the macro, they can add the following code to their page:

`{% import somePluginTextInput from "somePlugin/macros/text-input.njk" %}`

The import statement uses the same parameters as the `nunjucksMacro` in your config file.

`sass`

An array of Sass files. For example:

```
{
  "sass": [
    "/styles.scss"
  ]
}
```

Sass generates CSS which is loaded on every page.

Use your namespace in your Sass naming, for example:

```
.some-plugin_highlight {
  background-color: yellow;
}
```

[Find out more in the Sass documentation](https://sass-lang.com/guide/#variables)

`stylesheets`

An array of CSS files. For example:

```
{
  "stylesheets": [
    "/styles.css"
  ]
}
```

These stylesheets are loaded on every page.

Use your namespace in your CSS naming, for example:

```
.some-plugin_highlight {
  background-color: yellow;
}
```

`scripts`

An array of JavaScript files. For example:

```
{
  "scripts": [
    "/scripts.js"
  ]
}
```

<!-- check with Natalie -->
These files are loaded on every page.

Use your namespace in your JavaScript naming, for example:

```
window.SOME_PLUGIN = window.SOME_PLUGIN || {}

window.SOME_PLUGIN.log = function (whatToLog) {
  console.log('(logged from some plugin)', whatToLog)
}
```

`templates`

An array of objects, consisting of:
 - `path` - the path to the template file
 - `name` - this appears in the **Templates** section of **Manage your prototype**
 - `type` - this is always "nunjucks"

 For example:

```
{
  "templates": [
    {
      "path": "/templates/hello-world.njk",
      "name": "Hello world page",
      "type": "nunjucks"
    }
  ]
}
```

Templates let users create pages that are commonly used across government services.

In the example above you would add a file at this path:

```
/templates/hello-world.njk
```
With a Nunjucks page like this:

```
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello world</h1>
    <!-- Add your content here -->
  </body>
</html>
```


`importNunjucksMacrosInto`

Some plugins include Nunjucks Macros. It’s easier for users of the Prototype Kit if these macros are already imported for them, so they do not need to import each macro they’re using. 

We have added `nunjucksMacros` to the plugin config so we can generate import statements automatically. If you have files in your plugin that benefit from having these Nunjucks macros, you can list them in `importNunjucksMacrosInto`. 

We mostly use this for layouts. If your plugin includes a layout, you can import the Nunjucks macros into it:

```
{
  "importNunjucksMacrosInto": [
    "/nunjucks/layouts/main.njk"
  ]
}
```

`assets`

An array of paths for any files you want to make available in a prototype. For example:

```
{
  "assets": [
    "/assets/",
    "/images/profile.png"
  ]
}
```

Paths can be folders or files. Files can be any type, for example images, PDFs and so on.

In the example above you would add a file at this path:

```
/images/profile.png
```

To use this in a page, the URL structure is:

```
/plugin-assets/<your plugin name>/<asset path>
```

In our example:

```
<img src="/plugin-assets/somePlugin/images/profile.png" alt="profile icon">
```

If you’re using asset paths in your Sass, use the variable `$govuk-plugins-url-context` instead of `/plugin-assets`. This means that if we change the path in the future you will not need to make any changes.
