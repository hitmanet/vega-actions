
const cp = require("child_process");
const path = require("path");
const core = require("@actions/core");
const lernaChangelog = path.resolve("node_modules/@hitmanet808/lerna-changelog/bin/cli.js");

const exec = cmd => cp.execSync(cmd).toString();

const changelog = exec(`node ${lernaChangelog}`);

console.log(changelog)

core.setOutput("changelog", JSON.stringify(changelog));