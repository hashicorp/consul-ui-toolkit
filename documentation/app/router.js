/**
 * Copyright (c) HashiCorp, Inc.
 */

import EmberRouter from '@ember/routing/router';
import config from 'documentation/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('contributing');
  this.route('components', function () {
    this.route('list-item');
  });
});
