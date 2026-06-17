+++
title = "Git wasn't built for agents"
date = 2026-06-17
draft = false
tags = ["Dev", "AI"]
complexity = "medium"
description = "The conversation that wrote your code dies the moment you run git commit. Zed's DeltaDB and Cursor's Origin are both betting that's the problem worth fixing in the agentic era."
+++

Here's a thing that's true and that you've stopped noticing: every time you run `git commit`, you throw away the most valuable artifact you produced. Not the code, the code survives. The _conversation_ that produced it. The dead ends, the "no, not like that," the reason this function looks deranged instead of obvious. Git keeps the answer and burns the working.

That was fine for twenty years. When you typed every line yourself, the reasoning lived in your head and you could mostly reconstruct it. It is very much **not** fine now that an agent wrote half the file over a 40-message back-and-forth that vanished the instant you committed. The next engineer — or the next agent — inherits the code with no path back to why.

Two companies decided that's the problem worth solving this month. I think they're right, and I think it's a bigger deal than [SpaceX buying Cursor for $60B](/blog/why-spacex-paid-60-billion-for-a-vscode-fork/).

## What Git actually is, and why it's the wrong shape

Git, [created in 2005](https://en.wikipedia.org/wiki/Git#History), stores history as a graph of **commit objects**, each a content-addressed hash of a full snapshot of the repo. A commit is a photograph of the whole project at one instant. Everything _between_ two photographs — the debugging, the experiments, the agent chat that explains the weird workaround — is invisible. The log knows what the code looked like. It has no idea why.

Roughly 100 million developers live inside this model. It is excellent at what it was designed for: distributed snapshots, cryptographic integrity, "what changed between v1 and v2." It was simply never designed to hold a conversation, because in 2005 there was nobody to have one with.

## DeltaDB: every operation, not every commit

On June 11, Zed's Nathan Sobo published a post with the best framing of the problem I've seen — [_"Software Is Made Between Commits."_](https://zed.dev/blog/introducing-deltadb) Days later Zed [opened the waitlist](https://www.techtimes.com/articles/318322/20260613/zed-opens-deltadb-waitlist-crdt-version-control-records-every-edit-not-just-commits.htm) for **DeltaDB**, and the core idea is a genuine inversion of Git.

Where Git captures a snapshot at each commit, DeltaDB captures **every individual edit operation** and gives each one a stable, addressable identity. Your work becomes a continuous stream of fine-grained deltas instead of a sequence of photos. Two consequences fall out of that, and they're the whole point:

1. **The message and the edit it produced are stored side by side.** The agent prompt and the diff it generated are one linked artifact, so neither drifts away from the other. From any line in an old conversation you can jump to that code as it stands today; from any line of code you can trace back every conversation that ever touched it. Sobo's line: the conversation that generates code [_"is becoming the true source of our software."_](https://zed.dev/blog/introducing-deltadb#source-code-is-now-source-conversation)

2. **References are anchored to deltas, not line numbers.** A comment on a line survives that line being moved, refactored, or buried in new code, because it points at the operation, not at "line 42." If you've ever watched a GitHub review comment detach itself into useless "this comment was made on an outdated diff" limbo, you already feel why this matters.

## The clever part: conflicts stop being your problem

DeltaDB is built on **[operation-based CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Operation-based_CRDTs)** — conflict-free replicated data types, formally defined in 2011 by Shapiro, Preguiça, Baquero and Zawirski, and already [battle-tested inside Redis, Riak and Azure Cosmos DB](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Industry_use).

The property that buys you everything: if your edit operations are commutative and associative, the order they're applied in doesn't change the result. Two machines diverge — you on one, an agent on another, both hammering the same file — and the merge function is a deterministic join that **always converges to one state, by math, with no human resolving a conflict.** No `<<<<<<< HEAD`. The files stay real files, too: agents edit them through a terminal, and you can mount the whole worktree to disk and use your own tools whenever you want.

That's the dream for parallel agents specifically. The moment you've got three agents working a codebase at once, Git's merge model is a tax you pay constantly. CRDT convergence makes that tax go to zero.

## The PR ceremony was a workaround all along

The most provocative claim in Sobo's post is about the pull request, the thing the entire industry has organized itself around for a decade. His argument: PRs, review threads and inline comments only exist because the code and the conversation about it have **always lived in separate places**, so we built ceremony to staple them back together after the fact.

Put them in the same place from the start and the ceremony just... evaporates. A teammate joins while the work is still happening, talks to the agent that did it, annotates as it goes — no waiting for someone to commit and push first. Git and CI don't die; they retreat to what they're genuinely good at, running checks and connecting you to the outside world, instead of being the place collaboration is forced to happen.

## Cursor's bet from the other direction: Origin

Zed isn't alone. Cursor — yes, [the one SpaceX just bought](/blog/why-spacex-paid-60-billion-for-a-vscode-fork/) — is building **Origin**, pitched flatly as ["a git forge for the agentic era,"](https://cursor.com/origin) with the tagline "code is moving faster than any infrastructure was built to handle." Same diagnosis, different attack surface: Zed is reinventing the storage layer; Cursor is reinventing the _forge_, the GitHub-shaped layer on top, for a world where most commits have a non-human author.

It's worth noting devs have been [asking Cursor for exactly this](https://forum.cursor.com/t/version-control-for-agentic-changes/85902) for over a year — "give me a local version history of the changes the AI makes so I can roll back and try a different prompt before it goes off the rails." Cursor's stopgap answer was chat checkpoints. Origin looks like the real one.

## So what does an "agentic version manager" actually feel like?

Strip the marketing and it's three concrete shifts in your day:

- **You stop committing to collaborate.** Work is shared live, mid-flight, conversation attached. The commit becomes a checkpoint you make for the outside world, not the price of admission to talk about code.
- **`git blame` gets an upgrade it desperately needed.** Instead of "Isaac, 8 months ago," you get the actual prompt and reasoning that produced the line, and the chain of every change since.
- **Parallel agents stop fighting over the worktree.** Conflict-free merges mean you can fan out five agents on one repo without babysitting the rebases.

## The honest caveat

This is hard, and not shipped. DeltaDB is a waitlist with a beta "in weeks"; Origin is a waitlist. Even sympathetic reviewers note that [CRDTs at code-edit scale are genuinely difficult](https://www.techtimes.com/articles/318322/20260613/zed-opens-deltadb-waitlist-crdt-version-control-records-every-edit-not-just-commits.htm) — the commutativity guarantee only holds if every operation is designed for it, and dragging that from a collaborative text buffer up to a full version-control layer is exactly where ambitious systems go to die. Git also has twenty years and 100 million users of inertia, and "good enough and already installed everywhere" has killed better ideas before.

But the diagnosis is correct, and that's the part that won't reverse. Git answers "what did the code look like." The question that matters now is "why does it look like this, and what conversation got it here." Two serious teams launched an answer to that in the same week. That's not noise. That's the commit starting to lose its monopoly.

