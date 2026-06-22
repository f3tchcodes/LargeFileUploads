# LargeFileUploads

Vencord plugin for automatically detecting, and uploading files that exceed max upload limit to a hosting service and sending the link instead.

<img width="501" height="652" alt="image" src="https://github.com/user-attachments/assets/a23af1c9-8231-4609-b5cc-416ae5d97d0e" />


## Installation

Currently the plugin is not available on Vencord's official plugin list, hence you would have to install the plugin by creating a custom vencord build using the official guide, and running this command inside of your `src/userplugins` folder:

```
$ git clone https://github.com/f3tchcodes/LargeFileUploads largeFileUploads
```

Once this is done, you need to build and inject your custom vencord, and you can use the plugin! 

Official guide to build and inject: [https://docs.vencord.dev/installing/](https://docs.vencord.dev/installing/)

## Supports:
**Catbox:**
- 200MB max size
- No expiry
- Embed available

**Litterbox:**
- 1GB max size
- 3 days expiry time
- Embed available

**Uguu:**
- 128MB max size
- 3 hours expiry time
- Embed available

**Custom Zipline instance:**
- Custom size
- Custom expiry time
- Embed available

## Setup Zipline

In order to setup Zipline, you can enter your server's base URL and token inside settings of the plugin like so:

<img width="646" height="564" alt="image" src="https://github.com/user-attachments/assets/60378ba3-9d89-41a9-bea1-a0210f05c807" />

You can also choose to disable the warning, and enable automatic selection, so that your files are uploaded to zipline directly without any interference from confirmation popups.

## Uploading files

You can directly upload files to Discord like you usually do with drag & drop, using upload button, or by pasting the file. Everything is managed with Discord's original workflow, no slash commands or any extra stuff, once you hit enter the plugin will automatically upload the files to a hosting service of your choice, append the link(s) of the file(s) at the end of your message, and send the message all by itself.

## Bugs/Issues
You can either directly open an issue from GitHub or contact me on Discord to report a bug.

Discord: f3tch


Thank you for using LargeFileUploads!
