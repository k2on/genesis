#! /usr/bin/env node

import { run, router, command } from "@koons/cli";
import { existsSync } from "fs";
import { cosmiconfigSync } from "cosmiconfig";
import { ConfigSchema } from "./types";

const name = "genesis.config.ts";

function getConfigPath() {
    const fileExists = existsSync(name);
    if (fileExists) return name;
    const workspacePath = "../../" + name;
    const workspaceFileExists = existsSync(workspacePath);
    if (workspaceFileExists) return workspacePath;
    return null;
}

function loadConfig() {
    const path = getConfigPath();
    if (!path) return null;
    const json = cosmiconfigSync("genesis").load(path)?.config;
    console.log("json", json);

    try {
        return ConfigSchema.parse(json);
    } catch (error) {
        console.error(error);
        return null;
    }
}

run(
    router({
        status: command()
            .describe("Show the status of the application")
            .fn(async () => {
                const config = loadConfig();
                if (!config) {
                    console.error("No config found");
                    return;
                }
                console.log("Genesis", config.name);
            }),
    }),
);
