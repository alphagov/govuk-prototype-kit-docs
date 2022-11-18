---
heading: Migrate an existing prototype to version 13 with the migration script
title: Migrate an existing prototype to version 13
---

1. Install Node.js version 18.

2. In the terminal, delete the folder `node_modules` (doing this first will make the backup quicker).

3. Make a backup of your prototype folder. You can do this in Finder or Windows Explorer.

4. In the [terminal](./install/requirements#terminal), `cd` to your prototype folder.

5. Run this command:

`npx govuk-prototype-kit@13 migrate`

6. If some migration steps fail, the script will report these.

If this is the case, [contact the GOV.UK Prototype team](./support).

## If your prototype does not work

If your prototype does not work, compare the new `package.json` file to the `package.json` file in the backup you made in step 3.

Run `npm install PACKAGE-NAME` for each package that's missing in the new file.

Contact the [contact the GOV.UK Prototype team](./support) if you need help doing this.
