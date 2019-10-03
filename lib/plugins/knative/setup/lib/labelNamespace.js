'use strict';

const BbPromise = require('bluebird');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function labelNamespace() {
  this.serverless.cli.log('Labeling Namespace...');

  const namespace = 'default';

  return childProcess
    .execAsync(`kubectl label namespace ${namespace} istio-injection=enabled --overwrite=true`)
    .then(() => {
      this.serverless.cli.log(`  --> Namespace "${namespace}" labeled`);
    });
}

module.exports = labelNamespace;
