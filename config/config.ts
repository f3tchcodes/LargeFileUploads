/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface UploadService {
    id: string;
    name: string;
    maxSizeMb: string;
    expiryTime: string;
    embed: string;
    bestFor: string;
}

export const SERVICES: UploadService[] = [
    {
        id: "uguu",
        name: "Uguu",
        maxSizeMb: "128mb",
        expiryTime: "3 hours",
        embed: "True",
        bestFor: "Temporary media sharing."
    }
];
