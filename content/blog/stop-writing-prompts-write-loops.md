+++
title = "Stop writing prompts for your coding agent. Write the loop that prompts it."
date = 2026-06-18
draft = false
tags = ["AI", "Dev", "Coding Agents"]
complexity = "medium"
description = "The new move isn't a better prompt. It's a loop that prompts the agent for you — writes the code, gets it reviewed, fixes the notes, and runs again. Theo argues most of your agent runs shouldn't use prompts you wrote at all."
+++

Here's a line that sounds insane until you've actually done it: *the majority of your agent runs should probably not be running with prompts that you wrote.* That's Theo (of [t3.gg](https://www.youtube.com/@t3dotgg)), in a video he basically titled with a shrug — ["I guess we're writing loops now?"](https://youtu.be/iJVJwmCKW9o) — admitting he was wrong about a thing he never thought he'd come around on.

Read that again. Not "write better prompts." Not "use more sub-agents." The claim is that the prompt — the thing we've spent two years learning to craft — should mostly be written *by the agent, for the agent.* You stop being the person typing instructions and become the person who designs the **loop** that types them.

A loop here just means a little cycle the agent runs on its own: do the work, check the work, fix what's wrong, do it again — without you in the middle copy-pasting between steps. That's the whole idea, and it's a bigger shift than it looks. Let me walk through why he changed his mind.

## You were always the one running the loop — you just didn't notice

Think about how you actually use a coding agent today. You ask it for a plan. You read the plan, say "yeah, looks good," tell it to do part one, then part two. It finishes, so you spin up a second agent to review the first one. You copy the review back to the first agent. You wait. You merge.

That's a loop. A real one, with review steps and feedback and re-runs. The catch is **you're the loop**. You're the one carrying context from step to step, doing the handholding, making sure each agent knows enough to do its job. Every link in that chain is a human copy-paste.

The idea going around — kicked off by developer Peter Steinberger's [one-line post](https://x.com/steipete/status/2063697162748260627) ("you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents") — is that the copy-paste is the part worth deleting. Boris Cherny, who built [Claude Code](/blog/git-wasnt-built-for-agents/), [put it more bluntly](https://officechai.com/ai/i-now-just-write-loops-to-prompt-claude-code-claude-code-creator-boris-cherny/): "I don't prompt Claude anymore. I have loops that are running. They're the ones that are prompting Claude." Theo was the skeptic in the room. Now he's not.

## The loop has been getting tighter for years, and you're at the next notch

Theo frames this against Anthropic's essay on [recursive self-improvement](https://www.anthropic.com/institute/recursive-self-improvement) — "recursive" just meaning the thing improves itself, then uses that improvement to improve faster. The essay's real gift is a clean picture of how the *work* has changed shape over time. Each step shortened the distance between you and the code:

![A left-to-right diagram: a person and computer, then a chatbot with copy-paste, then an IDE where the model edits code directly, then workflows spinning up sub-agents — leading into a large accented circular loop on the right where an agent writes, audits, and re-runs its own work, spawning two smaller sub-loops.](/images/svg/agent-loop-evolution.svg)

First you typed every line yourself. Then chatbots showed up and "coding" became *ask a question, copy the answer into your editor, ask the next one* — the copy-paste meme made literal. Then the IDE and the terminal let the model [edit your files directly](/blog/building-a-codex-style-coding-app/), so the copy-paste went away and that's roughly where most people still sit. Then came workflows and sub-agents: you tell one agent to spin up five others and split the work itself.

The notch Theo's pointing at is the next one. The agent doesn't just spin up helpers — **it audits its own output and feeds the result back in to run again. And again.** The human's job keeps moving up the stack: from typing, to reviewing, to setting direction and walking away. Anthropic says Claude now writes [more than 80% of the code](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-says-claude-now-writes-more-than-80-percent-of-its-merged-code) merged into its own systems. The loop is already mostly closed inside the company building it.

## "My loops created loops" — the part that's actually wild

The line that stuck with me: Theo asked his agent to *build him a loop*, and the agent built a loop that builds more loops.

Here's the real example. He was doing a big refactor that was too large for one pull request (a "PR" is the formal "please review my code before it ships" bundle). So he asked the agent a question you'd ask a senior engineer: which of these features should ship separately, which should stack on each other, would it be realistic to do this in one PR? It said no — at least three PRs, mostly stacked. He had it write up a plan for each.

Then the message he says "impacted my psychosis the most": *could you make a workflow that spins up a thread to file the first PR, spins up another thread to review it, loops on the review comments until it's approved, then merges it and triggers the next one?*

He didn't think it would work. It did. The agent rigged a heartbeat — waking every few minutes, checking which PRs were filed, opening a fresh review thread whenever new code appeared, sending the findings back, re-reviewing after fixes, then pulling the latest code before starting the next piece. He kicked it off at 2:29am and went to sleep. He woke up to **four stacked PRs, reviewed to hell and back, all merged.**

The cool part isn't that it ran overnight. It's that *nothing was hardcoded*. He didn't pre-script a "reviewer persona" or a "merger persona" in some markdown file — Theo thinks that whole pattern of inventing fake job titles for your agents misses the point of agents, which is that they're **dynamic**. The shape of the loop got generated from the shape of *this specific problem*. His loop made sub-loops tailored to the work, on the fly. That's the thing to sit with.

## The spicy reframe: you're looking at the code too early

So how do you find your own loops? Theo's recipe is almost embarrassingly simple: **pay attention to what you do *after* the agent finishes, and tell the agent to do those steps too.**

For him the after-steps were always the same. Run the dev server. Check that it works. Commit. Push. Open a PR. Wait for the code-review bots to leave comments. Address the comments. Ask a teammate. Address that. Merge. Every one of those is a thing the agent can now do — start the server, verify with computer use, commit once it's confirmed, file the PR, even read its own review comments and fix them.

Then he says the spicy version out loud: **we are looking at the code too early.** If you read your agent's code *before another agent has reviewed it*, you're wasting your own time. That's time the agent could have spent fixing the obvious stuff itself. How often have you skimmed AI output, gone "that's obviously wrong," and told it to fix the thing it would have caught on its own review pass? Let it catch that first. When you finally show up, the junk is gone and you're left with only the hard, interesting decisions. The reframe is the same one [Zed and Cursor are making about version control](/blog/git-wasnt-built-for-agents/): the manual ritual we built around the work was a workaround, and the workaround can melt away.

This isn't full autonomy, and Theo is careful to say so. He's not claiming you write one loop and never look again. He still writes prompts — he just writes the *first* ones and lets the loop write the rest. The human stays in the system. They just stop being the part that copy-pastes.

## The honest caveat: this burns tokens like a furnace

Now the part the hype posts skip. **Loops are expensive.** When an agent prompts itself over and over, every cycle is more tokens — and if it wanders down a wrong path, it'll happily burn tokens going the wrong way for hours before anyone notices.

Theo's own numbers are the warning label. One review bot spent under ten minutes leaving feedback on three small comments. The loop that addressed them ran for **eight hours and over three million tokens.** Across all his machines this month he's clocked roughly **$10,000 of inference** — which he doesn't pay, because he's on flat-rate subscription plans where that usage is effectively free past the monthly fee. But flip it around: **if you're paying metered API prices, don't do loops yet.** You'll torch your budget. The math only works on the heavy subscription tiers, where the rate limit is the only ceiling and unused capacity is just money you left on the table. Same warning goes for anything that lets one thread grind forever — both Claude Code and Codex now ship a [`/goal` primitive](https://github.com/jthack/claude-goal) that keeps an agent working until a finish condition is met. Powerful. Also a great way to spend a fortune in your sleep.

And the obvious one: don't point this at production code with millions of users. Not yet. Theo wouldn't either. This is for the side projects, the big refactors, the "I didn't think this was possible" experiments — the places where a broken 6:50am editor is a funny story, not an outage.

## What this actually changes about your Tuesday

Strip the excitement and it's one new habit. Next time your agent finishes a task, don't reach for the keyboard. Watch what you'd do next — and ask the agent if *it* can do that part. Run it. Check it. Review it. Fix the review. You'll be surprised how much of your day was you being a very expensive copy-paste machine between two robots.

The unit of work has been quietly shrinking for years: from the keystroke, to the prompt, to the loop. We spent two years getting good at writing prompts. The skill that's starting to matter more is noticing the loop you're already running by hand — and handing it over. That's the save button losing its grip all over again, one cycle at a time.

## Writing loops for coding agents FAQ

{{< faq >}}
What does "writing loops" mean for coding agents? || It means building a small repeating cycle the agent runs on its own — write code, get it reviewed, fix the notes, run again — instead of you manually prompting it at each step. You design the loop once; the loop does the prompting.
Should I stop prompting my agent entirely? || No. You still write the first prompts and set the goal. The argument is that *most* of the individual runs after that should be triggered by the loop, not typed by you — so you stop being the copy-paste in the middle.
What does "we're looking at the code too early" mean? || If you read your agent's output before another agent has reviewed it, you're spending your time on mistakes the agent could have caught itself. Let an agent review and fix first, then look — so you only deal with the hard parts.
Why shouldn't I write loops on API pricing? || Loops re-prompt the agent many times, so they burn far more tokens than a single run — one of Theo's loops used over three million tokens on three small comments. On metered API prices that gets expensive fast; it only makes sense on flat-rate subscription plans.
What is the /goal command in Claude Code and Codex? || A built-in feature that keeps a single agent working toward a finish condition across many turns, re-checking "am I done?" after each one. It's a simpler, linear cousin of a dynamic loop — useful for long single-thread tasks, but it can run up a big bill if left unattended.
{{< /faq >}}
