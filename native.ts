/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { catboxUpload } from "./services/catbox";
import { litterboxUpload } from "./services/litterbox";
import { uguuUpload } from "./services/uguu";
import { ziplineUpload } from "./services/zipline";

export interface UploadData {
    name: string;
    type: string;
    data: Uint8Array;
}

export async function fetchNativeUguu(_event: unknown, upload: UploadData) {
    return await uguuUpload(upload);
}

export async function fetchNativeCatbox(_event: unknown, upload: UploadData) {
    return await catboxUpload(upload);
}

export async function fetchNativeLitterbox(_event: unknown, upload: UploadData) {
    return await litterboxUpload(upload);
}

export async function fetchNativeZipline(
    _event: unknown,
    upload: UploadData,
    ziplineServer: string,
    ziplineToken: string
) {
    return await ziplineUpload(upload, ziplineServer, ziplineToken);
}
