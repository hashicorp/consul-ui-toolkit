/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  ExternalSource,
  HealthCheck,
} from '../../../../utils/service-list-item';

export interface CutServiceInstance {
  name: string | undefined;
  metadata: {
    healthCheck: {
      node: HealthCheck | undefined;
      service: HealthCheck | undefined;
    };
    tags: string[];
    servicePortAddress: string | null;
    serviceSocketPath: string | undefined;
    node: string | undefined;
    externalSource: ExternalSource | undefined;
    connectedWithProxy: boolean | undefined;
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
