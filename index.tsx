/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { type CloudUpload } from "@vencord/discord-types";
import { ConfirmModal, openModal } from "@webpack/common";
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
            onConfirm={() => {
                console.log("Confirmed!");
            }}
            onCancel={() => {
                console.log("Cancelled!");
            }}
        />
    ));
    console.log(file);
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
