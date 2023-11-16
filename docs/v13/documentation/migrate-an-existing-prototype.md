---
heading: Migrate an existing prototype to version 13
title: Migrate an existing prototype to version 13
---

1. If you do not already have it, [install Node.js version 20](https://nodejs.org/en).

2. In the terminal, change to your prototype folder. 

3. Run this command to delete your node modules folder:

    `rm -rf node_modules`

4. Make a backup of your prototype folder. You can do this in Finder or Windows Explorer.

5. In your prototype folder, run this command in the terminal:

    `npx govuk-prototype-kit@latest migrate`

6. If some migration steps fail, the script will report these.

    If this is the case, [contact the GOV.UK Prototype team](./support).

7. If you are using Git, commit these changes.

>To run the kit enter `npm run dev` in your terminal (this used to be `npm start`).

## If your prototype does not work

If your prototype does not work, compare the new `package.json` file to the `package.json` file in the backup you made in step 3.

Run `npm install PACKAGE-NAME` for each package that's missing in the new file.

[Contact the GOV.UK Prototype team](./support) if you need help.
