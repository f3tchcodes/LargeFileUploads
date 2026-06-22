# LargeFileUploads
Vencord plugin for automatically detecting, and uploading files that exceed max upload limit to a hosting service and sending the link instead.

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
- Custom
- Custom
- Embed available

## Setup Zipline
In order to setup Zipline, you can enter your server's base URL and token inside settings of the plugin like so:
<img width="862" height="752" alt="Screenshot 2026-06-22 160643" src="https://github.com/user-attachments/assets/f68691cc-fe0e-4707-9aa2-2349540ace54" />

You can also choose to disable the warning, and enable automatic selection, so that your files are uploaded to zipline directly without any interference from confirmation popups.

## Uploading files
You can directly upload files to Discord like you usually do with drag & drop, using upload button, or by pasting the file. Everything is managed with Discord's original workflow, no slash commands or any extra stuff, once you hit enter the plugin will automatically upload the files to a hosting service of your choice, append the link(s) of the file(s) at the end of your message, and send the message all by itself.

Thank you for using LargeFileUploads!
