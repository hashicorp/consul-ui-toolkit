/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { MetadataHealthCheckBadgeSetSignature } from 'src/types';

export default class MetadataHealthCheckBadgeSetComponent extends Component<MetadataHealthCheckBadgeSetSignature> {
  get total() {
    return (
      (this.args.successCount || 0) +
      (this.args.criticalCount || 0) +
      (this.args.warningCount || 0)
    );
  }
}
