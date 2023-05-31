---
heading: Create a plugin
title: Create a plugin
---
Plugins are a way to add extra components, styles, patterns and other features from the cross-government community. 

Anyone can create plugins for other users of the kit. They will be able to install and then use the features in their own designs to meet the specific needs of their users. 

For example, the HMRC Frontend plugin provides components like the [account header](https://design.tax.service.gov.uk/hmrc-design-patterns/account-header/) and [currency input](https://design.tax.service.gov.uk/hmrc-design-patterns/currency-input/). 

> We also have a guide on how to [install and use plugins](https://prototype-kit.service.gov.uk/docs/install-and-use-plugins).

A plugin can include:

* components
* styles (Sass and CSS)
* assets (for example images)
* page templates
* filters
* JavaScript

## Approved plugins 
We will publish all plugins from the community in the kit, so that other users can find and install them straight away. 

We will also review each plugin to check if there are any issues or recommendations to help improve it. If a plugin is not safe for the community, we will remove it from the kit until it is fixed.

Our team will monitor the plugins that the community are using to help us decide the things we need to work on the most.

## Create your first plugin tutorial


1. Create a new folder for your plugin and navigate to it in the terminal, then enter:
`git init`

2. You’ve created a `package.json` file. Let's look at each bit of this file to understand what you need to enter.

* `name`= a unique name for your plugin using lowercase letters and hyphens
* `version`= must be in the form x.x.x and follow the semantic versioning guidelines
* `description`= what your plugin does and how to use it
* `author`= your name
* `license`= the github license for your department or organisation
* `homepage`:
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

3. In the terminal enter the information for your `package.json` file. 

4. Add your code for your plugin in the prototype folder. Here’s an example:

5. Install plugin locally to a prototype

6. To publish your plugin in the terminal enter:

`npm publish`


A plugin is a folder containing various files and other folders

## Package.json file

To do

## The config file

All plugins need a config file to tell the Prototype Kit what is included in the plugin, this file is called `govuk-prototype-kit-config.json`

`assets`

To do

`importNunjucksMacrosInto`

To do

`nunjucksPaths`

To do

`nunjucksFilters`

To do

`sass`

To do

`scripts`

To do

`stylesheets`

To do

`templates`

To do



