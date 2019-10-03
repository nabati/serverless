'use strict';

const BbPromise = require('bluebird');
const async = require('async');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function waitForIstio() {
  this.serverless.cli.log(
    'Waiting for istio (hang tight as this might take a couple of minutes)...'
  );

  let isStarted = false;

  return new BbPromise(resolve => {
    async.whilst(
      () => !isStarted,
      callback => {
        setTimeout(() => {
          return childProcess.execAsync('kubectl get pods --namespace istio-system').then(res => {
            // we're waiting for at least one pilot to be available
            const regex = new RegExp('pilot.*Running', 'g');
            const match = res.match(regex);

            if (match && match.length) {
              isStarted = true;
              return resolve();
            }
            return callback();
          });
        }, 5000);
      },
      () => {
        return resolve();
      }
    );
  });
}

module.exports = waitForIstio;
