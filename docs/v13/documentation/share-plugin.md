---
heading: Share your plugin
title: Share your plugin
---

## Test your plugin

Check that you’ve set up your plugin correctly using our automated test tool. Run the command:

`npx govuk-prototype-kit@latest validate-plugin`

The validator will check you haven’t made mistakes in your configuration file but of course you’ll need to test that the functionality in your plugin works as expected.  You can do this by installing it as a local dependency.  You can do this by running npm install and giving it the folder for your plugin, when you do this the prototype kit realises you’ve installed a local dependency and watches your files for changes so you should be able to see your changes reflected quickly while you’re building your plugin.  For example, if your plugin is in the directory ~/projects/some-plugin you can install it by running the following command in a prototype:

`npm install ~/projects/some-plugin`

## Write documentation for your plugin

You need to publish supporting documentation for everything in your plugin, so that users understand how to use it.

## Publish your plugin

To publish your plugin, you need to log into npm on the command line Run:

`npm login`

To publish the plugin, run the command:

`npm publish`

## Approved plugins 

We will publish all plugins from the community in the kit, so that other users can find and install them straight away. 

We will also review each plugin to check if there are any issues or recommendations to help improve it. If a plugin is not safe for the community, we will remove it from the kit until it is fixed.

Our team will monitor the plugins that the community are using to help us decide the things we need to work on the most.