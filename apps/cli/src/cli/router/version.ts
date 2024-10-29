import { command } from "@koons/cli";
import packageJson from "../../../package.json";

export const version = command()
    .describe("Show the version of genesis")
    .fn(async () => {
        const version = packageJson.version;
        console.log("Genesis version:", version);
    });
