// --> package/lib

'use strict';

const path = require('path');
const YAML = require('js-yaml');
const BbPromise = require('bluebird');
const fs = BbPromise.promisifyAll(require('fs'));

function createManifestFile() {
  const serviceName = this.serverless.service.service;
  const destDir = path.join(this.serverless.config.servicePath, '.serverless');
  const filePath = path.join(destDir, `${serviceName}.yaml`);

  const namespace = 'default';
  const version = 'latest';
  const tag = `${serviceName}:${version}`;
  const image = `ko.local/${tag}`; // TODO: change to point to registry

  const content = {
    apiVersion: 'serving.knative.dev/v1alpha1',
    kind: 'Service',
    metadata: {
      name: serviceName,
      namespace: `${namespace}`,
    },
    spec: {
      runLatest: {
        configuration: {
          revisionTemplate: {
            spec: {
              container: {
                image,
                env: [
                  {
                    name: 'TARGET',
                    value: 'v.1',
                  },
                ],
              },
            },
          },
        },
      },
    },
  };

  return fs.writeFileAsync(filePath, YAML.dump(content));
}

module.exports = createManifestFile;
