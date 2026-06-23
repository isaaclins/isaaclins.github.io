+++
title = "How to tokenmaxx in Claude"
date = 2026-06-22
draft = false
tags = ["AI", "Productivity", "Claude Code", "Prompting"]
complexity = "medium"
description = "Online, tokenmaxxing means burning more tokens to look productive. Real tokenmaxxing is the opposite: more thinking per token. With a prompt you can paste."
+++

Search **tokenmaxxing** and you get a workplace metric: the more tokens you burn through your AI, the more productive you must be. People [keep score with it](https://en.wikipedia.org/wiki/Token_maxxing), and at least one developer brags about 50 billion tokens a year and tells you to spend as much on AI as you do on rent.

That is exactly backwards. Burning tokens is the easy part. Run five agents at once, write bloated prompts, let the model re-read your whole repo every single morning, and the meter spins beautifully. You get a huge bill, a context window (the model's short-term memory) stuffed with junk, and worse output for it. High score, nothing to show for it.

Real **tokenmaxxing** is the opposite. The most *thinking* per token, not the most tokens. You keep the model sharp and spend its budget on the problem you actually have, not on relearning what it already knew yesterday. And the way you get there runs backwards from what you would expect too. You do not go collect tools. You hand Claude your problems and let it build them.

## The fix you reach for is the one making it worse

When Claude underperforms, the instinct is to go shopping. Install the skill everyone posted about this week. Bolt on three MCP servers (an [MCP server](/blog/model-context-protocol/) is just a plugin that hands the model new tools, like a connector to your database or your calendar). Hoard whatever is trending, because surely the new thing is the missing piece.

But a pile of tools you do not use is not free. The model reads them. Every unused skill and dangling connector is noise it pays an attention-tax on, and none of it touches the thing actually slowing you down.

The reframe: the highest-leverage thing you can type is not a solution. It is a clear problem. Because at Opus 4.8 and up, Claude is a better prompt engineer than most humans. I noticed it first with [Fable](/blog/claude-fable-5-mythos-5/), and when I rolled back to Opus it was still there. Maybe it was always there. Either way, stop trying to out-prompt the thing that prompts for a living. Describe the friction. Let it design the path.

## Bad output? The problem is upstream of your prompt

You ask for a feature. The answer is mediocre. Your instinct is to rewrite the prompt, add detail, try again. Sometimes that works. More often the real problem is that you handed Claude a solution ("add a caching layer here") when you should have handed it a symptom ("this page takes four seconds to load").

Lead with the symptom, not the cure. Let it investigate, find the cause, and pick the fix, because that is the part it is genuinely good at now. And when a job is big, have it delegate: push the noisy search-and-read grind into a [subagent](https://code.claude.com/docs/en/sub-agents) that works in its own context and reports back only the summary. That is tokenmaxxing in one move. The verbose work happens somewhere else, and your main conversation stays clean and sharp instead of drowning in file dumps you will never read twice.

## The same procedure, every time? Make it a skill

Some of what you repeat is not a one-line rule, it is a whole procedure. Refactor every new component into your house syntax. Migrate an old module to the new pattern. Build this feature test-first because the team committed to TDD (writing the test before the code it checks). Each of those is a method, with steps and judgment calls and a definition of done, and re-explaining the whole method from scratch every time is its own tax.

That is what a [skill](https://code.claude.com/docs/en/skills) is for. A skill is a packaged procedure (a folder with a `SKILL.md` that spells out how to do one recurring job well) that Claude loads only when that job comes up. You teach it the playbook once, this is how we refactor to our syntax, this is how we TDD here, and after that you point at the task and the method comes with it.

One catch most people miss: a skill Claude does not know to use is just a file sitting on disk. In your project instructions, tell it to reach for skills proactively rather than hoard them. "Use the TDD skill whenever I ask for a new feature" beats hoping it remembers the team rule on its own. The payoff is real, but only once you give it permission to invoke them without being asked.

## Claude re-reads your whole repo every morning? Cache it

Back to the opening scene. The fix is two [hooks](https://code.claude.com/docs/en/hooks), which are small scripts Claude Code runs automatically at set moments in its lifecycle.

One fires when a session starts. One fires when it ends. Between them they maintain a single gitignored file, `CLAUDE.local.md`, that holds a map of the repo: what lives where, how to build and test it, the gotchas that always trip you up. That file gets loaded automatically at the start of every session.

When you change the project, the end-of-session hook notices and quietly refreshes the map in the background. So the next session, Claude starts already knowing the place. The ground stays where it is, and it gets to spend its first tokens on your actual task instead of rediscovering that your config file is called `config.toml` and not `hugo.toml`.

Here is the tell: I did not write those hooks by hand. I told Claude the friction, "you re-scan my repo every session, make that stop," and it designed the whole thing, the file format and the background refresh and the safety guards. Which is exactly the point of the last section.

## Flying blind on usage? Put it on the dashboard

You cannot tokenmaxx what you cannot see. By default you do not know how much of your five-hour usage window you have burned, how full the context is, or what today has cost.

A custom [status line](https://code.claude.com/docs/en/statusline) (the strip of info at the bottom of the terminal) fixes that. Mine shows, live: how much of the session limit I have used and when it resets, how full the context window is, what today cost, and the model's current reasoning effort.

Once it is on screen, you start making different choices. You watch the context creep toward full and you wrap up or split the task before it goes dull. You see the window almost spent and you save the heavy job for after the reset. Visibility turns tokenmaxxing from a vague intention into a decision you make on purpose.

## You don't copy the harness. You copy the problem.

Notice what every fix above had in common. I did not download any of them. I described a friction in plain words and let Claude build the tool, shaped to my machine. The delegation habit, the cache, the status line, all of it started as one sentence about something annoying.

So do not copy my scripts. Copy the move. Paste this into Claude Code, in any project, and let it stand up the same harness for you:

```text
I want to tokenmaxx my Claude Code setup: stop wasting tokens and keep
your context sharp. Three frictions to fix.

1. You re-scan my whole repo every session. Build a SessionStart + Stop
   hook pair that keeps a gitignored CLAUDE.local.md cache of how this
   repo is structured (purpose, layout, build and test commands,
   gotchas), and refreshes it in the background when the project
   changes, so fresh sessions start informed.

2. I fly blind on usage. Add a custom status line showing my five-hour
   usage and reset time, context-window fill, today's cost, and current
   reasoning effort.

3. Keep the main context lean. Set up an operating mode where you
   delegate heavy search-and-read work to subagents.

Figure out the implementation yourself, ask me only the decisions you
genuinely cannot make, and verify each piece works before moving on.
```

It will ask you a couple of questions, look around, and build the hooks, the cache, and the status line itself, then check that each one runs. You review, you keep what helps, you throw away what does not. That is the whole skill: not knowing the answer, knowing the friction.

## The honest caveat

Bespoke tooling breaks. A hook that errors can wedge a session until you fix it. The background refresh I mentioned spends tokens too, since it is an extra model run after your turn, so throttle it (mine caps at a few per hour) or it quietly eats the savings it was meant to create. And a cache that drifts out of date is worse than no cache, because it confidently tells the next session something that is no longer true. Build it, then watch it for a week before you trust it.

But the diagnosis holds. Ignore the scoreboard. The model is going to open your project tomorrow morning regardless, and the only thing worth maxxing is what it spends that first thought on. Make it your problem, not your file tree.

## Tokenmaxxing in Claude FAQ

{{< faq >}}
What does tokenmaxxing mean? || Online it usually means burning as many tokens as possible to look productive. This post uses it the other way: getting the most useful work out of each token, by not wasting the model's budget re-learning context and keeping its window lean so it stays sharp.
Do I need to be a programmer to set this up? || No. The whole point is that you describe the friction in plain words and let Claude build the hooks, cache, and status line for you, then verify them. You review the result.
What is a Claude Code hook? || A small script Claude Code runs automatically at a set moment, like when a session starts or ends. See the [hooks reference](https://code.claude.com/docs/en/hooks).
What is CLAUDE.local.md? || A gitignored file in your repo that holds a cached map of the project, so a fresh session starts already knowing the layout instead of re-reading every file.
Should I install every new skill and MCP server I see? || No. Unused tools are noise the model pays attention to for nothing. Add a tool when it solves a friction you actually have, not because it is trending this week.
{{< /faq >}}
