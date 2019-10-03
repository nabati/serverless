'use strict';

const BbPromise = require('bluebird');
const auth = require('../shared/auth');
const buildContainer = require('./lib/buildContainer');

class KnativePackage {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('knative');

    Object.assign(this, { auth, buildContainer });

    this.hooks = {
      'package:createDeploymentArtifacts': () =>
        BbPromise.bind(this)
          .then(this.auth)
          .then(this.buildContainer),
    };
  }
}

module.exports = KnativePackage;
