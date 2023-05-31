---
heading: Create a plugin
title: Create a plugin
---
Plugins are a way to add extra components, styles, patterns and other features from the cross-government community. You can create plugins for other users of the kit to install and iterate, so that they meet the specific needs of their users. 

For example, if you want to share how you ask for an email address or National Insurance number in your service, you can create a plugin for it.

## Plugins
A plugin is any prototype with a `govuk-prototype-kit.config.json` in its root folder. A plugin can include:

* components
* styles (Sass and CSS)
* assets
* templates
* filters
* JavaScript

## Who can create plugins
Anyone can create a plugin to share their ideas with the community. 

We depend on a strong cross-government community to ensure the Prototype Kit includes the latest research, design and development to represent and be relevant for its users.

## Approved plugins 
We will publish all plugins from the community in the kit, so that other users can find and install them straight away. 

We will also review each plugin to check if there are any issues or recommendations to help improve it. If a plugin is not safe for the community, we will remove it from the kit until it is fixed.

Our team will monitor the plugins that the community are using to help us decide the things we need to work on the most.

## How to create a plugin
Follow these steps to create a plugin using NPM modules. 

The Prototype Kit looks for a package.json file in the prototype folder. If the kit finds an NPM module/dependency that has a package.json file, it considers it a plugin.

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

5. To publish your plugin in the terminal enter:

`npm publish`



