#! /usr/bin/env node

import { run } from "@koons/cli";
import { rootRouter } from "./cli/router";

run(rootRouter);
