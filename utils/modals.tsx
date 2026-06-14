/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
    ConfirmModal,
    openModal,
} from "@webpack/common";
import React from "react";

import { uploadToUguuFinal } from "./functions";
import { reupload } from "./reupload";

export function openConfirmModal(file: File) {
    openModal(props => (
        <ConfirmModal
            {...props}
            title="LargeFileUploads"
            subtitle="The file is larger than 10mb, would you like me to automatically upload it to a public hosting service?"
            confirmText="Continue"
            cancelText="I'm good"
            onConfirm={async () => { uploadToUguuFinal(file); }}
            onCancel={() => { reupload(file); }}
        />
    ));
}
