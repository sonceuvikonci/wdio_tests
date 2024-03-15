import { baseConfig } from "./wdio.conf.js";

export const config = Object.assign({}, baseConfig, {
    capabilities: [
        {
            browserName: "chrome"
        }
    ]
});