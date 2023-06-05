/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

export default class ListItemComponent extends Component {
  get serviceInstances() {
    return [
      {
        name: 'Service instance: All Healthy',
        metadata: {
          healthCheck: {
            node: {
              success: 5,
              warning: 0,
              critical: 0,
            },
            service: {
              success: 2,
              warning: 0,
              critical: 0,
            },
          },
          tags: ['tag', 'service'],
          servicePortAddress: '8.8.8.8:8000',
          serviceSocketPath: '/qui/asperiores/quis',
          node: 'node',
          externalSource: 'kubernetes',
        },
      },
      {
        name: 'Service instance: Failed checks, service socket, no tags, no node name',
        metadata: {
          healthCheck: {
            node: {
              success: 5,
              warning: 1,
              critical: 2,
            },
            service: {
              success: 2,
              warning: 3,
              critical: 3,
            },
          },
          tags: [],
          servicePortAddress: '',
          serviceSocketPath: '/qui/asperiores/quis',
          node: null,
          externalSource: 'kubernetes',
        },
      },
      {
        name: 'Service: Failed checks, imported, with sameness group, permissive mTLS',
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 1,
              critical: 2,
            },
          },
          externalSource: 'kubernetes',
          instanceCount: 8,
          isImported: true,
          samenessGroup: 'group-1',
          isPermissiveMTls: true,
        },
      },
      {
        name: 'Service: Green checks, no imported, with sameness group, permissive mTLS, external source',
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 0,
              critical: 0,
            },
          },
          instanceCount: 5,
          connectedWithGateway: true,
          connectedWithProxy: true,
          isImported: true,
          samenessGroup: 'group-1',
          isPermissiveMTls: true,
        },
      },
      {
        name: 'Service (Ingress Gateway): Green checks',
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 0,
              critical: 0,
            },
          },
          connectedWithGateway: true,
          kindName: 'Ingress gateway',
          externalSource: 'nomad',
          upstreamCount: 5,
        },
      },
      {
        name: 'Service (terminating gateway): Failed checks',
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 1,
              critical: 0,
            },
          },
          kindName: 'Terminating gateway',
          linkedServiceCount: 6,
          externalSource: 'vault',
        },
      },
    ];
  }

  onItemClicked() {
    console.log('clicked');
  }
}
