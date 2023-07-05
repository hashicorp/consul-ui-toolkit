/**
 * Copyright (c) HashiCorp, Inc.
 */

import Controller from '@ember/controller';
import { SERVICE_GATEWAY_TYPE } from '@hashicorp/consul-ui-toolkit/utils/service-list-item';

export default class ServiceInstanceListItem extends Controller {
  get serviceListItem() {
    return {
      name: 'Service (Ingress Gateway)',
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

  get healthyPlainService() {
    return {
      name: 'Plain Healthy Service',
      metadata: {
        healthCheck: {
          instance: {
            success: 3,
            warning: 0,
            critical: 0,
          },
        },
        externalSource: 'consul',
        instanceCount: 3,
        tags: ['consul', 'array', 'monitor'],
      },
    };
  }

  get failingTerminatingGateway() {
    return {
      name: 'Service (terminating gateway): Failed checks',
      metadata: {
        healthCheck: {
          instance: {
            success: 4,
            warning: 0,
            critical: 1,
          },
        },
        kind: SERVICE_GATEWAY_TYPE.TerminatingGateway,
        linkedServiceCount: 6,
        externalSource: 'vault',
      },
    };
  }

  get mtlsSamenessGroupService() {
    return {
      name: 'Service: imported, with sameness group, permissive mTLS',
      metadata: {
        healthCheck: {
          instance: {
            success: 2,
            warning: 1,
            critical: 0,
          },
        },
        instanceCount: 8,
        isImported: true,
        samenessGroup: 'group-1',
        isPermissiveMTls: true,
      },
    };
  }

  get healthyServiceInstance() {
    return {
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
    };
  }

  get failingServiceInstance() {
    return {
      name: 'Service instance: Failed checks, service socket, no tags, no node name',
      metadata: {
        healthCheck: {
          node: {
            success: 5,
            warning: 1,
            critical: 2,
          },
          service: {
            success: 9,
            warning: 0,
            critical: 0,
          },
        },
        tags: [],
        servicePortAddress: '',
        serviceSocketPath: '/qui/asperiores/quis',
        node: null,
      },
    };
  }
}
