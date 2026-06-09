+++
title = "Claude Fable 5 and Mythos 5: what Anthropic actually shipped"
date = 2026-06-09
draft = false
tags = ["AI", "Security"]
complexity = "medium"
description = "Claude Fable 5 and Mythos 5 explained: Anthropic's new Mythos class models, what they can do, the safeguards behind them, and what they cost."
+++

On June 9, 2026, Anthropic launched two models at once: **Claude Fable 5**, available to everyone, and **Claude Mythos 5**, locked to a small set of vetted partners. They're the same underlying model. The only thing separating them is which safeguards are switched on. Here's a plain rundown of what dropped, minus the launch day adjectives.

## "Mythos class": a new tier above Opus

Anthropic now sorts its models into classes: Haiku, Sonnet, Opus, and, new as of a couple of months ago, **Mythos**. Mythos class sits above Opus in raw capability. The first one, Claude Mythos Preview, went out in April to a limited group of cyber defenders through something called Project Glasswing. Fable 5 and Mythos 5 are the next step.

The naming is the interesting part, because Fable and Mythos are the *same model*. "Fable" comes from the Latin *fabula*, "that which is told"; "mythos" is its Greek cousin. The difference isn't the weights, it's the guardrails. Fable ships with a full set of safety classifiers turned on. Mythos has some of them lifted, and only goes to people Anthropic has explicitly trusted.

## What it can do

By Anthropic's own benchmarks, Fable 5 is their most capable generally available model to date. It's state of the art on nearly every test they ran, and the lead grows the longer and more complex the task. A few of the headline claims:

* **Coding:** Stripe reportedly used it to run a migration across an entire 50 million line Ruby codebase in a single day, work they estimate would've taken a team over two months by hand. It also tops Cognition's FrontierCode eval.
* **Knowledge work:** the highest score yet on Hebbia's senior level finance benchmark; IMC says it aced their trading analysis evals nearly across the board.
* **Vision:** it rebuilt a web app's source code from screenshots alone, and beat Pokémon FireRed using only raw game screenshots, with no maps and no helper harness. Earlier Claudes needed a whole scaffolding rig just to play.
* **Memory:** it stays coherent across millions of tokens, and with memory stored in files it reached the final act of *Slay the Spire* three times as often as Opus 4.8.
* **Science:** with Mythos 5, Anthropic's protein team says they sped up parts of drug design roughly 10x, and the model produced molecular biology hypotheses their scientists preferred around 80% of the time in blind comparisons. One was later corroborated by an outside lab.

Take the specific numbers as vendor claims. They're genuinely impressive, but they're Anthropic's framing on Anthropic's evals.

## The reason there are two models: safety

This is the part that actually explains the launch. Mythos class models are good enough at cybersecurity and biology that, without limits, they could meaningfully help a bad actor cause real damage, the *uplift* problem. And much of the dangerous stuff is dual use: the exact query that helps a security researcher or a biologist also helps someone with worse intentions.

So Fable 5 ships with **classifiers**: separate AI systems watching for misuse and jailbreak attempts. When one fires, your request isn't refused outright; it gets quietly handled by **Claude Opus 4.8** instead, and you're told it happened. Three areas trigger that fallback:

1. **Cybersecurity:** anything resembling exploit development or agentic hacking (recon, lateral movement, and so on).
2. **Biology and chemistry:** currently tuned broadly, so most bio/chem requests fall back for now.
3. **Distillation:** attempts to extract the model's capabilities to train competing models.

Anthropic is upfront that the safeguards are deliberately over tight and will catch some harmless requests. But they say fallback triggers in under 5% of sessions, and that 95%+ of Fable sessions never hit it at all, meaning for most people Fable performs like Mythos. On robustness, they ran a 1,000+ hour external bug bounty that turned up no universal jailbreak, though they note the UK AI Safety Institute made early progress toward one in a short testing window. Worth watching.

## Mythos 5, Glasswing, and "trusted access"

Mythos 5, the same model with cyber safeguards off, goes only to people already in Project Glasswing: cyber defenders and critical infrastructure providers, in collaboration with the US government. Anthropic frames it as the strongest cybersecurity model in the world, which is precisely why it's gated. They're also planning a separate trusted access track for biology researchers (Fable with the bio/chem safeguards lifted) and a more formal application process for security organizations.

There's also a **data policy change** worth flagging: all Mythos class traffic now gets 30 day retention, on both Anthropic's own surfaces and third party ones. They say it won't be used for training, only for catching novel attacks and reducing false positives, with logged access and deletion after 30 days. If you're an enterprise, read that one closely.

## Price and how to actually get it

Pricing is **$10 per million input tokens / $50 per million output**, less than half what Mythos Preview cost. On the API and consumption based Enterprise plans, Fable 5 is fully available today.

Subscription plans are messier, because Anthropic expects demand to outrun capacity:

* **From today to June 22:** included free on Pro, Max, Team, and seat based Enterprise.
* **June 23:** pulled from those plans; using it after that needs usage credits.
* **Later:** once capacity allows, they intend to fold it back into standard subscriptions.

## My read

Strip the superlatives and the shape of the launch is the story: Anthropic built one very capable model and shipped it as two products that differ only in what they'll let you do. The capability jump looks real. The more telling move is that the safety scaffolding (classifiers, fallback, gated access, retention) is now a first class part of the product rather than a footnote. The open question is the false positive rate. "Sometimes blocks harmless requests" is an easy line to write on launch day; whether it stays a rare annoyance or becomes a daily one is the thing to watch over the next few weeks.

Source: [Anthropic: Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
