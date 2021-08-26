
'use strict';

import * as Path from 'path';
import * as DotEnv from 'dotenv';
import * as DotEnvParseVariables from 'dotenv-parse-variables';

/**
 * Will log an error to the console and exit the process.
 *
 * @param {Error} err
 */
function logEnvErrorAndExit(err?: Error) {
  console.error('Unable to load the necessary variables from the .env file');

  if (err) {
    console.error(err);
  }

  process.exit(1);
}

/**
 * Retrieve .env variables
 */
const env = DotEnv.config({
  path: Path.join(__dirname, '..', '.env')
});

if (env.error) {
  logEnvErrorAndExit(env.error);
} else {
  env.parsed = DotEnvParseVariables(env.parsed);
}

if (!env.parsed) {
  logEnvErrorAndExit();
}

export default env.parsed;
