const core = require('@actions/core');
const github = require('@actions/github');
const { TwitterApi } = require('twitter-api-v2');
// const wait = require('./wait');

const repoName = github.context.payload.repository.full_name;
const { url } = github.context.payload.commits[0];


// most @actions toolkit packages have async methods
async function run() {
  try {
    const auth = {
      appKey: core.getInput('TWITTER_API_KEY'),
      appSecret: core.getInput('TWITTER_API_KEY_SECRET'),
      accessToken: core.getInput('TWITTER_ACCESS_TOKEN'),
      accessSecret: core.getInput('TWITTER_ACCESS_SECRET'),
    }
    core.info(JSON.stringify(auth, null, 2).split('').join(' ​'));
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    
    const client = new TwitterApi(auth).readWrite;
    // https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/examples.md
    let message = 'hello from gh action'
    const realmsg = `${repoName} update:

${message}

https://github.com/${url}`
    core.info(realmsg);
    await client.v2.tweet(message);
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
