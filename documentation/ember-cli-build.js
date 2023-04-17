/**
 * Copyright (c) HashiCorp, Inc.
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'scss',
      includePaths: [
        '../node_modules/@hashicorp/design-system-tokens/dist/products/css',
        '../node_modules/@hashicorp/design-system-components/app/styles',
        '../node_modules/@hashicorp/consul-ui-toolkit/dist/styles',
      ],
    },
    autoImport: {
      watchDependencies: ['consul-ui-toolkit'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
