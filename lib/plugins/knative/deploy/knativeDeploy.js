'use strict';

const BbPromise = require('bluebird');
const auth = require('../shared/auth');
const deploy = require('./lib/deploy');

class KnativeDeploy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('knative');

    Object.assign(this, { auth, deploy });

    this.hooks = {
      'deploy:deploy': () =>
        BbPromise.bind(this)
          .then(this.auth)
          .then(this.deploy),
    };
  }
}

module.exports = KnativeDeploy;
