/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { CloudUpload as TCloudUpload } from "@vencord/discord-types";
import { findLazy } from "@webpack";
import { DraftType, UploadManager } from "@webpack/common";

import { draftMessage, UploadButton, UploadIcon } from "./components/UploadButton";
import { openConfirmModal } from "./utils/modals";
import { getChannelID } from "./utils/sendMessage";
export const CloudUpload: typeof TCloudUpload = findLazy(m => m.prototype?.trackUploadFinished);
export const Native = VencordNative.pluginHelpers.LargeFileUploads as PluginNative<typeof import("./native")>;

async function stopUploads(uploads: TCloudUpload[]) {
    const files = uploads.map(upload => upload.item.file);
    for (let i = 0; i < uploads.length; i++) { uploads[i].cancel(); }
    openConfirmModal(files, draftMessage);
}

export const settings = definePluginSettings({
    automaticSelection: {
        type: OptionType.BOOLEAN,
        displayName: "Automatic Selection",
        description: "Automatically decides which hosting service is best suitable for your filetype and size.",
        default: false
    },
    customZiplineServer: {
        type: OptionType.STRING,
        displayName: "Custom Zipline Server",
        description: "Your custom Zipline website for hosting files on your private server (default option on automatic selection).",
        placeholder: "https://myziplinewebsite.com/api/upload"
    }
});

export default definePlugin({
    name: "LargeFileUploads",
    description: "Automatically uploads oversized files to a hosting service and sends a link instead.",
    authors: [{ name: "f3tch", id: 1016388460929626174n }],
    settings,
    patches: [
        {
            find: "async uploadFiles(",
            replacement: [
                {
                    match: /async uploadFiles\((\i)\){/,
                    replace: "$&$self.stopUploads($1);"
                }
            ],
        },
        {
            find: "\"SENDABLE\"",
            replacement: [
                {
                    match: /\i\.available\?/,
                    replace: "console.log($1)?"
                }
            ]
        }
    ],
    start() {
        const handler = (e: DragEvent) => {
            if (!e.dataTransfer?.files?.length) return;

            e.preventDefault();
            e.stopImmediatePropagation();

            const channelId = getChannelID();

            const files = Array.from(e.dataTransfer.files);
            UploadManager.addFiles({
                channelId,
                draftType: DraftType.ChannelMessage,
                files: files.map(file => ({ file, platform: 1 })),
                showLargeMessageDialog: false
            });
        };

        document.addEventListener("drop", handler, true);
    },
    stopUploads: stopUploads,
    chatBarButton: {
        icon: UploadIcon,
        render: UploadButton
    }
});
