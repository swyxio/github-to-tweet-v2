const core = require('@actions/core');
const github = require('@actions/github');
const { TwitterApi } = require('twitter-api-v2');
// const wait = require('./wait');

const repoName = github.context.payload.repository.full_name;
const { message } = github.context.payload.commits[0];


// most @actions toolkit packages have async methods
async function run() {
  try {
    core.info(JSON.stringify(github.context, null, 2));
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    const client = new TwitterApi(core.getInput('TWITTER_BEARER_TOKEN')); // have it in github secrets
    const rwClient = client.readWrite;
    // https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/examples.md
    await rwClient.v1.tweet(`${repoName} update:
    
    ${message}`);
    core.info((new Date()).toTimeString());
    // const ms = core.getInput('milliseconds');
    // core.info(`Waiting ${ms} milliseconds ...`);
    // await wait(parseInt(ms));
    // core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
