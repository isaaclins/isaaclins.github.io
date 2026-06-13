+++
title = "The US government just pulled Fable 5 offline"
date = 2026-06-13
draft = false
tags = ["AI", "Security", "Policy"]
complexity = "easy"
description = "The US government ordered Anthropic to suspend Fable 5 and Mythos 5 for foreign nationals. Anthropic shut them off for everyone. Here's what happened."
+++

Four days. That's how long Claude Fable 5 was generally available before the US government ordered it offline. On June 11, 2026, Anthropic [announced](https://www.anthropic.com/news/fable-mythos-access) it received an export control directive, citing national security authorities, to suspend all access to Fable 5 and Mythos 5 by **any foreign national, inside or outside the United States**, including Anthropic's own foreign national employees. Since there's no practical way to verify the nationality of every user, the net effect is that both models are now disabled for *everyone*. All other Claude models keep running.

## What the government's concern actually is

The directive landed at 5:21pm ET and, per Anthropic, didn't spell out the specific national security concern. Their understanding: the US government believes it found a method of "jailbreaking" Fable 5, the model whose entire selling point was having the strongest safeguards Anthropic has ever shipped.

The technique, as described, is almost comically mundane: ask the model to read a specific codebase and fix any software flaws. Anthropic reviewed a demonstration and says it surfaced a small number of previously known, minor vulnerabilities, the kind other publicly available models (they name OpenAI's GPT-5.5) can find without any bypass at all, and the kind defenders use every day to keep systems safe.

## Anthropic's defense, in short

Anthropic isn't disputing that a narrow jailbreak might exist. Their position from [launch day](/blog/claude-fable-5-mythos-5/) was always that perfect jailbreak resistance isn't currently possible for *any* provider. What they claim instead:

- Fable's safeguards were red-teamed for thousands of hours by the US government, UK AISI, third parties, and internal teams before launch, and tested as substantially more effective than any previously deployed model.
- Nobody has found a **universal** jailbreak, one that broadly unblocks cyber capabilities. What the US government has shown them, verbally, is a narrow, non-universal one.
- The defense in depth strategy (classifiers, monitoring, the controversial 30-day data retention) exists precisely because narrow jailbreaks are expected. Detect, mitigate, move on.
- No disclosed potential jailbreak has produced a harmful result or Mythos-specific uplift.

Their sharpest line: if "someone found a narrow jailbreak" became the recall standard, it would essentially halt all new model deployments for every frontier provider.

## The part worth paying attention to

Anthropic is complying, but pointedly notes it has [argued publicly](https://www.anthropic.com/policy-on-the-ai-exponential) that governments *should* be able to block unsafe deployments, through a statutory process that is transparent, fair, clear, and grounded in technical facts. Then the kicker: "This action does not adhere to those principles."

That's a company telling the US government: we asked for AI regulation, and this isn't what regulation is supposed to look like. A directive with no specifics, no published evidence, and no apparent process, recalling a model deployed to hundreds of millions of people over a bug-finding capability you can get elsewhere today.

## What it means for you

Practically: new Claude sessions run on your default model or Opus 4.8, existing Fable 5 sessions end with an error, and API requests to Fable 5 return errors until further notice. If you built anything on `claude-fable-5`, point it at another model now.

## My read

The first government recall of a deployed frontier model was always going to set the precedent, and this is a strange one to set. The model that got pulled is, by every published test, the *hardest to misuse* model on the market, recalled over a capability that its less-guarded competitors offer freely. If the evidence matches Anthropic's description, the directive punishes the provider that invested most in safeguards while leaving everyone else untouched, which is exactly backwards as an incentive.

The caveat: we only have Anthropic's side. The US government hasn't published anything, and "the letter did not provide specific details" cuts both ways; maybe the process is broken, or maybe there's a classified concern Anthropic can't see or can't mention. Anthropic promised more details within 24 hours. Until then, the most capable generally available model in the world is switched off, and the off switch turned out to be a letter.

Source: [Anthropic: Statement on the US government directive to suspend access to Fable 5 and Mythos 5](https://www.anthropic.com/news/fable-mythos-access)
