---
heading: Save and download changes using GitHub Desktop
---

When you store a prototype code on GitHub, other people can see and collaborate on your code.

Anyone can make changes on their device using a `branch` and publish it to the `main` version of the prototype (also called ‘pushing’ a change).

## Create a branch

To make changes to a prototype, create a branch from the repository.

1. In Github Desktop, select **Current branch** and **New branch**.
2. Enter a name and choose **Create branch based on 'main'**.

## Save and share changes

When you've made changes to the prototype and saved them in your code editor, you can share them by creating a 'pull request'.

1. In Github Desktop, enter a summary, description and then select **Commit to branch-name**.
2. **Publish branch** - this publishes your code to Github.
3. **Create a pull request** - this tells others about your new branch, so they can review and suggest changes. 
4. When the review is complete, **Merge the pull request** into the `main` (or `base`) branch.

## Download changes
When someone makes a change to the prototype, you’ll need update your version. You can `pull` these changes from Github Desktop or the Github repository.

1. In Github Desktop, select the repository and branch that you want to update.
2. Click **Fetch origin** and then **Pull origin**.
3. Select **Open in Visual Studio Code** to view the changes.

## Dealing with conflicts

Merge conflicts happen when there are differences between branches. For example, if one person edits a file and another person deletes the same file.

If there is a conflict, you must manually resolve the change. You can make changes directly in Github, or by creating a clone of your branch.
