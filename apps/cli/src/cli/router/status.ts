import { command } from "@koons/cli";
import { loadConfig } from "../../util";

export const status = command()
    .describe("Show the status of the application")
    .fn(async () => {
        const config = loadConfig();
        if (!config) {
            console.error("No config found");
            return;
        }
        console.log("Genesis", config.name);
    })