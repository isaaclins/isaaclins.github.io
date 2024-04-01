---
title: "Discord Python RAT"
date: 2024-04-01
draft: false
description: "Discord Python RAT (malware creation)"
tags: ["template"]
---

Thank you for wantingsadasd to contribute to Blowfish's community.

## How did I start?
I knew I wanted to create something using **Python**, as I've been working with it for some while now and wanted to test what I could create with it.
After installing Python and making a new file called **main.py** (as one normally does), I added the base Discord communication import that goes as following:
```bash
import discord

@client.event
async def on_message(message):
    print("MESSAGE SENT WAS:", message.content, "BY :" , message.author,"IN :" , message.channel,)

@client.event
async def on_ready():
```

I figured that this code can also be used as a **Discord Chat Logger** as I'm writing this
 
## Sources
Image I found at [this blog](https://gettotext.com/beware-of-this-malware-on-discord-it-steals-your-bank-details-and-makes-purchases-without-your-knowledge/)