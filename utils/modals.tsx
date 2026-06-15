/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
    openModal,
    React
} from "@webpack/common";

import { UploadModal } from "../components/UploadModal";

export function openConfirmModal(file: File) {
    openModal(props => (
        <UploadModal
            {...props}
            file={file}
        />
    ));
}
