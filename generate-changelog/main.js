
const cp = require("child_process");
const core = require("@actions/core");

const exec = cmd => cp.execSync(cmd).toString();

exec('yarn');

const changelog = exec(`yarn lerna-changelog`);

console.log(changelog)

core.setOutput("changelog", JSON.stringify(changelog));