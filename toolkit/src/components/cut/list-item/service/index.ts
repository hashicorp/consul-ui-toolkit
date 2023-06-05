/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

export enum ServiceType {
  ServiceInstance = 'service-instance',
  ServiceIngress = 'service-ingress',
  ServiceTerminating = 'service-terminating',
  Service = 'service',
}

type ExternalSource =
  | 'kubernetes'
  | 'terraform'
  | 'nomad'
  | 'consul'
  | 'consul-api-gateway'
  | 'vault'
  | 'aws'
  | 'aws-iam'
  | 'lambda';

export interface HealthCheck {
  success: number | undefined;
  warning: number | undefined;
  critical: number | undefined;
}

export interface CutService {
  name: string | undefined;
  metadata: {
    healthCheck: {
      node: HealthCheck | undefined;
      service: HealthCheck | undefined;
      instance: HealthCheck | undefined;
    };
    tags: string[];
    servicePortAddress: string | null;
    serviceSocketPath: string | undefined;
    nodeName: string | undefined;
    externalSource: ExternalSource | undefined;
    isProxyAndGateway: boolean | undefined;
    kindName: string | undefined;
    instanceCount: number | undefined;
    linkedServiceCount: number | undefined;
    upstreamCount: number | undefined;
    isImported: boolean | undefined;
    isPermissiveMTls: boolean | undefined;
    connectedWithGateway: boolean | undefined;
    connectedWithProxy: boolean | undefined;
    samenessGroup: string | undefined;
  };
}

enum ICON_MAPPING {
  kubernetes = 'kubernetes-color',
  terraform = 'terraform-color',
  nomad = 'nomad-color',
  consul = 'consul-color',
  'consul-api-gateway' = 'consul-color',
  vault = 'vault-color',
  aws = 'aws-color',
  'aws-iam' = 'aws-color',
  lambda = 'aws-lambda-color',
}

interface ComponentSignature {
  Args: {
    // List item args;
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: object;
    replace?: string;
    onClick(): void;

    // Service args
    service: CutService;
  };
}

export default class ServiceListItemComponent extends Component<ComponentSignature> {
  get isAllHealthy() {
    const { healthCheck } = this.args.service.metadata;
    const serviceHealthy = healthCheck.service
      ? !healthCheck.service.critical && !healthCheck.service.warning
      : true;
    const nodeHealthy = healthCheck.node
      ? !healthCheck.node.critical && !healthCheck.node.warning
      : true;
    const instanceHealthy = healthCheck.instance
      ? !healthCheck.instance.critical && !healthCheck.instance.warning
      : true;
    return serviceHealthy && nodeHealthy && instanceHealthy;
  }

  get externalSourceIcon() {
    const { externalSource } = this.args.service.metadata;

    return externalSource !== undefined ? ICON_MAPPING[externalSource] : null;
  }
}
