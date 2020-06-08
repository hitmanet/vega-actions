const execSync = require('child_process').execSync;
const core = require("@actions/core");

const mainPackage = core.getInput('main_package', { required: true });

const packages = execSync(`git for-each-ref --sort=creatordate --format '%(tag)' | grep "${mainPackage}"`)
  .toString()
  .split("\n")
  .filter((tag) => tag.length > 0);

core.setOutput('from', packages[packages.length - 2]);
core.setOutput('to', packages[packages.length - 1]);