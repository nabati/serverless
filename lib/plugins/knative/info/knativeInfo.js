'use strict';

const BbPromise = require('bluebird');
const auth = require('../shared/auth');
const infos = require('./lib/info');

class KnativeInfo {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('knative');

    Object.assign(this, { auth, infos });

    this.hooks = {
      'deploy:deploy': () =>
        BbPromise.bind(this)
          .then(this.auth)
          .then(this.infos),

      'info:info': () =>
        BbPromise.bind(this)
          .then(this.auth)
          .then(this.infos),
    };
  }
}

module.exports = KnativeInfo;
