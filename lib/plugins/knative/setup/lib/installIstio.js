'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function installIstio() {
  this.serverless.cli.log('Installing Istio...');

  // TODO: turn this into an object and install it sequential to enable log outputs
  const commands = [
    'kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/istio-crds.yaml',
    'kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/istio.yaml',
  ].join(' && ');

  return childProcess.execAsync(commands).then(() => {
    this.serverless.cli.log('  --> Istio successfully installed');
  });
}

module.exports = installIstio;
