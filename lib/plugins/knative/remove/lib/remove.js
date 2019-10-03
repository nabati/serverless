'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function remove() {
  const { project, region } = this.serverless.service.provider;
  const { service } = this.serverless.service;

  this.serverless.cli.log('Removing Knative service...');

  return childProcess
    .execAsync(
      `gcloud beta run services delete ${service} --project ${project} --platform managed --region ${region} --quiet`
    )
    .then(() => {
      this.serverless.cli.log('  --> Removal successful');
    });
}

module.exports = remove;
