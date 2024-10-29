#! /usr/bin/env node

import { run, router, command } from "@koons/cli";
import { ConfigSchema } from "@koons/config";
import { existsSync } from "fs";
import { cosmiconfigSync } from "cosmiconfig";
import packageJson from "../package.json";
import z from "zod";

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
        add: router({
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
        }),
        version: command()
            .describe("Show the version of the application")
            .fn(async () => {
                const version = packageJson.version;
                console.log("Genesis version:", version);
            }),
    }),
);
