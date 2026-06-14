/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { CloudUpload as TCloudUpload } from "@vencord/discord-types";
import { CloudUploadPlatform } from "@vencord/discord-types/enums";
import { findLazy } from "@webpack";
import {
    ConfirmModal,
    Constants,
    MessageActions,
    openModal,
    PendingReplyStore,
    RestAPI,
    SelectedChannelStore,
    showToast,
    SnowflakeUtils,
    Toasts,
} from "@webpack/common";
import React from "react";

const CloudUpload: typeof TCloudUpload = findLazy(m => m.prototype?.trackUploadFinished);

function stopUpload(upload: TCloudUpload) {
    const sizeLimit = 10 * 1024 * 1024;
    const { size } = upload.item.file;
    const { file } = upload.item;
    upload.cancel();
    const confirm = openModal(props => (
        <ConfirmModal
            {...props}
            title="LargeFileUploads"
            subtitle="The file is larger than 10mb, would you like me to automatically upload it to a public hosting service?"
            confirmText="Continue"
            cancelText="I'm good"
            onConfirm={() => { externalUpload(file); }}
            onCancel={() => { reupload(file); }}
        />
    ));
}

async function externalUpload(file: File) {
    // upload file to external website
}

async function reupload(file: File) {
    const channelId = SelectedChannelStore.getChannelId();
    const reply = PendingReplyStore.getPendingReply(channelId);
    const upload = new CloudUpload({
        file,
        isThumbnail: true,
        platform: CloudUploadPlatform.WEB
    }, channelId);

    upload.on("complete", () => {
        RestAPI.post({
            url: Constants.Endpoints.MESSAGES(channelId),
            body: {
                channel_id: channelId,
                content: "",
                nonce: SnowflakeUtils.fromTimestamp(Date.now()),
                sticker_ids: [],
                type: 0,
                attachments: [{
                    id: "0",
                    filename: upload.filename,
                    uploaded_filename: upload.uploadedFilename,
                }],
                message_reference: reply
                    ? MessageActions.getSendMessageOptionsForReply(reply)?.messageReference
                    : null,
            }
        });
    });

    upload.on("error", () => showToast("Failed to upload file", Toasts.Type.FAILURE));

    upload.upload();
}

export default definePlugin({
    name: "LargeFileUploads",
    description: "Automatically uploads oversized files (videos, images) to a hosting service and sends a link instead.",
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
    stopUpload: stopUpload
});
