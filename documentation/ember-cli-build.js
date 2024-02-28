/**
 * Copyright (c) HashiCorp, Inc.
 */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      precision: 4,
      includePaths: [
        '../node_modules/@hashicorp/design-system-tokens/dist/products/css',
        '../node_modules/@hashicorp/ember-flight-icons/dist/styles',
        '../node_modules/@hashicorp/design-system-components/dist/styles',
        '../node_modules/@hashicorp/consul-ui-toolkit/dist/styles',
      ],
    },
    autoImport: {
      watchDependencies: ['consul-ui-toolkit'],
    },
    minifyCSS: {
      options: {
        advanced: false,
      },
    },
    'ember-prism': {
      components: ['javascript', 'markup'], //needs to be an array, or undefined.
      plugins: [
        'line-highlight',
        'line-numbers',
        'toolbar',
        'copy-to-clipboard',
      ],
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
