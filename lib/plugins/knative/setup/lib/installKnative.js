'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function installKnative() {
  this.serverless.cli.log('Installing Knative (this might take a couple of seconds)...');

  // TODO: turn this into an object and install it sequential to enable log outputs
  const commands = [
    'kubectl apply --wait=true --filename https://github.com/knative/serving/releases/download/v0.4.0/serving.yaml',
    'kubectl apply --filename https://github.com/knative/build/releases/download/v0.4.0/build.yaml',
    'kubectl apply --filename https://github.com/knative/eventing/releases/download/v0.4.0/release.yaml',
    'kubectl apply --filename https://github.com/knative/eventing-sources/releases/download/v0.4.0/release.yaml',
    'kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/monitoring.yaml',
    'kubectl apply --filename https://raw.githubusercontent.com/knative/serving/v0.4.0/third_party/config/build/clusterrole.yaml',
  ].join(' && ');

  return childProcess.execAsync(commands).then(() => {
    this.serverless.cli.log('  --> Knative successfully installed');
  });
}

module.exports = installKnative;
