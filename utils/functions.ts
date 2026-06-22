/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showToast, Toasts } from "@webpack/common";

import { Native, settings } from "..";
import { UploadDataResponse } from "../services/uguu";
import { ZiplineUploadResponse } from "../services/zipline";
import { getChannelID, sendMsg } from "./sendMessage";

// UGUU
export async function uploadToUguu(files: File[], message: string) {
    try {
        const channelID = getChannelID();

        const results = await Promise.all(
            files.map(async file => {
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
            })
        );

        const uploadedFiles = results
            .filter((f): f is UploadDataResponse => f !== null)
            .map(f => `[${f.files[0].filename}](${f.files[0].url})`)
            .join(" ");
        if (uploadedFiles === "") return;
        return await sendMsg(channelID, `${message} ${uploadedFiles}`);

    } catch (err) {
        showToast("Unknown error occured. Upload failed!", Toasts.Type.FAILURE);
        console.log(err);
        return null;
    }
}

// CATBOX
export async function uploadToCatbox(files: File[], message: string) {
    try {
        const channelID = getChannelID();
        console.log(Native);

        const results = await Promise.all(
            files.map(async file => {
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

            })
        );

        const uploadedFiles = results
            .filter(f => f !== null)
            .map(url => `[${url.split("/").pop()}](${url})`)
            .join(" ");
        if (uploadedFiles === "") return;
        return await sendMsg(channelID, `${message} ${uploadedFiles}`);
    } catch (err) {
        showToast("Unknown error occured. Upload failed!", Toasts.Type.FAILURE);
        console.log(err);
        return null;
    }
}

// LITTERBOX
export async function uploadToLitterbox(files: File[], message: string) {
    try {
        const channelID = getChannelID();
        console.log(Native);

        const results = await Promise.all(
            files.map(async file => {
                const arrayBuffer = await file.arrayBuffer();
                const res = await Native.fetchNativeLitterbox({
                    name: file.name,
                    type: file.type,
                    data: new Uint8Array(arrayBuffer),
                });

                if (typeof res !== "string" || !res.startsWith("https://litter.catbox.moe/")) {
                    showToast("Upload failed!", Toasts.Type.FAILURE);
                    console.log(res);
                    return null;
                }

                showToast("Successfully uploaded!", Toasts.Type.SUCCESS);

                return res;
            })
        );

        const uploadedFiles = results
            .filter(f => f !== null)
            .map(url => `[${url.split("/").pop()}](${url})`)
            .join(" ");
        if (uploadedFiles === "") return;
        return await sendMsg(channelID, `${message} ${uploadedFiles}`);

    } catch (err) {
        showToast("Unknown error occured. Upload failed!", Toasts.Type.FAILURE);
        console.log(err);
        return null;
    }
}

export async function uploadToZipline(files: File[], message: string) {
    try {
        const channelID = getChannelID();

        const { ziplineServer, ziplineToken } = settings.store;
        if (typeof ziplineServer !== "string") {
            showToast("Enter your Zipline server's base URL!", Toasts.Type.FAILURE);
            return null;
        }
        if (typeof ziplineToken !== "string") {
            showToast("Enter your Zipline token!", Toasts.Type.FAILURE);
            return null;
        }

        const results = await Promise.all(
            files.map(async file => {
                const arrayBuffer = await file.arrayBuffer();
                const res = await Native.fetchNativeZipline({
                    name: file.name,
                    type: file.type,
                    data: new Uint8Array(arrayBuffer),
                }, ziplineServer, ziplineToken);

                if (res.error) {
                    showToast(res.error, Toasts.Type.FAILURE);
                    return null;
                }

                showToast("Successfully uploaded!", Toasts.Type.SUCCESS);

                return res;
            })
        );

        const uploadedFiles = results
            .filter((f): f is ZiplineUploadResponse => f !== null)
            .map(f => `[${f.files[0].name}](${f.files[0].url})`)
            .join(" ");

        if (uploadedFiles === "") return;
        return await sendMsg(channelID, `${message} ${uploadedFiles}`);
    } catch (err) {
        showToast("Upload failed! Make sure to enter the correct base URL and token!", Toasts.Type.FAILURE);
        console.log(err);
        return null;
    }
}
