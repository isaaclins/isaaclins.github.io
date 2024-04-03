---
title: "Pull Request - How to?"
date: 2024-04-03
draft: false
description: "Template for creating a pull request on github"
tags: ["learning", "github"]
---

# How to Submit a Pull Request on GitHub

Pull requests let you tell others about changes you've pushed to a branch in a repository on GitHub. Here's a step-by-step guide on how to submit a pull request to a GitHub repository,

## Step 1: Fork the Repository

Fork a repository to your own account. You can do this by clicking the **Fork** button in the upper right corner of the repository page.

## Step 2: Clone the Repository

Clone the forked repository to your local machine. Replace `{your_username}` with your GitHub username.

```bash
git clone https://github.com/{your_username}/{repository_name}.git
```

## Step 3: Create a New Branch

Navigate into the cloned repository and create a new branch where you'll make your changes. Replace `{branch_name}` with your desired branch name.

```bash
cd {repository_name}
git checkout -b {branch_name}
```

## Step 4: Make Your Changes

Make the changes to the code that you want to submit. If you're adding new stuff, make sure to make the code as understandable as possible.

## Step 5: Commit and Push Your Changes

Commit your changes with a suitable commit message, then push your commits to your forked repository on GitHub.

```bash
git commit -am "Your detailed commit message"
git push origin {branch_name}
```

## Step 6: Create a Pull Request

Go to the GitHub page of your forked repository and click on **New pull request**. On the next page, select your branch from the **compare** dropdown.
Add a description on what you did with the **following layout**:

```md
# Description

Please include a summary of the changes and the related issue. Please also include relevant motivation and context. List any dependencies that are required for this change.

Fixes # (issue)

## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

# How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

- [ ] Test A
- [ ] Test B

# Checklist:

Please delete options that are not relevant.

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules


```

Review your changes and then click on **Create pull request**.

## Step 7: Wait for a Review

Now your changes have been submitted for a review. The owner of the repository will review the changes and decide whether to accept them.

Remember, it's important to have a meaningful commit message and comments in your pull request to help others understand your changes.

That's it! You've now submitted a pull request to a GitHub repository.
