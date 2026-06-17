+++
title = "Spotify macOS native: I got tired of the stock app and built my own"
date = 2026-05-03
draft = false
tags = ["Dev"]
complexity = "medium"
description = "Spotify macOS native client Spotiglass: SwiftUI, not their Chromium shell. Why the official desktop app still loses, and what I actually shipped."
+++

Spotify macOS native. That was the bar. Not “Electron bad” Twitter wisdom. Not a rewrite of their roadmap blog for clout. I wanted music on my Mac to feel like it belongs on my Mac: SwiftUI, Keychain auth, shortcuts I own. The purple icon app was never going to be that.

Everyone yells that the desktop client is Electron. [Spotify says otherwise](https://engineering.atspotify.com/2021/04/building-the-future-of-our-desktop-apps): native binary, **CEF** for the React UI, C++ where playback hurts. Fine. Call it pedantry. It still walks like a browser with a playlist glued on. Still chews memory. Still ships UI experiments to your face. The fix isn’t arguing the label on Reddit. The fix is running something you can patch when it annoys you at 1am.

Enter **Spotiglass**. It’s on [GitHub](https://github.com/isaaclins/spotiglass) if you want the code first and my opinions second.

## What it actually is

SwiftUI for almost everything you tap. Spotify only gets a hidden `WKWebView` because they force the Web Playback SDK if you want in-app streaming. OAuth is PKCE, refresh token lives in **Keychain**, the rest is Web API calls straight from the app. No Spotiglass server, no “trust our cloud” layer. Your Mac talks to Spotify. That’s it.

⌘K opens a command palette; keybinds live in settings and you can remap them like a sane person. When I’m in a mood there’s a 10-band EQ: Core Audio nonsense, not a JavaScript fantasy. The stock app sure wasn’t going to give me that.

If that “pick native tools” rant sounds familiar, same vibe as when I fell down the [Ghostty + Fish](/blog/ghostty-fish-perfect-combination/) rabbit hole: stop accepting the default window just because it shipped with the OS.

## Dogfooding, minus the LinkedIn post

I run this player. When the queue UI lies or Spotify rate-limits me, I’m the one who swears and then opens Xcode. That’s worse for my sleep schedule and better for my sanity than pretending the official **Spotify macOS** client is “good enough” because a billion people use it.

Keyboard-first people: you’ll like the palette. If you’re already deep on [Raycast](/blog/raycast-its-hidden-power/), the muscle memory isn’t alien.

## The part where I don’t oversell it

Premium only for playback (SDK rule, not mine). Sandbox is off in this repo because the EQ path and settings file need it, so treat unknown binaries accordingly. CI builds are unsigned; Gatekeeper will yell unless you build yourself or strip quarantine. Queue sync and API caps are whatever Spotify decided last Tuesday. I cache and debounce; I don’t perform miracles.

None of that is a secret in the official app either. They just hide it behind marketing. I’d rather the rough edges be mine.

Fork it, break it, build something meaner: [isaaclins/spotiglass](https://github.com/isaaclins/spotiglass). `docs/` tells you how to wire the Developer Dashboard client ID and the loopback redirect.

Go listen to something loud.
