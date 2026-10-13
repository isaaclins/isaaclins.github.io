+++
title = "My git blame now tells me why"
date = 2026-10-13
draft = false
tags = ["Dev", "AI", "Git", "Agents", "Version Control"]
complexity = "medium"
description = "Git keeps the code and throws away the reason. With AI agents committing all day, that's how fixed bugs come back. Here's the small git hook that links every commit to the chat behind it."
+++

`git blame` tells you who changed a line. Mine now tells me why.

I [posted about this on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7515324153051275264/), and a few people asked how it works. Here's the long version. But first the problem, because the fix only makes sense once you've seen what goes wrong.

## Git keeps the code, not the reason

Every change starts as a conversation. These days that's mostly a chat with an AI agent: you describe what's broken, it digs around, explains what it found, and writes the fix. Then it commits, and git saves exactly one part of that.

{{< commit-why "lost" >}}

Git saves *what* changed, a short title, who did it and when. The *why* stays behind in the chat. And the why is often the only thing that explains a line that looks wrong.

I wrote about this back in June in [Git wasn't built for agents](/blog/git-wasnt-built-for-agents/). Git is from 2005. Back then the reasoning lived in the head of whoever typed the code, and you could walk over and ask them. Now the one who typed it is an AI, and its head is a chat window you closed three days ago.

## With agents, the missing reason turns into bugs

Since October 11, my machine has made 109 commits in 5 repos. I typed none of them: [Stewie](/blog/hi-im-stewie-isaacs-ai-agent/), my other agents and some scheduled jobs did. And every agent starts each new chat from zero. It doesn't remember Monday's chat, so it only knows what the code and the commit tell it.

That's how a fixed bug comes back:

{{< commit-why "trap" >}}

The Thursday agent didn't do anything stupid. A one-second sleep inside a loop, with no reason given, *looks* like a mistake. Any careful developer might delete it. The information that would have stopped it existed. It was just in a chat nobody could find.

Without the why, every odd-looking fix is one cleanup away from being undone. And agents do a lot of cleanups.

## The fix: put the chat one step away from the code

What I wanted was simple: from any line of code, get back to the conversation that put it there. So on October 11 I asked Stewie: *what if every commit to a private repo had its chat attached?* I said "build it" at 13:03. The first linked commit landed at 13:07.

Now `git blame` is only the first step:

{{< commit-why "blame" >}}

Same line, same commit. But one command later, the agent (or I) can read the reason for the pause before touching it. That's the whole point. The rest is plumbing.

The last piece wasn't code. I added one rule to the notes all my agents read before they work: *something broke or changed unexpectedly? Find the commit, read the chat behind it, and only then change it back.* An agent that reverts without reading why just brings the old bug back faster.

## How it works

It's a small git hook, about 170 lines in total. Git can run little scripts at certain moments of a commit, and you can point *every* repo on a machine at one shared set of them (`git config --global core.hooksPath`). Mine does something at three moments:

{{< commit-why "how" >}}

A few details that matter:

- **How it knows an agent is committing.** The agents tell on themselves. Claude Code and Codex each put their session ID in an environment variable, and my scheduled jobs set their own. If none is set, a human is typing.
- **Why only private repos.** Those two lines only mean something on my machine. On a public repo they'd be noise for everyone else, and they'd show how I work. Public commits still go into the local list, so I can trace them anyway.
- **It runs the repo's own hooks too.** Pointing git at a shared hooks folder normally switches off each project's own hooks (linters, formatters). Mine calls them after it's done.
- **It can never break a commit.** Every error is swallowed, and the whole thing adds about half a second.

## Same idea as Delta and Origin, much smaller

In June, Zed and Cursor announced the big versions of this idea: the conversation is part of the source. Both have shipped since. Zed's [Delta](https://zed.dev/blog/introducing-delta), the first app built on DeltaDB, has been in [public beta](https://zed.dev/blog/delta-public-beta) since September 16. Cursor's Origin has been in [early beta](https://forum.cursor.com/t/origin-code-hosting/168670) since August 17.

The difference is how much each one keeps:

| | My hook | Zed Delta | Cursor Origin |
| --- | --- | --- | --- |
| What it keeps | A link from each commit to its chat | Every edit between commits, plus the chat | Your repos and pull requests, next to Cursor's agents |
| Smallest step back | A commit | A single edit | A commit or pull request |
| Who can open the chat | Only me, on my machine | Your whole team, live | Your team, in Cursor |
| What you have to change | Nothing | Your workflow moves into Delta | Where your code is hosted |

Mine doesn't store any conversation. It only points at where it already is. That's also its limits: it's only as fine as a commit, it only works on my machine, and if the chat is deleted the link goes nowhere. For one person running a lot of agents, that's enough. For a team that reviews agent work together, Delta or Origin is the real thing.

## Build your own in five lines

If you use Claude Code, save this as `.git/hooks/prepare-commit-msg` in a repo and make it executable:

```sh
#!/bin/sh
# Stamp the Claude Code session into every commit it makes.
[ -n "$CLAUDE_CODE_SESSION_ID" ] || exit 0          # a human is committing
[ "$2" = merge ] && exit 0                          # leave merge commits alone
grep -q '^Session: ' "$1" && exit 0                 # amend: keep the original
git interpret-trailers --in-place --trailer "Session: claude:$CLAUDE_CODE_SESSION_ID" "$1"
```

Claude Code already keeps every chat on your disk, as a file named after its session ID under `~/.claude/projects/`. So when a line looks wrong, `git log -1 --format='%(trailers:key=Session,valueonly)' <commit>` gives you the ID, and that file is the why. Don't use it on public repos as is.

## The honest caveat

This isn't version control for agents. It's a sticky note on each commit that says where to look. It doesn't save the work between commits, and it doesn't help a team.

But the problem it solves is real, and I run into it every day. Code is easy to keep. What gets lost is the reason behind it.

## Commit-to-chat FAQ

{{< faq >}}
Why do AI agents undo fixes? || Each new chat starts without memory of the last one. If a fix looks odd and nothing explains it, an agent will often "clean it up", and the bug it fixed comes back.
What does the hook add to a commit? || Two lines at the bottom of the message: which chat the commit came from and which agent session made it. Only for agents, only in private repos.
Does this work with any AI coding agent? || Yes, if the agent exposes its session ID somewhere a git hook can read it. Claude Code and Codex use environment variables.
How is this different from Zed's Delta? || Delta saves every edit and the conversation together, live, for a whole team. My hook only stores a link from each commit to a chat that already exists on my machine.
{{< /faq >}}
