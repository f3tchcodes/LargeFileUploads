/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { sendMessage } from "@utils/discord";
import { FluxDispatcher, MessageActions, PendingReplyStore, SelectedChannelStore } from "@webpack/common";

// we need to create separate channel id function
// so we can store the channel id while upload,
// that way even if the user changes their channel
// *while* uploading the file, the file is sent to
// the correct channel where the upload started from.
export function getChannelID(): string {
    return SelectedChannelStore.getChannelId();
}

export async function sendMsg(channelID: string, content: string) {
    await sendMessage(
        channelID,
        { content },
        false,
        MessageActions.getSendMessageOptionsForReply(PendingReplyStore.getPendingReply(channelID))
    ).then(() => {
        FluxDispatcher.dispatch({ type: "DELETE_PENDING_REPLY", channelId: channelID });
    });
}
