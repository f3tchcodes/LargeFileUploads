/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
    openModal,
    React
} from "@webpack/common";

import { ConfirmModalPriv } from "../components/ConfirmModalPriv";
import { SelectionModal } from "../components/SelectionModal";

export function openConfirmModal(file: File[], message: string) {
    openModal(props => (
        <ConfirmModalPriv
            {...props}
            files={file}
            message={message}
        />
    ));
}

export function selectionModal(files: File[], message: string) {
    openModal(props => (
        <SelectionModal
            {...props}
            files={files}
            message={message}
        />
    ));
}
