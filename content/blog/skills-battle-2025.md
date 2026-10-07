+++
title = "I won a hacking contest with AI. Is that pay-to-win?"
date = 2025-05-07
draft = false
tags = ["Security", "AI"]
complexity = "easy"
description = "I took first at the IT Skills Battle 2025 hacking contest with AI agents doing the grunt work. The edge wasn't money. It was explaining the problem well."
+++

My boss thought it would be a "good idea" if I entered the IT Skills Battle, a hacking competition for people who work in IT. So I signed up. I didn't expect much.

I finished in **first place**.

And I'm sure I wouldn't have got anywhere near the top without AI doing a lot of the work. So here's the uncomfortable question: did I win, or did my tools? Are hacking contests turning **pay-to-win**? My answer is yes, kind of. Just not in the way you'd think.

## I started dead last

The contest was a CTF, short for [capture the flag](https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)). Each challenge hides a secret piece of text, the "flag" (here it looked like `flag{...}`). You find it by breaking into something you're allowed to break into, paste it into the scoreboard, and get points. Everyone's score is on a live graph.

My start was bad. It took me **45 minutes to get a single flag**. I was distracted and all over the place, and on that live graph I was at the very bottom.

## The slow flag turned out to be the valuable one

Around 10:00, things turned. A lot of the others hit a wall and got slower with every challenge. I solved **three in a row in about 20 minutes**. Flag, flag, flag.

Then it got better. That first painful flag was one of the hardest in the whole contest, and the scoring rewarded it: the fewer people capture a flag, the more points it's worth. Those 45 minutes paid off. I shot up the leaderboard.

![Contest scoreboard: Isaaclins in first place with 2,846 points, derlenzer second with 1,750, above a line graph of the top 10 players' scores](/images/skills-battle-graph-with-points.png)

On the points scoreboard, the gap between me and second place was **1,096 points**.

On the final graph, I **tied for first with four other people**. I was the first to solve the second-to-last challenge, but it was close all the way.

![Line graph of the top 10 players' scores from 9:30 to 15:00. Five lines, including mine, end level at the top.](/images/skills-battle-graph.png)
*I'm the blue line, "Isaaclins".*

## My setup did the boring parts

I was on my MacBook with [Raycast](https://www.raycast.com/), an app launcher you open with a keyboard shortcut ([I've written about it before](/blog/raycast-its-hidden-power/)). Need to brainstorm or debug? `Ctrl+Space`, type `chat`, and ChatGPT is open. Need to look through a project's code? `Ctrl+Space`, type `g`, and GitHub is there. (Not sponsored. I just like it.)

That sounds small. It isn't. I spent zero time clicking around. My only job was to explain the problem, to myself and to the AI.

## The agents were the real cheat code

The biggest help was AI agents. (An agent is an AI that doesn't just answer you. It reads files, runs commands and tries things by itself.)

My workflow for each challenge: make a new folder, dump everything I had into it, explain the goal clearly, hit enter. That was basically it.

I ran the agents in Cursor, an AI code editor, with two custom [rules](https://cursor.com/docs/context/rules) (standing instructions the AI follows in every chat):

1. **Explain yourself.** After cracking a challenge, the AI wrote a `solve.md` file explaining how it got there. Reading it is how I actually understood the solution instead of just copying a flag.
2. **Build me a clean machine.** Instructions for setting up an Ubuntu Linux virtual machine (a fresh computer running inside mine) on demand. That saved me a good 20 minutes of fiddling every time I needed one.

The best part: I didn't even write those rules myself. I typed roughly this, and it just worked:

```
/generate-cursor-rule I'm in a CTF and will give you challenges. The flags look like this: flag{flag_content}
```

## Pay-to-win, but the currency isn't money

So yes, I think CTFs are heading toward a new kind of pay-to-win. But you can't just pay for the biggest AI model, feed it every file and wait for flags to fall out. That isn't what won it.

The edge is one question:

**"How do I explain this problem so the AI can find the way to the solution, and then explain that way back to me?"**

You treat the AI as an extension of your own thinking. It breaks big problems into small ones, does the grunt work and spots patterns you'd miss. That's how you stop getting stupid answers when the clock is running.

## What this means if you enter one

- **Set up the boring stuff before the clock starts.** Shortcuts, agent rules, a recipe for a clean machine. Every minute you don't spend clicking is a minute on the actual problem.
- **Make the AI show its work.** Without something like that `solve.md`, you walk away with points and learn nothing.
- **Put your effort into the explanation, not the model.** A clear problem description got me further than any amount of extra files would have.

## The honest part

I love CTFs. I've done them with and without AI, and without is more rewarding. But it's just not feasible anymore. I wouldn't have been anywhere near the top, or anywhere near that fast, without AI in my workflow.

Call it pay-to-win, call it adaptive thinking, call it whatever. It worked.

![A terminal window that reads "Don't hate the player, hate the game."](/images/DHTP-HTG.png)

Huge thanks to the Skills Battle organizers and everyone who played. It was a hell of a ride.

I didn't just win. I changed what winning looks like.

{{< faq >}}
What is the IT Skills Battle? || A competition for people who work in IT. The 2025 contest was a CTF, a hacking competition where you solve security challenges to find hidden "flags" and score points.
What is a CTF in cybersecurity? || Short for [capture the flag](https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)): each challenge hides a secret string (the flag) that you find by legally hacking something, then submit for points.
How did Isaac place at the IT Skills Battle 2025? || **First place**, tied with four other competitors on the final graph. On the points scoreboard he was **1,096 points** ahead of second place.
How did AI help? || ChatGPT through [Raycast](/blog/raycast-its-hidden-power/) shortcuts for brainstorming and debugging, plus AI agents in Cursor with two custom rules: one wrote a `solve.md` explaining every solution, the other set up an Ubuntu virtual machine on demand.
Are CTFs pay-to-win now? || Kind of, but not with money. The edge isn't the biggest model, it's explaining the problem well enough that the AI can solve it and explain the solution back to you.
{{< /faq >}}
