/**
 * Copyright (c) HashiCorp, Inc.
 */

'use strict';

module.exports = {
  extends: 'recommended',
  overrides: [
    {
      files: '**/components/cut/filter-bar/filter/filter-input.hbs',
      rules: {
        'no-inline-styles': false
      }
    },
    // TODO: investigate which splattributes needs to remain
    {
      files: '**/components/cut/list-item/index.hbs',
      rules: {
        'no-nested-splattributes': false
      }
    }
  ]
};
