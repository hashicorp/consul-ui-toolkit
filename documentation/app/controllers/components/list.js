/**
 * Copyright (c) HashiCorp, Inc.
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import {
  CUT_SERVICE_LIST_ITEM_TYPE,
  SERVICE_GATEWAY_TYPE,
} from '@hashicorp/consul-ui-toolkit/utils/service-list-item';
import { tracked } from '@glimmer/tracking';

export default class ListController extends Controller {
  get serviceListItem() {
    return {
      name: 'Service (Ingress Gateway)',
      type: CUT_SERVICE_LIST_ITEM_TYPE.Service,
      metadata: {
        healthCheck: {
          instance: {
            success: 5,
            warning: 0,
            critical: 0,
          },
        },
        connectedWithGateway: true,
        kind: SERVICE_GATEWAY_TYPE.IngressGateway,
        upstreamCount: 5,
        tags: ['monitor', 'array', 'monitor'],
      },
    };
  }

  @tracked filters = {
    search: {
      value: '',
    },
    filters: {},
    sort: {
      text: 'Critical to healthy',
      value: '-health',
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
    this.filters = config;
    this.count = Math.floor(Math.random() * 50);
  }

  @action
  updateSearch(event) {
    this.search = event.target.value;
  }

  @action
  dummy() {
    console.log('clicked');
  }
}
