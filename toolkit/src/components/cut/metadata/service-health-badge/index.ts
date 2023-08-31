/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { MetadataServiceHealthBadgeSignature } from '../types';

export default class MetadataServiceHealthBadgeComponent extends Component<MetadataServiceHealthBadgeSignature> {
  get statusIsCritical() {
    const { criticalCount } = this.args;
    return criticalCount && criticalCount > 0;
  }

  get statusIsWarning() {
    const { warningCount } = this.args;
    return warningCount && warningCount > 0 && !this.statusIsCritical;
  }
}
