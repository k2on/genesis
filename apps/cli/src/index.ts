#! /usr/bin/env node

import { run, router, command } from "@koons/cli";
import { loadTsConfig } from "config-file-ts";

export const config = (name: string) => ({ name });

run(
    router({
        status: command()
            .describe("Show the status of the application")
            .fn(async () => {
                const config = loadTsConfig("genesis.config.ts");
                console.log("Genesis", config);
            }),
    }),
);
