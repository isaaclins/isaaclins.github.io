---
title: "Discord Python RAT"
date: 2024-04-01
draft: false
description: "Discord Python RAT (malware creation)"
tags: ["template"]
---
First of, I'd like to clarify some things.
Thats why I've separated this Project into *N different sections*. If you get stuck somewhere along this journey, there will always be a Table of Contents on the right.

## How did I start?

I knew I wanted to create something using **Python**, as I've been working with it for some while now and wanted to test what I could create with it.
After installing Python and making a new file called **main.py** (as one normally does), I added the base Discord communication import that goes as following:

```Python
import discord

@client.event
async def on_message(message):
    print("MESSAGE SENT WAS:", message.content, "BY :" , message.author,"IN :" , message.channel,)

@client.event
async def on_ready():
```

I figured that this code can also be used as a **Discord Chat Logger** as I'm writing this

## Documentation

### Functions

Here I'll dump the most importart code parts and explain it line by line.

| Function name                             | Explanation                                                                                                                                                                                                                                                                                                                                                                                                     | line |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|
| getTokenAndSearchForInfo()                | This function grabs the user token from the saved web-DB that saves the discord token and uses the implemented Discord API to grab any information it gets from the API. for example if the user has put a credit card, where country of the registered user is, email address and phone number of given account                                                                                                | 38   |
| setVolumeToMax()                          | This sets the volume of the client to the maximal possible using AudioUtilities.                                                                                                                                                                                                                                                                                                                                | 132  |
| setVolumeToMin()                          | This sets the volume of the client to the minimum possible using AudioUtilities.                                                                                                                                                                                                                                                                                                                                | 140  |
| find_channel_by_name(guild, channel_name) | This function iterates over all channels in a given guild and returns the channel that matches the provided name. If no match is found, it returns None.                                                                                                                                                                                                                                                        | 193  |
| reload_program()                          | This function is used to restart the current Python script. It gets the path of the current Python executable and the script file, then uses the subprocess module to call the script again. After that, it exits the current script execution.                                                                                                                                                                 | 198  |
| decrypt(buff, master_key)                 | This function attempts to decrypt a buffer using the provided master key and the AES encryption algorithm in GCM mode. If decryption is successful, it returns the decrypted string. If an error occurs during decryption, it returns the string "Error". **Please don't ask me where I got this from, as I've got ZERO memory of where I copied this from.**                                                   | 203  |
| on_ready                                  | This is an event handler that gets called when the Discord client has finished connecting to the server. It calls the getTokenAndSearchForInfo() function, makes a request to **https://ipapi.co/json/** to get location data, and then creates an embed message with various information. The embed message is then sent to a specific channel in a guild. If the channel doesn’t exist, it creates a new one. | 211  |
| on_message(message)                       | this handles the message that is send in chat. first it filters if the message has been sent by himself. After that it searches for the mac address of the client to match in which channel he should communicate in. after that it looks at the message content and does different things for different messages.                                                                                              | 253  |

### Modules

Here are the explanations for each Module:

| Module Name         | Explanation                                                                                                                                                                                | Still working |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `.shell`            | This module **executes a shell command and returns the output**. If there is no output, it returns "No output".                                                                            | ✅             |
| `.run`              | This module **runs a command and returns the output**. If there is an error, it returns the error message.                                                                                 | ✅             |
| `.cd`               | This module **changes** the current **working directory** to the specified directory and lists the files in the new directory. If the directory is not found, it returns an error message. | ✅             |
| `.input`            | This module sends a **keystroke**. The user is asked to confirm before the keystroke is sent. If the user does not react in time, it sends a timeout message.                              | ✅             |
| `.type`             | This module **types a string as keyboard input**. The user is asked to confirm before the string is typed. If the user does not react in time, it sends a timeout message.                 | ✅             |
| `.say`              | This module uses text-to-speech to say a string.                                                                                                                                           | ✅             |
| `.message`          | This module displays a message box with a specified string.                                                                                                                                | ✅             |
| `.mouse`            | This module takes a screenshot and overlays a grid on it. The grid size can be specified as large, medium, small, or tiny. The screenshot is then sent as an attachment.                   | ❌             |
| `.help`             | This function displays a help message with a list of commands.                                                                                                                             | ✅             |
| `.ping`             | This function replies with the latency of the client in milliseconds.                                                                                                                      | ✅             |
| `.ls`               | This function lists the files in the current working directory.                                                                                                                            | ✅             |
| `.exit`             | This function asks for confirmation before deleting the channel and closing the client.                                                                                                    | ✅             |
| `.blue`             | This function asks for confirmation before attempting to trigger a **blue screen**.                                                                                                        | ❓             |
| `.ss`/`.screenshot` | This function takes a screenshot and sends it as an attachment.                                                                                                                            | ✅             |
| `.photo`            | This function captures an image from the **webcam** and sends it as an attachment.                                                                                                         | ✅             |
| `.purge`            | This function deletes all messages in the channel.                                                                                                                                         | ✅             |
| `.reload`           | This function asks for confirmation before reloading the client.                                                                                                                           | ✅             |
| `.setVolumeToMax`   | This function increases the volume to the maximum.                                                                                                                                         | ✅             |
| `.setVolumeToMin`   | This function decreases the volume to the minimum.                                                                                                                                         | ✅             |
| `.admincheck`       | This function checks if the user is an admin and sends a message accordingly.                                                                                                              | ✅             |
| `.location`         | This function gets the location of the user and sends a link to it on Google Maps.                                                                                                         | ✅             |
| `.clipboard`        | This function gets the **content of the clipboard** and sends it.                                                                                                                          | ✅             |
| `.wallpaper`        | This function changes the wallpaper to an **attached image**.                                                                                                                              | ✅             |

## Sources

Image I found at [this blog](https://gettotext.com/beware-of-this-malware-on-discord-it-steals-your-bank-details-and-makes-purchases-without-your-knowledge/)
