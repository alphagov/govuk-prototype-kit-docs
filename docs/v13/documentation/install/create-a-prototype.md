---
heading: Create a prototype
caption: Create a prototype
---

## Terminal basics

You'll need to use a terminal to create and run prototypes (or Git Bash on Windows, which is part of Git for Windows). It lets you type in commands and run programs on your computer.

The important thing to remember about the terminal is that you work in one directory (folder) at any one time.

There are a few terminal commands you‘ll need to know to use the Prototype Kit.

### Commands

* `cd [name of directory]` = change to [name of directory]
* `cd ~` = go to your home directory
* `ls` = list all the folders and files in a directory
* `pwd` = print working directory tells you what directory you’re in
* press up and down on the keyboard to go through previous commands
* `npm run dev` = start the Prototype Kit (you need to be in your prototype folder)

To quit the Prototype Kit, in the terminal press the `ctrl` and `c` keys together.

If you type a command that the terminal does not understand, it will show you an error message. Do not worry if you see one of these. Have a look at the command you wrote and see if there is a typo in the command.

## Make a folder for your prototypes

1. Create a folder called `prototypes` in your `Documents` folder.

2. In your `prototypes` folder, create a folder for your new prototype. Use all lower case, hyphens instead of spaces and avoid any other special characters. For example `juggling-licence`.

## Navigate to your prototype folder

You need to navigate to your prototype folder in the terminal. Most commands for the kit need to be run in the prototype folder.

`cd ~/Documents/prototypes/juggling-licence`

Take note of what is upper or lower case - for example lower case 'd' for 'Documents' will not work.

If any of your folder names contain spaces, you must add quotation marks around everything after `~/`. For example:

`cd ~/"a folder name with spaces/Documents/prototypes/juggling-licence"`

## Create your prototype

Run:

`npx govuk-prototype-kit create`

<nav class="govuk-pagination govuk-pagination--block" role="navigation" aria-label="results">
  <div class="govuk-pagination__next">
    <a class="govuk-link govuk-pagination__link" href="how-to-run-the-kit" rel="next"> <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg> <span class="govuk-pagination__link-title">Next</span><span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">How to run the kit</span></a>
  </div>
</nav>
