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
    SnowflakeUtils
} from "@webpack/common";

import { CloudUpload } from "..";

export interface attachments {
    id: string;
    filename: string;
    uploaded_filename: string;
}

export async function reupload(files: File[]) {
    const channelId = SelectedChannelStore.getChannelId();
    const reply = PendingReplyStore.getPendingReply(channelId);

    const uploads = files.map(file => {
        return new CloudUpload({
            file,
            isThumbnail: true,
            platform: CloudUploadPlatform.WEB
        }, channelId);
    });

    const attachments: attachments[] = [];

    await new Promise<void>((resolve, reject) => {
        let completed = 0;
        let failed = false;

        uploads.forEach(upload => {
            upload.on("complete", () => {
                attachments.push({
                    id: String(attachments.length),
                    filename: upload.filename,
                    uploaded_filename: upload.uploadedFilename
                });

                completed++;

                if (completed === uploads.length && !failed) {
                    resolve();
                }
            });

            upload.on("error", () => {
                if (!failed) {
                    failed = true;
                    reject(new Error("one or more uploads failed"));
                }
            });
        });
    });

    RestAPI.post({
        url: Constants.Endpoints.MESSAGES(channelId),
        body: {
            channel_id: channelId,
            content: "",
            nonce: SnowflakeUtils.fromTimestamp(Date.now()),
            sticker_ids: [],
            type: 0,
            attachments,
            message_reference: reply
                ? MessageActions.getSendMessageOptionsForReply(reply)?.messageReference
                : null,
        }
    });
}
