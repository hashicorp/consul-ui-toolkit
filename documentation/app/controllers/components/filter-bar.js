/**
 * Copyright (c) HashiCorp, Inc.
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilterBarController extends Controller {
  @tracked filters = {
    search: {
      value: '',
    },
    filters: {
      status: {
        text: 'Status',
        value: ['running', 'warning'],
      },
      type: {
        text: 'Type',
        value: 'nomad',
      },
    },
  };

  @action
  handleFilterChange(filters) {
    console.log('Received updated filters');
    this.filters = filters;
  }
}
