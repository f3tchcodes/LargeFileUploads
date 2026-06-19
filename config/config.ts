/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface UploadService {
    id: string;
    name: string;
    maxSize: string;
    expiryTime: string;
    embed: string;
    bestFor: string;
}

export const SERVICES: UploadService[] = [
    {
        id: "catbox",
        name: "Catbox",
        maxSize: "200mb",
        expiryTime: "Not expired",
        embed: "Available",
        bestFor: "Permanent media sharing."
    },
    {
        id: "uguu",
        name: "Uguu",
        maxSize: "128mb",
        expiryTime: "3 hours",
        embed: "Available",
        bestFor: "Temporary media sharing."
    }
];
