'use strict';

const BbPromise = require('bluebird');
const validate = require('./lib/validate');
const installIstio = require('./lib/installIstio');
const labelNamespace = require('./lib/labelNamespace');
const waitForIstio = require('./lib/waitForIstio');
const installKnative = require('./lib/installKnative');

class KnativeSetup {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('knative');

    Object.assign(this, { validate, installIstio, labelNamespace, waitForIstio, installKnative });

    this.hooks = {
      'setup:setup': () =>
        BbPromise.bind(this)
          .then(this.validate)
          .then(this.installIstio)
          .then(this.labelNamespace)
          .then(this.waitForIstio)
          .then(this.installKnative),
    };
  }
}

module.exports = KnativeSetup;
