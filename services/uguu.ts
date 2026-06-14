/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface UploadDataResponse {
    success: boolean;
    files: [
        {
            hash: string;
            filename: string;
            url: string;
            size: number;
            dupe: boolean;
        }
    ];
}

export interface UploadData {
    name: string;
    type: string;
    data: Uint8Array;
}

export async function uguuUpload(upload: UploadData): Promise<UploadDataResponse> {
    const bytes = new Uint8Array(upload.data);

    const blob = new Blob([bytes], {
        type: upload.type,
    });

    const form = new FormData();
    form.append("files[]", blob, upload.name);

    const res = await fetch("https://uguu.se/upload", {
        method: "POST",
        body: form,
    });

    return await res.json();
}
