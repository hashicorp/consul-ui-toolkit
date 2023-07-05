/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  ExternalSource,
  HealthCheck,
} from '../../../../utils/service-list-item';

export interface CutServiceInstance {
  name?: string;
  metadata: {
    healthCheck: {
      node?: HealthCheck;
      service?: HealthCheck;
    };
    tags: string[];
    servicePortAddress?: string;
    serviceSocketPath?: string;
    node?: string;
    externalSource?: ExternalSource;
    connectedWithProxy?: boolean;
  };
}

interface ComponentSignature {
  Args: {
    // List item args;
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: object;
    replace?: string;
    onClick(): void;

    // Service args
    service: CutServiceInstance;
  };
}

export default class ServiceInstanceListItemComponent extends Component<ComponentSignature> {
  get isAllHealthy() {
    const { healthCheck } = this.args.service.metadata;
    const serviceHealthy = healthCheck.service
      ? !healthCheck.service.critical && !healthCheck.service.warning
      : true;
    const nodeHealthy = healthCheck.node
      ? !healthCheck.node.critical && !healthCheck.node.warning
      : true;
    return serviceHealthy && nodeHealthy;
  }
}
