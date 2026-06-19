/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { UploadData } from "../native";

export async function catboxUpload(upload: UploadData): Promise<string> {
    const bytes = new Uint8Array(upload.data);

    const blob = new Blob([bytes], {
        type: upload.type,
    });

    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", blob, upload.name);

    const res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: form,
    });

    return await res.text();
}
