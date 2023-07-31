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
      status: [
        { text: 'Running', value: 'running' },
        { text: 'Warning', value: 'warning' },
      ],
      juice: {
        text: 'Orange',
        value: 'oj',
        isRequired: true,
      },
    },
    sort: {
      text: 'critical to healthy',
      value: 'health',
    },
  };

  @tracked clusterList = [
    { id: 1, name: 'Cluster 1' },
    { id: 2, name: 'Cluster 2' },
    { id: 3, name: 'Cluster 3' },
    { id: 4, name: 'Cluster 4' },
    { id: 5, name: 'Cluster 5' },
    { id: 6, name: 'Cluster 6' },
    { id: 7, name: 'Cluster 7' },
    { id: 8, name: 'Cluster 8' },
    { id: 9, name: 'Cluster 9' },
    { id: 10, name: 'Cluster 10' },
    { id: 11, name: 'Cluster 11' },
    { id: 12, name: 'Cluster 12' },
    { id: 13, name: 'Cluster 13' },
    { id: 14, name: 'Cluster 14' },
    { id: 15, name: 'Cluster 15' },
    { id: 16, name: 'Cluster 16' },
    { id: 17, name: 'Cluster 17' },
    { id: 18, name: 'Cluster 18' },
    { id: 19, name: 'Cluster 19' },
    { id: 20, name: 'Cluster 20' },
    { id: 21, name: 'Cluster 21' },
    { id: 22, name: 'Cluster 22' },
    { id: 23, name: 'Cluster 23' },
    { id: 24, name: 'Cluster 24' },
    { id: 25, name: 'Cluster 25' },
    { id: 26, name: 'Cluster 26' },
    { id: 27, name: 'Cluster 27' },
    { id: 28, name: 'Cluster 28' },
    { id: 29, name: 'Cluster 29' },
  ];

  @tracked search = '';
  @tracked count = 0;

  get filteredClusters() {
    const value = this.search?.toLowerCase();
    if (value !== '') {
      return this.clusterList.filter((cluster) => {
        return cluster.name.toLowerCase().includes(value);
      });
    } else {
      return this.clusterList;
    }
  }

  @action
  handleFilterChange(config) {
    console.log('Received updated filters');
    this.filters = config;
    this.count = Math.floor(Math.random() * 50);
    console.log(this.filters);
  }

  @action
  updateSearch(event) {
    console.log(event);
    this.search = event.target.value;
  }
}
