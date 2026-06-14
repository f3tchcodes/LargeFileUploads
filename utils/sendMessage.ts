/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { sendMessage } from "@utils/discord";
import { FluxDispatcher, MessageActions, PendingReplyStore, SelectedChannelStore } from "@webpack/common";

export async function sendMsg(content: string) {
    const channelID = SelectedChannelStore.getChannelId();
    console.log(channelID);

    await sendMessage(
        channelID,
        { content },
        false,
        MessageActions.getSendMessageOptionsForReply(PendingReplyStore.getPendingReply(channelID))
    ).then(() => {
        FluxDispatcher.dispatch({ type: "DELETE_PENDING_REPLY", channelId: channelID });
    });
}
