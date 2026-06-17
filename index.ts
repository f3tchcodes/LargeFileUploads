/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin, { PluginNative } from "@utils/types";
import { CloudUpload as TCloudUpload } from "@vencord/discord-types";
import { findLazy } from "@webpack";

import { draftMessage, UploadButton } from "./components/UploadButton";
import { UploadIcon } from "./components/UploadIcon";
import { openConfirmModal } from "./utils/modals";
export const CloudUpload: typeof TCloudUpload = findLazy(m => m.prototype?.trackUploadFinished);
export const Native = VencordNative.pluginHelpers.LargeFileUploads as PluginNative<typeof import("./native")>;

async function stopUpload(upload: TCloudUpload) {
    const { file } = upload.item;
    console.log(`my content: ${draftMessage}`);
    upload.cancel();
    openConfirmModal(file, draftMessage);
}

export default definePlugin({
    name: "LargeFileUploads",
    description: "Automatically uploads oversized files to a hosting service and sends a link instead.",
    authors: [{ name: "f3tch", id: 1016388460929626174n }],
    patches: [
        {
            find: "async uploadFiles(",
            replacement: [
                {
                    match: /async uploadFiles\((\i)\){/,
                    replace: "$&$1.forEach($self.stopUpload);"
                }
            ],
        }
    ],
    stopUpload: stopUpload,
    chatBarButton: {
        icon: UploadIcon,
        render: UploadButton
    }
});
