+++
title = "Raycast. It's Hidden Power"
date = 2025-05-06
draft = false
tags = ["Raycast", "Productivity", "MacOS", "Launcher", "Workflow"]
+++

I stumbled upon Raycast even before I owned a Mac and instantly fell in love with the concept.
My friend [@k3ntaw](https://github.com/k3ntaw/) (shoutout to him!) showed it to me, and I immediately started searching for Windows alternatives (I was mainly on Windows at the time).
My quest led me down a couple of paths:

## Windows alternatives:

1.  **PowerToys Run**: Initially promising, this turned out to be somewhat limited for my core need – a fast, efficient launcher. It felt like a classic case of [feature creep](https://en.wikipedia.org/wiki/Feature_creep); it tried to be a Swiss Army knife when all I needed was a sharp blade, leading to a clunkier experience than I wanted, packed with more than I was looking for in a simple launcher.

2.  **Flow Launcher**: This was a strong contender. It was highly customizable with a plethora of plugins, and the ability to create your own was a big plus. The potential was huge, but diving into plugin development required a steeper learning curve and more time investment than I had available back then. It wasn't an easy feat, though very powerful for those who mastered it.

## Feature comparison:

| Feature                           | ![PowerToys Run](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/svg/powertoys.svg) | ![Flow Launcher](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/svg/flow-launcher.svg) |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Customization                     | ⚠️limited                                                                                                 | ⚠️limited (hard to make custom)                                                                               |
| Plugin System                     | ⚠️limited                                                                                                 | ⚠️limited (hard to make custom)                                                                               |
| Snippets                          | ❌                                                                                                        | ✅                                                                                                            |
| Clipboard History                 | ✅                                                                                                        | ✅                                                                                                            |
| Custom links with query insertion | ✅                                                                                                        | ✅                                                                                                            |

Fast forward to getting my MacBook. I was aiming for a clean start, a minimalist setup.
I initially tried Raycast, but seeing AI features integrated seemingly everywhere gave me pause.
It felt a bit overwhelming, almost like the "AI taking over" memes in real life.

![moistcritikal-screaming-ai-slowmotion.gif](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/moistcritikal-screaming-ai-slowmotion.gif)

That wasn't the streamlined experience I was hoping for.

So, I decided to give Alfred a shot. Alfred has a solid reputation, but I quickly hit a wall.
Many of its crucial customization features, the very things that make a launcher truly personal and powerful, were locked behind A $34 PAYWALL.

(what the fuck do i look like im made of? gold????)

For me, the core appeal of such a tool is deep personalization, and hitting a significant paywall for what felt like essential tweaks was a real turn-off.
It felt like being charged for the steering wheel after buying the car.
Disappointed but determined, I circled back to Raycast, deciding to give it a more thorough, patient look.
And boy, was that the best decision I could have made.

Switching back to Raycast (and promptly navigating the settings to turn off all the AI bells and whistles I didn't need) was a game-changer.
After surveying the market and clearly defining my wants and needs – speed, deep customizability without a hefty price tag, a robust plugin system (even if I wasn't building them myself initially), and a clean interface – Raycast was the only application launcher that ticked all the boxes.
And I had a lot of them. It was a relief to find that beneath the initial AI-forward presentation, the core Raycast was exactly what I needed: powerful, fast, and, crucially, configurable to _my_ liking.

Here's how I leverage Raycast's non-AI, core power daily:

### Snippets

Incredibly useful for frequently typed text, code, email responses, or commands. This alone saves me countless keystrokes and minutes every day.
For example, i used `:date` to create a snippet for the current date. Here are some of my snippets:

```
:date -> May 6, 2025
:kkk -> 😘😘😘 (don't judge me)
:sig -> ~ ⋖,^><
:gs -> git status
:blog -> prompt for my blog post
```

and its very easy to create your own.
Just select "Create Snippet" and you can create a snippet with a name and a shortcut.
![create snippet](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/raycast-create-snippet.png?raw=true)
in the snippet editor you can add a name, snippet text and a keyword.
now when you type the keyword, the snippet will be inserted.

it can hold multiple lines of text and even variables.
![raycast-customized-snippet](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/raycast-customized-snippet.png?raw=true)

now whenever I type `examplesnippet` in any way, shape or form, the snippet will be inserted like this:

```
This snippet pasted at May 6, 2025 at 17:25
i can put:
- **Bold text**
- *Italic text*
- ~~Strike through text~~
- [and even links](https://github.com/isaaclins/)
```

### Custom Quicklinks

This is where Raycast truly shines for me. For example, I can just type `g` and hit enter to open GitHub instantly, `cur` to open cursor on my last project, or `ctrl+command+t` to open the terminal. This is a huge timesaver and streamlines my navigation significantly.

ive made a lot of custom quicklinks, here are some of them:
![raycast-configuration](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/raycast-configuration.png?raw=true)

### Application Launcher

Of course, its primary function. It seamlessly and quickly opens any application on my Mac with a few keystrokes, far faster than Spotlight for me.
![raycast-application-launcher](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/raycast-application-launcher.png?raw=true)

### ChatGPT Integration via URL Query

This is probably my most ingenious (if I may say so myself) use. I've set up a custom quicklink using the URL

- `https://chat.openai.com/?model=gpt-4&q={Query}&hints=search`.

This allows me to type a query like "chat explain python decorators" directly into Raycast, hit enter, and have it open in ChatGPT, ready to go. It's instant access to a powerful assistant without multiple clicks or navigating to the website first.

![raycast-chatgpt-integration](https://github.com/isaaclins/isaaclins.github.io/blob/main/assets/img/raycast-chatgpt-integration.gif?raw=true)

also one thing that I love is that if I want to share this with you, i can just export it:
[raycast-export](https://ray.so/quicklinks/shared?quicklinks=%7B%22link%22:%22https:%5C/%5C/chat.openai.com%5C/?model%3Dgpt-4%26q%3D%7Bargument%20name%3D%5C%22Argument%5C%22%7D%26hints%3Dsearch%22,%22name%22:%22Ask%20ChatGPT%22%7D)
and import it to your raycast.
its literally that easy.

### Clipboard History

Free, (LOOKING AT YOU, MACCY) robust, and easily accessible clipboard history is a lifesaver.
No more losing that one link or piece of text I copied five minutes ago.
It's a simple feature, but executed perfectly and available without an extra charge.
(you can also pin a specific item to the top of the clipboard history)

Raycast has become an indispensable part of my daily workflow.
I use it constantly – it's probably my most used application.
Honestly, I can't imagine navigating my macOS without it.
Looking back, it's amusing to think that I was essentially trying to recreate Raycast's powerful, native plugin-like system and quicklink capabilities using Flow Launcher on Windows.

**It's like I knew the recipe and the taste I wanted before I even had all the right ingredients or the best kitchen to cook in.**

If you're on a Mac and haven't dived deep into Raycast, or if you, like me, were initially put off by the AI features (which you can largely ignore or disable), I highly recommend giving it another look.
Take the time to explore its extensions and configure it to your needs.
Its hidden, non-AI power is truly transformative for productivity.

## Also, its fucking free.

###### PS: I'm not affiliated with Raycast. I'm just a happy customer.
