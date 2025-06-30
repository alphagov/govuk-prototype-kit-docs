---
heading: What’s new in version 13
---

We’ve made some big changes to how the kit works so that it’s:
- easier to use
- easier to update in the future
- more secure

If you’re starting a new prototype, you can use version 13. It’s easy to install. Details are below.

If you have an existing prototype and want to make the changes in this release, we recommend using the migration script to help with the breaking changes.

[Migrate an existing prototype to version 13](./migrate-an-existing-prototype)

If you need help with the Prototype Kit or migration, [contact the GOV.UK Prototype team](./support).

## Summary of changes

### The Prototype Kit is now an npm package

We’ve made the Prototype Kit files into an npm package. The 2 biggest breaking changes to the Prototype Kit are you can now create a prototype:
- without downloading a zip file
- by using an npm command in the terminal

Having the kit as an npm package makes your prototype files and folders much simpler. It also makes updating the kit easier.

### Create your prototype

The process to create a prototype is simpler. Read the [get started guide](./create-new-prototype).

### Run your prototype

To run the kit, use `npm run dev` (not `npm start`).

### Manage your prototype

There is a new Manage your Prototype page in the kit. From this page you can:
- create new pages using templates
- find and install plugins that work with the Prototype Kit

### Routes, templates and layouts

There is a new approach to routes, templates and layouts:

- [Create routes](./create-routes)
- [Create pages from templates](./create-pages-from-templates)
- [How to use layouts](./how-to-use-layouts)

### Using Node.js

The Prototype Kit no longer supports versions 12, 14 or 16 of Node.js. We recommend you update to the latest LTS version Node.js 22.

### GOV.UK Frontend
When creating a new prototype, you will always have the latest version of GOV.UK Frontend.

### We’ve removed a few things from the kit:

- you can no longer use the Prototype Kit with Internet Explorer 8
- the Prototype Kit no longer includes the step by step pattern by default
- the Prototype Kit no longer includes jQuery by default
- you can no longer use v6 compatibility mode

There’s quite a lot going on! [Read the release notes](https://github.com/alphagov/govuk-prototype-kit/releases/tag/v13.0.0) to see what’s changed in detail for version 13.

If you need help with the Prototype Kit, [contact the GOV.UK Prototype team](./support).
