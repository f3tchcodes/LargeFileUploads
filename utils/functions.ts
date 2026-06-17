/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Native } from "..";
import { getChannelID, sendMsg } from "./sendMessage";

export async function uploadToUguu(files: File[], message: string) {
    const channelID = getChannelID();

    const results = await Promise.all(
        files.map(async file => {
            const arrayBuffer = await file.arrayBuffer();
            return await Native.fetchNativeUguu({
                name: file.name,
                type: file.type,
                data: new Uint8Array(arrayBuffer),
            });
        })
    );

    const uploadedFiles = results.map(f => `[${f.files[0].filename}](${f.files[0].url})`).join(" ");
    return await sendMsg(channelID, `${message} ${uploadedFiles}`);
}
