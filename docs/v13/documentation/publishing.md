---
heading: Publish your prototype online
title: Publish your prototype online
---

You'll usually run the Prototype Kit on your own device using localhost. To share the prototype with others, you need to publish it online.  

Publishing your prototype online means you can:
 - share it with colleagues for collaboration
 - test it with users on their own devices

You'll need a hosting service to publish prototypes online.

## Hosting services

The GOV.UK Prototype Kit runs on any hosting service that supports Node.js. This means it does not run on 'static' hosting services like GitHub Pages or Netlify.

Your organisation may already use a hosting service for the Prototype Kit. Check with your IT or digital team about which platform to use.

Some hosting services automatically publish every time you [push to GitHub](./github-desktop). For example:

 - [Railway](https://railway.app/new/github)
 - [Render](https://render.com/docs/github)
 - [Heroku](https://devcenter.heroku.com/articles/github-integration) (requires payment)

## Setting a password

When running the Prototype Kit online, you need to set a password. This is to stop anyone finding your prototype accidentally and mistaking it for a real service.

Check your hosting services documentation on how to set 'environment variables' (it may have a slightly different name like 'config vars' or 'variables').

To set a password, you need to add 2 environment variables where the:
- `name` is `NODE_ENV`, and the `value` is `production`
- `name` is `PASSWORD`, and the `value` is whatever password you want to use

### If you get an error about username

Older versions of the Prototype Kit require a username - you can [migrate your prototype to version 13](./migrate-an-existing-prototype) or set a username.

Add another environment variable where the `name` is `USERNAME` and the `value` is whatever username you want to use.

## If you want to create additional passwords

In some cases you might want to give temporary access to your prototype, eg. for a round of user research or to show it to a stakeholder.

To support this, you can create additional passwords. You can revoke these later whilst still providing access for your team via the primary password.

To set additional passwords, you need to first add an environment variable PASSWORD_KEYS that lists the keys of the additional passwords:

- PASSWORD_KEYS=PASSWORD_01,PASSWORD_02

The password keys are not the passwords, they just identify them. They can take any unique value that’s a valid environment variable.

To specify the passwords, add an environment variable for each one, like this:

- PASSWORD_01=password01
- PASSWORD_02=password02

Please make sure your prototype kit is version **13.15.0** or later to allow this functionality to work.
