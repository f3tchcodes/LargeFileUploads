/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { CloudUpload as TCloudUpload } from "@vencord/discord-types";
import { findLazy } from "@webpack";

import { draftMessage, UploadButton, UploadIcon } from "./components/UploadButton";
import { openConfirmModal } from "./utils/modals";
export const CloudUpload: typeof TCloudUpload = findLazy(m => m.prototype?.trackUploadFinished);
export const Native = VencordNative.pluginHelpers.LargeFileUploads as PluginNative<typeof import("./native")>;

async function stopUploads(uploads: TCloudUpload[]) {
    console.log(uploads);
    const files = uploads.map(upload => upload.item.file);
    for (let i = 0; i < uploads.length; i++) { uploads[i].cancel(); }
    openConfirmModal(files, draftMessage);
}

export const settings = definePluginSettings({
    automaticSelection: {
        type: OptionType.BOOLEAN,
        displayName: "Automatic selection",
        description: "Automatically decides which hosting service is best suitable for your filetype and size.",
        default: false
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
        }
    ],
    stopUploads: stopUploads,
    chatBarButton: {
        icon: UploadIcon,
        render: UploadButton
    }
});
