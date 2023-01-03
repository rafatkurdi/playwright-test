
//
// Arguments:
// --workers - number of browsers to run, default 6
// --headed - show the browsers, default false
// --env - name of file in e2e/envs without suffix, exclusive with --url, no default
// --url - url to test, defaults to http://localhost:3000 if --env not given
//

const fs = require('fs');
const shell = require("shelljs");
const args = require('args-parser')(process.argv);

if (args.env && args.url) {
  throw new Error("Cannot use --env and --url at the same time!")
}

if (!args.env) {
  if (!args.url) {
    args.url = 'http://localhost:3000';
  }
}

if (args.env) {
  const envFile = `./e2e/envs/${args.env}.env`;
  if (!fs.existsSync(envFile)) {
    throw new Error(`Env file ${envFile} not found`);
  }
}

if (!args.workers) {
  args.workers = 1;
}

if (!args.tests) {
  args.tests = 'spec';
}

const testCommand = `npx dotenv -e ./e2e/envs/${args.env}.env -- npx playwright test ${args.tests}${args.headed ? ' --headed' : ''} --workers=${args.workers}`;

if (args.env) {
  const envFile = `./e2e/envs/${args.env}.env`;
  const envCommand = `npx dotenv -e ${envFile} -- `;
  shell.exec(`${envCommand} ${testCommand}`);
} else {
  shell.env['URL'] = args.url;
  shell.env['ENV_NAME'] = 'Manual'
  shell.exec(testCommand);
}