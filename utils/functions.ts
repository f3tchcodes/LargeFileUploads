/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Native } from "..";

export async function uploadToUguuFinal(file: File) {
    const arrayBuffer = await file.arrayBuffer();

    return await Native.uploadToUguu({
        name: file.name,
        type: file.type,
        data: new Uint8Array(arrayBuffer),
    }).then(a => {
        console.log(a.files[0].url);
    });
}
