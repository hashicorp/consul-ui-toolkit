/**
 * Copyright (c) HashiCorp, Inc.
 */

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

export enum EXTERNAL_SOURCE_ICON_MAPPING {
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

export enum EXTERNAL_SOURCE_LABELS {
  kubernetes = 'Kubernetes',
  terraform = 'Terraform',
  nomad = 'Nomad',
  consul = 'Consul',
  'consul-api-gateway' = 'Consul API Gateway',
  vault = 'Vault',
  aws = 'AWS',
  'aws-iam' = 'AWS IAM',
  lambda = 'AWS Lambda',
}

export interface HealthCheck {
  success: number | undefined;
  warning: number | undefined;
  critical: number | undefined;
}

export const CUT_SERVICE_LIST_ITEM_TYPE = {
  Service: 'service',
  ServiceTerminatingGateway: 'service-terminating-gateway',
  ServiceIngressGateway: 'service-ingress-gateway',
  ServiceInstance: 'service-instance',
};
