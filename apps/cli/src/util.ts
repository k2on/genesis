import { ConfigSchema } from "@koons/config";
import { existsSync } from "fs";
import { cosmiconfigSync } from "cosmiconfig";

const name = "genesis.config.ts";

function getConfigPath() {
    const fileExists = existsSync(name);
    if (fileExists) return name;
    const workspacePath = "../../" + name;
    const workspaceFileExists = existsSync(workspacePath);
    if (workspaceFileExists) return workspacePath;
    return null;
}

export function loadConfig() {
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

