/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IconComponent } from "@utils/types";

export const UploadIcon: IconComponent = ({ width = 20, height = 20, className }) => (
    <svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        className={className}
        fill="currentColor"
    >
        <path d="M12 3l5 5h-3v6h-4V8H7l5-5z" />
        <path d="M5 18h14v3H5z" />
    </svg>
);
