/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
    Checkbox,
    ConfirmModal,
    openModal,
    React
} from "@webpack/common";

import { reupload } from "../utils/reupload";
import { UploadModal } from "./UploadModal";

export interface ConfirmModalPrivInt {
    file: File;

    transitionState: number;
    onClose: () => void;
}

export function ConfirmModalPriv({
    file,
    ...props
}: ConfirmModalPrivInt) {
    const [selectedAuto, setSelectedAuto] = React.useState(false);

    return (
        <ConfirmModal
            {...props}
            title="LargeFileUploads"
            subtitle="The file is larger than 10mb, would you like me to automatically upload it to a public hosting service?"
            confirmText="Continue"
            cancelText="I'm good"
            onConfirm={() => {
                openModal(props => (
                    <UploadModal
                        file={file}
                        {...props}
                    />
                ));
            }
            }
            onCancel={() => { reupload(file); }}
            actionBarInput={
                <Checkbox
                    value={selectedAuto}
                    onChange={() => {
                        setSelectedAuto(!selectedAuto);
                    }}
                >
                    Automatic selection
                </Checkbox>
            }
        >
        </ConfirmModal >
    );
}
