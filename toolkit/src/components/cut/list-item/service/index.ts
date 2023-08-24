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
