import { command, router } from "@koons/cli";
import z from "zod";
import { loadConfig } from "../../util";

export const add = router({
    package: command()
        .describe("Add a package to the project")
        .input(z.object({ name: z.string() }))
        .fn(async ({ input }) => {
            const config = loadConfig();
            if (!config) {
                console.error("No config found");
                return;
            }
            const packageName = `@${config.name}/${input.name}`;
            console.log("Creating package", packageName);
        }),
})