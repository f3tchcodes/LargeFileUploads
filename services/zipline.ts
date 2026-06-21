/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { UploadData } from "../native";

export interface ZiplineUploadResponse {
    files: [
        {
            id: string,
            name: string,
            type: string,
            url: string;
        }
    ];
    error: string;
}

export async function ziplineUpload(upload: UploadData, ziplineServer: string, ziplineToken: string): Promise<ZiplineUploadResponse> {
    const ziplineServerClean = ziplineServer.endsWith("/") ? ziplineServer.slice(0, -1) : ziplineServer;

    // authorizing with /api/user
    const res = await fetch(`${ziplineServerClean}/api/user`, {
        method: "GET",
        headers: {
            Authorization: ziplineToken
        }
    });

    if (!res.ok) return await res.json();

    // verified user
    // move to /api/upload
    const bytes = new Uint8Array(upload.data);

    const blob = new Blob([bytes], {
        type: upload.type,
    });

    const form = new FormData();
    form.append("files", blob, upload.name);

    const resUpload = await fetch(`${ziplineServerClean}/api/upload`, {
        method: "POST",
        headers: {
            Authorization: ziplineToken
        },
        body: form,
    });

    return await resUpload.json();
}
