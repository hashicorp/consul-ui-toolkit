/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  ExternalSource,
  HealthCheck,
} from '../../../../utils/service-list-item';

export interface CutServiceTerminatingGateway {
  name: string | undefined;
  metadata: {
    healthCheck: {
      instance: HealthCheck | undefined;
    };
    tags: string[];
    externalSource: ExternalSource | undefined;
    kindName: string | undefined;
    linkedServiceCount: number | undefined;
    connectedWithGateway: boolean | undefined;
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
    service: CutServiceTerminatingGateway;
  };
}

export default class ServiceListItemComponent extends Component<ComponentSignature> {
  get isAllHealthy() {
    const { healthCheck } = this.args.service.metadata;

    return healthCheck.instance
      ? !healthCheck.instance.critical && !healthCheck.instance.warning
      : true;
  }
}
