'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function buildContainer() {
  this.serverless.cli.log('Building Container...');

  const { servicePath } = this.serverless.config;
  const { service } = this.serverless.service;
  const { project } = this.serverless.service.provider;

  return childProcess
    .execAsync(`gcloud builds submit --tag gcr.io/${project}/${service} --project ${project}`, {
      cwd: servicePath,
    })
    .then(() => {
      this.serverless.cli.log('  --> Done building container');
    });
}

module.exports = buildContainer;
