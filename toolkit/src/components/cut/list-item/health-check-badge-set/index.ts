/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

interface ComponentSignature {
  Args: {
    type: string;
    successCount?: number;
    criticalCount?: number;
    warningCount?: number;
  };
}

export default class HealthCheckBadgeSetComponent extends Component<ComponentSignature> {
  get total() {
    return (
      (this.args.successCount || 0) +
      (this.args.criticalCount || 0) +
      (this.args.warningCount || 0)
    );
  }

  get isAllHealthy() {
    return !this.args.criticalCount && !this.args.warningCount;
  }
}
