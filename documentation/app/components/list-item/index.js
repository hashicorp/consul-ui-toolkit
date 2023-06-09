/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  CUT_SERVICE_LIST_ITEM_TYPE,
  SERVICE_GATEWAY_TYPE,
} from '@hashicorp/consul-ui-toolkit/utils/service-list-item';

export default class ListItemTemporaryComponent extends Component {
  cutServiceListItems = CUT_SERVICE_LIST_ITEM_TYPE;

  get serviceListData() {
    return [
      {
        name: 'Service instance: All Healthy',
        type: CUT_SERVICE_LIST_ITEM_TYPE.ServiceInstance,
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
        type: CUT_SERVICE_LIST_ITEM_TYPE.ServiceInstance,
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
        type: CUT_SERVICE_LIST_ITEM_TYPE.Service,
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 1,
              critical: 2,
            },
          },
          kind: SERVICE_GATEWAY_TYPE.MeshGateway,
          externalSource: 'kubernetes',
          instanceCount: 8,
          isImported: true,
          samenessGroup: 'group-1',
          isPermissiveMTls: true,
        },
      },
      {
        name: 'Service: Green checks, no imported, with sameness group, permissive mTLS, external source',
        type: CUT_SERVICE_LIST_ITEM_TYPE.Service,
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 0,
              critical: 0,
            },
          },
          kind: SERVICE_GATEWAY_TYPE.MeshGateway,
          instanceCount: 5,
          connectedWithGateway: true,
          connectedWithProxy: true,
          isImported: true,
          samenessGroup: 'group-1',
          isPermissiveMTls: true,
          externalSource: 'aws',
        },
      },
      {
        name: 'Service (Ingress Gateway): Green checks',
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
          externalSource: 'nomad',
          upstreamCount: 5,
          tags: ['monitor', 'array', 'monitor'],
        },
      },
      {
        name: 'Service (terminating gateway): Failed checks',
        type: CUT_SERVICE_LIST_ITEM_TYPE.Service,
        metadata: {
          healthCheck: {
            instance: {
              success: 5,
              warning: 1,
              critical: 0,
            },
          },
          kind: SERVICE_GATEWAY_TYPE.TerminatingGateway,
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
