/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import {
    DraftStore,
    DraftType,
    React, UploadAttachmentStore,
    useStateFromStores
} from "@webpack/common";

import { UploadIcon } from "./UploadIcon";

const getDraft = (channelId: string) => DraftStore.getDraft(channelId, DraftType.ChannelMessage);
let draftMessage = "";

export const UploadButton: ChatBarButtonFactory = ({ isAnyChat, isEmpty, type: { attachments }, channel: { id: channelId } }) => {
    const [draft, uploads] = useStateFromStores([DraftStore, UploadAttachmentStore], () => [
        getDraft(channelId),
        UploadAttachmentStore.getUploads(
            channelId,
            DraftType.ChannelMessage
        )
    ]);

    if (!isAnyChat) return null;

    const hasAttachments = uploads.length > 0;

    if (!hasAttachments) return null;
    draftMessage = draft;

    return (
        <ChatBarButton
            tooltip="Send via external upload!"
            onClick={() => { }}
        >
            <UploadIcon />
        </ChatBarButton>
    );
};


export { draftMessage };
