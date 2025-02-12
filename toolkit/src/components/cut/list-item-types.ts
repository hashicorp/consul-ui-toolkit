/**
 * Copyright (c) HashiCorp, Inc.
 */

export interface ListItemSignature {
  Args: {
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: unknown;
    replace?: boolean;
    model?: string | unknown;
    models?: string[] | unknown[];
    onClick(): void;
  };
}

export interface ServiceInstanceListItemSignature {
  Args: {
    // List item args;
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: unknown;
    replace?: boolean;
    model?: string | unknown;
    models?: string[] | unknown[];
    onClick(): void;

    // Service args
    service: CutServiceInstance;
  };
}

export interface ServiceListItemSignature {
  Args: {
    // List item args;
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: unknown;
    replace?: boolean;
    model?: string | unknown;
    models?: string[] | unknown[];
    onClick(): void;

    // Service args
    service: CutService;
    hideClusterPath?: boolean;
  };
}

export interface CutServiceInstance {
  name?: string;
  metadata: {
    healthCheck: {
      node?: HealthCheck;
      service?: HealthCheck;
    };
    tags: string[];
    servicePortAddress?: string;
    serviceSocketPath?: string;
    node?: string;
    externalSource?: ExternalSource;
    connectedWithProxy?: boolean;
  };
}

export interface CutService {
  name: string | undefined;
  metadata: {
    healthCheck: {
      instance?: HealthCheck;
    };
    kind?: SERVICE_KIND;
    instanceCount?: number;
    isImported?: boolean;
    isPermissiveMTls?: boolean;
    connectedWithGateway?: boolean;
    connectedWithProxy?: boolean;
    samenessGroup?: string;
    externalSource?: ExternalSource;
    tags: string[];
    upstreamCount?: number;
    linkedServiceCount?: number;
  };
}

export interface HealthCheck {
  success: number | undefined;
  warning: number | undefined;
  critical: number | undefined;
}

export type ExternalSource =
  | 'kubernetes'
  | 'terraform'
  | 'nomad'
  | 'consul'
  | 'consul-api-gateway'
  | 'vault'
  | 'aws'
  | 'aws-iam'
  | 'lambda';

export type SERVICE_KIND =
  | ''
  | 'typical'
  | 'destination'
  | 'connect-proxy'
  | 'api-gateway'
  | 'mesh-gateway'
  | 'ingress-gateway'
  | 'terminating-gateway';
