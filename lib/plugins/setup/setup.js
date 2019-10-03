'use strict';

class Setup {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      setup: {
        usage: 'Setup the environment',
        configDependent: true,
        lifecycleEvents: ['setup'],
      },
    };
  }
}

module.exports = Setup;
