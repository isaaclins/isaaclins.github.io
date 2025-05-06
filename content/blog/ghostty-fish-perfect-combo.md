---
title: "Ghostty X Fish. The Perfect Combination"
date: 2025-05-06
draft: false
tags: ["Ghostty", "Fish", "Terminal", "macOS"]
---

If you're like me, always on the hunt for the perfect development environment, you know the thrill of finding tools that just _click_. For a long time, I tweaked and prodded, swapped and searched. Then, I stumbled upon a combination so potent, so seamless, it didn't just improve my workflow—it **eradicated** everything that came before it. I'm talking about Ghostty and Fish shell. Buckle up, because this is a game-changer.

## The Dynamic Duo: Ghostty & Fish

**Ghostty** is not just another terminal emulator. It's a sleek, modern, and incredibly fast macOS native application. **Fish**, or the "friendly interactive shell," lives up to its name with sane defaults, powerful features out-of-the-box, and an intuitive approach to command-line interaction. Together? They're an unstoppable force.

## Setup? What Setup? It's _Too_ Easy.

Getting this dream team up and running is ridiculously simple.

### Installing Fish Shell

If you're on a Mac and using Homebrew (which you should be!), it's a one-liner:

```bash
brew install fish
```

That's it. Seriously. Make it your default shell, and you're halfway to terminal nirvana.

### Installing Ghostty

Ghostty's installation is just as breezy. Head over to their official download page: [ghostty.org/download](https://ghostty.org/download).

You'll find a universal binary that works flawlessly on both Apple Silicon and Intel machines (macOS 13+ required). Download, drag to Applications, and you're golden. No complicated configs, no dependency hell. Just pure, unadulterated terminal goodness.

## Why This Combo Slays Everything in Its Path

### 1. Speed That Leaves Others in the Dust

Ghostty is _fast_. As a native macOS application, it feels incredibly responsive. But don't just take my word for it. I put it to the test.

My benchmark? The visually striking [DOOM-fire-zig](https://github.com/const-void/DOOM-fire-zig) animation. Running this in the default macOS terminal was… okay. Running it in Ghostty? The difference was palpable. Smoother, faster, and just a joy to watch. This isn't just about fancy animations; this raw performance translates to every command you run, every log you tail, every process you monitor.
Just look at this comparison:

_DOOM-fire-zig running in default macOS Terminal_
![DOOM-fire-zig running in default macOS Terminal](../../assets/img/doom-fire-zig-default-terminal.png?raw=true)

_DOOM-fire-zig running in Ghostty_
![DOOM-fire-zig running in Ghostty](../../assets/img/doom-fire-zig-ghostty-terminal.png?raw=true)

While the FPS counter shows 278 FPS, the actual framerate is closer to 15 FPS in the default Terminal. Try it out yourself to see the difference!
(macOS default terminal is a piece of shit and crashed after ~10 seconds of running the animation)
Fish shell shines with its user-friendliness, and customization is a prime example. Forget arcane syntax for aliases. Fish uses `abbr` (abbreviations), and they are a delight.

Want `gcm` to expand to `git checkout main`?

```fish
abbr --add gcm git checkout main
```

It's that simple. These abbreviations expand as you type, providing clarity and saving keystrokes. Managing functions and your prompt is equally straightforward. The "it just works" philosophy is strong here.

### 3. The "Feels Good" Factor

This is subjective, I know. But the combination of Ghostty's clean interface and buttery-smooth performance with Fish's intelligent suggestions, intuitive scripting, and vibrant community support creates an experience that is, frankly, _amazing_. It's the kind of setup that makes you _want_ to open your terminal.

## My Personal Configuration

I've spent some time tailoring this setup to my specific needs. You can find my configuration files, including my Fish setup, in my `macOS-config` repository on GitHub:

- [https://github.com/isaaclins/macos-config](https://github.com/isaaclins/macos-config).

Feel free to explore and take inspiration!

Here is a screenshot of my Fish shell prompt:

_Fish shell prompt_
![Fish shell prompt](../../assets/img/fish-shell-prompt.png?raw=true)


## The Verdict: Stop Searching, Start Doing

If you're on macOS and looking to elevate your terminal experience from a mere utility to a powerful, enjoyable extension of your workflow, look no further. Ghostty and Fish are not just tools; they are a statement. A statement that says you value speed, efficiency, and a user experience that doesn't suck.

Give them a try. Your command line will thank you.

## Acknowledgements

A huge thank you to the brilliant minds behind these tools:

- **Ghostty:** Created by Mitchell Hashimoto and the contributors. Check out their work at [ghostty.org](https://ghostty.org) and on [GitHub](https://github.com/ghostty-org/ghostty).
- **Fish Shell:** Developed by a dedicated community. Learn more at [fishshell.com](https://fishshell.com) and explore the code on [GitHub](https://github.com/fish-shell/fish-shell).

Your contributions make the developer world a much better place!
