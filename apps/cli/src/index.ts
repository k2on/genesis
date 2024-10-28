#! /usr/bin/env node

import { run, router, command } from "@koons/cli";
import { loadTsConfig } from "config-file-ts";
import { existsSync } from "fs";
import z from "zod";

export const config = (name: string): Config => ({ name });

export const ConfigSchema = z.object({
    name: z.string(),
});
export type Config = z.infer<typeof ConfigSchema>;

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
    const json = loadTsConfig(path);
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
                if (!config) return;
                console.log("Genesis", config.name);
            }),
    }),
);
