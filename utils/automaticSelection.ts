/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showToast, Toasts } from "@webpack/common";

import { uploadToCatbox, uploadToLitterbox, uploadToUguu } from "./functions";

export async function automaticSelection(files: File[], message: string) {
    let selectedService: string = "";

    files.map(file => {
        if (file.size <= 200 * 1000 * 1000) {
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
        case "catbox":
            return await uploadToCatbox(files, message);
        case "litterbox":
            return await uploadToLitterbox(files, message);
        case "uguu":
            return await uploadToUguu(files, message);
        default:
            showToast("Services for one or more of your files are not available!\nTry again later or add your own hosting service.", Toasts.Type.FAILURE);
    }
}
