// --> deploy/lib

'use strict';

const path = require('path');
const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function apply() {
  const { servicePath } = this.serverless.config;
  const fileName = this.serverless.service.service;
  const filePath = path.join(servicePath, '.serverless', `${fileName}.yaml`);

  this.serverless.cli.log('Applying Knative config...');

  return childProcess.execAsync(`kubectl apply --filename ${filePath}`);
}

module.exports = apply;
