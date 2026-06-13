/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { CloudUpload } from "@vencord/discord-types";

export default definePlugin({
    name: "SmartVideoUploads",
    description: "Automatically uploads oversized videos to a hosting service and sends a link instead.",
    authors: [{ name: "f3tch", id: 1016388460929626174n }],
    patches: [
        {
            find: "async uploadFiles(",
            replacement: [
                {
                    match: /async uploadFiles\((\i)\){/,
                    replace: "$&$1.forEach($self.inspect);"
                }
            ],
        }
    ],
    inspect(upload: CloudUpload) {
        console.log("oh wow it's working");
        console.log(upload);
    }
});


