/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showToast, Toasts } from "@webpack/common";

import { Native } from "..";
import { UploadDataResponse } from "../services/uguu";
import { getChannelID, sendMsg } from "./sendMessage";

export async function uploadToUguu(files: File[], message: string) {
    const channelID = getChannelID();

    const results = await Promise.all(
        files.map(async file => {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const res = await Native.fetchNativeUguu({
                    name: file.name,
                    type: file.type,
                    data: new Uint8Array(arrayBuffer),
                });

                if (!res.success) {
                    showToast("Upload failed!", Toasts.Type.SUCCESS);
                    return null;
                }

                showToast("Successfully uploaded!", Toasts.Type.SUCCESS);

                return res;
            } catch (err) {
                showToast("Unknown error occured. Upload failed!", Toasts.Type.FAILURE);
                console.log(err);
                return null;
            }
        })
    );

    const uploadedFiles = results
        .filter((f): f is UploadDataResponse => f !== null)
        .map(f => `[${f.files[0].filename}](${f.files[0].url})`)
        .join(" ");
    return await sendMsg(channelID, `${message} ${uploadedFiles}`);
}

export async function uploadToCatbox(files: File[], message: string) {
    const channelID = getChannelID();
    console.log(Native);

    const results = await Promise.all(
        files.map(async file => {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const res = await Native.fetchNativeCatbox({
                    name: file.name,
                    type: file.type,
                    data: new Uint8Array(arrayBuffer),
                });

                if (typeof res !== "string" || !res.startsWith("https://files.catbox.moe/")) {
                    showToast("Upload failed!", Toasts.Type.FAILURE);
                    return null;
                }

                showToast("Successfully uploaded!", Toasts.Type.SUCCESS);

                return res;
            } catch (err) {
                showToast("Unknown error occured. Upload failed!", Toasts.Type.FAILURE);
                console.log(err);
                return null;
            }
        })
    );

    const uploadedFiles = results
        .filter(f => f !== null)
        .map(url => `[${url.split("/").pop()}](${url})`)
        .join(" ");
    return await sendMsg(channelID, `${message} ${uploadedFiles}`);
}
