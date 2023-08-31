/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  NORMALIZED_GATEWAY_LABELS,
  SERVICE_GATEWAY_TYPE,
} from '../../../../utils/service-list-item';
import { ServiceListItemSignature } from '../types';

export default class ServiceListItemComponent extends Component<ServiceListItemSignature> {
  ServiceGatewayType = SERVICE_GATEWAY_TYPE;
  NormalizedGatewayLabels = NORMALIZED_GATEWAY_LABELS;

  get tooltipText() {
    const { healthCheck } = this.args.service.metadata;

    if (healthCheck!.instance!.critical! > 0) {
      return '1 or more instances is critical';
    } else if (healthCheck!.instance!.warning! > 0) {
      return '1 or more instances has a warning';
    }
    return 'All instances are healthy';
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
