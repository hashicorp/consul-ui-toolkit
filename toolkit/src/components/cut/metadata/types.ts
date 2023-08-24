/**
 * Copyright (c) HashiCorp, Inc.
 */

import { ExternalSource } from 'src/types';

export interface MetadataHealthCheckBadgeSetSignature {
  Args: {
    type: string;
    successCount?: number;
    criticalCount?: number;
    warningCount?: number;
  };
}

export interface MetadataExternalSourceSignature {
  Args: {
    externalSource: ExternalSource;
  };
}
