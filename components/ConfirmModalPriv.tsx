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
import { SelectionModal } from "./SelectionModal";

export interface ConfirmModalPrivInt {
    files: File[];
    message: string;

    transitionState: number;
    onClose: () => void;
}

export function ConfirmModalPriv({
    files,
    message,
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
                    <SelectionModal
                        files={files}
                        message={message}
                        {...props}
                    />
                ));
            }
            }
            onCancel={async () => { await reupload(files); }}
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
            <span>Click <strong>Continue</strong> to select a hosting service.</span>
        </ConfirmModal >
    );
}
