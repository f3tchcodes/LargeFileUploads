/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { findByPropsLazy } from "@webpack";
import {
    DraftStore,
    DraftType,
    openModal,
    React, UploadAttachmentStore,
    useStateFromStores
} from "@webpack/common";

import { SelectionModal } from "./SelectionModal";
import { UploadIcon } from "./UploadIcon";

export interface DraftActions {
    clearDraft(channelId: string, type: typeof DraftType): void;
}

export interface UploadActions {
    clearAll(channelId: string, type: typeof DraftType): void;
}

const DraftActions = findByPropsLazy("clearDraft") as DraftActions;
const UploadActions = findByPropsLazy("setUploads") as UploadActions;

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
            onClick={() => {
                openModal(props => (
                    <SelectionModal
                        file={uploads[0]?.item.file}
                        message={draftMessage}
                        {...props}
                    />
                ));

                DraftActions.clearDraft(channelId, DraftType.ChannelMessage);
                UploadActions.clearAll(channelId, DraftType.ChannelMessage);
            }}
        >
            <UploadIcon />
        </ChatBarButton>
    );
};


export { draftMessage };
