---
title: "Discord Python RAT"
date: 2024-04-01
draft: false
description: "Discord Python RAT (malware creation)"
tags: ["template"]
---



First of, I'd like to clarify some things.
This project is a **PoC (Proof of Concept)**. I didn't write the code for malicious intentions, but to see how far I can go with just my knowledge in Python and some help from friends.
If you get stuck somewhere along this journey, there will always be a Table of Contents on the right.

## How did I start?

I knew I wanted to create something using **Python**, as I've been working with it for some while now and wanted to test what I could create with it.
I started with a GitHub repository in my account and started installing things locally.
{{< alert "github" >}}
Don't forget to [follow me](https://github.com/isaaclins) on GitHub.
{{< /alert >}}

{{< github repo="isaaclins/Discord_Python_RAT" >}}

After installing Python and making a new file called **main.py** (as one normally does), I added the base Discord communication import that goes as following:

```Python
import discord

@client.event
async def on_message(message):
    print("MESSAGE SENT WAS:", message.content, "BY :" , message.author,"IN :" , message.channel,)

@client.event
async def on_ready():
```

I figured that this code can also be used as a **Chat Logger** as I'm writing this.

After that I started to plan what I wanted the bot to be able to do.

### Requisites

I wanted the bot to do the following:

- Listen to Commands
- Take screenshots of the current desktop
- See, Execute as well as delete files
- Upload/download external files
- Run a CLI command
- Access to webcam

## Documentation

### Modules

Here are the explanations for each Module:

| Module Name         | Explanation                                                                                                                                                                                | Still working |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `.shell`            | This module **executes a shell command and returns the output**. If there is no output, it returns "No output".                                                                            | ✅             |
| `.run`              | This module **runs a command and returns the output**. If there is an error, it returns the error message.                                                                                 | ✅             |
| `.cd`               | This module **changes** the current **working directory** to the specified directory and lists the files in the new directory. If the directory is not found, it returns an error message. | ✅             |
| `.input`            | This module sends a **keystroke**. The user is asked to confirm before the keystroke is sent. If the user does not react in time, it sends a timeout message.                              | ✅             |
| `.type`             | This module **types a string as keyboard input**. The user is asked to confirm before the string is typed. If the user does not react in time, it sends a timeout message.                 | ✅             |
| `.say`              | This module uses **text-to-speech** to say a **string**.                                                                                                                                   | ✅             |
| `.message`          | This module **displays a message box** with a specified string.                                                                                                                            | ✅             |
| `.mouse`            | This module takes a **screenshot** and **overlays a grid** on it. The grid size can be specified as **large, medium, small, or tiny**. The screenshot is then sent as an attachment.       | ❌             |
| `.help`             | This module **displays a help message** with a list of commands.                                                                                                                           | ✅             |
| `.ping`             | This module replies with the **latency of the client** in milliseconds.                                                                                                                    | ✅             |
| `.ls`               | This module **lists the files** in the **current working directory**.                                                                                                                      | ✅             |
| `.exit`             | This module asks for confirmation before **deleting the channel** and **closing the client**.                                                                                              | ✅             |
| `.blue`             | This module asks for confirmation before attempting to trigger a **blue screen**.                                                                                                          | ❓             |
| `.ss`/`.screenshot` | This module takes a **screenshot** and sends it as an attachment.                                                                                                                          | ✅             |
| `.photo`            | This module **captures an image** from the **webcam** and sends it as an attachment.                                                                                                       | ✅             |
| `.purge`            | This module deletes all messages in the channel.                                                                                                                                           | ✅             |
| `.reload`           | This module asks for confirmation before reloading the client.                                                                                                                             | ✅             |
| `.setVolumeToMax`   | This module increases the volume to the maximum.                                                                                                                                           | ✅             |
| `.setVolumeToMin`   | This module decreases the volume to the minimum.                                                                                                                                           | ✅             |
| `.admincheck`       | This module checks if the user is an admin and sends a message accordingly.                                                                                                                | ✅             |
| `.location`         | This module gets the location of the user and sends a link to it on Google Maps.                                                                                                           | ✅             |
| `.clipboard`        | This module gets the **content of the clipboard** and sends it.                                                                                                                            | ✅             |
| `.wallpaper`        | This module changes the wallpaper to an **attached image**.                                                                                                                                | ✅             |

### Functions

Here I'll dump the most important code parts and explain it line by line.

| Function name                             | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                      | line |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|
| getTokenAndSearchForInfo()                | This function grabs the user token from the saved web-DB that saves the discord token and uses the implemented Discord API to grab any information it gets from the API. for example if the user has put a credit card, where country of the registered user is, email address and phone number of given account                                                                                                                 | 38   |
| setVolumeToMax()                          | This sets the volume of the client to the maximal possible using AudioUtilities.                                                                                                                                                                                                                                                                                                                                                 | 132  |
| setVolumeToMin()                          | This sets the volume of the client to the minimum possible using AudioUtilities.                                                                                                                                                                                                                                                                                                                                                 | 140  |
| find_channel_by_name(guild, channel_name) | This function iterates over all channels in a given guild and returns the channel that matches the provided name. If no match is found, it returns None.                                                                                                                                                                                                                                                                         | 193  |
| reload_program()                          | This function is used to restart the current Python script. It gets the path of the current Python executable and the script file, then uses the subprocess module to call the script again. After that, it exits the current script execution.                                                                                                                                                                                  | 198  |
| decrypt(buff, master_key)                 | This function attempts to decrypt a buffer using the provided master key and the AES encryption algorithm in GCM mode. If decryption is successful, it returns the decrypted string. If an error occurs during decryption, it returns the string "Error". **Please don't ask me where I got this from, as I've got ZERO memory of where I copied this from.**                                                                    | 203  |
| on_ready                                  | This is an event handler that gets called when the Discord client has finished connecting to the server. It calls the getTokenAndSearchForInfo() function, makes a request to **[ipapi.co/json](https://ipapi.co/json/)** to get location data, and then creates an embed message with various information. The embed message is then sent to a specific channel in a guild. If the channel doesn’t exist, it creates a new one. | 211  |
| on_message(message)                       | this handles the message that is send in chat. first it filters if the message has been sent by himself. After that it searches for the mac address of the client to match in which channel he should communicate in. after that it looks at the message content and does different things for different messages.                                                                                                               | 253  |

## Sources

- Hero image I found at [this blog](https://gettotext.com/beware-of-this-malware-on-discord-it-steals-your-bank-details-and-makes-purchases-without-your-knowledge/)
- Here is my GitHub Repository. If you want to improve or change some code, Please follow the article below on how to submit a PR.

{{< article link="/posts/pullrequest/" >}}

## LEGAL

{{< alert cardColor="#e63946" iconColor="#1d3557" textColor="#f1faee" >}}

Copyright (c) 2024 Isaac Lins

SlytherCord is a tool developed by Isaac Lins. This software is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the author be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

This documentation provides an overview of the Discord Python RAT and its available features. It is important to use these functionalities responsibly and in compliance with relevant laws and regulations. Always ensure that you have appropriate authorization before remotely administering systems.

SlytherCord is intended for educational and responsible use only. The developer, Isaac Lins, takes no responsibility for any misuse of this tool. Unauthorized access to others' accounts, distribution of malware, or any other illegal activities are strictly prohibited. By using SlytherCord, you agree to comply with all applicable laws and regulations.
{{< /alert >}}
