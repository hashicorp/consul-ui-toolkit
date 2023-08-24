/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { ServiceInstanceListItemSignature } from '../types';

export default class ServiceInstanceListItemComponent extends Component<ServiceInstanceListItemSignature> {
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
