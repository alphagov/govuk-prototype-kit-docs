---
heading: Save and download changes using GitHub Desktop
---

When you store a prototype on GitHub, you can collaborate on your code with anyone in your team.

You can make a 'branch' (a separate version) so it doesn't affect anyone else.

When you are ready to suggest your changes, you can make a 'pull request' to the `main` branch. This will share your suggested changes with the rest of the team for them to review.

> If you are working on your own, you can make changes on `main` without using branches.

## Create a branch

1. In Github Desktop top bar, select **Current branch**
2. Select **New branch**.
3. Enter a branch name and select **Create branch based on 'main'**.

## Save and share changes

Make your changes to the prototype and save them in your code editor, then you can share them by creating a 'pull request'.

GitHub Desktop will show you the files that have changed.

1. In Github Desktop, bottom left, enter a summary in the box above the **description** (leave the description blank)
2. Select **Commit to branch-name**
3. Select **Publish branch** - this publishes your code to GitHub.
4. If you make more changes, commit them and select **Push origin**

## Make a pull request

1. Select **Create a pull request** - this tells others about your new branch, so they can review and suggest changes.

    If you can't see that button, select the **Branch** menu, then **Create a pull request**

2. Creating a pull request will open GitHub website. Write a title and description of your changes and select **Create pull request**

## Review a pull request

Another member of the team should review the pull request on GitHub.

They should:

1. Go to the **Files Changed** tab
2. Select **Review changes**

When they have approved the pull request:

1. Go to the **Conversation** tab
2. Select **Merge pull request**

## Download changes

When a pull request is merged, you’ll need to update your version (also called 'pulling' changes).

1. In Github Desktop top bar, select **Current branch**
2. Select **main**
3. Click **Fetch origin** and then **Pull origin**
4. Select **Open in Visual Studio Code** to view the changes.

## Dealing with conflicts

If 2 people edit the same file at the same time, it can sometimes cause an error in GitHub called a conflict.

If there is a conflict, you must manually resolve the change - ask a developer on your team to help.
