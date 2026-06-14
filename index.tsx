/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { sendMessage } from "@utils/discord";
import definePlugin from "@utils/types";
import { type CloudUpload } from "@vencord/discord-types";
import {
    ConfirmModal,
    FluxDispatcher,
    MessageActions,
    openModal,
    PendingReplyStore,
    SelectedChannelStore,
} from "@webpack/common";
import React from "react";

function stopUpload(upload: CloudUpload) {
    const sizeLimit = 10 * 1024 * 1024;
    const { size } = upload.item.file;
    const { file } = upload.item;
    upload.cancel();
    const confirm = openModal(props => (
        <ConfirmModal
            {...props}
            title="Smart Video Uploads"
            subtitle="The video is larger than 10mb, would you like me to automatically upload it to a public video service?"
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
    const channelID = SelectedChannelStore.getChannelId();

    sendMessage(
        channelID,
        {
            content: "hi"
        },
        false,
        MessageActions.getSendMessageOptionsForReply(PendingReplyStore.getPendingReply(channelID))
    ).then(() => {
        FluxDispatcher.dispatch({ type: "DELETE_PENDING_REPLY", channelId: channelID });
    });
}

export default definePlugin({
    name: "SmartVideoUploads",
    description: "Automatically uploads oversized videos to a hosting service and sends a link instead.",
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
