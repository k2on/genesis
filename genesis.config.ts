import { config, info, auth } from "@koons/genesis";

export default config([
    info({
        name: "genesis",
    }),
    auth({
        providers: ["github"]
    })
])