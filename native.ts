/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { uguuUpload, type UploadData } from "./services/uguu";

export async function uploadToUguu(_event: unknown, upload: UploadData) {
    return uguuUpload(upload);
}
