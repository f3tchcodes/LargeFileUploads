/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { HeadingSecondary } from "@components/Heading";
import {
    Checkbox,
    ConfirmModal,
    openModal
} from "@webpack/common";
import React from "react";

import { SERVICES } from "../config/config";
import { uploadToUguu } from "./functions";
import { reupload } from "./reupload";

export function openConfirmModal(file: File) {
    openModal(props => (
        <ConfirmModal
            {...props}
            title="LargeFileUploads"
            subtitle="The file is larger than 10mb, would you like me to automatically upload it to a public hosting service?"
            confirmText="Upload"
            cancelText="I'm good"
            onConfirm={async () => { uploadToUguu(file); }}
            onCancel={() => { reupload(file); }}
            actionBarInput={
                <Checkbox
                    value={false}
                    onChange={() => {
                        console.log("actionbarinput changed");
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
                    disabled={false}
                    type="row"
                    value={false}
                    onChange={() => {
                        console.log("changed");
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
    ));
}
