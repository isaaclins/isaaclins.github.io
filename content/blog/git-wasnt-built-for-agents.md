+++
title = "Git wasn't built for agents"
date = 2026-06-17
draft = false
tags = ["Dev", "AI", "Git", "Version Control"]
complexity = "medium"
description = "Git was built for humans typing code. Now AI writes a lot of it. Zed's DeltaDB and Cursor's Origin want to save the whole conversation with the AI, not just the final code."
+++

Here's something that's true but easy to miss: every time you save a version of your code (what programmers call a `git commit`), you throw away the most valuable thing you made. Not the code — the code survives. The *conversation* that produced it. The dead ends, the "no, not like that," the reason a chunk of code looks weird instead of obvious. Git keeps the answer and throws away all the working-out.

That was fine for twenty years. Back when you typed every line yourself, the reasoning lived in your head, and you could mostly piece it back together. It is very much **not** fine now that an AI wrote half the file over a 40-message back-and-forth that vanished the second you hit save. Whoever opens that code next — a teammate, or another AI — has no way to find out *why* it looks the way it does.

Two companies decided that's the problem worth fixing this month. I think they're right, and I think it's a bigger deal than [SpaceX buying Cursor for $60 billion](/blog/why-spacex-paid-60-billion-for-a-vscode-fork/).

## What Git actually is, and why it's the wrong shape

Git, [born in 2005](https://en.wikipedia.org/wiki/Git#History), saves your project's history as a row of snapshots. Each save (a "commit") is basically a photo of your entire project at one moment, with a unique fingerprint stamped on it. But everything that happens *between* two photos — the debugging, the failed attempts, the AI chat that explains the weird fix — simply isn't in the picture. Git knows what the code looked like. It has no idea why.

Around 100 million developers work this way, and Git is genuinely great at what it was built for: keeping copies in sync across thousands of computers, and proving nobody secretly tampered with the history. It was just never meant to hold a conversation — because in 2005, there was nobody on the other end to have one with.

## DeltaDB: save every edit, not just every save

On June 11, Zed co-founder Nathan Sobo published the best description of this problem I've seen — a post called [*"Software Is Made Between Commits."*](https://zed.dev/blog/introducing-deltadb) A couple of days later, Zed [opened a waitlist](https://www.techtimes.com/articles/318322/20260613/zed-opens-deltadb-waitlist-crdt-version-control-records-every-edit-not-just-commits.htm) for **DeltaDB**, and the idea flips Git on its head.

Where Git takes a photo only when you save, DeltaDB records **every single edit** as you make it, and tags each one so you can point back to it later. Your work becomes one continuous stream of tiny changes instead of a handful of snapshots. Two things fall out of that, and they're the whole point:

1. **The message and the change it caused are saved together.** The [AI prompt](/blog/model-context-protocol/) and the edit it produced are locked to each other, so you never lose track of which caused which. From any line in an old chat, you can jump to that code as it looks today. From any line of code, you can trace back every conversation that ever touched it. As Sobo puts it, the conversation with the AI is [*"becoming the true source of our software."*](https://zed.dev/blog/introducing-deltadb#source-code-is-now-source-conversation)

2. **Notes stick to the actual change, not to a line number.** Leave a comment on a line, and it follows that line even after it's moved, rewritten, or buried under new code — because it's pinned to the edit itself, not to "line 42." If you've ever seen a GitHub comment go stale the moment someone edits the file, you already feel why this matters.

## The clever part: conflicts stop being your problem

Under the hood, DeltaDB uses a decades-old math trick called [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Operation-based_CRDTs) — the same family of tech that lets several people edit one shared document at the same time without clobbering each other. It already [runs inside databases like Redis and Riak](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Industry_use), so it's not science fiction.

The magic property: as long as the edits are built the right way, the order they arrive in doesn't change the final result. So if two machines drift apart — you editing on one, an AI on another, both touching the same file — the system just merges them into one clean version automatically. No human untangling anything. None of those ugly `<<<<<<< HEAD` markers you get from a Git conflict. And the files are still ordinary files on your computer: an AI edits them through the terminal, and you can pull the whole thing onto your disk and use whatever tools you like.

That's the dream when you've got AIs working side by side. The second you have three AIs editing one project at once, Git makes you stop and untangle conflicts constantly. This makes that chore basically disappear.

## The pull request was a workaround all along

Sobo's boldest claim is about the pull request — the formal "please review my code before it ships" step the whole industry has been built around for a decade. His argument: pull requests, review threads, and inline comments only exist because the code and the talk *about* the code have always lived in separate places. So we invented a ritual to staple them back together after the fact.

Put them in the same place from the start, and the ritual just... melts away. A teammate can jump in while the work is still happening, talk to the AI that did it, and leave notes as they go — no waiting for someone to save and upload first. Git and the automated tests don't disappear; they go back to what they're actually good at (running checks, connecting you to the wider world) instead of being the place all the talking is forced to happen.

## Cursor's bet from the other direction: Origin

Zed isn't alone. Cursor — yes, [the one SpaceX just bought](/blog/why-spacex-paid-60-billion-for-a-vscode-fork/) — is building **Origin**, which it bluntly calls ["a git forge for the agentic era,"](https://cursor.com/origin) with the tagline "code is moving faster than any infrastructure was built to handle." (A "forge" is just the website where code lives and gets reviewed — GitHub is the famous one.) Same problem, opposite end: Zed is rebuilding how the code is *stored*; Cursor is rebuilding the *website on top* — a GitHub for a world where most of the code is written by AI.

Worth noting: developers have been [begging Cursor for this](https://forum.cursor.com/t/version-control-for-agentic-changes/85902) for over a year — "let me scroll back through the changes the AI made, so I can undo and try a different prompt before it goes off the rails." Cursor's stopgap was save-points inside the chat. Origin looks like the real thing.

## So what does this actually feel like, day to day?

Strip the marketing and it's three real changes to your day:

- **You stop saving just to collaborate.** Work is shared live, as it happens, with the conversation attached. Saving a version becomes something you do for the outside world, not the price of being allowed to talk about the code.
- **`git blame` finally gets useful.** (`git blame` is the tool that tells you who last touched a line and when.) Instead of "Isaac, 8 months ago," you see the actual prompt and reasoning that produced a line — and every change since.
- **Parallel AIs stop fighting over your files.** Automatic merging means you can [point five AIs](/blog/building-a-codex-style-coding-app/) at one project at once without constantly cleaning up after them.

## The honest caveat

This is hard, and it isn't shipped. DeltaDB is a waitlist with a beta "in a few weeks." Origin is a waitlist. Even fans admit [the hard part is real](https://www.techtimes.com/articles/318322/20260613/zed-opens-deltadb-waitlist-crdt-version-control-records-every-edit-not-just-commits.htm): getting this math to behave on real code (not just a text box) is exactly where ambitious projects tend to die. And Git has twenty years and 100 million users of habit behind it — "good enough and already installed everywhere" has killed better ideas before.

But the diagnosis is right, and that part won't reverse. Git answers "what did the code look like." The question that matters now is "why does it look like this, and what conversation got it here." Two serious teams shipped an answer to that in the same week. That's not noise. That's the save button starting to lose its grip.

## Agentic version control FAQ

{{< faq >}}
What is DeltaDB? || DeltaDB is Zed's new way of saving code. It records every edit you make — and the AI conversation behind it — instead of only taking a snapshot each time you commit.
What is "agentic version control"? || It's version control built for code that AI helps write. The chat with the AI stays attached to the code, so the reasoning behind every change is still there later, instead of vanishing when you save.
Is Git being replaced? || Not really. Git still handles testing, security, and syncing code between computers. Tools like DeltaDB and Cursor's Origin sit on top and add the missing piece — the conversation — where the AI work actually happens.
What are CRDTs? || A kind of data that merges itself automatically. When several people (or AIs) edit the same thing at once, CRDTs combine the changes cleanly, with nobody stuck fixing a conflict by hand.
What is Cursor Origin? || Cursor's upcoming "git forge for the agentic era" — think GitHub, but rebuilt for a world where AI writes most of the code.
{{< /faq >}}
