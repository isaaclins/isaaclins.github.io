+++
title = "Why SpaceX paid $60 billion for a VSCode fork"
date = 2026-06-17
draft = false
tags = ["Dev", "AI", "Cursor", "SpaceX"]
complexity = "medium"
description = "SpaceX bought Cursor for $60 billion in shares, not cash. They didn't really want the code editor. They wanted the millions of people coding inside it, and the data they create."
+++

On June 16, 2026, SpaceX [signed the papers to buy Cursor](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/) for **$60 billion** — paid entirely in SpaceX shares, not cash. A rocket company bought a code editor. And not a flashy one: Cursor is basically Microsoft's free VSCode editor with really good autocomplete bolted on.

Sixty billion dollars. For that. Sit with it for a second, then let me explain why it's the smartest thing Mr. Musk has done all year.

## The number doesn't make sense until you watch it grow

A few years ago Cursor was worth almost nothing. Then this happened. Each bar below is one round of fundraising — startups raise money in rounds they label A, then B, then C — and the number is what investors said the whole company was worth at the time:

{{< bar-chart caption="Cursor / Anysphere valuation by round" prefix="$" suffix="B" >}}
Series B | 2.6 | Dec 2024
Series C | 9 | May 2025
Series D | 29.3 | Late 2025
SpaceX buyout | 60 | Jun 2026
{{< /bar-chart >}}

It was about to raise even more — a $2 billion round from big-name investors that would have valued it at over **$50 billion** — when SpaceX [walked in and grabbed it first](https://siliconangle.com/2026/04/22/spacex-partners-cursor-ai-training-floats-potential-60b-acquisition/).

The money coming in grew just as fast. Roughly $100 million a year in January 2025. A billion a year by November. **[Four billion a year by June 2026](https://www.tradingkey.com/analysis/stocks/us-stocks/261970297-spacex-spcx-cursor-arr-acquire-tradingkey#bikqofguqh)**, most of it from big companies, with more than half of the 500 biggest US firms using it somewhere. So $60 billion isn't actually crazy: for the fastest-growing developer tool ever, investors were paying about $15 for every $1 it makes in a year — which is almost... normal.

But that math isn't why Musk wrote the check.

## Who actually bought what (and how they paid)

Quick note on the company side, because it matters. This wasn't xAI, Musk's AI company. Earlier in 2026, SpaceX swallowed xAI, so **SpaceX** is the name on the paperwork — and it's buying all of Cursor outright. The deal should be final by **autumn 2026**, once regulators approve it.

Here's the clever bit. SpaceX paid in its own shares, and four days earlier it had just created a giant new pile of them. On June 12, SpaceX [sold shares to the public for the first time](https://www.npr.org/2026/06/11/nx-s1-5853199/spacex-ipo-price-elon-musk) — going onto the stock market under the ticker SPCX — selling about 555 million shares at $135 each to raise **$75 billion**. That's the biggest stock-market debut in history, beating Saudi Aramco's old record. It valued the whole company at $1.77 trillion. Musk still controls more than 82% of the votes. The share price jumped from $135 to over $200 within days.

So the order of events is: go public, create a trillion dollars' worth of shares, then spend $60 billion of those brand-new shares on Cursor without touching a single dollar of real cash. Going public *was* how they paid for Cursor. That timing isn't luck. That's the plan.

## They didn't buy the editor. They bought you.

Now the real reason. The **same morning** the deal was signed, SpaceX started rolling out **Grok V9-Medium**, a [new coding AI](/blog/native-moe-multimodal-llms/) about three times bigger than the one Grok runs on today — and it was [trained on real recordings of people coding inside Cursor](https://interestingengineering.com/culture/spacex-cursor-acquisition-coding-platform-60-billion#h-data-powers-expansion).

Read that again. Not on public code from GitHub. Public code shows you the finished product — the tidy final version, with all the messy work erased. What it *doesn't* show you is the part that actually matters for teaching an AI to code: how a real engineer takes a vague request, pokes around a codebase they've never seen, reacts when the AI gets it wrong, and nudges it back on track over an hour-long session. You can't get that anywhere public. It exists in exactly one place: inside a tool that a million skilled developers already trust enough to use all day.

There's even a name for the trick. Cursor's team trains the AI to squeeze a huge pile of working notes down to a tiny summary, then tests whether it can keep going without forgetting anything important. Drop a key detail — a name, a bug it fixed earlier — and it fails and gets penalized. Over millions of real sessions, the AI slowly learns *what's worth remembering* and what's junk. You can't fake that with made-up practice problems.

That's the prize. SpaceX didn't buy a VSCode clone. It bought both the factory that produces this rare data *and* the storefront to deliver the finished AI — plus a million experts refilling the tank every single day. The editor is just the bucket the data drips into.

## The irony nobody at SpaceX will say out loud

Cursor's whole appeal was that it didn't take sides: you could pick whichever AI you wanted — Claude, GPT, or Cursor's own — whatever did the job best. Lots of big companies chose Cursor *specifically* so they could keep their private code with [Anthropic's Claude](/blog/claude-fable-5-mythos-5/), which had the best reputation for not leaking your data. Being neutral was the entire selling point.

It's now owned by a company that makes a rival AI and has every reason to bury the competition. Musk's Grok team [lost $6.35 billion in 2025](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm). Every time someone in Cursor uses Claude, that money flows to Anthropic instead of SpaceX. Nothing's been announced yet. But "nothing announced" and "owned by your competitor with a $6 billion hole to fill" don't sit still for long.

My favorite detail: SpaceX's first giant AI computer (nicknamed Colossus) was such a mismatched mess that they reportedly [handed it to Anthropic](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm) to run its AI on, and built a clean second one just to train Grok. So Anthropic is running on Musk's hand-me-down computers while Musk buys the app that mostly serves Anthropic's AI. Everyone is feeding everyone. Nobody's comfortable.

## If you pay them $20 a month

Short version: nothing changes today, but keep your eyes open. Cursor keeps running on its own until the deal is final (autumn 2026). After that, watch which AI becomes the default, watch which one stays free and which one suddenly costs extra, and watch the privacy fine print for companies. The thing that made Cursor worth choosing — staying neutral — is exactly the thing a new owner with its own AI to sell has every reason to chip away at. Cursor was never shy about charging, even as a scrappy startup. Now that instinct has a trillion-dollar company behind it.

## The part that's actually interesting

While everyone argues about the price, the more important thing Cursor quietly launched is **Origin**, which it calls ["a git forge for the agentic era"](https://cursor.com/origin) — basically a GitHub built for a world where AI writes the code. Around the same time, Zed announced **DeltaDB**, chasing the same idea from the other end. Both are betting that Git — the code-tracking tool from 2005, built for a human typing every line — is the wrong fit for a world where AI writes code by chatting with you.

That's a bigger deal than who owns the editor, and it earns its own post. So I wrote one: [**Git wasn't built for agents →**](/blog/git-wasnt-built-for-agents/)

## SpaceX–Cursor acquisition FAQ

{{< faq >}}
How much did SpaceX pay for Cursor? || **$60 billion**, paid in SpaceX shares instead of cash. The papers were signed on June 16, 2026, and the deal should be final by autumn 2026 once regulators approve it.
Why did SpaceX buy Cursor? || For the data. The million people coding inside Cursor every day create exactly the kind of real-world recordings SpaceX needs to teach its Grok AI how to code — something you can't get from public code on GitHub.
Who owns Cursor now? || Cursor is made by a company called Anysphere. SpaceX (which merged with Musk's AI company, xAI, in 2026) is buying it. Until the deal is final, Anysphere still runs on its own.
Can I still use Claude and GPT in Cursor? || For now, yes — Cursor still lets you pick any AI. After the deal closes, watch whether Grok quietly becomes the default and whether Claude and GPT get harder to reach.
When does the SpaceX–Cursor deal close? || Around autumn 2026, once regulators approve it. SpaceX paid for it using the $75 billion it raised by going public days earlier.
{{< /faq >}}
