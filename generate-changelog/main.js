
const cp = require("child_process");
const path = require("path");
const core = require("@actions/core");
const lernaChangelog = path.resolve("node_modules/@hitmanet808/lerna-changelog");

const exec = cmd => cp.execSync(cmd).toString();

const tagFrom = core.getInput("from", { required: true });
const tagTo = core.getInput("to", { required: true });

console.log(tagFrom, tagTo);

const changelog = exec(`node ${lernaChangelog} --from ${tagFrom} --to ${tagTo}`);

console.log(changelog)

core.setOutput("changelog", JSON.stringify(changelog));