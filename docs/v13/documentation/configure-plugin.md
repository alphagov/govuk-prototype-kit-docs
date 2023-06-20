---
heading: Configure your plugin
title: Configure your plugin
---

<!--## Package.json file - is this something that we still need?

To do-->

All plugins need a `govuk-prototype-kit-config.json` file (also called a 'config file') to tell the Prototype Kit what is included in the plugin.

## The config file

`nunjucksPaths`

We use Nunjucks as our Prototype Kit templating language. It allows us to add a number of paths, then uses those paths to find includes, layouts and macros. For example, if you add `{% extends “some-plugin/layouts/main.njk” %}` to your config file then Nunjucks will search for a matching file inside the plugin folder.

Follow these steps to make sure Nunjucks can find your plugin.

1. Create a folder inside your plugin (for example, `nunjucks`). It’s better to use a separate Nunjucks directory instead of your root.
2. Create a `some-plugin` folder inside your nunjucks folder
3. Create a layouts folder in your `some-plugin` folder.
4. Create a file called `main.njk` in your layouts folder.
5. Add the folder that contains the `some-plugin` directory to your `govuk-prototype-kit.config.json`. For example, if the path in your project is `lib/nunjucks/some-plugin/layouts/main.njk` then in your configuration file add:

```
{
  "nunjucksPaths": [
    "/lib/nunjucks"
  ]
}
```

You can add multiple `nunjucksPaths`, but it’s easier for users to find your includes and layouts when you use one. Inside that folder there should oly be one folder with the same name as your plugin, so that users know which plugin they’re getting the include or layout from. Do not name your path `/`.

`nunjucksFilters`

Nunjucks filters are tools that users of the Prototype Kit can add to their Nunjucks templates.  For example, you can create an ‘uppercase’ filter to  make text uppercase like this:
```
const { addFilter } = require('govuk-prototype-kit').views

addFilter('somePlugin.uppercase', function (content) {
  return content.toUpperCase()
})
```

You can put multiple filters in one file with only one require statement. For example, these 2 filters are for a file called filters.js:

```
const { addFilter } = require('govuk-prototype-kit').views

addFilter(somePlugin.uppercase', function (content) {
  return content.toUpperCase()
})

addFilter(somePlugin.uppercase', function (content) {
  return '<strong>' + content + '</strong>'
}, { renderAsHtml: true })
```
Add these filters in your govuk-prototype-kit.config.json:

```
{
  "filters": [
    "/filters.js"
  ]
}
```

Once the user has installed your plugin they can use these filters:

`<p>Hello {{ "world" | somePlugin.uppercase }}<p>`
`<p>Hello {{ "world" | somePlugin.bold }}<p>`

They can also use these filters together:

`<p>Hello {{ "world" | somePlugin.uppercase | somePlugin.bold }}<p>`


`nunjucksMacros`

You can use Nunjucks Macros to define reusable chunks of content, similar to using functions in a programming language. Each component in `govuk-frontend` is a Nunjucks Macro. We ask that you include the plugin name in your Nunjucks Macro name and path. Do not include a `/` at the start of the nunjucksPath, as the path is relative to any of the folders you’ve listed in `nunjucksPaths`. For example:

`nunjucks/somePlugin/macros/text-input.njk`
```
{% macro somePluginTextInput(params) %}
  <input type="text" class="some-plugin_text-input" value="{{params.value}}">
{% endmacro %}
`nunjucksFilters`
```

`govuk-prototype-kit.config.json`
```
{
  "nunjucksPaths": ["/nunjucks"],
  "nunjucksMacros": [
    {
      "macroName": "somePluginTextInput",
      "importFrom": "somePlugin/macros/text-input.njk"
    }
  ]
}
```

You’ve set up the macro, so now the user does not need to import the macro (unless they’re creating their own layout files). If they do need to import the macro, they can add the following code to their page:


`{% import somePluginTextInput from "somePlugin/macros/text-input.njk" %}`

The import statement uses the same parameters as the `nunjucksMacro` in your config file.

`sass`

SASS is a CSS preprocessor that generates the CSS which is used on every page.  You can add SASS files to share styles. For example, you can create a style for a highlight:
```
.some-plugin_highlight {
  background-color: yellow;
}
```

Save SASS files with the extension `.scss`, for example `styles.scss`. You also need to add the SASS file to your config file, so those styles appear in the user’s prototype:

```
{
  "sass": [
    "/styles.scss"
  ]
}
```

The user can set variables in their `app/assets/sass/settings.scss` before any plugin sass, or they can add styles into their `app/assets/sass/application.scss` that runs after all plugin sass. For example, your sass file can include:

```
$some-plugin_highlight-colour: yellow !default;

.some-plugin_highlight {
  background-color: $some-plugin_highlight-colour;
}
```

This means that the user can override `$some-plugin_highlight-colour` in their `app/assets/sass/settings.scss` and also use the highlight colour in their own scss.

`stylesheets`

You can add stylesheets that are ready for use in the browser and that should not be pre-processed by SASS, for example:

```
.some-plugin_highlight {
  background-color: yellow;
}
```

Save stylesheet files with the extension `.css`, like `styles.css`.  To use these styles in the prototype, you also need to add them to the config file:

```
{
  "stylesheets": [
    "/styles.css"
  ]
}
```

`scripts`

Scripts are javascript files that you can add to prototype pages. You can add as many as you want. A simple script to try is:

```
console.log('Hello world')
```

Save scripts in a file called `pageScript.js`, then you can add them to the plugin config file:
```
{
  "scripts": [
    "/pageScripts.js"
  ]
}
```

If you want to create Javascript functions or variables, you should create a single global variable. For example:

```
window.SOME_PLUGIN = window.SOME_PLUGIN || {}

window.SOME_PLUGIN.log = function (whatToLog) {
  console.log('(logged from some plugin)', whatToLog)
}
```

`templates`

We use templates to make it easy for users to create new pages in their prototype. When a user creates a page from a template, the kit automatically adds a file in the user’s prototype with a copy of the template. 

If you update a template in your plugin in the future, any changes you make will only impact users who create new pages using the template. Any existing pages that were created with the old version will stay the same. You should keep templates small and only use them as a way to show other features in your plugin.

This example template does not rely on anything else and comes with a warning to let users know that they may end up with out of date versions of this page in the future.

We've included nunjucksMacros, nunjucksPaths, importNunjucksMacrosInto and stylesheets to show how templates can work well as part of a bigger system:

`nunjucks/somePlugin/layouts/main.njk`
```
<!DOCTYPE html>

<main class="some-plugin_main-content">
  {% block content %}
    <p>It looks like you haven't provided any content. Please add a "{% block content %}" to your page</p>
  {% endblock %}
</main>
```


`nunjucks/somePlugin/macros/text-input.njk`
```
{% macro somePluginTextInput(params) %}
  <input type="text" class="some-plugin_text-input" value="{{params.value}}">
{% endmacro %}
```
`assets/styles/styles.css`
```
.some-plugin_main-content {
  border: 1px solid blue;
}

.some-plugin_text-input {
  padding: .3rem 1rem;
}
```

`templates/text-input.njk`
```
{% extends "somePlugin/layouts/main.njk" %}

{% block content %}
  somePluginTextInput({value: 'Hello world'})
{% endblock %}
```

The govuk-prototype-kit.config.json brings this all together:
```
{
  "templates": [
    {
      "path": "/templates/text-input.njk",
      "name": "Page with text input",
      "type": "nunjucks"
    }
  ],
  "nunjucksPaths": [
    "/nunjucks"
  ],
  "nunjucksMacros": [
    {
      "macroName": "somePluginTextInput",
      "importFrom": "somePlugin/macros/text-input.njk"
    }
  ],
  "importNunjucksMacrosInto": [
    "/nunjucks/somePlugin/layouts/main.njk"
  ]
}
```
`importNunjucksMacrosInto`

Some plugins include Nunjucks Macros. It’s easier for users of the Prototype Kit if these macros are already imported for them, so they do not need to include each macro they’re using. 

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

When you add stylesheets, macros, scripts, templates and other assets, you often need to link to other resources. These resources can have their own URLs and may include additional files. For example, images that are loaded within favicons.

Add assets to your config file so that you can specify files and folders that should be available within the prototype, for example:

```
{
  "assets": [
    "/resources/for-the-browser",
    "/scripts/additional/example.js"
  ]
}
```

This config file will make everything in the `resources/for-the-browser` folder and the `scripts/additional/example.js` file available within the prototype. To access these assets, the URL structure is `/plugin-assets/<your plugin name>/<the path inside your plugin>` - for example:

`/plugin-assets/somePlugin/resources/for-the-browser/favicon.ico`

If you’re using assets URLs from SASS, you can use the variable `$govuk-plugins-url-context` instead of `/plugin-assets`. This means that if we change the URL in future releases you will not need to make any changes.