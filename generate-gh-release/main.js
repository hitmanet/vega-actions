const core = require("@actions/core");
const github = require("@actions/github");

const token = core.getInput("token", { required: true });
const mainPackage = core.getInput("main_package", { required: true });
const changelog = core.getInput("changelog", { required: true });
const [ repoOwner, repoName ] = process.env.GITHUB_REPOSITORY.split("/");

const octokit = github.getOctokit(token);

const packages = execSync(`git for-each-ref --sort=creatordate --format '%(tag)' | grep "${mainPackage}"`)
  .toString()
  .split("\n")
  .filter((tag) => tag.length > 0);

const tag = packages[packages.length - 1];

octokit.repos.createRelease({
  owner: repoOwner,
  repo: repoName,
  tag_name: tag,
  body: JSON.parse(changelog),
  draft: true,
});