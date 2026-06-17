+++
title = "Why SpaceX paid $60 billion for a VSCode fork"
date = 2026-06-17
draft = false
tags = ["Dev", "AI"]
complexity = "medium"
description = "SpaceX bought Cursor for $60B all-stock. It's not the editor they wanted. It's the million developers inside it, and the workflow data they generate every day."
+++

On June 16, 2026, SpaceX signed a [definitive $60 billion all-stock agreement](https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/) to buy Anysphere, the company behind **Cursor**. A rocket company bought a code editor. A code editor that is, at its core, a [fork of VSCode](/blog/cursor-ide-a-developers-double-edged-sword/) with a very good autocomplete strapped on.

Sixty billion dollars. For a fork. Let that sit for a second, then let me explain why it's the most rational thing Mr. Musk has done all year.

## The number doesn't make sense until you watch it grow

Cursor's valuation history reads like a typo that kept going. Each bar is a funding round (a "Series" is just the next lettered raise a startup takes — A, then B, then C); the value is the valuation that round set:

{{< bar-chart caption="Cursor / Anysphere valuation by round" prefix="$" suffix="B" >}}
Series B | 2.6 | Dec 2024
Series C | 9 | May 2025
Series D | 29.3 | Late 2025
SpaceX buyout | 60 | Jun 2026
{{< /bar-chart >}}

It was even lining up a $2B round from a16z, Thrive and Nvidia at **$50B+** in spring 2026, before SpaceX [walked in and pre-empted the whole thing](https://siliconangle.com/2026/04/22/spacex-partners-cursor-ai-training-floats-potential-60b-acquisition/).

The revenue did the same trick. $100M ARR in January 2025. $1B by November. **[$4B annualized by June 2026](https://www.tradingkey.com/analysis/stocks/us-stocks/261970297-spacex-spcx-cursor-arr-acquire-tradingkey#bikqofguqh)**, enterprise-driven, with more than half the Fortune 500 running it somewhere. So no, $60B for "a VSCode fork" is not insane on the multiple. ~15x forward revenue for the fastest-growing dev tool in history is almost _boring_.

But multiples aren't why Musk wrote the check.

## SpaceX, not xAI, and the IPO that paid for it

First, the corporate plumbing, because it matters. This wasn't xAI. **SpaceX** absorbed xAI earlier in 2026, and SpaceX is the entity on the merger agreement. The acquisition vehicle is a wholly-owned subsidiary that merges into Cursor; close is expected in Q3 2026 pending regulators.

Here's the elegant part: it's **all stock**, and four days earlier SpaceX had just printed a brand-new pile of it. On June 12, SpaceX [IPO'd on the Nasdaq under SPCX](https://www.npr.org/2026/06/11/nx-s1-5853199/spacex-ipo-price-elon-musk), selling 555,555,555 shares at $135 to raise **$75 billion**, the biggest IPO ever, blowing past Saudi Aramco's old $29.4B record. Valuation: $1.77 trillion. Musk kept 82%+ voting control. The stock ran from $135 to north of $200 within days.

So the sequence is: go public, mint a trillion-plus in liquid currency, then spend $60B of freshly-minted paper on Cursor without touching a dollar of cash. The IPO _was_ the funding round for the acquisition. That's not a coincidence of timing. That's the plan.

## They didn't buy the editor. They bought you.

Now the real reason. On the **same morning** the deal was signed, SpaceX started shipping **Grok V9-Medium**, a 1.5-trillion-parameter coding model (~3x the 500B model currently serving Grok traffic) that was [trained explicitly on real Cursor developer sessions](https://interestingengineering.com/culture/spacex-cursor-acquisition-coding-platform-60-billion#h-data-powers-expansion).

Read that again. Not on public GitHub. GitHub gives you finished code: the polished commit, the answer with the working crossed out. What it does **not** give you is the part that actually matters for training a coding agent: how a real engineer describes a vague requirement, navigates an unfamiliar codebase, reacts when the model gets it wrong, and steers it back over a 90-minute session. That signal doesn't exist in any public dataset. It exists in exactly one place: inside a tool that a million expert developers already trust enough to use all day.

There's even a named mechanism. Cursor's people call it **compaction-in-the-loop reinforcement learning**: the model is trained to crush thousands of tokens of working context down to ~1,000 tokens, then graded on whether it can keep a long-horizon task on the rails afterward. Lose a critical variable name or a past bug fix in the compression and you fail the task and eat a negative reward. The model learns _which information a developer's workflow actually needs to keep_ — and it learns it from millions of real sessions, not synthetic benchmarks.

That is the asset. SpaceX didn't buy a VSCode fork. It bought the **training pipeline and the distribution channel for the one kind of data money can't otherwise buy**, plus the million experts generating fresh batches of it every single day. The editor is just the bucket the data falls into.

## The irony nobody at SpaceX will say out loud

Cursor's entire edge with engineers was that it was **model-agnostic**. You could route a task to Claude, to GPT, or to Cursor's own Composer — whatever was best for the job. A lot of enterprises specifically picked it so they could keep sensitive code on Anthropic's Claude, which had the cleanest privacy track record. The product's neutrality _was_ the product.

It is now owned by a company that builds a directly competing model and has every financial reason to bury the competition. xAI's Grok division [lost $6.35 billion in 2025](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm). Every Cursor request routed to Claude is revenue walking straight out of SpaceX's ecosystem and into Anthropic's. No changes have been announced. But "no changes announced" and "owned by your competitor with a $6B hole to fill" are not a stable equilibrium.

My favorite detail: SpaceX's _first_ Colossus supercluster was such an inefficient mixed-architecture mess that they [reportedly handed it to Anthropic for inference capacity](https://www.techtimes.com/articles/318495/20260616/grok-v9-medium-arrives-spacex-seals-cursor-developers-face-model-choice-risk.htm) and built Colossus 2 on clean Blackwell hardware to train Grok. So Anthropic is running on Musk's hand-me-down GPUs while Musk buys the front-end that mostly serves Anthropic's model. Everyone is feeding everyone. Nobody is comfortable.

## If you pay them $20 a month

Short version: nothing changes today, and you should still pay attention. Cursor runs independently until the deal closes in Q3. After that, watch which model is the default, watch which one is "free" and which one starts costing extra, and watch the enterprise privacy language. The thing that made Cursor worth choosing — neutrality — is exactly the thing an owner with a flagship model has an incentive to erode. I've [already complained about Cursor's pricing instincts](/blog/cursor-ide-a-developers-double-edged-sword/) back when they were a startup scrounging for pennies. Now the scrounging has a trillion-dollar balance sheet behind it.

## The part that's actually interesting

While everyone argues about the price tag, the more important thing Cursor quietly shipped is **Origin**, which they're calling ["a git forge for the agentic era."](https://cursor.com/origin) Around the same time, Zed announced **DeltaDB** with the same thesis from the opposite direction. Both are betting that Git — a tool from 2005 designed around a human typing every line — is the wrong substrate for a world where agents write code through conversation.

That's a bigger deal than who owns the editor, and it deserves its own post. So I wrote one: [**Git wasn't built for agents →**](/blog/git-wasnt-built-for-agents/)
