/**
 * Copyright (c) HashiCorp, Inc.
 */

import type { ExternalSource } from 'src/types';

export interface MetadataHealthCheckBadgeSetSignature {
  Args: {
    type: string;
    successCount?: number;
    criticalCount?: number;
    warningCount?: number;
  };
}

export interface MetadataServiceHealthBadgeSignature {
  Args: {
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
