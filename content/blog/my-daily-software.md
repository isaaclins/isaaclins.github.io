+++
title = "My Daily Software"
date = 2025-06-18
draft = true
tags = ["MacOS", "Productivity", "Software"]
complexity = "easy"
toc = true
+++

## Introduction

If you're a Mac user (or even a Windows or Linux user) looking to get more shit done, you're in the right place. I'm constantly tweaking my setup for peak efficiency, and in the last few days, I've decided on a set of apps that I genuinely couldn't live without. These are the tools that run daily, keeping my workflow smooth and upgrading to a poweruser.

Let's dive into the arsenal.

I made a list of all the apps I use on my Mac. I'm going to go through each one and explain what I use them for.

## My uses

I'm a software developer, so I use a lot of tools to help me get my work done. I'm also a bit of a tinkerer, so I like to try out new apps and see if they can help me be more productive.

> `"If it can't be a keyboard shortcut, it's not worth using."` ~ [This Jackass](https://isaaclins.com/)

| Icon                                                       | Personal Rating | Product name     | Description                                                | Infos                                |
| ---------------------------------------------------------- | --------------- | ---------------- | ---------------------------------------------------------- | ------------------------------------ |
| ![Cursor icon](/images/logo/cursor.png)                    | ⭐⭐⭐⭐⭐      | Cursor           | A modern, AI-powered code editor.                          | [More Information](#cursor)          |
| ![Fish icon](/images/logo/fish-shell.png)                  | ⭐⭐⭐⭐⭐      | Fish             | A shell alternative to bash, which is easier to customize. | [More Information](#fish)            |
| ![Ghostty icon](/images/logo/ghostty.png)                  | ⭐⭐⭐⭐⭐      | Ghostty          | A GPU-accelerated terminal emulator.                       | [More Information](#ghostty)         |
| ![Raycast icon](/images/logo/raycast.png)                  | ⭐⭐⭐⭐⭐      | Raycast          | A supercharged command palette.                            | [More Information](#raycast)         |
| ![Zen icon](/images/logo/zen.png)                          | ⭐⭐⭐⭐⭐      | Zen              | A Browser similar to arc, but better.                      | [More Information](#zen)             |
| ![Amphetamine icon](/images/logo/amphetamine.png)          | ⭐⭐⭐⭐        | Amphetamine      | A keep-awake utility.                                      | [More Information](#amphetamine)     |
| ![AltTab icon](/images/logo/alttab.png)                    | ⭐⭐⭐⭐        | AltTab           | A utility to enable alt-tabbing.                           | [More Information](#alttab)          |
| ![Hammerspoon icon](/images/logo/hammerspoon.png)          | ⭐⭐⭐⭐        | Hammerspoon      | A powerful automation tool for macOS.                      | [More Information](#hammerspoon)     |
| ![MiddleClick icon](/images/logo/middleclick.png)          | ⭐⭐⭐⭐        | MiddleClick      | A simple utility to enable middle-click functionality.     | [More Information](#middleclick)     |
| ![AppCleaner icon](/images/logo/appcleaner.png)            | ⭐⭐⭐          | AppCleaner       | An uninstaller utility.                                    | [More Information](#appcleaner)      |
| ![Horo icon](/images/logo/horo.png)                        | ⭐⭐⭐          | Horo             | A simple menu bar timer app.                               | [More Information](#horo)            |
| ![Ice icon](/images/logo/ice.png)                          | ⭐⭐⭐          | Ice              | A menu bar icon manager.                                   | [More Information](#ice)             |
| ![Latest icon](/images/logo/latest.png)                    | ⭐⭐⭐          | Latest           | A app update checker.                                      | [More Information](#latest)          |
| ![Nimble Commander icon](/images/logo/nimblecommander.png) | ⭐⭐⭐          | Nimble Commander | A dual-pane file manager.                                  | [More Information](#nimblecommander) |
| ![TinkerTool icon](/images/logo/tinkertool.png)            | ⭐⭐⭐          | TinkerTool       | A utility for more detailed battery information.           | [More Information](#tinkertool)      |
| ![Battery icon](/images/logo/battery.png)                  | ⭐⭐            | Battery          | A menu bar utility for more detailed battery information.  | [More Information](#battery)         |
| ![MediaMate icon](/images/logo/mediamate.png)              | ⭐⭐            | MediaMate        | An enhanced media and system HUD (Heads-Up Display).       | [More Information](#mediamate)       |

## Cursor

Cursor is a modern, AI-powered code editor. It's a great tool for writing code, and it's also a great tool for writing blog posts.

In short, It's a fork of VSCode, but with AI-powered features.

Here is an example of how it looks like:

![Cursor example](/images/cursor-ide-in-action.png)

I'm not going to go into detail about how it works, but I'll just say that it's a great tool for writing code.

### Features

- It has everything that VSCode supports
- AI-powered code completion
- AI-powered code refactoring
- AI-powered code explanations
- AI-powered code documentation

### How to Install

You can download Cursor directly from their [website](https://cursor.sh/) or install it using Homebrew.

```bash
brew install --cask cursor
```

### Alternatives

- **Visual Studio Code:** The open-source editor that Cursor is built on. The OG.
- **Sublime Text:** A fast, lightweight, and highly extensible code editor.
- **JetBrains IDEs (IntelliJ, WebStorm, etc.):** A suite of powerful, feature-rich IDEs for various languages.
- **Nova:** A beautiful, native Mac code editor from the creators of Transmit.

## Fish

Fish is a shell alternative to bash, which is easier to customize. It's the "it just works" of shells.

Here is an example of how it looks like:

![Fish example](/images/fish-shell-prompt.png)

Why is it better?

- **Autosuggestions:** It suggests commands as you type, based on your history. It's like the shell is reading your mind. Hit the right arrow key, and the command is complete.
- **Sane Scripting:** The scripting language is simple and clean. No more cryptic `bash` syntax that makes you want to tear your hair out.
- **Tab Completion:** It's smart. It knows about git branches, command options, and file paths.

If you're still using `bash` or `zsh` and spending more time configuring your prompt than writing code, do yourself a favor and switch to `fish`.

### How to Install

The easiest way to install Fish is with Homebrew.

```bash
brew install fish
```

Then, add `/opt/homebrew/bin/fish` to `/etc/shells` and run `chsh -s /opt/homebrew/bin/fish`.

### Alternatives

- **Zsh:** A highly customizable shell, often paired with frameworks like [Oh My Zsh](https://ohmyz.sh/).
- **Bash:** The default shell on many Unix-based systems. It's everywhere.

## Ghostty

Ghostty is a GPU-accelerated terminal emulator. That's a fancy way of saying it's fast as fuck.

It's built by Mitchell Hashimoto, the guy behind Vagrant and Terraform, so you know it's quality.

![Ghostty with Doom Fire](/images/doom-fire-zig-ghostty-terminal.png)

Here's the deal:

- **Native & Fast:** It uses the GPU for rendering (Metal on macOS), so it's incredibly smooth. No more lag when you accidentally `cat` a giant file.
- **Looks Right:** It uses native macOS UI components for tabs and windows, so it feels like a proper Mac app, not some janky cross-platform thing.
- **Plays Nice with Fish:** The shell integration is top-notch. It just works.

It's the perfect partner for the Fish shell. The combo is just... _chef's kiss_.

### How to Install

You can download Ghostty from the [official website](https://ghostty.org/).

### Alternatives

- **iTerm2:** The undisputed king of terminal emulators on macOS for years. Packed with features.
- **Alacritty:** A cross-platform, GPU-accelerated terminal emulator focused on simplicity and performance.
- **Kitty:** Another fast, feature-rich, GPU-based terminal emulator.
- **WezTerm:** A powerful, cross-platform terminal emulator and multiplexer written in Rust.

## Raycast

Raycast is what macOS Spotlight should have been. It's an application launcher and command palette on steroids.

Ive made a [post about Raycast](blog/raycast-its-hidden-power/), so you can check that out for more information.

![Raycast Launcher](/images/raycast-application-launcher.png)

I use it for literally everything:

- **Launching Apps:** Duh. But it's faster than Spotlight.
- **Clipboard History:** A searchable history of everything I've copied. A lifesaver.
- **Snippets:** I have snippets for code, common email replies, and even emojis.
- **Window Management:** "Maximize", "Center", "Left Half"... all a keyboard shortcut away.
- **Extensions:** This is the killer feature. There's a store with hundreds of extensions for everything from controlling Spotify to searching GitHub.

If you're not using Raycast, you're basically using your Mac in slow motion.

### How to Install

Download Raycast from their [website](https://www.raycast.com/) or use Homebrew.

```bash
brew install --cask raycast
```

### Alternatives

- **Alfred:** The original power-user launcher, with a huge community and powerful workflows.
- **LaunchBar:** Another long-standing and powerful launcher with a dedicated following.
- **macOS Spotlight:** The built-in search. It's gotten better (especially after the Tahoe26 update), but it's still no match for the others.

## Zen

I wrote a whole ass post about how The Browser Company killed Arc for a soulless Chrome clone called Dia. In that post, I talked about my silver lining: Zen browser.

![Zen Browser with Spaces](/images/zen-example.png)

Zen is everything I wanted Arc to be, but better, because it's built on Firefox's engine (Gecko), not Chromium. Here's my setup:

- **Spaces:** I have separate spaces for Work, School, Personal, and Entertainment. It keeps my digital life sane.
- **Containers:** Inside those spaces, I use containers to have multiple sessions of the same site. I can be logged into four different Google accounts at once. It's a game-changer.
- **Sticky Tabs:** The important stuff for each space is pinned. When I switch to my "Work" space, Jira and my work email are right there.

It's the perfect browser for a power user. It's organized, it's powerful, and it respects my privacy.

### How to Install

You can download Zen from the [official website](https://zen-browser.app/) or install it with Homebrew.

```bash
brew install --cask zen
```

### Alternatives

- **Firefox:** The browser Zen is based on. A solid, privacy-focused, and open-source choice.
- **Arc:** The browser that inspired Zen. Innovative UI, but based on Chromium.
- **Google Chrome:** The most popular browser in the world.
- **Safari:** The default browser on macOS, optimized for Apple's ecosystem.

## Amphetamine

It's simple. It does one thing, and it does it well: it keeps your Mac awake.

Need to run a long-running script? Starting a big download? Just click the icon in the menu bar, and your Mac won't go to sleep. No more babysitting your computer.

### How to Install

Amphetamine is available on the [Mac App Store](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12).

### Alternatives

- **Caffeine:** The classic. A simple menu bar app that does the same thing.
- **KeepingYouAwake:** A lightweight, open-source alternative.

## AltTab

Windows has proper `alt-tab`. macOS has... `cmd-tab`, which only cycles through applications, not windows. It's dumb.

AltTab fixes it. It brings true, window-based alt-tabbing to macOS. It's one of the first things I install on a new Mac.

### How to Install

Install it with Homebrew.

```bash
brew install --cask alt-tab
```

### Alternatives

- **Witch:** A long-standing and powerful window switcher with lots of customization options.
- **Contexts:** Another powerful window switcher that's more visual.

## Hammerspoon

Hammerspoon is the ultimate automation tool for macOS. It's a bridge between the operating system and a Lua scripting engine.

You can use it to automate almost anything: window management, keyboard shortcuts, system events, you name it. It's for the tinkerer who looks at their workflow and thinks, "I can make this better."

### How to Install

Install it with Homebrew.

```bash
brew install --cask hammerspoon
```

### Alternatives

- **Keyboard Maestro:** An incredibly powerful (and paid) automation tool with a graphical interface.
- **BetterTouchTool:** Known for custom trackpad gestures, but it's also a powerful automation tool.

## MiddleClick

My mouse has a middle button. My trackpad doesn't. This tiny utility lets you simulate a middle click with a three-finger tap on your trackpad.

Essential for opening links in a new tab without having to `cmd-click` everything like a peasant.

### How to Install

Install it with Homebrew.

```bash
brew install --cask middleclick-fork
```

### Alternatives

- **BetterTouchTool:** Can be configured to do this and a million other things.

## AppCleaner

When you drag an app to the Trash on a Mac, it often leaves behind preference files, caches, and other junk. AppCleaner finds all those associated files and deletes them for you.

It's the "leave no trace" uninstaller.

### How to Install

Install it with Homebrew.

```bash
brew install --cask appcleaner
```

### Alternatives

- **AppZapper:** Another popular (paid) uninstaller.
- **Trash Me:** A free and open-source alternative.

## Horo

It's a timer that lives in your menu bar. That's it.

It's perfect for timeboxing tasks or reminding yourself to take a break. It's simple, unobtrusive, and does its job perfectly.

### How to Install

Horo is available on the [Mac App Store](https://apps.apple.com/us/app/horo-menu-bar-timer/id1438692231?mt=12).

### Alternatives

- **Session:** A popular Pomodoro and focus timer.
- **Flow:** A beautiful and simple Pomodoro timer.
- **Toggl Track:** A full-fledged time tracking service with a great menu bar app.

## Ice

My menu bar gets cluttered. Ice lets you hide icons you don't need to see all the time. You can have them hidden and reveal them with a click, or have them appear only when there's a change.

It's like a little digital organizer for your menu bar.

### How to Install

Install this open-source gem with Homebrew.

```bash
brew install --cask ice
```

### Alternatives

- **Bartender:** The most popular (paid) menu bar manager for years.
- **Vanilla:** A free and simple alternative.

## Latest

This app scans your installed applications and tells you which ones have updates available. It's a simple way to keep all your non-App-Store apps up to date without having to manually check each website.

### How to Install

Install this open-source utility with Homebrew.

```bash
brew install --cask latest
```

### Alternatives

- **MacUpdater:** A more powerful (paid) app that can also automate updates.
- **Homebrew:** `brew upgrade --cask` does this for apps installed via Homebrew.

## Nimble Commander

Finder is fine for basic stuff. But for real file management, you need a dual-pane file manager. Nimble Commander is a beast.

It's fast, powerful, and has all the features you'd expect: tabs, keyboard shortcuts for everything, and a high level of customizability. If you move a lot of files around, this is the tool for you.

### How to Install

You can get it from the [Mac App Store](https://apps.apple.com/us/app/nimble-commander/id948243168) or directly from the [developer's website](https://magnumbytes.com/).

### Alternatives

- **ForkLift:** A very popular and powerful dual-pane file manager for Mac.
- **Commander One:** Another strong contender with a free and a paid version.
- **Path Finder:** A complete Finder replacement with a ton of features.

## TinkerTool

macOS has a lot of hidden settings that you can't access through the standard System Settings. TinkerTool unlocks them.

Want to change the default screenshot format? Add a "Quit" option to Finder? TinkerTool gives you a simple GUI to tweak those hidden settings without having to mess with the command line.

### How to Install

Download it for free from the [developer's website](https://www.bresink.com/osx/TinkerTool.html).

### Alternatives

- **OnyX:** A long-standing system maintenance and tweaking utility.
- **MacPilot:** A paid app with access to over 1,200 hidden features.

## Battery

The default battery indicator in the menu bar is... fine. This utility gives you more.

You can see time remaining, health, capacity, and charge cycles, all from your menu bar. It's for the user who wants to know exactly what's going on with their battery.

### How to Install

Install it with Homebrew.

```bash
brew install --cask battery
```

### Alternatives

- **iStat Menus:** A comprehensive system monitor that includes detailed battery information.
- **CoconutBattery:** A classic utility for checking the health of your Mac's battery.

## MediaMate

This app replaces the ugly default macOS notch with something that looks like it belongs on iOS. It's a small aesthetic tweak, but it makes the whole experience feel more cohesive.

### How to Install

MediaMate is available on the [Mac App Store](https://apps.apple.com/us/app/mediamate/id1594950333).

### Alternatives

- **SoundSource:** While it's more focused on advanced audio control, it offers an improved volume control in the menu bar. The custom HUD of MediaMate is fairly unique.
