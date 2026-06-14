/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { CloudUpload as TCloudUpload } from "@vencord/discord-types";
import { findLazy } from "@webpack";
import {
    ConfirmModal,
    openModal,
} from "@webpack/common";
import React from "react";

import { uguuUpload } from "./services/uguu";
import { reupload } from "./utils/reupload";

export const CloudUpload: typeof TCloudUpload = findLazy(m => m.prototype?.trackUploadFinished);

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
            onConfirm={() => { uguuUpload(file); }}
            onCancel={() => { reupload(file); }}
        />
    ));
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
    stopUpload: stopUpload
});
