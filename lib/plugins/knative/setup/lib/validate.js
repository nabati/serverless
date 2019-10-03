'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function validate() {
  this.serverless.cli.log('Checking Kubernetes installation...');

  return childProcess
    .execAsync('kubectl cluster-info')
    .then(res => {
      this.serverless.cli.log('  --> Kubernetes found');
      if (!res.match(/is running/g)) {
        this.serverless.cli.log(
          'Kubernetes cluster not running. Please make sure to start the Kubernetes cluster...'
        );
      } else {
        this.serverless.cli.log('  --> Kubernetes cluster found');
      }
    })
    .catch(error => {
      if (error.message.includes('command not found')) {
        throw new Error('Kubernetes not running. Please start Kubernetes in order to proceed...');
      }
    });
}

module.exports = validate;
