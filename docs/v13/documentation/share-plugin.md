---
heading: Share your plugin
title: Share your plugin
---

## Write documentation for your plugin

Supporting documentation lets users understand what is included in your plugin and how to use it.

You can publish this anywhere, for example your organisation's design system, or add a `readme.md` file to your plugin folder.

You can see an example here:

https://www.npmjs.com/package/@govuk-prototype-kit/common-templates

If your documentation is not in the `readme.md` file, you need to add a link to your `govuk-prototype-kit.config.json`.

For example:

```
documentation: "https://example.com"
```

## Test your plugin

Check that you’ve set up your plugin correctly using our testing tool.

In the terminal, change to your plugin folder and enter:

<!-- Natalie - can we change the tool to test-plugin -->
```
npx govuk-prototype-kit@latest validate-plugin
```

The tool will tell you if it finds any errors in your plugin.

You also need to check your plugin manually.

1. If you do not have a prototype, [create one](./create-new-prototype)
2. In the terminal change to your prototype folder.
3. Run `npm install [path]` where `[path]` is the path to your plugin folder, for example `~/projects/prototype-plugins/my-example-plugin`
4. Run your prototype and check if your plugin works as expected.


## Publish your plugin

To publish your plugin, you need to log into npm on the command line Run:

`npm login`

To publish the plugin, run the command:

`npm publish`

## Approved plugins 

We will publish all plugins from the community in the kit, so that other users can find and install them straight away. 

We will also review each plugin to check if there are any issues or recommendations to help improve it. If a plugin is not safe for the community, we will remove it from the kit until it is fixed.

Our team will monitor the plugins that the community are using to help us decide the things we need to work on the most.