/**
 * Copyright (c) HashiCorp, Inc.
 */

'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    // ember-try uses --no-lockfile by default, which is incompatible with Yarn 4
    // They are considering moving away from this option.
    // https://github.com/ember-cli/ember-try/issues/741
    // https://github.com/ember-cli/ember-try/issues/597
    buildManagerOptions() {
      return [''];
    },
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          // Pinning these dependencies to fix an error with bowerDependencies
          // on this ember-try scenario. Same as found here: https://github.com/hashicorp/design-system/pull/1704
          devDependencies: {
            '@ember/test-helpers': '^2.0.0',
            'ember-a11y-testing': '^5.2.1',
            'ember-cli': '~3.28.0',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '^8.1.0',
            'ember-source': '~3.28.11',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          // Pinning these dependencies to fix an error with bowerDependencies
          // on this ember-try scenario. Same as found here: https://github.com/hashicorp/design-system/pull/1704
          devDependencies: {
            '@ember/test-helpers': '^2.0.0',
            'ember-a11y-testing': '^5.2.1',
            'ember-cli': '~3.28.0',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '^8.1.0',
            'ember-source': '~3.28.11',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
