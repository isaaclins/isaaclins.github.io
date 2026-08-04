+++
title = "pi-terminal-kit"
date = 2026-07-16
draft = false
show_date = false
tags = ["Dev", "Pi", "Terminal"]
description = "Portable terminal integrations for Pi: share the visible tmux pane with a child agent, bridge Fish functions safely, and theme the whole thing."
+++

Agent work usually happens somewhere you cannot see. A process spawns, does
something for two minutes, and hands you back a summary you have to take on
faith. pi-terminal-kit exists because I wanted to watch it happen instead.

It is a set of [portable terminal integrations for Pi](https://github.com/isaaclins/pi-terminal-kit),
split into packages you can install one at a time rather than one framework you
have to adopt whole.

## The pieces

**`pi-codrive`** shares the exact visible tmux pane with a child agent and gets
an authenticated structured completion report back. You see the work as it
happens, in the same pane you are already looking at, and you can steer it
mid-run instead of waiting for it to finish being wrong.

**`pi-fish-bridge`** exposes selected Fish functions to Pi shell commands. The
important word is selected: you list what is allowed rather than handing over
the whole shell.

**`pi-arcoiris-refined`** is a complete 51 token dark theme, and the
**ghostty-tmux-fish recipe** is the copy-pasteable version of the terminal
setup, for when you want the result without reading the reasoning.

## Why it is split up

Each package is independently versioned and publishable. That is deliberate. A
theme should not be able to break your agent tooling, and wanting the Fish
bridge should not mean adopting somebody else's tmux config.

The requirement across the board is Pi 0.80.3 or newer, Node 20 or 22, tmux,
and macOS or Linux.
