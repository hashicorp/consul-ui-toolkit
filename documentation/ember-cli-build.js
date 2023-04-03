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
    sassOptions: {
      precision: 4,
      includePaths: [
        '../node_modules/@hashicorp/design-system-tokens/dist/products/css',
      ],
    },
    minifyCSS: {
      options: {
        advanced: false,
      },
    },
    'ember-prism': {
      theme: 'tomorrow',
      components: ['javascript', 'markup'], //needs to be an array, or undefined.
      plugins: ['line-highlight', 'line-numbers'],
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
