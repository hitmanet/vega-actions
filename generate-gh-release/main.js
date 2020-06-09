const core = require("@actions/core");
const github = require("@actions/github");
const cp = require('child_process');
const exec = cmd => cp.execSync(cmd).toString();

const token = core.getInput("token", { required: true });
const mainPackage = core.getInput("main_package", { required: true });
const changelog = core.getInput("changelog", { required: true });
const [ repoOwner, repoName ] = process.env.GITHUB_REPOSITORY.split("/");

const octokit = github.getOctokit(token);

const packages = exec(`git for-each-ref --sort=creatordate --format '%(tag)' | grep "${mainPackage}"`)
  .split("\n")
  .filter((tag) => tag.length > 0);

const tag = packages[packages.length - 1];

octokit.repos.createRelease({
  owner: repoOwner,
  repo: repoName,
  tag_name: tag,
  name: tag,
  body: JSON.parse(changelog),
});