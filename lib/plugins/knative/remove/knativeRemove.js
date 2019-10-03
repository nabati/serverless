'use strict';

const BbPromise = require('bluebird');
const auth = require('../shared/auth');
const remove = require('./lib/remove');

class KnativeRemove {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('knative');

    Object.assign(this, { auth, remove });

    this.hooks = {
      'remove:remove': () =>
        BbPromise.bind(this)
          .then(this.auth)
          .then(this.remove),
    };
  }
}

module.exports = KnativeRemove;
