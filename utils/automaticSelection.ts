/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showToast, Toasts } from "@webpack/common";

import { settings } from "..";
import { uploadToCatbox, uploadToLitterbox, uploadToUguu, uploadToZipline } from "./functions";

export async function automaticSelection(files: File[], message: string) {
    let selectedService: string = "";
    const { ziplineServer, ziplineToken } = settings.store;

    files.map(file => {
        if (ziplineServer && ziplineToken) {
            selectedService = "zipline";
        } else if (file.size <= 200 * 1000 * 1000) {
            selectedService = "catbox";
        } else if (file.size <= 1000 * 1000 * 1000) {
            selectedService = "litterbox";
        } else if (file.size <= 128 * 1000 * 1000) {
            selectedService = "uguu";
        } else {
            console.log(`failed: ${file}`);
        }
    });

    switch (selectedService) {
        case "zipline":
            showToast("Uploading to Zipline...", Toasts.Type.SUCCESS);
            return await uploadToZipline(files, message);
        case "catbox":
            showToast("Uploading to Catbox...", Toasts.Type.SUCCESS);
            return await uploadToCatbox(files, message);
        case "litterbox":
            showToast("Uploading to Litterbox...", Toasts.Type.SUCCESS);
            return await uploadToLitterbox(files, message);
        case "uguu":
            showToast("Uploading to Uguu...", Toasts.Type.SUCCESS);
            return await uploadToUguu(files, message);
        default:
            showToast("Services for one or more of your files are not available!\nTry again later or add your own hosting service.", Toasts.Type.FAILURE);
    }
}
