import { version } from "./router/version";
import { status } from "./router/status";
import { add } from "./router/add";
import { router } from "@koons/cli";

export const rootRouter = router({
    status,
    add,
    version,
})