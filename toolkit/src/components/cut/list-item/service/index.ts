/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  ExternalSource,
  HealthCheck,
  NORMALIZED_GATEWAY_LABELS,
  SERVICE_GATEWAY_TYPE,
  SERVICE_KIND,
} from '../../../../utils/service-list-item';

export interface CutService {
  name: string | undefined;
  metadata: {
    healthCheck: {
      instance?: HealthCheck;
    };
    kind?: SERVICE_KIND;
    instanceCount?: number;
    isImported?: boolean;
    isPermissiveMTls?: boolean;
    connectedWithGateway?: boolean;
    connectedWithProxy?: boolean;
    samenessGroup?: string;
    externalSource?: ExternalSource;
    tags: string[];
    upstreamCount?: number;
    linkedServiceCount?: number;
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
    service: CutService;
  };
}

export default class ServiceListItemComponent extends Component<ComponentSignature> {
  ServiceGatewayType = SERVICE_GATEWAY_TYPE;
  NormalizedGatewayLabels = NORMALIZED_GATEWAY_LABELS;

  get isAllHealthy() {
    const { healthCheck } = this.args.service.metadata;

    return healthCheck.instance
      ? !healthCheck.instance.critical && !healthCheck.instance.warning
      : true;
  }

  get isIngressGateway() {
    return (
      this.args.service.metadata.kind === this.ServiceGatewayType.IngressGateway
    );
  }

  get isTerminatingGateway() {
    return (
      this.args.service.metadata.kind ===
      this.ServiceGatewayType.TerminatingGateway
    );
  }

  get kindName() {
    const { kind } = this.args.service.metadata;
    return kind ? this.NormalizedGatewayLabels[kind] : undefined;
  }
}
