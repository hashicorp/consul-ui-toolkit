/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  NORMALIZED_GATEWAY_LABELS,
  SERVICE_GATEWAY_TYPE,
} from '../../../../utils/service-list-item';
import type { ServiceListItemSignature } from '../types';

export default class ServiceListItemComponent extends Component<ServiceListItemSignature> {
  ServiceGatewayType = SERVICE_GATEWAY_TYPE;
  NormalizedGatewayLabels = NORMALIZED_GATEWAY_LABELS;

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
    return kind &&
      Object.prototype.hasOwnProperty.call(this.NormalizedGatewayLabels, kind)
      ? this.NormalizedGatewayLabels[
          kind as
            | 'api-gateway'
            | 'mesh-gateway'
            | 'ingress-gateway'
            | 'terminating-gateway'
        ]
      : undefined;
  }
}
