/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { catboxUpload } from "./services/catbox";
import { uguuUpload } from "./services/uguu";

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
