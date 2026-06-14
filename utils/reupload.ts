/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { CloudUploadPlatform } from "@vencord/discord-types/enums";
import {
    Constants,
    MessageActions,
    PendingReplyStore,
    RestAPI,
    SelectedChannelStore,
    showToast,
    SnowflakeUtils,
    Toasts,
} from "@webpack/common";

import { CloudUpload } from "..";

export async function reupload(file: File) {
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
