/**
 * Copyright (c) HashiCorp, Inc.
 */

import EmberRouter from '@ember/routing/router';
import config from 'documentation/config/environment';
import { withHashSupport } from 'ember-url-hash-polyfill';

@withHashSupport
export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // NOTE: to be removed in https://hashicorp.atlassian.net/browse/CC-4504.
  this.route('list-item');
  this.route('dummy');

  this.route('index', { path: '/' });
  this.route('components', function () {
    this.route('list-item');
    this.route('list-item-template');
  });
});
