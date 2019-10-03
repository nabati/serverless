'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function auth() {
  const { credentials } = this.serverless.service.provider;

  return childProcess.execAsync(`gcloud auth activate-service-account --key-file=${credentials}`);
}

module.exports = auth;
