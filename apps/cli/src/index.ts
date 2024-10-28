#! /usr/bin/env node

import { run, router, command } from "@koons/cli";

run(
    router({
        status: command()
            .describe("Show the status of the application")
            .fn(() => {
                console.log("Genesis");
            }),
    }),
);
