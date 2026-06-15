/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { HeadingSecondary } from "@components/Heading";
import {
    Checkbox,
    ConfirmModal,
    React
} from "@webpack/common";

import { SERVICES } from "../config/config";
import { uploadToUguu } from "../utils/functions";
import { reupload } from "../utils/reupload";

export interface UploadModalFiles {
    file: File;

    transitionState: number;
    onClose: () => void;
}

export function UploadModal({
    file,
    ...props
}: UploadModalFiles) {
    const [selectedService, setSelectedService] = React.useState("uguu");
    const [selectedAuto, setSelectedAuto] = React.useState(false);

    return (
        <ConfirmModal
            {...props}
            title="LargeFileUploads"
            subtitle="The file is larger than 10mb, would you like me to automatically upload it to a public hosting service?"
            confirmText="Upload"
            cancelText="I'm good"
            onConfirm={async () => { await uploadToUguu(file); }}
            onCancel={() => { reupload(file); }}
            actionBarInput={
                <Checkbox
                    value={selectedAuto}
                    onChange={() => {
                        setSelectedAuto(!selectedAuto);
                    }}
                >
                    Automatically decide next time
                </Checkbox>
            }
        >
            <HeadingSecondary>Select your preferred file hosting service: </HeadingSecondary>
            {SERVICES.map(service => (
                <Checkbox
                    key={service.id}
                    type="row"
                    value={selectedService === service.id}
                    onChange={() => {
                        setSelectedService(service.id);
                    }}
                >
                    <span><strong>{service.name}</strong></span>
                    <br />
                    <span><strong>Max size: </strong>{service.maxSizeMb}</span>
                    <br />
                    <span><strong>Expiry time: </strong>{service.expiryTime}</span>
                    <br />
                    <span><strong>Embed: </strong>{service.embed}</span>
                    <br />
                    <span><strong>Best for: </strong>{service.bestFor}</span>
                </Checkbox >
            ))
            }
        </ConfirmModal >
    );
}
