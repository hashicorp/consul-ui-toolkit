/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { MetadataServiceHealthBadgeSignature } from '../types';

export default class MetadataServiceHealthBadgeComponent extends Component<MetadataServiceHealthBadgeSignature> {
  get hasStatus(): boolean {
    const { criticalCount, warningCount, successCount } = this.args;

    return !!criticalCount || !!warningCount || !!successCount;
  }

  get statusIsCritical(): boolean {
    const { criticalCount } = this.args;
    return !!criticalCount && criticalCount > 0;
  }

  get statusIsWarning(): boolean {
    const { warningCount } = this.args;
    return !!warningCount && warningCount > 0 && !this.statusIsCritical;
  }
}
