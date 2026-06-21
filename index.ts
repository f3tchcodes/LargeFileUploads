/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { CloudUpload as TCloudUpload } from "@vencord/discord-types";
import { findLazy } from "@webpack";
import { DraftType, UploadManager, UserStore } from "@webpack/common";

import { draftMessage, UploadButton, UploadIcon } from "./components/UploadButton";
import { openConfirmModal } from "./utils/modals";
import { getChannelID } from "./utils/sendMessage";
export const CloudUpload: typeof TCloudUpload = findLazy(m => m.prototype?.trackUploadFinished);
export const Native = VencordNative.pluginHelpers.LargeFileUploads as PluginNative<typeof import("./native")>;

export const getUserMaxUploadLimit = () => {
    const user = UserStore.getCurrentUser();
    const nitroTier = user?.premiumType;

    switch (nitroTier) {
        case 2:
            return 524288000;
        case 1:
            return 52428800;
        default:
            return 10485760;
    }
};

async function stopUploads(uploads: TCloudUpload[]) {
    let stopToggle = false;
    for (let i = 0; i < uploads.length; i++) {
        const file = uploads[i].item.file as any;
        const realSize = file.__originalSize !== undefined ? file.__originalSize : file.size;
        console.log(realSize);

        if (realSize > 10000) { stopToggle = true; }
    }
    if (!stopToggle) return;

    const files = uploads.map(upload => {
        const nativeFile = upload.item.file as any;
        const realSize = nativeFile.__originalSize !== undefined ? nativeFile.__originalSize : nativeFile.size;

        const cleanFile = new File([nativeFile], nativeFile.name, {
            type: nativeFile.type,
            lastModified: nativeFile.lastModified
        });

        Object.defineProperty(cleanFile, "size", {
            value: realSize,
            writable: false,
            enumerable: true,
            configurable: true
        });

        return cleanFile;
    });

    console.log(files);
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
        }
    ],
    start() {
        const dragHandler = (e: DragEvent) => {
            if (!e.dataTransfer?.files?.length) return;

            let bypassToggle = false;

            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                if (e.dataTransfer.files[i].size > 10000) { bypassToggle = true; }
            }

            if (!bypassToggle) return;

            e.preventDefault();
            e.stopImmediatePropagation();

            const channelId = getChannelID();

            const files = Array.from(e.dataTransfer.files).map(file => {
                (file as any).__originalSize = file.size;

                Object.defineProperty(file, "size", {
                    get() { return 1; },
                    configurable: true
                });

                return { file, platform: 1 };
            });

            UploadManager.addFiles({
                channelId,
                draftType: DraftType.ChannelMessage,
                files: files,
                showLargeMessageDialog: false
            });

            bypassToggle = false;
        };

        const uploadBtnHandler = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (!target || !target.files || target.files.length === 0) return;

            let bypassToggle = false;

            for (let i = 0; i < target.files.length; i++) {
                if (target.files[i].size > 10000) { bypassToggle = true; }
            }

            if (!bypassToggle) return;

            e.preventDefault();
            e.stopPropagation();

            const channelId = getChannelID();

            const files = Array.from(target.files).map(file => {
                (file as any).__originalSize = file.size;

                Object.defineProperty(file, "size", {
                    value: 1,
                    writable: false
                });

                return { file, platform: 1 };
            });

            UploadManager.addFiles({
                channelId,
                draftType: DraftType.ChannelMessage,
                files: files,
                showLargeMessageDialog: false
            });

            bypassToggle = false;
            target.value = "";
        };

        document.addEventListener("drop", dragHandler, true);
        document.addEventListener("change", uploadBtnHandler, true);
    },
    stopUploads: stopUploads,
    chatBarButton: {
        icon: UploadIcon,
        render: UploadButton
    }
});
