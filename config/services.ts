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
        maxSize: "200MB",
        expiryTime: "None",
        embed: "Available",
        bestFor: "Permanent media sharing."
    },
    {
        id: "litterbox",
        name: "Litterbox",
        maxSize: "1GB",
        expiryTime: "3 days",
        embed: "Available",
        bestFor: "Temporary file sharing."
    },
    {
        id: "uguu",
        name: "Uguu",
        maxSize: "128MB",
        expiryTime: "3 hours",
        embed: "Available",
        bestFor: "Temporary media sharing."
    },
    {
        id: "zipline",
        name: "Zipline",
        maxSize: "Custom",
        expiryTime: "Custom",
        embed: "Available",
        bestFor: "Private file hosting"
    }
];
