'use strict';

const BbPromise = require('bluebird');
const chalk = require('chalk');
const childProcess = BbPromise.promisifyAll(require('child_process'));

function info() {
  const { service, functions } = this.serverless.service;
  const { project, region } = this.serverless.service.provider;

  return childProcess
    .execAsync(
      `gcloud beta run routes describe ${service} --platform managed --project ${project} --region ${region} --format json`
    )
    .then(res => {
      res = JSON.parse(res);

      this.serverless.cli.consoleLog('');

      let message = '';

      message += `${chalk.yellow.underline('Service Information')}\n`;
      message += `${chalk.yellow('service:')} ${service}\n`;
      message += `${chalk.yellow('project:')} ${project}\n`;
      message += `${chalk.yellow('region:')} ${region}\n`;

      message += '\n';

      // TODO: support more than 1 function
      const funcName = Object.keys(functions)[0];
      const { url } = res.status;
      message += `${chalk.yellow.underline('Deployed functions')}\n`;
      message += `${chalk.yellow(funcName)}\n`;
      message += `  ${url}\n`;

      this.serverless.cli.consoleLog(message);
    });
}

module.exports = info;
