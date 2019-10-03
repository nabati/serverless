'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function deploy() {
  const { project, region } = this.serverless.service.provider;
  const { service } = this.serverless.service;

  this.serverless.cli.log('Deploying Knative service...');

  return childProcess
    .execAsync(
      `gcloud beta run deploy ${service} --quiet --image gcr.io/${project}/${service} --project ${project} --platform managed --allow-unauthenticated --region ${region}`
    )
    .then(() => {
      this.serverless.cli.log('  --> Deployment successful');
    });
}

module.exports = deploy;
