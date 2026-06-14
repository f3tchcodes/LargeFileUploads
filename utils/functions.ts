/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Native } from "..";
import { sendMsg } from "./sendMessage";

export async function uploadToUguu(file: File) {
    const arrayBuffer = await file.arrayBuffer();

    return await Native.fetchNativeUguu({
        name: file.name,
        type: file.type,
        data: new Uint8Array(arrayBuffer),
    }).then(async a => {
        return await sendMsg(`[${a.files[0].filename}](${a.files[0].url})`);
    });
}
